#!/usr/bin/env node
/**
 * RELATÓRIO AUTOMÁTICO PÓS-DEPLOY — INDEXAÇÃO + DIFF DE SITEMAP/LASTMOD.
 *
 * Objetivo: identificar queda cedo. Compara o estado atual contra o último
 * baseline salvo e reporta:
 *   · URLs que saíram do sitemap (remoção silenciosa é o pior sintoma);
 *   · URLs novas no sitemap;
 *   · lastmod que retrocedeu ou sumiu;
 *   · perda de índice no Google (INDEXED → outro estado);
 *   · queda de impressões/cliques 28d além do limiar;
 *   · status do Bing/IndexNow (UNKNOWN quando não conectado).
 *
 * Fail-closed: sem credenciais, o bloco do Google fica UNKNOWN — nunca zero.
 *
 * Uso:
 *   node scripts/report-post-deploy-indexacao.mjs           # compara e reporta
 *   node scripts/report-post-deploy-indexacao.mjs --baseline # grava baseline
 *   ... --strict                                            # exit 1 em queda
 */
import { existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { resolveSite, inspectUrl, searchAnalytics, dayOffset } from "./lib/gsc-client.mjs";
import { OWNERS_CONGELADOS } from "./lib/cohorts-4af.mjs";

const RAIZ = process.cwd();
const BASE = (process.env.VITE_SITE_DOMAIN ?? "https://otecnicodeinformatica.com.br").replace(/\/$/, "");
const QUEDA_RELATIVA = 0.5; // -50% em impressões 28d com amostra relevante
const AMOSTRA_QUEDA = 50;
const gravarBaseline = process.argv.includes("--baseline");
const estrito = process.argv.includes("--strict");
const BASELINE = join(RAIZ, "reports/post-deploy-index-baseline.json");

// ------------------------------------------------------------- sitemap atual
const sitemapAtual = {};
const pub = join(RAIZ, "public");
for (const arq of readdirSync(pub).filter((f) => /^sitemap.*\.xml$/.test(f))) {
  const xml = readFileSync(join(pub, arq), "utf8");
  for (const bloco of xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)) {
    const loc = /<loc>\s*([^<\s]+)\s*<\/loc>/i.exec(bloco[1])?.[1];
    if (!loc) continue;
    const lastmod = /<lastmod>\s*([^<\s]+)\s*<\/lastmod>/i.exec(bloco[1])?.[1] ?? null;
    let path;
    try {
      path = new URL(loc).pathname.replace(/\/$/, "") || "/";
    } catch {
      continue;
    }
    sitemapAtual[path] = { sitemap: arq, lastmod };
  }
}

// ------------------------------------------------------------------- Google
const temCredenciais = Boolean(process.env.LOVABLE_API_KEY && process.env.GOOGLE_SEARCH_CONSOLE_API_KEY);
let site = null;
if (temCredenciais) {
  try {
    site = await resolveSite(BASE);
  } catch (e) {
    console.warn(`[pos-deploy] Search Console indisponível: ${e.message}`);
  }
}

let performance = null;
if (site) {
  try {
    const rows = await searchAnalytics(site, {
      startDate: dayOffset(-30),
      endDate: dayOffset(-2),
      dimensions: ["page"],
      rowLimit: 2000,
    });
    performance = new Map(rows.map((r) => [new URL(r.keys[0]).pathname.replace(/\/$/, "") || "/", r]));
  } catch (e) {
    console.warn(`[pos-deploy] performance indisponível: ${e.message}`);
  }
}

const indexacaoAtual = {};
for (const o of OWNERS_CONGELADOS) {
  const url = `${BASE}${o.path}`;
  let estado = "UNKNOWN";
  let lastCrawlTime = "NO_DATA";
  if (site) {
    try {
      const idx = await inspectUrl(site, url);
      estado = idx.verdict === "PASS" ? "INDEXED" : (idx.coverageState ?? "UNKNOWN");
      lastCrawlTime = idx.lastCrawlTime ?? "NO_DATA";
    } catch (e) {
      estado = "UNKNOWN";
      lastCrawlTime = "NO_DATA";
      console.warn(`[pos-deploy] inspect falhou em ${o.path}: ${e.message}`);
    }
  }
  const linha = performance?.get(o.path);
  indexacaoAtual[o.path] = {
    estado,
    lastCrawlTime,
    impressoes28d: performance ? Math.round(linha?.impressions ?? 0) : "NO_DATA",
    cliques28d: performance ? Math.round(linha?.clicks ?? 0) : "NO_DATA",
  };
}

