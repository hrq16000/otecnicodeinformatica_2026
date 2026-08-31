#!/usr/bin/env node
/**
 * VALIDAÇÃO TÉCNICA DO LOTE 4 (Onda 11A) — title, description, canonical,
 * robots e JSON-LD conferidos direto no HTML servido.
 *
 * Uso:
 *   npm run validar:lote4                       # produção (VITE_SITE_DOMAIN)
 *   npm run validar:lote4 -- --base=http://localhost:8080
 *
 * Fail-closed: qualquer campo ausente vira erro explícito; nada é estimado.
 * Saídas: public/editorial-lote4-validacao.json e
 *         docs/relatorio-lote4-validacao.md
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const argv = process.argv.slice(2);
const baseArg = argv.find((a) => a.startsWith("--base="))?.slice(7);
const HOST = (process.env.VITE_SITE_DOMAIN ?? "otecnicodeinformatica.com.br")
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");
const BASE = (baseArg ?? `https://${HOST}`).replace(/\/$/, "");

const URLS = [
  "/blog/boot-uefi-ou-legacy-como-identificar",
  "/blog/ordem-de-boot-na-bios-como-configurar",
  "/blog/windows-reparo-automatico-em-loop",
];

/** Schemas mínimos exigidos para um artigo técnico do Lote 4. */
const SCHEMAS_EXIGIDOS = ["TechArticle", "BreadcrumbList", "FAQPage"];

const tiposDeJsonLd = (html) =>
  [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
    .flatMap((m) => {
      try {
        const p = JSON.parse(m[1]);
        return Array.isArray(p) ? p : [p];
      } catch {
        return [];
      }
    })
    .flatMap((n) => (Array.isArray(n?.["@graph"]) ? n["@graph"] : [n]))
    .flatMap((n) => (Array.isArray(n?.["@type"]) ? n["@type"] : [n?.["@type"]]))
    .filter(Boolean);

async function validar(url) {
  const alvo = `${BASE}${url}`;
  const item = { url, alvo, httpStatus: 0, title: null, description: null, canonical: null, robots: null, schemas: [], erros: [] };
  let html = "";
  try {
    const res = await fetch(alvo, {
      redirect: "follow",
      headers: { "user-agent": "OTecnicoDeInformatica-EditorialBot/1.0 (+https://otecnicodeinformatica.com.br)" },
    });
    item.httpStatus = res.status;
    html = res.ok ? await res.text() : "";
    if (!res.ok) item.erros.push(`HTTP ${res.status}`);
  } catch (e) {
    item.erros.push(`falha de rede: ${String(e).slice(0, 120)}`);
    return item;
  }

  const meta = (re) => html.match(re)?.[1]?.trim() ?? null;
  item.title = meta(/<title[^>]*>([^<]*)<\/title>/i);
  item.description = meta(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  item.canonical = meta(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  item.robots = meta(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
  item.schemas = [...new Set(tiposDeJsonLd(html))];

  if (!item.title) item.erros.push("title ausente");
  else if (item.title.length < 25 || item.title.length > 70) item.erros.push(`title com ${item.title.length} caracteres (ideal 25–70)`);
  if (!item.description) item.erros.push("description ausente");
  else if (item.description.length < 70 || item.description.length > 165)
    item.erros.push(`description com ${item.description.length} caracteres (ideal 70–165)`);
  if (!item.canonical) item.erros.push("canonical ausente");
  else if (!item.canonical.endsWith(url)) item.erros.push(`canonical aponta para ${item.canonical}`);
  if (/noindex/i.test(item.robots ?? "")) item.erros.push("robots noindex (URL não indexável no ambiente consultado)");
  for (const s of SCHEMAS_EXIGIDOS) if (!item.schemas.includes(s)) item.erros.push(`JSON-LD sem ${s}`);

  item.aprovado = item.erros.length === 0;
  return item;
}

const urls = [];
for (const u of URLS) urls.push(await validar(u));

const saida = {
  geradoEm: new Date().toISOString(),
  base: BASE,
  lote: "11A/4",
  schemasExigidos: SCHEMAS_EXIGIDOS,
  total: urls.length,
  aprovadas: urls.filter((u) => u.aprovado).length,
  reprovadas: urls.filter((u) => !u.aprovado).length,
  urls,
};

writeFileSync(resolve("public/editorial-lote4-validacao.json"), `${JSON.stringify(saida, null, 2)}\n`);

mkdirSync(resolve("docs"), { recursive: true });
const md = [
  "# Validação técnica — Lote 4 (Onda 11A)",
  "",
  `Base consultada: ${BASE}`,
  `Gerado em: ${saida.geradoEm}`,
  `Resultado: ${saida.aprovadas}/${saida.total} URLs aprovadas`,
  "",
  "| URL | HTTP | Title | Description | Canonical | Robots | Schemas | Erros |",
  "| --- | --- | --- | --- | --- | --- | --- | --- |",
  ...urls.map(
    (u) =>
      `| ${u.url} | ${u.httpStatus} | ${u.title ? `${u.title.length} car.` : "—"} | ${u.description ? `${u.description.length} car.` : "—"} | ${u.canonical ?? "—"} | ${u.robots ?? "—"} | ${u.schemas.join(", ") || "—"} | ${u.erros.join("; ") || "nenhum"} |`,
  ),
  "",
].join("\n");
writeFileSync(resolve("docs/relatorio-lote4-validacao.md"), `${md}\n`);

console.log(`[lote4] ${saida.aprovadas}/${saida.total} aprovadas em ${BASE}`);
for (const u of urls) console.log(`  · ${u.url} → HTTP ${u.httpStatus} · ${u.erros.join("; ") || "OK"}`);
