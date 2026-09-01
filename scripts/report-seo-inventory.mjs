#!/usr/bin/env node
/**
 * INVENTÁRIO SEO POR URL — fonte do painel /admin/seo.
 *
 * Lê o manifesto curado (scripts/lib/curated-urls.mjs) e, quando existe build
 * em `dist/`, extrai do HTML SSR real: title, description, canonical, robots
 * e tipos de JSON-LD. Nada é estimado: sem HTML, o campo fica null e a URL é
 * marcada como `semHtml` (o painel avisa em vez de inventar).
 *
 * Saída: public/seo-inventory.json
 * Uso:  node scripts/report-seo-inventory.mjs [dist] [--check]
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { ACTIVE_SITEMAPS } from "./lib/curated-urls.mjs";

const args = process.argv.slice(2);
const CHECK = args.includes("--check");
const DIST = resolve(process.cwd(), args.find((a) => !a.startsWith("--")) ?? "dist");
const OUT = resolve(process.cwd(), "public/seo-inventory.json");

/** Tipo editorial derivado do sitemap de origem + prefixo da rota. */
function tipoDe(path, sitemap) {
  if (path.startsWith("/blog")) return "artigo";
  if (path.startsWith("/glossario")) return "glossario";
  if (path.startsWith("/ferramentas")) return "ferramenta";
  if (path.startsWith("/decisoes")) return "guia";
  if (path.startsWith("/problemas")) return "problema";
  if (path.startsWith("/servicos") || sitemap.includes("servicos")) return "servico";
  if (path.startsWith("/solucoes")) return "solucao";
  if (path.startsWith("/equipamentos")) return "equipamento";
  if (path.startsWith("/bairros") || sitemap.includes("bairros")) return "bairro";
  if (sitemap.includes("regioes")) return "regiao";
  return "pilar";
}

function lerHtml(path) {
  const file = resolve(DIST, `.${path === "/" ? "" : path}/index.html`);
  return existsSync(file) ? readFileSync(file, "utf8") : null;
}

function extrair(html) {
  const m = (re) => html.match(re)?.[1]?.trim() ?? null;
  const jsonld = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
    .flatMap((x) => {
      try {
        const p = JSON.parse(x[1]);
        return Array.isArray(p) ? p : [p];
      } catch {
        return [];
      }
    })
    .flatMap((n) => (Array.isArray(n?.["@graph"]) ? n["@graph"] : [n]))
    .flatMap((n) => (Array.isArray(n?.["@type"]) ? n["@type"] : [n?.["@type"]]))
    .filter(Boolean);
  return {
    title: m(/<title[^>]*>([^<]*)<\/title>/i),
    description: m(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i),
    canonical: m(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i),
    robots: m(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i),
    schemas: [...new Set(jsonld)],
  };
}

const urls = [];
for (const [sitemap, entries] of ACTIVE_SITEMAPS) {
  for (const e of entries) {
    const html = lerHtml(e.path);
    const dados = html ? extrair(html) : { title: null, description: null, canonical: null, robots: null, schemas: [] };
    const avisos = [];
    if (html) {
      if (!dados.title) avisos.push("title ausente");
      else if (dados.title.length > 60) avisos.push(`title com ${dados.title.length} caracteres (>60)`);
      if (!dados.description) avisos.push("description ausente");
      else if (dados.description.length > 160) avisos.push(`description com ${dados.description.length} caracteres (>160)`);
      if (!dados.canonical) avisos.push("canonical ausente");
      if (/noindex/i.test(dados.robots ?? "")) avisos.push("robots noindex em URL do sitemap");
      if (dados.schemas.length === 0) avisos.push("sem JSON-LD");
    }
    urls.push({
      path: e.path,
      sitemap,
      tipo: tipoDe(e.path, sitemap),
      priority: e.priority ?? null,
      changefreq: e.changefreq ?? null,
      semHtml: !html,
      ...dados,
      avisos,
      completude: html ? Math.round(((dados.title ? 1 : 0) + (dados.description ? 1 : 0) + (dados.canonical ? 1 : 0) + (dados.schemas.length ? 1 : 0)) * 25) : null,
    });
  }
}

const relatorio = {
  geradoEm: new Date().toISOString(),
  dist: DIST.replace(process.cwd(), "."),
  total: urls.length,
  comHtml: urls.filter((u) => !u.semHtml).length,
  comAviso: urls.filter((u) => u.avisos.length > 0).length,
  urls,
};

if (CHECK) {
  const criticos = urls.filter((u) => !u.semHtml && u.avisos.some((a) => a.includes("ausente") || a.includes("noindex")));
  if (criticos.length) {
    console.error(`✖ ${criticos.length} URL(s) com metadata crítica ausente:`);
    criticos.slice(0, 25).forEach((u) => console.error(`  · ${u.path} — ${u.avisos.join("; ")}`));
    process.exit(1);
  }
  console.log(`✔ inventário SEO sem pendência crítica (${relatorio.comHtml}/${relatorio.total} com HTML).`);
  process.exit(0);
}

writeFileSync(OUT, `${JSON.stringify(relatorio, null, 2)}\n`);
console.log(
  `[seo:inventory] ${relatorio.total} URL(s) · com HTML ${relatorio.comHtml} · com aviso ${relatorio.comAviso} → public/seo-inventory.json`,
);
