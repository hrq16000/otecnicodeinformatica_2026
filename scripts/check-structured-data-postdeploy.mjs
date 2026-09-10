#!/usr/bin/env node
/**
 * VALIDAÇÃO PÓS-DEPLOY DOS DADOS ESTRUTURADOS.
 *
 * Garante que o HTML REALMENTE SERVIDO das URLs editoriais curadas contenha
 * as marcações esperadas:
 *   • um tipo de artigo: BlogPosting, Article ou TechArticle;
 *   • FAQPage (perguntas próprias da página).
 *
 * Duas fontes possíveis, nesta ordem:
 *   1. HTTP real — `--base=https://dominio` ou env DEPLOY_BASE_URL/SSR_BASE_URL;
 *   2. build local — `dist/<path>/index.html` (padrão).
 *
 * Fail-closed: HTML ausente, JSON-LD ausente ou tipo faltando reprova.
 *
 * Uso:
 *   node scripts/check-structured-data-postdeploy.mjs
 *   node scripts/check-structured-data-postdeploy.mjs --base=https://otecnicodeinformatica.com.br
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { CURATED_PATHS } from "./lib/curated-urls.mjs";

const ROOT = process.cwd();
const argv = process.argv.slice(2);
const argBase = argv.find((a) => a.startsWith("--base="))?.slice(7);
const BASE = (argBase ?? process.env.DEPLOY_BASE_URL ?? process.env.SSR_BASE_URL ?? "").replace(/\/$/, "");
const distPadrao = existsSync(resolve(ROOT, "dist/client")) ? "dist/client" : "dist";
const DIST = resolve(ROOT, argv.find((a) => a.startsWith("--dist="))?.slice(7) ?? distPadrao);

const ARTIGO_TIPOS = ["BlogPosting", "Article", "TechArticle"];
const alvos = CURATED_PATHS.filter((p) => p.startsWith("/blog/"));

function tiposDe(html) {
  return [
    ...new Set(
      [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
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
        .filter(Boolean),
    ),
  ];
}

async function htmlDe(path) {
  if (BASE) {
    const res = await fetch(`${BASE}${path}`, { headers: { "user-agent": "otdi-structured-data-check" } });
    if (!res.ok) return { erro: `HTTP ${res.status}` };
    return { html: await res.text() };
  }
  const file = resolve(DIST, `.${path}/index.html`);
  if (!existsSync(file)) return { erro: "HTML ausente no build (dist)" };
  return { html: readFileSync(file, "utf8") };
}

const falhas = [];
let verificadas = 0;

for (const path of alvos) {
  const { html, erro } = await htmlDe(path);
  if (erro) {
    falhas.push({ path, motivo: erro });
    continue;
  }
  verificadas += 1;
  const tipos = tiposDe(html);
  const faltando = [];
  if (!ARTIGO_TIPOS.some((t) => tipos.includes(t))) faltando.push(`um de ${ARTIGO_TIPOS.join("/")}`);
  if (!tipos.includes("FAQPage")) faltando.push("FAQPage");
  if (faltando.length) falhas.push({ path, motivo: `faltando ${faltando.join(" e ")} (presentes: ${tipos.join(", ") || "nenhum"})` });
}

const fonte = BASE ? `HTTP ${BASE}` : `build local ${DIST.replace(ROOT, ".")}`;

if (falhas.length) {
  console.error(`✖ [check:structured-data] ${falhas.length} URL(s) sem os dados estruturados esperados · fonte ${fonte}`);
  falhas.slice(0, 30).forEach((f) => console.error(`  · ${f.path} — ${f.motivo}`));
  process.exit(1);
}

console.log(`✔ [check:structured-data] ${verificadas}/${alvos.length} URL(s) editoriais com artigo + FAQPage no HTML servido · fonte ${fonte}`);
