---
name: Infra de ondas editoriais (Onda 10C — Infra 1)
description: Registry declarativo de ondas/lotes, monitor GSC por lote, gate anti-canibalização pré-publicação, painel /admin/editorial-ondas e E2E ampliado.
type: feature
---

Fonte única de observação editorial por onda/lote:

- `src/lib/editorialWavesRegistry.ts` — declara wave, batch, url, slug, ownerId, cluster, role, publishedAt, targetQueries e doNotDuplicate. Não decide indexabilidade (isso continua em `blogEditorialRegistry.ts`).
- `npm run monitor:editorial-waves` (`scripts/monitor-editorial-waves.ts`) — usa o gateway GSC já existente (`scripts/lib/gsc-client.mjs`, nunca uma segunda integração Google), resolve contentHash do trecho-fonte em `src/data/blogPostsContent.tsx`, sitemapLastmod dos sitemaps publicados e indexNowSentAt de `public/indexnow-status.json`. Grava `public/editorial-waves-status.json` fail-closed (sem credencial → UNKNOWN, nunca zero).
- `npm run check:editorial-cannibalization` — gate PRÉ-publicação; teto de similaridade Jaccard 0.40, falha em consulta-alvo declarada por duas URLs e em candidato que já exista no acervo. Testar novo lote com `-- --candidato="/blog/slug:consulta 1,consulta 2"`.
- `/admin/editorial-ondas` (`src/pages/admin/AdminEditorialOndas.tsx`) — painel consolidado por lote, lê só o artefato público.
- `e2e/onda-10c-infra.spec.ts` — percorre todas as URLs do registry: SEO SSR, canonical, JSON-LD, breadcrumb e CTA (sem `wa.me` direto no editorial).

Regra: todo novo lote entra primeiro no registry e passa pelo gate anti-canibalização antes de publicar.
