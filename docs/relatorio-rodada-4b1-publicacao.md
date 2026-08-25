# Rodada 4B.1 — Publicação, smoke e indexação (Google + Bing + IndexNow)

Nenhuma URL nova. Nenhum enriquecimento de conteúdo neste turno. Canonical,
robots, title, description e indexabilidade preservados.

## 1. Estado do repositório

- HEAD local: `27366509` · produção antes desta rodada: `235f44f` → **DEPLOY_NEEDED**.
- Typecheck limpo · unit 716/716 · `routes-import-smoke` 412/412.

## 2. Owners da rodada

5 owners 4B (`scripts/lib/owners-4b.mjs`) + 6 owners 4A congelados
(`OWNERS_4A_FROZEN`). O owner comercial `/servicos/formatacao` permanece FROZEN:
manteve fingerprint e `lastmod` de bootstrap.

## 3. Gates executados (todos verdes)

`check:content-intent` · `check:cannibalization` · `check:internal-links` ·
`check:orphan-pages` · `check:malha-interna` · `check:schema-standards` ·
`check:jsonld-refs` · `check:rich-results` · `check:sitemap-source` ·
`check:robots` · `check:lastmod-fingerprint`.

O gate de fingerprint acusou exatamente os 5 owners alterados; após
`update-content-fingerprints`, 153/153 OK e sitemaps regenerados com
`lastmod = 2026-08-25` nas rotas afetadas (`sitemap-problemas.xml`,
`sitemap-solucoes.xml`, `sitemap-servicos.xml`).

## 4. Auditoria de canibalização e intenção (novo)

`npm run report:intent-overlap-4b` → `docs/relatorio-canibalizacao-4b.md`.

15 pares avaliados entre as 6 URLs. Similaridade textual máxima **0.128**
(`/solucoes/backup × /solucoes/formatacao`), muito abaixo do limite 0.34;
similaridade de metadados máxima 0.273. **Zero canibalização.**
Recomendações de interlinking registradas (não aplicadas neste turno, que é de
publicação): decisão×execução de formatação, lento→formatação, não liga→sem
imagem e lento→backup.

## 5. Diff SSR/JSON-LD entre deploys (novo)

`npm run report:ssr-diff` (baseline: `ssr-diff:baseline`) compara texto visível,
`<h1>`, canonical, robots, title/description e tipos de JSON-LD por URL contra
`reports/ssr-baseline/`. Primeira execução promoveu a baseline (11 URLs, estado
`NEW`, 0 regressões) e publicou `public/ssr-diff-status.json`.
Uso pós-deploy: `--base=https://otecnicodeinformatica.com.br --strict` falha o
pipeline quando há perda silenciosa mesmo com `lastmod` correto.

## 6. Monitoramento contínuo de rich results (novo)

`npm run monitor:rich-results` cruza o schema declarado no HTML SSR com o que o
Google detecta (URL Inspection) e mantém histórico em
`reports/rich-results-history.json`, alertando ganhos/perdas por tipo e
propagando as mensagens de validação do Google quando existirem
(`--alert` envia a webhook/Slack). Execução atual: 11 URLs, **0 perdas · 0
ganhos**; Bing permanece `UNKNOWN` (sem credencial de Webmaster Tools).

Observação honesta: para 5 owners da 4B o Google ainda retorna `UNKNOWN` porque
a URL só entra em inspeção depois do deploy — não é sinal de perda.

## 7. Painel `/admin/indexacao`

Passou a exibir, além do quadro por URL:
- bloco **Rich results por URL** com estado PERDA/GANHO/ESTÁVEL, tipos declarados
  × detectados, e as mensagens de validação como causa;
- bloco **Diff SSR/JSON-LD** com estado por rota e perdas descritas;
- **dossiê em PDF por URL** (botão na tabela) reunindo indexação, canonical,
  schema/rich results, diff de SSR e histórico do IndexNow.

## 8. Limites

- O smoke público 6/6 e o IndexNow seletivo desta rodada só são conclusivos
  **após o deploy** (`npm run smoke:4b`, depois
  `node scripts/indexnow-ping.mjs --urls=...`).
- IndexNow `202` significa notificação aceita, nunca indexação.
- Bing Webmaster Tools segue sem credencial: qualquer campo dele é `UNKNOWN`,
  jamais zero.
