#!/usr/bin/env bun
/**
 * DIFF DE SCHEMA ENTRE BUILDS — CLI (Onda 10C · Infra 3 — Parte C).
 *
 * Compara dois builds já capturados em public/editorial-schema-snapshots.json
 * e grava public/editorial-schema-diff.json (consumido por
 * /admin/editorial-ondas → aba "Schema Diff").
 *
 * Uso:
 *   npm run schema:diff-editorial                       # último × penúltimo
 *   npm run schema:diff-editorial -- --a=<sha> --b=<sha>
 *   npm run schema:diff-editorial -- --strict           # regressão falha o CI
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
// @ts-expect-error — utilitário JS compartilhado (sem tipos).
import { compararBuilds } from "./lib/editorial-schema-diff.mjs";

const argv = process.argv.slice(2);
const arg = (n: string) => argv.find((a) => a.startsWith(`--${n}=`))?.split("=")[1];
const STRICT = argv.includes("--strict");

const ARQUIVO = resolve(process.cwd(), "public/editorial-schema-snapshots.json");
if (!existsSync(ARQUIVO)) {
  console.error("[schema:diff] sem public/editorial-schema-snapshots.json — rode npm run schema:snapshot-editorial.");
  process.exit(STRICT ? 1 : 0);
}

const builds: Array<{ buildSha: string; geradoEm: string; rotas: Record<string, unknown> }> =
  JSON.parse(readFileSync(ARQUIVO, "utf8")).builds ?? [];

if (builds.length < 2) {
  writeFileSync(
    resolve(process.cwd(), "public/editorial-schema-diff.json"),
    `${JSON.stringify({ geradoEm: new Date().toISOString(), buildA: null, buildB: builds[0]?.buildSha ?? null, estado: "UNKNOWN", motivo: "apenas um build capturado", linhas: [] }, null, 2)}\n`,
  );
  console.log("[schema:diff] apenas um build capturado — nada a comparar (UNKNOWN, sem falso positivo).");
  process.exit(0);
}

const byId = (sha?: string) => (sha ? builds.find((b) => b.buildSha === sha) : undefined);
const buildB = byId(arg("b")) ?? builds[0];
const buildA = byId(arg("a")) ?? builds.find((b) => b.buildSha !== buildB.buildSha)!;

const linhas = compararBuilds(buildA.rotas, buildB.rotas);
const regressoes = linhas.filter((l: { estado: string }) => l.estado === "SCHEMA_REGRESSION");

writeFileSync(
  resolve(process.cwd(), "public/editorial-schema-diff.json"),
  `${JSON.stringify(
    {
      geradoEm: new Date().toISOString(),
      buildA: buildA.buildSha,
      buildB: buildB.buildSha,
      builds: builds.map((b) => ({ buildSha: b.buildSha, geradoEm: b.geradoEm })),
      estado: regressoes.length ? "SCHEMA_REGRESSION" : linhas.every((l: { estado: string }) => l.estado === "UNCHANGED") ? "UNCHANGED" : "CHANGED",
      linhas,
    },
    null,
    2,
  )}\n`,
);

console.log(`[schema:diff] ${buildA.buildSha} → ${buildB.buildSha} · ${linhas.length} URL(s)`);
for (const l of linhas) console.log(`  · ${l.estado.padEnd(18)} ${l.url}${l.regressoes?.length ? ` ↳ ${l.regressoes.join(", ")}` : ""}`);

if (STRICT && regressoes.length) process.exit(1);
