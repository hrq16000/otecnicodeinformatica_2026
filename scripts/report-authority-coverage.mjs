#!/usr/bin/env node
/**
 * RODADA 4F — matriz mestra de cobertura e Score de Autoridade.
 *
 * Consolida, por URL owner, tudo que as rodadas 4A→4E produziram e mede a
 * profundidade real de cada página no HTML SSR construído (`dist/`).
 *
 * Score de Autoridade (0–50), somando evidências verificáveis:
 *   · 12 — profundidade textual (palavras no corpo)
 *   · 8  — resposta direta no topo (bloco "Resposta rápida")
 *   · 6  — tabela diagnóstica / comparativa
 *   · 6  — fontes primárias citadas
 *   · 6  — FAQ própria visível
 *   · 6  — JSON-LD de Service/LocalBusiness na rota
 *   · 6  — malha interna (links contextuais de saída)
 *
 * Classificação: STRONG ≥ 40 · ADEQUATE ≥ 30 · PARTIAL ≥ 20 · WEAK < 20
 *
 * Saídas: reports/authority-coverage-final.json e .md
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIST = process.argv[2] ?? "dist";
const OUT = "reports";

// ------------------------------------------------- owners por rodada/cluster
const FONTES = [
  { rodada: "1", cluster: "Serviços", arquivo: "src/lib/enriquecimentoServicos.ts", registro: "ENRIQUECIMENTO_SERVICOS" },
  { rodada: "1", cluster: "Problemas", arquivo: "src/lib/enriquecimentoConteudo.ts", registro: "ENRIQUECIMENTO_1" },
  { rodada: "4A", cluster: "ATP hardware", arquivo: "src/lib/enriquecimentoAtp4a.ts", registro: "ENRIQUECIMENTO_4A" },
  { rodada: "4B", cluster: "ATP software/dados", arquivo: "src/lib/enriquecimentoAtp4b.ts", registro: "ENRIQUECIMENTO_4B" },
  { rodada: "4C", cluster: "Comercial local", arquivo: "src/lib/enriquecimento4cLocal.ts", registro: "ENRIQUECIMENTO_4C" },
  { rodada: "4D", cluster: "B2B", arquivo: "src/lib/enriquecimento4dB2b.ts", registro: "OWNERS_4D" },
  { rodada: "4E", cluster: "Redes e remoto", arquivo: "src/lib/enriquecimento4eRedes.ts", registro: "OWNERS_4E" },
];

/** Extrai as chaves de rota do registro exportado, sem executar TypeScript. */
function ownersDe({ arquivo, registro }) {
  if (!existsSync(arquivo)) return [];
  const src = readFileSync(arquivo, "utf8");
  const inicio = src.indexOf(`export const ${registro}`);
  if (inicio === -1) return [];
  // Da declaração até o próximo `export const` de nível raiz.
  const resto = src.slice(inicio + 10);
  const fim = resto.search(/\n(?:export )?const [A-Z]/);
  const bloco = fim === -1 ? resto : resto.slice(0, fim);
  const chaves = [...bloco.matchAll(/(?:^|[\s,{[])"(\/[a-z0-9\-/]*)"\s*(?::|,|\]|\n)/gm)].map((m) => m[1]);
  return [...new Set(chaves)];
}

// --------------------------------------------------------- leitura do build
function htmlDe(path) {
  const rel = path === "/" ? "index.html" : join(path.replace(/^\//, ""), "index.html");
  for (const base of [DIST, join(DIST, "client")]) {
    const p = join(base, rel);
    if (existsSync(p)) return readFileSync(p, "utf8");
  }
  return null;
}

function textoVisivel(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function avaliar(path) {
  const html = htmlDe(path);
  if (!html) return { path, renderizado: false, score: 0, classificacao: "WEAK", sinais: {} };

  const texto = textoVisivel(html);
  const palavras = texto.split(" ").filter(Boolean).length;
  const jsonLd = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1])
    .join(" ");

  const sinais = {
    palavras,
    respostaDireta: /Resposta r[áa]pida/i.test(html),
    tabela: /data-tabela|id="tabela-|<table/i.test(html),
    fontes: /Fontes (prim[áa]rias|consultadas)|refer[êe]ncias t[ée]cnicas/i.test(html),
    faq: /"@type"\s*:\s*"FAQPage"/.test(jsonLd) || /Perguntas frequentes/i.test(html),
    schemaServico: /"@type"\s*:\s*"(Service|LocalBusiness)"/.test(jsonLd),
    linksInternos: [...new Set([...html.matchAll(/href="(\/[a-z0-9\-/]+)"/g)].map((m) => m[1]))].length,
  };

  let score = 0;
  if (palavras >= 1200) score += 12;
  else if (palavras >= 800) score += 9;
  else if (palavras >= 500) score += 6;
  else if (palavras >= 300) score += 3;
  if (sinais.respostaDireta) score += 8;
  if (sinais.tabela) score += 6;
  if (sinais.fontes) score += 6;
  if (sinais.faq) score += 6;
  if (sinais.schemaServico) score += 6;
  if (sinais.linksInternos >= 12) score += 6;
  else if (sinais.linksInternos >= 6) score += 4;
  else if (sinais.linksInternos >= 3) score += 2;

  const classificacao = score >= 40 ? "STRONG" : score >= 30 ? "ADEQUATE" : score >= 20 ? "PARTIAL" : "WEAK";
  return { path, renderizado: true, score, classificacao, sinais };
}

// ------------------------------------------------------------------ execução
const matriz = [];
const vistos = new Map();

for (const fonte of FONTES) {
  for (const path of ownersDe(fonte)) {
    if (vistos.has(path)) {
      vistos.get(path).rodadas.push(fonte.rodada);
      continue;
    }
    const linha = { ...avaliar(path), cluster: fonte.cluster, rodadas: [fonte.rodada] };
    vistos.set(path, linha);
    matriz.push(linha);
  }
}

matriz.sort((a, b) => a.score - b.score || a.path.localeCompare(b.path));

const porClasse = matriz.reduce((acc, l) => ({ ...acc, [l.classificacao]: (acc[l.classificacao] ?? 0) + 1 }), {});
const gaps = matriz.filter((l) => l.classificacao === "WEAK" || l.classificacao === "PARTIAL").slice(0, 6);

const relatorio = {
  gerado_em: new Date().toISOString(),
  rodada: "4F",
  build: DIST,
  total_owners: matriz.length,
  nao_renderizados: matriz.filter((l) => !l.renderizado).map((l) => l.path),
  distribuicao: porClasse,
  score_medio: Number((matriz.reduce((s, l) => s + l.score, 0) / Math.max(matriz.length, 1)).toFixed(1)),
  gaps_criticos: gaps.map((g) => ({ path: g.path, score: g.score, classificacao: g.classificacao, cluster: g.cluster })),
  matriz,
};

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "authority-coverage-final.json"), JSON.stringify(relatorio, null, 2));

