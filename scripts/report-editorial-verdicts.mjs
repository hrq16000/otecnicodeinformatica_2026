#!/usr/bin/env node
/**
 * LEDGER DE VEREDITOS DE INDEXAÇÃO — Onda 10C.
 *
 * Consolida, por URL declarada em editorialWavesRegistry, o veredito de
 * indexação em vocabulário editorial estável:
 *
 *   PUBLISHED  → o Google confirmou a URL no índice (verdict PASS)
 *   PENDING    → submetida/descoberta, ainda sem confirmação de índice
 *   PROBLEM    → bloqueio de robots/meta ou conflito de canonical
 *   UNKNOWN    → sem credencial do Search Console (fail-closed; nunca vira 0)
 *
 * Fontes (todas reais, nenhuma estimativa):
 *   public/editorial-waves-status.json          → URL Inspection (somente leitura)
 *   public/editorial-indexnow-status.json       → submissão IndexNow
 *   reports/indexnow/editorial-wave-status.json → estado detalhado do envio
 *
 * IMPORTANTE: a API do Search Console NÃO solicita indexação. A submissão real
 * acontece via sitemap + IndexNow; o GSC apenas informa o estado do índice.
 *
 * Saídas:
 *   public/editorial-verdicts.json
 *   public/editorial/verdicts/<timestamp>.json   (histórico imutável)
 *   docs/relatorio-vereditos-indexacao.md
 *
 * Uso: npm run report:editorial-verdicts
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ler = (rel) => {
  const p = resolve(process.cwd(), rel);
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return null;
  }
};

const ondas = ler("public/editorial-waves-status.json");
if (!ondas?.rotas?.length) {
  console.error(
    '✖ public/editorial-waves-status.json ausente ou vazio — rode "npm run monitor:editorial-waves" antes.',
  );
  process.exit(1);
}

const indexnowPublico = ler("public/editorial-indexnow-status.json");
const indexnowDetalhe = ler("reports/indexnow/editorial-wave-status.json");

const envioPorUrl = new Map();
for (const fonte of [indexnowDetalhe?.registros, indexnowPublico?.registros, indexnowPublico?.urls]) {
  for (const r of fonte ?? []) {
    const chave = String(r.url ?? "").replace(/^https?:\/\/[^/]+/, "").replace(/\/$/, "");
    if (!chave) continue;
    envioPorUrl.set(chave, {
      submissionState: r.submissionState ?? (r.aceita ? "SUBMITTED" : null) ?? null,
      lastSubmittedAt: r.lastSubmittedAt ?? r.enviadoEm ?? null,
    });
  }
}

/** Estado técnico do Google → veredito editorial. */
function veredito(estado) {
  switch (estado) {
    case "INDEXED":
      return "PUBLISHED";
    case "BLOCKED":
    case "CANONICAL_CONFLICT":
      return "PROBLEM";
    case "UNKNOWN":
      return "UNKNOWN";
    default:
      return "PENDING";
  }
}

const agora = new Date().toISOString();
const urls = ondas.rotas.map((r) => {
  const g = r.google ?? {};
  const estado = g.status ?? "UNKNOWN";
  const envio = envioPorUrl.get(String(r.url).replace(/\/$/, "")) ?? {};
  return {
    url: r.url,
    urlAbsoluta: r.urlAbsoluta,
    lote: r.lote,
    wave: r.wave,
    batch: r.batch,
    ownerId: r.ownerId,
    cluster: r.cluster,
    internalState: r.internalState ?? null,
    emSitemap: Boolean(r.sitemapLastmod),
    sitemapLastmod: r.sitemapLastmod ?? null,
    indexNow: envio.submissionState ?? (r.indexNowSentAt ? "SUBMITTED" : null),
    indexNowEm: envio.lastSubmittedAt ?? r.indexNowSentAt ?? null,
    estadoBusca: estado,
    veredito: veredito(estado),
    motivo: g.motivo ?? null,
    ultimoCrawl: g.ultimoCrawl ?? null,
    canonicalGoogle: g.canonicalGoogle ?? null,
    canonicalDeclarado: g.canonicalDeclarado ?? null,
  };
});

