#!/usr/bin/env node
/**
 * INVENTÁRIO DE TESTES — prova de que cada runner coleta apenas o seu universo.
 *
 * Executa os "listers" oficiais (sem rodar teste algum) e registra números reais:
 *   • Vitest    → arquivos/testes por projeto (unit | integration | scripts)
 *   • Playwright→ arquivos/testes do diretório e2e
 *
 * Fail-closed:
 *   - Vitest coletando qualquer caminho sob e2e/ ou playwright/  → exit 1
 *   - Playwright coletando arquivo fora de e2e/                  → exit 1
 *   - Suíte crítica com zero testes                              → exit 1
 *
 * Saída: reports/test-inventory.json
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";

const ROOT = process.cwd();
const rel = (p) => relative(ROOT, p).replaceAll("\\", "/");

function run(cmd, args) {
  return execFileSync(cmd, args, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    env: { ...process.env, TEST_INVENTORY: "1" },
  });
}

const vitestCli = resolve(ROOT, "node_modules", "vitest", "vitest.mjs");
const playwrightCli = resolve(ROOT, "node_modules", "playwright", "cli.js");

// ── Vitest ────────────────────────────────────────────────────────────────
function vitestInventory() {
  const out = run(process.execPath, [vitestCli, "list", "--json"]);
  const json = JSON.parse(out.slice(out.indexOf("[")));
  const porProjeto = new Map();
  const arquivos = new Set();
  for (const t of json) {
    const projeto = t.projectName || t.project || "unit";
    const arquivo = rel(resolve(ROOT, t.file ?? t.filepath ?? ""));
    arquivos.add(arquivo);
    const p = porProjeto.get(projeto) ?? { arquivos: new Set(), testes: 0 };
    p.arquivos.add(arquivo);
    p.testes += 1;
    porProjeto.set(projeto, p);
  }
  return {
    arquivos: [...arquivos].sort(),
    testes: json.length,
    projetos: Object.fromEntries(
      [...porProjeto].map(([k, v]) => [k, { arquivos: v.arquivos.size, testes: v.testes }]),
    ),
  };
}

// ── Playwright ────────────────────────────────────────────────────────────
function playwrightInventory() {
  const out = run(process.execPath, [playwrightCli, "test", "--list", "--reporter=json"]);
  const json = JSON.parse(out.slice(out.indexOf("{")));
  const arquivos = new Set();
  let testes = 0;
  // O reporter JSON emite `file` relativo ao testDir do projeto; para provar
  // isolamento precisamos do caminho real relativo à raiz do repositório.
  const testDir = json.config?.projects?.[0]?.testDir ?? resolve(ROOT, "e2e");
  const walk = (suites = []) => {
    for (const s of suites) {
      if (s.file) arquivos.add(rel(resolve(testDir, s.file)));
      testes += (s.specs ?? []).length;
      walk(s.suites);
    }
  };
  walk(json.suites);
  return { arquivos: [...arquivos].sort(), testes };
}

const vitest = vitestInventory();
const playwright = playwrightInventory();

const vitestVazouE2e = vitest.arquivos.filter((f) => /^(e2e|playwright)\//.test(f));
const playwrightVazouUnit = playwright.arquivos.filter((f) => !/^e2e\//.test(f));

const relatorio = {
  geradoEm: new Date().toISOString(),
  vitest: { ...vitest, arquivosTotais: vitest.arquivos.length },
  playwright: { ...playwright, arquivosTotais: playwright.arquivos.length },
  vereditos: {
    vitestColetouPlaywright: vitestVazouE2e.length > 0,
    playwrightColetouUnit: playwrightVazouUnit.length > 0,
    suiteVazia: vitest.testes === 0 || playwright.testes === 0,
  },
};

mkdirSync("reports", { recursive: true });
writeFileSync("reports/test-inventory.json", JSON.stringify(relatorio, null, 2) + "\n");

console.log(`Vitest      : ${vitest.arquivos.length} arquivos / ${vitest.testes} testes`);
for (const [p, v] of Object.entries(vitest.projetos)) {
  console.log(`  [${p}] ${v.arquivos} arquivos / ${v.testes} testes`);
}
console.log(`Playwright  : ${playwright.arquivos.length} arquivos / ${playwright.testes} testes`);

const falhas = [];
if (vitestVazouE2e.length) falhas.push(`Vitest coletou specs Playwright: ${vitestVazouE2e.join(", ")}`);
if (playwrightVazouUnit.length)
  falhas.push(`Playwright coletou testes fora de e2e/: ${playwrightVazouUnit.join(", ")}`);
if (vitest.testes === 0) falhas.push("Vitest coletou ZERO testes (falso verde).");
if (playwright.testes === 0) falhas.push("Playwright coletou ZERO testes (falso verde).");

if (falhas.length) {
  console.error("\nFAIL — isolamento de runners violado:");
  for (const f of falhas) console.error(` • ${f}`);
  process.exit(1);
}
console.log("\nPASS — cada runner coleta apenas o seu universo.");
