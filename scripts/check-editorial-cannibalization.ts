#!/usr/bin/env bun
/**
 * GATE ANTI-CANIBALIZAÇÃO EDITORIAL (pré-publicação) — Onda 10C · Infra 1.
 *
 * Impede que um novo lote publique uma URL que dispute a mesma consulta de
 * uma URL já existente. Roda ANTES da publicação:
 *
 *   npm run check:editorial-cannibalization
 *   npm run check:editorial-cannibalization -- \
 *     --candidato="/blog/pc-desliga-sozinho-jogando:pc desliga sozinho jogando,superaquecimento em jogos"
 *
 * Regras (falham o build):
 *   1. duas URLs declarando a mesma consulta-alvo (normalizada);
 *   2. similaridade de consultas acima do teto (Jaccard de tokens > 0.40);
 *   3. candidato apontando para URL já existente no registry;
 *   4. `doNotDuplicate` declarando URL que não existe no acervo declarado.
 *
 * Fonte única: src/lib/editorialWavesRegistry.ts + src/lib/contentIntentMap.ts.
 */
import { EDITORIAL_WAVES } from "../src/lib/editorialWavesRegistry";
import { CONTENT_INTENT_MAP } from "../src/lib/contentIntentMap";

const TETO_SIMILARIDADE = 0.4;

type Alvo = { url: string; origem: string; queries: string[]; doNotDuplicate: string[] };

const normalizar = (q: string) =>
  q
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const STOPWORDS = new Set([
  "o","a","os","as","de","da","do","das","dos","em","no","na","um","uma","para","por","com",
  "que","e","ou","se","meu","minha","como","qual","quais","nao","sem","ao","the",
]);

const tokens = (q: string) => new Set(normalizar(q).split(" ").filter((t) => t && !STOPWORDS.has(t)));

const jaccard = (a: Set<string>, b: Set<string>) => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter += 1;
  return inter / (a.size + b.size - inter);
};

// ── Acervo declarado ────────────────────────────────────────────
const acervo: Alvo[] = [
  ...EDITORIAL_WAVES.map((e) => ({
    url: e.url,
    origem: `onda ${e.wave}/${e.batch}`,
    queries: e.targetQueries,
    doNotDuplicate: e.doNotDuplicate,
  })),
  ...CONTENT_INTENT_MAP.map((n) => ({
    url: n.url,
    origem: "mapa de intenção",
    queries: n.queries,
    doNotDuplicate: n.doNotDuplicate ?? [],
  })),
];

// ── Candidatos passados na linha de comando ─────────────────────
const candidatos: Alvo[] = process.argv
  .filter((a) => a.startsWith("--candidato="))
  .map((a) => {
    const bruto = a.slice("--candidato=".length);
    const [url, queries = ""] = bruto.split(":");
    return {
      url: url.replace(/\/$/, ""),
      origem: "candidato (pré-publicação)",
      queries: queries.split(",").map((q) => q.trim()).filter(Boolean),
      doNotDuplicate: [],
    };
  });

const erros: string[] = [];
const avisos: string[] = [];

for (const c of candidatos) {
  if (!c.queries.length) erros.push(`Candidato ${c.url} sem consultas-alvo declaradas.`);
  if (acervo.some((a) => a.url === c.url)) {
    erros.push(`Candidato ${c.url} já existe no acervo declarado — enriqueça a URL existente.`);
  }
}

const universo = [...acervo, ...candidatos];

// 1 · consulta idêntica em duas URLs
const porQuery = new Map<string, string[]>();
for (const alvo of universo) {
  for (const q of alvo.queries) {
    const chave = normalizar(q);
    porQuery.set(chave, [...(porQuery.get(chave) ?? []), alvo.url]);
  }
}
for (const [q, urls] of porQuery) {
  const unicas = [...new Set(urls)];
  if (unicas.length > 1) {
    erros.push(`Consulta "${q}" declarada por ${unicas.length} URLs: ${unicas.join(" · ")}`);
  }
}

// 2 · similaridade acima do teto entre URLs diferentes
for (let i = 0; i < universo.length; i += 1) {
  for (let j = i + 1; j < universo.length; j += 1) {
    const a = universo[i];
    const b = universo[j];
    if (a.url === b.url) continue;
    const ta = tokens(a.queries.join(" "));
    const tb = tokens(b.queries.join(" "));
    const sim = jaccard(ta, tb);
    if (sim > TETO_SIMILARIDADE) {
      const linha = `${a.url} × ${b.url} → similaridade ${sim.toFixed(2)} (teto ${TETO_SIMILARIDADE})`;
      const declarado =
        a.doNotDuplicate.includes(b.url) || b.doNotDuplicate.includes(a.url);
      if (declarado) avisos.push(`${linha} — proximidade já declarada em doNotDuplicate.`);
      else erros.push(linha);
    }
  }
}

// 3 · doNotDuplicate apontando para URL fora do acervo
const conhecidas = new Set(universo.map((u) => u.url));
for (const alvo of universo) {
  for (const alvo2 of alvo.doNotDuplicate) {
    if (!conhecidas.has(alvo2)) {
      avisos.push(`${alvo.url}: doNotDuplicate cita ${alvo2}, fora do acervo declarado.`);
    }
  }
}

console.log(
  `[anti-canibalização] ${acervo.length} URL(s) do acervo · ${candidatos.length} candidato(s) · teto ${TETO_SIMILARIDADE}`,
);
for (const a of avisos) console.log(`  ⚠ ${a}`);

if (erros.length) {
  console.error(`\n✖ ${erros.length} colisão(ões) de intenção:`);
  for (const e of erros) console.error(`  · ${e}`);
  process.exit(1);
}
console.log("✔ Sem canibalização entre as URLs declaradas.");
