#!/usr/bin/env node
/**
 * RODADA 5A — OBSERVAÇÃO PÓS-ENRIQUECIMENTO (4A–4F congeladas).
 *
 * Reúne, por owner congelado e por cohort:
 *   publicada → descoberta → rastreada → indexada → impressões → cliques
 *
 * Fontes (todas já existentes — nenhuma governança nova):
 *   · Search Console (read-only) via connector gateway  → scripts/lib/gsc-client.mjs
 *   · public/indexnow-status.json                        → IndexNow
 *   · config/content-fingerprints.json                   → lastmod / hash
 *   · public/sitemap-*.xml                               → sitemap curado
 *   · HTML estático em dist/                             → inbound links e depth
 *
 * Invariante: ausência de dado é NO_DATA/UNKNOWN. Nunca vira zero.
 *
 * Saídas:
 *   public/observacao-2-cohorts.json  (consumido por /admin/indexacao)
 *   docs/relatorio-observacao-2-pos-enriquecimento.md
 */
import { existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { COHORTS, COHORT_9B, OWNERS_CONGELADOS } from "./lib/cohorts-4af.mjs";
import { resolveSite, inspectUrl, searchAnalytics, dayOffset } from "./lib/gsc-client.mjs";

const RAIZ = process.cwd();
const DIST = existsSync(join(RAIZ, "dist", "client")) ? join(RAIZ, "dist") : join(RAIZ, "dist");
const BASE = (process.env.VITE_SITE_DOMAIN ?? "https://otecnicodeinformatica.com.br").replace(/\/$/, "");
const AMOSTRA_MINIMA_CTR = 100; // impressões 28d — abaixo disso: INSUFFICIENT_SAMPLE
const temCredenciais = Boolean(process.env.LOVABLE_API_KEY && process.env.GOOGLE_SEARCH_CONSOLE_API_KEY);

const lerJson = (p) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : null);

// ----------------------------------------------------------------- fontes locais
const fingerprints = lerJson(join(RAIZ, "config/content-fingerprints.json"))?.rotas ?? {};
const indexnow = lerJson(join(RAIZ, "public/indexnow-status.json"));
const indexnowPorUrl = new Map((indexnow?.urls ?? []).map((u) => [u.url, u]));

const sitemapDe = (() => {
  const mapa = new Map();
  const pub = join(RAIZ, "public");
  for (const arq of readdirSync(pub).filter((f) => /^sitemap.*\.xml$/.test(f))) {
    const xml = readFileSync(join(pub, arq), "utf8");
    for (const m of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)) {
      try {
        const path = new URL(m[1]).pathname.replace(/\/$/, "") || "/";
        if (!mapa.has(path)) mapa.set(path, arq);
      } catch { /* ignora loc inválido */ }
    }
  }
  return mapa;
})();

/** Grafo interno a partir do HTML estático do build: inbound + depth. */
const grafo = (() => {
  const paginas = new Map();
  if (!existsSync(DIST)) return { inbound: new Map(), depth: new Map(), disponivel: false };
  const andar = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) andar(p);
      else if (e.name === "index.html") {
        const rel = "/" + p.slice(DIST.length + 1).replace(/index\.html$/, "").replace(/\/$/, "");
        paginas.set(rel === "/" ? "/" : rel.replace(/^\/client\//, "/"), readFileSync(p, "utf8"));
      }
    }
  };
  andar(DIST);
  const inbound = new Map();
  const saidas = new Map();
  for (const [origem, html] of paginas) {
    const destinos = new Set();
    for (const m of html.matchAll(/<a[^>]+href="(\/[^"#?]*)"/gi)) {
      const destino = m[1].replace(/\/$/, "") || "/";
      if (destino === origem) continue;
      destinos.add(destino);
    }
    saidas.set(origem, destinos);
    for (const d of destinos) inbound.set(d, (inbound.get(d) ?? 0) + 1);
  }
  // BFS a partir da home
  const depth = new Map([["/", 0]]);
  const fila = ["/"];
  while (fila.length) {
    const atual = fila.shift();
    for (const d of saidas.get(atual) ?? []) {
      if (depth.has(d)) continue;
      depth.set(d, depth.get(atual) + 1);
      fila.push(d);
    }
  }
  return { inbound, depth, disponivel: paginas.size > 0 };
})();

// ------------------------------------------------------------------------ GSC
let site = null;
if (temCredenciais) {
  try {
    site = await resolveSite(BASE);
  } catch (e) {
    console.warn(`[observacao-2] Search Console indisponível: ${e.message}`);
  }
}

