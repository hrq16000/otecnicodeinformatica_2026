#!/usr/bin/env node
/**
 * Gate leve: templates locais não podem furar src/lib/localIndexPolicy.json
 * usando flags antigas declaradas dentro de arquivos individuais.
 */
import { readFileSync } from "node:fs";

const erros = [];

const bairro = readFileSync("src/pages/bairros/BairroTemplate.tsx", "utf8");
if (!bairro.includes('resolveLocal(path)')) {
  erros.push("BairroTemplate deve resolver a indexabilidade via resolveLocal(path).");
}
if (/noindex=\{!data\.indexavel\}/.test(bairro)) {
  erros.push("BairroTemplate voltou a usar data.indexavel como fonte de robots.");
}

const servicoBairro = readFileSync(
  "src/pages/servico-bairro/ServicoBairroTemplate.tsx",
  "utf8",
);
if (!/const noindexRota\s*=\s*decisaoLocal\.indexability\s*!==\s*["']index["']\s*;/.test(servicoBairro)) {
  erros.push("ServicoBairroTemplate deve derivar noindex exclusivamente de decisaoLocal.indexability.");
}
if (/noindexRota[^;]*&&\s*!data\.indexable/.test(servicoBairro)) {
  erros.push("ServicoBairroTemplate não pode permitir data.indexable como override da policy.");
}

if (erros.length) {
  console.error(`[check-local-template-policy] ${erros.length} regressão(ões):`);
  for (const erro of erros) console.error(`  ✗ ${erro}`);
  process.exit(1);
}

console.log("[check-local-template-policy] OK — templates locais obedecem à policy central.");
