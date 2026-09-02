#!/usr/bin/env node
/**
 * STATUS REAL DE DEPLOY — smoke test contra o domínio público.
 *
 * Verifica, por evidência HTTP real (nunca por suposição):
 *   - o domínio canônico responde 200 e entrega HTML com SSR (h1/JSON-LD);
 *   - /sitemap.xml e /robots.txt são servidos;
 *   - a versão publicada (/build-version.json) bate com o build local.
 *
 * Saída: public/deploy-status.json (widget de /admin/seo).
 * Fail-closed: qualquer falha de rede vira status PENDING/FAIL com o motivo —
 * jamais "publicado".
 *
 * Uso: node scripts/report-deploy-status.mjs [--base=https://exemplo.com]
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { BASE_URL, SITE_CONFIGURED } from "./lib/site-env.mjs";

const base = (process.argv.find((a) => a.startsWith("--base="))?.split("=")[1] ?? BASE_URL).replace(/\/$/, "");
const OUT = "public/deploy-status.json";
const TIMEOUT = Number(process.env.DEPLOY_CHECK_TIMEOUT_MS ?? 15000);

const local = existsSync("public/build-version.json")
  ? JSON.parse(readFileSync("public/build-version.json", "utf8"))
  : { version: null, buildTime: null };

async function pegar(path, { json = false } = {}) {
  const url = `${base}${path}`;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT);
  try {
    const res = await fetch(url, { signal: ctrl.signal, redirect: "follow", headers: { "user-agent": "otdi-deploy-check" } });
    const corpo = await res.text();
    return { url, status: res.status, ok: res.ok, corpo, json: json && res.ok ? safeJson(corpo) : null, erro: null };
  } catch (err) {
    return { url, status: 0, ok: false, corpo: "", json: null, erro: String(err?.message ?? err) };
  } finally {
    clearTimeout(t);
  }
}

function safeJson(txt) {
  try {
    return JSON.parse(txt);
  } catch {
    return null;
  }
}

async function main() {
  if (!SITE_CONFIGURED) {
    const relatorio = {
      geradoEm: new Date().toISOString(),
      dominioEsperado: null,
      status: "PENDING_CONFIG",
      motivo: "VITE_SITE_DOMAIN não configurado — verificação de deploy desligada (fail-closed).",
      checks: [],
      build: { local, publicado: null, divergencia: null },
    };
    writeFileSync(OUT, `${JSON.stringify(relatorio, null, 2)}\n`);
    console.log("• PENDING_CONFIG: domínio não configurado; nada foi afirmado sobre o deploy.");
    return;
  }

  const [home, sitemap, robots, versao] = await Promise.all([
    pegar("/"),
    pegar("/sitemap.xml"),
    pegar("/robots.txt"),
    pegar("/build-version.json", { json: true }),
  ]);

  const ssrOk = home.ok && /<h1[\s>]/i.test(home.corpo) && home.corpo.includes("application/ld+json");
  const checks = [
    { nome: "home (SSR)", url: home.url, status: home.status, ok: ssrOk, detalhe: home.erro ?? (ssrOk ? "HTML com h1 e JSON-LD" : "HTML sem h1 ou sem JSON-LD") },
    {
      nome: "sitemap.xml",
      url: sitemap.url,
      status: sitemap.status,
      ok: sitemap.ok && /<(urlset|sitemapindex)/.test(sitemap.corpo),
      // Índice de sitemaps aponta para sub-sitemaps; urlset aponta para páginas.
      detalhe:
        sitemap.erro ??
        `${sitemap.corpo.match(/<loc>/g)?.length ?? 0} ${sitemap.corpo.includes("<sitemapindex") ? "sub-sitemaps" : "URLs"}`,
    },
    { nome: "robots.txt", url: robots.url, status: robots.status, ok: robots.ok && /user-agent/i.test(robots.corpo), detalhe: robots.erro ?? "diretivas presentes" },
    { nome: "build-version.json", url: versao.url, status: versao.status, ok: Boolean(versao.json?.version), detalhe: versao.erro ?? (versao.json?.version ?? "ausente") },
  ];

  const publicado = versao.json ?? null;
  const divergencia =
    publicado?.version && local.version
      ? publicado.version === local.version
        ? null
        : `local ${local.version} ≠ publicado ${publicado.version}`
      : "versão publicada desconhecida";

  const falhas = checks.filter((c) => !c.ok);
  const status = home.status === 0 ? "UNREACHABLE" : falhas.length === 0 ? (divergencia ? "PUBLICADO_DESATUALIZADO" : "PUBLICADO_ATUAL") : "FALHA_SMOKE";

  const relatorio = {
    geradoEm: new Date().toISOString(),
    dominioEsperado: base,
    status,
    motivo:
      status === "UNREACHABLE"
        ? `Domínio não respondeu: ${home.erro ?? "sem resposta"}`
        : status === "FALHA_SMOKE"
          ? `Checks com falha: ${falhas.map((f) => f.nome).join(", ")}`
          : status === "PUBLICADO_DESATUALIZADO"
            ? `Domínio no ar, mas ${divergencia}`
            : "Domínio no ar e alinhado ao build local",
    checks,
    build: { local, publicado, divergencia },
  };

  writeFileSync(OUT, `${JSON.stringify(relatorio, null, 2)}\n`);
  console.log(`• Deploy: ${status} — ${relatorio.motivo}`);
}

main();
