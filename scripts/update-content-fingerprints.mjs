#!/usr/bin/env node
/**
 * LASTMOD POR HASH DE CONTEÚDO REAL
 *
 * Percorre as URLs curadas, calcula o fingerprint do HTML SSR em `dist/` e
 * atualiza `config/content-fingerprints.json` (fonte determinística de
 * `lastmod`):
 *
 *   - hash igual ao registrado  → lastmod PRESERVADO (nada muda no sitemap);
 *   - hash diferente            → lastmod = data de hoje (mudança material);
 *   - rota nova                 → registra hash e a data de hoje;
 *   - HTML ausente no dist      → mantém o registro anterior (fail-safe).
 *
 * Modos:
 *   node scripts/update-content-fingerprints.mjs            # atualiza
 *   node scripts/update-content-fingerprints.mjs --check    # gate (exit 1 se desatualizado)
 *
 * Assim é impossível "atualizar o sitemap inteiro a cada publicação": só a
 * página cujo conteúdo servido mudou recebe data nova.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fingerprintDaRota } from "./lib/content-fingerprint.mjs";
import { LASTMOD } from "./lib/lastmod.mjs";

const args = process.argv.slice(2);
const CHECK = args.includes("--check");
const DIST = resolve(process.cwd(), args.find((a) => !a.startsWith("--")) ?? "dist");
const STORE = resolve(process.cwd(), "config/content-fingerprints.json");
const HOJE = new Date().toISOString().slice(0, 10);

const anterior = existsSync(STORE) ? JSON.parse(readFileSync(STORE, "utf8")) : { geradoEm: null, rotas: {} };
const rotasAnteriores = anterior.rotas ?? {};

/** Universo: URLs realmente publicadas nos sitemaps + declaradas + registradas. */
function pathsDosSitemaps() {
  const dir = resolve(process.cwd(), "public");
  const out = [];
  for (const f of readdirSync(dir).filter((x) => x.startsWith("sitemap") && x.endsWith(".xml"))) {
    const xml = readFileSync(resolve(dir, f), "utf8");
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const u = m[1].trim();
      if (u.endsWith(".xml")) continue;
      try {
        out.push(new URL(u).pathname.replace(/(.)\/$/, "$1"));
      } catch {
        /* ignora loc inválido */
      }
    }
  }
  return out;
}

const universo = new Set([...pathsDosSitemaps(), ...Object.keys(LASTMOD), ...Object.keys(rotasAnteriores)]);

const rotas = {};
const mudou = [];
const preservadas = [];
const semHtml = [];

for (const path of [...universo].sort()) {
  const hash = fingerprintDaRota(DIST, path);
  const reg = rotasAnteriores[path];
  if (!hash) {
    semHtml.push(path);
    if (reg) rotas[path] = reg;
    continue;
  }
  if (!reg) {
    rotas[path] = { hash, lastmod: LASTMOD[path] ?? HOJE, origem: "bootstrap" };
    continue;
  }
  if (reg.hash === hash) {
    rotas[path] = { ...reg, hash };
    preservadas.push(path);
  } else {
    rotas[path] = { hash, lastmod: HOJE, origem: "hash-change" };
    mudou.push(path);
  }
}

const saida = { geradoEm: new Date().toISOString(), dist: DIST.replace(process.cwd(), "."), rotas };
const serializado = `${JSON.stringify(saida, (k, v) => (k === "geradoEm" || k === "dist" ? v : v), 2)}\n`;

console.log("── lastmod por hash de conteúdo ──");
console.log(`  rotas avaliadas: ${Object.keys(rotas).length}`);
console.log(`  conteúdo alterado (lastmod → ${HOJE}): ${mudou.length}`);
for (const p of mudou) console.log(`    ~ ${p}`);
console.log(`  inalteradas (lastmod preservado): ${preservadas.length}`);
if (semHtml.length) console.log(`  sem HTML em ${DIST}: ${semHtml.length} (registro anterior mantido)`);

if (CHECK) {
  const atualEmDisco = existsSync(STORE) ? readFileSync(STORE, "utf8") : "";
  const comparavel = (txt) => {
    try {
      return JSON.stringify(JSON.parse(txt).rotas);
    } catch {
      return null;
    }
  };
  if (comparavel(atualEmDisco) !== JSON.stringify(rotas)) {
    console.error(
      "\n✗ fingerprints desatualizados: rode `npm run lastmod:fingerprint` e faça commit de config/content-fingerprints.json",
    );
    process.exit(1);
  }
  console.log("\n✔ fingerprints em dia — nenhum lastmod artificial.");
  process.exit(0);
}

mkdirSync(dirname(STORE), { recursive: true });
writeFileSync(STORE, serializado);
console.log(`\n✔ ${STORE.replace(process.cwd(), ".")} atualizado.`);
