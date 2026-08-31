#!/usr/bin/env node
/**
 * GATE DE PUBLICAÇÃO DO LOTE 4 / ONDA 11.
 *
 * Regra editorial padrão: nenhuma URL nova da Onda 11 pode ser publicada antes
 * de a Onda 10C estar CONSOLIDADA — isto é, todas as URLs em observação com
 * veredito PUBLISHED no ledger (public/editorial-verdicts.json).
 *
 * Exceção explícita: `config/onda-11-liberacao.json` com `liberado: true`
 * registra uma liberação MANUAL, assinada e datada pelo responsável editorial.
 * Não é gerada automaticamente e não pode ser inferida: sem o arquivo, o gate
 * volta a ser fail-closed.
 *
 * Uso: npm run check:onda-11-gate
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const liberacaoPath = resolve(process.cwd(), "config/onda-11-liberacao.json");
let liberacao = null;
if (existsSync(liberacaoPath)) {
  try {
    const raw = JSON.parse(readFileSync(liberacaoPath, "utf8"));
    if (raw?.liberado === true && raw.autorizadoPor && raw.autorizadoEm && Array.isArray(raw.slugs)) {
      liberacao = raw;
    }
  } catch (e) {
    console.error(`✖ config/onda-11-liberacao.json inválido: ${e.message}`);
    process.exit(1);
  }
}

const arquivo = resolve(process.cwd(), "public/editorial-verdicts.json");
const ledger = existsSync(arquivo) ? JSON.parse(readFileSync(arquivo, "utf8")) : null;

if (ledger) {
  console.log(
    `[onda-11] ledger de ${ledger.geradoEm} · ${ledger.total} URL(s) · consolidada=${ledger.consolidada}`,
  );
}

if (liberacao) {
  console.log("✓ LIBERAÇÃO MANUAL registrada — publicação do Lote 4 (Onda 11) autorizada.");
  console.log(`  autorizado por: ${liberacao.autorizadoPor} em ${liberacao.autorizadoEm}`);
  console.log(`  slugs liberados: ${liberacao.slugs.join(", ")}`);
  if (liberacao.motivo) console.log(`  motivo: ${liberacao.motivo}`);
  const pendentesInfo = (ledger?.urls ?? []).filter((u) => u.veredito !== "PUBLISHED");
  if (pendentesInfo.length) {
    console.log(
      `  observação: ${pendentesInfo.length} URL(s) da 10C ainda não consolidada(s) — seguem em monitoramento.`,
    );
  }
  process.exit(0);
}

if (!ledger) {
  console.error('✖ ledger ausente — rode "npm run report:editorial-verdicts" antes.');
  console.error("  Onda 11 / Lote 4 BLOQUEADO.");
  process.exit(1);
}

const pendentes = (ledger.urls ?? []).filter((u) => u.veredito !== "PUBLISHED");

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
