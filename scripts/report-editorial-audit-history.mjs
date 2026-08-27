#!/usr/bin/env node
/**
 * HISTÓRICO NAVEGÁVEL DA AUDITORIA 10C.
 *
 * Lê as execuções já gravadas em `reports/editorial/10c/history/` e publica:
 *   • public/editorial-audit-history.json              → índice navegável
 *   • public/editorial/10c/history/<arquivo>.json      → artefato de cada execução
 *
 * Não recalcula nada e não chama rede: se não houver execução gravada, o índice
 * sai vazio com motivo explícito (fail-closed), nunca com dado inventado.
 *
 * Uso: node scripts/report-editorial-audit-history.mjs
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = process.cwd();
const HIST = resolve(ROOT, "reports/editorial/10c/history");
const PUB_DIR = resolve(ROOT, "public/editorial/10c/history");
const INDICE = resolve(ROOT, "public/editorial-audit-history.json");

mkdirSync(PUB_DIR, { recursive: true });

const arquivos = existsSync(HIST)
  ? readdirSync(HIST)
      .filter((f) => f.endsWith(".json"))
      .sort()
      .reverse()
  : [];

const execucoes = [];
for (const arquivo of arquivos) {
  let dados = null;
  try {
    dados = JSON.parse(readFileSync(join(HIST, arquivo), "utf8"));
  } catch {
    dados = null;
  }
  copyFileSync(join(HIST, arquivo), join(PUB_DIR, arquivo));
  const kpis = dados?.kpis ?? {};
  execucoes.push({
    arquivo,
    artefato: `/editorial/10c/history/${arquivo}`,
    wave: dados?.wave ?? "UNKNOWN",
    geradoEm: dados?.geradoEm ?? null,
    veredito: dados?.veredito ?? "UNKNOWN",
    responsavel: dados?.execucao?.responsavel ?? "UNKNOWN",
    origem: dados?.execucao?.origem ?? "UNKNOWN",
    commit: dados?.execucao?.commit ?? null,
    jobUrl: dados?.execucao?.jobUrl ?? null,
    estados: Object.fromEntries(
      Object.entries(kpis).map(([nome, kpi]) => [nome, kpi?.estado ?? "UNKNOWN"]),
    ),
  });
}

const indice = {
  geradoEm: new Date().toISOString(),
  total: execucoes.length,
  motivo: execucoes.length
    ? null
    : "Nenhuma execução gravada em reports/editorial/10c/history — rode npm run audit:editorial-10c.",
  execucoes,
};

writeFileSync(INDICE, `${JSON.stringify(indice, null, 2)}\n`);
console.log(`[historico-10c] ${execucoes.length} execução(ões) indexada(s) em public/editorial-audit-history.json`);
