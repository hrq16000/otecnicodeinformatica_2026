/**
 * FINGERPRINT DE CONTEÚDO REAL
 *
 * Calcula um hash determinístico do conteúdo *visível* de uma página já
 * renderizada em `dist/<path>/index.html` (SSR), para que o `lastmod` do
 * sitemap só mude quando o texto servido ao crawler mudar de fato.
 *
 * Normalização (tudo que muda a cada build sem mudar conteúdo é removido):
 *  - <script>, <style>, <noscript>, comentários HTML;
 *  - <head> inteiro (contém hashes de asset, og:image?v=, build version);
 *  - atributos (classes utilitárias, ids gerados, data-*);
 *  - espaços redundantes.
 *
 * O JSON-LD entra separado e normalizado, porque mudança de schema também é
 * mudança material para busca.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const stripBlocks = (html) =>
  html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ");

/** Texto visível do <body>, sem tags nem atributos. */
export function extrairTextoVisivel(html) {
  const body = html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
  return stripBlocks(body)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** JSON-LD normalizado (ordem de chaves estável) para entrar no hash. */
export function extrairJsonLd(html) {
  const blocos = [
    ...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
  ];
  const nos = [];
  for (const [, raw] of blocos) {
    try {
      nos.push(JSON.parse(raw.trim()));
    } catch {
      nos.push({ __invalid: raw.trim().slice(0, 200) });
    }
  }
  const ordenar = (v) => {
    if (Array.isArray(v)) return v.map(ordenar);
    if (v && typeof v === "object") {
      return Object.fromEntries(
        Object.keys(v)
          .sort()
          .map((k) => [k, ordenar(v[k])]),
      );
    }
    return v;
  };
  return JSON.stringify(ordenar(nos));
}

/** Hash sha256 (12 hex) do conteúdo material de uma página HTML. */
export function fingerprintDeHtml(html) {
  const material = `${extrairTextoVisivel(html)}\n--jsonld--\n${extrairJsonLd(html)}`;
  return createHash("sha256").update(material).digest("hex").slice(0, 12);
}

/** Lê o HTML prerenderizado de uma rota dentro de `distDir`. */
export function lerHtmlDaRota(distDir, path) {
  const rel = path === "/" ? "index.html" : `${path.replace(/^\//, "").replace(/\/$/, "")}/index.html`;
  try {
    return readFileSync(resolve(distDir, rel), "utf8");
  } catch {
    return null;
  }
}

export function fingerprintDaRota(distDir, path) {
  const html = lerHtmlDaRota(distDir, path);
  return html ? fingerprintDeHtml(html) : null;
}
