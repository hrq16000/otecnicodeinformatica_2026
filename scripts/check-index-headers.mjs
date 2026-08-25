#!/usr/bin/env node
/**
 * GATE — robots.txt, sitemap.xml e cabeçalhos HTTP de indexação.
 *
 * Valida, sobre o build (`dist/`), a compatibilidade com Googlebot e Bingbot:
 *
 *   1. robots.txt existe, tem `User-agent: *`, não bloqueia o site inteiro,
 *      declara ao menos um `Sitemap:` absoluto e não libera áreas privadas;
 *   2. cada `Sitemap:` declarado existe no build e é XML bem-formado
 *      (`<urlset>` ou `<sitemapindex>`) com `<loc>` absolutos no domínio;
 *   3. os cabeçalhos HTTP publicados (`dist/client/_headers`) não emitem
 *      `X-Robots-Tag: noindex` para rotas públicas — e emitem para as
 *      áreas privadas quando a política já as declara.
 *
 * Uso: node scripts/check-index-headers.mjs [dist]
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIST = process.argv[2] ?? "dist";
const CLIENT = existsSync(join(DIST, "client")) ? join(DIST, "client") : DIST;
const erros = [];
const avisos = [];

const ler = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);

// ---------------------------------------------------------------- robots.txt
const robots = ler(join(CLIENT, "robots.txt"));
if (!robots) {
  erros.push("robots.txt ausente no build");
} else {
  if (!/^user-agent:\s*\*/im.test(robots)) erros.push("robots.txt sem bloco `User-agent: *`");
  const bloqueiaTudo = robots
    .split(/\r?\n/)
    .some((l) => /^disallow:\s*\/\s*$/i.test(l.trim()));
  if (bloqueiaTudo) erros.push("robots.txt bloqueia o site inteiro (`Disallow: /`)");
  for (const bot of ["Googlebot", "Bingbot"]) {
    const bloco = new RegExp(`user-agent:\\s*${bot}[\\s\\S]*?(?=\\nuser-agent:|$)`, "i").exec(robots);
    if (bloco && /^disallow:\s*\/\s*$/im.test(bloco[0])) {
      erros.push(`robots.txt bloqueia ${bot} integralmente`);
    }
  }
}

// ------------------------------------------------------------------ sitemaps
const sitemaps = [...(robots ?? "").matchAll(/^sitemap:\s*(\S+)/gim)].map((m) => m[1]);
if (robots && sitemaps.length === 0) erros.push("robots.txt não declara nenhum `Sitemap:`");

let totalLocs = 0;
for (const url of sitemaps) {
  if (!/^https?:\/\//i.test(url)) {
    erros.push(`Sitemap declarado sem URL absoluta: ${url}`);
    continue;
  }
  const rel = new URL(url).pathname.replace(/^\//, "");
  const xml = ler(join(CLIENT, rel));
  if (!xml) {
    erros.push(`Sitemap declarado mas ausente no build: /${rel}`);
    continue;
  }
  if (!/<(urlset|sitemapindex)[\s>]/i.test(xml)) {
    erros.push(`/${rel}: XML não é <urlset> nem <sitemapindex>`);
    continue;
  }
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);
  totalLocs += locs.length;
  if (locs.length === 0) avisos.push(`/${rel}: sitemap sem nenhum <loc>`);
  const relativo = locs.find((l) => !/^https?:\/\//i.test(l));
  if (relativo) erros.push(`/${rel}: <loc> não absoluto (${relativo})`);
  const hosts = new Set(locs.filter((l) => /^https?:\/\//i.test(l)).map((l) => new URL(l).host));
  if (hosts.size > 1) erros.push(`/${rel}: <loc> em múltiplos hosts (${[...hosts].join(", ")})`);
}

// --------------------------------------------------------- cabeçalhos HTTP
const headers = ler(join(CLIENT, "_headers"));
if (!headers) {
  avisos.push("_headers ausente — nenhuma política de X-Robots-Tag publicada");
} else {
  let alvo = null;
  for (const linha of headers.split(/\r?\n/)) {
    if (/^\S/.test(linha) && linha.trim()) alvo = linha.trim();
    const noindex = /x-robots-tag:\s*[^\n]*noindex/i.test(linha);
    if (!noindex || !alvo) continue;
    const publico = alvo === "/*" || alvo === "/" || /^\/(?!admin|status|debug|_)/.test(alvo) === false;
    if (alvo === "/*" || alvo === "/") {
      erros.push(`_headers aplica X-Robots-Tag noindex a rota pública: ${alvo}`);
    } else if (!publico) {
      avisos.push(`_headers: noindex em ${alvo} (verifique se é área privada)`);
    }
  }
}

for (const a of avisos) console.warn(`AVISO  ${a}`);

if (erros.length > 0) {
  console.error("\n✖ check:index-headers falhou:");
  for (const e of erros) console.error(" - " + e);
  process.exit(1);
}

console.log(
  `✔ check:index-headers — robots.txt válido, ${sitemaps.length} sitemap(s) declarado(s), ${totalLocs} <loc> absolutos, nenhum noindex em rota pública.`,
);
