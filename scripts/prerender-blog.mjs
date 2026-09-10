#!/usr/bin/env node
/**
 * Prerender manual dos artigos do blog usando o handler SSR do TanStack Start.
 *
 * Lê os slugs aprovados do sitemap editorial, invoca o handler Nitro
 * gerado no build e salva o HTML completo em dist/client/blog/<slug>/index.html.
 */

import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

process.env.NODE_ENV = "production";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "dist/client/blog");
const SITEMAP_PATH = path.join(ROOT, "public/sitemap-editorial.xml");
const SERVER_ENTRY = path.join(ROOT, "dist/server/index.mjs");

async function getSlugsFromSitemap() {
  const xml = await readFile(SITEMAP_PATH, "utf-8");
  const slugs = [];
  const re = /\/blog\/([^<]+)/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const slug = m[1].trim();
    if (slug && slug !== "blog") slugs.push(slug);
  }
  return [...new Set(slugs)];
}

async function main() {
  const slugs = await getSlugsFromSitemap();
  if (slugs.length === 0) {
    console.log("[prerender] nenhum slug encontrado no sitemap editorial");
    return;
  }

  const mod = await import(SERVER_ENTRY);
  const handler = mod.default;
  const ctx = { waitUntil: () => {} };

  // A home renderizada também é o template usado pelo gerador estático das
  // demais rotas (scripts/prerender-cities.mjs), então precisa existir.
  const home = await handler.fetch(new Request("http://localhost/"), {}, ctx);
  if (home.ok) {
    const homeHtml = await home.text();
    await mkdir(path.join(ROOT, "dist/client"), { recursive: true });
    await writeFile(path.join(ROOT, "dist/client/index.html"), homeHtml, "utf-8");
    console.log("[prerender] / -> dist/client/index.html");
  } else {
    console.error(`[prerender] erro ${home.status} na home`);
  }


  for (const slug of slugs) {
    const url = `http://localhost/blog/${slug}`;
    const res = await handler.fetch(new Request(url), {}, ctx);
    if (!res.ok) {
      console.error(`[prerender] erro ${res.status} em /blog/${slug}`);
      continue;
    }
    const html = await res.text();
    const outFile = path.join(OUT_DIR, slug, "index.html");
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, html, "utf-8");
    console.log(`[prerender] /blog/${slug} -> ${path.relative(ROOT, outFile)}`);
  }

  console.log(`[prerender] concluído: ${slugs.length} artigo(s)`);
}

main().catch((err) => {
  console.error("[prerender] erro:", err);
  process.exit(1);
});
