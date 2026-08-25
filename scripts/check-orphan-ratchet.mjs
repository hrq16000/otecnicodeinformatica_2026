#!/usr/bin/env node
/**
 * ============================================================================
 * GATE ANTI-ORPHAN PAGES — CATRACA (ratchet)
 * ============================================================================
 * Conta as URLs indexáveis (presentes no sitemap curado) que NÃO recebem
 * nenhum link interno — o número já é apurado por `check-internal-links.mjs`
 * como WARN_ORPHAN_INDEXABLE. Aqui esse número vira contrato: ele pode cair
 * ou ficar igual, nunca crescer.
 *
 * Fail-closed:
 *   · sem baseline versionada  → falha e instrui `--update`;
 *   · gate de links quebrado   → falha (não aprova em silêncio);
 *   · órfãs > baseline         → falha (block deploy) listando as novas.
 *
 * Uso:
 *   node scripts/check-orphan-ratchet.mjs            # verifica
 *   node scripts/check-orphan-ratchet.mjs --update   # regrava a baseline
 *                                                     (só permitido se ≤ atual)
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const BASELINE = join(ROOT, "config", "orphan-baseline.json");
const UPDATE = process.argv.includes("--update");

let relatorio;
try {
  const saida = execFileSync("node", ["scripts/check-internal-links.mjs", "--json"], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  relatorio = JSON.parse(saida);
} catch (erro) {
  // exit != 0 ainda traz JSON no stdout quando há erros de link.
  const bruto = erro?.stdout?.toString?.() ?? "";
  try {
    relatorio = JSON.parse(bruto);
  } catch {
    console.error("✖ [UNKNOWN_LINK_GATE_FAILURE] não foi possível apurar links internos.");
    console.error(erro?.stderr?.toString?.() || erro?.message);
    process.exit(1);
  }
  if (relatorio.errors?.length) {
    console.error(`✖ [FAIL_LINK_ERRORS] ${relatorio.errors.length} erro(s) de link interno — corrija antes da catraca.`);
    relatorio.errors.slice(0, 20).forEach((e) => console.error(`  · [${e.reason}] ${e.detalhe}`));
    process.exit(1);
  }
}

const orfas = (relatorio.warnings ?? [])
  .filter((w) => String(w.reason).includes("ORPHAN"))
  .map((w) => String(w.detalhe).replace(/^\[[^\]]+\]\s*/, ""))
  .sort();

const atual = { total: orfas.length, urls: orfas };

if (UPDATE) {
  if (existsSync(BASELINE)) {
    const anterior = JSON.parse(readFileSync(BASELINE, "utf8"));
    if (atual.total > anterior.total) {
      console.error(
        `✖ [FAIL_RATCHET_UPDATE] baseline não pode subir (${anterior.total} → ${atual.total}). Ligue as páginas na malha.`,
      );
      process.exit(1);
    }
  }
  writeFileSync(BASELINE, `${JSON.stringify(atual, null, 2)}\n`);
  console.log(`✓ Baseline de órfãs atualizada: ${atual.total} URL(s).`);
  process.exit(0);
}

if (!existsSync(BASELINE)) {
  console.error(
    `✖ [FAIL_MISSING_BASELINE] ${BASELINE} ausente. Gere com: npm run check:orphan-ratchet -- --update`,
  );
  process.exit(1);
}

const baseline = JSON.parse(readFileSync(BASELINE, "utf8"));
const novas = orfas.filter((u) => !baseline.urls.includes(u));
const resolvidas = baseline.urls.filter((u) => !orfas.includes(u));

console.log("── Catraca anti-órfãs (URLs indexáveis sem link interno) ──");
console.log(`Baseline: ${baseline.total} | atual: ${atual.total}`);
if (resolvidas.length) console.log(`✓ ${resolvidas.length} órfã(s) resolvida(s): ${resolvidas.slice(0, 10).join(", ")}`);

if (atual.total > baseline.total || novas.length) {
  console.error(`\n✖ [FAIL_ORPHAN_GROWTH] ${novas.length} nova(s) órfã(s) — deploy bloqueado:`);
  novas.forEach((u) => console.error(`  · ${u}`));
  process.exit(1);
}

console.log("\n✔ Nenhuma nova página órfã.");
