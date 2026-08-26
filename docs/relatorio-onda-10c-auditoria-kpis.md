# Onda 10C — auditoria consolidada (KPIs)

Gerado automaticamente por `npm run audit:editorial-10c` em 2026-08-26T23:19:42.648Z.
Somente artefatos já existentes no repositório são lidos — nada é inferido nem
estimado. Campo sem fonte aparece como `UNKNOWN`.

**Veredito: SAUDAVEL**

| KPI | Estado | Detalhe |
| --- | --- | --- |
| Indexação | OK | 0/19 indexadas · cobertura 0% |
| IndexNow | OK | 7 URLs · PENDING_DEPLOY: 7 |
| Schema/JSON-LD | UNKNOWN | determinismo UNKNOWN · diff UNKNOWN · regressões 0 |
| Assets | OK | 22/22 PASS · sem licença 0 · sem atribuição 0 |
| Canibalização | OK | 0 par(es) ≥ 0.4 em 0 |
| Órfãs | OK | 0 página(s) sem link interno |
| Alertas | OK | 22 evento(s) · INFO: 22 |

## Leitura

- `UNKNOWN` não é falha: significa que o artefato de origem não estava presente
  nesta execução. Rode o monitor/gate correspondente e reexecute a auditoria.
- `NO_DATA` em indexação é o estado normal de URL recém-publicada; só vira
  problema quando persiste após rastreio confirmado.
- Este relatório não autoriza publicação: novas URLs continuam exigindo o gate
  anti-canibalização e o registro de proveniência dos assets.

Histórico das execuções: `reports/editorial/10c/history/`.
Comparativo entre execuções: `docs/relatorio-onda-10c-delta.md`.
