---
name: Fase 4 — guias de decisão independentes (/decisoes)
description: 7 rotas /decisoes, ponte pilar→decisão, painel /admin/biblioteca e gate check:biblioteca ampliado para decisões.
type: feature
---

- Rotas novas: `/decisoes` (hub, CollectionPage+ItemList) e `/decisoes/<slug>`
  (WebPage + FAQPage). Fonte única: `src/lib/guiasDecisao.ts` com 6 guias —
  formatar-ou-reparar, ssd-ou-memoria-ram, consertar-ou-substituir,
  remoto-ou-presencial, hd-com-ruido, backup-antes-da-manutencao.
- Cada guia reaproveita o card correspondente de `ATLAS_GUIAS_DECISAO`
  (pergunta, critério, sinais dos dois lados, risco) — nunca duplica o dado.
- Malha bidirecional: cards do Atlas linkam "Guia completo desta decisão";
  `DECISAO_POR_SINTOMA` em `src/lib/atlasPontes.ts` leva o pilar do sintoma ao
  guia (fail-closed, texto próprio por sintoma) via `AtlasPonteProblema`.
- Sitemap: `DECISOES_SLUGS` em `scripts/lib/curated-urls.mjs` (bloco
  BIBLIOTECA) — 214 URLs curadas. Regenerar com
  `node scripts/generate-sitemaps.mjs`.
- Gate `check:biblioteca` ampliado: paridade slug↔sitemap, card no Atlas,
  ≥3 critérios, condições de parada, ≥2 FAQ, fonte primária https, links
  reais, respostas diretas não repetidas e proibição de promessa de prazo.
- Painel `/admin/biblioteca`: inventário lido direto do código (glossário,
  ferramentas, decisões), KPIs de fonte/link ausentes, CSV e reenvio IndexNow
  individual ou em lote.
