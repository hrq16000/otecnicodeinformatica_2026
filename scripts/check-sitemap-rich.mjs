#!/usr/bin/env node
/**
 * GATE — check:sitemap-rich
 *
 * Governança de SEO programático: o sitemap só pode anunciar páginas com
 * conteúdo aprofundado (contentStatus === "RICH"). Páginas SHALLOW existem,
 * respondem 200 e são linkadas internamente, mas renderizam `noindex` e
 * NUNCA entram no sitemap.
 *
 * Falha o build quando:
 *  1) Um bairro anunciado no sitemap não é RICH pela política central.
 *  2) Um bairro RICH ficou de fora do sitemap (perda de cobertura silenciosa).
 *  3) Um serviço curado não existe em servicosCore.ts (URL fantasma).
 *
 * Fonte única: scripts/lib/local-index-policy.mjs (mesmo JSON que o runtime
 * consome em src/lib/localIndexPolicy.json), portanto gate e app não podem
 * divergir por construção.
 */
import fs from "node:fs";
import { BAIRROS, SERVICOS } from "./lib/curated-urls.mjs";
import { BAIRROS_ANCORA } from "./lib/local-index-policy.mjs";

const errors = [];

const noSitemap = BAIRROS.map((e) => e.path.replace("/bairros/", ""));
const rich = [...BAIRROS_ANCORA];

// 1 — nada SHALLOW no sitemap
for (const slug of noSitemap) {
  if (!rich.includes(slug)) {
    errors.push(`Bairro SHALLOW anunciado no sitemap: /bairros/${slug}`);
  }
}

// 2 — nenhum RICH esquecido fora do sitemap
for (const slug of rich) {
  if (!noSitemap.includes(slug)) {
    errors.push(`Bairro RICH ausente do sitemap: /bairros/${slug}`);
  }
}

// 3 — todo serviço curado precisa existir em servicosCore.ts
const core = fs.readFileSync("src/lib/servicosCore.ts", "utf8");
const coreSlugs = new Set(
  [...core.matchAll(/^ {2}"?([a-z0-9-]+)"?:\s*\{/gm)].map((m) => m[1]),
);
for (const { path } of SERVICOS) {
  const slug = path.replace("/servicos/", "");
  if (!coreSlugs.has(slug)) {
    errors.push(`Serviço no sitemap sem página em servicosCore.ts: ${path}`);
  }
}

if (errors.length) {
  console.error("❌ check:sitemap-rich falhou:\n" + errors.map((e) => ` - ${e}`).join("\n"));
  process.exit(1);
}
console.log(
  `✅ check:sitemap-rich — ${noSitemap.length} bairros RICH e ${SERVICOS.length} serviços curados, zero SHALLOW anunciado.`,
);
