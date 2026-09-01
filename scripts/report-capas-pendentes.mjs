#!/usr/bin/env node
/**
 * RELATÓRIO DE CAPAS PENDENTES — governança de imagem real por URL editorial.
 *
 * Regra do projeto: capa gerada por IA é proibida. Uma URL só entra no sitemap
 * editorial com capa REAL (própria ou licenciada) em `public/blog/<slug>.<ext>`.
 * Este relatório mostra exatamente o que trava cada URL aprovada.
 *
 * Fontes (nada é inferido):
 *   • src/lib/blogEditorialRegistry.ts  → status + origem/licença da imagem
 *   • public/blog/<slug>.(jpg|webp|png) → capa real existente no repositório
 *   • scripts/lib/editorial-wave.mjs    → onda indexável (entra no sitemap)
 *   • public/sitemap-editorial.xml      → publicação efetiva
 *
 * Saída: public/capas-pendentes.json (consumido por /admin/capas-pendentes)
 * Uso:   npm run report:capas-pendentes
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { EDITORIAL_WAVE_SLUGS } from "./lib/editorial-wave.mjs";

const ROOT = process.cwd();
const REGISTRY = resolve(ROOT, "src/lib/blogEditorialRegistry.ts");

const src = readFileSync(REGISTRY, "utf8");

/** Cada bloco do registro carrega slug + status + origem da imagem. */
const registros = [];
for (const bloco of src.split(/\{\s*\n/)) {
  const slug = bloco.match(/slug:\s*"([a-z0-9-]+)"/)?.[1];
  if (!slug) continue;
  registros.push({
    slug,
    status: bloco.match(/status:\s*"([a-z_]+)"/)?.[1] ?? "draft",
    imageOrigin: bloco.match(/imageOrigin:\s*"([a-z]+)"/)?.[1] ?? "unknown",
    imageLicense: bloco.match(/imageLicense:\s*"([^"]*)"/)?.[1] ?? null,
    imageAttribution: bloco.match(/imageAttribution:\s*"([^"]*)"/)?.[1] ?? null,
    approvedAt: bloco.match(/approvedAt:\s*"([^"]*)"/)?.[1] ?? null,
  });
}

// A primeira onda usa FIRST_WAVE_SLUGS (aprovação implícita e datada na onda).
const first = src.match(/FIRST_WAVE_SLUGS\s*(?::[^=]+)?=\s*\[([\s\S]*?)\]/)?.[1] ?? "";
for (const m of first.matchAll(/"([a-z0-9-]+)"/g)) {
  if (!registros.some((r) => r.slug === m[1])) {
    registros.push({
      slug: m[1],
      status: "approved",
      imageOrigin: "unknown",
      imageLicense: null,
      imageAttribution: null,
      approvedAt: null,
    });
  }
}

const capaDe = (slug) => {
  for (const ext of ["jpg", "webp", "png"]) {
    if (existsSync(resolve(ROOT, `public/blog/${slug}.${ext}`))) return `/blog/${slug}.${ext}`;
  }
  return null;
};

const sitemapPath = resolve(ROOT, "public/sitemap-editorial.xml");
const sitemap = existsSync(sitemapPath) ? readFileSync(sitemapPath, "utf8") : "";

const urls = registros
  .map((r) => {
    const capa = capaDe(r.slug);
    const naOnda = EDITORIAL_WAVE_SLUGS.includes(r.slug);
    const noSitemap = sitemap.includes(`/blog/${r.slug}<`) || sitemap.includes(`/blog/${r.slug}/<`);
    const bloqueios = [];
    if (r.status !== "approved") bloqueios.push(`status "${r.status}" (não aprovado)`);
    if (!capa) bloqueios.push("sem capa real em public/blog/");
    if (r.imageOrigin === "generated") bloqueios.push("origem da imagem declarada como gerada (proibida)");
    if (capa && r.imageOrigin === "licensed" && !r.imageAttribution)
      bloqueios.push("imagem licenciada sem atribuição registrada");
    if (r.status === "approved" && capa && !naOnda) bloqueios.push("fora da onda do sitemap (rode sync:editorial-sitemap)");
    return {
      slug: r.slug,
      url: `/blog/${r.slug}`,
      status: r.status,
      approvedAt: r.approvedAt,
      capa,
      imageOrigin: r.imageOrigin,
      imageLicense: r.imageLicense,
      imageAttribution: r.imageAttribution,
      naOnda,
      noSitemap,
      bloqueios,
      pronta: bloqueios.length === 0,
    };
  })
  .sort((a, b) => Number(a.pronta) - Number(b.pronta) || a.slug.localeCompare(b.slug));

const saida = {
  geradoEm: new Date().toISOString(),
  total: urls.length,
  aprovadas: urls.filter((u) => u.status === "approved").length,
  semCapa: urls.filter((u) => u.status === "approved" && !u.capa).length,
  prontasForaDoSitemap: urls.filter((u) => u.pronta && !u.noSitemap).length,
  urls,
};

writeFileSync(resolve(ROOT, "public/capas-pendentes.json"), `${JSON.stringify(saida, null, 2)}\n`);
console.log(
  `capas-pendentes: ${saida.total} URLs · aprovadas ${saida.aprovadas} · sem capa ${saida.semCapa} · prontas fora do sitemap ${saida.prontasForaDoSitemap}`,
);
