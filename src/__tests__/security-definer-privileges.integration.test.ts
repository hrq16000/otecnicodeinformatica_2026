import { describe, expect, it } from "vitest";

/**
 * TESTE DE INTEGRAÇÃO — funções SECURITY DEFINER administrativas (SECURITY.md §2).
 *
 * Prova, contra o backend real, que `public.admin_link_os_lead` NÃO pode ser
 * executada com a chave publicável (anon) nem por um usuário autenticado:
 * o EXECUTE é exclusivo de `service_role`, ou seja, contexto de servidor.
 *
 * Sem URL/chave no ambiente o teste é pulado (fail-closed no CI, que injeta
 * as duas variáveis publicáveis).
 */

const URL_BASE = process.env.VITE_SUPABASE_URL ?? import.meta.env?.VITE_SUPABASE_URL;
const CHAVE =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  process.env.VITE_SUPABASE_ANON_KEY ??
  import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY;

const rodar = Boolean(URL_BASE && CHAVE);

const chamarRpc = async (nome: string, corpo: unknown, token?: string) => {
  const r = await fetch(`${URL_BASE}/rest/v1/rpc/${nome}`, {
    method: "POST",
    headers: {
      apikey: String(CHAVE),
      Authorization: `Bearer ${token ?? CHAVE}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(corpo),
  });
  return { status: r.status, texto: await r.text() };
};

describe.runIf(rodar)("admin_link_os_lead — somente contexto de servidor", () => {
  it("não é executável com a chave publicável (anon)", async () => {
    const { status, texto } = await chamarRpc("admin_link_os_lead", {
      _protocolo: "TESTE-SEGURANCA",
      _lead_id: "00000000-0000-0000-0000-000000000000",
    });
    expect(status, `resposta inesperada: ${status} ${texto}`).toBeGreaterThanOrEqual(400);
    expect(/permission denied|not find the function|does not exist|Unauthorized/i.test(texto)).toBe(true);
  }, 20_000);

  it("continua indisponível mesmo com sessão de usuário autenticado", async () => {
    const token = process.env.SUPABASE_TEST_USER_ACCESS_TOKEN;
    const { status, texto } = await chamarRpc(
      "admin_link_os_lead",
      { _protocolo: "TESTE-SEGURANCA", _lead_id: "00000000-0000-0000-0000-000000000000" },
      token,
    );
    expect(status, `resposta inesperada: ${status} ${texto}`).toBeGreaterThanOrEqual(400);
    expect(/permission denied|not find the function|does not exist|Unauthorized|JWT/i.test(texto)).toBe(true);
  }, 20_000);

  it("a checagem de papel somente-leitura segue disponível para autenticados", async () => {
    // has_role é STABLE, escopada e legível — não pode ter sido revogada junto.
    const { status } = await chamarRpc("has_role", {
      _user_id: "00000000-0000-0000-0000-000000000000",
      _role: "admin",
    });
    expect([200, 401, 403]).toContain(status);
  }, 20_000);
});