const snapshot = {
  geradoEm: new Date().toISOString(),
  site: site ?? "UNKNOWN",
  bing: process.env.BING_WEBMASTER_API_KEY ? "CONNECTED" : "UNKNOWN",
  sitemap: sitemapAtual,
  indexacao: indexacaoAtual,
};

mkdirSync(join(RAIZ, "reports"), { recursive: true });

if (gravarBaseline || !existsSync(BASELINE)) {
  writeFileSync(BASELINE, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`[pos-deploy] baseline gravado (${Object.keys(sitemapAtual).length} URLs no sitemap).`);
  if (gravarBaseline) process.exit(0);
}

const anterior = JSON.parse(readFileSync(BASELINE, "utf8"));
const quedas = [];
const avisos = [];

for (const path of Object.keys(anterior.sitemap ?? {})) {
  if (!sitemapAtual[path]) quedas.push(`sitemap: \`${path}\` saiu do sitemap`);
}
for (const path of Object.keys(sitemapAtual)) {
  if (!anterior.sitemap?.[path]) avisos.push(`sitemap: \`${path}\` é novo no sitemap`);
}
for (const [path, atual] of Object.entries(sitemapAtual)) {
  const antes = anterior.sitemap?.[path];
  if (!antes) continue;
  if (antes.lastmod && !atual.lastmod) quedas.push(`lastmod: \`${path}\` perdeu o lastmod`);
  else if (antes.lastmod && atual.lastmod && new Date(atual.lastmod) < new Date(antes.lastmod))
    quedas.push(`lastmod: \`${path}\` retrocedeu (${antes.lastmod} → ${atual.lastmod})`);
}
for (const [path, atual] of Object.entries(indexacaoAtual)) {
  const antes = anterior.indexacao?.[path];
  if (!antes) continue;
  if (antes.estado === "INDEXED" && atual.estado !== "INDEXED" && atual.estado !== "UNKNOWN")
    quedas.push(`índice: \`${path}\` saiu de INDEXED para ${atual.estado}`);
  if (
    typeof antes.impressoes28d === "number" &&
    typeof atual.impressoes28d === "number" &&
    antes.impressoes28d >= AMOSTRA_QUEDA &&
    atual.impressoes28d < antes.impressoes28d * QUEDA_RELATIVA
  )
    quedas.push(
      `busca: \`${path}\` caiu de ${antes.impressoes28d} para ${atual.impressoes28d} impressões (28d)`,
    );
}

const md = [
  "# Pós-deploy — indexação e diff de sitemap/lastmod",
  "",
  `Gerado em ${snapshot.geradoEm} · baseline de ${anterior.geradoEm}.`,
  `Google: ${site ? "conectado" : "UNKNOWN"} · Bing: ${snapshot.bing} · owners observados: ${OWNERS_CONGELADOS.length}.`,
  "",
  "## Quedas detectadas",
  "",
  quedas.length ? quedas.map((q) => `- ${q}`).join("\n") : "Nenhuma queda detectada.",
  "",
  "## Avisos",
  "",
  avisos.length ? avisos.map((a) => `- ${a}`).join("\n") : "Nenhum.",
  "",
  "## Estado por owner",
  "",
  "| URL | Estado | Último crawl | Impressões 28d | Cliques 28d |",
  "|---|---|---|---:|---:|",
  ...Object.entries(indexacaoAtual).map(
    ([p, v]) => `| \`${p}\` | ${v.estado} | ${v.lastCrawlTime} | ${v.impressoes28d} | ${v.cliques28d} |`,
  ),
  "",
].join("\n");

writeFileSync(join(RAIZ, "reports/post-deploy-indexacao.md"), `${md}\n`);
writeFileSync(join(RAIZ, "reports/post-deploy-indexacao.json"), `${JSON.stringify({ ...snapshot, quedas, avisos }, null, 2)}\n`);

for (const q of quedas) console.error(`QUEDA  ${q}`);
for (const a of avisos) console.warn(`AVISO  ${a}`);
console.log(`[pos-deploy] ${quedas.length} queda(s) · ${avisos.length} aviso(s) → reports/post-deploy-indexacao.md`);

if (estrito && quedas.length) process.exit(1);
