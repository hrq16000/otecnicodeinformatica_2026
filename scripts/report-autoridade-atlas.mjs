#!/usr/bin/env node
/**
 * AUTORIDADE DO ATLAS — densidade semântica e mapa de conexões do hub
 * /guia-tecnico-informatica e de TODOS os destinos que ele declara.
 *
 * Diferença para `report:autoridade-seo` (que olha só o corpus /blog):
 * aqui o objeto de estudo é o GRAFO do Atlas — sintoma → trilha → serviço.
 * O relatório mede, por nó real renderizado (SSR harness):
 *   • densidade semântica (vocabulário distinto / termos úteis do <main>);
 *   • grau de saída e de entrada DENTRO do grafo do Atlas;
 *   • cobertura por tema (quantos destinos do tema realmente respondem);
 *   • nós sem link de entrada além do próprio hub (risco de órfão semântico).
 *
 * Fail-closed: rota que não renderiza entra como falha e fica fora das médias.
 *
 * Saídas: public/autoridade-atlas.json + docs/relatorio-autoridade-atlas.md
 * Uso:    npm run report:autoridade-atlas
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { prepararSsr, htmlDaRota, abortarSeBloqueado } from "./lib/ssr-harness.mjs";

const ROOT = process.cwd();
const HUB = "/guia-tecnico-informatica";
const dist = process.argv.find((a) => !a.startsWith("--") && a.endsWith("dist")) || "dist";

/* ── Fonte de verdade: o módulo do Atlas ────────────────────────────────── */
const modulo = readFileSync(resolve(ROOT, "src/lib/atlasInformatica.ts"), "utf8");

