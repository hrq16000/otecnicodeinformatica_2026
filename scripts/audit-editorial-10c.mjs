#!/usr/bin/env node
/**
 * AUDITORIA CONSOLIDADA DA ONDA 10C — execução periódica.
 *
 * NÃO cria URL, NÃO publica conteúdo e NÃO chama API externa: consome apenas
 * artefatos já gerados pelos monitores/gates existentes. Ausência de artefato
 * vira UNKNOWN (fail-closed), nunca zero.
 *
 * Saídas (somente reports/ e docs/):
 *   reports/editorial/10c/audit-latest.json
 *   reports/editorial/10c/history/<timestamp>.json   (retém 20)
 *   docs/relatorio-onda-10c-auditoria-kpis.md
 *
 * Uso: node scripts/audit-editorial-10c.mjs [--wave=10C]
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = process.cwd();
const WAVE = process.argv.find((a) => a.startsWith("--wave="))?.split("=")[1] ?? "10C";
const DIR = resolve(ROOT, "reports/editorial/10c");
const HIST = join(DIR, "history");

const ler = (p) => {
  const f = resolve(ROOT, p);
  if (!existsSync(f)) return null;
  try {
    return JSON.parse(readFileSync(f, "utf8"));
  } catch {
    return null;
  }
};

const desconhecido = (motivo) => ({ estado: "UNKNOWN", motivo });

/* ── Indexação (Search Console via monitor:editorial-waves) ───────────── */
function kpiIndexacao() {
  const d = ler("public/editorial-waves-status.json");
  if (!d) return desconhecido("public/editorial-waves-status.json ausente");
  const rotas = (d.rotas ?? []).filter((r) => !WAVE || r.wave === WAVE || WAVE === "TODAS");
  const porEstado = {};
  for (const r of rotas) {
    const s = r.google?.status ?? "UNKNOWN";
    porEstado[s] = (porEstado[s] ?? 0) + 1;
  }
  const indexadas = porEstado.INDEXED ?? 0;
  return {
    estado: d.disponivel ? "OK" : "UNKNOWN",
    motivo: d.disponivel ? null : "Search Console sem credencial neste ambiente",
    geradoEm: d.geradoEm ?? null,
    total: rotas.length,
    indexadas,
    cobertura: rotas.length ? Number(((indexadas / rotas.length) * 100).toFixed(1)) : null,
    porEstado,
    lotes: d.lotes ?? [],
  };
}

/* ── IndexNow (fila por diff de contentHash) ──────────────────────────── */
function kpiIndexNow() {
  const d = ler("public/editorial-indexnow-status.json") ?? ler("public/indexnow-status.json");
  if (!d) return desconhecido("public/editorial-indexnow-status.json ausente");
  const rotas = d.rotas ?? [];
  const porEstado = {};
  for (const r of rotas) {
    const s = r.submissionState ?? "UNKNOWN";
    porEstado[s] = (porEstado[s] ?? 0) + 1;
  }
  return { estado: "OK", geradoEm: d.geradoEm ?? null, total: rotas.length, porEstado };
}

/* ── Schema determinístico + diff entre builds ────────────────────────── */
function kpiSchema() {
  const diff = ler("public/editorial-schema-diff.json");
  const fp = ler("reports/schema/editorial-schema-fingerprints.json");
  if (!diff && !fp) return desconhecido("nenhum artefato de schema disponível");
  const regressoes = (diff?.linhas ?? []).filter((l) => l.estado === "SCHEMA_REGRESSION");
  return {
    estado: diff?.estado ?? "UNKNOWN",
    motivo: diff?.motivo ?? null,
    geradoEm: diff?.geradoEm ?? fp?.geradoEm ?? null,
    buildA: diff?.buildA ?? null,
    buildB: diff?.buildB ?? null,
    determinismo: fp?.comparacao ?? "UNKNOWN",
    owners: fp?.rotas?.length ?? null,
    regressoes: regressoes.map((l) => ({ url: l.url ?? l.owner ?? "—", motivo: l.motivo ?? l.detalhe ?? "—" })),
  };
}

