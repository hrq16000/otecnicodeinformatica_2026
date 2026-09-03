#!/usr/bin/env node
/**
 * SNAPSHOT REAL DO GOOGLE SEARCH CONSOLE → src/data/gscSnapshot.json
 *
 * Fonte única dos dados de indexação e desempenho exibidos em
 * /admin/seo e /admin/afirmacoes. Fail-closed: sem credenciais do
 * conector, o snapshot existente é preservado e o script sai em modo
 * "indisponível" — nunca inventa número nem estima posição.
 *
 * Uso:
 *   node scripts/report-gsc-snapshot.mjs            # desempenho + sitemaps
 *   node scripts/report-gsc-snapshot.mjs --inspect  # + inspeção de URL (cota)
 *
 * Requisitos de ambiente:
 *   LOVABLE_API_KEY                 auth do gateway
 *   GOOGLE_SEARCH_CONSOLE_API_KEY   chave da conexão do conector
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { CURATED_PATHS } from "./lib/curated-urls.mjs";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const OUT = resolve("src/data/gscSnapshot.json");
const SITE = "https://otecnicodeinformatica.com.br";
const DIAS = 28;
/** URLs inspecionadas individualmente (cota da API é limitada). */
const URLS_INSPECAO = [
  "/",
  "/guia-tecnico-informatica",
  "/problemas",
  "/decisoes/consertar-ou-substituir",
  "/servicos/manutencao-de-computador",
  "/blog/o-que-e-informatica",
  "/entidades",
  "/glossario",
];

const key = process.env.LOVABLE_API_KEY;
const conn = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;

function saidaIndisponivel(motivo) {
  const anterior = existsSync(OUT)
    ? JSON.parse(readFileSync(OUT, "utf8"))
    : null;
  const base = anterior ?? {
    status: "indisponivel",
    motivo,
    geradoEm: null,
    propriedade: null,
    periodo: null,
    totais: null,
    paginas: [],
    consultasTop: [],
    inventario: [],
    inspecoes: [],
    sitemaps: [],
  };
  if (!anterior) writeFileSync(OUT, `${JSON.stringify(base, null, 2)}\n`);
  console.log(`── report:gsc-snapshot ──\n  indisponível: ${motivo}`);
  console.log(
    anterior
      ? "  snapshot anterior preservado (fail-closed)."
      : "  snapshot vazio escrito.",
  );
  process.exit(0);
}

if (!key || !conn)
  saidaIndisponivel("credenciais do conector ausentes no ambiente");

const headers = {
  Authorization: `Bearer ${key}`,
  "X-Connection-Api-Key": conn,
  "Content-Type": "application/json",
};

async function api(path, init = {}) {
  const res = await fetch(`${GATEWAY}${path}`, { ...init, headers });
  const texto = await res.text();
  if (!res.ok)
    throw new Error(`GSC ${path} [${res.status}]: ${texto.slice(0, 400)}`);
  return texto ? JSON.parse(texto) : {};
}

function cobre(siteUrl, alvo) {
  if (siteUrl.startsWith("sc-domain:")) {
    const dominio = siteUrl.slice("sc-domain:".length).toLowerCase();
    const host = new URL(alvo).hostname.toLowerCase();
    return host === dominio || host.endsWith(`.${dominio}`);
  }
  try {
    return alvo.startsWith(new URL(siteUrl).href);
  } catch {
    return false;
  }
}

const iso = (d) => d.toISOString().slice(0, 10);

