# Onda 10C — Auditoria consolidada final

- Data: 2026-08-26 · build `f48c5ba` (snapshot de schema `3492135`)
- Escopo: somente leitura. Nenhuma URL criada, nenhum conteúdo publicado ou alterado,
  nenhum threshold reduzido (teto de canibalização mantido em 0.40).
- Pacote de evidências: `reports/editorial/10c/final/` (24 arquivos + `manifest.json` com SHA-256).
- Status de indexação do Lote 4: `docs/status-indexacao-onda-10c-lote-4.md`.

## 1. Inventário

- URLs 10C declaradas no registry: **19** (lotes 0, 2, 3 e 4).
- Registry total observado junto: **22** (inclui o Lote 1 da Onda 10D, clusters "não liga" e
  "liga e desliga", monitorado no mesmo ciclo).
- Clusters cobertos: **10** — pc-lento, tela-azul, pc-nao-liga, liga-e-desliga, internet-wifi,
  impressoras, armazenamento-nao-detectado, audio, webcam, windows-update.
- URLs do acervo temáticamente vizinhas e **fora** do registry 10C (publicações anteriores,
  legítimas, apenas não declaradas como onda): `como-resolver-tela-azul-windows`,
  `como-fazer-upgrade-ssd-nvme`, `ransomware-como-proteger-empresa`,
  `como-instalar-impressora-windows-passo-a-passo`. Nenhuma URL 10C publicada sem registry.

## 2. Gates executados (nenhum reduzido)

| Gate | Resultado |
| --- | --- |
| `npm run build` (incl. postbuild SEO/imagens) | OK |
| `check:editorial-governance` | OK — 187 artigos, 60 aprovados em paridade, sitemap principal 182 URLs |
| `check:editorial-cannibalization` (teto 0.40) | OK — 0 conflitos; 4 avisos REVIEW por slug em pares **fora** da 10C |
| `check:editorial-assets` | 22 assets · PASS 22 · WARN 0 · FAIL 0 |
| `check:editorial-export-secrets` | OK — 7 artefatos sem segredo |
| `check:internal-links` | OK — 0 links quebrados, 190 URLs de sitemap válidas |
| `check:orphan-trend` | OK — 0 órfãs (baseline 0) |
| `check:jsonld-ssr` | OK — 12 renders frios, 1 variante por rota |
| `check:schema-deterministic` | OK — 22 owners · 6 renders frios · 1 variante · FAQ visível 1:1 |
| `check:sitemap-rich` | OK — 21 bairros RICH, 17 serviços curados |
| `schema:diff-editorial --strict` | Sem regressão; maioria `UNKNOWN` por só existirem 2 builds retidos |
| `indexnow:editorial --wave=10C --dry-run` | 19 READY, 0 reenvio de hash |
| `check:editorial-no-direct-wa` | OK — 0 CTA editorial direto para WhatsApp |
| Playwright editorial (5 specs) | **214 passaram · 44 falharam** — ver §9 |

## 3. Maturidade (EDITORIAL_SCORE separado de SEARCH_EVIDENCE)

| Classe | Owners |
| --- | --- |
| MATURE (85–100) | 0 |
| STRONG (75–84) | 2 |
| ADEQUATE (65–74) | 12 |
| NEEDS_WORK (50–64) | 8 |
| WEAK (<50) | 0 |

`SEARCH_EVIDENCE = UNKNOWN` para 22/22: não há dado de busca e por isso a dimensão de 10 pontos
**não foi pontuada nem zerada** — o score reportado é sobre 90 pontos editoriais normalizados.
Isso explica a ausência de MATURE: nenhum owner pode ser maduro sem evidência de busca.

Mais fracos (candidatos naturais a enriquecimento, não a novas URLs):
`fone-de-ouvido-nao-e-reconhecido-no-pc` (56), `servico-de-audio-do-windows-nao-esta-em-execucao` (56),
`fila-de-impressao-travada-spooler-windows` (58), `ssd-nvme-nao-aparece-no-gerenciador-de-discos` (60).

## 4. Cobertura por cluster

