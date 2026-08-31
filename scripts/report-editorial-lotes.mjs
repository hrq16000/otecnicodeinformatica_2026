#!/usr/bin/env node
/**
 * CONSOLIDADOR DE ONDAS E LOTES EDITORIAIS.
 *
 * Gera `public/editorial-lotes.json` — visão única por onda/lote consumida
 * por /admin/ondas. NÃO chama API: cruza somente artefatos já existentes:
 *   • src/lib/editorialWavesRegistry.ts  (o que existe, por onda/lote)
 *   • scripts/lib/editorial-wave.mjs     (o que está APROVADO/indexável)
 *   • public/sitemap-editorial.xml       (o que está no sitemap dinâmico)
 *   • public/editorial-submissions.json  (submissão sitemap/IndexNow)
 *   • public/editorial-verdicts.json     (veredito real do Search Console)
 *
 * Fail-closed: dado sem fonte vira null/UNKNOWN — nunca zero, nunca estimado.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { EDITORIAL_WAVE_SLUGS } from "./lib/editorial-wave.mjs";

const root = process.cwd();
const readJson = (p) => (existsSync(resolve(root, p)) ? JSON.parse(readFileSync(resolve(root, p), "utf8")) : null);

// Registry declarativo (TS) lido por parsing — evita depender de bundler aqui.
const registrySrc = readFileSync(resolve(root, "src/lib/editorialWavesRegistry.ts"), "utf8");
const entradas = [];
for (const bloco of registrySrc.matchAll(/\{\s*wave:\s*"([^"]+)",\s*batch:\s*"([^"]+)",\s*url:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*ownerId:\s*"([^"]+)",\s*cluster:\s*"([^"]+)",\s*role:\s*"([^"]+)",\s*publishedAt:\s*"([^"]+)"/g)) {
  const [, wave, batch, url, slug, ownerId, cluster, role, publishedAt] = bloco;
  entradas.push({ wave, batch, url, slug, ownerId, cluster, role, publishedAt });
}

const sitemapXml = existsSync(resolve(root, "public/sitemap-editorial.xml"))
  ? readFileSync(resolve(root, "public/sitemap-editorial.xml"), "utf8")
  : "";
const verdicts = readJson("public/editorial-verdicts.json");
const submissions = readJson("public/editorial-submissions.json");
const liberacao = readJson("config/onda-11-liberacao.json");

const porUrlVeredito = new Map((verdicts?.urls ?? []).map((u) => [u.url, u]));
const porUrlSubmissao = new Map((submissions?.urls ?? []).map((u) => [u.url, u]));

const urls = entradas.map((e) => {
  const v = porUrlVeredito.get(e.url) ?? null;
  const s = porUrlSubmissao.get(e.url) ?? null;
  const aprovado = EDITORIAL_WAVE_SLUGS.includes(e.slug);
  const noSitemap = sitemapXml.includes(`${e.url}<`) || sitemapXml.includes(`${e.url}</loc>`);
  const status = !aprovado
    ? "RASCUNHO"
    : s?.publicado === false
      ? "ERRO"
      : v?.veredito === "PUBLISHED"
        ? "PUBLICADO"
        : v?.veredito === "PROBLEM"
          ? "ERRO"
          : v?.veredito
            ? "PENDENTE"
            : "PENDENTE";
  return {
    ...e,
    lote: `${e.wave}/${e.batch}`,
    aprovado,
    noSitemap,
    status,
    veredito: v?.veredito ?? "UNKNOWN",
    estadoBusca: v?.estadoBusca ?? "UNKNOWN",
    ultimoCrawl: v?.ultimoCrawl ?? null,
    submetidoSitemap: s?.submitted_via_sitemap ?? v?.submittedViaSitemap ?? false,
    submetidoIndexNow: s?.submitted_via_indexnow ?? v?.submittedViaIndexNow ?? false,
    ultimaAtualizacao: s?.last_submission_at ?? v?.lastSubmissionAt ?? null,
    httpStatus: s?.http_status ?? null,
    canonicalValido: s?.canonical_valido ?? v?.canonicalValidado ?? null,
    schemaValido: s?.schema_valido ?? v?.schemaValidado ?? null,
    erros: s?.erros ?? v?.errosPublicacao ?? [],
  };
});

const lotes = [...new Set(urls.map((u) => u.lote))].map((lote) => {
  const itens = urls.filter((u) => u.lote === lote);
  const conta = (st) => itens.filter((i) => i.status === st).length;
  const datas = itens.map((i) => i.ultimaAtualizacao).filter(Boolean).sort();
  return {
    lote,
    wave: itens[0].wave,
    batch: itens[0].batch,
    total: itens.length,
    publicadas: conta("PUBLICADO"),
    pendentes: conta("PENDENTE"),
    erros: conta("ERRO"),
    rascunhos: conta("RASCUNHO"),
    aprovadas: itens.filter((i) => i.aprovado).length,
    noSitemap: itens.filter((i) => i.noSitemap).length,
    publicadoEm: itens.map((i) => i.publishedAt).sort()[0] ?? null,
    ultimaAtualizacao: datas.length ? datas[datas.length - 1] : null,
    cobertura: itens.length ? Math.round((conta("PUBLICADO") / itens.length) * 100) : 0,
  };
});

const saida = {
  geradoEm: new Date().toISOString(),
  fonte: {
    gscDisponivel: Boolean(verdicts?.fonte?.gscDisponivel),
    verdictsEm: verdicts?.geradoEm ?? null,
    submissionsEm: submissions?.geradoEm ?? null,
    sitemapDinamico: "sitemap-editorial.xml",
  },
  liberacaoManual: liberacao
    ? {
        onda: liberacao.onda,
        lote: liberacao.lote,
        liberado: liberacao.liberado === true,
        autorizadoPor: liberacao.autorizadoPor ?? null,
        autorizadoEm: liberacao.autorizadoEm ?? null,
      }
    : null,
  total: urls.length,
  lotes,
  urls,
};

writeFileSync(resolve(root, "public/editorial-lotes.json"), `${JSON.stringify(saida, null, 2)}\n`);
const histDir = resolve(root, "public/editorial/lotes");
mkdirSync(histDir, { recursive: true });
writeFileSync(resolve(histDir, `${saida.geradoEm.replace(/[:.]/g, "-")}.json`), `${JSON.stringify(saida)}\n`);

console.log(
  `[lotes] ${lotes.length} lote(s) · ${urls.length} URL(s) · publicadas=${urls.filter((u) => u.status === "PUBLICADO").length} pendentes=${urls.filter((u) => u.status === "PENDENTE").length} rascunhos=${urls.filter((u) => u.status === "RASCUNHO").length}`,
);
