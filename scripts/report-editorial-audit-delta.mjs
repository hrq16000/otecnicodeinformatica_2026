#!/usr/bin/env node
/**
 * DELTA ENTRE AUDITORIAS DA ONDA 10C.
 *
 * Compara a auditoria atual (reports/editorial/10c/audit-latest.json) com a
 * execução anterior do histórico e destaca variações de schema, assets,
 * indexação, canibalização, órfãs e alertas. Sem execução anterior o estado é
 * BASELINE (nunca falso positivo).
 *
 * Saídas: reports/editorial/10c/delta-latest.json e docs/relatorio-onda-10c-delta.md
 * Uso: node scripts/report-editorial-audit-delta.mjs
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = process.cwd();
const DIR = resolve(ROOT, "reports/editorial/10c");
const HIST = join(DIR, "history");
const atualPath = join(DIR, "audit-latest.json");

if (!existsSync(atualPath)) {
  console.error("[report:editorial-delta] rode `npm run audit:editorial-10c` antes.");
  process.exit(1);
}

const atual = JSON.parse(readFileSync(atualPath, "utf8"));
const historico = existsSync(HIST)
  ? readdirSync(HIST)
      .filter((f) => f.endsWith(".json"))
      .sort()
      .map((f) => JSON.parse(readFileSync(join(HIST, f), "utf8")))
  : [];
const anterior = historico.filter((h) => h.geradoEm !== atual.geradoEm).at(-1) ?? null;

const n = (v) => (typeof v === "number" ? v : null);
const dif = (a, b) => (n(a) === null || n(b) === null ? null : n(b) - n(a));
const sinal = (d) => (d === null ? "—" : d > 0 ? `+${d}` : String(d));

const linhas = [];
const push = (dominio, metrica, de, para, { pioraSe = "aumenta" } = {}) => {
  const delta = dif(de, para);
  const piorou =
    delta === null ? false : pioraSe === "aumenta" ? delta > 0 : delta < 0;
  linhas.push({
    dominio,
    metrica,
    de: de ?? "—",
    para: para ?? "—",
    delta: sinal(delta),
    tendencia: delta === null || delta === 0 ? "ESTAVEL" : piorou ? "PIOROU" : "MELHOROU",
  });
};

if (anterior) {
  const a = anterior.kpis;
  const b = atual.kpis;
  push("indexacao", "URLs indexadas", a.indexacao?.indexadas, b.indexacao?.indexadas, { pioraSe: "diminui" });
  push("indexacao", "cobertura (%)", a.indexacao?.cobertura, b.indexacao?.cobertura, { pioraSe: "diminui" });
  push("indexnow", "URLs na fila", a.indexnow?.total, b.indexnow?.total);
  push("schema", "regressões", a.schema?.regressoes?.length, b.schema?.regressoes?.length);
  push("schema", "owners auditados", a.schema?.owners, b.schema?.owners, { pioraSe: "diminui" });
  push("assets", "FAIL", a.assets?.fail, b.assets?.fail);
  push("assets", "sem licença", a.assets?.semLicenca, b.assets?.semLicenca);
  push("assets", "sem atribuição", a.assets?.semAtribuicao, b.assets?.semAtribuicao);
  push("canibalizacao", "pares ≥ teto", a.canibalizacao?.acimaDoTeto, b.canibalizacao?.acimaDoTeto);
  push("orphans", "páginas órfãs", a.orphans?.orfas, b.orphans?.orfas);
  push("alertas", "eventos", a.alertas?.total, b.alertas?.total);
}

const mudancasDeEstado = anterior
  ? Object.keys(atual.kpis)
      .filter((k) => (anterior.kpis[k]?.estado ?? "UNKNOWN") !== atual.kpis[k].estado)
      .map((k) => ({ kpi: k, de: anterior.kpis[k]?.estado ?? "UNKNOWN", para: atual.kpis[k].estado }))
  : [];

const regressoes = [
  ...linhas.filter((l) => l.tendencia === "PIOROU"),
  ...mudancasDeEstado
    .filter((m) => ["FAIL", "SCHEMA_REGRESSION"].includes(m.para))
    .map((m) => ({ dominio: m.kpi, metrica: "estado", de: m.de, para: m.para, delta: "—", tendencia: "PIOROU" })),
];

const delta = {
  geradoEm: new Date().toISOString(),
  estado: !anterior ? "BASELINE" : regressoes.length ? "REGRESSAO" : linhas.some((l) => l.tendencia === "MELHOROU") ? "MELHORA" : "ESTAVEL",
  auditoriaAtual: atual.geradoEm,
  auditoriaAnterior: anterior?.geradoEm ?? null,
  vereditoAtual: atual.veredito,
  vereditoAnterior: anterior?.veredito ?? null,
  linhas,
  mudancasDeEstado,
  regressoes,
  proximoLote: regressoes.length
    ? "NÃO publicar novo lote: resolver as regressões listadas antes."
    : atual.veredito === "SAUDAVEL"
      ? "Sem regressão: novo lote pode ser avaliado com evidência de demanda (GSC)."
      : "Aguardar dados: KPIs ainda sem fonte suficiente para autorizar novo lote.",
};

mkdirSync(DIR, { recursive: true });
writeFileSync(join(DIR, "delta-latest.json"), `${JSON.stringify(delta, null, 2)}\n`);

const md = `# Onda 10C — delta entre auditorias

Gerado em ${delta.geradoEm} · estado **${delta.estado}**.

- Auditoria atual: ${delta.auditoriaAtual} (veredito ${delta.vereditoAtual})
- Auditoria anterior: ${delta.auditoriaAnterior ?? "— (primeira execução)"}${delta.vereditoAnterior ? ` (veredito ${delta.vereditoAnterior})` : ""}

${
  anterior
    ? `| Domínio | Métrica | Antes | Agora | Δ | Tendência |
| --- | --- | --- | --- | --- | --- |
${linhas.map((l) => `| ${l.dominio} | ${l.metrica} | ${l.de} | ${l.para} | ${l.delta} | ${l.tendencia} |`).join("\n")}`
    : "Primeira execução registrada: não há execução anterior para comparar. As próximas rodadas passam a exibir a tabela de variação."
}

${mudancasDeEstado.length ? `## Mudanças de estado\n\n${mudancasDeEstado.map((m) => `- \`${m.kpi}\`: ${m.de} → ${m.para}`).join("\n")}` : ""}

## Orientação para o próximo lote

${delta.proximoLote}
`;

writeFileSync(resolve(ROOT, "docs/relatorio-onda-10c-delta.md"), md);
console.log(`[report:editorial-delta] ${delta.estado} · ${linhas.length} métrica(s) · ${regressoes.length} regressão(ões)`);
