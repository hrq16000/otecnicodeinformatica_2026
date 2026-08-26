#!/usr/bin/env bun
/**
 * PACOTE DE EVIDÊNCIAS POR ONDA/LOTE (Onda 10C · Infra 3 — Parte D).
 *
 * Gera, sem coleta manual, o pacote compartilhável de uma onda ou lote:
 *
 *   reports/editorial/<wave>/<lote-N|onda>/
 *     indexnow.csv|json · assets.csv|json · schema.csv|json
 *     indexation.csv|json · summary.json [· summary.md] · manifest.json
 *
 * Fontes: apenas artefatos JÁ produzidos (Infra 1/2/3). Nada é inventado e
 * nenhum segredo entra no pacote (sanitização + gate de padrões).
 *
 * Uso:
 *   npm run report:editorial-wave -- --wave=10C --batch=2
 *   npm run report:editorial-wave -- --wave=10C
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
// @ts-expect-error — utilitário JS compartilhado (sem tipos).
import {
  contemSegredo,
  linhasAssets,
  linhasIndexNow,
  linhasIndexacao,
  linhasSchema,
  montarManifest,
  paraCsv,
  sanitizar,
} from "./lib/editorial-export.mjs";
// @ts-expect-error — utilitário JS compartilhado (sem tipos).
import { compararBuilds } from "./lib/editorial-schema-diff.mjs";
import { EDITORIAL_WAVES } from "../src/lib/editorialWavesRegistry";

const argv = process.argv.slice(2);
const arg = (n: string) => argv.find((a) => a.startsWith(`--${n}=`))?.split("=")[1];
const wave = arg("wave") ?? "10C";
const batch = arg("batch");

const alvos = EDITORIAL_WAVES.filter((e) => e.wave === wave && (batch === undefined || e.batch === batch));
if (alvos.length === 0) {
  console.error(`[report:editorial-wave] nenhuma URL no registry para --wave=${wave}${batch ? ` --batch=${batch}` : ""}`);
  process.exit(1);
}

const ler = (caminho: string) => {
  const p = resolve(process.cwd(), caminho);
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return null;
  }
};

const indexnow = ler("reports/indexnow/editorial-wave-status.json");
const assets = ler("public/editorial-assets-status.json");
const fingerprints = ler("reports/schema/editorial-schema-fingerprints.json");
const snapshots = ler("public/editorial-schema-snapshots.json");
const indexacao = ler("public/editorial-waves-status.json");

const builds = snapshots?.builds ?? [];
const diffs =
  builds.length >= 2 ? compararBuilds(builds[1].rotas, builds[0].rotas) : [];

const conjuntos = [
  { nome: "indexnow", linhas: linhasIndexNow(indexnow, alvos) },
  { nome: "assets", linhas: linhasAssets(assets, alvos) },
  { nome: "schema", linhas: linhasSchema(fingerprints, snapshots, diffs, alvos) },
  { nome: "indexation", linhas: linhasIndexacao(indexacao, alvos) },
].map((c) => ({ ...c, linhas: sanitizar(c.linhas) as Array<Record<string, unknown>> }));

const destino = resolve(
  process.cwd(),
  `reports/editorial/${wave.toLowerCase()}/${batch ? `lote-${batch}` : "onda"}`,
);
mkdirSync(destino, { recursive: true });

const arquivos: Array<{ name: string; content: string; rows: number }> = [];
for (const c of conjuntos) {
  const csv = paraCsv(c.linhas);
  const json = `${JSON.stringify(c.linhas, null, 2)}\n`;
  arquivos.push({ name: `${c.nome}.csv`, content: csv, rows: c.linhas.length });
  arquivos.push({ name: `${c.nome}.json`, content: json, rows: c.linhas.length });
}

const summary = {
  wave,
  batch: batch ?? null,
  urls: alvos.map((e) => e.url),
  totais: Object.fromEntries(conjuntos.map((c) => [c.nome, c.linhas.length])),
  indexnowPorEstado: conjuntos
    .find((c) => c.nome === "indexnow")!
    .linhas.reduce<Record<string, number>>((acc, l) => {
      const k = String(l.state);
      acc[k] = (acc[k] ?? 0) + 1;
      return acc;
    }, {}),
  schemaPorEstado: conjuntos
    .find((c) => c.nome === "schema")!
    .linhas.reduce<Record<string, number>>((acc, l) => {
      const k = String(l.regressionState);
      acc[k] = (acc[k] ?? 0) + 1;
      return acc;
    }, {}),
  fontes: {
    indexnow: Boolean(indexnow),
    assets: Boolean(assets),
    schema: Boolean(fingerprints),
    indexacao: Boolean(indexacao),
    snapshots: builds.length,
  },
};
arquivos.push({ name: "summary.json", content: `${JSON.stringify(summary, null, 2)}\n`, rows: 1 });

const relatorioMd = resolve(process.cwd(), `docs/relatorio-onda-${wave.toLowerCase()}-lote-${batch}.md`);
if (batch && existsSync(relatorioMd)) {
  arquivos.push({
    name: "summary.md",
    content: readFileSync(relatorioMd, "utf8"),
    rows: readFileSync(relatorioMd, "utf8").split("\n").length,
  });
}

// Gate de vazamento — nenhum arquivo do pacote pode conter segredo.
const vazando = arquivos.filter((a) => contemSegredo(a.content));
if (vazando.length) {
  console.error(`[report:editorial-wave] ABORTADO: possível segredo em ${vazando.map((a) => a.name).join(", ")}`);
  process.exit(1);
}

for (const a of arquivos) writeFileSync(resolve(destino, a.name), a.content);

const manifest = montarManifest({
  wave,
  batch,
  buildSha: builds[0]?.buildSha ?? null,
  arquivos,
});
writeFileSync(resolve(destino, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`[report:editorial-wave] ${wave}${batch ? `/lote ${batch}` : ""} → ${destino}`);
for (const f of manifest.files) console.log(`  · ${f.name} · ${f.rows} linha(s) · sha256 ${f.sha256.slice(0, 16)}…`);
