#!/usr/bin/env node
/**
 * Gera public/build-version.json com o SHA e o horário do build.
 * A página /status compara este manifesto (servido sem cache) com a versão
 * embutida no bundle carregado pelo navegador — se divergirem, a produção
 * está servindo um bundle diferente do DEPLOY_HEAD (cache velho ou deploy
 * parcial). Fail-open: sem git disponível, grava "dev".
 */
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const out = resolve(process.cwd(), "public/build-version.json");

const sha = (() => {
  const env =
    process.env.VITE_APP_VERSION ||
    process.env.CF_PAGES_COMMIT_SHA ||
    process.env.GITHUB_SHA ||
    "";
  if (env) return env.slice(0, 7);
  try {
    return execSync("git rev-parse --short=7 HEAD", { encoding: "utf8" }).trim();
  } catch {
    return "dev";
  }
})();

mkdirSync(dirname(out), { recursive: true });
writeFileSync(
  out,
  `${JSON.stringify({ version: sha, buildTime: new Date().toISOString() }, null, 2)}\n`,
);
console.log(`[build-version] ${sha}`);
