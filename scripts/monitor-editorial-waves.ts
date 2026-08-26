#!/usr/bin/env bun
/**
 * MONITOR DE INDEXAÇÃO POR ONDA/LOTE EDITORIAL — Onda 10C · Infra 1.
 *
 * Reutiliza o ÚNICO gateway do Search Console já existente no projeto
 * (scripts/lib/gsc-client.mjs). Nenhuma segunda integração Google é criada.
 *
 * Para cada URL declarada em src/lib/editorialWavesRegistry.ts grava:
 *   verdict · coverageState · robotsTxtState · lastCrawlTime · canônicos
 *   contentHash (código-fonte do artigo) · sitemapLastmod · indexNowSentAt
 *
 * Saída: public/editorial-waves-status.json (consumido por /admin/editorial-ondas).
 *
 * Fail-closed: sem LOVABLE_API_KEY + GOOGLE_SEARCH_CONSOLE_API_KEY o campo
 * do Google vira UNKNOWN e `disponivel: false`. Ausência NUNCA vira zero.
 *
 * Uso: npm run monitor:editorial-waves
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
// @ts-expect-error — utilitário JS compartilhado (sem tipos).
import { resolveSite, inspectUrl } from "./lib/gsc-client.mjs";
// @ts-expect-error — utilitário JS compartilhado (sem tipos).
import {
  calcularTransicoes,
  lerAlertas,
  normalizarEstadoBusca,
  persistirAlertas,
} from "./lib/editorial-alerts.mjs";
// @ts-expect-error — utilitário JS compartilhado (sem tipos).
import {
  entregarAlertas,
  lerAuditoria,
  lerConfiguracao,
  persistirAuditoria,
} from "./lib/editorial-alert-delivery.mjs";
import { EDITORIAL_WAVES, batchKey } from "../src/lib/editorialWavesRegistry";
import { getEditorialStatus } from "../src/lib/blogEditorialRegistry";


const BASE = (process.env.VITE_SITE_DOMAIN ?? "https://otecnicodeinformatica.com.br")
  .replace(/^https?:\/\//, "https://")
  .replace(/\/$/, "");
const base = BASE.startsWith("https://") ? BASE : `https://${BASE}`;

const disponivel = Boolean(
  process.env.LOVABLE_API_KEY && process.env.GOOGLE_SEARCH_CONSOLE_API_KEY,
);

/** Hash determinístico do trecho-fonte do artigo (detecta reedição silenciosa). */
const CONTENT_FILE = resolve(process.cwd(), "src/data/blogPostsContent.tsx");
const fonte = existsSync(CONTENT_FILE) ? readFileSync(CONTENT_FILE, "utf8") : "";

function contentHash(slug: string): string | null {
  if (!fonte) return null;
  const abre = fonte.indexOf(`"${slug}": {`);
  if (abre < 0) return null;
  const resto = fonte.slice(abre);
  const fim = resto.slice(1).search(/\n {2}"[a-z0-9-]+": \{/);
  const trecho = fim < 0 ? resto : resto.slice(0, fim + 1);
  return createHash("sha256").update(trecho).digest("hex").slice(0, 16);
}

/** lastmod real declarado nos sitemaps publicados. */
function sitemapLastmods(): Map<string, string> {
  const mapa = new Map<string, string>();
  const dir = resolve(process.cwd(), "public");
  if (!existsSync(dir)) return mapa;
  for (const arquivo of readdirSync(dir).filter((f) => /^sitemap.*\.xml$/.test(f))) {
    const xml = readFileSync(resolve(dir, arquivo), "utf8");
    for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const loc = m[1].match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
      const lastmod = m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim();
      if (loc && lastmod) mapa.set(loc.replace(/\/$/, ""), lastmod);
    }
  }
  return mapa;
}

/** Último envio aceito ao IndexNow, por URL. */
function indexNowSentAt(): { geradoEm: string | null; porUrl: Map<string, boolean> } {
  const arquivo = resolve(process.cwd(), "public/indexnow-status.json");
  if (!existsSync(arquivo)) return { geradoEm: null, porUrl: new Map() };
  try {
    const reg = JSON.parse(readFileSync(arquivo, "utf8"));
    return {
      geradoEm: reg.geradoEm ?? null,
      porUrl: new Map<string, boolean>(
        (reg.urls ?? []).map((u: { url: string; aceita: boolean }) => [
          String(u.url).replace(/\/$/, ""),
          Boolean(u.aceita),
        ]),
      ),
    };
  } catch {
    return { geradoEm: null, porUrl: new Map() };
  }
}

const lastmods = sitemapLastmods();
const indexnow = indexNowSentAt();

let site: string | null = null;
if (disponivel) {
  try {
    site = await resolveSite(`${base}/`);
  } catch (e) {
    console.warn(`[editorial-waves] propriedade não resolvida: ${(e as Error).message}`);
  }
}

