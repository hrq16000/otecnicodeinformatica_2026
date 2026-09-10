import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * CHECAGEM DE PROPAGAÇÃO DNS — /admin/seo.
 *
 * Consulta resolvedores públicos por DNS-over-HTTPS (JSON) e faz um HEAD no
 * host. Nada é estimado: quando o resolvedor não responde, o status é
 * DESCONHECIDO — nunca "propagado".
 */

type Resolver = { nome: string; url: string };

const RESOLVERS: Resolver[] = [
  { nome: "Cloudflare", url: "https://cloudflare-dns.com/dns-query" },
  { nome: "Google", url: "https://dns.google/resolve" },
  { nome: "Quad9", url: "https://dns.quad9.net:5053/dns-query" },
];

export type ResolverResultado = {
  resolver: string;
  status: "OK" | "SEM_REGISTRO" | "DESCONHECIDO";
  valores: string[];
  confere: boolean;
  erro?: string;
};

export type ChecagemDns = {
  hostname: string;
  tipo: string;
  valorEsperado: string;
  resolvers: ResolverResultado[];
  propagacao: number;
  http: { status: number | null; redirectPara: string | null; erro?: string };
  checadoEm: string;
};

const TIPO_NUM: Record<string, number> = { A: 1, AAAA: 28, CNAME: 5, TXT: 16 };

async function consultar(
  resolver: Resolver,
  hostname: string,
  tipo: string,
): Promise<ResolverResultado> {
  const url = `${resolver.url}?name=${encodeURIComponent(hostname)}&type=${encodeURIComponent(tipo)}`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const response = await fetch(url, {
      headers: { accept: "application/dns-json" },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!response.ok) {
      return {
        resolver: resolver.nome,
        status: "DESCONHECIDO",
        valores: [],
        confere: false,
        erro: `HTTP ${response.status}`,
      };
    }
    const payload = (await response.json()) as {
      Answer?: { type: number; data: string }[];
    };
    const alvo = TIPO_NUM[tipo] ?? 1;
    const valores = (payload.Answer ?? [])
      .filter((entry) => entry.type === alvo)
      .map((entry) => entry.data.replace(/^"|"$/g, "").replace(/\.$/, ""));
    return {
      resolver: resolver.nome,
      status: valores.length > 0 ? "OK" : "SEM_REGISTRO",
      valores,
      confere: false,
    };
  } catch (error) {
    return {
      resolver: resolver.nome,
      status: "DESCONHECIDO",
      valores: [],
      confere: false,
      erro: error instanceof Error ? error.message : "falha na consulta",
    };
  }
}

async function checarHttp(hostname: string) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(`https://${hostname}/`, {
      method: "HEAD",
      redirect: "manual",
      signal: controller.signal,
    });
    clearTimeout(timer);
    return {
      status: response.status,
      redirectPara: response.headers.get("location"),
    };
  } catch (error) {
    return {
      status: null,
      redirectPara: null,
      erro: error instanceof Error ? error.message : "sem resposta",
    };
  }
}

export const checarPropagacaoDns = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { hostname: string; tipo: string; valorEsperado: string }) => {
    const hostname = String(data.hostname ?? "").trim().toLowerCase();
    if (!/^[a-z0-9.-]{4,253}$/.test(hostname)) throw new Error("Host inválido");
    const tipo = String(data.tipo ?? "A").trim().toUpperCase();
    if (!(tipo in TIPO_NUM)) throw new Error("Tipo de registro não suportado");
    return {
      hostname,
      tipo,
      valorEsperado: String(data.valorEsperado ?? "").trim().slice(0, 300),
    };
  })
  .handler(async ({ data }): Promise<ChecagemDns> => {
    const [resolvers, http] = await Promise.all([
      Promise.all(RESOLVERS.map((resolver) => consultar(resolver, data.hostname, data.tipo))),
      checarHttp(data.hostname),
    ]);

    const esperado = data.valorEsperado.replace(/\.$/, "").toLowerCase();
    const avaliados = resolvers.map((item) => ({
      ...item,
      confere:
        item.status === "OK" &&
        (esperado.length === 0 ||
          item.valores.some((valor) => valor.toLowerCase() === esperado)),
    }));

    const confirmados = avaliados.filter((item) => item.confere).length;

    return {
      hostname: data.hostname,
      tipo: data.tipo,
      valorEsperado: data.valorEsperado,
      resolvers: avaliados,
      propagacao: Math.round((confirmados / avaliados.length) * 100),
      http,
      checadoEm: new Date().toISOString(),
    };
  });
