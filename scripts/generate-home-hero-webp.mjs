#!/usr/bin/env node
/**
 * Variante responsiva da foto LCP na HOME (Lighthouse mobile, rodada 26).
 * Não edita o JPG original; Sharp remove metadados por padrão.
 * Deve executar ANTES do Vite, tanto em predev como prebuild.
 */
import sharp from "sharp";
import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
export const HOME_HERO_SOURCE = path.join(root, "public/fotos/bancada-tecnica.jpg");
export const HOME_HERO_WEBP = path.join(root, "public/fotos/bancada-tecnica-768.webp");

export async function generateHomeHeroWebp({
  source = HOME_HERO_SOURCE,
  output = HOME_HERO_WEBP,
} = {}) {
  const original = await stat(source);
  const originalMetadata = await sharp(source).metadata();
  if (!originalMetadata.width || !originalMetadata.height) {
    throw new Error("Hero: dimensões de origem ausentes.");
  }

  // O elemento mede ~378px CSS na emulação mobile; 768px atende DPR 2
  // sem transportar a foto JPG original de 275KiB para visitantes WebP.
  const webp = await sharp(source)
    .rotate()
    .resize({ width: 768, withoutEnlargement: true })
    .webp({ quality: 76, effort: 5 })
    .toBuffer();
  const info = await sharp(webp).metadata();
  if (info.format !== "webp" || !info.width || info.width > 768 ||
      webp.byteLength >= original.size || webp.byteLength > 110 * 1024 ||
      info.exif || info.xmp || info.icc) {
    throw new Error("Hero: variante não atingiu formato, peso ou privacidade esperados.");
  }

  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, webp);
  return { originalBytes: original.size, webpBytes: webp.byteLength, width: info.width };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  generateHomeHeroWebp().then((result) => {
    console.log("[home-hero] WebP gerado:", result);
  }).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
