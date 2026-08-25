#!/usr/bin/env node
/**
 * IndexNow ping helper.
 * Lê todas as URLs dos sitemaps em public/ e dispara um POST batch para
 * os principais search engines que suportam IndexNow (Bing/Yandex/Seznam).
 *
 * Uso: node scripts/indexnow-ping.mjs [--key <KEY>] [--host o domínio configurado]
 *
 * O key file precisa estar disponível em https://<host>/<KEY>.txt contendo só a KEY.
 * Definimos KEY default em INDEXNOW_KEY env var. Se ausente, gera um aviso e sai 0.
 */
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { BASE_URL, SITE_DOMAIN } from "./lib/site-env.mjs";

const HOST = process.env.INDEXNOW_HOST || SITE_DOMAIN;
const KEY = process.env.INDEXNOW_KEY || "f783ab585dfa9e6b017cb058009cccae";
const ENDPOINT = "https://api.indexnow.org/IndexNow";

if (!KEY) {
  console.warn("[indexnow] INDEXNOW_KEY não definido — pulando ping (sem erro).");
  process.exit(0);
}

/**
 * Modo seletivo (contrato da Rodada 4A.1): `--urls=/a,/b` notifica SOMENTE as
 * URLs realmente alteradas no deploy. Sem `--urls`, mantém o modo completo
 * (usado apenas em migrações/relançamentos), nunca a cada build.
 */
const urlsArg = process.argv.find((a) => a.startsWith("--urls="));

function extractUrlsFromSitemap(xml) {
  const matches = xml.matchAll(/<loc>([^<]+)<\/loc>/g);
  return Array.from(matches, (m) => m[1].trim()).filter((u) => u.includes(HOST));
}

if (urlsArg) {
  const list = urlsArg
    .slice(7)
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean)
    .map((u) => (u.startsWith("http") ? u : `${BASE_URL}${u}`));
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: list }),
  }).catch((e) => ({ ok: false, status: 0, statusText: e.message, text: async () => e.message }));
  console.log(`[indexnow] seletivo ${res.status} ${res.statusText} — ${list.length} URLs`);
  for (const u of list) console.log(`  · ${u}`);
  // fail-safe: problema no IndexNow nunca derruba deploy/pipeline.
  process.exit(0);
}

const publicDir = resolve(process.cwd(), "public");
const sitemaps = readdirSync(publicDir).filter((f) => f.startsWith("sitemap") && f.endsWith(".xml"));
const urls = new Set();
for (const f of sitemaps) {
  try {
    const xml = readFileSync(resolve(publicDir, f), "utf8");
    extractUrlsFromSitemap(xml).forEach((u) => urls.add(u));
  } catch (e) {
    console.warn(`[indexnow] falha ao ler ${f}:`, e.message);
  }
}

const urlList = Array.from(urls);
if (urlList.length === 0) {
  console.warn("[indexnow] nenhuma URL encontrada nos sitemaps.");
  process.exit(0);
}

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList,
};

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});
console.log(`[indexnow] ${res.status} ${res.statusText} — ${urlList.length} URLs enviadas`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
