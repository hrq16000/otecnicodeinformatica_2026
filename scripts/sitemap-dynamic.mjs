#!/usr/bin/env node
/**
 * SITEMAP DINÂMICO DOS LOTES APROVADOS — sem edição manual.
 * ============================================================================
 * Orquestra, de ponta a ponta e de forma idempotente:
 *
 *   1. SINCRONIZA os lotes aprovados (fonte única já existente:
 *      `APPROVED_EDITORIAL_CONTENT` em src/lib/blogEditorialRegistry.ts →
 *      scripts/sync-editorial-sitemap.mjs → scripts/lib/editorial-wave.mjs);
 *   2. REGENERA os sitemaps curados (scripts/generate-sitemaps.mjs);
 *   3. AUDITA regressão: nenhuma URL antes publicada pode sumir sem que o
 *      manifesto curado a tenha removido de propósito (`--check` falha);
 *   4. GRAVA o ledger `public/sitemap-ledger.json` (+ histórico) com lotes
 *      incluídos, contagem de URLs, diffs e status de submissão;
 *   5. (com --submit) submete o sitemap ao Search Console e dispara IndexNow,
 *      registrando PENDING_CONFIG/UNKNOWN quando não houver credencial —
 *      nunca sucesso fictício.
 *
 * Uso:
 *   node scripts/sitemap-dynamic.mjs              # sync + gera + ledger
 *   node scripts/sitemap-dynamic.mjs --check      # CI: não escreve fontes
 *   node scripts/sitemap-dynamic.mjs --submit     # + GSC/IndexNow reais
 *   node scripts/sitemap-dynamic.mjs --submit --dry-run
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";

const argv = process.argv.slice(2);
const CHECK = argv.includes("--check");
const SUBMIT = argv.includes("--submit");
const DRY = argv.includes("--dry-run");

const ROOT = process.cwd();
const LEDGER = resolve(ROOT, "public/sitemap-ledger.json");
const HIST_DIR = resolve(ROOT, "public/sitemap/ledger");
const agora = new Date().toISOString();

const HOST = (process.env.INDEXNOW_HOST ?? process.env.VITE_SITE_DOMAIN ?? "otecnicodeinformatica.com.br")
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");
const BASE = `https://${HOST}`;
const KEY = process.env.INDEXNOW_KEY ?? "f783ab585dfa9e6b017cb058009cccae";

const eventos = [];
const registrar = (action, status, details = {}, error = null) => {
  eventos.push({
    id: randomUUID(),
    action,
    status,
    source: process.env.GITHUB_ACTIONS ? "ci:github-actions" : CHECK ? "cli:check" : "cli",
    timestamp: new Date().toISOString(),
    details,
    error,
  });
};

/* ── 0. Snapshot anterior (para diff sem regressão) ─────────────────────── */
function pathsPublicados() {
  const dir = resolve(ROOT, "public");
  const out = new Set();
  for (const f of readdirSync(dir).filter((x) => x.startsWith("sitemap") && x.endsWith(".xml"))) {
    for (const m of readFileSync(resolve(dir, f), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const loc = m[1].trim();
      if (loc.endsWith(".xml")) continue;
      try {
        out.add(new URL(loc).pathname.replace(/(.)\/$/, "$1"));
      } catch {
        /* loc inválido é ignorado — o gate de sitemap cuida disso */
      }
    }
  }
  return out;
}

const antes = pathsPublicados();

/* ── 1. Sincroniza lotes aprovados ──────────────────────────────────────── */
const node = process.execPath;
const rodar = (script, args = []) =>
  execFileSync(node, [resolve(ROOT, script), ...args], { encoding: "utf8", stdio: "pipe" });

let syncSaida = "";
try {
  syncSaida = rodar("scripts/sync-editorial-sitemap.mjs", CHECK ? ["--check"] : []);
  registrar("sync_approved", "OK", { modo: CHECK ? "check" : "write", saida: syncSaida.trim() });
} catch (e) {
  const saida = `${e.stdout ?? ""}${e.stderr ?? ""}`.trim();
  registrar("sync_approved", "FAIL", {}, saida.slice(0, 400));
  console.error("[sitemap-dynamic] sincronização dos lotes aprovados falhou:\n" + saida);
  process.exit(1);
}

/* ── 2. Regenera sitemaps curados ───────────────────────────────────────── */
let genSaida = "";
try {
  genSaida = rodar("scripts/generate-sitemaps.mjs");
  registrar("generate_sitemaps", "OK", { saida: genSaida.trim() });
} catch (e) {
  const saida = `${e.stdout ?? ""}${e.stderr ?? ""}`.trim();
  registrar("generate_sitemaps", "FAIL", {}, saida.slice(0, 400));
  console.error("[sitemap-dynamic] geração do sitemap falhou:\n" + saida);
  process.exit(1);
}

/* ── 3. Diff e guarda anti-regressão ────────────────────────────────────── */
const { CURATED_PATHS } = await import("./lib/curated-urls.mjs");
const declaradas = new Set(CURATED_PATHS);
const depois = pathsPublicados();
const adicionadas = [...depois].filter((p) => !antes.has(p)).sort();
const removidas = [...antes].filter((p) => !depois.has(p)).sort();
// Só é regressão quando a URL sumiu do sitemap SEM ter sido removida do
// manifesto curado de propósito (nesse caso ela também sai de CURATED_PATHS).
const regressoes = removidas.filter((p) => declaradas.has(p));

const { EDITORIAL_WAVE } = await import("./lib/editorial-wave.mjs").catch(() => ({ EDITORIAL_WAVE: [] }));
const lotes = Array.isArray(EDITORIAL_WAVE)
  ? EDITORIAL_WAVE.map((e) => ({ slug: e.slug, url: `/blog/${e.slug}`, approvedAt: e.approvedAt ?? null, includeInSitemap: true }))
  : [];

if (regressoes.length) {
  registrar("diff_no_regression", "FAIL", { removidas: regressoes });
  console.error(`[sitemap-dynamic] REGRESSÃO: ${regressoes.length} URL(s) declaradas sumiram do sitemap:`);
  regressoes.forEach((p) => console.error(`  · ${p}`));
  process.exit(1);
}
registrar("diff_no_regression", "OK", { adicionadas, removidas, total: depois.size });

/* ── 4. Submissão (opcional) ────────────────────────────────────────────── */
const sitemapUrl = `${BASE}/sitemap.xml`;
let gscStatus = SUBMIT ? "UNKNOWN" : "NOT_REQUESTED";
let indexNowStatus = SUBMIT ? "UNKNOWN" : "NOT_REQUESTED";

if (SUBMIT) {
  try {
    const { resolveSite, submitSitemap } = await import("./lib/gsc-client.mjs");
    const site = await resolveSite(`${BASE}/`);
    if (DRY) gscStatus = "DRY_RUN";
    else {
      await submitSitemap(site, sitemapUrl);
      gscStatus = "SUBMITTED";
    }
    registrar("submit_sitemap_gsc", gscStatus, { site, sitemapUrl });
  } catch (e) {
    gscStatus = `PENDING_CONFIG: ${String(e).slice(0, 140)}`;
    registrar("submit_sitemap_gsc", "PENDING_CONFIG", { sitemapUrl }, String(e).slice(0, 200));
  }

  // IndexNow apenas para o que ENTROU agora (idempotente por natureza).
  const novas = adicionadas.map((p) => `${BASE}${p}`);
  if (novas.length === 0) {
    indexNowStatus = "SKIPPED_SEM_NOVIDADE";
    registrar("submit_indexnow", indexNowStatus, { total: 0 });
  } else if (DRY) {
    indexNowStatus = `DRY_RUN (${novas.length} URL(s))`;
    registrar("submit_indexnow", "DRY_RUN", { total: novas.length, urls: novas.slice(0, 50) });
  } else {
    try {
      const res = await fetch("https://api.indexnow.org/IndexNow", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList: novas }),
      });
      indexNowStatus = `HTTP ${res.status}`;
      registrar("submit_indexnow", res.status === 200 || res.status === 202 ? "SUBMITTED" : "FAIL", {
        total: novas.length,
        httpStatus: res.status,
      });
    } catch (e) {
      indexNowStatus = `FAILED: ${String(e).slice(0, 120)}`;
      registrar("submit_indexnow", "FAIL", { total: novas.length }, String(e).slice(0, 200));
    }
  }
}