/** Estado INTERNO do pipeline (nunca apresentado como resposta do Google). */
const estadoInterno = (slug: string): "DRAFT" | "APPROVED" | "PUBLISHED" => {
  const s = getEditorialStatus(slug);
  if (s === "approved") return "PUBLISHED";
  if (s === "in_review") return "APPROVED";
  return "DRAFT";
};

const rotas = [] as Array<Record<string, unknown>>;
for (const entrada of EDITORIAL_WAVES) {
  const url = `${base}${entrada.url}`;
  const comum = {
    wave: entrada.wave,
    batch: entrada.batch,
    lote: batchKey(entrada),
    url: entrada.url,
    urlAbsoluta: url,
    ownerId: entrada.ownerId,
    cluster: entrada.cluster,
    role: entrada.role,
    publishedAt: entrada.publishedAt,
    internalState: estadoInterno(entrada.slug),
    contentHash: contentHash(entrada.slug),
    sitemapLastmod: lastmods.get(url) ?? null,
    indexNowSentAt: indexnow.porUrl.get(url) ? indexnow.geradoEm : null,
  };

  if (!site) {
    rotas.push({
      ...comum,
      google: { status: "UNKNOWN", motivo: "credenciais do Search Console ausentes" },
    });
    continue;
  }
  try {
    const r = await inspectUrl(site, url);
    const bruto = {
      verdict: r.verdict,
      coverageState: r.coverageState,
      robotsTxtState: r.robotsTxtState,
      indexingState: r.indexingState,
      ultimoCrawl: r.lastCrawlTime,
      canonicalGoogle: r.googleCanonical,
      canonicalDeclarado: r.userCanonical,
    };
    rotas.push({
      ...comum,
      google: {
        status: normalizarEstadoBusca({ ...bruto, status: "OK" }, {
          emSitemap: Boolean(comum.sitemapLastmod),
        }),
        ...bruto,
      },
    });
  } catch (e) {
    rotas.push({ ...comum, google: { status: "UNKNOWN", motivo: (e as Error).message } });
  }
}

const lotes = [...new Set(EDITORIAL_WAVES.map(batchKey))].map((lote) => {
  const doLote = rotas.filter((r) => r.lote === lote);
  const indexadas = doLote.filter((r) => (r.google as { status: string }).status === "INDEXED");
  return {
    lote,
    total: doLote.length,
    indexadas: site ? indexadas.length : "UNKNOWN",
    cobertura: site ? Number(((indexadas.length / doLote.length) * 100).toFixed(1)) : "UNKNOWN",
  };
});

const agora = new Date().toISOString();

// ── Alertas edge-triggered com dedupe (Infra 2 · Parte A).
const anterior = lerAlertas();
const { alertasNovos, estado } = calcularTransicoes(
  anterior,
  rotas.map((r) => ({
    url: r.url as string,
    lote: r.lote as string,
    ownerId: r.ownerId as string,
    internalState: r.internalState as string,
    searchState: (r.google as { status: string }).status,
    contentHash: r.contentHash as string | null,
  })),
  agora,
);

// Entrega via camada única (Infra 3): Slack e e-mail independentes, com
// idempotência por (eventId, channel). Canal externo indisponível nunca
// derruba o monitor.
const config = lerConfiguracao();
const auditoria = lerAuditoria();
const entrega = await entregarAlertas(alertasNovos, { config, auditoria });
persistirAuditoria({
  geradoEm: agora,
  canais: { slack: config.slack.status, email: config.email.status },
  entregas: entrega.entregas,
  historico: [
    ...entrega.resultados.map((r: Record<string, unknown>) => ({ ...r, em: agora })),
    ...auditoria.historico,
  ].slice(0, 500),
});
const despacho = {
  enviado: entrega.resumo.enviados > 0,
  motivo: entrega.resumo.estado,
  slack: entrega.resumo.slack,
  email: entrega.resumo.email,
};
persistirAlertas({
  geradoEm: agora,
  webhook: despacho,
  entrega: entrega.resumo,
  estado,
  alertas: [...alertasNovos, ...anterior.alertas].slice(0, 500),
});

const saida = {
  geradoEm: agora,
  site: site ?? "UNKNOWN",
  disponivel: Boolean(site),
  lotes,
  rotas,
  alertasNovos: alertasNovos.length,
};

writeFileSync(
  resolve(process.cwd(), "public/editorial-waves-status.json"),
  `${JSON.stringify(saida, null, 2)}\n`,
);

console.log(
  `[editorial-waves] ${rotas.length} URL(s) · ${site ? `propriedade ${site}` : "Google UNKNOWN (sem credencial)"} · alertas novos: ${alertasNovos.length} (webhook: ${despacho.enviado ? "enviado" : despacho.motivo ?? "falhou"})`,
);
for (const r of rotas) {
  console.log(
    `  · ${r.lote}  ${r.url} → interno=${r.internalState} busca=${(r.google as { status: string }).status}`,
  );
}
for (const a of alertasNovos) {
  console.log(`  ! ${a.severity} ${a.source} ${a.url}: ${a.previousState ?? "∅"} → ${a.currentState}`);
}

