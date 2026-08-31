#!/usr/bin/env node
// Submissão controlada: sitemap no GSC + IndexNow das URLs já publicadas.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolveSite, submitSitemap } from "./lib/gsc-client.mjs";

const dry = process.argv.includes("--dry-run");
const ledgerPath = "public/editorial-verdicts.json";
if (!existsSync(ledgerPath)) throw new Error("ledger ausente: rode report:editorial-verdicts antes");
const ledger = JSON.parse(readFileSync(ledgerPath, "utf8"));
const host = (process.env.VITE_SITE_DOMAIN ?? "otecnicodeinformatica.com.br").replace(/^https?:\/\//, "").replace(/\/$/, "");
const urls = ledger.urls.filter((u) => u.wave === "10C" && u.internalState === "PUBLISHED").map((u) => `https://${host}${u.url}`);
const out = { geradoEm: new Date().toISOString(), dryRun: dry, total: urls.length, sitemap: `https://${host}/sitemap.xml`, google: "UNKNOWN", indexNow: "NOT_SENT" };
try { const site = await resolveSite(`https://${host}/`); if (!dry) await submitSitemap(site, out.sitemap); out.google = dry ? "DRY_RUN" : "SUBMITTED"; } catch (e) { out.google = `UNKNOWN: ${String(e).slice(0, 120)}`; }
const key = process.env.INDEXNOW_KEY ?? "f783ab585dfa9e6b017cb058009cccae";
if (!dry && urls.length) { try { const r = await fetch("https://api.indexnow.org/IndexNow", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList: urls }) }); out.indexNow = `HTTP ${r.status}`; } catch (e) { out.indexNow = `FAILED: ${String(e).slice(0, 120)}`; } } else if (dry) out.indexNow = "DRY_RUN";
writeFileSync("public/editorial-onda-10c-publicacao.json", `${JSON.stringify(out, null, 2)}\n`);
console.log(`[publicar:onda-10c] ${urls.length} URL(s) · GSC ${out.google} · IndexNow ${out.indexNow}`);
