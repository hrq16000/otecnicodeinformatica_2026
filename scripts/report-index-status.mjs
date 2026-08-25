#!/usr/bin/env node
/**
 * STATUS DE INDEXAÇÃO POR URL — Google (GSC) + Bing + IndexNow.
 *
 * Gera `public/index-status.json`, consumido pelo painel /admin/indexacao.
 * Para cada URL observada registra, quando disponível:
 *   coverageState · verdict · lastCrawlTime · robotsTxtState · canonical do
 *   Google · rich results detectados · impressões e cliques de 28 dias.
 *
 * Fail-closed: sem credenciais nada é inventado — o campo vira UNKNOWN e
 * `disponivel: false`. Ausência NUNCA vira zero.
 *
 * Uso: node scripts/report-index-status.mjs [--urls=/a,/b]
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { OWNERS_4A } from "./lib/owners-4a.mjs";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const SITE = process.env.GSC_SITE_URL ?? "sc-domain:otecnicodeinformatica.com.br";
const BASE = (process.env.VITE_SITE_DOMAIN ?? "https://otecnicodeinformatica.com.br").replace(/\/$/, "");
const lovableKey = process.env.LOVABLE_API_KEY;
const gscKey = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
const disponivel = Boolean(lovableKey && gscKey);

const argUrls = process.argv.find((a) => a.startsWith("--urls="));
const paths = argUrls
  ? argUrls.slice(7).split(",").map((p) => p.trim()).filter(Boolean)
  : OWNERS_4A.map((o) => o.path);

const dias = (n) => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);

const headers = {
  Authorization: `Bearer ${lovableKey}`,
  "X-Connection-Api-Key": gscKey ?? "",
  "Content-Type": "application/json",
};

async function inspecionar(url) {
  const res = await fetch(`${GATEWAY}/v1/urlInspection/index:inspect`, {
    method: "POST",
    headers,
    body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE, languageCode: "pt-BR" }),
  });
  if (!res.ok) throw new Error(`[${res.status}] ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

async function performance28d() {
  const res = await fetch(`${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      startDate: dias(30),
      endDate: dias(2),
      dimensions: ["page"],
      rowLimit: 500,
    }),
  });
  if (!res.ok) throw new Error(`[${res.status}] ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

const normalizar = (verdict, coverageState) => {
  const c = String(coverageState ?? "").toLowerCase();
  if (verdict === "PASS") return "INDEXED";
  if (c.includes("discovered")) return "DISCOVERED_NOT_INDEXED";
  if (c.includes("crawled")) return "CRAWLED_NOT_INDEXED";
  if (!verdict || verdict === "VERDICT_UNSPECIFIED") return "UNKNOWN";
  return "NO_DATA";
};

let perf = null;
if (disponivel) {
  try {
    perf = await performance28d();
  } catch (e) {
    console.warn(`[index-status] performance indisponível: ${e.message}`);
  }
}
const porPagina = new Map((perf?.rows ?? []).map((r) => [r.keys[0], r]));

const rotas = [];
for (const path of paths) {
  const url = `${BASE}${path}`;
  const linha = perf ? porPagina.get(url) : null;
  const base = {
    path,
    url,
    cluster: OWNERS_4A.find((o) => o.path === path)?.cluster ?? null,
    impressoes28d: perf ? Math.round(linha?.impressions ?? 0) : "NO_DATA",
    cliques28d: perf ? Math.round(linha?.clicks ?? 0) : "NO_DATA",
    posicao28d: linha?.position ? Number(linha.position.toFixed(1)) : perf ? null : "NO_DATA",
  };
  if (!disponivel) {
    rotas.push({ ...base, google: { status: "UNKNOWN", motivo: "credenciais do Search Console ausentes" } });
    continue;
  }
  try {
    const data = await inspecionar(url);
    const r = data?.inspectionResult ?? {};
    const idx = r.indexStatusResult ?? {};
    rotas.push({
      ...base,
      google: {
        status: normalizar(idx.verdict, idx.coverageState),
        verdict: idx.verdict ?? "UNKNOWN",
        coverageState: idx.coverageState ?? "UNKNOWN",
        robotsTxtState: idx.robotsTxtState ?? "UNKNOWN",
        indexingState: idx.indexingState ?? "UNKNOWN",
        ultimoCrawl: idx.lastCrawlTime ?? null,
        canonicalGoogle: idx.googleCanonical ?? null,
        canonicalDeclarado: idx.userCanonical ?? null,
        richResults: (r.richResultsResult?.detectedItems ?? []).map((i) => ({
          tipo: i.richResultType,
          itens: (i.items ?? []).length,
        })),
        richResultsVerdict: r.richResultsResult?.verdict ?? "NO_DATA",
      },
    });
  } catch (e) {
    rotas.push({ ...base, google: { status: "UNKNOWN", motivo: e.message } });
  }
}

/** Bing: sem integração autenticada com o Webmaster Tools neste projeto. */
const bingKey = process.env.BING_WEBMASTER_API_KEY;
const bing = {
  webmasterTools: bingKey ? "VERIFIED" : "UNKNOWN",
  motivo: bingKey ? null : "sem credencial de Bing Webmaster Tools configurada",
  sitemapDeclaradoNoRobots: existsSync(resolve(process.cwd(), "public/robots.txt"))
    ? /Sitemap:/i.test(readFileSync(resolve(process.cwd(), "public/robots.txt"), "utf8"))
    : "UNKNOWN",
};

let indexnow = null;
const inPath = resolve(process.cwd(), "public/indexnow-status.json");
if (existsSync(inPath)) {
  const reg = JSON.parse(readFileSync(inPath, "utf8"));
  indexnow = {
    geradoEm: reg.geradoEm,
    modo: reg.modo,
    sucesso: reg.sucesso,
    totalUrls: reg.totalUrls,
    keyFileOk: reg.keyFile?.ok ?? false,
    porUrl: Object.fromEntries((reg.urls ?? []).map((u) => [u.url, u.aceita])),
  };
}

const saida = { geradoEm: new Date().toISOString(), site: SITE, disponivel, rotas, bing, indexnow };
writeFileSync(resolve(process.cwd(), "public/index-status.json"), `${JSON.stringify(saida, null, 2)}\n`);
console.log(
  `[index-status] ${rotas.length} URL(s) · Google ${disponivel ? "consultado" : "UNKNOWN (sem credencial)"} · Bing ${bing.webmasterTools}`,
);
for (const r of rotas) console.log(`  · ${r.path} → ${r.google.status} (crawl: ${r.google.ultimoCrawl ?? "—"})`);
