import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { normalizePhone, sha256, signOsToken } from "../_shared/osToken.ts";

/**
 * Confirmação por código para liberar fotos da triagem e descrição dos sintomas.
 *
 * action=request  -> registra o pedido (sem código ainda), válido por 10 minutos.
 * action=issue    -> exclusivo de administradores autenticados: gera o código de
 *                    6 dígitos, guarda somente o hash e devolve o valor uma única
 *                    vez para o técnico repassar no WhatsApp.
 * action=verify   -> valida o código e devolve uma sessão assinada de 30 minutos.
 *
 * O código em texto puro nunca é persistido no banco.
 */

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

const CODE_TTL_MIN = 10;
/** O pedido aguardando emissão vive bem mais que o código, senão some do painel. */
const REQUEST_TTL_MIN = 180;
const MAX_CODES_PER_HOUR = 3;
const MAX_CODES_PER_IP_HOUR = 8;
const MAX_ATTEMPTS = 5;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const mask = (tel: string) => `(${tel.slice(0, 2)}) *****-${tel.slice(-4)}`;

/** O hash usa o id da linha como sal, não o telefone. */
const hashCode = (id: string, codigo: string) => sha256(`code:${id}:${codigo}`);

/** Devolve o admin autenticado (id/e-mail) ou null. */
async function requireAdmin(req: Request): Promise<{ id: string; email: string | null } | null> {
  const authorization = req.headers.get("Authorization") ?? "";
  if (!authorization.toLowerCase().startsWith("bearer ")) return null;
  const client = createClient(SUPABASE_URL, ANON_KEY, {
    auth: { persistSession: false },
    global: { headers: { Authorization: authorization } },
  });
  const { data: userData, error } = await client.auth.getUser();
  if (error || !userData?.user) return null;
  const { data: isAdmin } = await client.rpc("has_role", {
    _user_id: userData.user.id,
    _role: "admin",
  });
  if (isAdmin !== true) return null;
  return { id: userData.user.id, email: userData.user.email ?? null };
}



Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const action =
    payload.action === "verify" ? "verify" : payload.action === "issue" ? "issue" : "request";
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

  // Emissão do código: só administradores autenticados, e o valor é devolvido
  // apenas nesta resposta (nunca gravado em texto puro).
  if (action === "issue") {
    const admin = await requireAdmin(req);
    if (!admin) return json({ error: "unauthorized" }, 401);
    const id = typeof payload.id === "string" ? payload.id : "";
    if (!/^[0-9a-f-]{36}$/i.test(id)) return json({ error: "invalid_id" }, 400);

    const codigo = String(Math.floor(100000 + Math.random() * 900000));
    const emitidoEm = new Date().toISOString();
    const { data, error } = await supabase
      .from("os_verification_codes")
      .update({
        code_hash: await hashCode(id, codigo),
        attempts: 0,
        expires_at: new Date(Date.now() + CODE_TTL_MIN * 60_000).toISOString(),
      })
      .eq("id", id)
      .is("consumed_at", null)
      .select("id, telefone_masked, expires_at")
      .maybeSingle();

    if (error) {
      console.error("os-codigo issue falhou:", error.message);
      return json({ error: "issue_failed" }, 500);
    }
    if (!data) return json({ error: "code_not_found" }, 404);

    // Auditoria administrativa: quem emitiu, para qual registro e quando.
    // O código em texto puro NUNCA entra no log.
    const { error: auditError } = await supabase.from("admin_audit_log").insert({
      actor_id: admin.id,
      actor_email: admin.email,
      area: "os_verification",
      action: "issue_code",
      target: data.id,
      details: {
        issuedAt: emitidoEm,
        telefoneMascarado: data.telefone_masked,
        expiresAt: data.expires_at,
        codeStorage: "sha256_hash_only",
      },
    });
    if (auditError) console.error("os-codigo auditoria falhou:", auditError.message);

    return json({
      ok: true,
      codigo,
      telefoneMascarado: data.telefone_masked,
      expiraEm: data.expires_at,
      registradoEm: emitidoEm,
    });
  }


  const telefone = normalizePhone(payload.telefone);
  if (!telefone) return json({ error: "invalid_phone" }, 400);


  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    "desconhecido";
  const ipHash = await sha256(`ip:${ip}`);
  const telHash = await sha256(`tel:${telefone}`);

  if (action === "request") {
    const since = new Date(Date.now() - 60 * 60_000).toISOString();
    const [{ count: porTel }, { count: porIp }] = await Promise.all([
      supabase
        .from("os_verification_codes")
        .select("id", { count: "exact", head: true })
        .eq("telefone_hash", telHash)
        .gte("created_at", since),
      supabase
        .from("os_verification_codes")
        .select("id", { count: "exact", head: true })
        .eq("ip_hash", ipHash)
        .gte("created_at", since),
    ]);

    if ((porTel ?? 0) >= MAX_CODES_PER_HOUR || (porIp ?? 0) >= MAX_CODES_PER_IP_HOUR) {
      return json(
        {
          error: "rate_limited",
          message: "Você já pediu vários códigos na última hora. Fale com o atendimento no WhatsApp.",
        },
        429,
      );
    }

    const { error } = await supabase.from("os_verification_codes").insert({
      telefone_hash: telHash,
      ip_hash: ipHash,
      code_hash: null,
      telefone_masked: mask(telefone),
      expires_at: new Date(Date.now() + CODE_TTL_MIN * 60_000).toISOString(),
    });

    if (error) {
      console.error("os-codigo request falhou:", error.message);
      return json({ error: "request_failed" }, 500);
    }

    return json({
      ok: true,
      expiraEmMinutos: CODE_TTL_MIN,
      telefoneMascarado: mask(telefone),
      entrega: "whatsapp_manual",
    });
  }


  // action === "verify"
  const codigo = typeof payload.codigo === "string" ? payload.codigo.replace(/\D/g, "") : "";
  if (codigo.length !== 6) return json({ error: "invalid_code_format" }, 400);

  const { data: registro, error: readError } = await supabase
    .from("os_verification_codes")
    .select("id, code_hash, expires_at, attempts, consumed_at")
    .eq("telefone_hash", telHash)
    .is("consumed_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (readError) {
    console.error("os-codigo verify falhou:", readError.message);
    return json({ error: "verify_failed" }, 500);
  }

  if (!registro) return json({ error: "code_not_found", message: "Peça um novo código." }, 400);
  if (!registro.code_hash) {
    return json(
      { error: "code_not_issued", message: "Seu código ainda será enviado pelo WhatsApp." },
      400,
    );
  }
  if (new Date(registro.expires_at).getTime() < Date.now()) {
    return json({ error: "code_expired", message: "Código expirado. Peça um novo." }, 400);
  }
  if ((registro.attempts ?? 0) >= MAX_ATTEMPTS) {
    return json({ error: "too_many_attempts", message: "Muitas tentativas. Peça um novo código." }, 429);
  }

  const esperado = await hashCode(registro.id, codigo);
  if (esperado !== registro.code_hash) {
    await supabase
      .from("os_verification_codes")
      .update({ attempts: (registro.attempts ?? 0) + 1 })
      .eq("id", registro.id);
    return json(
      { error: "code_mismatch", message: "Código incorreto.", tentativasRestantes: MAX_ATTEMPTS - (registro.attempts ?? 0) - 1 },
      400,
    );
  }

  await supabase
    .from("os_verification_codes")
    .update({ consumed_at: new Date().toISOString(), code_hash: null })
    .eq("id", registro.id);


  return json({
    ok: true,
    sessionToken: await signOsToken(telefone, "session", 30 * 60),
    expiraEmMinutos: 30,
  });
});