/* ── Assets: proveniência, licença e atribuição ───────────────────────── */
function kpiAssets() {
  const d = ler("public/editorial-assets-status.json");
  if (!d) return desconhecido("public/editorial-assets-status.json ausente");
  return {
    estado: d.fail > 0 || (d.unregistered ?? []).length > 0 ? "FAIL" : d.warn > 0 ? "WARN" : "OK",
    geradoEm: d.geradoEm ?? null,
    total: d.total ?? 0,
    pass: d.pass ?? 0,
    warn: d.warn ?? 0,
    fail: d.fail ?? 0,
    semLicenca: d.semLicenca ?? 0,
    semAtribuicao: d.semAtribuicao ?? 0,
    unregistered: d.unregistered ?? [],
    unused: d.unused ?? [],
  };
}

/* ── Canibalização (gate pré-publicação) ──────────────────────────────── */
function kpiCanibalizacao() {
  const d =
    ler("reports/editorial/cannibalization.json") ??
    ler("reports/problem-cannibalization.json") ??
    ler("reports/editorial/11a/cannibalization.json");
  if (!d) return desconhecido("nenhum relatório de canibalização disponível");
  const pares = d.pares ?? d.pairs ?? [];
  const teto = d.teto ?? 0.4;
  const acima = pares.filter((p) => (p.sobreposicao ?? p.similaridade ?? 0) >= teto);
  return {
    estado: acima.length ? "FAIL" : "OK",
    geradoEm: d.geradoEm ?? null,
    teto,
    pares: pares.length,
    acimaDoTeto: acima.length,
    exemplos: acima.slice(0, 5),
  };
}

/* ── Órfãs (ratchet/baseline de descoberta interna) ───────────────────── */
function kpiOrphans() {
  const d = ler("reports/orphan-baseline.json") ?? ler("config/orphan-trend-baseline.json");
  if (!d) return desconhecido("reports/orphan-baseline.json ausente");
  const total = d.total ?? d.orfas ?? (Array.isArray(d.urls) ? d.urls.length : null);
  return {
    estado: total === null ? "UNKNOWN" : total > 0 ? "WARN" : "OK",
    geradoEm: d.geradoEm ?? d.atualizadoEm ?? null,
    orfas: total,
  };
}

/* ── Alertas (edge-triggered) ─────────────────────────────────────────── */
function kpiAlertas() {
  const d = ler("public/editorial-waves-alerts.json");
  if (!d) return desconhecido("public/editorial-waves-alerts.json ausente");
  const alertas = d.alertas ?? [];
  const porSeveridade = {};
  for (const a of alertas) porSeveridade[a.severity ?? "INFO"] = (porSeveridade[a.severity ?? "INFO"] ?? 0) + 1;
  return {
    estado: "OK",
    geradoEm: d.geradoEm ?? null,
    total: alertas.length,
    porSeveridade,
    entrega: d.entrega ?? d.entregaCanais ?? null,
  };
}

const auditoria = {
  wave: WAVE,
  geradoEm: new Date().toISOString(),
  kpis: {
    indexacao: kpiIndexacao(),
    indexnow: kpiIndexNow(),
    schema: kpiSchema(),
    assets: kpiAssets(),
    canibalizacao: kpiCanibalizacao(),
    orphans: kpiOrphans(),
    alertas: kpiAlertas(),
  },
};

auditoria.veredito = (() => {
  const e = Object.values(auditoria.kpis).map((k) => k.estado);
  if (e.includes("FAIL") || e.includes("SCHEMA_REGRESSION")) return "BLOQUEADO";
  if (e.includes("WARN")) return "ATENCAO";
  if (e.every((x) => x === "UNKNOWN")) return "SEM_DADOS";
  return "SAUDAVEL";
})();

mkdirSync(HIST, { recursive: true });
writeFileSync(join(DIR, "audit-latest.json"), `${JSON.stringify(auditoria, null, 2)}\n`);
// Espelho público consumido pelo painel /admin/editorial-ondas (aba Auditoria).
mkdirSync(resolve(ROOT, "public"), { recursive: true });
writeFileSync(
  resolve(ROOT, "public/editorial-audit-10c.json"),
  `${JSON.stringify(auditoria, null, 2)}\n`,
);
writeFileSync(
  join(HIST, `${auditoria.geradoEm.replace(/[:.]/g, "-")}.json`),
  `${JSON.stringify(auditoria, null, 2)}\n`,
);

