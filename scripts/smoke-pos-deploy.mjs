#!/usr/bin/env node
/**
 * SMOKE PÓS-DEPLOY — identidade do bundle + integridade das páginas-chave.
 *
 * Roda contra a URL pública (SITE_BASE_URL ou --base=) logo após publicar:
 *   1. /build-version.json responde e traz version + buildTime;
 *   2. o HTML SSR da Home carrega o mesmo `version` (__APP_VERSION__);
 *   3. as URLs críticas respondem 200 com o conteúdo esperado em SSR;
 *   4. headers de borda (cf-cache-status / age) são registrados para
 *      distinguir resposta de origem, de CDN e de cache antigo.
 *
 * Fail-closed: qualquer divergência ou 4xx/5xx encerra com exit 1.
 */
import { BASE_URL } from "./lib/site-env.mjs";

const arg = process.argv.find((a) => a.startsWith("--base="));
const BASE = (arg ? arg.slice(7) : process.env.SITE_BASE_URL || BASE_URL).replace(/\/$/, "");

/** URLs críticas: comerciais + as enriquecidas na Micro-Rodada Enriquecimento 1. */
const URLS = [
  { path: "/", precisa: ["__APP_VERSION__"] },
  { path: "/problemas/arquivos-apagados", precisa: ["Resposta rápida", "tabela-diagnostica"] },
  { path: "/problemas/wifi-instavel", precisa: ["Resposta rápida", "tabela-diagnostica"] },
  { path: "/solucoes/ssd", precisa: ["Resposta rápida"] },
  { path: "/solucoes/backup", precisa: ["Resposta rápida"] },
  { path: "/equipamentos/notebook", precisa: ["Resposta rápida", "tabela-diagnostica"] },
  { path: "/equipamentos/roteador", precisa: ["Resposta rápida", "tabela-diagnostica"] },
];

const falhas = [];
const linhas = [];

const camadaDe = (h) => {
  const cf = h.get("cf-cache-status");
  const age = h.get("age");
  if (!cf) return "origem/desconhecida";
  if (cf === "HIT") return `cdn-hit${age ? ` (age=${age}s)` : ""}`;
  if (cf === "MISS" || cf === "EXPIRED" || cf === "REVALIDATED") return `origem via cdn (${cf.toLowerCase()})`;
  return `cdn (${cf.toLowerCase()})`;
};

const buscar = async (url) => {
  const res = await fetch(url, { redirect: "follow", headers: { "cache-control": "no-cache" } });
  return { res, body: await res.text() };
};

