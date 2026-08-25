#!/usr/bin/env bun
/**
 * Gate: INTENÇÃO CONVERSACIONAL — fail-closed.
 *
 * Valida os blocos "o que / como / por que / onde" de
 * src/lib/intencaoConversacional.ts:
 *
 *  1. Todo bloco aponta para uma página que EXISTE (nada de URL nova).
 *  2. Cada bloco cobre os quatro tipos de intenção, sem repetir pergunta.
 *  3. Pergunta é pergunta de verdade (termina em "?", começa por termo
 *     interrogativo) e resposta é direta (uma faixa útil de caracteres).
 *  4. Conteúdo informativo é NACIONAL: nada de cidade/bairro nas respostas
 *     de "o que", "como" e "por que" — localização só no bloco "onde".
 *  5. Nenhuma promessa proibida (nota, avaliação, prazo garantido, "melhor",
 *     número de clientes) e nenhum valor monetário fora de precosConfig.
 */
import { readFileSync } from "node:fs";
import { blocosConversacionais } from "../src/lib/intencaoConversacional";
import { clusterProblema } from "../src/lib/clusterProblemas";

const falhas: string[] = [];
const fail = (m: string) => falhas.push(m);

const TIPOS = ["o-que", "como", "por-que", "onde"] as const;
const INTERROGATIVO = /^(o que|como|por que|onde|quando|quanto|qual|vale a pena)/i;
const CIDADES =
  /(curitiba|s[aã]o jos[eé] dos pinhais|pinhais|colombo|arauc[aá]ria|campo largo|almirante tamandar[eé]|bairro)/i;
const PROIBIDO =
  /(melhor da cidade|n[ºo°]\s*1|nota \d|avalia(ç|c)[aã]o de \d|\d+ clientes|garantia vital[ií]cia|em at[eé] \d+ ?h(oras)?|prazo garantido)/i;

const precos = readFileSync("src/lib/precosConfig.ts", "utf8");
const blocos = blocosConversacionais();

if (blocos.length === 0) fail("nenhum bloco conversacional declarado");

const pathsVistos = new Set<string>();

for (const b of blocos) {
  if (pathsVistos.has(b.path)) fail(`bloco duplicado para ${b.path}`);
  pathsVistos.add(b.path);

  const slug = b.path.replace(/^\/problemas\//, "");
  if (!b.path.startsWith("/problemas/") || !clusterProblema(slug)) {
    fail(`bloco aponta para página inexistente: ${b.path}`);
  }

  const tipos = new Set(b.perguntas.map((p) => p.tipo));
  for (const t of TIPOS) {
    if (!tipos.has(t)) fail(`${b.path}: falta a intenção "${t}"`);
  }

  const perguntasVistas = new Set<string>();
  for (const p of b.perguntas) {
    if (perguntasVistas.has(p.pergunta)) fail(`${b.path}: pergunta repetida — ${p.pergunta}`);
    perguntasVistas.add(p.pergunta);

    if (!p.pergunta.trim().endsWith("?")) fail(`${b.path}: pergunta sem "?" — ${p.pergunta}`);
    if (!INTERROGATIVO.test(p.pergunta.trim())) {
      fail(`${b.path}: pergunta não está no formato conversacional — ${p.pergunta}`);
    }

    const n = p.resposta.trim().length;
    if (n < 80 || n > 700) {
      fail(`${b.path}: resposta fora da faixa útil (${n} caracteres) — ${p.pergunta}`);
    }

    if (p.tipo !== "onde" && CIDADES.test(p.resposta)) {
      fail(`${b.path}: conteúdo informativo com localidade (deve ser nacional) — ${p.pergunta}`);
    }

    const alvo = `${p.resposta} ${(p.detalhes?.itens ?? []).join(" ")}`;
    if (PROIBIDO.test(alvo)) fail(`${b.path}: promessa proibida em — ${p.pergunta}`);

    for (const valor of alvo.match(/R\$\s?[\d.]+,\d{2}/g) ?? []) {
      if (!precos.includes(valor.replace(/\s/g, " "))) {
        fail(`${b.path}: valor "${valor}" não existe em src/lib/precosConfig.ts`);
      }
    }
  }
}

console.log("── check:conversational-intent ──");
console.log(
  `  ✓ ${blocos.length} bloco(s), ${blocos.reduce((s, b) => s + b.perguntas.length, 0)} pergunta(s) avaliada(s)`,
);
if (falhas.length) {
  console.error(`\n✗ ${falhas.length} falha(s):`);
  for (const f of falhas) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log("  ✓ intenção conversacional íntegra (nacional no informativo, local só na conversão)");
