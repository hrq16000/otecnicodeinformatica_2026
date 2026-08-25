#!/usr/bin/env node
/**
 * SMOKE PÚBLICO DOS OWNERS DA RODADA 4A
 *
 * Valida no HTML SERVIDO (SSR, sem hidratação) de cada owner enriquecido:
 *   200 · robots index,follow · canonical absoluto self · exatamente 1 <h1>
 *   · blocos de enriquecimento presentes no HTML inicial · JSON-LD parseável
 *   e sem @id duplicado · links contextuais como <a href> reais.
 *
 * Também salva um "print" textual do HTML público (snapshot bruto + texto
 * visível) por URL, para servir de evidência do que o crawler recebeu.
 *
 * Uso: node scripts/smoke-owners-4a.mjs [--base=https://...]
 * Saída: reports/smoke-4a/<slug>.html, reports/smoke-4a.json e docs (md).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { BASE_URL } from "./lib/site-env.mjs";
import { extrairTextoVisivel } from "./lib/content-fingerprint.mjs";

const argBase = process.argv.find((a) => a.startsWith("--base="));
const BASE = (argBase ? argBase.slice(7) : process.env.SITE_BASE_URL || BASE_URL).replace(/\/$/, "");

/** Fonte de verdade da rodada: cluster ATP → owner. */
export const OWNERS_4A = [
  { cluster: "A — superaquecimento / desliga sozinho", path: "/problemas/computador-esquentando" },
  { cluster: "B — SSD × HD", path: "/solucoes/ssd" },
  { cluster: "C — RAM ou SSD", path: "/servicos/upgrade-ssd-ram" },
  { cluster: "D — recuperar dados / HD com barulho", path: "/problemas/hd-fazendo-barulho" },
  { cluster: "E — formatar PC / Windows", path: "/servicos/formatacao" },
  { cluster: "F — vírus / malware", path: "/servicos/remocao-de-virus" },
];

const OUT_DIR = resolve(process.cwd(), "reports/smoke-4a");
mkdirSync(OUT_DIR, { recursive: true });

