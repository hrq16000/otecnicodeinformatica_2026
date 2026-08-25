#!/usr/bin/env node
/**
 * GATE — variantes modernas de imagem (WebP/AVIF).
 *
 * Toda foto raster pesada publicada em src/assets precisa ter, no mínimo,
 * um irmão .webp. Fotos acima do teto de peso sem variante moderna reprovam
 * o build. A geração é feita por `npm run images:variants`
 * (scripts/optimize-photos.mjs), que já limpa/valida privacidade.
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const BASE = path.join(ROOT, "src/assets");
const RASTER = new Set([".jpg", ".jpeg", ".png"]);
const LIMITE_KB = Number(process.env["IMAGE_VARIANT_MAX_KB"] ?? 150);

async function listar(dir, acc = []) {
  for (const nome of await readdir(dir)) {
    const caminho = path.join(dir, nome);
    const info = await stat(caminho);
    if (info.isDirectory()) await listar(caminho, acc);
    else acc.push({ caminho, bytes: info.size });
  }
  return acc;
}

const arquivos = await listar(BASE);
const nomes = new Set(arquivos.map((a) => a.caminho));

const faltando = [];
for (const { caminho, bytes } of arquivos) {
  const ext = path.extname(caminho).toLowerCase();
  if (!RASTER.has(ext)) continue;
  const semExt = caminho.slice(0, -ext.length);
  // OG/Twitter cards precisam permanecer JPG puro para os crawlers sociais.
  if (path.basename(semExt).startsWith("og-")) continue;
  const temVariante = [...nomes].some((n) =>
    new RegExp(`^${semExt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(-\\d+)?\\.(webp|avif)$`).test(n),
  );
  if (temVariante) continue;
  if (bytes / 1024 < LIMITE_KB) continue;
  faltando.push({ arquivo: path.relative(ROOT, caminho), kb: Math.round(bytes / 1024) });
}

if (faltando.length > 0) {
  console.error(
    `[image-variants] ${faltando.length} imagem(ns) acima de ${LIMITE_KB} KB sem variante WebP/AVIF:`,
  );
  for (const f of faltando) console.error(`  - ${f.arquivo} (${f.kb} KB)`);
  console.error("[image-variants] rode: npm run images:variants");
  process.exit(1);
}

console.log(
  `[image-variants] OK — nenhuma imagem acima de ${LIMITE_KB} KB sem WebP/AVIF (${arquivos.length} arquivos inspecionados).`,
);
