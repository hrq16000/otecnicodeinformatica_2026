#!/usr/bin/env node
/**
 * INDEXNOW — notificação seletiva com log e classificação de falha por URL.
 *
 * Uso:
 *   node scripts/indexnow-ping.mjs --urls=/a,/b        # somente o delta do deploy
 *   node scripts/indexnow-ping.mjs --changed           # delta vindo dos fingerprints
 *   node scripts/indexnow-ping.mjs --all               # todas as URLs do sitemap (relançamento)
 *
 * Regras:
 *  - fail-safe: nunca derruba o deploy (exit 0), a não ser com --strict;
 *  - uma tentativa por endpoint, sem loop de retry;
 *  - registra endpoint, status HTTP, corpo, duração e classificação em
 *    `reports/indexnow-log.json` (histórico) e `public/indexnow-status.json`
 *    (consumido pelo painel /admin/indexacao).
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { BASE_URL, SITE_DOMAIN } from "./lib/site-env.mjs";

const argv = process.argv.slice(2);
const arg = (nome) => argv.find((a) => a.startsWith(`--${nome}=`))?.split("=").slice(1).join("=");
const flag = (nome) => argv.includes(`--${nome}`);

const HOST = process.env.INDEXNOW_HOST || SITE_DOMAIN;
const KEY = process.env.INDEXNOW_KEY || "f783ab585dfa9e6b017cb058009cccae";
const ENDPOINTS = [
  { nome: "indexnow.org", url: "https://api.indexnow.org/IndexNow" },
  { nome: "bing", url: "https://www.bing.com/indexnow" },
];
const STRICT = flag("strict");

const absoluta = (u) => (u.startsWith("http") ? u : `${BASE_URL}${u.startsWith("/") ? u : `/${u}`}`);

/** Classificação determinística da falha (contrato da Rodada 4A.2). */
function classificar({ status, corpo, erroRede }) {
  if (erroRede) return "NETWORK";
  if (status === 200 || status === 202) return "OK";
  if (status === 403) return "AUTH_KEY";
  if (status === 422) return /key/i.test(corpo) ? "KEY_LOCATION" : "PAYLOAD";
  if (status === 400) return "PAYLOAD";
  if (status === 429) return "HTTP_ERROR";
  if (status >= 500) return "HTTP_ERROR";
  if (status > 0) return "HTTP_ERROR";
  return "UNKNOWN";
}

function urlsDoSitemap() {
  const publicDir = resolve(process.cwd(), "public");
  const arquivos = readdirSync(publicDir).filter((f) => f.startsWith("sitemap") && f.endsWith(".xml"));
  const urls = new Set();
  for (const f of arquivos) {
    try {
      const xml = readFileSync(resolve(publicDir, f), "utf8");
      for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
        const u = m[1].trim();
        if (u.includes(HOST) && !u.endsWith(".xml")) urls.add(u);
      }
    } catch (e) {
      console.warn(`[indexnow] falha ao ler ${f}: ${e.message}`);
    }
  }
  return [...urls];
}

/** Delta a partir do fingerprint de conteúdo: só o que mudou hoje. */
function urlsAlteradas() {
  const store = resolve(process.cwd(), "config/content-fingerprints.json");
  if (!existsSync(store)) return [];
  const hoje = new Date().toISOString().slice(0, 10);
  const { rotas = {} } = JSON.parse(readFileSync(store, "utf8"));
  return Object.entries(rotas)
    .filter(([, v]) => v.lastmod === hoje && v.origem === "hash-change")
    .map(([p]) => absoluta(p));
}

let urlList = [];
let modo = "seletivo";
if (arg("urls")) {
  urlList = arg("urls").split(",").map((u) => u.trim()).filter(Boolean).map(absoluta);
} else if (flag("changed")) {
  modo = "changed";
  urlList = urlsAlteradas();
} else if (flag("all")) {
  modo = "all";
  urlList = urlsDoSitemap();
} else {
  console.warn("[indexnow] informe --urls=, --changed ou --all. Nada enviado.");
  process.exit(0);
}

