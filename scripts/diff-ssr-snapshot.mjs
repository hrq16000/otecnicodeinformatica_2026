#!/usr/bin/env node
/**
 * DIFF AUTOMÁTICO DE SSR + JSON-LD ENTRE DEPLOYS
 *
 * Detecta REGRESSÃO SILENCIOSA: a página muda (lastmod novo, hash novo) mas
 * perde algo que importa para busca — bloco de conteúdo, tipo de schema,
 * canonical, robots, H1 ou volume de texto.
 *
 * Baseline por URL em `reports/ssr-baseline/<slug>.json` (commitável). O diff
 * compara o snapshot atual (dist prerenderizado ou produção com `--base=`)
 * contra essa baseline e classifica cada URL:
 *
 *   UNCHANGED · CHANGED_OK · REGRESSION · NEW · MISSING
 *
 * Uso:
 *   node scripts/diff-ssr-snapshot.mjs [--rodada=4a|4b|todos] [--base=https://...]
 *   node scripts/diff-ssr-snapshot.mjs --update      (promove o atual a baseline)
 *   node scripts/diff-ssr-snapshot.mjs --strict      (exit 1 em REGRESSION)
 *
 * Saída: reports/ssr-diff.json · public/ssr-diff-status.json (lido pelo painel).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { extrairJsonLd, extrairTextoVisivel, fingerprintDeHtml, lerHtmlDaRota } from "./lib/content-fingerprint.mjs";
import { resolverOwners } from "./lib/owners.mjs";
import { BASE_URL } from "./lib/site-env.mjs";

const { rodada: RODADA, owners: OWNERS } = resolverOwners(process.argv, "todos");
const UPDATE = process.argv.includes("--update");
const STRICT = process.argv.includes("--strict");
const argBase = process.argv.find((a) => a.startsWith("--base="));
const BASE = argBase ? argBase.slice(7).replace(/\/$/, "") : null;
const DIST = resolve(process.cwd(), "dist");
const BASELINE_DIR = resolve(process.cwd(), "reports/ssr-baseline");
mkdirSync(BASELINE_DIR, { recursive: true });

/** Queda de texto acima disso é regressão, não edição. */
const QUEDA_MAXIMA = 0.1;

const slug = (p) => p.replace(/^\//, "").replace(/\//g, "_") || "home";

const tiposJsonLd = (html) => {
  const tipos = new Set();
  const visitar = (n) => {
    if (Array.isArray(n)) return n.forEach(visitar);
    if (!n || typeof n !== "object") return;
    if (n["@type"]) for (const t of [].concat(n["@type"])) tipos.add(t);
    for (const v of Object.values(n)) visitar(v);
  };
  try {
    visitar(JSON.parse(extrairJsonLd(html)));
  } catch {
    /* extrairJsonLd já normaliza; blocos inválidos viram __invalid */
  }
  return [...tipos].sort();
};

/** Marcadores de conteúdo material cuja ausência é regressão. */
const marcadores = (html) => ({
  respostaRapida: /Resposta r[áa]pida/i.test(html),
  tabela: /<table\b/i.test(html),
  faq: /FAQPage/.test(html),
  h1: [...html.matchAll(/<h1\b/gi)].length,
  h2: [...html.matchAll(/<h2\b/gi)].length,
});

function capturar(path, html) {
  const texto = extrairTextoVisivel(html);
  return {
    path,
    capturadoEm: new Date().toISOString(),
    origem: BASE ? `producao:${BASE}` : "dist",
    hash: fingerprintDeHtml(html),
    jsonldHash: fingerprintDeHtml(`<body></body>${extrairJsonLd(html)}`),
    tiposJsonLd: tiposJsonLd(html),
    canonical: html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] ?? null,
    robots: html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? null,
    titulo: html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim() ?? null,
    palavras: texto.split(/\s+/).filter(Boolean).length,
    ...marcadores(html),
  };
}

async function htmlAtual(path) {
  if (!BASE) return lerHtmlDaRota(DIST, path);
  try {
    const res = await fetch(`${BASE}${path}`, { headers: { "cache-control": "no-cache" } });
    return res.ok ? await res.text() : null;
  } catch {
    return null;
  }
}