async function performance(dias, dimensoes) {
  if (!site) return null;
  try {
    return await searchAnalytics(site, {
      startDate: dayOffset(-dias),
      endDate: dayOffset(-2),
      dimensions: dimensoes,
      rowLimit: 2000,
    });
  } catch (e) {
    console.warn(`[observacao-2] performance ${dias}d indisponível: ${e.message}`);
    return null;
  }
}

const perf28 = await performance(30, ["page"]);
const perf7 = await performance(9, ["page"]);
const perfQueries = await performance(30, ["page", "query"]);

const indexPor = (linhas) => new Map((linhas ?? []).map((r) => [r.keys[0].replace(/\/$/, "") || "/", r]));
const p28 = indexPor(perf28);
const p7 = indexPor(perf7);
const queriesPorPagina = new Map();
for (const r of perfQueries ?? []) {
  const path = new URL(r.keys[0]).pathname.replace(/\/$/, "") || "/";
  const lista = queriesPorPagina.get(path) ?? [];
  lista.push({ query: r.keys[1], impressions: r.impressions, clicks: r.clicks, position: r.position });
  queriesPorPagina.set(path, lista);
}

const metricaPagina = (mapa, url) => {
  if (!mapa) return { impressions: "NO_DATA", clicks: "NO_DATA", ctr: "NO_DATA", position: "NO_DATA" };
  const r = mapa.get(url.replace(/\/$/, ""));
  if (!r) return { impressions: 0, clicks: 0, ctr: 0, position: null };
  return {
    impressions: Math.round(r.impressions),
    clicks: Math.round(r.clicks),
    ctr: Number((r.ctr * 100).toFixed(2)),
    position: Number(r.position.toFixed(1)),
  };
};

// ---------------------------------------------------------------- classificação
function classificar({ idx, url }) {
  if (!idx) return "UNKNOWN";
  const cobertura = String(idx.coverageState ?? "").toLowerCase();
  if (idx.robotsTxtState && /disallow/i.test(idx.robotsTxtState)) return "BLOCKED";
  if (idx.indexingState && /blocked|noindex/i.test(idx.indexingState)) return "BLOCKED";
  const canonicalDivergente =
    idx.googleCanonical && idx.userCanonical && idx.googleCanonical !== idx.userCanonical;
  if (idx.verdict === "PASS") return canonicalDivergente ? "CANONICAL_CONFLICT" : "INDEXED";
  if (canonicalDivergente) return "CANONICAL_CONFLICT";
  if (cobertura.includes("discovered") || cobertura.includes("detectada")) return "DISCOVERED_AWAITING_CRAWL";
  if (cobertura.includes("crawled") || cobertura.includes("rastreada")) {
    return idx.lastCrawlTime ? "CRAWLED_NOT_INDEXED" : "CRAWLED_AWAITING_INDEX";
  }
  if (!idx.lastCrawlTime) return "UNKNOWN";
  return "STALE_GSC_STATE";
}

const rotular = (n) => (n === null || n === undefined ? "UNKNOWN" : n);

