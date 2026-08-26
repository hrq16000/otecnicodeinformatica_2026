#!/usr/bin/env bun
/**
 * SNAPSHOT SEMÂNTICO DE SCHEMA POR BUILD (Onda 10C · Infra 3 — Parte C).
 *
 * Renderiza cada URL do registry editorial em processo frio (reutiliza
 * scripts/p0/render-schema-once.mjs da Infra 2) e persiste apenas a
 * representação SEMÂNTICA normalizada — nunca o HTML/DOM completo.
 *
 * Saída: public/editorial-schema-snapshots.json
 *   { builds: [ { buildSha, geradoEm, rotas: { url: snapshot } } ] }
 * Retenção: últimos N builds (padrão 10).
 *
 * Uso: npm run schema:snapshot-editorial [-- --retencao=10]
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
// @ts-expect-error — utilitário JS compartilhado (sem tipos).
import { snapshotDeRender } from "./lib/editorial-schema-diff.mjs";
import { EDITORIAL_WAVES, batchKey } from "../src/lib/editorialWavesRegistry";

const run = promisify(execFile);
const argv = process.argv.slice(2);
const arg = (n: string) => argv.find((a) => a.startsWith(`--${n}=`))?.split("=")[1];
const RETENCAO = Number(arg("retencao") ?? 10);
const ARQUIVO = resolve(process.cwd(), "public/editorial-schema-snapshots.json");

if (!existsSync("dist/server/index.mjs")) {
  console.error("[schema:snapshot] FALHA fail-closed: dist/server/index.mjs ausente. Rode o build antes.");
  process.exit(1);
}

const buildSha =
  arg("build") ??
  process.env.GITHUB_SHA ??
  (existsSync("public/build-version.json")
    ? (JSON.parse(readFileSync("public/build-version.json", "utf8")).version ?? "local")
    : "local");

const rotas: Record<string, unknown> = {};
for (const e of EDITORIAL_WAVES) {
  try {
    const r = await run("node", ["scripts/p0/render-schema-once.mjs", e.url], { maxBuffer: 1e8 });
    rotas[e.url] = snapshotDeRender(JSON.parse(r.stdout), {
      buildSha,
      owner: e.ownerId,
      lote: batchKey(e),
    });
  } catch (err) {
    rotas[e.url] = {
      buildSha,
      url: e.url,
      owner: e.ownerId,
      lote: batchKey(e),
      fingerprint: null,
      types: [],
      nodes: 0,
      faqQuestions: [],
      faqVisibleQuestions: [],
      faqAnswers: {},
      breadcrumbItems: [],
      breadcrumbVisible: [],
      articleFields: null,
      parseError: true,
      erro: String(err).slice(0, 200),
    };
  }
}

const anterior = existsSync(ARQUIVO)
  ? (JSON.parse(readFileSync(ARQUIVO, "utf8")).builds ?? [])
  : [];
const builds = [
  { buildSha: String(buildSha), geradoEm: new Date().toISOString(), rotas },
  ...anterior.filter((b: { buildSha: string }) => b.buildSha !== String(buildSha)),
].slice(0, RETENCAO);

writeFileSync(ARQUIVO, `${JSON.stringify({ geradoEm: new Date().toISOString(), builds }, null, 2)}\n`);
console.log(
  `[schema:snapshot] build ${buildSha} · ${Object.keys(rotas).length} URL(s) · ${builds.length} build(s) retido(s) em public/editorial-schema-snapshots.json`,
);
