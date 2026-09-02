/**
 * Cliente mínimo do Bing Webmaster Tools (API JSON oficial).
 *
 * Segredo esperado no ambiente do job:
 *   BING_WEBMASTER_API_KEY   chave gerada em Bing Webmaster Tools → API access
 * Opcional: BING_SITE_URL (default: VITE_SITE_DOMAIN).
 *
 * Fail-closed: sem chave, `bingDisponivel()` é false e nenhum número é
 * inventado — quem consome registra UNKNOWN, nunca zero.
 */
const BASE = "https://ssl.bing.com/webmaster/api.svc/json";

export function bingSiteUrl() {
  const site = process.env.BING_SITE_URL ?? process.env.VITE_SITE_DOMAIN ?? "https://otecnicodeinformatica.com.br";
  return site.replace(/\/$/, "") + "/";
}

export function bingDisponivel() {
  return Boolean(process.env.BING_WEBMASTER_API_KEY);
}

async function bing(metodo, params = {}) {
  const apikey = process.env.BING_WEBMASTER_API_KEY;
  if (!apikey) throw new Error("BING_WEBMASTER_API_KEY ausente.");
  const url = new URL(`${BASE}/${metodo}`);
  url.searchParams.set("apikey", apikey);
  url.searchParams.set("siteUrl", bingSiteUrl());
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const texto = await res.text();
  if (!res.ok) throw new Error(`Bing [${res.status}] ${metodo} → ${texto.slice(0, 240)}`);
  const json = texto ? JSON.parse(texto) : {};
  return json.d ?? json;
}

/** Converte /Date(1690000000000)/ em ISO; devolve null quando não reconhece. */
export function bingData(valor) {
  const m = typeof valor === "string" ? valor.match(/\/Date\((\d+)/) : null;
  return m ? new Date(Number(m[1])).toISOString().slice(0, 10) : null;
}

/** Cliques/impressões agregados do site (série diária). */
export async function bingTrafficStats() {
  const linhas = await bing("GetRankAndTrafficStats");
  return (Array.isArray(linhas) ? linhas : []).map((l) => ({
    data: bingData(l.Date),
    cliques: Number(l.Clicks ?? 0),
    impressoes: Number(l.Impressions ?? 0),
  }));
}

/** Cliques/impressões por página. */
export async function bingPageStats() {
  const linhas = await bing("GetPageStats");
  return (Array.isArray(linhas) ? linhas : []).map((l) => ({
    url: l.Query ?? l.Url ?? null,
    cliques: Number(l.Clicks ?? 0),
    impressoes: Number(l.Impressions ?? 0),
  }));
}

/** Consultas de busca com cliques/impressões. */
export async function bingQueryStats() {
  const linhas = await bing("GetQueryStats");
  return (Array.isArray(linhas) ? linhas : []).map((l) => ({
    consulta: l.Query ?? null,
    cliques: Number(l.Clicks ?? 0),
    impressoes: Number(l.Impressions ?? 0),
    posicao: l.AvgImpressionPosition ?? null,
  }));
}

/** Cobertura de rastreio: descobertas, rastreadas, bloqueadas, erros. */
export async function bingCrawlStats() {
  const linhas = await bing("GetCrawlStats");
  const lista = Array.isArray(linhas) ? linhas : [];
  const soma = (campo) => lista.reduce((acc, l) => acc + Number(l[campo] ?? 0), 0);
  return {
    dias: lista.length,
    rastreadas: soma("CrawledPages"),
    naIndexacao: soma("InIndex"),
    bloqueadasRobots: soma("BlockedByRobotsTxt"),
    erros: soma("CrawlErrors"),
    codigos4xx: soma("Code4xx"),
    codigos5xx: soma("Code5xx"),
  };
}