if (!KEY) {
  console.warn("[indexnow] INDEXNOW_KEY ausente — ping ignorado (fail-safe).");
  process.exit(0);
}
if (urlList.length === 0) {
  console.warn(`[indexnow] modo ${modo}: nenhuma URL alterada — nada a notificar.`);
  process.exit(0);
}

/** Pré-checagem da key file publicada: evita 403 silencioso por keyLocation. */
const keyLocation = `https://${HOST}/${KEY}.txt`;
let keyFile = { url: keyLocation, status: 0, ok: false };
try {
  const r = await fetch(keyLocation, { headers: { "cache-control": "no-cache" } });
  const txt = (await r.text()).trim();
  keyFile = { url: keyLocation, status: r.status, ok: r.ok && txt === KEY };
} catch (e) {
  keyFile = { url: keyLocation, status: 0, ok: false, erro: e.message };
}

const payload = { host: HOST, key: KEY, keyLocation, urlList };
const tentativas = [];

for (const ep of ENDPOINTS) {
  const t0 = Date.now();
  let status = 0;
  let corpo = "";
  let erroRede = null;
  try {
    const res = await fetch(ep.url, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    status = res.status;
    corpo = (await res.text()).slice(0, 500);
  } catch (e) {
    erroRede = e.message;
  }
  const classe = classificar({ status, corpo, erroRede });
  tentativas.push({
    endpoint: ep.nome,
    url: ep.url,
    status,
    classe,
    corpo: corpo || erroRede || "",
    duracaoMs: Date.now() - t0,
    enviadoEm: new Date().toISOString(),
  });
  const icone = classe === "OK" ? "✓" : "✗";
  console.log(`[indexnow] ${icone} ${ep.nome} HTTP ${status || "-"} (${classe}) — ${urlList.length} URLs`);
  if (classe !== "OK") console.log(`           resposta: ${(corpo || erroRede || "").slice(0, 200)}`);
}

/**
 * O IndexNow responde por lote, não por URL. Registramos o status por URL a
 * partir do lote em que ela foi enviada — explicitando a granularidade real.
 */
const porUrl = urlList.map((u) => ({
  url: u,
  enviadaEm: new Date().toISOString(),
  resultados: tentativas.map((t) => ({ endpoint: t.endpoint, status: t.status, classe: t.classe })),
  aceita: tentativas.some((t) => t.classe === "OK"),
}));

const registro = {
  geradoEm: new Date().toISOString(),
  modo,
  host: HOST,
  keyFile,
  totalUrls: urlList.length,
  tentativas,
  urls: porUrl,
  sucesso: tentativas.some((t) => t.classe === "OK"),
};

mkdirSync(resolve(process.cwd(), "reports"), { recursive: true });
const logPath = resolve(process.cwd(), "reports/indexnow-log.json");
const historico = existsSync(logPath) ? JSON.parse(readFileSync(logPath, "utf8")) : [];
historico.unshift(registro);
writeFileSync(logPath, `${JSON.stringify(historico.slice(0, 50), null, 2)}\n`);
writeFileSync(
  resolve(process.cwd(), "public/indexnow-status.json"),
  `${JSON.stringify(registro, null, 2)}\n`,
);

for (const u of porUrl) console.log(`  · ${u.url} → ${u.aceita ? "ACEITA" : "FALHA"}`);
if (!keyFile.ok) console.warn(`[indexnow] ALERTA KEY_LOCATION: ${keyLocation} respondeu ${keyFile.status}`);
if (!registro.sucesso) {
  console.error("[indexnow] ALERTA: nenhum endpoint aceitou o lote — ver reports/indexnow-log.json");
  process.exit(STRICT ? 1 : 0);
}
console.log(`\n✓ IndexNow: ${urlList.length} URL(s) notificadas (modo ${modo}).`);
