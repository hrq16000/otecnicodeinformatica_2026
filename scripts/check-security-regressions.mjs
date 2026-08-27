#!/usr/bin/env node
/**
 * GATE — regressão dos achados de segurança já corrigidos (ver SECURITY.md).
 *
 * Bloqueia o build quando qualquer internal_id corrigido reaparece:
 *   • os_verification_codes_plaintext_code        → código legível persistido/logado
 *   • SUPA_authenticated_security_definer_function_executable
 *                                                 → GRANT EXECUTE de função definer
 *                                                   administrativa para anon/authenticated
 *
 * Varredura estática do repositório (src/, supabase/, scripts/), sem rede.
 * Uso: node scripts/check-security-regressions.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const ROOT = process.cwd();
const DIRS = ["src", "supabase", "scripts"];
const IGNORAR = new Set(["node_modules", "dist", ".output", ".nitro", "__snapshots__"]);
const EXT = new Set([".ts", ".tsx", ".js", ".mjs", ".sql", ".json"]);

// Arquivos que descrevem a própria política/gate e portanto citam os termos.
const PERMITIDOS = new Set([
  "scripts/check-security-regressions.mjs",
  "src/__tests__/security-os-codigo.test.ts",
  "src/__tests__/security-definer-privileges.integration.test.ts",
]);

// Migração que aplicou as correções: histórico anterior a ela é imutável e
// legitimamente cita os termos (DROP COLUMN / REVOKE). Só migrações POSTERIORES
// podem reintroduzir a regressão.
const MIGRACAO_CORRECAO = "20260827034541";
const eMigracaoAntiga = (rel) => {
  const m = rel.match(/^supabase\/migrations\/(\d{14})_/);
  return Boolean(m && m[1] <= MIGRACAO_CORRECAO);
};

const arquivos = [];
const andar = (dir) => {
  for (const nome of readdirSync(dir)) {
    if (IGNORAR.has(nome)) continue;
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) andar(caminho);
    else if (EXT.has(extname(nome))) arquivos.push(caminho);
  }
};
for (const d of DIRS) andar(resolve(ROOT, d));

const FUNCOES_DEFINER_ADMIN = ["admin_link_os_lead"];

const violacoes = [];
for (const caminho of arquivos) {
  const rel = relative(ROOT, caminho).replace(/\\/g, "/");
  if (PERMITIDOS.has(rel) || eMigracaoAntiga(rel)) continue;
  const texto = readFileSync(caminho, "utf8");

  // 1) Código de verificação em texto puro.
  for (const padrao of [/code_plain/i, /codigo_texto/i, /plain_?code/i]) {
    if (padrao.test(texto)) {
      violacoes.push({
        id: "os_verification_codes_plaintext_code",
        rel,
        detalhe: `campo de código legível (${padrao}) reintroduzido`,
      });
    }
  }

  // 2) GRANT EXECUTE de função definer administrativa para papel de usuário.
  for (const fn of FUNCOES_DEFINER_ADMIN) {
    const grant = new RegExp(
      `grant\\s+execute\\s+on\\s+function[^;]*${fn}[^;]*to[^;]*(anon|authenticated|public)`,
      "is",
    );
    if (grant.test(texto)) {
      violacoes.push({
        id: "SUPA_authenticated_security_definer_function_executable",
        rel,
        detalhe: `GRANT EXECUTE de ${fn}() para papel de usuário`,
      });
    }
  }
}

if (violacoes.length) {
  console.error("BLOQUEADO — regressão de segurança detectada:");
  for (const v of violacoes) console.error(`  • [${v.id}] ${v.rel}: ${v.detalhe}`);
  console.error("Consulte SECURITY.md antes de alterar esses fluxos.");
  process.exit(1);
}

console.log(
  `OK — nenhum achado corrigido reapareceu (${arquivos.length} arquivos varridos · 2 internal_id monitorados).`,
);