function comparar(base, atual) {
  const perdas = [];
  const ganhos = [];
  if (!base) return { estado: "NEW", perdas, ganhos };
  const perdidos = base.tiposJsonLd.filter((t) => !atual.tiposJsonLd.includes(t));
  const novos = atual.tiposJsonLd.filter((t) => !base.tiposJsonLd.includes(t));
  if (perdidos.length) perdas.push(`JSON-LD perdido: ${perdidos.join(", ")}`);
  if (novos.length) ganhos.push(`JSON-LD novo: ${novos.join(", ")}`);
  if (base.canonical !== atual.canonical) perdas.push(`canonical ${base.canonical} → ${atual.canonical}`);
  if (base.robots !== atual.robots) perdas.push(`robots ${base.robots} → ${atual.robots}`);
  if (base.h1 !== atual.h1) perdas.push(`H1 ${base.h1} → ${atual.h1}`);
  for (const m of ["respostaRapida", "tabela", "faq"]) {
    if (base[m] && !atual[m]) perdas.push(`bloco removido: ${m}`);
    if (!base[m] && atual[m]) ganhos.push(`bloco adicionado: ${m}`);
  }
  const queda = base.palavras ? (base.palavras - atual.palavras) / base.palavras : 0;
  if (queda > QUEDA_MAXIMA) {
    perdas.push(`texto -${Math.round(queda * 100)}% (${base.palavras} → ${atual.palavras} palavras)`);
  } else if (atual.palavras > base.palavras) {
    ganhos.push(`texto +${atual.palavras - base.palavras} palavras`);
  }
  const igual = base.hash === atual.hash;
  return {
    estado: perdas.length ? "REGRESSION" : igual ? "UNCHANGED" : "CHANGED_OK",
    perdas,
    ganhos,
  };
}

const linhas = [];
for (const owner of OWNERS) {
  const arquivo = resolve(BASELINE_DIR, `${slug(owner.path)}.json`);
  const base = existsSync(arquivo) ? JSON.parse(readFileSync(arquivo, "utf8")) : null;
  const html = await htmlAtual(owner.path);
  if (!html) {
    linhas.push({ ...owner, estado: "MISSING", perdas: ["HTML indisponível"], ganhos: [], base, atual: null });
    continue;
  }
  const atual = capturar(owner.path, html);
  const { estado, perdas, ganhos } = comparar(base, atual);
  linhas.push({ ...owner, estado, perdas, ganhos, base, atual });
  if (UPDATE) writeFileSync(arquivo, `${JSON.stringify(atual, null, 2)}\n`);
}

const regressoes = linhas.filter((l) => l.estado === "REGRESSION");
const saida = {
  geradoEm: new Date().toISOString(),
  rodada: RODADA,
  origem: BASE ? `producao:${BASE}` : "dist",
  baselinePromovida: UPDATE,
  total: linhas.length,
  regressoes: regressoes.length,
  rotas: linhas.map((l) => ({
    path: l.path,
    cluster: l.cluster ?? null,
    estado: l.estado,
    perdas: l.perdas,
    ganhos: l.ganhos,
    hashBaseline: l.base?.hash ?? null,
    hashAtual: l.atual?.hash ?? null,
    jsonldBaseline: l.base?.tiposJsonLd ?? null,
    jsonldAtual: l.atual?.tiposJsonLd ?? null,
    palavrasBaseline: l.base?.palavras ?? null,
    palavrasAtual: l.atual?.palavras ?? null,
    baselineDe: l.base?.capturadoEm ?? null,
  })),
};

writeFileSync(resolve(process.cwd(), "reports/ssr-diff.json"), `${JSON.stringify(saida, null, 2)}\n`);
writeFileSync(resolve(process.cwd(), "public/ssr-diff-status.json"), `${JSON.stringify(saida, null, 2)}\n`);

console.log(`── diff SSR/JSON-LD (${saida.origem}) ── ${linhas.length} URL(s)${UPDATE ? " · baseline promovida" : ""}`);
for (const l of linhas) {
  const marca = l.estado === "REGRESSION" ? "✗" : l.estado === "UNCHANGED" ? "=" : "~";
  console.log(`  ${marca} ${l.path} → ${l.estado}${l.perdas.length ? ` | ${l.perdas.join(" ; ")}` : ""}`);
}
console.log(`\n${regressoes.length} regressão(ões) — reports/ssr-diff.json · public/ssr-diff-status.json`);
if (!BASE) console.log(`(base padrão: dist. Use --base=${BASE_URL} para comparar contra produção.)`);
process.exit(STRICT && regressoes.length ? 1 : 0);
