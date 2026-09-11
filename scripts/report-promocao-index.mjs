#!/usr/bin/env node
/**
 * RELATÓRIO — FILA DE PROMOÇÃO noindex → index (editorial).
 *
 * Varre os artigos do blog que hoje NÃO estão aprovados (portanto noindex,
 * fora do sitemap) e mede automaticamente os critérios objetivos da política
 * de promoção:
 *
 *   1. Intenção única      — título/excerpt não colidem com artigo aprovado.
 *   2. Profundidade        — >= 700 palavras próprias no corpo.
 *   3. Similaridade        — Jaccard do corpo vs. aprovados <= 0.35.
 *   4. Estrutura           — >= 4 seções (h2/h3) e bloco de decisão/limite.
 *   5. Fonte primária      — registro em blogEditorialSources.ts.
 *   6. Capa licenciada     — registro em blogEditorialCovers.ts.
 *   7. Interlinks/Atlas    — ponte no Atlas ou links de entrada declarados.
 *
 * Classificação: PRONTA (0 bloqueios) · QUASE (1) · LONGE (2+).
 * Este relatório NÃO altera indexabilidade — é insumo de decisão.
 *
 * Uso: node scripts/report-promocao-index.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { EDITORIAL_WAVE } from "./lib/editorial-wave.mjs";

const ROOT = process.cwd();
const read = (p) => (existsSync(join(ROOT, p)) ? readFileSync(join(ROOT, p), "utf8") : "");

const APROVADOS = new Set(EDITORIAL_WAVE.map((a) => a.slug));

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

// ── 1. Extrair artigos do arquivo de conteúdo ────────────────
function extrairArtigos(fonte) {
  const src = read(fonte);
  const blocos = [];
  const re = /^ {2}"([a-z0-9-]+)":\s*\{$/gm;
  const marcas = [...src.matchAll(re)];
  for (let i = 0; i < marcas.length; i += 1) {
    const inicio = marcas[i].index;
    const fim = i + 1 < marcas.length ? marcas[i + 1].index : src.length;
    blocos.push({ slug: marcas[i][1], raw: src.slice(inicio, fim) });
  }
  return blocos;
}

const artigos = [...extrairArtigos("src/data/blogPostsContent.tsx"), ...extrairArtigos("src/data/blogProgrammaticPosts.tsx")];

const textoVisivel = (raw) =>
  raw
    .replace(/<[^>]*>/g, " ") // tags JSX
    .replace(/\{[^{}]{0,120}\}/g, " ") // expressões curtas (JSX)
    .replace(/[{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const campo = (raw, nome) => raw.match(new RegExp(`${nome}:\\s*"([^"]*)"`))?.[1] ?? "";

// ── 2. Baseline dos aprovados (para similaridade/intenção) ───
const perfil = new Map();
for (const a of artigos) {
  perfil.set(a.slug, {
    slug: a.slug,
    title: campo(a.raw, "title"),
    excerpt: campo(a.raw, "excerpt"),
    category: campo(a.raw, "category"),
    corpo: new Set(tokenize(textoVisivel(a.raw))),
    palavras: tokenize(textoVisivel(a.raw)).length,
    secoes: (a.raw.match(/<h[23]>/g) ?? []).length,
    raw: a.raw,
  });
}

const aprovadosPerfil = [...perfil.values()].filter((p) => APROVADOS.has(p.slug));

// ── 3. Registros auxiliares ──────────────────────────────────
const srcFontes = read("src/lib/blogEditorialSources.ts");
const srcCapas = read("src/lib/blogEditorialCovers.ts");
const srcAtlas = read("src/lib/atlasPontesArtigos.ts");
const srcInbound = read("src/lib/editorialInboundLinks.ts");
const srcClusters = read("src/lib/editorialClusters.ts");

const temRegistro = (src, slug) => new RegExp(`["'/]${slug}["'/]|"${slug}"`).test(src);

// ── 4. Avaliação ─────────────────────────────────────────────
const MIN_PALAVRAS = 700;
const MAX_JACCARD = 0.35;
const MAX_INTENCAO = 0.5;

const linhas = [];
for (const p of perfil.values()) {
  if (APROVADOS.has(p.slug)) continue;

  const bloqueios = [];

  // 1. intenção única
  const tituloTokens = new Set(tokenize(`${p.title} ${p.excerpt}`));
  let colisao = null;
  let maxIntencao = 0;
  for (const ap of aprovadosPerfil) {
    const s = jaccard(tituloTokens, new Set(tokenize(`${ap.title} ${ap.excerpt}`)));
    if (s > maxIntencao) {
      maxIntencao = s;
      colisao = ap.slug;
    }
  }
  if (maxIntencao > MAX_INTENCAO) bloqueios.push(`intenção colide com /blog/${colisao} (${maxIntencao.toFixed(2)})`);

  // 2. profundidade
  if (p.palavras < MIN_PALAVRAS) bloqueios.push(`${p.palavras} palavras próprias (mínimo ${MIN_PALAVRAS})`);

  // 3. similaridade de corpo
  let maxSim = 0;
  let similarA = null;
  for (const ap of aprovadosPerfil) {
    const s = jaccard(p.corpo, ap.corpo);
    if (s > maxSim) {
      maxSim = s;
      similarA = ap.slug;
    }
  }
  if (maxSim > MAX_JACCARD) bloqueios.push(`similaridade ${maxSim.toFixed(2)} com /blog/${similarA}`);

  // 4. estrutura
  const temDecisao = /quando (chamar|procurar|vale)|limite|não compensa|procure um t[eé]cnico/i.test(p.raw);
  if (p.secoes < 4) bloqueios.push(`apenas ${p.secoes} seções (mínimo 4)`);
  if (!temDecisao) bloqueios.push("sem bloco de limite/decisão");

  // 5–7. registros obrigatórios
  const fonteOk = temRegistro(srcFontes, p.slug);
  const capaOk = temRegistro(srcCapas, p.slug);
  const atlasOk = temRegistro(srcAtlas, p.slug) || temRegistro(srcInbound, p.slug) || temRegistro(srcClusters, p.slug);
  if (!fonteOk) bloqueios.push("sem fonte primária registrada");
  if (!capaOk) bloqueios.push("sem capa licenciada registrada");
  if (!atlasOk) bloqueios.push("sem ponte no Atlas / links de entrada");

  const classe = bloqueios.length === 0 ? "PRONTA" : bloqueios.length === 1 ? "QUASE" : "LONGE";

  linhas.push({
    slug: p.slug,
    url: `/blog/${p.slug}`,
    titulo: p.title,
    categoria: p.category,
    palavras: p.palavras,
    secoes: p.secoes,
    similaridadeMax: Number(maxSim.toFixed(3)),
    similarA,
    intencaoMax: Number(maxIntencao.toFixed(3)),
    fonteOk,
    capaOk,
    atlasOk,
    bloqueios,
    classe,
  });
}

const ordem = { PRONTA: 0, QUASE: 1, LONGE: 2 };
linhas.sort((a, b) => ordem[a.classe] - ordem[b.classe] || b.palavras - a.palavras);

const resumo = {
  geradoEm: new Date().toISOString(),
  criterios: { minPalavras: MIN_PALAVRAS, maxJaccardCorpo: MAX_JACCARD, maxJaccardIntencao: MAX_INTENCAO },
  totalArtigos: perfil.size,
  aprovados: aprovadosPerfil.length,
  foraDoIndice: linhas.length,
  prontas: linhas.filter((l) => l.classe === "PRONTA").length,
  quase: linhas.filter((l) => l.classe === "QUASE").length,
  longe: linhas.filter((l) => l.classe === "LONGE").length,
  proximaOnda: linhas.filter((l) => l.classe === "PRONTA").slice(0, 8).map((l) => l.url),
  itens: linhas,
};

mkdirSync(join(ROOT, "reports"), { recursive: true });
writeFileSync(join(ROOT, "reports/promocao-index.json"), `${JSON.stringify(resumo, null, 2)}\n`);
writeFileSync(join(ROOT, "public/promocao-index.json"), `${JSON.stringify(resumo, null, 2)}\n`);

const md = [
  "# Fila de promoção noindex → index",
  "",
  `Gerado em ${resumo.geradoEm}`,
  "",
  `Total ${resumo.totalArtigos} · aprovados ${resumo.aprovados} · fora do índice ${resumo.foraDoIndice}`,
  `PRONTA ${resumo.prontas} · QUASE ${resumo.quase} · LONGE ${resumo.longe}`,
  "",
  "| URL | Classe | Palavras | Seções | Sim. máx | Bloqueios |",
  "|---|---|---|---|---|---|",
  ...linhas.map(
    (l) => `| ${l.url} | ${l.classe} | ${l.palavras} | ${l.secoes} | ${l.similaridadeMax} | ${l.bloqueios.join("; ") || "—"} |`,
  ),
  "",
].join("\n");
writeFileSync(join(ROOT, "reports/promocao-index.md"), md);

console.log(
  `[report:promocao-index] ${resumo.foraDoIndice} fora do índice · PRONTA ${resumo.prontas} · QUASE ${resumo.quase} · LONGE ${resumo.longe} → reports/promocao-index.{json,md}`,
);
