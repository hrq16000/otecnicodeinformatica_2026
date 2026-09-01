#!/usr/bin/env node
/**
 * RELATÓRIO DE AUTORIDADE SEO — densidade semântica, densidade de keywords e
 * malha de links internos das URLs editoriais APROVADAS (publicadas).
 *
 * Fonte única: o HTML realmente renderizado (SSR harness) das rotas aprovadas
 * em `scripts/lib/editorial-wave.mjs`. Nada é estimado: quando o HTML de uma
 * rota não existe, a URL entra com `erro` e fica fora dos agregados.
 *
 * Saídas:
 *   • public/autoridade-seo.json   (consumido por /admin/autoridade-seo)
 *   • docs/relatorio-autoridade-seo.md
 *
 * Uso: npm run report:autoridade-seo
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { prepararSsr, htmlDaRota, abortarSeBloqueado, ssrBloqueado, resumo } from "./lib/ssr-harness.mjs";
import { EDITORIAL_WAVE } from "./lib/editorial-wave.mjs";

/** Lote/onda de cada slug vem do consolidado já existente (nunca inferido). */
const lotes = existsSync(resolve("public/editorial-lotes.json"))
  ? JSON.parse(readFileSync(resolve("public/editorial-lotes.json"), "utf8"))
  : null;
const loteDoSlug = new Map((lotes?.urls ?? []).map((u) => [u.slug, u.lote]));

const dist = process.argv.find((a) => !a.startsWith("--") && a.endsWith("dist")) || "dist";

/** Stopwords PT-BR: removidas antes de qualquer contagem de keyword. */
const STOP = new Set(
  `a o as os um uma uns umas de do da dos das em no na nos nas por para com sem sob sobre entre ate apos e ou mas que se como quando onde qual quais quanto ao aos à às pelo pela pelos pelas isso isto esse essa este esta aquele aquela seu sua seus suas ele ela eles elas voce vocês nós eu meu minha ja nao sim tambem mais menos muito pouco todo toda todos todas outro outra ser estar tem ter foi era sao é são vai pode deve depois antes entao assim cada qualquer nenhum alguma algum aqui la ali tudo nada vez vezes bem mal so apenas ainda porque pois dai dele dela`
    .split(/\s+/)
    .filter(Boolean),
);

const semAcento = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function corpoPrincipal(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
  return main
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
}

const textoDe = (trecho) =>
  semAcento(trecho.replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " "))
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokens = (texto) => texto.split(" ").filter((t) => t.length > 2 && !STOP.has(t) && !/^\d+$/.test(t));

function ranking(lista, total, limite = 12) {
  const c = new Map();
  for (const t of lista) c.set(t, (c.get(t) ?? 0) + 1);
  return [...c.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limite)
    .map(([termo, ocorrencias]) => ({
      termo,
      ocorrencias,
      densidade: total ? Number(((ocorrencias / total) * 100).toFixed(2)) : 0,
    }));
}