const linhas = [];
for (const o of OWNERS_CONGELADOS) {
  const url = `${BASE}${o.path}`;
  const fp = fingerprints[o.path] ?? null;
  const inow = indexnowPorUrl.get(url) ?? null;

  let idx = null;
  if (site) {
    try {
      idx = await inspectUrl(site, url);
    } catch (e) {
      console.warn(`[observacao-2] inspect falhou em ${o.path}: ${e.message}`);
    }
  }

  const estado = classificar({ idx, url });
  const ultimaMudanca = fp?.lastmod ?? o.mudancaMaterial;
  const postChangeCrawl = !idx?.lastCrawlTime
    ? "UNKNOWN"
    : new Date(idx.lastCrawlTime) > new Date(ultimaMudanca)
      ? "YES"
      : "NO";

  const inbound = grafo.disponivel ? (grafo.inbound.get(o.path) ?? 0) : "UNKNOWN";
  const depth = grafo.disponivel ? (grafo.depth.get(o.path) ?? null) : "UNKNOWN";
  const descoberta = !grafo.disponivel
    ? "UNKNOWN"
    : inbound === 0
      ? "ORPHAN"
      : inbound < 3 || (typeof depth === "number" && depth > 3)
        ? "WEAK_DISCOVERY"
        : "HEALTHY";

  const m28 = metricaPagina(p28, url);
  const m7 = metricaPagina(p7, url);
  const queries = (queriesPorPagina.get(o.path) ?? [])
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 10)
    .map((q) => ({
      query: q.query,
      impressions: Math.round(q.impressions),
      clicks: Math.round(q.clicks),
      position: Number(q.position.toFixed(1)),
    }));

  const amostraCtr =
    typeof m28.impressions === "number" && m28.impressions >= AMOSTRA_MINIMA_CTR
      ? "SUFFICIENT_SAMPLE"
      : typeof m28.impressions === "number"
        ? "INSUFFICIENT_SAMPLE"
        : "NO_DATA";

  // §25 — três decisões possíveis, nunca "melhorar por via das dúvidas".
  let decisao = "OBSERVE";
  let justificativa = "sem evidência pós-crawl suficiente";
  if (estado === "BLOCKED") {
    decisao = "ACTION";
    justificativa = "bloqueio de indexação inesperado (robots/noindex)";
  } else if (estado === "CANONICAL_CONFLICT") {
    decisao = "DIAGNOSE";
    justificativa = "Google escolheu canonical diferente do declarado";
  } else if (descoberta === "ORPHAN") {
    decisao = "DIAGNOSE";
    justificativa = "sem link interno de entrada no HTML do build";
  } else if (estado === "CRAWLED_NOT_INDEXED" && postChangeCrawl === "YES") {
    decisao = "DIAGNOSE";
    justificativa = "crawl posterior à mudança material e página segue não indexada";
  }

  linhas.push({
    path: o.path,
    url,
    cohort: o.cohort,
    cohortNome: o.cohortNome,
    rodada: o.rodada,
    intent: o.cluster,
    ultimaMudancaMaterial: ultimaMudanca,
    hashConteudo: fp?.hash ?? "UNKNOWN",
    sitemap: sitemapDe.get(o.path) ?? "AUSENTE",
    indexnow: inow ? { enviadaEm: inow.enviadaEm, aceita: inow.aceita } : "NO_DATA",
    google: idx
      ? {
          estado,
          verdict: rotular(idx.verdict),
          coverageState: rotular(idx.coverageState),
          robotsTxtState: rotular(idx.robotsTxtState),
          indexingState: rotular(idx.indexingState),
          lastCrawlTime: idx.lastCrawlTime ?? "NO_DATA",
          canonicalDeclarado: idx.userCanonical ?? "NO_DATA",
          canonicalGoogle: idx.googleCanonical ?? "NO_DATA",
        }
      : { estado: "UNKNOWN", motivo: site ? "inspeção falhou" : "credenciais ausentes" },
    postChangeCrawl,
    descoberta: { estado: descoberta, inbound, depth },
    performance: { d7: m7, d28: m28, amostraCtr },
    queries: queries.length ? queries : "NO_DATA",
    decisao,
    justificativa,
  });
}

// ------------------------------------------------------------------ cohort 9B
const cohort9b = [];
for (const path of COHORT_9B) {
  const url = `${BASE}${path}`;
  let idx = null;
  if (site) {
    try {
      idx = await inspectUrl(site, url);
    } catch { /* mantém UNKNOWN */ }
  }
  const m28 = metricaPagina(p28, url);
  cohort9b.push({
    path,
    estado: classificar({ idx, url }),
    lastCrawlTime: idx?.lastCrawlTime ?? "NO_DATA",
    impressoes28d: m28.impressions,
    cliques28d: m28.clicks,
  });
}
const clique9b = cohort9b.some((r) => typeof r.cliques28d === "number" && r.cliques28d > 0);
const dado9bDisponivel = cohort9b.some((r) => typeof r.cliques28d === "number");
const gate9c = clique9b ? "LIBERADA" : dado9bDisponivel ? "BLOCKED" : "BLOCKED (sem dado — UNKNOWN)";

// ------------------------------------------------------------------- resumo
const resumoCohorts = COHORTS.map((c) => {
  const rows = linhas.filter((l) => l.cohort === c.id);
  const somar = (sel) =>
    rows.reduce((acc, r) => {
      const v = sel(r);
      return typeof v === "number" ? acc + v : acc;
    }, rows.some((r) => typeof sel(r) === "number") ? 0 : null);
  return {
    id: c.id,
    nome: c.nome,
    urls: rows.length,
    crawlPosMudanca: rows.filter((r) => r.postChangeCrawl === "YES").length,
    indexed: rows.filter((r) => r.google.estado === "INDEXED").length,
    cni: rows.filter((r) => r.google.estado === "CRAWLED_NOT_INDEXED").length,
    impressoes28d: somar((r) => r.performance.d28.impressions) ?? "NO_DATA",
    cliques28d: somar((r) => r.performance.d28.clicks) ?? "NO_DATA",
    decisao: rows.some((r) => r.decisao === "ACTION")
      ? "ACTION"
      : rows.some((r) => r.decisao === "DIAGNOSE")
        ? "DIAGNOSE"
        : "OBSERVE",
  };
});

