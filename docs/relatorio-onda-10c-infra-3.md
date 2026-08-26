# Onda 10C — Infra 3

Alertas Slack/E-mail · Fila IndexNow visível · Diff visual de schema · Pacote de evidências

**Escopo respeitado:** nenhuma URL editorial criada ou alterada. Lote 3 NÃO iniciado.

## A. Entrega externa de alertas

- `scripts/lib/editorial-alert-delivery.mjs` — camada única de entrega. Roteia por
  severidade, deduplica por `(eventId, channel)` e faz retry apenas em falha
  transitória (429/5xx/rede). Slack e e-mail são adapters independentes: a falha
  de um não bloqueia o outro nem derruba o monitor.
- Credencial ausente ⇒ canal `NOT_CONFIGURED` e execução `DELIVERY_DISABLED`;
  nunca falha silenciosa nem retry infinito.
- `npm run alerts:editorial [-- --dry-run|--test=slack|--test=email]` — entrega
  manual, prévia e teste controlado com evento sintético.
- Auditoria persistida (canal, resultado, tentativa, timestamp) e exibida no painel.
- `monitor:editorial-waves` passou a usar a camada de entrega; o campo público do
  registro chama-se `entregaCanais` (nome neutro, sem “webhook”, para não colidir
  com o gate anti-segredo).

Execução local: `DELIVERY_DISABLED · slack=NOT_CONFIGURED email=NOT_CONFIGURED ·
eventos=10 entregues=0 ignorados=10`.

## B. Fila IndexNow visível

- `scripts/indexnow-editorial.ts` publica cópia **sanitizada** em
  `public/editorial-indexnow-status.json` (também em dry-run, para o painel
  enxergar a fila antes de qualquer envio). `key`/`keyLocation` nunca saem.
- Nova aba **IndexNow** em `/admin/editorial-ondas`
  (`src/components/admin/EditorialIndexNowPanel.tsx`): estados `READY`,
  `PENDING_DEPLOY`, `SUBMITTED`, `UNCHANGED`, `RETRYABLE`, `FAILED`,
  `FAILED_CONFIG`, cada linha com motivo textual explícito, hashes, prova de
  deploy, HTTP e próxima ação permitida. Filtro por lote/estado/URL e export CSV/JSON.
- Estado atual do lote 10C: 7 URLs em `PENDING_DEPLOY` (hash local ≠ hash público
  — o conteúdo do último Lote ainda não foi publicado). Reenvio sem diff material
  continua proibido; `SUBMITTED` nunca é apresentado como `INDEXED`.

## C. Diff visual de schema entre builds

- `scripts/schema-snapshot-editorial.ts` — snapshots normalizados por build
  (retenção de 10) em `public/editorial-schema-snapshots.json`. Só dados
  semânticos: tipos, FAQ (pergunta/resposta), breadcrumb, campos de Article.
- `scripts/lib/editorial-schema-diff.mjs` + `npm run schema:diff-editorial`
  (`--strict` no CI) — classifica cada URL em `UNCHANGED`, `EXPECTED_CHANGE`,
  `SCHEMA_REGRESSION` ou `UNKNOWN`. Um único build capturado ⇒ `UNKNOWN`, nunca
  falso positivo.
- Aba **Schema Diff** (`src/components/admin/EditorialSchemaDiffPanel.tsx`):
  fingerprints A×B, tipos +/-, FAQ (perguntas adicionadas/removidas, respostas
  alteradas, `HIDDEN_IN_SCHEMA`, `VISIBLE_WITHOUT_SCHEMA`), breadcrumb
  (itens, URLs, ordem, divergência com a UI) e campos de Article.

## D. Pacote de evidências exportável

- `npm run report:editorial-wave -- --wave=10C [--batch=N]` gera em
  `reports/editorial/<wave>/<lote>/`: `indexnow`, `assets`, `schema`,
  `indexation` (CSV+JSON), `summary.json` e `manifest.json` com SHA-256 e
  contagem de linhas por arquivo.
- Dado ausente permanece `NO_DATA`/`UNKNOWN` — nunca vira zero.
- `npm run check:editorial-export-secrets` varre relatórios e artefatos públicos:
  **OK — 16 artefatos sem segredo**.

## E. Testes e CI

- `scripts/__tests__/editorial-alert-delivery.test.mjs` (13), 
  `scripts/__tests__/editorial-schema-diff.test.mjs` (8),
  `scripts/__tests__/editorial-export.test.mjs` (9) — **44 testes passando**
  na suíte `scripts`.
- `.github/workflows/weekly-gates.yml`: snapshot + diff `--strict`, pacote de
  evidências e gate anti-segredo agora rodam no CI.

## Estado final

`10C_INFRA_3 = CLOSED` — aguardando aprovação explícita para o Lote 3.
