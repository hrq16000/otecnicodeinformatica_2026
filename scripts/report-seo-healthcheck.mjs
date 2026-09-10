#!/usr/bin/env node
/**
 * HEALTHCHECK SEO PÓS-PUBLICAÇÃO — fonte do widget em /admin/seo.
 *
 * Nada é estimado no navegador: este script lê apenas artefatos reais.
 *   • public/seo-inventory.json  (HTML SSR do build — report-seo-inventory.mjs)
 *   • reports/orphan-baseline.json (espelho do gate de órfãs)
 *
 * Detecta, por URL curada:
 *   1. URL quebrada .... sem HTML no build (rota do sitemap sem página servida);
 *   2. canônico errado . canonical ausente, relativo, fora do domínio canônico
 *                        ou apontando para caminho diferente da própria URL;
 *   3. erro de schema .. sem JSON-LD, ou artigo de blog sem
 *                        BlogPosting/Article/TechArticle, ou sem FAQPage;
 *   4. órfãs ........... URLs sem link interno de entrada.
 *
 * Fail-closed: sem inventário, o relatório NÃO é escrito e o comando falha
 * (o painel prefere dizer "não verificado" a exibir saúde inventada).
 *
 * Uso:
 *   node scripts/report-seo-healthcheck.mjs            # grava o relatório
 *   node scripts/report-seo-healthcheck.mjs --check    # + falha se houver crítico
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = process.cwd();
const CHECK = process.argv.slice(2).includes("--check");
const INVENTARIO = resolve(ROOT, "public/seo-inventory.json");
const ORFAS = resolve(ROOT, "reports/orphan-baseline.json");
const OUT = resolve(ROOT, "public/seo-healthcheck.json");

const DOMINIO = (process.env.VITE_SITE_DOMAIN ?? "otecnicodeinformatica.com.br")
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");
const BASE = `https://${DOMINIO}`;

if (!existsSync(INVENTARIO)) {
  console.error(
    '✖ [seo:healthcheck] public/seo-inventory.json ausente. Rode "npm run build" e depois "npm run seo:inventory".',
  );
  process.exit(1);
}

const inventario = JSON.parse(readFileSync(INVENTARIO, "utf8"));
const orfas = existsSync(ORFAS) ? (JSON.parse(readFileSync(ORFAS, "utf8")).urls ?? []) : null;

const ARTIGO_TIPOS = ["BlogPosting", "Article", "TechArticle"];
const semBarra = (p) => (p.length > 1 ? p.replace(/\/$/, "") : p);

const problemas = {
  urlsQuebradas: [],
  semHtmlNoBuild: [],
  canonicoIncorreto: [],
  schemaInvalido: [],
  orfas: [],
};

for (const u of inventario.urls ?? []) {
  const path = semBarra(u.path);

  if (u.semHtml) {
    // Rota renderizada em runtime (não prerenderizada): não é quebra por si só.
    // Quebra real só é afirmada com verificação HTTP (--base).
    problemas.semHtmlNoBuild.push({ path, motivo: "sem HTML prerenderizado no build" });
    continue;
  }

  // 2. Canônico
  const canonical = (u.canonical ?? "").trim();
  if (!canonical) {
    problemas.canonicoIncorreto.push({ path, canonical: null, motivo: "canonical ausente" });
  } else if (!canonical.startsWith(BASE)) {
    problemas.canonicoIncorreto.push({ path, canonical, motivo: `fora do domínio canônico (${BASE})` });
  } else {
    let alvo = null;
    try {
      alvo = semBarra(new URL(canonical).pathname);
    } catch {
      alvo = null;
    }
    if (alvo === null) {
      problemas.canonicoIncorreto.push({ path, canonical, motivo: "canonical não é URL absoluta válida" });
    } else if (alvo !== path) {
      problemas.canonicoIncorreto.push({ path, canonical, motivo: `aponta para ${alvo}` });
    }
  }

  // 3. Schema
  const schemas = u.schemas ?? [];
  if (schemas.length === 0) {
    problemas.schemaInvalido.push({ path, schemas, motivo: "sem JSON-LD no HTML servido" });
  } else if (path.startsWith("/blog/")) {
    const faltando = [];
    if (!ARTIGO_TIPOS.some((t) => schemas.includes(t))) faltando.push(ARTIGO_TIPOS.join("|"));
    if (!schemas.includes("FAQPage")) faltando.push("FAQPage");
    if (faltando.length) {
      problemas.schemaInvalido.push({ path, schemas, motivo: `tipo(s) ausente(s): ${faltando.join(", ")}` });
    }
  }
}

// 1b. Quebra real — só quando há base HTTP para checar.
const BASE_HTTP = (process.argv.slice(2).find((a) => a.startsWith("--base="))?.slice(7) ?? process.env.DEPLOY_BASE_URL ?? "").replace(/\/$/, "");
if (BASE_HTTP) {
  for (const u of inventario.urls ?? []) {
    const path = semBarra(u.path);
    try {
      const res = await fetch(`${BASE_HTTP}${path}`, { method: "GET", headers: { "user-agent": "otdi-healthcheck" } });
      if (!res.ok) problemas.urlsQuebradas.push({ path, motivo: `HTTP ${res.status}` });
    } catch (e) {
      problemas.urlsQuebradas.push({ path, motivo: `falha de rede: ${String(e).slice(0, 80)}` });
    }
  }
}

// 4. Órfãs
if (orfas === null) {
  problemas.orfas = null;
} else {
  const curadas = new Set((inventario.urls ?? []).map((u) => semBarra(u.path)));
  problemas.orfas = orfas
    .map((u) => {
      try {
        return semBarra(new URL(u, BASE).pathname);
      } catch {
        return semBarra(String(u));
      }
    })
    .map((path) => ({ path, curada: curadas.has(path) }));
}

const criticos =
  problemas.urlsQuebradas.length + problemas.canonicoIncorreto.length + problemas.schemaInvalido.length;

const relatorio = {
  geradoEm: new Date().toISOString(),
  base: BASE,
  inventarioGeradoEm: inventario.geradoEm ?? null,
  totalUrls: inventario.total ?? (inventario.urls ?? []).length,
  resumo: {
    urlsQuebradas: problemas.urlsQuebradas.length,
    semHtmlNoBuild: problemas.semHtmlNoBuild.length,
    canonicoIncorreto: problemas.canonicoIncorreto.length,
    schemaInvalido: problemas.schemaInvalido.length,
    orfas: problemas.orfas === null ? null : problemas.orfas.length,
    criticos,
    status: criticos === 0 ? "OK" : "ATENCAO",
  },
  problemas,
};

writeFileSync(OUT, `${JSON.stringify(relatorio, null, 2)}\n`);

const linha = `[seo:healthcheck] ${relatorio.totalUrls} URL(s) · quebradas ${problemas.urlsQuebradas.length} · sem HTML no build ${problemas.semHtmlNoBuild.length} · canônico ${problemas.canonicoIncorreto.length} · schema ${problemas.schemaInvalido.length} · órfãs ${problemas.orfas === null ? "sem baseline" : problemas.orfas.length} → public/seo-healthcheck.json`;

if (CHECK && criticos > 0) {
  console.error(`✖ ${linha}`);
  for (const [grupo, itens] of Object.entries(problemas)) {
    if (grupo === "orfas" || !Array.isArray(itens)) continue;
    itens.slice(0, 20).forEach((i) => console.error(`  · [${grupo}] ${i.path} — ${i.motivo}`));
  }
  process.exit(1);
}

console.log(`${criticos === 0 ? "✔" : "•"} ${linha}`);
