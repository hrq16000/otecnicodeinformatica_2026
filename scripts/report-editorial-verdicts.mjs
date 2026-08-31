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
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
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
const publicacao10c = ler("public/editorial-onda-10c-publicacao.json");

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
    indexNow: envio.submissionState ?? (r.indexNowSentAt ? "SUBMITTED" : (r.wave === "10C" && /^HTTP (200|202)/.test(String(publicacao10c?.indexNow ?? "")) ? "SUBMITTED" : null)),
    indexNowEm: envio.lastSubmittedAt ?? r.indexNowSentAt ?? null,
    estadoBusca: estado,
    veredito: veredito(estado),
    motivo: g.motivo ?? null,
    ultimoCrawl: g.ultimoCrawl ?? null,
    canonicalGoogle: g.canonicalGoogle ?? null,
    canonicalDeclarado: g.canonicalDeclarado ?? null,
  };
});

// Caso técnico prioritário fora da registry de ondas: o artigo do erro
// 0xc0000428 entra no mesmo ledger, porém sem se passar por URL da Onda 10C.
// Inspeção AO VIVO do caso técnico (o artefato estático pode estar velho).
// Sem credencial, permanece null e o fluxo cai no fallback UNKNOWN.
let caso0428Live = null;
try {
  const { resolveSite, inspectUrl } = await import("./lib/gsc-client.mjs");
  const site = await resolveSite("https://otecnicodeinformatica.com.br/");
  const insp = await inspectUrl(site, "https://otecnicodeinformatica.com.br/problemas/windows-nao-inicia");
  caso0428Live = {
    estado: insp.verdict === "PASS" ? "INDEXED" : insp.verdict === "FAIL" ? "BLOCKED" : "PENDING",
    motivo: insp.coverageState,
    ultimoCrawl: insp.lastCrawlTime,
    canonicalGoogle: insp.googleCanonical,
    canonicalDeclarado: insp.userCanonical,
  };
} catch (e) {
  console.warn(`[vereditos] inspeção ao vivo do caso 0xc0000428 indisponível: ${String(e).slice(0, 120)}`);
}

const casos = ler("public/index-status.json")?.rotas ?? [];

const caso0428 = casos.find((r) => r.path === "/problemas/windows-nao-inicia");
if (caso0428) {
  const g = caso0428.google ?? {};
  const estado = g.status === "INDEXED" ? "INDEXED" : g.status === "NO_DATA" ? "PENDING" : "UNKNOWN";
  urls.push({
    url: caso0428.path,
    urlAbsoluta: caso0428.url,
    lote: "CASO/0xc0000428",
    wave: "CASO",
    batch: "0xc0000428",
    ownerId: "windows-nao-inicia-0xc0000428",
    cluster: "inicializacao-windows",
    internalState: "PUBLISHED",
    emSitemap: true,
    sitemapLastmod: null,
    indexNow: null,
    indexNowEm: null,
    estadoBusca: estado,
    veredito: veredito(estado),
    motivo: g.coverageState ?? null,
    ultimoCrawl: g.ultimoCrawl ?? null,
    canonicalGoogle: g.canonicalGoogle ?? null,
    canonicalDeclarado: g.canonicalDeclarado ?? null,
  });
} else {
  urls.push({
    url: "/problemas/windows-nao-inicia",
    urlAbsoluta: "https://otecnicodeinformatica.com.br/problemas/windows-nao-inicia",
    lote: "CASO/0xc0000428", wave: "CASO", batch: "0xc0000428",
    ownerId: "windows-nao-inicia-0xc0000428", cluster: "inicializacao-windows",
    internalState: "PUBLISHED", emSitemap: true, sitemapLastmod: null,
    indexNow: null, indexNowEm: null, estadoBusca: "UNKNOWN", veredito: "UNKNOWN",
    motivo: "Sem inspeção atual da URL do caso no artefato de status.", ultimoCrawl: null,
    canonicalGoogle: null, canonicalDeclarado: null,
  });
}

// Cruzamento com o ledger de submissões (sitemap + IndexNow): cada URL passa a
// carregar a prova operacional do envio e o veredito observado é escrito de
// volta, fechando a trilha de auditoria "publicado → submetido → veredito".
const submissoes = ler("public/editorial-submissions.json");
if (submissoes?.urls?.length) {
  const porUrl = new Map(submissoes.urls.map((s) => [s.url, s]));
  for (const u of urls) {
    const s = porUrl.get(u.url);
    if (!s) continue;
    u.submittedViaSitemap = Boolean(s.submitted_via_sitemap);
    u.submittedViaIndexNow = Boolean(s.submitted_via_indexnow);
    u.lastSubmissionAt = s.last_submission_at ?? null;
    u.publicadoNoSite = Boolean(s.publicado);
    u.canonicalValidado = Boolean(s.canonical_valido);
    u.schemaValidado = Boolean(s.schema_valido);
    u.errosPublicacao = s.erros ?? [];
    if (s.last_verdict !== u.veredito) {
      s.historico = [...(s.historico ?? []), { at: agora, action: "verdict_change", de: s.last_verdict ?? null, para: u.veredito }].slice(-40);
    }
    s.last_verdict = u.veredito;
    s.last_verdict_checked_at = agora;
  }
  submissoes.verdictsAtualizadoEm = agora;
  writeFileSync(
    resolve(process.cwd(), "public/editorial-submissions.json"),
    `${JSON.stringify(submissoes, null, 2)}\n`,
  );
}

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
const historicoDir = resolve(process.cwd(), "public/editorial/verdicts");
const historico = readdirSync(historicoDir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => ler(`public/editorial/verdicts/${f}`))
  .filter(Boolean)
  .map((h) => ({ geradoEm: h.geradoEm, contagem: h.contagem, total: h.total, consolidada: h.consolidada }))
  .sort((a, b) => String(a.geradoEm).localeCompare(String(b.geradoEm)));
writeFileSync(resolve(process.cwd(), "public/editorial-verdicts-history.json"), `${JSON.stringify({ geradoEm: agora, historico }, null, 2)}\n`);

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