const temas = [];
for (const m of modulo.matchAll(
  /id:\s*"([a-z0-9-]+)",\s*\n\s*titulo:\s*"([^"]+)"([\s\S]*?)(?=\n  \{\n    id: "|\n\];)/g,
)) {
  const corpo = m[3];
  const links = new Set([...corpo.matchAll(/to:\s*"(\/[^"]*)"/g)].map((x) => x[1]));
  for (const bloco of corpo.matchAll(/artigos:\s*\[([\s\S]*?)\]/g))
    for (const slug of bloco[1].matchAll(/"([a-z0-9-]+)"/g)) links.add(`/blog/${slug[1]}`);
  temas.push({ id: m[1], titulo: m[2], links: [...links] });
}

const guias = [...modulo.matchAll(/pergunta:\s*"([^"]+)"[\s\S]*?to:\s*"(\/[^"]*)"/g)].map((m) => ({
  pergunta: m[1],
  to: m[2],
}));

const nos = [...new Set([HUB, ...temas.flatMap((t) => t.links), ...guias.map((g) => g.to)])];

/* ── Texto e métricas ───────────────────────────────────────────────────── */
const STOP = new Set(
  `a o as os um uma uns umas de do da dos das em no na nos nas por para com sem sob sobre entre ate apos e ou mas que se como quando onde qual quais quanto ao aos isso isto esse essa este esta aquele aquela seu sua seus suas ele ela eles elas voce nos eu meu minha ja nao sim tambem mais menos muito pouco todo toda todos todas outro outra ser estar tem ter foi era sao vai pode deve depois antes entao assim cada qualquer nenhum alguma algum aqui la ali tudo nada vez vezes bem mal so apenas ainda porque pois dele dela`
    .split(/\s+/)
    .filter(Boolean),
);
const semAcento = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const corpoPrincipal = (html) =>
  (html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
const textoDe = (t) =>
  semAcento(t.replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " "))
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const tokens = (t) => t.split(" ").filter((x) => x.length > 2 && !STOP.has(x) && !/^\d+$/.test(x));

await prepararSsr(nos, { dist });
abortarSeBloqueado("report-autoridade-atlas");

const analises = [];
for (const url of nos) {
  const html = htmlDaRota(url, dist);
  if (!html) {
    analises.push({ url, erro: "HTML não renderizado", tipo: url === HUB ? "hub" : "no" });
    continue;
  }
  const main = corpoPrincipal(html);
  const texto = textoDe(main);
  const uteis = tokens(texto);
  const unicos = new Set(uteis);
  const saidaBruta = [
    ...new Set(
      [...main.matchAll(/<a[^>]+href=["'](\/[^"'?]*)["']/gi)]
        .map((m) => m[1].split("#")[0].replace(/\/$/, ""))
        .filter((h) => h && h !== url),
    ),
  ];
  analises.push({
    url,
    tipo: url === HUB ? "hub" : url.startsWith("/blog/") ? "artigo" : url.startsWith("/problemas/") ? "sintoma" : "servico-ou-guia",
    titulo: html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? null,
    palavras: texto.split(" ").filter(Boolean).length,
    termosUteis: uteis.length,
    vocabulario: unicos.size,
    densidadeSemantica: uteis.length ? Number(((unicos.size / uteis.length) * 100).toFixed(2)) : 0,
    linksSaidaAtlas: saidaBruta.filter((h) => nos.includes(h)),
    grauSaidaTotal: saidaBruta.length,
    grauEntradaAtlas: 0,
    origensEntrada: [],
    erro: null,
  });
}

const porUrl = new Map(analises.filter((a) => !a.erro).map((a) => [a.url, a]));
for (const a of porUrl.values())
  for (const destino of a.linksSaidaAtlas) {
    const alvo = porUrl.get(destino);
    if (alvo) {
      alvo.grauEntradaAtlas += 1;
      alvo.origensEntrada.push(a.url);
    }
  }

const validas = analises.filter((a) => !a.erro);
const media = (f) =>
  validas.length ? Number((validas.reduce((s, a) => s + f(a), 0) / validas.length).toFixed(2)) : 0;

const coberturaTemas = temas.map((t) => {
  const ok = t.links.filter((l) => porUrl.has(l));
  return {
    id: t.id,
    titulo: t.titulo,
    destinos: t.links.length,
    renderizados: ok.length,
    densidadeMedia: ok.length
      ? Number((ok.reduce((s, l) => s + porUrl.get(l).densidadeSemantica, 0) / ok.length).toFixed(2))
      : 0,
    faltando: t.links.filter((l) => !porUrl.has(l)),
  };
});

const saida = {
  geradoEm: new Date().toISOString(),
  hub: HUB,
  fonte: { html: "SSR harness", dist },
  total: analises.length,
  analisados: validas.length,
  falhas: analises.length - validas.length,
  temas: coberturaTemas,
  guias,
  medias: {
    palavras: media((a) => a.palavras),
    densidadeSemantica: media((a) => a.densidadeSemantica),
    grauSaidaAtlas: media((a) => a.linksSaidaAtlas.length),
    grauEntradaAtlas: media((a) => a.grauEntradaAtlas),
  },
  // Nó que só recebe link do hub depende inteiramente dele: fragilidade do grafo.
  dependentesDoHub: validas
    .filter((a) => a.url !== HUB && a.origensEntrada.length === 1 && a.origensEntrada[0] === HUB)
    .map((a) => a.url),
  semEntrada: validas.filter((a) => a.url !== HUB && a.grauEntradaAtlas === 0).map((a) => a.url),
  nos: analises,
};

writeFileSync(resolve(ROOT, "public/autoridade-atlas.json"), `${JSON.stringify(saida, null, 2)}\n`);

mkdirSync(resolve(ROOT, "docs"), { recursive: true });
writeFileSync(
  resolve(ROOT, "docs/relatorio-autoridade-atlas.md"),
  `${[
    "# Autoridade do Atlas — densidade semântica e mapa de conexões",
    "",
    `Gerado em: ${saida.geradoEm}`,
    `Nós analisados: ${saida.analisados}/${saida.total} · sem link de entrada: ${saida.semEntrada.length}`,
    "",
    "| Tema | Destinos | Renderizados | Densidade média |",
    "| --- | --- | --- | --- |",
    ...coberturaTemas.map((t) => `| ${t.titulo} | ${t.destinos} | ${t.renderizados} | ${t.densidadeMedia}% |`),
  ].join("\n")}\n`,
);

console.log(
  `autoridade-atlas: ${saida.analisados}/${saida.total} nós · densidade média ${saida.medias.densidadeSemantica}% · sem entrada ${saida.semEntrada.length}`,
);
