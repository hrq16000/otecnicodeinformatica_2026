---
name: Auditoria editorial automatizada e QA de interlinks
description: Auditoria 10C periódica (KPIs, delta, alertas de regressão), mapa da Onda 11 e gates fail-fast de interlinks.
type: feature
---

Auditoria editorial (só lê artefatos já gerados; nunca cria URL):

- `npm run audit:editorial-10c` → `reports/editorial/10c/audit-latest.json`, histórico (20 execuções) e `docs/relatorio-onda-10c-auditoria-kpis.md`. Artefato ausente = `UNKNOWN`, nunca zero.
- `npm run report:editorial-delta` → compara com a execução anterior; primeira vez = `BASELINE`. Saída em `docs/relatorio-onda-10c-delta.md`.
- `npm run alerts:editorial-regression` → eventos de SCHEMA_REGRESSION, JSON-LD não determinístico, FAQPage sem FAQ visível e BreadcrumbList sem trilha visual, entregues por `scripts/lib/editorial-alert-delivery.mjs` com link para `/admin/editorial-ondas?tab=schema`.
- `npm run report:onda-11` → fila P1–P3 em `docs/onda-11-prioridades.md`; sem GSC ou com cobertura 10C < 50% a publicação fica bloqueada.
- Workflow `.github/workflows/editorial-audit-10c.yml` (semanal) commita apenas `reports/` e `docs/`.
- Aba "Auditoria (KPIs)" em `/admin/editorial-ondas` (`src/components/admin/EditorialAuditoriaPanel.tsx`) consome só `public/editorial-*.json`.

Qualidade de interlinks:

- `scripts/lib/interlinks-inspect.mjs` é a inspeção compartilhada de `src/lib/interlinksGerados.ts`.
- `npm run check:interlinks-quality` roda no **prebuild** e falha em slug cru na âncora ("atendimento em sitio-cercado"), nome fora de `bairrosDirectory.ts`, autolink, destino duplicado ou página sem serviço.
- `npm run report:interlinks-qa` grava `reports/interlinks-qa.md|json` a cada build (amostras + cobertura).
- `src/__tests__/interlinks-gerados.test.ts` mantém snapshots das âncoras e proíbe verticais incompatíveis (ex.: notebook molhado → conserto de TV).
- `scripts/check-problem-interlinks.ts` agora lê `src/routeTree.gen.ts` (o antigo `src/LegacyApp.tsx` não existe mais).