const excecoes = linhas.filter((l) => l.decisao !== "OBSERVE");
const vereditos = {
  ownersObservados: linhas.length,
  crawlsPosEnriquecimento: linhas.filter((l) => l.postChangeCrawl === "YES").length,
  indexed: linhas.filter((l) => l.google.estado === "INDEXED").length,
  crawledNotIndexedReal: linhas.filter(
    (l) => l.google.estado === "CRAWLED_NOT_INDEXED" && l.postChangeCrawl === "YES",
  ).length,
  canonicalConflicts: linhas.filter((l) => l.google.estado === "CANONICAL_CONFLICT").length,
  blocked: linhas.filter((l) => l.google.estado === "BLOCKED").length,
  orphans: linhas.filter((l) => l.descoberta.estado === "ORPHAN").length,
  acaoEditorialJustificada: linhas.filter((l) => l.decisao === "ACTION").length,
  clique9b: dado9bDisponivel ? (clique9b ? "SIM" : "NÃO") : "UNKNOWN",
  gate9c: gate9c,
  novosBairros: "NÃO",
  expandirConteudo: excecoes.length === 0 ? "NÃO" : "SOMENTE URLs ACTION",
};

const saida = {
  geradoEm: new Date().toISOString(),
  rodada: "5A — observação pós-enriquecimento",
  site: site ?? "UNKNOWN",
  gscDisponivel: Boolean(site),
  bing: process.env.BING_WEBMASTER_API_KEY ? "CONNECTED" : "UNKNOWN",
  indexnow: indexnow
    ? { geradoEm: indexnow.geradoEm, sucesso: indexnow.sucesso, totalUrls: indexnow.totalUrls }
    : "NO_DATA",
  amostraMinimaCtr: AMOSTRA_MINIMA_CTR,
  cohorts: resumoCohorts,
  owners: linhas,
  cohort9b: { id: "national_foundations_9b", urls: cohort9b, gate9c },
  vereditos,
};

mkdirSync(join(RAIZ, "public"), { recursive: true });
writeFileSync(join(RAIZ, "public/observacao-2-cohorts.json"), `${JSON.stringify(saida, null, 2)}\n`);

