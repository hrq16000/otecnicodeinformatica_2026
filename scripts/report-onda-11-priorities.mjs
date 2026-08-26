#!/usr/bin/env node
/**
 * MAPEAMENTO DA ONDA 11 — prioridades P1/P2/P3 a partir de dados reais.
 *
 * NÃO cria URL e NÃO autoriza publicação: produz uma fila priorizada com base
 * em (a) candidatos já levantados em docs/onda-11-oportunidades-p1.json,
 * (b) indexação real da Onda 10C (public/editorial-waves-status.json),
 * (c) risco de canibalização com o acervo e (d) conversão por cluster quando
 * houver artefato. Sem evidência → prioridade rebaixada, nunca promovida.
 *
 * Saídas: reports/editorial/11/prioridades.json e docs/onda-11-prioridades.md
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = process.cwd();
const ler = (p) => {
  const f = resolve(ROOT, p);
  if (!existsSync(f)) return null;
  try {
    return JSON.parse(readFileSync(f, "utf8"));
  } catch {
    return null;
  }
};

const candidatos = ler("docs/onda-11-oportunidades-p1.json")?.opportunities ?? [];
const indexacao = ler("public/editorial-waves-status.json");
const auditoria = ler("reports/editorial/10c/audit-latest.json");
const conversao = ler("public/funnel-cluster-status.json") ?? ler("reports/editorial/conversao-cluster.json");

const rotas = indexacao?.rotas ?? [];
const indexadas = rotas.filter((r) => r.google?.status === "INDEXED").length;
const coberturaOnda10 = rotas.length ? indexadas / rotas.length : 0;
const gscDisponivel = Boolean(indexacao?.disponivel);

// Sinal de conversão por cluster (opcional; ausente = neutro).
const conversaoPorCluster = new Map();
for (const linha of conversao?.clusters ?? []) {
  if (linha.cluster) conversaoPorCluster.set(String(linha.cluster).toLowerCase(), Number(linha.taxa ?? 0));
}

const bloqueios = [];
if (!gscDisponivel) bloqueios.push("Search Console indisponível nesta execução: demanda não verificada.");
if (coberturaOnda10 < 0.5) {
  bloqueios.push(
    `Onda 10C com ${(coberturaOnda10 * 100).toFixed(0)}% de cobertura de indexação: publicar novo lote antes de sinal do Google dilui rastreio.`,
  );
}
if (auditoria?.veredito === "BLOQUEADO") bloqueios.push("Auditoria consolidada em estado BLOQUEADO.");
const canibal = auditoria?.kpis?.canibalizacao;
if (canibal?.estado === "FAIL") bloqueios.push(`${canibal.acimaDoTeto} par(es) acima do teto de canibalização.`);

const itens = candidatos
  .map((c) => {
    const base = Number(c.score ?? 0);
    const sinalConversao = conversaoPorCluster.get(String(c.cluster ?? "").toLowerCase()) ?? null;
    const ajustes = [];
    let score = base;

    if (!gscDisponivel) {
      score -= 15;
      ajustes.push("−15 sem evidência de demanda no GSC");
    }
    if (coberturaOnda10 < 0.5) {
      score -= 10;
      ajustes.push("−10 Onda 10C ainda sem indexação consolidada");
    }
    if (sinalConversao !== null) {
      const b = Math.round(sinalConversao * 20);
      score += b;
      ajustes.push(`${b >= 0 ? "+" : ""}${b} sinal de conversão do cluster`);
    }
    if (c.risk) ajustes.push(`risco declarado: ${c.risk}`);

    const prioridade = score >= 70 ? "P1" : score >= 50 ? "P2" : "P3";
    return {
      cluster: c.cluster,
      intencao: c.intent ?? null,
      ownerExistente: c.existingOwner ?? null,
      scoreBase: base,
      scoreAjustado: score,
      prioridade,
      ajustes,
      risco: c.risk ?? null,
      acao:
        prioridade === "P1"
          ? "Preparar briefing e rodar o gate anti-canibalização com o candidato antes de qualquer URL."
          : prioridade === "P2"
            ? "Manter em observação: reavaliar quando houver impressões no GSC para a intenção."
            : "Não trabalhar agora: sem evidência suficiente para justificar nova URL.",
    };
  })
  .sort((a, b) => b.scoreAjustado - a.scoreAjustado);

const saida = {
  geradoEm: new Date().toISOString(),
  fonte: {
    candidatos: "docs/onda-11-oportunidades-p1.json",
    indexacao: "public/editorial-waves-status.json",
    auditoria: "reports/editorial/10c/audit-latest.json",
    conversao: conversao ? "artefato de conversão por cluster" : "indisponível (sinal neutro)",
  },
  gscDisponivel,
  coberturaOnda10: Number((coberturaOnda10 * 100).toFixed(1)),
  bloqueios,
  autorizadoPublicar: bloqueios.length === 0,
  itens,
};

mkdirSync(resolve(ROOT, "reports/editorial/11"), { recursive: true });
writeFileSync(resolve(ROOT, "reports/editorial/11/prioridades.json"), `${JSON.stringify(saida, null, 2)}\n`);

const md = `# Onda 11 — mapa de prioridades (P1–P3)

Gerado em ${saida.geradoEm}. Este documento **não autoriza criar URLs**: é a fila
priorizada a partir dos dados disponíveis no repositório e nas integrações já
existentes. Candidato sem evidência é rebaixado, nunca promovido.

- Search Console disponível: ${gscDisponivel ? "sim" : "não"}
- Cobertura de indexação da Onda 10C: ${saida.coberturaOnda10}%
- Publicação liberada: **${saida.autorizadoPublicar ? "sim, mediante gate anti-canibalização por candidato" : "não"}**

${bloqueios.length ? `## Bloqueios ativos\n\n${bloqueios.map((b) => `- ${b}`).join("\n")}` : "## Bloqueios ativos\n\nNenhum."}

## Fila priorizada

| # | Prioridade | Cluster | Intenção | Score base → ajustado | Owner existente | Ação |
| --- | --- | --- | --- | --- | --- | --- |
${itens.map((i, idx) => `| ${idx + 1} | ${i.prioridade} | ${i.cluster} | ${i.intencao ?? "—"} | ${i.scoreBase} → ${i.scoreAjustado} | ${i.ownerExistente ?? "—"} | ${i.acao} |`).join("\n")}

## Ajustes aplicados

${itens.map((i) => `- **${i.cluster}** — ${i.ajustes.length ? i.ajustes.join("; ") : "sem ajuste"}`).join("\n")}

## Regra de execução

1. Nenhum item vira URL sem passar por \`npm run check:editorial-cannibalization -- --candidato="..."\`.
2. Enquanto houver bloqueio ativo, a onda permanece em observação.
3. Reexecutar este mapa após cada auditoria consolidada.
`;

writeFileSync(resolve(ROOT, "docs/onda-11-prioridades.md"), md);
console.log(
  `[report:onda-11] ${itens.length} candidato(s) · P1 ${itens.filter((i) => i.prioridade === "P1").length} · P2 ${itens.filter((i) => i.prioridade === "P2").length} · P3 ${itens.filter((i) => i.prioridade === "P3").length} · publicação ${saida.autorizadoPublicar ? "liberada" : "bloqueada"}`,
);
