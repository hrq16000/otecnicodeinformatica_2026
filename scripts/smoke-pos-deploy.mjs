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

console.log(`SMOKE PÓS-DEPLOY — base=${BASE}`);
for (const l of linhas) console.log(`  ✓ ${l}`);
if (falhas.length) {
  console.error("\nFalhas:");
  for (const f of falhas) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`\n✓ ${URLS.length} URLs íntegras e bundle idêntico ao manifesto publicado.`);