/* ── 5. Ledger ──────────────────────────────────────────────────────────── */
const anterior = existsSync(LEDGER) ? JSON.parse(readFileSync(LEDGER, "utf8")) : { eventos: [] };
const ledger = {
  geradoEm: agora,
  host: HOST,
  modo: CHECK ? "check" : SUBMIT ? (DRY ? "submit:dry-run" : "submit") : "generate",
  sitemap: { url: sitemapUrl, totalUrls: depois.size, googleSearchConsole: gscStatus, indexNow: indexNowStatus },
  lotes: { total: lotes.length, itens: lotes },
  diff: { adicionadas, removidas, regressoes },
  eventos: [...(anterior.eventos ?? []), ...eventos].slice(-500),
};

if (!CHECK) {
  mkdirSync(HIST_DIR, { recursive: true });
  writeFileSync(LEDGER, `${JSON.stringify(ledger, null, 2)}\n`);
  if (SUBMIT && !DRY) {
    writeFileSync(resolve(HIST_DIR, `${agora.replace(/[:.]/g, "-")}.json`), `${JSON.stringify(ledger, null, 2)}\n`);
  }
}

console.log(
  `[sitemap-dynamic] ${depois.size} URL(s) no sitemap · lotes aprovados ${lotes.length} · +${adicionadas.length}/-${removidas.length}` +
    (SUBMIT ? ` · GSC ${gscStatus} · IndexNow ${indexNowStatus}` : "") +
    (CHECK ? " · CHECK (nada gravado)" : ""),
);
adicionadas.slice(0, 20).forEach((p) => console.log(`  + ${p}`));
removidas.slice(0, 20).forEach((p) => console.log(`  - ${p} (fora do manifesto curado)`));
