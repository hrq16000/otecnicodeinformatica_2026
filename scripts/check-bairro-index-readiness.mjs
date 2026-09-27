#!/usr/bin/env node
/**
 * Gate de prontidão para promoção de bairros ao índice.
 * Ondas autorais: todo loteLocalN com N >= 6 em src/lib/localIndexPolicy.json.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const policy = JSON.parse(readFileSync("src/lib/localIndexPolicy.json", "utf8"));
const paths = Object.entries(policy)
  .filter(([key, value]) => /^loteLocal\d+$/.test(key) && Number(key.replace("loteLocal", "")) >= 6 && Array.isArray(value))
  .sort(([a], [b]) => Number(a.replace("loteLocal", "")) - Number(b.replace("loteLocal", "")))
  .flatMap(([, value]) => value);
const dir = "src/pages/bairros";
const sources = readdirSync(dir)
  .filter((f) => f.endsWith(".tsx"))
  .map((file) => ({ file, src: readFileSync(join(dir, file), "utf8") }));

const errors = [];
const pages = [];

function fieldTemplate(src, field) {
  return src.match(new RegExp(field + ":\\s*`([\\s\\S]*?)`"))?.[1] ?? "";
}
function arrayItems(src, field) {
  const body = src.match(new RegExp(field + ":\\s*\\[([\\s\\S]*?)\\]"))?.[1] ?? "";
  return [...body.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
}
function normalize(text) {
  return text.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function shingles(text, n = 4) {
  const words = normalize(text).split(" ").filter(Boolean);
  const set = new Set();
  for (let i = 0; i + n <= words.length; i += 1) set.add(words.slice(i, i + n).join(" "));
  return set;
}
function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter += 1;
  return inter / (a.size + b.size - inter);
}

const forbidden = [
  /conta com demanda constante por servicos de informatica/i,
  /resolvendo a maioria dos problemas na primeira visita/i,
  /atendimento em 30 60 min/i,
  /chegamos em \d/i,
  /cidade vizinha de curitiba com acesso rapido pela regiao/i,
];

for (const path of paths) {
  const slug = path.replace("/bairros/", "");
  const matches = sources.filter(({ src }) => src.includes('slug: "' + slug + '"'));
  if (matches.length !== 1) {
    errors.push(path + ": esperado exatamente 1 arquivo-fonte; encontrados " + matches.length + ".");
    continue;
  }

  const { file, src } = matches[0];
  const descricao = fieldTemplate(src, "descricaoLonga");
  const exclusivo = fieldTemplate(src, "conteudoExclusivo");
  const dicas = fieldTemplate(src, "dicasLocais");
  const problemas = arrayItems(src, "problemasComuns");
  const referencias = arrayItems(src, "pontosReferencia");
  const servicos = arrayItems(src, "servicosDestaque");
  const combined = [descricao, exclusivo, dicas, ...problemas, ...referencias, ...servicos].join(" ");
  const words = normalize(combined).split(" ").filter(Boolean).length;

  if (!descricao || !exclusivo || !dicas) errors.push(path + ": faltam blocos autorais obrigatórios.");
  if (words < 350) errors.push(path + ": " + words + " palavras úteis; mínimo 350.");
  if (problemas.length < 4) errors.push(path + ": problemasComuns insuficiente (" + problemas.length + ").");
  if (referencias.length < 2) errors.push(path + ": pontosReferencia insuficiente (" + referencias.length + ").");
  const normalizedSource = normalize(src);
  for (const rx of forbidden) if (rx.test(normalizedSource)) errors.push(path + ": frase-template proibida: " + rx + ".");

  pages.push({ path, file, words, sh: shingles(combined) });
}

for (let i = 0; i < pages.length; i += 1) {
  for (let j = i + 1; j < pages.length; j += 1) {
    const score = jaccard(pages[i].sh, pages[j].sh);
    if (score > 0.35) {
      errors.push(pages[i].path + " × " + pages[j].path + ": Jaccard4 " + score.toFixed(3) + " > 0.35.");
    }
  }
}

for (const p of pages) console.log("[index-readiness] OK " + p.path + " — " + p.words + " palavras — " + p.file);

if (errors.length) {
  console.error("[check-bairro-index-readiness] " + errors.length + " falha(s):");
  for (const e of errors) console.error("  ✗ " + e);
  process.exit(1);
}

console.log("[check-bairro-index-readiness] OK — " + pages.length + " bairros autorais das ondas >= 6 aptos ao índice.");
