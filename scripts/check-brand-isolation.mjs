// RODADA 1 — GATE DE VAZAMENTO DE MARCA
// Falha o build se qualquer identificador da marca de origem aparecer em
// artefatos que vão para produção (index.html, public/, src/, dist/ se existir).
//
// Uso: npm run check:brand-isolation
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { LEGACY_TOKENS } from "./lib/site-env.mjs";

const ROOTS = ["index.html", "src", "public", "scripts", "dist"].filter((p) =>
  existsSync(p),
);
const ROOT_MARKDOWN = readdirSync(".").filter(
  (entry) => entry.toLowerCase().endsWith(".md") && statSync(entry).isFile(),
);
const MARKDOWN_DIRS = ["docs"].filter((p) => existsSync(p));

// Arquivos onde a citação do token é legítima (documentação da própria migração
// e testes de regressão que precisam do valor literal para provar o bloqueio).
const ALLOWLIST = [
  /^AGENTS\.md$/,
  /^scripts\/lib\/site-env\.mjs$/,
  /^scripts\/check-brand-isolation\.mjs$/,
  /\.test\.(ts|tsx|mjs|js)$/,
  /^src\/lib\/legacy\//,
];

const SKIP_EXT = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".ico",
  ".woff",
  ".woff2",
  ".mp4",
  ".pdf",
  ".gz",
  ".br",
]);

const files = [];
const walk = (p) => {
  const st = statSync(p);
  if (st.isDirectory()) {
    for (const entry of readdirSync(p)) walk(join(p, entry));
    return;
  }
  if (SKIP_EXT.has(extname(p).toLowerCase())) return;
  files.push(p);
};
const walkMarkdown = (p) => {
  const st = statSync(p);
  if (st.isDirectory()) {
    for (const entry of readdirSync(p)) walkMarkdown(join(p, entry));
    return;
  }
  if (extname(p).toLowerCase() !== ".md") return;
  files.push(p);
};
for (const r of ROOTS) walk(r);
for (const file of ROOT_MARKDOWN) files.push(file);
for (const dir of MARKDOWN_DIRS) walkMarkdown(dir);

const violations = [];
for (const file of files) {
  const rel = file.replace(/\\/g, "/");
  if (ALLOWLIST.some((re) => re.test(rel))) continue;
  let content;
  try {
    content = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  for (const token of LEGACY_TOKENS) {
    if (!content.includes(token)) continue;
    const line = content.split("\n").findIndex((l) => l.includes(token)) + 1;
    violations.push(`${rel}:${line} → ${token}`);
  }
}

if (violations.length) {
  console.error("[check:brand-isolation] Identificadores da marca de origem encontrados:\n");
  for (const v of violations) console.error("  ✗ " + v);
  console.error(
    `\n${violations.length} ocorrência(s). Nada da marca de origem pode ir para produção.`,
  );
  process.exit(1);
}

console.log(
  `[check:brand-isolation] OK — ${files.length} arquivos, nenhum identificador herdado.`,
);