function tiposDeSchema(html) {
  return [
    ...new Set(
      [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
        .flatMap((m) => {
          try {
            const p = JSON.parse(m[1]);
            return Array.isArray(p) ? p : [p];
          } catch {
            return [];
          }
        })
        .flatMap((n) => (Array.isArray(n?.["@graph"]) ? n["@graph"] : [n]))
        .flatMap((n) => (Array.isArray(n?.["@type"]) ? n["@type"] : [n?.["@type"]]))
        .filter(Boolean),
    ),
  ];
}

const aprovados = EDITORIAL_WAVE;
const rotas = aprovados.map((a) => `/blog/${a.slug}`);

await prepararSsr(rotas, { dist });
// Este script é RELATÓRIO, não gate. No build de produção não existe servidor
// SSR de pé: sem HTML renderizado ele apenas avisa e mantém o último relatório.
// Com --require (uso local/CI dedicado) volta a bloquear.
const exigirSsr = process.argv.includes("--require");
if (ssrBloqueado() && !exigirSsr) {
  console.warn(
    `[autoridade-seo] SKIP — SSR indisponível (${resumo()?.reason ?? "UNKNOWN"}). Relatório anterior preservado.`,
  );
  process.exit(0);
}
abortarSeBloqueado("report-autoridade-seo");

const analises = [];
for (const artigo of aprovados) {
  const url = `/blog/${artigo.slug}`;
  const html = htmlDaRota(url, dist);
  if (!html) {
    analises.push({ url, slug: artigo.slug, lote: loteDoSlug.get(artigo.slug) ?? null, aprovadoEm: artigo.approvedAt ?? null, erro: "HTML não renderizado" });
    continue;
  }

  const main = corpoPrincipal(html);
  const texto = textoDe(main);
  const palavras = texto.split(" ").filter(Boolean);
  const uteis = tokens(texto);
  const unicos = new Set(uteis);

  const bigramas = [];
  for (let i = 0; i + 1 < uteis.length; i++) bigramas.push(`${uteis[i]} ${uteis[i + 1]}`);

  // Keyword principal = slug (termo-alvo declarado pela própria URL).
  const alvo = tokens(semAcento(artigo.slug).replace(/-/g, " "));
  const ocorrenciasAlvo = alvo.length
    ? Math.min(...alvo.map((t) => uteis.filter((u) => u === t).length))
    : 0;

  // Links internos de saída (mesma origem, sem âncoras nem assets).
  const saida = [
    ...new Set(
      [...main.matchAll(/<a[^>]+href=["'](\/[^"'#?]*)["']/gi)]
        .map((m) => m[1].replace(/\/$/, ""))
        .filter((h) => h && h !== url && !/\.(png|jpe?g|webp|avif|svg|xml|json|txt|pdf)$/i.test(h)),
    ),
  ];

  const h2 = (main.match(/<h2[\s>]/gi) ?? []).length;
  const h3 = (main.match(/<h3[\s>]/gi) ?? []).length;

  analises.push({
    url,
    slug: artigo.slug,
    lote: loteDoSlug.get(artigo.slug) ?? null,
    aprovadoEm: artigo.approvedAt ?? null,
    titulo: html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? null,
    palavras: palavras.length,
    termosUteis: uteis.length,
    // Densidade semântica = riqueza de vocabulário (termos distintos / termos úteis).
    densidadeSemantica: uteis.length ? Number(((unicos.size / uteis.length) * 100).toFixed(2)) : 0,
    vocabulario: unicos.size,
    keywordPrincipal: {
      termo: artigo.slug.replace(/-/g, " "),
      ocorrencias: ocorrenciasAlvo,
      densidade: uteis.length ? Number(((ocorrenciasAlvo / uteis.length) * 100).toFixed(2)) : 0,
    },
    topKeywords: ranking(uteis, uteis.length),
    topBigramas: ranking(bigramas, bigramas.length, 8),
    headings: { h2, h3 },
    schemas: tiposDeSchema(html),
    linksInternosSaida: saida.length,
    linksSaida: saida,
    linksInternosEntrada: 0,
    origensEntrada: [],
    erro: null,
  });
}

// Entradas: quantas das URLs analisadas apontam para cada URL.
const porUrl = new Map(analises.filter((a) => !a.erro).map((a) => [a.url, a]));
for (const a of porUrl.values())
  for (const destino of a.linksSaida) {
    const alvo = porUrl.get(destino);
    if (alvo) {
      alvo.linksInternosEntrada += 1;
      alvo.origensEntrada.push(a.url);
    }
  }

const validas = analises.filter((a) => !a.erro);
const media = (f) => (validas.length ? Number((validas.reduce((s, a) => s + f(a), 0) / validas.length).toFixed(2)) : 0);

const saida = {
  geradoEm: new Date().toISOString(),
  fonte: { html: "SSR harness", dist },
  total: analises.length,
  analisadas: validas.length,
  falhas: analises.length - validas.length,
  medias: {
    palavras: media((a) => a.palavras),
    densidadeSemantica: media((a) => a.densidadeSemantica),
    densidadeKeywordPrincipal: media((a) => a.keywordPrincipal.densidade),
    linksInternosSaida: media((a) => a.linksInternosSaida),
    linksInternosEntrada: media((a) => a.linksInternosEntrada),
  },
  orfas: validas.filter((a) => a.linksInternosEntrada === 0).map((a) => a.url),
  urls: analises,
};

writeFileSync(resolve("public/autoridade-seo.json"), `${JSON.stringify(saida, null, 2)}\n`);

mkdirSync(resolve("docs"), { recursive: true });
writeFileSync(
  resolve("docs/relatorio-autoridade-seo.md"),
  `${[
    "# Autoridade SEO — densidade semântica, keywords e links internos",
    "",
    `Gerado em: ${saida.geradoEm}`,
    `URLs analisadas: ${saida.analisadas}/${saida.total} · órfãs: ${saida.orfas.length}`,
    "",
    "| URL | Palavras | Dens. semântica | Keyword principal | Dens. KW | Links saída | Links entrada |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...validas.map(
      (a) =>
        `| ${a.url} | ${a.palavras} | ${a.densidadeSemantica}% | ${a.keywordPrincipal.termo} | ${a.keywordPrincipal.densidade}% | ${a.linksInternosSaida} | ${a.linksInternosEntrada} |`,
    ),
    "",
  ].join("\n")}\n`,
);

console.log(`[autoridade-seo] ${saida.analisadas}/${saida.total} URLs analisadas · órfãs: ${saida.orfas.length}`);
