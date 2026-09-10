#!/usr/bin/env node
/**
 * SUGESTÃO DE INTERLINKS POR CLUSTER — widget de /admin/seo.
 *
 * Não inventa relação semântica: agrupa artigos pelo tema já declarado no
 * índice editorial (`src/lib/editorialHubSummaries.ts`, campo `category`),
 * restringe ao que está no sitemap curado e lê os links REAIS do HTML do
 * build para saber o que já está ligado.
 *
 * Saída: public/interlink-suggestions.json — pares do mesmo cluster ainda
 * sem ligação, priorizando o artigo com menos links de saída internos
 * (o que mais precisa de malha) e o artigo com menos links de entrada
 * (o que mais precisa de autoridade).
 *
 * Uso: node scripts/report-interlink-suggestions.mjs [dist]
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { CURATED_PATHS } from "./lib/curated-urls.mjs";

const ROOT = process.cwd();
const distPadrao = existsSync(resolve(ROOT, "dist/client")) ? "dist/client" : "dist";
const DIST = resolve(ROOT, process.argv.slice(2).find((a) => !a.startsWith("--")) ?? distPadrao);
const OUT = resolve(ROOT, "public/interlink-suggestions.json");
const HUB = resolve(ROOT, "src/lib/editorialHubSummaries.ts");

/** Extrai o array literal `rows` do índice editorial (JSON puro no arquivo). */
function lerResumos() {
  const src = readFileSync(HUB, "utf8");
  const inicio = src.indexOf("= [", src.indexOf("const rows"));
  if (inicio < 0) throw new Error("bloco `rows` não encontrado em editorialHubSummaries.ts");
  let i = src.indexOf("[", inicio);
  let nivel = 0;
  let fim = -1;
  for (let k = i; k < src.length; k += 1) {
    if (src[k] === "[") nivel += 1;
    else if (src[k] === "]") {
      nivel -= 1;
      if (nivel === 0) {
        fim = k + 1;
        break;
      }
    }
  }
  if (fim < 0) throw new Error("array `rows` malformado");
  const bruto = src.slice(i, fim).replace(/,\s*([\]}])/g, "$1");
  return JSON.parse(bruto);
}

const curadas = new Set(CURATED_PATHS.map((p) => (p.length > 1 ? p.replace(/\/$/, "") : p)));
const resumos = lerResumos().filter((r) => curadas.has(`/blog/${r.slug}`));

/** Links internos reais de cada artigo, lidos do HTML do build. */
function linksDe(slug) {
  const file = resolve(DIST, `./blog/${slug}/index.html`);
  if (!existsSync(file)) return null;
  const html = readFileSync(file, "utf8");
  return new Set(
    [...html.matchAll(/href="(\/blog\/[a-z0-9-]+)"/gi)]
      .map((m) => m[1])
      .filter((p) => p !== `/blog/${slug}`),
  );
}

const nos = resumos.map((r) => ({
  slug: r.slug,
  url: `/blog/${r.slug}`,
  titulo: r.title,
  cluster: r.category,
  saidas: linksDe(r.slug),
}));

const semHtml = nos.filter((n) => n.saidas === null).map((n) => n.url);
const comHtml = nos.filter((n) => n.saidas !== null);

const entradas = new Map(comHtml.map((n) => [n.url, 0]));
for (const n of comHtml) {
  for (const alvo of n.saidas) {
    if (entradas.has(alvo)) entradas.set(alvo, entradas.get(alvo) + 1);
  }
}

const clusters = new Map();
for (const n of comHtml) {
  if (!clusters.has(n.cluster)) clusters.set(n.cluster, []);
  clusters.get(n.cluster).push(n);
}

const sugestoes = [];
for (const [cluster, itens] of clusters) {
  for (let a = 0; a < itens.length; a += 1) {
    for (let b = a + 1; b < itens.length; b += 1) {
      const de = itens[a];
      const para = itens[b];
      if (de.saidas.has(para.url) || para.saidas.has(de.url)) continue;
      // Origem = quem tem mais links de saída (malha mais madura);
      // destino = quem tem menos links de entrada (mais carente de autoridade).
      const [origem, destino] =
        (entradas.get(de.url) ?? 0) <= (entradas.get(para.url) ?? 0) ? [para, de] : [de, para];
      sugestoes.push({
        cluster,
        de: origem.url,
        deTitulo: origem.titulo,
        para: destino.url,
        paraTitulo: destino.titulo,
        entradasDestino: entradas.get(destino.url) ?? 0,
        saidasOrigem: origem.saidas.size,
        prioridade: (entradas.get(destino.url) ?? 0) * 10 + destino.slug.length / 100,
      });
    }
  }
}

sugestoes.sort((x, y) => x.prioridade - y.prioridade);

const relatorio = {
  geradoEm: new Date().toISOString(),
  dist: DIST.replace(ROOT, "."),
  artigosAnalisados: comHtml.length,
  artigosSemHtml: semHtml,
  clusters: [...clusters.keys()].sort(),
  totalSugestoes: sugestoes.length,
  sugestoes: sugestoes.slice(0, 120),
};

writeFileSync(OUT, `${JSON.stringify(relatorio, null, 2)}\n`);
console.log(
  `[interlinks:sugestoes] ${comHtml.length} artigo(s) · ${clusters.size} cluster(s) · ${sugestoes.length} par(es) sugerido(s)` +
    (semHtml.length ? ` · ${semHtml.length} sem HTML no build` : "") +
    " → public/interlink-suggestions.json",
);
