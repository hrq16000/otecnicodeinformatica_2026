---
name: Painel de autoridade SEO
description: /admin/autoridade-seo com densidade semântica, densidade de keywords e links internos das URLs editoriais publicadas
type: feature
---
- Fonte única: `public/autoridade-seo.json`, gerado por `npm run report:autoridade-seo` (roda no prebuild) a partir do HTML SSR real via `scripts/lib/ssr-harness.mjs`. Nada é estimado no navegador; sem relatório o painel avisa.
- Métricas: densidade semântica = termos distintos ÷ termos úteis do `<main>` (stopwords PT-BR removidas); keyword-alvo = slug (faixa saudável 0,5%–2,5%); links internos de saída/entrada dentro do corpus editorial (destaca URLs sem link de entrada).
- Lote 4 (Onda 11A) publicado com liberação manual em `config/onda-11-liberacao.json`; validação `npm run validar:lote4` exige TechArticle + BreadcrumbList + FAQPage.
