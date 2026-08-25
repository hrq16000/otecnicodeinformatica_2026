#!/usr/bin/env node
/**
 * AUDITORIA FINAL DE CANIBALIZAÇÃO E SOBREPOSIÇÃO DE INTENÇÃO — RODADA 4B
 *
 * Compara as 6 URLs envolvidas (5 owners enriquecidos + o owner comercial
 * FROZEN de formatação) usando o HTML realmente servido (SSR prerenderizado em
 * `dist/`), nunca o código-fonte:
 *
 *   - similaridade de texto visível (Jaccard sobre shingles de 5 tokens);
 *   - proximidade de <title> e meta description (Jaccard de tokens);
 *   - inventário de links internos entre as próprias 6 URLs;
 *   - recomendação de interlinking quando um par complementar não se liga.
 *
 * Fail-closed apenas em canibalização real (texto acima do teto); pares
 * complementares sem link viram RECOMENDAÇÃO, não erro.
 *
 * Uso: node scripts/audit-intent-overlap-4b.mjs [--strict]
 * Saída: reports/canibalizacao-4b.json · docs/relatorio-canibalizacao-4b.md
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { extrairTextoVisivel, lerHtmlDaRota } from "./lib/content-fingerprint.mjs";
import { OWNERS_4B } from "./lib/owners-4b.mjs";

const DIST = resolve(process.cwd(), "dist");
const STRICT = process.argv.includes("--strict");

/** Teto de similaridade textual entre páginas de intenções distintas. */
const TETO_TEXTO = 0.34;
const TETO_META = 0.6;

const ALVOS = [
  ...OWNERS_4B.map((o) => ({ ...o, papel: "owner-4b" })),
  {
    path: "/servicos/formatacao",
    cluster: "F — formatação (execução comercial)",
    papel: "frozen-4a",
  },
];

/** Pares complementares: intenções vizinhas que devem se apoiar por link. */
const PARES_COMPLEMENTARES = [
  ["/solucoes/formatacao", "/servicos/formatacao"],
  ["/problemas/computador-lento", "/solucoes/formatacao"],
  ["/problemas/notebook-nao-liga", "/problemas/computador-nao-da-imagem"],
  ["/problemas/computador-lento", "/solucoes/backup"],
];

const tokens = (t) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);

const shingles = (arr, n = 5) => {
  const s = new Set();
  for (let i = 0; i + n <= arr.length; i += 1) s.add(arr.slice(i, i + n).join(" "));
  return s;
};

const jaccard = (a, b) => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const v of a) if (b.has(v)) inter += 1;
  return Number((inter / (a.size + b.size - inter)).toFixed(3));
};

const paginas = [];
for (const alvo of ALVOS) {
  const html = lerHtmlDaRota(DIST, alvo.path);
  if (!html) {
    console.error(`✗ HTML ausente em dist para ${alvo.path} — rode \`npm run build\` antes.`);
    process.exit(1);
  }
  const texto = extrairTextoVisivel(html);
  const titulo = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim() ?? "";
  const description =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? "";
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1].replace(/<[^>]+>/g, "").trim() ?? "";
  const h2 = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, "").trim(),
  );
  const links = new Set(
    [...html.matchAll(/<a\b[^>]*href=["'](\/[^"'#?]*)["']/gi)].map((m) => m[1].replace(/\/$/, "")),
  );
  paginas.push({
    ...alvo,
    titulo,
    description,
    h1,
    h2,
    palavras: tokens(texto).length,
    linksInternos: [...links],
    _texto: shingles(tokens(texto)),
    _titulo: new Set(tokens(titulo)),
    _desc: new Set(tokens(description)),
  });
}

const pares = [];
for (let i = 0; i < paginas.length; i += 1) {
  for (let j = i + 1; j < paginas.length; j += 1) {
    const a = paginas[i];
    const b = paginas[j];
    const texto = jaccard(a._texto, b._texto);
    const titulo = jaccard(a._titulo, b._titulo);
    const desc = jaccard(a._desc, b._desc);
    const excedeTexto = texto > TETO_TEXTO;
    const excedeMeta = titulo > TETO_META || desc > TETO_META;
    pares.push({
      a: a.path,
      b: b.path,
      similaridadeTexto: texto,
      similaridadeTitulo: titulo,
      similaridadeDescription: desc,
      veredito: excedeTexto ? "CANIBALIZACAO" : excedeMeta ? "META_PROXIMA" : "OK",
      ligaAB: a.linksInternos.includes(b.path),
      ligaBA: b.linksInternos.includes(a.path),
    });
  }
}

