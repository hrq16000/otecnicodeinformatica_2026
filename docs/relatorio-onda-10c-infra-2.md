# Onda 10C — Infra 2

Alertas GSC · IndexNow por diff · Proveniência de assets · Schema determinístico

Escopo executado sem criar URL editorial nova e sem alterar conteúdo de artigo.
Único ajuste em componente: atributo `data-faq-visivel` na seção de FAQ
(marcador estrutural, sem mudança de texto renderizado).

## A. Alertas por mudança real de estado

- `scripts/lib/editorial-alerts.mjs` — motor *edge-triggered* com deduplicação.
- Estados de busca (evidência GSC): `NO_DATA`, `DISCOVERED_NOT_INDEXED`,
  `CRAWLED_NOT_INDEXED`, `INDEXED`, `UNKNOWN`.
- Estado interno do pipeline (não vem do Google): `DRAFT`, `APPROVED`, `PUBLISHED`.
  Alertas desse eixo são marcados `source: EDITORIAL`, nunca `GSC`.
- Alerta só dispara na transição; repetição do mesmo estado não gera evento
  (`lastAlertedTransition` no arquivo de estado).
- Persistência: `public/editorial-waves-alerts.json`; webhook opcional via
  `EDITORIAL_ALERT_WEBHOOK` (ausente → alerta persistido, execução não falha).

Evidência: 1ª execução gerou 10 eventos `EDITORIAL ∅→PUBLISHED`; 2ª execução
gerou **0 alertas novos** (dedupe confirmado). Nenhuma URL tem evidência de
indexação: todas em `NO_DATA` na propriedade `sc-domain:otecnicodeinformatica.com.br`.

## B. IndexNow idempotente por diff

`npm run indexnow:editorial -- --wave=10C --batch=2 [--dry-run]`
(`scripts/indexnow-editorial.ts`).

Elegibilidade: `currentContentHash ≠ lastSubmittedHash` **E** deploy confirmado.
O hash é o fingerprint do conteúdo visível + JSON-LD (`content-fingerprint.mjs`);
deploy só é considerado confirmado quando a URL pública serve **o mesmo** hash.

Estados: `NOT_CHANGED`, `PENDING_DEPLOY`, `READY`, `SUBMITTED`, `RETRYABLE`,
`FAILED`, `FAILED_CONFIG`. Falha transitória preserva `lastSubmittedHash`
(nada é marcado como enviado sem aceite). **SUBMITTED ≠ INDEXED.**

Estado: `reports/indexnow/editorial-wave-status.json`.

Execução dry-run do Lote 2: 3 URLs → `PENDING_DEPLOY` (hash local difere do
público, pois o lote ainda não está no ar). Nenhum envio realizado — comportamento
fail-closed correto.

## C. Proveniência e licenciamento dos assets

- `src/lib/editorialAssetsRegistry.ts` — owner, onda/lote, caminho local, URL de
  origem, plataforma, autor, licença + URL da licença, exigência de atribuição,
  texto de crédito, `sourceType` e dimensões. Deriva das fontes já existentes
  (capas, registro editorial, registry de ondas) — sem duplicar dado.
- `npm run check:editorial-assets` valida: arquivo existe · fonte conhecida ·
  licença conhecida · atribuição completa · URL original · WebP · AVIF · anti-IA.
  Detecta `UNUSED_ASSET` (aviso) e `UNREGISTERED_ASSET` (bloqueia).
- Saída: `public/editorial-assets-status.json`; aba “Assets & licenciamento” em
  `/admin/editorial-ondas`.

Resultado: **10/10 PASS**. Todas as capas são Wikimedia com licença CC
identificada e crédito completo; variantes WebP/AVIF geradas para as capas do blog.

## D. Regressão de schema determinística

- `scripts/lib/schema-fingerprint.mjs` — fingerprint semântico do grafo JSON-LD
  (ordem estável, campos voláteis fora), FAQ visível e breadcrumb visível.
- `npm run check:schema-deterministic` — 6 renders frios por URL, em processo
  isolado, comparando fingerprint e sincronia FAQ visível ⇄ `FAQPage`.

Resultado: **10 owners · 6 renders cada · 1 variante por URL** (100% determinístico).
FAQ visível bate 1:1 com `FAQPage` em todas as URLs (4/4 ou 5/5).

Falso positivo corrigido durante a execução: o índice do artigo usa
`<details>/<summary>` e era lido como FAQ. Escopo do extrator restringido à
seção marcada `data-faq-visivel`.

Observação para o Lote 3 (não corrigida aqui, exige mudança de UI): os artigos
emitem `BreadcrumbList` sem breadcrumb **visível** na página. O gate registra
`breadcrumb: 0` e não bloqueia; decidir se a navegação passa a ser exibida.

## Estado

- Build: PASS.
- `check:editorial-assets`: PASS (10/10).
- `check:schema-deterministic`: PASS (10/10, 1 variante).
- `monitor:editorial-waves`: PASS, alertas deduplicados.
- `indexnow:editorial --dry-run`: PASS, 0 envios (deploy não confirmado).

`10C_INFRA_2 = CLOSED` · `NEXT_ALLOWED = 10C_LOTE_3` (aguardando aprovação).
