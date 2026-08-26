#!/usr/bin/env node
/**
 * GATE — NENHUM SEGREDO EM ARTEFATO EDITORIAL PÚBLICO/EXPORTADO.
 * Onda 10C · Infra 3 — Parte F.
 *
 * Varre pacotes de evidências (reports/editorial/**) e artefatos servidos
 * (public/editorial-*.json) procurando webhook do Slack, chave Resend, chave
 * IndexNow, credencial do Search Console e tokens genéricos.
 *
 * Fail-closed: qualquer ocorrência FALHA o CI.
 * Uso: npm run check:editorial-export-secrets
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { PADROES_SEGREDO, CHAVES_PROIBIDAS } from "./lib/editorial-export.mjs";

const alvos = [];
const andar = (dir) => {
  if (!existsSync(dir)) return;
  for (const nome of readdirSync(dir)) {
    const p = resolve(dir, nome);
    if (statSync(p).isDirectory()) andar(p);
    else if (/\.(json|csv|md)$/.test(nome)) alvos.push(p);
  }
};
andar(resolve(process.cwd(), "reports/editorial"));
for (const f of existsSync("public") ? readdirSync("public") : []) {
  if (/^editorial-.*\.json$/.test(f)) alvos.push(resolve(process.cwd(), "public", f));
}

// Valores reais do ambiente também não podem aparecer literalmente.
const valores = [
  process.env.EDITORIAL_SLACK_WEBHOOK_URL,
  process.env.SLACK_WEBHOOK_URL,
  process.env.RESEND_API_KEY,
  process.env.INDEXNOW_KEY,
  process.env.GOOGLE_SEARCH_CONSOLE_API_KEY,
  process.env.LOVABLE_API_KEY,
].filter((v) => typeof v === "string" && v.length >= 12);

const falhas = [];
for (const arquivo of alvos) {
  const texto = readFileSync(arquivo, "utf8");
  for (const re of PADROES_SEGREDO) {
    if (re.test(texto)) falhas.push(`${arquivo}: padrão de segredo ${re}`);
  }
  for (const v of valores) {
    if (texto.includes(v)) falhas.push(`${arquivo}: valor de credencial do ambiente presente`);
  }
  if (arquivo.endsWith(".json")) {
    try {
      const varrer = (v, caminho = "") => {
        if (Array.isArray(v)) return v.forEach((x, i) => varrer(x, `${caminho}[${i}]`));
        if (v && typeof v === "object") {
          for (const [k, val] of Object.entries(v)) {
            if (CHAVES_PROIBIDAS.some((p) => k.toLowerCase() === p.toLowerCase()))
              falhas.push(`${arquivo}: chave sensível "${k}" em ${caminho || "raiz"}`);
            varrer(val, `${caminho}.${k}`);
          }
        }
      };
      varrer(JSON.parse(texto));
    } catch {
      /* arquivo não-JSON válido é problema de outro gate */
    }
  }
}

if (falhas.length) {
  console.error(`[check:editorial-export-secrets] FALHA (${falhas.length}):`);
  for (const f of falhas) console.error(`  · ${f}`);
  process.exit(1);
}
console.log(`[check:editorial-export-secrets] OK: ${alvos.length} artefato(s) sem segredo.`);
