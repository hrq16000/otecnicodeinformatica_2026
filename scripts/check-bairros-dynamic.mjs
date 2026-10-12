#!/usr/bin/env node
/**
 * Paridade fail-closed da migração de bairros 1:N para rota dinâmica.
 * O registry continua sendo fonte de verdade; 4 aliases 301 ficam explícitos.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";

const registry = readFileSync("src/legacyRouteElements.tsx", "utf8");
const expected = [...registry.matchAll(/^\s*"\/bairros\/([^"]+)":\s*true\b/gm)].map(x => x[1]);
const unique = new Set(expected);
if (expected.length === 0 || unique.size !== expected.length) {
  throw new Error("[bairros] Registro vazio ou com slugs duplicados");
}
const file = "src/routes/bairros_.$slug.tsx";
if (!existsSync(file)) throw new Error("[bairros] Rota dinâmica não existe");
const code = readFileSync(file, "utf8");
if (!code.includes("legacyRouteElements") || !code.includes('throw notFound()')) {
  throw new Error("[bairros] Dinâmica deve preservar registro e retornar 404");
}
const aliases = [
  "borda-campo-sjp",
  "jardim-claudia-ii-pinhais",
  "thomaz-coelho-ii",
  "vila-maria-antonieta-pinhais",
];
for (const alias of aliases) {
  const p = `src/routes/bairros_.${alias}.tsx`;
  if (!existsSync(p) || !readFileSync(p, "utf8").includes("statusCode: 301")) {
    throw new Error(`[bairros] Alias 301 perdido: ${alias}`);
  }
}
const unexpected = readdirSync("src/routes")
  .filter(x => /^bairros_\.[^/]+\.tsx$/.test(x) && x !== "bairros_.$slug.tsx")
  .map(x => x.slice("bairros_.".length, -".tsx".length))
  .filter(x => !aliases.includes(x));
if (unexpected.length) throw new Error(`[bairros] Rotas estáticas duplicando a dinâmica: ${unexpected.join(", ")}`);
console.log(`[bairros] OK: ${unique.size} destinos originais + ${aliases.length} redirects 301; 1 rota dinâmica, 404 preservado.`);