let versaoManifesto = null;
try {
  const { res, body } = await buscar(`${BASE}/build-version.json?t=${Date.now()}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = JSON.parse(body);
  versaoManifesto = json.version;
  if (!versaoManifesto) throw new Error("manifesto sem campo version");
  linhas.push(`manifesto: version=${versaoManifesto} buildTime=${json.buildTime} [${camadaDe(res.headers)}]`);
} catch (e) {
  falhas.push(`FAIL_BUILD_MANIFEST: ${e.message}`);
}

for (const { path, precisa } of URLS) {
  const url = `${BASE}${path}`;
  try {
    const { res, body } = await buscar(url);
    if (res.status !== 200) {
      falhas.push(`FAIL_STATUS ${path}: HTTP ${res.status}`);
      continue;
    }
    const faltando = precisa.filter((t) => !body.includes(t));
    if (faltando.length) falhas.push(`FAIL_CONTENT ${path}: ausente ${faltando.join(", ")}`);

    // GATE DE INDEXABILIDADE REAL: valida o HTML e os headers publicados,
    // não só o build local. Todas as URLs do smoke são públicas e curadas.
    const xRobots = res.headers.get("x-robots-tag") ?? "";
    if (/\bnoindex\b/i.test(xRobots)) {
      falhas.push(`FAIL_X_ROBOTS_NOINDEX ${path}: ${xRobots}`);
    }

    const robotsTags = [...body.matchAll(/<meta\b[^>]*>/gi)]
      .map(([tag]) => tag)
      .filter((tag) => /\bname\s*=\s*["']robots["']/i.test(tag));
    if (robotsTags.length !== 1 ||
        !/\bcontent\s*=\s*["']index\s*,\s*follow["']/i.test(robotsTags[0])) {
      falhas.push(`FAIL_META_ROBOTS ${path}: esperado exatamente um index, follow (encontrados ${robotsTags.length})`);
    }

    const canonicalTags = [...body.matchAll(/<link\b[^>]*>/gi)]
      .map(([tag]) => tag)
      .filter((tag) => /\brel\s*=\s*["']canonical["']/i.test(tag));
    const canonical = canonicalTags[0]?.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1];
    if (canonicalTags.length !== 1 || canonical !== `${BASE}${path}`) {
      falhas.push(`FAIL_CANONICAL ${path}: esperado ${BASE}${path}; recebido ${canonical ?? "(ausente)"}`);
    }

    if (path === "/" && versaoManifesto) {
      const m = body.match(/__APP_VERSION__\s*=\s*"([^"]+)"/);
      if (!m) falhas.push("FAIL_VERSION_TAG: __APP_VERSION__ não encontrado no HTML SSR");
      else if (m[1] !== versaoManifesto)
        falhas.push(`FAIL_VERSION_MISMATCH: bundle=${m[1]} manifesto=${versaoManifesto}`);
    }
    linhas.push(`200 ${path} [${camadaDe(res.headers)}]`);
  } catch (e) {
    falhas.push(`FAIL_FETCH ${path}: ${e.message}`);
  }
}


// Gate de descoberta da busca no domínio publicado, sem depender de GSC/API.
// Reprova arquivo ausente, fallback HTML 200, sitemap vazio ou host errado.
async function verificarDescoberta() {
  let robots = "";
  try {
    const { res, body } = await buscar(BASE + "/robots.txt");
    if (res.status !== 200) falhas.push("FAIL_ROBOTS_HTTP " + res.status);
    else robots = body;
  } catch (err) {
    falhas.push("FAIL_ROBOTS_FETCH " + err.message);
  }
  const geral = robots.match(/(?:^|\n)User-agent:\s*\*\s*\r?\n([\s\S]*?)(?=\r?\nUser-agent:|$)/i)?.[1] ?? "";
  if (!geral || /^\s*Disallow:\s*\/\s*$/im.test(geral)) {
    falhas.push("FAIL_ROBOTS_CRAWL: User-agent * ausente ou bloqueio global");
  }
  if (!robots.includes("Sitemap: " + BASE + "/sitemap-index.xml")) {
    falhas.push("FAIL_ROBOTS_DISCOVERY: sitemap-index nao anunciado");
  }

  let xml = "";
  try {
    const { res, body } = await buscar(BASE + "/sitemap-index.xml");
    if (res.status !== 200) falhas.push("FAIL_INDEX_HTTP " + res.status);
    else xml = body;
  } catch (err) {
    falhas.push("FAIL_INDEX_FETCH " + err.message);
  }
  if (!/<sitemapindex\b/i.test(xml)) {
    falhas.push("FAIL_INDEX_XML: sitemap ausente ou substituido por HTML");
    return;
  }
  const sub = [...xml.matchAll(/<loc>\s*(https:\/\/[^<]+)\s*<\/loc>/gi)].map((m) => m[1].trim());
  if (!sub.includes(BASE + "/sitemap-main.xml") || !sub.includes(BASE + "/sitemap-servicos.xml")) {
    falhas.push("FAIL_INDEX_CORE: main/servicos nao encontrados");
  }
  if (sub.length === 0 || new Set(sub).size !== sub.length) {
    falhas.push("FAIL_INDEX_EMPTY_OR_DUPLICATE");
  }
  for (const url of sub) {
    let parsed;
    try { parsed = new URL(url); } catch {
      falhas.push("FAIL_SITEMAP_URL " + url);
      continue;
    }
    if (parsed.origin !== BASE || !/^\/sitemap-[a-z-]+\.xml$/.test(parsed.pathname)) {
      falhas.push("FAIL_SITEMAP_HOST " + url);
      continue;
    }
    try {
      const { res, body } = await buscar(url);
      if (res.status !== 200 || !/<urlset\b/i.test(body) || !body.includes("<loc>" + BASE + "/")) {
        falhas.push("FAIL_SITEMAP_CHILD " + parsed.pathname + " HTTP " + res.status);
      } else {
        linhas.push("200 " + parsed.pathname + " [XML]");
      }
    } catch (err) {
      falhas.push("FAIL_SITEMAP_FETCH " + parsed.pathname + " " + err.message);
    }
  }
  if (robots && xml) linhas.push("200 /robots.txt + /sitemap-index.xml");
}
await verificarDescoberta();

console.log(`SMOKE PÓS-DEPLOY — base=${BASE}`);
for (const l of linhas) console.log(`  ✓ ${l}`);
if (falhas.length) {
  console.error("\nFalhas:");
  for (const f of falhas) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`\n✓ ${URLS.length} URLs íntegras e bundle idêntico ao manifesto publicado.`);