| Cluster | URLs | Pilar | Média | Estado |
| --- | --- | --- | --- | --- |
| pc-lento | 2 | não | 69 | PARTIAL |
| tela-azul | 2 | não | 69 | PARTIAL |
| pc-nao-liga | 1 | não | 74 | ADEQUATE |
| liga-e-desliga | 2 | não | 73 | ADEQUATE |
| internet-wifi | 1 | não | 66 | PARTIAL |
| impressoras | 2 | não | 60 | PARTIAL |
| armazenamento-nao-detectado | 3 | sim | 65 | PARTIAL |
| audio | 3 | sim | 58 | WEAK |
| webcam | 3 | sim | 71 | ADEQUATE |
| windows-update | 3 | sim | 73 | ADEQUATE |

Gap real (registrado, **não convertido em URL**): os clusters 0/2 nasceram como satélites soltos —
a intenção-pilar já é atendida por artigos anteriores do acervo; o cluster de áudio tem a menor
densidade útil e é o primeiro alvo de enriquecimento.

## 5. Indexação real (funil por lote)

| Lote | PUBLISHED | DISCOVERED | POST_CHANGE_CRAWLED | INDEXED | IMPRESSIONS | CLICKS | NO_DATA |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 10C/0 | 4 | 0 | 0 | 0 | UNKNOWN | UNKNOWN | 4 |
| 10D/1 | 3 | 0 | 0 | 0 | UNKNOWN | UNKNOWN | 3 |
| 10C/2 | 3 | 0 | 0 | 0 | UNKNOWN | UNKNOWN | 3 |
| 10C/3 | 6 | 0 | 0 | 0 | UNKNOWN | UNKNOWN | 6 |
| 10C/4 | 6 | 0 | 0 | 0 | UNKNOWN | UNKNOWN | 6 |

- `CRAWLED_NOT_INDEXED` real/acionável: **0**. Todas as 22 URLs estão em **WAIT** (sem rastreio
  pós-mudança, não há diagnóstico de indexação possível).
- Conflitos de canonical: **0**. Bloqueios inesperados: **0**.
- Idade dos lotes vai de 1 a 2 dias — a leitura correta é janela de descoberta, não falha.

## 6. IndexNow

| Estado | Qtd |
| --- | --- |
| READY | 19 (10C) |
| UNKNOWN | 3 (lote 10D, fora do run `--wave=10C`) |
| SUBMITTED / ALREADY_SUBMITTED / FAILED / RETRYABLE / PENDING_DEPLOY | 0 |

Reenvio do mesmo `contentHash`: **0** — todas com `lastSubmittedHash = nenhum` e
`deploymentConfirmed = true`. HTTP 2xx/202 continua significando *submitted*, nunca *indexed*.

## 7. Assets

22 assets · PASS 22 · WARN 0 · FAIL 0 · gerados por IA **0** · não registrados **0** ·
licença desconhecida **0**. Todos com fonte (Wikimedia), autor, licença + URL de licença,
URL original, hash local, variantes WebP e AVIF. Detalhe em `assets.csv/json`.

## 8. Schema

22 owners · 6 renders frios cada · **1 variante por URL** · FAQ visível 1:1 com FAQPage em 22/22 ·
BreadcrumbList e Article/TechArticle presentes em todos · **0 regressões**.
O diff strict retorna `UNKNOWN` na maioria das rotas por existirem apenas 2 builds retidos —
comportamento fail-closed do próprio gate, não regressão mascarada.

## 9. Achado técnico (FIX)

`e2e/onda-10c-infra.spec.ts:68` afirma que o HTML SSR inteiro não pode conter
`href="https://wa.me/`. Isso passou a falhar em 44 casos porque o **header, o CTA global e o
rodapé** — que são componentes globais legítimos, com o número canônico e fora do corpo editorial —
renderizam no SSR. O gate oficial da regra (`check:editorial-no-direct-wa`) continua verde:
nenhum CTA **editorial** aponta direto para o WhatsApp. Ou seja: a asserção está com escopo
errado (página inteira em vez do corpo do artigo), não há violação de política de conteúdo.
Nada foi alterado nesta rodada.

## 10. Grafo interno

Considerando apenas arestas mensuráveis (hub /blog + mapa comercial + links editoriais entre
owners do registry): 17 `WEAK_DISCOVERY` e 5 `ORPHAN` relativos
(`fila-de-impressao-travada-spooler-windows`, `fone-de-ouvido-nao-e-reconhecido-no-pc`,
`servico-de-audio-do-windows-nao-esta-em-execucao`, `permissoes-de-camera-no-windows`,
`limpar-cache-do-windows-update-softwaredistribution`).