const contagem = urls.reduce((acc, u) => {
  acc[u.veredito] = (acc[u.veredito] ?? 0) + 1;
  return acc;
}, {});

const lotes = [...new Set(urls.map((u) => u.lote))].map((lote) => {
  const doLote = urls.filter((u) => u.lote === lote);
  return {
    lote,
    total: doLote.length,
    published: doLote.filter((u) => u.veredito === "PUBLISHED").length,
    pending: doLote.filter((u) => u.veredito === "PENDING").length,
    problem: doLote.filter((u) => u.veredito === "PROBLEM").length,
    unknown: doLote.filter((u) => u.veredito === "UNKNOWN").length,
  };
});

const consolidada =
  ondas.disponivel === true && urls.length > 0 && urls.every((u) => u.veredito === "PUBLISHED");

const ledger = {
  geradoEm: agora,
  fonte: {
    site: ondas.site ?? "UNKNOWN",
    gscDisponivel: Boolean(ondas.disponivel),
    monitoradoEm: ondas.geradoEm ?? null,
  },
  total: urls.length,
  contagem,
  lotes,
  consolidada,
  observacao:
    "A API do Search Console é somente leitura: ela informa o estado do índice, não solicita indexação. A submissão real ocorre por sitemap + IndexNow.",
  urls,
};

mkdirSync(resolve(process.cwd(), "public/editorial/verdicts"), { recursive: true });
mkdirSync(resolve(process.cwd(), "docs"), { recursive: true });
writeFileSync(
  resolve(process.cwd(), "public/editorial-verdicts.json"),
  `${JSON.stringify(ledger, null, 2)}\n`,
);
writeFileSync(
  resolve(process.cwd(), `public/editorial/verdicts/${agora.replace(/[:.]/g, "-")}.json`),
  `${JSON.stringify(ledger, null, 2)}\n`,
);

const md = [
  "# Vereditos de indexação — Onda 10C",
  "",
  `- Gerado em: ${agora}`,
  `- Propriedade: \`${ledger.fonte.site}\` (Search Console ${ledger.fonte.gscDisponivel ? "disponível" : "INDISPONÍVEL — vereditos UNKNOWN"})`,
  `- Total: **${ledger.total}** · PUBLISHED ${contagem.PUBLISHED ?? 0} · PENDING ${contagem.PENDING ?? 0} · PROBLEM ${contagem.PROBLEM ?? 0} · UNKNOWN ${contagem.UNKNOWN ?? 0}`,
  `- Onda consolidada: **${consolidada ? "SIM" : "NÃO"}**`,
  "",
  "| Lote | URL | Interno | Sitemap | IndexNow | Estado busca | Veredito |",
  "| --- | --- | --- | --- | --- | --- | --- |",
  ...urls.map(
    (u) =>
      `| ${u.lote} | ${u.url} | ${u.internalState ?? "—"} | ${u.emSitemap ? "sim" : "não"} | ${u.indexNow ?? "—"} | ${u.estadoBusca} | ${u.veredito} |`,
  ),
  "",
  `> ${ledger.observacao}`,
].join("\n");
writeFileSync(resolve(process.cwd(), "docs/relatorio-vereditos-indexacao.md"), `${md}\n`);

console.log(
  `[vereditos] ${ledger.total} URL(s) · PUBLISHED ${contagem.PUBLISHED ?? 0} · PENDING ${contagem.PENDING ?? 0} · PROBLEM ${contagem.PROBLEM ?? 0} · UNKNOWN ${contagem.UNKNOWN ?? 0} · consolidada=${consolidada}`,
);
for (const u of urls) console.log(`  · ${u.lote} ${u.url} → ${u.veredito} (${u.estadoBusca})`);