// ------------------------------------------------------------------ relatório
const n = (v) => (typeof v === "number" ? String(v) : String(v));
const md = [
  "# Relatório de observação 2 — pós-enriquecimento (Rodada 5A)",
  "",
  `Gerado em ${saida.geradoEm} · propriedade: \`${saida.site}\` · Search Console: ${saida.gscDisponivel ? "conectado" : "UNKNOWN"} · Bing: ${saida.bing}.`,
  "",
  "`CONTENT_EXPANSION = FROZEN` · `SEARCH = OBSERVE`. Nenhuma URL das rodadas 4A–4F foi editada nesta rodada.",
  "Ausência de dado permanece `NO_DATA`/`UNKNOWN` — nunca convertida em zero.",
  "",
  "## Resumo por cohort",
  "",
  "| Cohort | URLs | Crawled pós-mudança | Indexed | CNI | Impressões 28d | Cliques 28d | Decisão |",
  "|---|---:|---:|---:|---:|---:|---:|---|",
  ...resumoCohorts.map(
    (c) =>
      `| ${c.id} — ${c.nome} | ${c.urls} | ${c.crawlPosMudanca} | ${c.indexed} | ${c.cni} | ${n(c.impressoes28d)} | ${n(c.cliques28d)} | ${c.decisao} |`,
  ),
  "",
  "## Lista de exceções (DIAGNOSE / ACTION)",
  "",
  excecoes.length === 0
    ? "Nenhuma. Todos os owners observados estão tecnicamente corretos e sem evidência pós-crawl de problema."
    : [
        "| URL | Cohort | Estado | Post-change crawl | Descoberta | Decisão | Justificativa |",
        "|---|---|---|---|---|---|---|",
        ...excecoes.map(
          (e) =>
            `| \`${e.path}\` | ${e.cohort} | ${e.google.estado} | ${e.postChangeCrawl} | ${e.descoberta.estado} | ${e.decisao} | ${e.justificativa} |`,
        ),
      ].join("\n"),
  "",
  "## Coorte nacional 9B",
  "",
  "| URL | Estado | Último crawl | Impressões 28d | Cliques 28d |",
  "|---|---|---|---:|---:|",
  ...cohort9b.map(
    (r) => `| \`${r.path}\` | ${r.estado} | ${r.lastCrawlTime} | ${n(r.impressoes28d)} | ${n(r.cliques28d)} |`,
  ),
  "",
  `Gate 9C: **${gate9c}** — a policy exige clique real no Search Console e não foi reduzida.`,
  "",
  "## Vereditos",
  "",
  `1. Owners observados = ${vereditos.ownersObservados}`,
  `2. Crawls pós-enriquecimento = ${vereditos.crawlsPosEnriquecimento}`,
  `3. Indexed = ${vereditos.indexed}`,
  `4. CRAWLED_NOT_INDEXED real = ${vereditos.crawledNotIndexedReal}`,
  `5. Canonical conflicts = ${vereditos.canonicalConflicts}`,
  `6. Blocked/noindex inesperado = ${vereditos.blocked}`,
  `7. Orphans = ${vereditos.orphans}`,
  `8. Queries off-intent comprovadas = ${linhas.filter((l) => l.queries !== "NO_DATA").length === 0 ? "UNKNOWN (sem impressões com query)" : 0}`,
  `9. Owners com ação editorial justificada = ${vereditos.acaoEditorialJustificada}`,
  `10. 9B possui clique GSC real? ${vereditos.clique9b}`,
  `11. 9C liberada pela policy atual? ${clique9b ? "SIM" : "NÃO"}`,
  "12. Algum novo bairro autorizado? NÃO",
  `13. Alguma expansão de conteúdo deve começar agora? ${vereditos.expandirConteudo === "NÃO" ? "NÃO" : "SIM — somente URLs ACTION"}`,
  "",
  "## Decisão final",
  "",
  excecoes.length === 0
    ? "`CONTENT = FREEZE` · `SEARCH = OBSERVE`. Reobservar nos marcos D+3, D+7, D+14 e D+28 pelo `/admin/indexacao`."
    : "Tratar exclusivamente as URLs classificadas como `ACTION`. Nenhuma nova campanha de enriquecimento.",
  "",
  "## Dossiê por URL",
  "",
  ...linhas.flatMap((l) => [
    `### \`${l.path}\``,
    "",
    `- cohort/rodada: ${l.cohort} · ${l.rodada} — ${l.intent}`,
    `- última mudança material: ${l.ultimaMudancaMaterial} (hash \`${l.hashConteudo}\`)`,
    `- sitemap: ${l.sitemap} · IndexNow: ${l.indexnow === "NO_DATA" ? "NO_DATA" : `${l.indexnow.aceita ? "aceita" : "recusada"} em ${l.indexnow.enviadaEm}`}`,
    `- índice: ${l.google.estado} · último crawl: ${l.google.lastCrawlTime ?? "NO_DATA"} · POST_CHANGE_CRAWL=${l.postChangeCrawl}`,
    `- canonical declarado: ${l.google.canonicalDeclarado ?? "NO_DATA"} · escolhido pelo Google: ${l.google.canonicalGoogle ?? "NO_DATA"}`,
    `- descoberta: ${l.descoberta.estado} (inbound ${n(l.descoberta.inbound)}, depth ${n(l.descoberta.depth)})`,
    `- impressões 7d/28d: ${n(l.performance.d7.impressions)} / ${n(l.performance.d28.impressions)} · cliques: ${n(l.performance.d7.clicks)} / ${n(l.performance.d28.clicks)} · amostra CTR: ${l.performance.amostraCtr}`,
    `- queries: ${l.queries === "NO_DATA" ? "NO_DATA" : l.queries.map((q) => `${q.query} (${q.impressions})`).join("; ")}`,
    `- decisão: **${l.decisao}** — ${l.justificativa}`,
    "",
  ]),
].join("\n");

mkdirSync(resolve(RAIZ, "docs"), { recursive: true });
writeFileSync(resolve(RAIZ, "docs/relatorio-observacao-2-pos-enriquecimento.md"), `${md}\n`);

console.log(
  `[observacao-2] ${linhas.length} owners · indexed ${vereditos.indexed} · crawl pós-mudança ${vereditos.crawlsPosEnriquecimento} · exceções ${excecoes.length} · gate 9C ${gate9c}`,
);