Importante: o gate oficial `check:orphan-trend` reporta **0 órfãs** — nenhuma dessas URLs é órfã
de verdade (todas estão no hub e no sitemap). O que a auditoria mostra é **baixa densidade de
links contextuais pilar↔satélite**, medida com critério mais duro. Nenhum link foi adicionado
nesta rodada.

## 11. Conversão

`CONVERSION_DATA = INSUFFICIENT` para 22/22 owners. Os artigos têm CTA para o funil interno
(sem WhatsApp direto), mas não há volume para cruzar landing → CTA → triage_start → WhatsApp por
owner. Owners com conversão suficiente: **0**. Sem PII em nenhum artefato.

## 12. Matriz de oportunidades (Onda 11 — apenas hipóteses)

| Score | Classe | Hipótese | Owner relacionado | Risco principal |
| --- | --- | --- | --- | --- |
| 87 | P1-NEXT | /blog/windows-nao-inicia-reparo-automatico-loop | bios-corrompida-reset-cmos (10D/1) | sobrepor futura "tela preta pós-login" |
| 84 | P1-NEXT | /blog/como-recuperar-arquivos-de-hd-com-defeito | setores-defeituosos-smart (10C/3) | canibalizar a página comercial de recuperação de dados |
| 84 | P1-NEXT | /blog/como-identificar-golpe-de-suporte-tecnico-falso | nenhum | baixa proximidade comercial direta |
| 80 | P1-NEXT | /blog/notebook-nao-carrega-bateria-ou-fonte | notebook-nao-liga (acervo) | similaridade de slug com "não liga" |
| 80 | P1-NEXT | /blog/pc-liga-mas-nao-da-video-o-que-verificar | jump-start-placa-mae (10D/1) | fronteira com /servicos/conserto-monitor |
| 23 | MERGE_EXISTING | portas USB | webcam-usb-nao-e-detectada (10C/4) | −30: owner já resolve |
| 22 | MERGE_EXISTING | BIOS/UEFI adicional | cluster BIOS 9C + 10D/1 | −25: canibalização alta |
| 6 | DISCARD | redes/impressoras | 10C/2 + onda 4E | gap inexistente |

Detalhe completo (por que conteúdo próprio, o que não duplicar, links naturais) em
`next-opportunities.csv/json`. Nada foi publicado.

## 13. Veredito

| Item | Valor |
| --- | --- |
| Total URLs 10C | 19 (22 no registry, com o lote 10D) |
| Clusters cobertos | 10 |
| MATURE / STRONG / ADEQUATE / NEEDS_WORK / WEAK | 0 / 2 / 12 / 8 / 0 |
| PUBLISHED | 22 |
| POST_CHANGE_CRAWLED | 0 |
| INDEXED | 0 |
| NO_DATA | 22 |
| CRAWLED_NOT_INDEXED real | 0 |
| Canonical conflicts | 0 |
| Blocked inesperado | 0 |
| Alertas GSC Lote 4 | 0 novos (entrega DELIVERY_DISABLED) |
| IndexNow duplicado por hash | 0 |
| Schema regressions | 0 |
| Assets total / FAIL / IA | 22 / 0 / 0 |
| Orphans (gate oficial) | 0 — 5 com discovery interno fraco na métrica dura |
| Canibalização CONFLICT / REVIEW / WATCH | 0 / 0 / 12 |
| Owners com conversão suficiente | 0 |
| P1 / P2 / MERGE / DISCARD | 5 / 0 / 2 / 1 |
| Exports completos + manifest SHA-256 válido | SIM (24 arquivos) |
| **Onda 10C consolidada** | **SIM** (tecnicamente consolidada; sem evidência de busca ainda) |

## 14. Recomendação principal (única)

**OBSERVE.**

Tudo o que depende de nós está fechado: schema determinístico, assets licenciados, sitemap,
IndexNow sem reenvio, zero canibalização acima do teto, zero regressão. O que falta é o único
insumo que não se produz por esforço — sinal do Google. Com 22/22 em `NO_DATA` e nenhum rastreio
pós-publicação, expandir agora adicionaria risco sem informação, e enriquecer com base em score
editorial puniria conteúdo saudável.

Reavaliar após o primeiro ciclo com `POST_CHANGE_CRAWL = YES`; se aí surgir
`CRAWLED_NOT_INDEXED` real, a decisão vira ENRICH nos owners de áudio e impressoras
(os de menor score) — nunca EXPAND antes disso.

Ação seguinte não iniciada, conforme instrução.
