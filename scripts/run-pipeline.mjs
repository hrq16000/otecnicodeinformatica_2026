#!/usr/bin/env node
/**
 * Orquestrador dos comandos oficiais.
 *
 * Uso:
 *   node scripts/run-pipeline.mjs verify
 *   node scripts/run-pipeline.mjs deploy:check --list
 *   node scripts/run-pipeline.mjs verify --only=check:internal-links,test
 *   node scripts/run-pipeline.mjs verify --skip=test --continue
 *   node scripts/run-pipeline.mjs deploy:check --with-optional
 *
 * Flags:
 *   --list            lista os passos e sai
 *   --only=a,b        executa apenas esses scripts
 *   --skip=a,b        pula esses scripts
 *   --continue        não interrompe no primeiro erro (executa tudo e falha ao final)
 *   --with-optional   trata passos opcionais como bloqueantes
 *   --skip-optional   ignora passos opcionais
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { pipelines } from './pipelines.config.mjs';

const argv = process.argv.slice(2);
const name = argv.find((a) => !a.startsWith('-'));
const flag = (f) => argv.includes(`--${f}`);
const value = (f) => {
  const hit = argv.find((a) => a.startsWith(`--${f}=`));
  return hit ? hit.slice(f.length + 3).split(',').map((s) => s.trim()).filter(Boolean) : null;
};

const pipeline = pipelines[name];
if (!pipeline) {
  console.error(`Pipeline desconhecido: ${name ?? '(nenhum)'}`);
  console.error(`Disponíveis: ${Object.keys(pipelines).join(', ')}`);
  process.exit(1);
}

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const only = value('only');
const skip = value('skip') ?? [];

let steps = pipeline.steps.filter((s) => !skip.includes(s.script));
if (only) steps = steps.filter((s) => only.includes(s.script));
if (flag('skip-optional')) steps = steps.filter((s) => !s.optional);

const missing = steps.filter((s) => !pkg.scripts?.[s.script]);
if (missing.length) {
  console.error(`Scripts npm inexistentes no pipeline "${name}": ${missing.map((s) => s.script).join(', ')}`);
  process.exit(1);
}

console.log(`\n▶ ${pipeline.title}\n  ${steps.length} passo(s)\n`);

if (flag('list')) {
  for (const [i, s] of steps.entries()) {
    console.log(`  ${String(i + 1).padStart(2, '0')}. ${s.script.padEnd(38)} ${s.optional ? '(opcional) ' : ''}${s.name}`);
  }
  process.exit(0);
}

if (pipeline.requiresDist && !existsSync(path.resolve('dist'))) {
  console.error('✖ dist/ não encontrado. Rode `npm run build` antes de `npm run deploy:check`.');
  process.exit(1);
}

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const results = [];
let blockingFailure = false;

for (const [i, step] of steps.entries()) {
  const optional = step.optional && !flag('with-optional');
  const label = `[${i + 1}/${steps.length}] ${step.script}`;
  const started = Date.now();
  console.log(`\n──── ${label} — ${step.name}${optional ? ' (opcional)' : ''}`);

  const res = spawnSync(npmCmd, ['run', '--silent', step.script], { stdio: 'inherit', env: process.env });
  const ok = res.status === 0;
  const durationMs = Date.now() - started;
  results.push({ script: step.script, name: step.name, optional, ok, durationMs, status: res.status ?? null });

  if (ok) {
    console.log(`✔ ${step.script} (${(durationMs / 1000).toFixed(1)}s)`);
    continue;
  }
  if (optional) {
    console.warn(`⚠ ${step.script} falhou, mas é opcional${step.why ? ` — ${step.why}` : ''}`);
    continue;
  }
  console.error(`✖ ${step.script} falhou (exit ${res.status})`);
  blockingFailure = true;
  if (!flag('continue')) break;
}

const executed = results.length;
const failed = results.filter((r) => !r.ok);
const summary = {
  pipeline: name,
  geradoEm: new Date().toISOString(),
  totalPassos: steps.length,
  executados: executed,
  falhas: failed.length,
  bloqueante: blockingFailure,
  passos: results,
};

mkdirSync('reports', { recursive: true });
const out = path.join('reports', `pipeline-${name.replace(/[:]/g, '-')}.json`);
writeFileSync(out, `${JSON.stringify(summary, null, 2)}\n`);

console.log(`\n──── Resumo ${name}`);
console.log(`  executados: ${executed}/${steps.length} · falhas: ${failed.length}`);
for (const f of failed) console.log(`  ${f.optional ? '⚠' : '✖'} ${f.script} — ${f.name}`);
console.log(`  relatório: ${out}\n`);

process.exit(blockingFailure ? 1 : 0);
