# Micro-rodada de descoberta GSC — pilares desconhecidos — 2026-10-03

## Estado de partida

- `main`: `b2a0f28f39af2f31a60f236760d40d18ec5aa591` (PR #342).
- blog com sinal GSC: marco editorial anterior **60/60 revisado e fact-checkado**; esta rodada não reabre essa auditoria.
- `SERVICO_CIDADE`: **69** páginas explicitamente qualificadas.
- sitemap total no último gate: **403 URLs**.

## Inspeção GSC ao vivo

As quatro URLs abaixo foram inspecionadas em 2026-10-03 e retornaram:

- verdict: `NEUTRAL`;
- coverage: **URL is unknown to Google**;
- sem `lastCrawlTime`;
- sem referring URLs registrados pela inspeção.

URLs:
1. `/diagnostico-tecnico`
2. `/equipamentos-atendidos`
3. `/areas-atendidas`
4. `/coleta-e-entrega`

## O que NÃO está quebrado

Antes da mudança foi confirmado que:

- as quatro URLs estão declaradas em `scripts/lib/curated-urls.mjs`;
- as quatro estão presentes em `sitemap-main.xml`;
- `PageSEO` emite canonical self e robots `index, follow` quando a indexação do site está ligada;
- o sitemap principal está submetido no Search Console sem warnings ou erros;
- o HTML público de Equipamentos, Áreas e Diagnóstico contém conteúdo editorial substancial.

Isso aponta para problema de **descoberta/crawl**, não para falta de autorização de indexação.

## Mudança desta rodada

1. cria fonte única `src/lib/discoveryPillars.ts` com as quatro URLs;
2. renderiza links diretos na home **fora de lazy/Suspense**, presentes no HTML SSR inicial;
3. adiciona Diagnóstico, Equipamentos e Coleta ao rodapé persistente;
4. adiciona Áreas Atendidas ao bloco global de interlinking;
5. mantém conteúdo, URLs, canonicals, robots e política local inalterados.

## Regra de promoção

Não há nova URL criada nem mudança artificial de `noindex → index`: essas páginas já eram indexáveis e curadas. A meta é reduzir profundidade de clique e dar sinais de descoberta consistentes.

Após merge e deploy, `sitemap-main.xml` e `sitemap-index.xml` devem ser reenviados ao Search Console. Reinspeção imediata pode continuar `URL is unknown to Google`, porque crawl/indexação não é síncrona.
