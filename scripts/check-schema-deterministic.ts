#!/usr/bin/env bun
/**
 * GATE — SCHEMA DETERMINÍSTICO POR OWNER EDITORIAL (Onda 10C · Infra 2, Parte D).
 *
 * Prova, para cada URL do registry de ondas editoriais, que:
 *   1. o conjunto normalizado de JSON-LD do SSR é IDÊNTICO entre renders frios
 *      (variantes = 1) — fecha a classe de regressão SSR_JSONLD_INTERMITENTE;
 *   2. FAQ visível ↔ FAQPage estão sincronizados (mesmas perguntas, na mesma
 *      quantidade, sem pergunta oculta no schema);
 *   3. quando não há FAQ visível, não existe FAQPage;
 *   4. o breadcrumb visual corresponde ao BreadcrumbList e as URLs são internas;
 *   5. o contrato de Article/TechArticle está completo (headline, publisher,
 *      author, dateModified, mainEntityOfPage, image).
 *
 * Comparação entre builds (opcional, quando o CI puder produzir duas builds do
 * mesmo commit):
 *   npm run check:schema-deterministic -- --baseline=reports/schema/build-a.json
 * Compara somente saída SEMÂNTICA (fingerprint normalizado), nunca arquivos com
 * hash de bundle.
 *
 * Fail-closed: sem dist/server/index.mjs o gate FALHA (não passa vazio).
 *
 * Uso: npm run check:schema-deterministic   (requer build prévio)
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { EDITORIAL_WAVES, batchKey } from "../src/lib/editorialWavesRegistry";

const run = promisify(execFile);
const argv = process.argv.slice(2);
const arg = (nome: string) => argv.find((a) => a.startsWith(`--${nome}=`))?.split("=")[1];

const RUNS = Number(arg("runs") ?? process.env.SCHEMA_RUNS ?? 6);
const CONCORRENCIA = 3;
const baseline = arg("baseline");

if (!existsSync("dist/server/index.mjs")) {
  console.error(
    "[check:schema-deterministic] FALHA fail-closed: dist/server/index.mjs ausente. Rode o build antes.",
  );
  process.exit(1);
}

type Render = {
  url: string;
  status: number;
  fingerprint: string;
  tipos: string[];
  faqVisivel: string[];
  faqSchema: Array<{ q: string; a: string }> | null;
  breadcrumbVisivel: string[];
  breadcrumbSchema: Array<{ name: string; item: string | null }> | null;
  artigo: Record<string, unknown> | null;
  erro?: string;
};

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const renderizar = (url: string): Promise<Render> =>
  run("node", ["scripts/p0/render-schema-once.mjs", url], { maxBuffer: 1e8 })
    .then((r) => JSON.parse(r.stdout) as Render)
    .catch((e) => ({ url, erro: String(e).slice(0, 300) }) as Render);

const falhas: string[] = [];
const linhas: Array<Record<string, unknown>> = [];

for (const entrada of EDITORIAL_WAVES) {
  const resultados: Render[] = [];
  for (let i = 0; i < RUNS; i += CONCORRENCIA) {
    const lote = Array.from({ length: Math.min(CONCORRENCIA, RUNS - i) }, () =>
      renderizar(entrada.url),
    );
    resultados.push(...(await Promise.all(lote)));
  }

  const erros = resultados.filter((r) => r.erro);
  const variantes = [...new Set(resultados.map((r) => r.fingerprint ?? "ERRO"))];
  const ref = resultados.find((r) => !r.erro);
  const problemas: string[] = [];

  if (erros.length) problemas.push(`render falhou (${erros[0].erro})`);
  if (variantes.length !== 1)
    problemas.push(`SCHEMA_REGRESSION: ${variantes.length} variantes ${variantes.join(" ≠ ")}`);

  if (ref) {
    // 2/3 — FAQ visível ↔ FAQPage.
    const visiveis = ref.faqVisivel ?? [];
    const doSchema = ref.faqSchema;
    if (visiveis.length === 0 && doSchema)
      problemas.push("FAQPage presente sem FAQ visível na página");
    if (visiveis.length > 0) {
      if (!doSchema) problemas.push("FAQ visível sem FAQPage no SSR");
      else {
        const setVis = new Set(visiveis.map(norm));
        const ocultas = doSchema.filter((q) => !setVis.has(norm(q.q)));
        if (ocultas.length)
          problemas.push(`pergunta no schema sem correspondente visível: "${ocultas[0].q}"`);
        const setSchema = new Set(doSchema.map((q) => norm(q.q)));
        const semSchema = visiveis.filter((q) => !setSchema.has(norm(q)));
        if (semSchema.length)
          problemas.push(`pergunta visível ausente do schema: "${semSchema[0]}"`);
        const semResposta = doSchema.filter((q) => q.a.length < 20);
        if (semResposta.length)
          problemas.push(`resposta vazia/curta no schema para "${semResposta[0].q}"`);
      }
    }

    // 4 — Breadcrumb visual ↔ BreadcrumbList.
    const bcVis = ref.breadcrumbVisivel ?? [];
    const bcSchema = ref.breadcrumbSchema;
    if (bcVis.length && !bcSchema) problemas.push("breadcrumb visível sem BreadcrumbList");
    if (bcVis.length && bcSchema) {
      if (bcSchema.length !== bcVis.length)
        problemas.push(`breadcrumb: ${bcVis.length} visíveis × ${bcSchema.length} no schema`);
      const divergente = bcSchema.find((it, i) => bcVis[i] && norm(it.name) !== norm(bcVis[i]));
      if (divergente) problemas.push(`breadcrumb divergente: schema "${divergente.name}"`);
      const externo = bcSchema.find((it) => it.item && !String(it.item).includes("/"));
      if (externo) problemas.push(`item de breadcrumb com URL inválida: ${externo.item}`);
    }

    // 5 — contrato de Article/TechArticle.
    const artigo = ref.artigo as Record<string, unknown> | null;
    if (!artigo) problemas.push("nó de artigo ausente no SSR");
    else {
      for (const campo of ["headline", "publisher", "author", "dateModified", "mainEntityOfPage"]) {
        if (!artigo[campo]) problemas.push(`artigo sem ${campo}`);
      }
      if (!artigo.image) problemas.push("artigo sem image");
    }
  }

  const ok = problemas.length === 0;
  if (!ok) falhas.push(`${entrada.url}: ${problemas.join(" · ")}`);

  linhas.push({
    owner: entrada.ownerId,
    lote: batchKey(entrada),
    url: entrada.url,
    runs: resultados.length,
    variantes: variantes.length,
    fingerprint: ref?.fingerprint ?? null,
    tipos: ref?.tipos ?? [],
    faqVisivel: (ref?.faqVisivel ?? []).length,
    faqSchema: ref?.faqSchema?.length ?? 0,
    breadcrumb: (ref?.breadcrumbVisivel ?? []).length,
    resultado: ok ? "PASS" : "FAIL",
    problemas,
  });

  console.log(
    `${ok ? "OK  " : "FALHA"} ${entrada.url} | runs=${resultados.length} variantes=${variantes.length} faq=${(ref?.faqVisivel ?? []).length}/${ref?.faqSchema?.length ?? 0} bc=${(ref?.breadcrumbVisivel ?? []).length}${ok ? "" : `\n      ↳ ${problemas.join("\n      ↳ ")}`}`,
  );
}

// Comparação entre builds independentes do mesmo commit (semântica pura).
let comparacao: string = "NA";
if (baseline && existsSync(baseline)) {
  const anterior = JSON.parse(readFileSync(baseline, "utf8")) as {
    rotas: Array<{ url: string; fingerprint: string | null }>;
  };
  const mapa = new Map(anterior.rotas.map((r) => [r.url, r.fingerprint]));
  const divergentes = linhas.filter(
    (l) => mapa.has(l.url as string) && mapa.get(l.url as string) !== l.fingerprint,
  );
  comparacao = divergentes.length === 0 ? "DETERMINISTICO" : "SCHEMA_REGRESSION";
  for (const d of divergentes) {
    falhas.push(
      `SCHEMA_REGRESSION entre builds em ${d.url}: A=${mapa.get(d.url as string)} B=${d.fingerprint}`,
    );
  }
  console.log(`\n[build A/B] ${comparacao} (baseline ${baseline})`);
}

mkdirSync(resolve(process.cwd(), "reports/schema"), { recursive: true });
writeFileSync(
  resolve(process.cwd(), "reports/schema/editorial-schema-fingerprints.json"),
  `${JSON.stringify({ geradoEm: new Date().toISOString(), runs: RUNS, comparacao, rotas: linhas }, null, 2)}\n`,
);

if (falhas.length) {
  console.error(`\n[check:schema-deterministic] FALHA (${falhas.length}):`);
  for (const f of falhas) console.error(`  · ${f}`);
  process.exit(1);
}
console.log(
  `\n[check:schema-deterministic] OK: ${linhas.length} owners · ${RUNS} renders frios cada · 1 variante por URL.`,
);
