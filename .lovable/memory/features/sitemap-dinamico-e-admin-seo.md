---
name: Sitemap dinâmico e painel /admin/seo
description: Orquestração automática do sitemap por lotes aprovados (ledger + GSC/IndexNow) e edição auditável de title/description/JSON-LD por URL
type: feature
---
- `scripts/sitemap-dynamic.mjs` (roda no prebuild, substitui o par sync+generate) sincroniza os lotes aprovados, regenera os sitemaps curados, bloqueia regressão (URL declarada que some) e grava `public/sitemap-ledger.json` + histórico em `public/sitemap/ledger/`. Flags: `--check` (CI, nada gravado), `--submit` (GSC + IndexNow só das URLs novas), `--dry-run`. Sem credencial registra `PENDING_CONFIG`, nunca sucesso fictício.
- `scripts/report-seo-inventory.mjs` (postbuild) lê o HTML SSR de `dist/` e gera `public/seo-inventory.json` com title/description/canonical/robots/schemas e avisos por URL. Sem HTML a linha vem `semHtml: true` — o painel avisa em vez de estimar. `--check` falha com metadata crítica ausente.
- `/admin/seo` (`src/pages/admin/AdminSeo.tsx`) lista as 221 URLs curadas com filtros por tipo/pendência e edita title, description, canonical, noindex e JSON-LD. Persistência em `seo_overrides`; toda alteração gera linhas campo a campo em `seo_overrides_audit`. Ambas as tabelas são restritas a `has_role(auth.uid(),'admin')`.
