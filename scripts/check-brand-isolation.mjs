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

// Exceção operacional restrita à triagem Encontre um Técnico autorizada pelo
// proprietário. O telefone não se torna o contato canônico da marca OTI.
// Exige literal único na configuração de ponte e, no build, no bundle dessa
// mesma ponte. Qualquer ocorrência adicional ou noutra superfície segue falhando.
const TRIAGE_BRIDGE_FILE = "src/lib/config/eutBridge.ts";
const TRIAGE_NUMBER = "5541997452053";
const TRIAGE_BUILD_FILES = [
  /^dist\/client\/assets\/index-[\w-]+\.js$/,
  /^dist\/server\/_ssr\/legacyRouteElements-[\w-]+\.mjs$/,
];
const approvedBridgeSource = existsSync(TRIAGE_BRIDGE_FILE) &&
  readFileSync(TRIAGE_BRIDGE_FILE, "utf8").includes(`triagemWhatsApp: "${TRIAGE_NUMBER}"`);

const isApprovedTriageOccurrence = (rel, lineText, token) => {
  if (!approvedBridgeSource || token !== TRIAGE_NUMBER) return false;
  if (lineText.split(token).length !== 2) return false;
  if (rel === TRIAGE_BRIDGE_FILE) return lineText.includes("triagemWhatsApp:");
  // Bundlers mesclam código e removem nomes de campos; a auditoria das fontes
  // acima continua exigindo que o número exista somente na ponte autorizada.
  return TRIAGE_BUILD_FILES.some((re) => re.test(rel));
};

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
      if (lineText.includes(token) && !isApprovedTriageOccurrence(rel, lineText, token)) {
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
