---
name: Taxonomia de entidades conectadas
description: Entidades técnicas em /entidades e /entidades/<slug>, campos obrigatórios, gate check:entidades e regras de link.
type: feature
---

Fonte única: `src/lib/entidades.ts` (9 entidades: windows, ssd, memoria-ram, wifi,
backup, erro-0xc0000428, computador-lento, cidade, servico).

Campos obrigatórios por entidade: definicao, problemas, ferramentas, decisoes,
artigos, servicos, cidades, fontes, tambemChamada, resumo (>= 60 chars).

Regras:
- Nenhum link interno pode estar fora do manifesto curado (`CURATED_PATHS`).
- Páginas de entidade são DEFINICIONAIS e de navegação; diagnóstico fica em
  /problemas e execução comercial em /servicos.
- JSON-LD: hub emite `DefinedTermSet`; detalhe emite `WebPage` +
  `DefinedTerm` com `inDefinedTermSet`, `significantLink` e `citation`.
- Espelho estático gerado: `bun scripts/generate-entidades-static.ts`
  (consumido por `scripts/curated-routes-meta.mjs`).
- Gate bloqueante: `npm run check:entidades`.
- Entradas no sitemap via `ENTIDADES_SLUGS` em `scripts/lib/curated-urls.mjs`.
- Links de entrada (anti-órfã): `/guia-tecnico-informatica` (bloco Biblioteca)
  e `/decisoes`.
