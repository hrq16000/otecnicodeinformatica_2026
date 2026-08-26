#!/usr/bin/env node
/**
 * RELATÓRIO DE QA DE INTERLINKS (gerado a cada build).
 *
 * Amostra os links de bairro e de serviço realmente aplicados, com métricas de
 * cobertura e a lista de erros/avisos — revisão rápida antes do deploy.
 *
 * Saídas: reports/interlinks-qa.json e reports/interlinks-qa.md
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { analisarInterlinks } from "./lib/interlinks-inspect.mjs";

const ROOT = process.cwd();
const r = analisarInterlinks();
const pct = (n) => (r.paginas ? `${((n / r.paginas) * 100).toFixed(0)}%` : "—");
const amostra = (lista, n) => lista.slice(0, n);

mkdirSync(resolve(ROOT, "reports"), { recursive: true });
writeFileSync(resolve(ROOT, "reports/interlinks-qa.json"), `${JSON.stringify(r, null, 2)}\n`);

const md = `# QA de interlinks — build ${r.geradoEm}

Fonte: \`src/lib/interlinksGerados.ts\` (gerado por \`scripts/generate-interlinks.mjs\`).

## Métricas

| Métrica | Valor |
| --- | --- |
| Páginas com interlinks | ${r.paginas} |
| Links totais | ${r.total} |
| Links de serviço | ${r.porContexto.servico} |
| Links de problema | ${r.porContexto.problema} |
| Links de bairro | ${r.porContexto.bairro} |
| Cobertura com serviço | ${r.cobertura.comServico} (${pct(r.cobertura.comServico)}) |
| Cobertura com problema | ${r.cobertura.comProblema} (${pct(r.cobertura.comProblema)}) |
| Cobertura com bairro | ${r.cobertura.comBairro} (${pct(r.cobertura.comBairro)}) |
| Erros bloqueantes | ${r.erros.length} |
| Avisos | ${r.avisos.length} |

## Amostra — links de bairro (nome oficial obrigatório)

| Página | Destino | Âncora publicada | Nome oficial |
| --- | --- | --- | --- |
${amostra(r.amostraBairros, 12).map((l) => `| ${l.origem} | ${l.href} | ${l.anchor} | ${l.nomeOficial} |`).join("\n") || "| — | — | — | — |"}

## Amostra — links de serviço

| Página | Destino | Âncora publicada |
| --- | --- | --- |
${amostra(r.amostraServicos, 12).map((l) => `| ${l.origem} | ${l.href} | ${l.anchor} |`).join("\n") || "| — | — | — |"}

${r.erros.length ? `## Erros bloqueantes\n\n${r.erros.map((e) => `- \`${e.origem}\` · **${e.regra}** — ${e.detalhe}`).join("\n")}` : "## Erros bloqueantes\n\nNenhum."}

${r.avisos.length ? `## Avisos\n\n${amostra(r.avisos, 30).map((a) => `- \`${a.origem}\` · ${a.regra} — ${a.detalhe}`).join("\n")}` : "## Avisos\n\nNenhum."}
`;

writeFileSync(resolve(ROOT, "reports/interlinks-qa.md"), md);
console.log(
  `[report:interlinks-qa] ${r.total} link(s) · ${r.paginas} página(s) · ${r.erros.length} erro(s) · ${r.avisos.length} aviso(s) → reports/interlinks-qa.md`,
);
