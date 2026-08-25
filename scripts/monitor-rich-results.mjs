#!/usr/bin/env node
/**
 * MONITORAMENTO CONTÍNUO DE RICH RESULTS POR URL (Google + Bing)
 *
 * Cruza três fontes, sem inventar nada:
 *   1. DECLARADO — tipos de schema no HTML SSR (`dist/<path>/index.html`);
 *   2. GOOGLE    — `richResults` do URL Inspection em `public/index-status.json`
 *                  (produzido por scripts/report-index-status.mjs);
 *   3. BING      — UNKNOWN enquanto não houver leitura autenticada do Bing
 *                  Webmaster Tools (`BING_WEBMASTER_API_KEY`).
 *
 * Mantém histórico em `reports/rich-results-history.json` e emite ALERTA de
 * ganho/perda de tipo por URL. Quando o Google devolve verdict/mensagens de
 * validação, a causa é registrada junto com a perda.
 *
 * Uso: node scripts/monitor-rich-results.mjs [--rodada=todos] [--alert]
 * Saída: public/rich-results-monitor.json · reports/rich-results-history.json
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { lerHtmlDaRota } from "./lib/content-fingerprint.mjs";
import { resolverOwners } from "./lib/owners.mjs";

const { rodada: RODADA, owners: OWNERS } = resolverOwners(process.argv, "todos");
const ALERTAR = process.argv.includes("--alert");
const DIST = resolve(process.cwd(), "dist");
const HIST = resolve(process.cwd(), "reports/rich-results-history.json");

/** Tipos de schema que podem virar rich result — o resto é contexto. */
const TIPOS_RICOS = new Set([
  "FAQPage",
  "BreadcrumbList",
  "HowTo",
  "Article",
  "BlogPosting",
  "Product",
  "Service",
  "LocalBusiness",
  "Organization",
  "VideoObject",
  "ImageObject",
  "Review",
  "AggregateRating",
]);

const declarados = (html) => {
  const tipos = new Set();
  const visitar = (n) => {
    if (Array.isArray(n)) return n.forEach(visitar);
    if (!n || typeof n !== "object") return;
    if (n["@type"]) for (const t of [].concat(n["@type"])) if (TIPOS_RICOS.has(t)) tipos.add(t);
    for (const v of Object.values(n)) visitar(v);
  };
  for (const [, raw] of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      visitar(JSON.parse(raw.trim()));
    } catch {
      /* bloco inválido é reportado pelo smoke, não aqui */
    }
  }
  return [...tipos].sort();
};

const indexStatusPath = resolve(process.cwd(), "public/index-status.json");
const indexStatus = existsSync(indexStatusPath) ? JSON.parse(readFileSync(indexStatusPath, "utf8")) : null;
const porUrl = new Map((indexStatus?.rotas ?? []).map((r) => [r.path, r]));

const historico = existsSync(HIST) ? JSON.parse(readFileSync(HIST, "utf8")) : { snapshots: [] };
const anterior = historico.snapshots.at(-1) ?? null;
const anteriorPorPath = new Map((anterior?.rotas ?? []).map((r) => [r.path, r]));

const rotas = [];
for (const owner of OWNERS) {
  const html = lerHtmlDaRota(DIST, owner.path);
  const decl = html ? declarados(html) : [];
  const gsc = porUrl.get(owner.path);
  const disponivelGoogle = Boolean(indexStatus?.disponivel) && Array.isArray(gsc?.google?.richResults);
  const google = disponivelGoogle ? gsc.google.richResults.map((r) => r.tipo).sort() : null;
  const prev = anteriorPorPath.get(owner.path);

  const ganhos = [];
  const perdas = [];
  if (prev) {
    const cmpAtual = google ?? decl;
    const cmpAnterior = prev.google ?? prev.declarados ?? [];
    for (const t of cmpAtual) if (!cmpAnterior.includes(t)) ganhos.push(t);
    for (const t of cmpAnterior) if (!cmpAtual.includes(t)) perdas.push(t);
  }

  /** Declarado no HTML mas ainda não reconhecido pelo Google. */
  const naoReconhecidos = google ? decl.filter((t) => !google.includes(t)) : [];

  rotas.push({
    path: owner.path,
    url: gsc?.url ?? null,
    cluster: owner.cluster ?? null,
    declarados: decl,
    google,
    googleVerdict: gsc?.google?.richResultsVerdict ?? "UNKNOWN",
    googleStatus: gsc?.google?.status ?? "UNKNOWN",
    mensagensValidacao: gsc?.google?.richResultsMensagens ?? [],
    bing: process.env.BING_WEBMASTER_API_KEY ? "PENDING_READ" : "UNKNOWN",
    naoReconhecidos,
    ganhos,
    perdas,
    alerta: perdas.length ? "PERDA" : ganhos.length ? "GANHO" : "ESTAVEL",
    fonteComparacao: google ? "google" : "declarado (Google UNKNOWN)",
  });
}

const snapshot = {
  geradoEm: new Date().toISOString(),
  rodada: RODADA,
  googleDisponivel: Boolean(indexStatus?.disponivel),
  bing: process.env.BING_WEBMASTER_API_KEY ? "PENDING_READ" : "UNKNOWN",
  rotas,
};

historico.snapshots = [...historico.snapshots, snapshot].slice(-30);
writeFileSync(HIST, `${JSON.stringify(historico, null, 2)}\n`);
writeFileSync(
  resolve(process.cwd(), "public/rich-results-monitor.json"),
  `${JSON.stringify({ ...snapshot, historicoTamanho: historico.snapshots.length }, null, 2)}\n`,
);

const comPerda = rotas.filter((r) => r.perdas.length);
const comGanho = rotas.filter((r) => r.ganhos.length);
console.log(
  `── rich results (${RODADA}) ── ${rotas.length} URL(s) · Google ${snapshot.googleDisponivel ? "lido" : "UNKNOWN"} · Bing ${snapshot.bing}`,
);
for (const r of rotas) {
  console.log(
    `  ${r.alerta === "PERDA" ? "✗" : r.alerta === "GANHO" ? "+" : "="} ${r.path} — declarados: ${r.declarados.join(", ") || "—"} | google: ${r.google ? r.google.join(", ") || "nenhum" : "UNKNOWN"}${r.perdas.length ? ` | PERDA: ${r.perdas.join(", ")}` : ""}${r.ganhos.length ? ` | GANHO: ${r.ganhos.join(", ")}` : ""}`,
  );
}

const webhook = process.env.RICH_RESULTS_ALERT_WEBHOOK ?? process.env.SLACK_WEBHOOK_URL;
if (ALERTAR && (comPerda.length || comGanho.length)) {
  const texto = [
    `*Rich results — rodada ${RODADA}*`,
    ...comPerda.map((r) => `:x: PERDA ${r.path}: ${r.perdas.join(", ")} (verdict ${r.googleVerdict})`),
    ...comGanho.map((r) => `:white_check_mark: GANHO ${r.path}: ${r.ganhos.join(", ")}`),
  ].join("\n");
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: texto }),
      });
      console.log(`[alerta] webhook HTTP ${res.status}`);
    } catch (e) {
      console.warn(`[alerta] falha no webhook: ${e.message}`);
    }
  } else {
    console.warn(`[alerta] webhook não configurado — diagnóstico apenas no log:\n${texto}`);
  }
}

console.log(
  `\n${comPerda.length} perda(s) · ${comGanho.length} ganho(s) — public/rich-results-monitor.json`,
);
