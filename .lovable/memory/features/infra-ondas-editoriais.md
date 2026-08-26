---
name: Infra de ondas editoriais (Onda 10C — Infra 1 e 2)
description: Registry de ondas/lotes, monitor GSC com alertas edge-triggered, IndexNow por diff, proveniência de assets, gate anti-canibalização, schema determinístico e painel /admin/editorial-ondas.
type: feature
---

Fonte única de observação editorial por onda/lote:

- `src/lib/editorialWavesRegistry.ts` — declara wave, batch, url, slug, ownerId, cluster, role, publishedAt, targetQueries e doNotDuplicate. Não decide indexabilidade (isso continua em `blogEditorialRegistry.ts`).
- `npm run monitor:editorial-waves` (`scripts/monitor-editorial-waves.ts`) — usa o gateway GSC já existente (`scripts/lib/gsc-client.mjs`, nunca uma segunda integração Google), resolve contentHash do trecho-fonte em `src/data/blogPostsContent.tsx`, sitemapLastmod dos sitemaps publicados e indexNowSentAt de `public/indexnow-status.json`. Grava `public/editorial-waves-status.json` fail-closed (sem credencial → UNKNOWN, nunca zero).
- `npm run check:editorial-cannibalization` — gate PRÉ-publicação; teto de similaridade Jaccard 0.40, falha em consulta-alvo declarada por duas URLs e em candidato que já exista no acervo. Testar novo lote com `-- --candidato="/blog/slug:consulta 1,consulta 2"`.
- `/admin/editorial-ondas` (`src/pages/admin/AdminEditorialOndas.tsx`) — painel consolidado por lote, alertas recentes e aba de assets; lê só artefatos públicos.
- `e2e/onda-10c-infra.spec.ts` — percorre todas as URLs do registry: SEO SSR, canonical, JSON-LD, breadcrumb e CTA (sem `wa.me` direto no editorial).

Infra 2:

- `scripts/lib/editorial-alerts.mjs` — alertas edge-triggered e deduplicados em `public/editorial-waves-alerts.json`. PUBLISHED/DRAFT/APPROVED são estado INTERNO do pipeline (`source: EDITORIAL`); só NO_DATA/DISCOVERED/CRAWLED/INDEXED/UNKNOWN vêm do Google (`source: GSC`). Webhook opcional em `EDITORIAL_ALERT_WEBHOOK`.
- `npm run indexnow:editorial -- --wave=X --batch=Y [--dry-run]` — envia só quando `currentContentHash ≠ lastSubmittedHash` E a URL pública já serve o mesmo hash. Estado em `reports/indexnow/editorial-wave-status.json`. SUBMITTED nunca significa INDEXED; falha transitória preserva o hash anterior.
- `src/lib/editorialAssetsRegistry.ts` + `npm run check:editorial-assets` — proveniência/licença/atribuição/hash/WebP/AVIF/anti-IA por asset. `UNREGISTERED_ASSET` bloqueia publicação. Saída em `public/editorial-assets-status.json`.
- `npm run check:schema-deterministic` — 6 renders frios por URL do registry; exige 1 variante de fingerprint semântico e FAQ visível 1:1 com FAQPage. A FAQ visível é reconhecida pelo atributo `data-faq-visivel` (o índice do artigo também usa `<details>`).

Regras: todo novo lote entra primeiro no registry e passa pelo gate anti-canibalização antes de publicar; assets sem licença/atribuição não publicam.