// Retenção: 20 execuções.
const antigos = readdirSync(HIST).filter((f) => f.endsWith(".json")).sort();
for (const f of antigos.slice(0, Math.max(0, antigos.length - 20))) rmSync(join(HIST, f));

/* ── Relatório humano ─────────────────────────────────────────────────── */
const k = auditoria.kpis;
const linhaEstado = (nome, kpi, detalhe) => `| ${nome} | ${kpi.estado} | ${detalhe} |`;
const md = `# Onda ${WAVE} — auditoria consolidada (KPIs)

Gerado automaticamente por \`npm run audit:editorial-10c\` em ${auditoria.geradoEm}.
Somente artefatos já existentes no repositório são lidos — nada é inferido nem
estimado. Campo sem fonte aparece como \`UNKNOWN\`.

**Veredito: ${auditoria.veredito}**

| KPI | Estado | Detalhe |
| --- | --- | --- |
${linhaEstado("Indexação", k.indexacao, k.indexacao.total !== undefined ? `${k.indexacao.indexadas ?? "—"}/${k.indexacao.total} indexadas · cobertura ${k.indexacao.cobertura ?? "—"}%` : (k.indexacao.motivo ?? "—"))}
${linhaEstado("IndexNow", k.indexnow, k.indexnow.total !== undefined ? `${k.indexnow.total} URLs · ${Object.entries(k.indexnow.porEstado ?? {}).map(([e, n]) => `${e}: ${n}`).join(" · ") || "—"}` : (k.indexnow.motivo ?? "—"))}
${linhaEstado("Schema/JSON-LD", k.schema, `determinismo ${k.schema.determinismo ?? "—"} · diff ${k.schema.estado} · regressões ${k.schema.regressoes?.length ?? "—"}`)}
${linhaEstado("Assets", k.assets, k.assets.total !== undefined ? `${k.assets.pass}/${k.assets.total} PASS · sem licença ${k.assets.semLicenca} · sem atribuição ${k.assets.semAtribuicao}` : (k.assets.motivo ?? "—"))}
${linhaEstado("Canibalização", k.canibalizacao, k.canibalizacao.pares !== undefined ? `${k.canibalizacao.acimaDoTeto} par(es) ≥ ${k.canibalizacao.teto} em ${k.canibalizacao.pares}` : (k.canibalizacao.motivo ?? "—"))}
${linhaEstado("Órfãs", k.orphans, k.orphans.orfas !== undefined && k.orphans.orfas !== null ? `${k.orphans.orfas} página(s) sem link interno` : (k.orphans.motivo ?? "—"))}
${linhaEstado("Alertas", k.alertas, k.alertas.total !== undefined ? `${k.alertas.total} evento(s) · ${Object.entries(k.alertas.porSeveridade ?? {}).map(([s, n]) => `${s}: ${n}`).join(" · ") || "—"}` : (k.alertas.motivo ?? "—"))}

## Leitura

- \`UNKNOWN\` não é falha: significa que o artefato de origem não estava presente
  nesta execução. Rode o monitor/gate correspondente e reexecute a auditoria.
- \`NO_DATA\` em indexação é o estado normal de URL recém-publicada; só vira
  problema quando persiste após rastreio confirmado.
- Este relatório não autoriza publicação: novas URLs continuam exigindo o gate
  anti-canibalização e o registro de proveniência dos assets.

Histórico das execuções: \`reports/editorial/10c/history/\`.
Comparativo entre execuções: \`docs/relatorio-onda-10c-delta.md\`.
`;

mkdirSync(resolve(ROOT, "docs"), { recursive: true });
writeFileSync(resolve(ROOT, "docs/relatorio-onda-10c-auditoria-kpis.md"), md);

console.log(`[audit:editorial-10c] veredito ${auditoria.veredito}`);
for (const [nome, kpi] of Object.entries(auditoria.kpis)) {
  console.log(`  · ${nome.padEnd(14)} ${kpi.estado}${kpi.motivo ? ` (${kpi.motivo})` : ""}`);
}