const main = async () => {
  const { siteEntry = [] } = await api("/webmasters/v3/sites");
  const verificadas = siteEntry.filter(
    (e) => e.permissionLevel !== "siteUnverifiedUser",
  );
  const candidatas = verificadas.filter((e) => cobre(e.siteUrl, SITE));
  if (candidatas.length === 0)
    saidaIndisponivel("nenhuma propriedade verificada cobre o domínio");
  if (candidatas.length > 1) {
    saidaIndisponivel(
      `múltiplas propriedades cobrem o domínio (${candidatas.map((c) => c.siteUrl).join(", ")}) — escolha explícita necessária`,
    );
  }
  const siteUrl = candidatas[0].siteUrl;
  const enc = encodeURIComponent(siteUrl);

  const fim = new Date(Date.now() - 3 * 86400000);
  const inicio = new Date(fim.getTime() - DIAS * 86400000);
  const periodo = { inicio: iso(inicio), fim: iso(fim) };

  const consulta = (dimensions, rowLimit) =>
    api(`/webmasters/v3/sites/${enc}/searchAnalytics/query`, {
      method: "POST",
      body: JSON.stringify({
        startDate: periodo.inicio,
        endDate: periodo.fim,
        dimensions,
        rowLimit,
        type: "web",
      }),
    });

  const [totalRes, porPagina] = await Promise.all([
    consulta([], 1),
    consulta(["page", "query"], 1000),
  ]);

  const t = totalRes.rows?.[0];
  const totais = t
    ? {
        cliques: t.clicks,
        impressoes: t.impressions,
        ctr: t.ctr,
        posicao: t.position,
      }
    : { cliques: 0, impressoes: 0, ctr: 0, posicao: null };

  const mapa = new Map();
  for (const row of porPagina.rows ?? []) {
    const [url, query] = row.keys;
    const atual = mapa.get(url) ?? {
      url,
      cliques: 0,
      impressoes: 0,
      consultas: [],
    };
    atual.cliques += row.clicks;
    atual.impressoes += row.impressions;
    atual.consultas.push({
      termo: query,
      cliques: row.clicks,
      impressoes: row.impressions,
      posicao: Number(row.position.toFixed(1)),
    });
    mapa.set(url, atual);
  }
  const paginas = [...mapa.values()]
    .map((p) => {
      const consultas = p.consultas.sort((a, b) => b.impressoes - a.impressoes);
      const soma = consultas.reduce(
        (acc, c) => acc + c.posicao * c.impressoes,
        0,
      );
      return {
        ...p,
        caminho: (() => {
          try {
            return new URL(p.url).pathname;
          } catch {
            return p.url;
          }
        })(),
        posicaoMedia: p.impressoes
          ? Number((soma / p.impressoes).toFixed(1))
          : null,
        consultas: consultas.slice(0, 15),
      };
    })
    .sort((a, b) => b.impressoes - a.impressoes);

  // RASTREADOR DE CONSULTAS — termos reais mais buscados que trouxeram o portal.
  const consultasRes = await consulta(["query"], 500);
  const consultasTop = (consultasRes.rows ?? [])
    .map((r) => ({
      termo: r.keys[0],
      cliques: r.clicks,
      impressoes: r.impressions,
      ctr: Number((r.ctr ?? 0).toFixed(4)),
      posicao: Number((r.position ?? 0).toFixed(1)),
    }))
    .sort((a, b) => b.impressoes - a.impressoes);

  let sitemaps = [];
  try {
    const res = await api(`/webmasters/v3/sites/${enc}/sitemaps`);
    sitemaps = (res.sitemap ?? []).map((s) => ({
      path: s.path,
      ultimoEnvio: s.lastSubmitted ?? null,
      ultimoDownload: s.lastDownloaded ?? null,
      erros: Number(s.errors ?? 0),
      avisos: Number(s.warnings ?? 0),
      urlsEnviadas: Number(s.contents?.[0]?.submitted ?? 0),
      pendente: Boolean(s.isPending),
    }));
  } catch (e) {
    console.warn(`  aviso: sitemaps indisponíveis — ${e.message}`);
  }

  const inspecoes = [];
  const argInspect = process.argv.find((a) => a.startsWith("--inspect"));
  if (argInspect) {
    const limite = Number(argInspect.split("=")[1] ?? 0) || URLS_INSPECAO.length;
    const anteriores = existsSync(OUT)
      ? JSON.parse(readFileSync(OUT, "utf8")).inspecoes ?? []
      : [];
    const jaLidas = new Set(anteriores.filter((i) => i.veredito !== "ERRO").map((i) => i.caminho));
    // prioriza a lista fixa e completa com URLs curadas ainda não inspecionadas
    const fila = [...URLS_INSPECAO, ...CURATED_PATHS.filter((c) => !URLS_INSPECAO.includes(c) && !jaLidas.has(c))].slice(0, limite);
    inspecoes.push(...anteriores.filter((i) => !fila.includes(i.caminho) && i.veredito !== "ERRO"));
    for (const caminho of fila) {
      try {
        const res = await api("/v1/urlInspection/index:inspect", {
          method: "POST",
          body: JSON.stringify({ inspectionUrl: `${SITE}${caminho}`, siteUrl }),
        });
        const r = res.inspectionResult?.indexStatusResult ?? {};
        inspecoes.push({
          caminho,
          veredito: r.verdict ?? "UNKNOWN",
          cobertura: r.coverageState ?? null,
          robots: r.robotsTxtState ?? null,
          busca: r.pageFetchState ?? null,
          canonicoGoogle: r.googleCanonical ?? null,
          canonicoDeclarado: r.userCanonical ?? null,
          ultimoRastreio: r.lastCrawlTime ?? null,
        });
      } catch (e) {
        inspecoes.push({
          caminho,
          veredito: "ERRO",
          erro: e.message.slice(0, 200),
        });
        if (e.message.includes("[429]") || e.message.includes("[403]")) break;
      }
    }
  } else if (existsSync(OUT)) {
    // sem --inspect, preserva a última inspeção real conhecida
    inspecoes.push(...(JSON.parse(readFileSync(OUT, "utf8")).inspecoes ?? []));
  }

  // INVENTÁRIO COMPLETO — toda URL curada recebe um estado real, mesmo sem dados.
  const norm = (c) => (c && c.length > 1 ? c.replace(/\/+$/, "") : "/");
  const perfPorCaminho = new Map(paginas.map((p) => [norm(p.caminho), p]));
  const inspPorCaminho = new Map(inspecoes.map((i) => [norm(i.caminho), i]));
  const inventario = CURATED_PATHS.map((caminho) => {
    const p = perfPorCaminho.get(norm(caminho));
    const i = inspPorCaminho.get(norm(caminho));
    const estado = i?.veredito === "PASS"
      ? "indexada"
      : i && i.veredito !== "ERRO"
        ? "nao-indexada"
        : p && p.impressoes > 0
          ? "com-impressoes"
          : "sem-dados";
    return {
      caminho,
      estado,
      cobertura: i?.cobertura ?? null,
      ultimoRastreio: i?.ultimoRastreio ?? null,
      cliques: p?.cliques ?? 0,
      impressoes: p?.impressoes ?? 0,
      posicaoMedia: p?.posicaoMedia ?? null,
      consultaPrincipal: p?.consultas?.[0]?.termo ?? null,
    };
  }).sort((a, b) => b.impressoes - a.impressoes || a.caminho.localeCompare(b.caminho));

  const snapshot = {
    status: "ok",
    geradoEm: new Date().toISOString(),
    propriedade: { siteUrl, dominio: SITE },
    periodo,
    totais,
    paginas,
    consultasTop,
    inventario,
    inspecoes,
    sitemaps,
    limitacoes:
      "Dados do Search Console têm atraso de ~2 dias e omitem linhas de volume muito baixo. O snapshot lê o índice do Google — não é teste ao vivo nem pedido de indexação.",
  };

  writeFileSync(OUT, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log("── report:gsc-snapshot ──");
  console.log(
    `  propriedade: ${siteUrl} · período ${periodo.inicio} → ${periodo.fim}`,
  );
  console.log(
    `  inventário curado: ${inventario.length} urls · consultas reais: ${consultasTop.length}`,
  );
  console.log(
    `  cliques ${totais.cliques} · impressões ${totais.impressoes} · páginas com dados ${paginas.length} · inspeções ${inspecoes.length} · sitemaps ${sitemaps.length}`,
  );
};

main().catch((e) => {
  console.error(`report:gsc-snapshot falhou — ${e.message}`);
  process.exit(1);
});
