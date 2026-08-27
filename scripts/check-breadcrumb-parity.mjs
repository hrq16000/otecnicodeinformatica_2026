#!/usr/bin/env node
/**
 * GATE FAIL-FAST — paridade BreadcrumbList (JSON-LD) × trilha visível.
 *
 * Complementa scripts/check-breadcrumb-schema.mjs: aquele valida as páginas
 * serviço × local contra o mapa curado; este varre TODO o HTML estático gerado
 * e exige, para cada página que declara BreadcrumbList:
 *
 *   1. exatamente 1 BreadcrumbList por página (determinismo do JSON-LD);
 *   2. `position` sequencial 1..N sem buracos nem repetição;
 *   3. todos os rótulos presentes, na MESMA ORDEM, na trilha visível
 *      (<nav aria-label="breadcrumb"> / [data-breadcrumb]);
 *   4. último nível apontando para o canonical declarado da página;
 *   5. nenhum item da trilha visível ausente do JSON-LD (paridade 1:1).
 *
 * Uso: node scripts/check-breadcrumb-parity.mjs [dist]
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const DIST = resolve(process.argv[2] || "dist");
if (!existsSync(DIST)) {
  console.error(`BLOQUEADO: ${DIST} não existe — rode "npm run build" antes.`);
  process.exit(1);
}

const paginas = [];
const andar = (dir) => {
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) andar(caminho);
    else if (nome === "index.html" || nome.endsWith(".html")) paginas.push(caminho);
  }
};
andar(DIST);

const flatten = (n) =>
  Array.isArray(n)
    ? n.flatMap(flatten)
    : n && typeof n === "object"
      ? Array.isArray(n["@graph"])
        ? n["@graph"].flatMap(flatten)
        : [n]
      : [];

const norm = (s) =>
  String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&[a-z]+;/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Extrai os rótulos da trilha visível, na ordem em que aparecem no HTML. */
function trilhaVisivel(html) {
  const blocos = [
    ...html.matchAll(/<nav[^>]*aria-label="[^"]*breadcrumb[^"]*"[^>]*>([\s\S]*?)<\/nav>/gi),
    ...html.matchAll(/<[a-z]+[^>]*data-breadcrumb[^>]*>([\s\S]*?)<\/[a-z]+>/gi),
  ];
  if (!blocos.length) return null;
  const bruto = blocos[0][1];
  return bruto
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .split(/<\/(?:li|a|span)>/i)
    .map((p) => norm(p.replace(/<[^>]+>/g, " ")))
    .filter(Boolean);
}

const erros = [];
let comBreadcrumb = 0;

for (const arquivo of paginas) {
  const rel = relative(DIST, arquivo).replace(/\\/g, "/");
  const html = readFileSync(arquivo, "utf8");
  const blocos = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => {
      try {
        return JSON.parse(m[1]);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  const crumbs = blocos.flatMap(flatten).filter((n) => n["@type"] === "BreadcrumbList");
  if (!crumbs.length) continue;
  comBreadcrumb += 1;

  if (crumbs.length > 1) {
    erros.push(`${rel}: ${crumbs.length} BreadcrumbList na mesma página (esperado 1)`);
    continue;
  }

  const itens = crumbs[0].itemListElement ?? [];
  if (itens.length < 2) {
    erros.push(`${rel}: BreadcrumbList com ${itens.length} nível(is) — mínimo 2`);
    continue;
  }

  const posicoes = itens.map((i) => Number(i.position));
  const esperado = itens.map((_, i) => i + 1);
  if (posicoes.join(",") !== esperado.join(",")) {
    erros.push(`${rel}: positions ${posicoes.join(",")} — esperado ${esperado.join(",")}`);
  }

  const nomes = itens.map((i) => norm(i.name ?? i.item?.name));
  if (nomes.some((n) => !n)) erros.push(`${rel}: nível sem "name" no JSON-LD`);

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  const ultimo = itens.at(-1);
  const ultimoItem = typeof ultimo.item === "string" ? ultimo.item : ultimo.item?.["@id"];
  if (canonical && ultimoItem && ultimoItem.replace(/\/$/, "") !== canonical.replace(/\/$/, "")) {
    erros.push(`${rel}: último nível "${ultimoItem}" ≠ canonical "${canonical}"`);
  }

  const visivel = trilhaVisivel(html);
  if (!visivel) {
    erros.push(`${rel}: BreadcrumbList declarado sem trilha visível (nav[aria-label=breadcrumb] ou [data-breadcrumb])`);
    continue;
  }

  // Ordem: os rótulos do schema precisam aparecer na trilha visível na mesma sequência.
  let cursor = -1;
  for (const nome of nomes) {
    const idx = visivel.findIndex((v, i) => i > cursor && (v === nome || v.includes(nome)));
    if (idx === -1) {
      erros.push(`${rel}: rótulo "${nome}" ausente ou fora de ordem na trilha visível`);
      break;
    }
    cursor = idx;
  }

  // Paridade inversa: nada exclusivo da trilha visível.
  for (const v of visivel) {
    if (!nomes.some((n) => v === n || v.includes(n) || n.includes(v))) {
      erros.push(`${rel}: item visível "${v}" não existe no BreadcrumbList`);
    }
  }
}

if (erros.length) {
  console.error(`BLOQUEADO — paridade de breadcrumb inválida em ${erros.length} verificação(ões):`);
  erros.slice(0, 40).forEach((e) => console.error(`  • ${e}`));
  if (erros.length > 40) console.error(`  … +${erros.length - 40}`);
  process.exit(1);
}

console.log(
  `OK — BreadcrumbList determinístico e 1:1 com a trilha visível em ${comBreadcrumb} página(s) (${paginas.length} HTML varridos).`,
);
