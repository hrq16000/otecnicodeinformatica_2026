#!/usr/bin/env node
/**
 * ALERTAS DE REGRESSÃO EDITORIAL (schema/JSON-LD, FAQPage visível, BreadcrumbList).
 *
 * Lê o delta da auditoria e os artefatos de schema já gerados, monta eventos
 * edge-triggered e entrega pelos canais configurados (Slack/Resend) reutilizando
 * scripts/lib/editorial-alert-delivery.mjs. Sem credencial → DELIVERY_DISABLED,
 * nunca falha silenciosa. Nada é publicado nem alterado no conteúdo.
 *
 * Uso: node scripts/alert-editorial-regression.mjs [--dry-run]
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { entregarAlertas } from "./lib/editorial-alert-delivery.mjs";

const ROOT = process.cwd();
const dryRun = process.argv.includes("--dry-run");
const ler = (p) => {
  const f = resolve(ROOT, p);
  if (!existsSync(f)) return null;
  try {
    return JSON.parse(readFileSync(f, "utf8"));
  } catch {
    return null;
  }
};

const delta = ler("reports/editorial/10c/delta-latest.json");
const diff = ler("public/editorial-schema-diff.json");
const fingerprints = ler("reports/schema/editorial-schema-fingerprints.json");
const LINK_DIFF = "/admin/editorial-ondas?tab=schema";

const eventos = [];
const add = (id, url, severity, tipo, detalhe) =>
  eventos.push({
    id,
    url,
    severity,
    type: tipo,
    source: "EDITORIAL",
    message: detalhe,
    diffUrl: LINK_DIFF,
    detectedAt: new Date().toISOString(),
  });

// 1. Regressão de schema entre builds.
for (const linha of diff?.linhas ?? []) {
  if (linha.estado !== "SCHEMA_REGRESSION") continue;
  const url = linha.url ?? linha.owner ?? "—";
  add(
    `schema-regression:${url}:${diff.buildB ?? "?"}`,
    url,
    "CRITICAL",
    "SCHEMA_REGRESSION",
    `Regressão de JSON-LD entre ${diff.buildA ?? "?"} e ${diff.buildB ?? "?"}: ${linha.motivo ?? linha.detalhe ?? "tipos/campos semânticos perdidos"}. Diff: ${LINK_DIFF}`,
  );
}

// 2. Não-determinismo, FAQPage visível e BreadcrumbList por owner.
for (const rota of fingerprints?.rotas ?? []) {
  const url = rota.url ?? rota.owner ?? "—";
  const build = fingerprints?.geradoEm ?? "";
  if ((rota.variantes ?? 1) > 1) {
    add(
      `schema-nondeterministic:${url}:${build}`,
      url,
      "CRITICAL",
      "SCHEMA_NAO_DETERMINISTICO",
      `${rota.variantes} variantes de fingerprint em renders frios — JSON-LD não determinístico. Diff: ${LINK_DIFF}`,
    );
  }
  if (rota.faq && rota.faq.visivel === false) {
    add(
      `faq-invisivel:${url}:${build}`,
      url,
      "CRITICAL",
      "FAQ_VISIVEL_AUSENTE",
      `FAQPage declarado sem FAQ visível 1:1 no HTML (data-faq-visivel). Diff: ${LINK_DIFF}`,
    );
  }
  if (rota.breadcrumb && rota.breadcrumb.visivel === false) {
    add(
      `breadcrumb-invisivel:${url}:${build}`,
      url,
      "WARNING",
      "BREADCRUMB_VISUAL_AUSENTE",
      `BreadcrumbList no schema sem trilha visual correspondente. Diff: ${LINK_DIFF}`,
    );
  }
}

// 3. Regressões agregadas detectadas pelo delta da auditoria.
for (const r of delta?.regressoes ?? []) {
  if (!["schema", "assets"].includes(r.dominio)) continue;
  add(
    `audit-regression:${r.dominio}:${r.metrica}:${delta.auditoriaAtual}`,
    `auditoria/${r.dominio}`,
    r.dominio === "schema" ? "CRITICAL" : "WARNING",
    "AUDITORIA_REGRESSAO",
    `${r.dominio} · ${r.metrica}: ${r.de} → ${r.para} (${r.delta}). Diff: ${LINK_DIFF}`,
  );
}

let entrega = { resumo: { estado: "SEM_EVENTOS", enviados: 0, ignorados: 0 }, resultados: [] };
if (eventos.length > 0) {
  entrega = await entregarAlertas(eventos, { dryRun });
}

const saida = {
  geradoEm: new Date().toISOString(),
  dryRun,
  total: eventos.length,
  criticos: eventos.filter((e) => e.severity === "CRITICAL").length,
  entrega: entrega.resumo,
  eventos: eventos.map(({ id, url, severity, type, message }) => ({ id, url, severity, type, message })),
};

mkdirSync(resolve(ROOT, "reports/editorial/10c"), { recursive: true });
writeFileSync(
  resolve(ROOT, "reports/editorial/10c/regression-alerts.json"),
  `${JSON.stringify(saida, null, 2)}\n`,
);

console.log(
  `[alerts:editorial-regression] ${saida.total} evento(s) · ${saida.criticos} crítico(s) · entrega ${saida.entrega.estado}`,
);
for (const e of saida.eventos) console.log(`  · [${e.severity}] ${e.url} — ${e.type}`);
