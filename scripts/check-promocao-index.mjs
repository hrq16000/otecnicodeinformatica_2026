#!/usr/bin/env node
/**
 * GATE — PROMOÇÃO noindex → index (fail-closed).
 *
 * Toda URL editorial marcada como INDEXÁVEL (EDITORIAL_WAVE) precisa sustentar
 * os critérios objetivos da política de promoção:
 *   • >= 700 palavras próprias no corpo;
 *   • similaridade de corpo <= 0.60 contra qualquer outro artigo indexável;
 *   • fonte primária registrada (blogEditorialSources.ts);
 *   • capa registrada (blogEditorialCovers.ts);
 *   • ponte no Atlas / links de entrada declarados.
 *
 * Falhar aqui significa: o artigo não pode estar indexável. Volta a noindex
 * ou é reescrito. Não há exceção silenciosa.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { EDITORIAL_WAVE } from "./lib/editorial-wave.mjs";

const ROOT = process.cwd();
const read = (p) => (existsSync(join(ROOT, p)) ? readFileSync(join(ROOT, p), "utf8") : "");

const MIN_PALAVRAS = 700;
const MAX_SIM = 0.6;

const STOPWORDS = new Set(
  ("a o e de da do das dos em no na nos nas um uma uns umas para por com sem que se ao aos à às " +
    "os as ou como mais menos muito pouco já não sim seu sua seus suas ele ela eles elas isso isto " +
    "esse essa este esta aquele aquela quando onde qual quais quem porque pois entre sobre até " +
    "também depois antes cada todo toda todos todas ser está estão foi são pode podem deve devem " +
    "fazer faz feito ter tem têm há vai vão nesse nessa neste nesta pelo pela pelos pelas").split(/\s+/),
);

const tokenize = (txt) =>
  txt
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOPWORDS.has(w));

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const w of a) if (b.has(w)) inter += 1;
  return inter / (a.size + b.size - inter);
}

function extrairArtigos(fonte) {
  const src = read(fonte);
  const marcas = [...src.matchAll(/^ {2}"([a-z0-9-]+)":\s*\{$/gm)];
  return marcas.map((m, i) => ({
    slug: m[1],
    raw: src.slice(m.index, i + 1 < marcas.length ? marcas[i + 1].index : src.length),
  }));
}

const artigos = new Map(
  [...extrairArtigos("src/data/blogPostsContent.tsx"), ...extrairArtigos("src/data/blogProgrammaticPosts.tsx")].map(
    (a) => [a.slug, a.raw],
  ),
);

const textoVisivel = (raw) =>
  raw.replace(/<[^>]*>/g, " ").replace(/\{[^{}]*\}/g, " ").replace(/\s+/g, " ").trim();

const srcFontes = read("src/lib/blogEditorialSources.ts");
const srcCapas = read("src/lib/blogEditorialCovers.ts");
const srcAtlas = read("src/lib/atlasPontesArtigos.ts");
const srcInbound = read("src/lib/editorialInboundLinks.ts");
const srcClusters = read("src/lib/editorialClusters.ts");
const temRegistro = (src, slug) => src.includes(`"${slug}"`) || src.includes(`/${slug}"`) || src.includes(`/${slug}'`);

const perfis = [];
const erros = [];

for (const item of EDITORIAL_WAVE) {
  const raw = artigos.get(item.slug);
  if (!raw) {
    erros.push(`${item.slug}: indexável, mas sem conteúdo localizado nas fontes de artigos.`);
    continue;
  }
  const tokens = tokenize(textoVisivel(raw));
  perfis.push({ slug: item.slug, tokens: new Set(tokens), palavras: tokens.length });

  if (tokens.length < MIN_PALAVRAS) {
    erros.push(`${item.slug}: ${tokens.length} palavras próprias (mínimo ${MIN_PALAVRAS}).`);
  }
  if (!temRegistro(srcFontes, item.slug)) erros.push(`${item.slug}: sem fonte primária registrada.`);
  if (!temRegistro(srcCapas, item.slug)) erros.push(`${item.slug}: sem capa registrada.`);
  if (
    !temRegistro(srcAtlas, item.slug) &&
    !temRegistro(srcInbound, item.slug) &&
    !temRegistro(srcClusters, item.slug)
  ) {
    erros.push(`${item.slug}: sem ponte no Atlas nem links de entrada declarados.`);
  }
}

for (let i = 0; i < perfis.length; i += 1) {
  for (let j = i + 1; j < perfis.length; j += 1) {
    const s = jaccard(perfis[i].tokens, perfis[j].tokens);
    if (s > MAX_SIM) {
      erros.push(`${perfis[i].slug} × ${perfis[j].slug}: similaridade ${s.toFixed(2)} acima do teto ${MAX_SIM}.`);
    }
  }
}

if (erros.length) {
  console.error(`\n[check:promocao-index] ${erros.length} artigo(s) indexável(is) fora da política de promoção:`);
  for (const e of erros) console.error(`  ✗ ${e}`);
  process.exit(1);
}

console.log(`[check:promocao-index] OK — ${EDITORIAL_WAVE.length} artigo(s) indexável(is) sustentam a política de promoção.`);
