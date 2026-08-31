#!/usr/bin/env node
/**
 * SUBMISSÃO EM LOTE DA ONDA 10C — sitemap + IndexNow + ledger auditável.
 *
 * Fluxo real (a API do Search Console é SOMENTE LEITURA para veredito):
 *   1. verifica no site real se cada URL está publicada e valida metadata
 *      (title, description, canonical, robots, JSON-LD);
 *   2. confirma presença da URL nos sitemaps publicados;
 *   3. submete o sitemap ao Search Console (quando há credencial);
 *   4. dispara IndexNow em lote para as URLs comprovadamente publicadas;
 *   5. atualiza o ledger por URL com histórico de eventos auditáveis.
 *
 * Fail-closed: sem credencial/sem resposta, grava PENDING_CONFIG/UNKNOWN —
 * nunca "sucesso" fictício. Idempotente: reenvia IndexNow apenas depois da
 * janela mínima (12h) ou com --force.
 *
 * Uso:
 *   npm run submit:onda-10c -- --dry-run
 *   npm run submit:onda-10c
 *   npm run submit:onda-10c -- --force
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";
import { resolveSite, submitSitemap } from "./lib/gsc-client.mjs";

const argv = process.argv.slice(2);
const DRY = argv.includes("--dry-run");
const FORCE = argv.includes("--force");
const JANELA_MS = 12 * 60 * 60 * 1000;

const ROOT = process.cwd();
const LEDGER = resolve(ROOT, "public/editorial-submissions.json");
const HIST_DIR = resolve(ROOT, "public/editorial/submissions");

const ler = (rel) => {
  const p = resolve(ROOT, rel);
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return null;
  }
};

const HOST = (process.env.INDEXNOW_HOST ?? process.env.VITE_SITE_DOMAIN ?? "otecnicodeinformatica.com.br")
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");
const BASE = `https://${HOST}`;
const KEY = process.env.INDEXNOW_KEY ?? "f783ab585dfa9e6b017cb058009cccae";

/* ── 1. Fonte oficial das URLs: registry monitorada + caso técnico ───────── */
const status = ler("public/editorial-waves-status.json");
const alvo = [];
for (const r of status?.rotas ?? []) {
  // Todas as ondas monitoradas entram na submissão; a verificação real da
  // página (HTTP + metadata) exclui automaticamente o que ainda é rascunho.
  alvo.push({ url: r.url, escopo: `${r.wave}/${r.batch}`, tipo: "onda-editorial" });
}
alvo.push({ url: "/problemas/windows-nao-inicia", escopo: "CASO/0xc0000428", tipo: "artigo" });

if (!alvo.length) {
  console.error('✖ nenhuma URL da Onda 10C encontrada — rode "npm run monitor:editorial-waves" antes.');
  process.exit(1);
}

/* ── 2. Sitemaps publicados ─────────────────────────────────────────────── */
const sitemapXml = readdirSync(resolve(ROOT, "public"))
  .filter((f) => f.startsWith("sitemap") && f.endsWith(".xml"))
  .map((f) => readFileSync(resolve(ROOT, "public", f), "utf8"))
  .join("\n");
const noSitemap = (url) => sitemapXml.includes(`${BASE}${url}<`) || sitemapXml.includes(`${BASE}${url}/<`);