const md = [
  "# Matriz de cobertura e autoridade — Rodada 4F",
  "",
  `Gerado em ${relatorio.gerado_em} · build \`${DIST}\``,
  "",
  `- Owners auditados: **${relatorio.total_owners}**`,
  `- Score médio: **${relatorio.score_medio}/50**`,
  `- Distribuição: ${Object.entries(porClasse).map(([k, v]) => `${k} ${v}`).join(" · ")}`,
  "",
  "| Owner | Cluster | Rodadas | Palavras | Score | Classificação |",
  "| --- | --- | --- | ---: | ---: | --- |",
  ...matriz.map(
    (l) =>
      `| \`${l.path}\` | ${l.cluster} | ${l.rodadas.join(", ")} | ${l.sinais.palavras ?? 0} | ${l.score} | ${l.classificacao} |`,
  ),
  "",
  "## Gaps críticos selecionados (máx. 6)",
  "",
  ...(gaps.length ? gaps.map((g) => `- \`${g.path}\` — ${g.classificacao} (${g.score}/50, ${g.cluster})`) : ["- Nenhum gap WEAK/PARTIAL."]),
  "",
].join("\n");
writeFileSync(join(OUT, "authority-coverage-final.md"), md);

console.log(
  `✔ matriz 4F: ${relatorio.total_owners} owners · score médio ${relatorio.score_medio}/50 · ` +
    Object.entries(porClasse).map(([k, v]) => `${k}=${v}`).join(" "),
);
if (relatorio.nao_renderizados.length) {
  console.warn(`AVISO  ${relatorio.nao_renderizados.length} owner(s) sem HTML no build: ${relatorio.nao_renderizados.join(", ")}`);
}
