// RODADA 1 — GATE DE VAZAMENTO DE MARCA
// Falha o build se qualquer identificador da marca de origem aparecer em
// código/artefatos publicados ou documentação do próprio projeto.
//
// Uso: npm run check:brand-isolation
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { LEGACY_TOKENS } from "./lib/site-env.mjs";

const ROOTS = ["index.html", "src", "public", "dist", "docs"].filter((p) => existsSync(p));
const ROOT_MARKDOWN = readdirSync(".")
  .filter((entry) => extname(entry).toLowerCase() === ".md")
  .filter((entry) => statSync(entry).isFile());

// Citações estritamente necessárias para implementar/documentar o próprio bloqueio.
const ALLOWLIST = [
  /^AGENTS\.md$/,
  /^scripts\/lib\/site-env\.mjs$/,
  /^scripts\/check-brand-isolation\.mjs$/,
  /\.test\.(ts|tsx|mjs|js)$/,
  /^src\/lib\/legacy\//,
];

const SKIP_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".ico", ".woff", ".woff2", ".mp4", ".pdf", ".gz", ".br"]);

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
for (const r of ROOTS) walk(r);
for (const md of ROOT_MARKDOWN) files.push(md);

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

  const lines = content.split("\n");
  lines.forEach((lineText, index) => {
    for (const token of LEGACY_TOKENS) {
      if (lineText.includes(token)) {
        violations.push(`${rel}:${index + 1} → ${token}`);
      }
    }
  });
}

if (violations.length) {
  console.error("[check:brand-isolation] Identificadores da marca de origem encontrados:\n");
  for (const v of violations) console.error("  ✗ " + v);
  console.error(
    `\n${violations.length} ocorrência(s). Nada da marca de origem pode permanecer fora da allowlist de governança.`,
  );
  process.exit(1);
}

console.log(`[check:brand-isolation] OK — ${files.length} arquivos, nenhum identificador herdado.`);