const slug = (p) => p.replace(/^\//, "").replace(/\//g, "_");

function analisarJsonLd(html) {
  const blocos = [
    ...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
  ];
  const tipos = [];
  const ids = [];
  let invalidos = 0;
  const visitar = (n) => {
    if (Array.isArray(n)) return n.forEach(visitar);
    if (!n || typeof n !== "object") return;
    if (n["@type"]) tipos.push(...[].concat(n["@type"]));
    if (n["@id"]) ids.push(n["@id"]);
    for (const v of Object.values(n)) visitar(v);
  };
  for (const [, raw] of blocos) {
    try {
      visitar(JSON.parse(raw.trim()));
    } catch {
      invalidos += 1;
    }
  }
  const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
  return { blocos: blocos.length, tipos: [...new Set(tipos)], invalidos, dupIds: [...new Set(dupIds)] };
}

const resultados = [];

for (const owner of OWNERS_4A) {
  const url = `${BASE}${owner.path}`;
  const linha = { ...owner, url, falhas: [] };
  try {
    const res = await fetch(url, { redirect: "follow", headers: { "cache-control": "no-cache" } });
    const html = await res.text();
    writeFileSync(resolve(OUT_DIR, `${slug(owner.path)}.html`), html);
    const texto = extrairTextoVisivel(html);
    writeFileSync(resolve(OUT_DIR, `${slug(owner.path)}.txt`), texto);

    linha.status = res.status;
    linha.deploymentId = res.headers.get("x-deployment-id") ?? null;
    linha.cache = res.headers.get("cf-cache-status") ?? null;
    if (res.status !== 200) linha.falhas.push(`HTTP ${res.status}`);

    // robots
    const robots = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? "";
    linha.robots = robots || "(ausente)";
    if (!/index/i.test(robots) || /noindex/i.test(robots)) linha.falhas.push(`robots=${robots || "ausente"}`);

    // canonical
    const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] ?? "";
    linha.canonical = canonical || "(ausente)";
    const canonicals = [...html.matchAll(/<link[^>]+rel=["']canonical["']/gi)].length;
    if (canonical !== url) linha.falhas.push(`canonical≠self (${canonical || "ausente"})`);
    if (canonicals > 1) linha.falhas.push(`${canonicals} canonicals`);

    // H1
    const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
    linha.h1 = h1s.length;
    linha.h1Texto = h1s[0]?.[1].replace(/<[^>]+>/g, "").trim().slice(0, 90) ?? "";
    if (h1s.length !== 1) linha.falhas.push(`${h1s.length} H1`);

    // conteúdo enriquecido no HTML inicial (não pós-hidratação)
    const temResposta = /Resposta r[áa]pida/i.test(html);
    const temTabela = /tabela-diagnostica|Como diferenciar|Hip[óo]tese/i.test(html);
    linha.respostaRapida = temResposta;
    linha.tabelaDiagnostica = temTabela;
    if (!temResposta) linha.falhas.push("sem bloco Resposta rápida no SSR");
    if (!temTabela) linha.falhas.push("sem tabela diagnóstica no SSR");
    linha.palavras = texto.split(/\s+/).filter(Boolean).length;

    // links contextuais reais
    const hrefs = [...html.matchAll(/<a\b[^>]*href=["'](\/[^"'#?]*)["']/gi)].map((m) => m[1]);
    linha.linksInternos = new Set(hrefs).size;
    if (linha.linksInternos < 3) linha.falhas.push(`somente ${linha.linksInternos} links internos <a href>`);

    // JSON-LD
    const jsonld = analisarJsonLd(html);
    linha.jsonld = jsonld;
    if (jsonld.blocos === 0) linha.falhas.push("sem JSON-LD");
    if (jsonld.invalidos) linha.falhas.push(`${jsonld.invalidos} JSON-LD inválido(s)`);
    if (jsonld.dupIds.length) linha.falhas.push(`@id duplicado: ${jsonld.dupIds.join(", ")}`);
  } catch (e) {
    linha.status = 0;
    linha.falhas.push(`FETCH: ${e.message}`);
  }
  linha.veredito = linha.falhas.length === 0 ? "PASS" : "FAIL";
  resultados.push(linha);
  console.log(`${linha.veredito === "PASS" ? "✓" : "✗"} ${owner.path} — ${linha.falhas.join(" | ") || "ok"}`);
}

const ok = resultados.filter((r) => r.veredito === "PASS").length;
const relatorio = { geradoEm: new Date().toISOString(), base: BASE, pass: ok, total: resultados.length, resultados };
writeFileSync(resolve(process.cwd(), "reports/smoke-4a.json"), `${JSON.stringify(relatorio, null, 2)}\n`);

const md = [
  "# Smoke público — owners da Rodada 4A",
  "",
  `- Base: \`${BASE}\``,
  `- Executado em: ${relatorio.geradoEm}`,
  `- Resultado: **${ok}/${resultados.length} PASS**`,
  "",
  "| URL | 200 | Index | Canonical self | H1 | SSR novo | Schema | Links |",
  "| --- | --- | --- | --- | --- | --- | --- | --- |",
  ...resultados.map((r) =>
    `| \`${r.path}\` | ${r.status === 200 ? "✅" : `❌ ${r.status}`} | ${/noindex/i.test(r.robots ?? "") ? "❌" : "✅"} | ${r.canonical === r.url ? "✅" : "❌"} | ${r.h1 === 1 ? "✅ 1" : `❌ ${r.h1}`} | ${r.respostaRapida && r.tabelaDiagnostica ? `✅ ${r.palavras}p` : "❌"} | ${r.jsonld && !r.jsonld.invalidos && !r.jsonld.dupIds?.length ? `✅ ${r.jsonld.tipos?.join(", ")}` : "❌"} | ${r.linksInternos ?? 0} |`,
  ),
  "",
  "Snapshots do HTML público em `reports/smoke-4a/` (HTML bruto + texto visível extraído).",
].join("\n");
writeFileSync(resolve(process.cwd(), "docs/relatorio-smoke-4a.md"), `${md}\n`);

console.log(`\n${ok}/${resultados.length} PASS — reports/smoke-4a.json · docs/relatorio-smoke-4a.md`);
process.exit(ok === resultados.length ? 0 : 1);
