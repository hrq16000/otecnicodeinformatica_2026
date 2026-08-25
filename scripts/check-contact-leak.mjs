#!/usr/bin/env node
/**
 * GATE — CANAL DE CONTATO ÚNICO.
 *
 * O portal só se comunica pelo fluxo de triagem/WhatsApp. Este gate falha
 * quando a interface volta a expor:
 *   1. um CNPJ formatado (00.000.000/0000-00) ou "CNPJ nº ...";
 *   2. um endereço de e-mail real da operação (mailto: ou literal), e
 *   3. um link `tel:` ou número de telefone em texto legível.
 *
 * Escopo: apenas código de interface (src/components e src/pages). Conteúdo
 * editorial que apenas *cita* a palavra CNPJ (ex.: "nota fiscal para o CNPJ")
 * é legítimo e não é bloqueado — o alvo é o dado de contato exposto.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIRS = ["src/components", "src/pages"];
const EXT = /\.(tsx|ts)$/;

/** E-mails de exemplo didático dentro de conteúdo (placeholders de input). */
const EMAIL_PERMITIDO = /(exemplo|example|seu|seunome|suaempresa|dominio|banco@seguranca)/i;

const REGRAS = [
  { nome: "CNPJ exposto", re: /\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/g },
  { nome: "link mailto:", re: /mailto:[^"'\s)]+/g },
  { nome: "link tel:", re: /["'`]tel:\+?[\d\s().-]+/g },
  {
    nome: "e-mail literal",
    re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(?:com|com\.br|br|net|org)\b/g,
    ignorar: EMAIL_PERMITIDO,
  },
];

function walk(dir) {
  let out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    out = statSync(p).isDirectory() ? out.concat(walk(p)) : out.concat(EXT.test(p) ? [p] : []);
  }
  return out;
}

const falhas = [];
let arquivos = 0;

for (const dir of DIRS) {
  for (const file of walk(dir)) {
    arquivos += 1;
    const src = readFileSync(file, "utf8");
    src.split("\n").forEach((linha, i) => {
      for (const regra of REGRAS) {
        for (const achado of linha.match(regra.re) ?? []) {
          if (regra.ignorar?.test(achado)) continue;
          falhas.push(`${file}:${i + 1} — ${regra.nome}: ${achado.trim()}`);
        }
      }
    });
  }
}

if (falhas.length > 0) {
  console.error("[contato] Gate de canal único falhou:");
  for (const f of falhas) console.error(" - " + f);
  console.error("\nContato acontece apenas pelo fluxo de triagem/WhatsApp.");
  process.exit(1);
}

console.log(`[contato] Canal único preservado em ${arquivos} arquivo(s) de interface ✔`);
