#!/usr/bin/env node
/**
 * Deriva a imagem da primeira dobra a partir da foto ORIGINAL já versionada.
 * Não substitui a origem, não cria IA, não transfere a foto para serviço externo.
 * A transcodificação via sharp descarta metadados EXIF/GPS no arquivo gerado.
 * Rodar antes do dev e build mantém SSR e HTML <picture> sem URLs quebradas.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const source = path.resolve("public/fotos/bancada-tecnica.jpg");
const outputDir = path.dirname(source);
const variants = [480, 768, 1280];
const data = await readFile(source);
await mkdir(outputDir, { recursive: true });
const meta = await sharp(data).metadata();
if (!meta.width || meta.width < 768) {
  throw new Error("[home-hero] Foto original ausente ou menor que 768 pixels");
}
for (const width of variants) {
  const target = path.join(outputDir, `bancada-tecnica-${width}.avif`);
  const buf = await sharp(data)
    .resize({ width, withoutEnlargement: true })
    .avif({ quality: 48, effort: 4 })
    .toBuffer();
  if (buf.length > 115 * 1024) {
    throw new Error(`[home-hero] Variante ${width}px excede 115 KB (${buf.length} bytes)`);
  }
  await writeFile(target, buf);
  console.log(`[home-hero] ${width}px: ${buf.length} bytes`);
}
