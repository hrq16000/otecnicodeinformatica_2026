/**
 * GATE — árvore de rotas do TanStack Router.
 *
 * O `src/routeTree.gen.ts` é gerado pelo plugin do TanStack Router. Se o build
 * rodar sem ele (checkout limpo, cache corrompido), o bundle quebra em runtime
 * com rotas ausentes. Este gate falha imediatamente antes do build.
 *
 * Uso: node scripts/check-route-tree.mjs
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const GEN = "src/routeTree.gen.ts";

if (!existsSync(GEN)) {
  console.error(`[route-tree] ${GEN} não encontrado — rode "vite dev" ou "tsr generate" antes do build.`);
  process.exit(1);
}

const gen = readFileSync(GEN, "utf8");
if (!gen.includes("createFileRoute") && !gen.includes("routeTree")) {
  console.error(`[route-tree] ${GEN} existe mas parece inválido/truncado.`);
  process.exit(1);
}

// Toda rota em src/routes precisa estar referenciada na árvore gerada.
const walk = (dir) =>
  readdirSync(dir).flatMap((e) => {
    const full = join(dir, e);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const ROUTES = "src/routes";
const routeFiles = walk(ROUTES);
const faltando = routeFiles
  .filter((f) => /\.tsx?$/.test(f) && !f.endsWith(".d.ts"))
  .map((f) => relative(ROUTES, f).split(sep).join("/").replace(/\.tsx?$/, ""))
  .filter((id) => !gen.includes(`./routes/${id}`));

if (faltando.length > 0) {
  console.error(`[route-tree] ${faltando.length} rota(s) fora da árvore gerada:`);
  for (const f of faltando.slice(0, 20)) console.error(`  · src/routes/${f}`);
  console.error('Regenere com "npm run routes:generate".');
  process.exit(1);
}

console.log(`[route-tree] OK — árvore gerada cobre ${routeFiles.length} arquivo(s) de rota.`);
