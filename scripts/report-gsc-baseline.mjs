#!/usr/bin/env node
/**
 * BASELINE DE AUTORIDADE (Search Console) → src/data/gscBaseline.json
 *
 * Congela o snapshot real atual como marco de comparação do painel
 * /admin/seo. Rode DE PROPÓSITO: rodar toda hora zera a comparação.
 *
 * Uso: node scripts/report-gsc-baseline.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const ENTRADA = resolve("src/data/gscSnapshot.json");
const SAIDA = resolve("src/data/gscBaseline.json");

if (!existsSync(ENTRADA)) {
  console.error("[report:gsc-baseline] snapshot ausente — rode report:gsc-snapshot antes.");
  process.exit(1);
}

const snap = JSON.parse(readFileSync(ENTRADA, "utf8"));
if (snap.status !== "ok" || !(snap.paginas ?? []).length) {
  console.error("[report:gsc-baseline] snapshot indisponível — baseline preservado (fail-closed).");
  process.exit(1);
}

const posicaoPonderada = (p) => {
  const total = (p.consultas ?? []).reduce((a, c) => a + c.impressoes, 0);
  if (!total) return null;
  return Number(((p.consultas ?? []).reduce((a, c) => a + c.posicao * c.impressoes, 0) / total).toFixed(1));
};

const baseline = {
  descricao:
    "Baseline congelado do Search Console (marco de comparação de /admin/seo). Atualize apenas de propósito com report:gsc-baseline.",
  congeladoEm: new Date().toISOString().slice(0, 10),
  periodo: snap.periodo,
  totais: snap.totais,
  paginas: snap.paginas.map((p) => ({
    url: p.url,
    cliques: p.cliques,
    impressoes: p.impressoes,
    posicao: posicaoPonderada(p),
  })),
  consultasTop: (snap.consultasTop ?? []).map(({ termo, cliques, impressoes, posicao }) => ({
    termo,
    cliques,
    impressoes,
    posicao,
  })),
};

writeFileSync(SAIDA, `${JSON.stringify(baseline, null, 2)}\n`);
console.log(
  `[report:gsc-baseline] marco congelado — ${baseline.periodo?.inicio} → ${baseline.periodo?.fim} · ${baseline.paginas.length} URL(s) · ${baseline.consultasTop.length} termo(s).`,
);
