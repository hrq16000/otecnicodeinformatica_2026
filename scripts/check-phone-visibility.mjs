#!/usr/bin/env node
/**
 * GATE — nenhum telefone/WhatsApp em texto legível.
 *
 * A política do portal é: o número canônico existe apenas dentro de `wa.me`
 * e do campo `telephone` do JSON-LD. Ele NUNCA pode aparecer como texto
 * visível na interface (rodapé, botões, páginas de serviço, hero, FAQ).
 *
 * Este gate roda sobre o HTML SSR já construído (`dist/`), portanto pega
 * tanto o que veio do React quanto o que veio de shell estático.
 *
 * Uso: node scripts/check-phone-visibility.mjs [dist]
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = process.argv[2] ?? "dist";

/** Números escritos por extenso, em qualquer formatação usual brasileira. */
const PADROES = [
  /\(?\d{2}\)?[\s.-]?9?\d{4}[\s.-]?\d{4}/g, // (41) 99999-9999 · 41999999999
  /\+55[\s.-]?\d{2}[\s.-]?9?\d{4}[\s.-]?\d{4}/g, // +55 41 99999-9999
];

/** Placeholders de input e exemplos didáticos são permitidos. */
const PERMITIDOS = [/99999[\s.-]?9999/, /00000[\s.-]?0000/, /0800/];

function arquivos(dir) {
  let out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out = out.concat(arquivos(p));
    else if (p.endsWith(".html")) out.push(p);
  }
  return out;
}

/** Remove tudo que não é texto visível: scripts, JSON-LD, atributos, hrefs. */
function textoVisivel(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ");
}

const falhas = [];
let paginas = 0;

for (const file of arquivos(DIST)) {
  // O bundle de servidor não é interface; só o HTML entregue ao usuário.
  if (file.includes(`${DIST}/server/`) || file.includes("/_ssr/")) continue;
  paginas += 1;
  const texto = textoVisivel(readFileSync(file, "utf8"));
  for (const re of PADROES) {
    for (const achado of texto.match(re) ?? []) {
      const limpo = achado.trim();
      if (PERMITIDOS.some((p) => p.test(limpo))) continue;
      // Sequências de dígitos que não são telefone (datas, IDs longos).
      const digitos = limpo.replace(/\D/g, "");
      if (digitos.length < 10 || digitos.length > 13) continue;
      falhas.push(`${file}: telefone em texto legível → "${limpo}"`);
    }
  }
}

if (falhas.length > 0) {
  console.error("✖ check:phone-visibility falhou — número visível na interface:");
  for (const f of [...new Set(falhas)].slice(0, 40)) console.error(" - " + f);
  console.error("\nO contato acontece só pelo fluxo de triagem/WhatsApp (wa.me).");
  process.exit(1);
}

console.log(`✔ check:phone-visibility — nenhum telefone em texto legível em ${paginas} página(s).`);
