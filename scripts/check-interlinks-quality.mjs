#!/usr/bin/env node
/**
 * GATE FAIL-FAST — QUALIDADE DAS ÂNCORAS DE INTERLINK.
 *
 * Roda no prebuild: qualquer slug cru vazando na âncora ("atendimento em
 * sitio-cercado"), nome de bairro fora de bairrosDirectory.ts, autolink,
 * destino duplicado ou página sem link de serviço derruba o build na hora.
 *
 * Uso: node scripts/check-interlinks-quality.mjs
 */
import { analisarInterlinks } from "./lib/interlinks-inspect.mjs";

const r = analisarInterlinks();

for (const a of r.avisos.slice(0, 20)) console.warn(`⚠ ${a.origem} · ${a.regra}: ${a.detalhe}`);
for (const e of r.erros) console.error(`✖ ${e.origem} · ${e.regra}: ${e.detalhe}`);

if (r.erros.length > 0) {
  console.error(
    `\n[check:interlinks-quality] FALHA: ${r.erros.length} problema(s) em ${r.paginas} página(s). Regenere com \`npm run generate:interlinks\`.`,
  );
  process.exit(1);
}

console.log(
  `[check:interlinks-quality] OK — ${r.total} link(s) em ${r.paginas} página(s) · serviço ${r.porContexto.servico} · problema ${r.porContexto.problema} · bairro ${r.porContexto.bairro} · ${r.avisos.length} aviso(s).`,
);
