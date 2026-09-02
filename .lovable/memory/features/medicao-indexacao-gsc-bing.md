---
name: Medição de indexação real (GSC + Bing)
description: Ledger diário de cobertura e desempenho com Google Search Console e Bing Webmaster, painel em /admin/seo e regra de não prometer indexação
type: feature
---

- Fonte única: `scripts/report-indexacao-ledger.mjs` (usa `scripts/lib/gsc-client.mjs` e `scripts/lib/bing-client.mjs`).
- Saídas: `public/indexacao-ledger.json` (painel), `reports/indexacao-ledger.md`, `reports/indexacao-historico.json` (série diária), `reports/indexacao-inspecao.json` (cache URL Inspection, TTL 7 dias).
- Painel: `IndexacaoLedgerPanel` em `/admin/seo`, abaixo do `SitemapLedgerPanel`.
- Scripts npm: `report:indexacao-ledger`, `:inspecionar` (40 URLs), `:alert` (exit 1 em regressão).
- CI: passo "Ledger de indexação real" no workflow `editorial-verdicts-daily.yml` com `--inspecionar=25`; artefatos commitados no mesmo passo do ledger editorial.
- Credenciais: `LOVABLE_API_KEY` + `GOOGLE_SEARCH_CONSOLE_API_KEY` (gateway) e `BING_WEBMASTER_API_KEY` (+ `BING_SITE_URL` opcional). Fail-closed: sem chave o campo é `UNKNOWN`, nunca zero.
- **Regra:** nunca prometer "100% de indexação". `index:inspect` é somente leitura (não solicita indexação nem teste ao vivo). Percentual de indexadas só sobre URLs realmente inspecionadas.
- Documentação: `docs/medicao-indexacao.md`.