const recomendacoes = [];
for (const [x, y] of PARES_COMPLEMENTARES) {
  const par = pares.find((p) => (p.a === x && p.b === y) || (p.a === y && p.b === x));
  if (!par) continue;
  const de = par.a === x ? par.ligaAB : par.ligaBA;
  const volta = par.a === x ? par.ligaBA : par.ligaAB;
  if (!de || !volta) {
    recomendacoes.push({
      tipo: "INTERLINK",
      de: x,
      para: y,
      faltando: [!de ? `${x} → ${y}` : null, !volta ? `${y} → ${x}` : null].filter(Boolean),
      motivo:
        "intenções complementares: o leitor que chega numa delas costuma precisar da outra como próximo passo",
    });
  }
}
for (const p of pares.filter((p) => p.veredito !== "OK")) {
  recomendacoes.push({
    tipo: p.veredito,
    de: p.a,
    para: p.b,
    motivo:
      p.veredito === "CANIBALIZACAO"
        ? `texto visível com Jaccard ${p.similaridadeTexto} (teto ${TETO_TEXTO}) — separar escopo`
        : `title/description próximos (${p.similaridadeTitulo}/${p.similaridadeDescription}) — diferenciar metadados`,
  });
}

const canibalizacoes = pares.filter((p) => p.veredito === "CANIBALIZACAO");
const saida = {
  geradoEm: new Date().toISOString(),
  rodada: "4B",
  tetos: { texto: TETO_TEXTO, meta: TETO_META },
  paginas: paginas.map(({ _texto, _titulo, _desc, ...p }) => p),
  pares,
  recomendacoes,
  veredito: canibalizacoes.length ? "CANIBALIZACAO" : "OK",
};

mkdirSync(resolve(process.cwd(), "reports"), { recursive: true });
writeFileSync(resolve(process.cwd(), "reports/canibalizacao-4b.json"), `${JSON.stringify(saida, null, 2)}\n`);

const md = [
  "# Auditoria de canibalização e sobreposição de intenção — Rodada 4B",
  "",
  `Gerado em ${saida.geradoEm} · fonte: HTML SSR em \`dist/\` (não o código-fonte).`,
  `Tetos: texto Jaccard ≤ ${TETO_TEXTO} · title/description Jaccard ≤ ${TETO_META}.`,
  "",
  "## Páginas auditadas",
  "",
  "| URL | Papel | H1 | Palavras | Links internos |",
  "| --- | --- | --- | ---: | ---: |",
  ...saida.paginas.map(
    (p) => `| \`${p.path}\` | ${p.papel} | ${p.h1 || "—"} | ${p.palavras} | ${p.linksInternos.length} |`,
  ),
  "",
  "## Pares",
  "",
  "| A | B | Texto | Title | Desc | A→B | B→A | Veredito |",
  "| --- | --- | ---: | ---: | ---: | :-: | :-: | --- |",
  ...pares.map(
    (p) =>
      `| \`${p.a}\` | \`${p.b}\` | ${p.similaridadeTexto} | ${p.similaridadeTitulo} | ${p.similaridadeDescription} | ${p.ligaAB ? "✅" : "—"} | ${p.ligaBA ? "✅" : "—"} | ${p.veredito} |`,
  ),
  "",
  "## Recomendações",
  "",
  ...(recomendacoes.length
    ? recomendacoes.map((r) =>
        r.tipo === "INTERLINK"
          ? `- **Interlinking** — faltando: ${r.faltando.map((f) => `\`${f}\``).join(", ")}. ${r.motivo}.`
          : `- **${r.tipo}** entre \`${r.de}\` e \`${r.para}\`: ${r.motivo}.`,
      )
    : ["- Nenhuma. Escopos separados e pares complementares já interligados."]),
  "",
  `**Veredito: ${saida.veredito}** — ${canibalizacoes.length} par(es) acima do teto de texto.`,
  "",
].join("\n");
writeFileSync(resolve(process.cwd(), "docs/relatorio-canibalizacao-4b.md"), `${md}\n`);

console.log(`── canibalização 4B ── ${paginas.length} páginas · ${pares.length} pares`);
for (const p of pares) {
  console.log(
    `  ${p.veredito === "OK" ? "✓" : "✗"} ${p.a} × ${p.b} — texto ${p.similaridadeTexto} · title ${p.similaridadeTitulo}`,
  );
}
for (const r of recomendacoes) console.log(`  → ${r.tipo}: ${r.de} × ${r.para}`);
console.log(
  `\n${saida.veredito} — reports/canibalizacao-4b.json · docs/relatorio-canibalizacao-4b.md`,
);
process.exit(STRICT && canibalizacoes.length ? 1 : 0);
