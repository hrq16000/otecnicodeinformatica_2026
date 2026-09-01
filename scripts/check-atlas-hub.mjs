#!/usr/bin/env node
/**
 * GATE — ATLAS DE INFORMÁTICA (Fase 1)
 * ------------------------------------
 * Valida o HTML servido (dist) de /guia-tecnico-informatica sem depender
 * de JavaScript no cliente:
 *
 *   1. H1 do Atlas presente no SSR.
 *   2. Os 9 temas declarados em src/lib/atlasInformatica.ts aparecem no HTML.
 *   3. TODO link declarado no módulo (trilhas, sintomas, serviços, artigos e
 *      guias de decisão) existe como href no HTML e corresponde a uma rota
 *      real do universo TanStack — nenhum link órfão ou inventado.
 *   4. JSON-LD CollectionPage com ItemList espelhando exatamente os temas
 *      renderizados (coerência schema ↔ HTML).
 *   5. FAQPage continua presente (a paridade item a item tem gate próprio).
 *
 * Fail-closed: sem dist ou sem HTML da rota, o gate falha.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { readRouteUniverse } from "./lib/tanstack-routes.mjs";

const ROOT = process.cwd();
const DIST = path.resolve(process.argv[2] || "dist");
const ROTA = "/guia-tecnico-informatica";

const erros = [];
const avisos = [];

// ── 1. Fonte de verdade: módulo do Atlas ─────────────────────
const moduloPath = path.join(ROOT, "src/lib/atlasInformatica.ts");
if (!existsSync(moduloPath)) {
  console.error("BLOQUEADO: src/lib/atlasInformatica.ts não encontrado.");
  process.exit(1);
}
const modulo = readFileSync(moduloPath, "utf8");

const temas = [...modulo.matchAll(/id:\s*"([a-z0-9-]+)",\s*\n\s*titulo:\s*"([^"]+)"/g)].map(
  (m) => ({ id: m[1], titulo: m[2] }),
);
if (temas.length !== 9) {
  erros.push(`Esperados 9 temas no módulo do Atlas; encontrados ${temas.length}.`);
}

const links = new Set([...modulo.matchAll(/to:\s*"(\/[^"]*)"/g)].map((m) => m[1]));
for (const bloco of modulo.matchAll(/artigos:\s*\[([\s\S]*?)\]/g)) {
  for (const slug of bloco[1].matchAll(/"([a-z0-9-]+)"/g)) links.add(`/blog/${slug[1]}`);
}
if (links.size < 40) {
  erros.push(`Malha do Atlas suspeita de vazia: apenas ${links.size} links declarados.`);
}

// ── 2. HTML do build ─────────────────────────────────────────
if (!existsSync(DIST)) {
  console.error(`BLOQUEADO: dist ausente em ${DIST}. Rode o build antes de check:atlas-hub.`);
  process.exit(1);
}
const htmlPath = [
  path.join(DIST, ROTA.slice(1), "index.html"),
  path.join(DIST, `${ROTA.slice(1)}.html`),
].find(existsSync);
if (!htmlPath) {
  console.error(`BLOQUEADO: HTML de ${ROTA} não encontrado no build.`);
  process.exit(1);
}
const html = readFileSync(htmlPath, "utf8");

// ── 3. H1 e temas no SSR ─────────────────────────────────────
if (!/<h1[^>]*>[^<]*Atlas de Informática/i.test(html)) {
  erros.push("H1 do Atlas ausente do HTML servido (SSR sem JavaScript).");
}
for (const tema of temas) {
  if (!html.includes(tema.titulo)) {
    erros.push(`Tema "${tema.titulo}" não aparece no HTML servido.`);
  }
  if (!html.includes(`id="tema-${tema.id}"`)) {
    erros.push(`Âncora #tema-${tema.id} ausente do HTML servido.`);
  }
}

// ── 4. Links reais, sem órfão ────────────────────────────────
const universo = readRouteUniverse(ROOT);
if (!universo.ok) {
  erros.push("Não foi possível ler o universo de rotas TanStack.");
} else {
  for (const link of links) {
    if (!html.includes(`href="${link}"`)) {
      erros.push(`Link declarado no Atlas não renderizado no HTML: ${link}`);
    }
    if (!universo.isKnownRoute(link)) {
      erros.push(`Link do Atlas aponta para rota inexistente: ${link}`);
    }
  }
}

// ── 5. JSON-LD coerente com o HTML ───────────────────────────
const schemas = [...html.matchAll(
  /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
)]
  .map((m) => {
    try {
      return JSON.parse(m[1]);
    } catch {
      erros.push("JSON-LD malformado no HTML do Atlas.");
      return null;
    }
  })
  .filter(Boolean);

const tipos = new Set(
  schemas.flatMap((s) => (Array.isArray(s["@type"]) ? s["@type"] : [s["@type"]])),
);

const collection = schemas.find((s) => {
  const t = Array.isArray(s["@type"]) ? s["@type"] : [s["@type"]];
  return t.includes("CollectionPage");
});
if (!collection) {
  erros.push("CollectionPage ausente do JSON-LD servido.");
} else {
  const itens = collection.mainEntity?.itemListElement ?? [];
  if (itens.length !== temas.length) {
    erros.push(`ItemList com ${itens.length} itens; esperados ${temas.length} temas.`);
  }
  const nomesSchema = new Set(itens.map((i) => i.name));
  for (const tema of temas) {
    if (!nomesSchema.has(tema.titulo)) {
      erros.push(`Tema "${tema.titulo}" fora do ItemList do JSON-LD.`);
    }
  }
  for (const item of itens) {
    if (!item.url || !item.url.includes("#tema-")) {
      erros.push(`Item do ItemList sem âncora de tema: ${item.name}.`);
    }
  }
}
if (!tipos.has("FAQPage")) {
  erros.push("FAQPage ausente do JSON-LD servido (o FAQ visível continua na página).");
}
if (tipos.has("AggregateRating")) {
  erros.push("AggregateRating não pode aparecer no hub do Atlas.");
}

// ── Veredito ─────────────────────────────────────────────────
console.log("── check:atlas-hub ──");
console.log(`  temas: ${temas.length} · links declarados: ${links.size}`);
for (const a of avisos) console.log(`  aviso: ${a}`);

if (erros.length) {
  console.error(`\nBLOQUEADO — ${erros.length} problema(s) no hub do Atlas:`);
  for (const e of erros) console.error(`  • ${e}`);
  process.exit(1);
}
console.log("  OK: SSR íntegro, malha sem órfãos e JSON-LD coerente com o HTML.");
