#!/usr/bin/env node
/**
 * WEB VITALS DOS OWNERS 4E (redes, Wi-Fi e suporte remoto).
 *
 * Mede LCP · INP · CLS via PageSpeed Insights (campo CrUX quando existe,
 * laboratório como fallback) para as rotas enriquecidas na Rodada 4E e grava
 * `reports/vitals-4e.md` + `reports/vitals-4e.json`.
 *
 * Os owners são páginas nacionais únicas (não há URL por cidade), então o
 * recorte por cidade é feito na coluna de intenção comercial: Curitiba e
 * São José dos Pinhais compartilham a mesma URL por decisão anti-doorway.
 *
 * Uso:
 *   node scripts/report-vitals-4e.mjs            # mobile
 *   node scripts/report-vitals-4e.mjs --desktop
 *   node scripts/report-vitals-4e.mjs --alert    # exit 1 fora do orçamento
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { BASE_URL } from "./lib/curated-urls.mjs";

const ALERT = process.argv.includes("--alert");
const STRATEGY = process.argv.includes("--desktop") ? "desktop" : "mobile";
const BUDGET = { LCP: 2500, INP: 200, CLS: 0.1 };
const PSI = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

const OWNERS = [
  "/problemas/wifi-instavel",
  "/solucoes/diagnostico",
  "/equipamentos/roteador",
  "/servicos/redes-e-wifi",
  "/atendimento-remoto",
];

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

const linhas = [];
const violacoes = [];

for (const path of OWNERS) {
  try {
    const m = await medir(`${BASE_URL}${path}`);
    linhas.push({ path, ...m });
    if (m.LCP && m.LCP > BUDGET.LCP) violacoes.push(`${path}: LCP ${m.LCP}ms > ${BUDGET.LCP}ms`);
    if (m.INP && m.INP > BUDGET.INP) violacoes.push(`${path}: INP ${m.INP}ms > ${BUDGET.INP}ms`);
    if (m.CLS && m.CLS > BUDGET.CLS) violacoes.push(`${path}: CLS ${m.CLS} > ${BUDGET.CLS}`);
  } catch (e) {
    linhas.push({ path, erro: e.message, LCP: null, INP: null, CLS: null, origem: "erro" });
  }
}

mkdirSync("reports", { recursive: true });
const md = [
  "# Web Vitals — owners da Rodada 4E",
  "",
  `Gerado em ${new Date().toISOString()} · estratégia: ${STRATEGY}`,
  "",
  "| Rota | LCP | INP | CLS | Origem |",
  "|---|---|---|---|---|",
  ...linhas.map(
    (l) => `| ${l.path} | ${l.LCP ?? "—"} | ${l.INP ?? "—"} | ${l.CLS ?? "—"} | ${l.origem} |`,
  ),
  "",
  violacoes.length ? `## Fora do orçamento\n\n${violacoes.map((v) => `- ${v}`).join("\n")}` : "Todas as rotas dentro do orçamento.",
  "",
].join("\n");

writeFileSync("reports/vitals-4e.md", md);
writeFileSync(
  "reports/vitals-4e.json",
  `${JSON.stringify({ geradoEm: new Date().toISOString(), strategy: STRATEGY, rotas: linhas, violacoes }, null, 2)}\n`,
);

console.log(md);
if (ALERT && violacoes.length) process.exit(1);
