#!/usr/bin/env node
/**
 * WEB VITALS DAS PÁGINAS B2B, COM RECORTE POR CIDADE.
 *
 * Mede LCP · INP · CLS via PageSpeed Insights (campo CrUX quando existe,
 * laboratório como fallback) para os owners empresariais e agrupa o
 * resultado por cidade de intenção comercial (Curitiba e São José dos
 * Pinhais compartilham URL por decisão anti-doorway).
 *
 * Uso:
 *   node scripts/report-vitals-b2b.mjs            # mobile
 *   node scripts/report-vitals-b2b.mjs --desktop
 *   node scripts/report-vitals-b2b.mjs --alert    # exit 1 fora do orçamento
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { BASE_URL } from "./lib/curated-urls.mjs";

const ALERT = process.argv.includes("--alert");
const STRATEGY = process.argv.includes("--desktop") ? "desktop" : "mobile";
const BUDGET = { LCP: 2500, INP: 200, CLS: 0.1 };
const PSI = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

/** Owners empresariais por cidade de intenção. */
const CIDADES = {
  Curitiba: [
    "/empresa-de-ti-curitiba",
    "/empresas",
    "/servicos/suporte-empresarial",
    "/servicos/backup-empresarial",
  ],
  "São José dos Pinhais": ["/tecnico-informatica-sao-jose-dos-pinhais"],
};

const num = (v) => (typeof v === "number" ? Number(v.toFixed(3)) : null);

async function medir(url) {
  const params = new URLSearchParams({ url, strategy: STRATEGY, category: "performance" });
  if (process.env.PSI_API_KEY) params.set("key", process.env.PSI_API_KEY);
  const res = await fetch(`${PSI}?${params}`);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`PSI [${res.status}] ${body?.error?.message ?? "erro"}`);
  const audits = body?.lighthouseResult?.audits ?? {};
  const campo = body?.loadingExperience?.metrics ?? {};
  return {
    LCP: campo.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? num(audits["largest-contentful-paint"]?.numericValue),
    INP: campo.INTERACTION_TO_NEXT_PAINT?.percentile ?? null,
    CLS:
      typeof campo.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile === "number"
        ? campo.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100
        : num(audits["cumulative-layout-shift"]?.numericValue),
    origem: campo.LARGEST_CONTENTFUL_PAINT_MS ? "campo" : "laboratorio",
  };
}

const resultado = {};
const violacoes = [];

for (const [cidade, rotas] of Object.entries(CIDADES)) {
  resultado[cidade] = [];
  for (const path of rotas) {
    try {
      const m = await medir(`${BASE_URL}${path}`);
      resultado[cidade].push({ path, ...m });
      if (m.LCP && m.LCP > BUDGET.LCP) violacoes.push(`${cidade} · ${path}: LCP ${m.LCP}ms > ${BUDGET.LCP}ms`);
      if (m.INP && m.INP > BUDGET.INP) violacoes.push(`${cidade} · ${path}: INP ${m.INP}ms > ${BUDGET.INP}ms`);
      if (m.CLS && m.CLS > BUDGET.CLS) violacoes.push(`${cidade} · ${path}: CLS ${m.CLS} > ${BUDGET.CLS}`);
    } catch (e) {
      resultado[cidade].push({ path, erro: e.message, LCP: null, INP: null, CLS: null, origem: "erro" });
    }
  }
}

mkdirSync("reports", { recursive: true });
const md = [
  "# Web Vitals — páginas B2B por cidade",
  "",
  `Gerado em ${new Date().toISOString()} · estratégia: ${STRATEGY}`,
  "",
  ...Object.entries(resultado).flatMap(([cidade, linhas]) => [
    `## ${cidade}`,
    "",
    "| Rota | LCP | INP | CLS | Origem |",
    "|---|---|---|---|---|",
    ...linhas.map((l) => `| ${l.path} | ${l.LCP ?? "—"} | ${l.INP ?? "—"} | ${l.CLS ?? "—"} | ${l.origem} |`),
    "",
  ]),
  violacoes.length
    ? `## Fora do orçamento\n\n${violacoes.map((v) => `- ${v}`).join("\n")}`
    : "Todas as rotas dentro do orçamento.",
  "",
].join("\n");

writeFileSync("reports/vitals-b2b.md", md);
writeFileSync(
  "reports/vitals-b2b.json",
  `${JSON.stringify({ geradoEm: new Date().toISOString(), strategy: STRATEGY, cidades: resultado, violacoes }, null, 2)}\n`,
);

console.log(md);
if (ALERT && violacoes.length) process.exit(1);
