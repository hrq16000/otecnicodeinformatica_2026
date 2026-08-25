#!/usr/bin/env node
/**
 * ============================================================================
 * GATE ORPHAN TREND — tendência de páginas órfãs (fail-closed)
 * ============================================================================
 * Complementa a catraca (`check-orphan-ratchet.mjs`): além do total, guarda a
 * TENDÊNCIA versionada em `reports/orphan-baseline.json`, com data e conjunto
 * de URLs, para que qualquer regressão apareça no diff do commit.
 *
 * Regras heurísticas (reduzem falso positivo sem afrouxar SEO):
 *   · rotas administrativas e utilitárias não são conteúdo indexável;
 *   · rotas dinâmicas/paramétricas (`$slug`, `:slug`, `*`) não são URLs reais;
 *   · âncoras e modais (`#...`) não são páginas.
 * Tudo o mais conta — inclusive páginas novas de conteúdo.
 *
 * Uso:
 *   node scripts/check-orphan-trend.mjs             # verifica contra baseline
 *   node scripts/check-orphan-trend.mjs --update    # regrava a baseline
 *   node scripts/check-orphan-trend.mjs --require   # só exige o arquivo (CI/build)
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ROOT = process.cwd();
const BASELINE = join(ROOT, "reports", "orphan-baseline.json");
const UPDATE = process.argv.includes("--update");
const REQUIRE_ONLY = process.argv.includes("--require");

const AJUDA = `Gere e versione o baseline antes do build de produção:

    npm run orphan:baseline        # atualiza reports/orphan-baseline.json
    git add reports/orphan-baseline.json && git commit

O arquivo precisa estar commitado para que staging e produção usem exatamente
o mesmo contrato de páginas órfãs.`;

function exigirBaseline() {
  if (existsSync(BASELINE)) return JSON.parse(readFileSync(BASELINE, "utf8"));
  console.error("✖ [FAIL_MISSING_ORPHAN_BASELINE] reports/orphan-baseline.json ausente.\n");
  console.error(AJUDA);
  process.exit(1);
}

if (REQUIRE_ONLY) {
  const b = exigirBaseline();
  if (!Array.isArray(b.urls) || typeof b.total !== "number") {
    console.error("✖ [FAIL_INVALID_ORPHAN_BASELINE] formato inválido (esperado { total, urls }).\n");
    console.error(AJUDA);
    process.exit(1);
  }
  console.log(`✓ Baseline de órfãs presente (${b.total} URL(s), gerado em ${b.generatedAt ?? "data não registrada"}).`);
  process.exit(0);
}

/** Heurísticas de exclusão — não são páginas de conteúdo indexável. */
const IGNORAR = [
  /^\/admin(\/|$)/,
  /^\/status$/,
  /^\/funil-indisponivel$/,
  /[:$*]/, // rota paramétrica, não URL real
  /#/, // âncora ou modal
  /^\/api(\/|$)/,
];

const ignorada = (url) => IGNORAR.some((re) => re.test(url));

let relatorio;
try {
  relatorio = JSON.parse(
    execFileSync("node", ["scripts/check-internal-links.mjs", "--json"], {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
    }),
  );
} catch (erro) {
  const bruto = erro?.stdout?.toString?.() ?? "";
  try {
    relatorio = JSON.parse(bruto);
  } catch {
    console.error("✖ [UNKNOWN_LINK_GATE_FAILURE] não foi possível apurar links internos.");
    console.error(erro?.stderr?.toString?.() || erro?.message);
    process.exit(1);
  }
  if (relatorio.errors?.length) {
    console.error(
      `✖ [FAIL_LINK_ERRORS] ${relatorio.errors.length} erro(s) de link interno — corrija antes da tendência.`,
    );
    relatorio.errors.slice(0, 20).forEach((e) => console.error(`  · [${e.reason}] ${e.detalhe}`));
    process.exit(1);
  }
}

const orfas = (relatorio.warnings ?? [])
  .filter((w) => String(w.reason).includes("ORPHAN"))
  .map((w) => String(w.detalhe).replace(/^\[[^\]]+\]\s*/, "").trim())
  .filter((u) => u.startsWith("/") && !ignorada(u))
  .sort();

const atual = {
  total: orfas.length,
  generatedAt: new Date().toISOString().slice(0, 10),
  ignoredPatterns: IGNORAR.map(String),
  urls: orfas,
};

if (UPDATE) {
  if (existsSync(BASELINE)) {
    const anterior = JSON.parse(readFileSync(BASELINE, "utf8"));
    if (atual.total > anterior.total) {
      console.error(
        `✖ [FAIL_TREND_UPDATE] a tendência não pode subir (${anterior.total} → ${atual.total}). Ligue as páginas novas na malha interna antes de atualizar.`,
      );
      atual.urls
        .filter((u) => !anterior.urls.includes(u))
        .forEach((u) => console.error(`  · ${u}`));
      process.exit(1);
    }
  }
  mkdirSync(dirname(BASELINE), { recursive: true });
  writeFileSync(BASELINE, `${JSON.stringify(atual, null, 2)}\n`);
  console.log(`✓ reports/orphan-baseline.json atualizado: ${atual.total} URL(s). Commite o arquivo.`);
  process.exit(0);
}

const baseline = exigirBaseline();
const novas = orfas.filter((u) => !baseline.urls.includes(u));
const resolvidas = (baseline.urls ?? []).filter((u) => !orfas.includes(u));

console.log("── Tendência de páginas órfãs ──");
console.log(`Baseline: ${baseline.total} (${baseline.generatedAt ?? "s/data"}) | atual: ${atual.total}`);
if (resolvidas.length) console.log(`✓ ${resolvidas.length} resolvida(s): ${resolvidas.slice(0, 10).join(", ")}`);

if (novas.length || atual.total > baseline.total) {
  console.error(`\n✖ [FAIL_ORPHAN_TREND] ${novas.length} nova(s) órfã(s):`);
  novas.forEach((u) => console.error(`  · ${u}`));
  console.error(`\n${AJUDA}`);
  process.exit(1);
}

console.log("\n✔ Tendência estável — nenhuma nova página órfã.");