/* ── 3. Verificação real da página publicada ────────────────────────────── */
async function verificar(url) {
  try {
    const res = await fetch(`${BASE}${url}`, {
      redirect: "follow",
      headers: { "user-agent": "OTecnicoDeInformatica-EditorialBot/1.0 (+https://otecnicodeinformatica.com.br)" },
    });
    const html = res.ok ? await res.text() : "";
    const meta = (re) => html.match(re)?.[1]?.trim() ?? null;
    const canonical = meta(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
    const robots = meta(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
    const jsonld = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
      .flatMap((m) => {
        try {
          const p = JSON.parse(m[1]);
          return Array.isArray(p) ? p : [p];
        } catch {
          return [];
        }
      })
      .flatMap((n) => (Array.isArray(n?.["@graph"]) ? n["@graph"] : [n]))
      .map((n) => n?.["@type"])
      .flat()
      .filter(Boolean);
    const erros = [];
    if (!res.ok) erros.push(`HTTP ${res.status}`);
    const title = meta(/<title[^>]*>([^<]*)<\/title>/i);
    const description = meta(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
    if (res.ok && !title) erros.push("title ausente");
    if (res.ok && !description) erros.push("description ausente");
    if (res.ok && !canonical) erros.push("canonical ausente");
    if (res.ok && canonical && !canonical.startsWith(BASE)) erros.push(`canonical fora do domínio: ${canonical}`);
    if (res.ok && /noindex/i.test(robots ?? "")) erros.push("robots noindex");
    if (res.ok && jsonld.length === 0) erros.push("sem JSON-LD");
    return {
      httpStatus: res.status,
      publicado: res.ok && erros.length === 0,
      title,
      description,
      canonical,
      robots,
      schemas: [...new Set(jsonld)],
      erros,
    };
  } catch (e) {
    return {
      httpStatus: 0,
      publicado: false,
      title: null,
      description: null,
      canonical: null,
      robots: null,
      schemas: [],
      erros: [`falha de rede: ${String(e).slice(0, 120)}`],
    };
  }
}

/* ── 4. Ledger persistente ──────────────────────────────────────────────── */
const anterior = ler("public/editorial-submissions.json") ?? { urls: [], eventos: [] };
const porUrl = new Map((anterior.urls ?? []).map((u) => [u.url, u]));
const eventos = Array.isArray(anterior.eventos) ? anterior.eventos.slice(-800) : [];
const agora = new Date().toISOString();
const registrar = (url, scope, action, status_, details, error = null) => {
  eventos.push({
    id: randomUUID(),
    url,
    scope,
    action,
    status: status_,
    source: DRY ? "cli:dry-run" : (process.env.GITHUB_ACTIONS ? "ci:github-actions" : "cli"),
    timestamp: new Date().toISOString(),
    details,
    error,
  });
};

const linhas = [];
for (const item of alvo) {
  const prev = porUrl.get(item.url) ?? {};
  const check = await verificar(item.url);
  const emSitemap = noSitemap(item.url);
  registrar(item.url, item.escopo, "verify_published", check.publicado ? "OK" : "FAIL", {
    httpStatus: check.httpStatus,
    schemas: check.schemas,
    canonical: check.canonical,
  }, check.erros.length ? check.erros.join("; ") : null);
  linhas.push({
    url: item.url,
    url_absoluta: `${BASE}${item.url}`,
    scope: item.escopo,
    tipo: item.tipo,
    publicado: check.publicado,
    http_status: check.httpStatus,
    title: check.title,
    description: check.description,
    canonical: check.canonical,
    canonical_valido: Boolean(check.canonical && check.canonical.startsWith(BASE)),
    robots: check.robots,
    schemas: check.schemas,
    schema_valido: check.schemas.length > 0,
    erros: check.erros,
    submitted_via_sitemap: emSitemap,
    submitted_via_indexnow: prev.submitted_via_indexnow ?? false,
    last_submission_at: prev.last_submission_at ?? null,
    last_verdict: prev.last_verdict ?? "UNKNOWN",
    last_verdict_checked_at: prev.last_verdict_checked_at ?? null,
    historico: (prev.historico ?? []).slice(-40),
  });
}

/* ── 5. Sitemap no Search Console (somente com credencial) ──────────────── */
const sitemapUrl = `${BASE}/sitemap.xml`;
let gsc = "PENDING_CONFIG";
try {
  const site = await resolveSite(`${BASE}/`);
  if (DRY) gsc = "DRY_RUN";
  else {
    await submitSitemap(site, sitemapUrl);
    gsc = "SUBMITTED";
  }
  registrar(sitemapUrl, "ONDA-10C", "submit_sitemap", gsc, { site });
} catch (e) {
  gsc = `PENDING_CONFIG: ${String(e).slice(0, 140)}`;
  registrar(sitemapUrl, "ONDA-10C", "submit_sitemap", "PENDING_CONFIG", {}, String(e).slice(0, 200));
}

/* ── 6. IndexNow em lote (só URLs publicadas e fora da janela) ──────────── */
const elegiveis = linhas.filter((l) => {
  if (!l.publicado) return false;
  if (FORCE) return true;
  if (!l.last_submission_at) return true;
  return Date.now() - Date.parse(l.last_submission_at) > JANELA_MS;
});
let indexNow = elegiveis.length === 0 ? "SKIPPED_IDEMPOTENTE" : "NOT_SENT";
if (elegiveis.length && !DRY) {
  try {
    const res = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `${BASE}/${KEY}.txt`,
        urlList: elegiveis.map((l) => l.url_absoluta),
      }),
    });
    indexNow = `HTTP ${res.status}`;
    const aceito = res.status === 200 || res.status === 202;
    for (const l of elegiveis) {
      l.submitted_via_indexnow = aceito;
      l.last_submission_at = agora;
      l.historico.push({ at: agora, action: "indexnow", status: indexNow });
      registrar(l.url, l.scope, "submit_indexnow", aceito ? "SUBMITTED" : "FAIL", { httpStatus: res.status });
    }
  } catch (e) {
    indexNow = `FAILED: ${String(e).slice(0, 120)}`;
    for (const l of elegiveis) registrar(l.url, l.scope, "submit_indexnow", "FAIL", {}, String(e).slice(0, 200));
  }
} else if (elegiveis.length && DRY) {
  indexNow = `DRY_RUN (${elegiveis.length} URL(s))`;
}

/* ── 7. Persistência ────────────────────────────────────────────────────── */
const ledger = {
  geradoEm: agora,
  dryRun: DRY,
  host: HOST,
  sitemap: { url: sitemapUrl, googleSearchConsole: gsc },
  indexNow,
  total: linhas.length,
  publicadas: linhas.filter((l) => l.publicado).length,
  comErro: linhas.filter((l) => l.erros.length > 0).length,
  urls: linhas,
  eventos: eventos.slice(-800),
};
if (!DRY) {
  mkdirSync(HIST_DIR, { recursive: true });
  writeFileSync(LEDGER, `${JSON.stringify(ledger, null, 2)}\n`);
  writeFileSync(resolve(HIST_DIR, `${agora.replace(/[:.]/g, "-")}.json`), `${JSON.stringify(ledger, null, 2)}\n`);
}

console.log(
  `[submit:onda-10c] ${ledger.total} URL(s) · publicadas ${ledger.publicadas} · com erro ${ledger.comErro} · sitemap/GSC ${gsc} · IndexNow ${indexNow}${DRY ? " · DRY-RUN (nada gravado)" : ""}`,
);
for (const l of linhas) {
  console.log(
    `  · ${l.scope} ${l.url} → HTTP ${l.http_status} · sitemap ${l.submitted_via_sitemap ? "sim" : "não"} · indexnow ${l.submitted_via_indexnow ? "sim" : "não"} · schema ${l.schemas.join("/") || "—"}${l.erros.length ? ` · ERROS: ${l.erros.join("; ")}` : ""}`,
  );
}
