#!/usr/bin/env node
/**
 * SNAPSHOT SSR PARA VALIDAÇÃO DE JSON-LD
 * --------------------------------------
 * No stack TanStack Start (SSR/Nitro) não existe `dist/index.html` estático:
 * o HTML é renderizado por requisição. O validador `validate-jsonld-static.mjs`
 * percorre `dist/**\/index.html`, então este script materializa esses arquivos
 * a partir do SSR real, usando o harness compartilhado.
 *
 * Comportamento (aprendizado da rodada anterior):
 *  - sem servidor SSR disponível → AVISA e sai com 0, preservando snapshots
 *    anteriores. Build local/CI sem preview não quebra por indisponibilidade.
 *  - com `--require` → falha (exit 1) quando o SSR não responde. É a forma
 *    usada no gate bloqueante.
 *
 * Uso:
 *   node scripts/snapshot-ssr-jsonld.mjs [--require] [--dist dist]
 */
import { prepararSsr, ssrBloqueado, resumo } from "./lib/ssr-harness.mjs";
import { CURATED_PATHS } from "./lib/curated-urls.mjs";

const argv = process.argv.slice(2);
const exigir = argv.includes("--require");
const distIdx = argv.indexOf("--dist");
// Diretório PRÓPRIO: escrever em dist/ faria outros gates (editorial, por ex.)
// interpretarem o snapshot como build estático e mudarem de modo.
const dist = distIdx >= 0 ? argv[distIdx + 1] : "dist-jsonld";

const rotas = [...new Set(["/", ...CURATED_PATHS])];

const r = await prepararSsr(rotas, { dist });

if (ssrBloqueado()) {
  const msg =
    `[snapshot-ssr-jsonld] SSR indisponível (${r.reason}). ` +
    `Nenhum snapshot novo foi gerado; snapshots anteriores em ${dist} foram preservados.`;
  if (exigir) {
    console.error(`BLOQUEADO: ${msg} Suba o servidor (npm run dev) ou defina SSR_BASE_URL.`);
    process.exit(1);
  }
  console.warn(`AVISO: ${msg}`);
  process.exit(0);
}

console.log(
  `[snapshot-ssr-jsonld] ${rotas.length} rotas · renderizadas ${r.renderizadas} · ` +
    `reaproveitadas ${r.reaproveitadas} · falhas ${r.falhas.length}`,
);
if (r.falhas.length) {
  for (const f of r.falhas.slice(0, 20)) console.warn(`  · ${f}`);
  if (exigir) {
    console.error(`BLOQUEADO: ${r.falhas.length} rota(s) não renderizaram em SSR.`);
    process.exit(1);
  }
}
console.log(resumo().base ? `base SSR: ${resumo().base}` : "");
