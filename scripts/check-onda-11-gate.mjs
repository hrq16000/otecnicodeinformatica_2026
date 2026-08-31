#!/usr/bin/env node
/**
 * GATE DE PUBLICAÇÃO DO LOTE 4 / ONDA 11.
 *
 * Regra editorial: nenhuma URL nova da Onda 11 pode ser publicada antes de a
 * Onda 10C estar CONSOLIDADA — isto é, todas as URLs em observação com
 * veredito PUBLISHED no ledger (public/editorial-verdicts.json).
 *
 * Fail-closed: ledger ausente, Search Console indisponível ou qualquer
 * veredito diferente de PUBLISHED bloqueia a publicação.
 *
 * Uso: npm run check:onda-11-gate
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const arquivo = resolve(process.cwd(), "public/editorial-verdicts.json");
if (!existsSync(arquivo)) {
  console.error('✖ ledger ausente — rode "npm run report:editorial-verdicts" antes.');
  console.error("  Onda 11 / Lote 4 BLOQUEADO.");
  process.exit(1);
}

const ledger = JSON.parse(readFileSync(arquivo, "utf8"));
const pendentes = (ledger.urls ?? []).filter((u) => u.veredito !== "PUBLISHED");

console.log(
  `[onda-11] ledger de ${ledger.geradoEm} · ${ledger.total} URL(s) · consolidada=${ledger.consolidada}`,
);

if (!ledger.fonte?.gscDisponivel) {
  console.error("✖ Search Console indisponível: vereditos UNKNOWN não consolidam a onda.");
  console.error("  Onda 11 / Lote 4 BLOQUEADO (fail-closed).");
  process.exit(1);
}

if (pendentes.length) {
  console.error(`✖ ${pendentes.length} URL(s) sem veredito PUBLISHED:`);
  for (const u of pendentes) console.error(`  · ${u.url} → ${u.veredito} (${u.estadoBusca})`);
  console.error("  Onda 11 / Lote 4 BLOQUEADO.");
  process.exit(1);
}

console.log("✓ Onda 10C consolidada — publicação do Lote 4 (Onda 11) liberada.");
