# Status de indexação — Onda 10C · Lote 4 (webcam e Windows Update)

- Gerado em: 2026-08-26 (execução real de `npm run monitor:editorial-waves`)
- Propriedade Search Console: `sc-domain:otecnicodeinformatica.com.br`
- Fonte: `public/editorial-waves-status.json`, `public/editorial-waves-alerts.json`,
  `public/editorial-indexnow-status.json` — nenhum valor estimado.
- Regra de leitura: `NO_DATA` / `UNKNOWN` significam **ausência de sinal do Google**.
  Não são zero, não são "não indexada" e não são defeito.

## Por URL (Lote 4 · publicado em 2026-08-26)

| URL | publishedAt / lastMaterialChange | contentHash | lastCrawlTime | POST_CHANGE_CRAWL | Estado normalizado | Canonical declarado (HTML) | Canonical Google selected | Impressions | Clicks | Canonical conflict | Blocked |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| /blog/webcam-nao-funciona-o-que-verificar | 2026-08-26 | c22e01753ec4 | UNKNOWN | UNKNOWN | NO_DATA (URL is unknown to Google) | presente (self-canonical, validado em SSR/E2E) | UNKNOWN | UNKNOWN | UNKNOWN | NÃO | NÃO |
| /blog/permissoes-de-camera-no-windows | 2026-08-26 | b29a1a1b2bb7 | UNKNOWN | UNKNOWN | NO_DATA | presente | UNKNOWN | UNKNOWN | UNKNOWN | NÃO | NÃO |
| /blog/webcam-usb-nao-e-detectada | 2026-08-26 | 668f204319f9 | UNKNOWN | UNKNOWN | NO_DATA | presente | UNKNOWN | UNKNOWN | UNKNOWN | NÃO | NÃO |
| /blog/windows-update-nao-funciona-o-que-verificar | 2026-08-26 | b61a44efe7a3 | UNKNOWN | UNKNOWN | NO_DATA | presente | UNKNOWN | UNKNOWN | UNKNOWN | NÃO | NÃO |
| /blog/limpar-cache-do-windows-update-softwaredistribution | 2026-08-26 | d7955359ec49 | UNKNOWN | UNKNOWN | NO_DATA | presente | UNKNOWN | UNKNOWN | UNKNOWN | NÃO | NÃO |
| /blog/windows-update-travado-desfazendo-alteracoes | 2026-08-26 | bc55a5d38ab7 | UNKNOWN | UNKNOWN | NO_DATA | presente | UNKNOWN | UNKNOWN | UNKNOWN | NÃO | NÃO |

`POST_CHANGE_CRAWL = YES` só seria marcado com `lastCrawlTime > lastMaterialChange`.
Como o Google ainda não reporta rastreio algum, o valor correto é `UNKNOWN` — não `NO`.

## Alertas edge-triggered

- Alertas novos disparados nesta execução: **0**.
- Estados acompanhados: 22 URLs (Lote 4 inclusive), todas em `PUBLISHED` (interno, `source: EDITORIAL`)
  + `NO_DATA` (Google, `source: GSC`).
- Deduplicação: nenhum evento repetido; nenhum alerta reemitido para estado já registrado.
- Entrega: `DELIVERY_DISABLED` (Slack `NOT_CONFIGURED`, e-mail `NOT_CONFIGURED`) — comportamento
  fail-closed esperado, sem falha silenciosa.

## IndexNow (Lote 4)

Todas as 6 URLs em `READY` — `lastSubmittedHash = nenhum`, `currentContentHash = hash do deploy`
(`deploymentConfirmed: true`). Nenhum reenvio do mesmo `contentHash`.
`SUBMITTED` nunca equivale a `INDEXED`.

## Conclusão do lote

O Lote 4 está tecnicamente pronto (SSR, canonical, schema determinístico, assets licenciados,
sitemap sincronizado) e em janela normal de descoberta. O estado correto é **WAIT**, não
`CRAWLED_NOT_INDEXED`: sem rastreio pós-publicação, não existe diagnóstico de indexação a fazer.
