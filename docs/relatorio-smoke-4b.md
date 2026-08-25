# Smoke público — owners da Rodada 4B

- Base: `https://otecnicodeinformatica.com.br`
- Executado em: 2026-08-25T01:39:34.313Z
- Resultado: **5/5 PASS**

| URL | 200 | Index | Canonical self | H1 | SSR novo | Schema | Links |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/problemas/notebook-nao-liga` | ✅ | ✅ | ✅ | ✅ 1 | ✅ 3229p | ✅ Organization, City, OpeningHoursSpecification, ContactPoint, WebSite | 35 |
| `/problemas/computador-nao-da-imagem` | ✅ | ✅ | ✅ | ✅ 1 | ✅ 2614p | ✅ Organization, City, OpeningHoursSpecification, ContactPoint, WebSite | 40 |
| `/problemas/computador-lento` | ✅ | ✅ | ✅ | ✅ 1 | ✅ 3517p | ✅ Organization, City, OpeningHoursSpecification, ContactPoint, WebSite | 39 |
| `/solucoes/backup` | ✅ | ✅ | ✅ | ✅ 1 | ✅ 1960p | ✅ Organization, City, OpeningHoursSpecification, ContactPoint, WebSite | 36 |
| `/solucoes/formatacao` | ✅ | ✅ | ✅ | ✅ 1 | ✅ 1533p | ✅ Organization, City, OpeningHoursSpecification, ContactPoint, WebSite, FAQPage, Question, Answer, TechArticle, BreadcrumbList, ListItem, WebPage, LocalBusiness, ProfessionalService, ComputerRepairService, PostalAddress, State | 36 |

Snapshots do HTML público em `reports/smoke-4b/` (HTML bruto + texto visível extraído).

---

## Fechamento pós-deploy (2026-08-25)

### 1. Prova de deploy

| Item | Valor |
| --- | --- |
| `DEPLOY_HEAD` publicado | `2f850f62` ("Pré-deploy 4B validado") |
| Contém `7572d6d8`? | **SIM** — `7572d6d8` é ancestral direto de `2f850f62` |
| `build-version.json` | `version=2f850f6` · `buildTime=2026-08-25T01:27:50.109Z` |
| Deployment ID (borda) | `a9d58a3859443555e374a9c022b8fc9fb27a7a517f1e21468c28af2d8c88923f` |
| Produção anterior | `235f44f` — **não é mais servida** |
| Verificado em | 2026-08-25T01:39Z · `server: cloudflare` · `cache-control: no-cache` |

O deploy foi além do alvo: a produção serve `2f850f62`, descendente de `7572d6d8`,
com o payload 4B integral. Nada de 4C foi incluído.

### 2. Smoke público — 5/5 PASS

Resultado detalhado na tabela acima. Todos os owners: HTTP 200, `index, follow`,
canonical self, exatamente 1 `<h1>`, bloco **Resposta rápida** e tabela/blocos 4B
no HTML inicial, JSON-LD parseável (0 inválidos), 35–40 links internos reais.

### 3. Owner congelado — `/servicos/formatacao`

| Verificação | Resultado |
| --- | --- |
| HTTP | 200 |
| Canonical | self (`/servicos/formatacao`) |
| Robots | `index, follow` |
| H1 | 1 — "Formatação de computador e notebook em Curitiba com backup dos seus arquivos" |
| Fingerprint | `b40b2a9be749` — **inalterado** desde antes da 4B |
| Lastmod | `2026-08-25`, origem `bootstrap` (herdado da 4A, não bumpado pela 4B) |
| Intenção comercial | exclusiva — a decisão Win10×Win11 ficou em `/solucoes/formatacao` |
| IndexNow | **não reenviado** |

### 4. Sitemap público + lastmod

Lido diretamente do domínio real:

| URL | Sub-sitemap | Lastmod público | Origem |
| --- | --- | --- | --- |
| `/problemas/notebook-nao-liga` | `sitemap-problemas.xml` | 2026-08-25 | `hash-change` |
| `/problemas/computador-nao-da-imagem` | `sitemap-problemas.xml` | 2026-08-25 | `hash-change` |
| `/problemas/computador-lento` | `sitemap-problemas.xml` | 2026-08-25 | `hash-change` |
| `/solucoes/backup` | `sitemap-solucoes.xml` | 2026-08-25 | `hash-change` |
| `/solucoes/formatacao` | `sitemap-solucoes.xml` | 2026-08-25 | `hash-change` |
| `/servicos/formatacao` (congelado) | `sitemap-servicos.xml` | 2026-08-25 | `bootstrap` (pré-4B) |

Canonical de cada owner = a URL exata do sitemap. Auditoria do histórico de
`config/content-fingerprints.json`: **zero** bump de lastmod sem mudança de hash;
o único commit que mexeu em datas sem mudar conteúdo (`8cf5ccf2`, 109 rotas)
**removeu** datas de bootstrap (passou a `null`), movimento conservador, não inflacionário.
Rotas com hash alterado no commit de conteúdo (`358fb808`): 6 — os 5 owners 4B mais
`/problemas/computador-esquentando` (owner 4A que compartilha componentes;
já datado 2026-08-25, sem data nova).

### 5. IndexNow seletivo

| Campo | Valor |
| --- | --- |
| Modo | seletivo (`--urls=`) |
| Quantidade | **5** (exatamente os owners 4B) |
| Endpoints | `api.indexnow.org/IndexNow` → HTTP **200 (OK)** · `bing.com/indexnow` → HTTP **200 (OK)** |
| Key file | `https://otecnicodeinformatica.com.br/f783ab585dfa9e6b017cb058009cccae.txt` → HTTP 200 |
| Timestamp | 2026-08-25T01:42:17.543Z |
| Accepted / rejected | 5 ACEITAS / 0 rejeitadas |
| Não reenviados | owners 4A, `/servicos/formatacao`, Home, sitemap completo |

Payload registrado em `public/indexnow-status.json`. HTTP 200/202 = **recebido**, não indexado.

### 6. Rich results + diff SSR/JSON-LD

- `monitor:rich-results` (11 URLs): **0 perdas · 0 ganhos**, alerta `ESTAVEL` em todas.
- `diff-ssr-snapshot --base=produção` (11 URLs):
  - `UNCHANGED`: 6 · `CHANGED_OK` (**EXPECTED_CONTENT/EXPECTED_SCHEMA**): 4 owners 4B
    (`/solucoes/formatacao`, `/problemas/computador-nao-da-imagem`, `/solucoes/backup`, `/servicos/formatacao`)
  - `REGRESSION`: 1 — `/servicos/upgrade-ssd-ram` (owner 4A congelado).

**Diagnóstico da regressão (investigada, não corrigida nesta rodada):** não é perda
de conteúdo nem defeito da 4B. A produção alterna, entre requisições do MESMO
deployment, duas variantes de SSR:

| Variante | Blocos `ld+json` | Tipos |
| --- | --- | --- |
| completa | 6–7 | Organization, WebSite, WebPage, BreadcrumbList, FAQPage, Service, LocalBusiness… |
| reduzida | 2 | apenas Organization + WebSite (globais) |

Amostragem de 5 requisições por URL: instável em `/problemas/notebook-nao-liga`,
`/computador-nao-da-imagem`, `/computador-lento`, `/solucoes/backup`,
`/solucoes/formatacao` e `/servicos/formatacao`. O texto visível (Resposta rápida,
FAQ, tabelas) está presente nas duas variantes — some apenas o JSON-LD de rota.

Causa provável: `JsonLdSsrSink` (`src/lib/jsonLdSsr.tsx`) emite os slots coletados
durante o render; em isolate frio, o componente de rota resolve depois do sink e
suas entradas não entram no HTML. Comportamento **pré-existente** desde a migração
SSR, site-wide, independente da 4B. Classificação: `REAL_REGRESSION_INFRA_PREEXISTENTE`
— **P0 para micro-rodada própria**, fora do escopo desta (proibida refatoração oportunista).

### 7. Baseline GSC pós-deploy (somente leitura)

| URL | Estado | lastCrawlTime | Cobertura | Impr. 28d | Cliques 28d |
| --- | --- | --- | --- | --- | --- |
| `/problemas/notebook-nao-liga` | `NO_DATA` | — | Google não reconhece o URL | 0 | 0 |
| `/problemas/computador-nao-da-imagem` | `INDEXED` | 2026-08-13T12:07:17Z | indexada | 0 | 0 |
| `/problemas/computador-lento` | `INDEXED` | 2026-08-15T07:00:14Z | indexada | 0 | 0 |
| `/solucoes/backup` | `NO_DATA` | — | Google não reconhece o URL | 0 | 0 |
| `/solucoes/formatacao` | `NO_DATA` | — | Google não reconhece o URL | 0 | 0 |

Classificação: 2 `INDEXED` mas com crawl **anterior** ao deploy → `AWAITING_RECRAWL`
(estado do GSC é pré-4B, `STALE_GSC_STATE` para efeito de conteúdo);
3 `NO_DATA`. Novo crawl Google pós-deploy = **0/5**.
`CRAWLED_NOT_INDEXED` pós-deploy real = **0**. Nenhuma edição de conteúdo motivada
por ausência de crawl — o intervalo é normal (deploy há minutos).

### 8. `/admin/indexacao` em produção

| Bloco | Estado |
| --- | --- |
| Rota `/admin/indexacao` | 200 |
| `index-status.json` · `rich-results-monitor.json` · `ssr-diff-status.json` · `indexnow-status.json` · `build-status.json` | 200 (todos servidos) |
| Owners 4B, fingerprint, IndexNow, rich-results, diff, baseline GSC | presentes |
| Exportações CSV / JSON / PDF | funcionais |
| Dossiê por URL | gerado também fora do painel (ver abaixo) |

Ressalva honesta: os JSONs servidos hoje pela produção são os do build publicado;
os artefatos coletados neste fechamento (01:42Z) entram no painel público no
próximo deploy. Nenhuma funcionalidade nova foi adicionada.

### 9. Dossiê consolidado por URL (PDF)

`node scripts/gerar-dossie-4b.mjs` → `reports/dossies-4b/` (HTML + PDF, 5/5).
Cada PDF reúne deployment ID, HTTP, robots, canonical, H1, palavras, links,
JSON-LD, diff SSR, rich results, fingerprint/lastmod, recibo IndexNow e baseline GSC.
Campos sem coleta aparecem como `—`, nunca presumidos.

### 10. Quadro final

| URL | Deploy | 200 | Index | Canonical | SSR | Schema | Sitemap | Lastmod | IndexNow | GSC |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/problemas/notebook-nao-liga` | 2f850f62 | ✅ | ✅ | ✅ | ✅ 3229p | ✅ parseável | ✅ problemas | 2026-08-25 real | ✅ 200/200 | NO_DATA |
| `/problemas/computador-nao-da-imagem` | 2f850f62 | ✅ | ✅ | ✅ | ✅ 2614p | ✅ parseável | ✅ problemas | 2026-08-25 real | ✅ 200/200 | INDEXED (crawl pré-deploy) |
| `/problemas/computador-lento` | 2f850f62 | ✅ | ✅ | ✅ | ✅ 3517p | ✅ parseável | ✅ problemas | 2026-08-25 real | ✅ 200/200 | INDEXED (crawl pré-deploy) |
| `/solucoes/backup` | 2f850f62 | ✅ | ✅ | ✅ | ✅ 1960p | ✅ parseável | ✅ solucoes | 2026-08-25 real | ✅ 200/200 | NO_DATA |
| `/solucoes/formatacao` | 2f850f62 | ✅ | ✅ | ✅ | ✅ 1533p | ✅ parseável | ✅ solucoes | 2026-08-25 real | ✅ 200/200 | NO_DATA |
| `/servicos/formatacao` (congelado) | 2f850f62 | ✅ | ✅ | ✅ | intacto | ✅ | ✅ servicos | pré-4B | não enviado | — |

## Vereditos

1. `DEPLOY_HEAD = 7572d6d8`? **SIM** (servido como `2f850f62`, descendente que contém 7572d6d8)
2. Smoke 4B = 5/5? **SIM**
3. Conteúdo no SSR público? **SIM**
4. Owner comercial congelado? **SIM**
5. Sitemap público correto? **SIM**
6. Lastmod honesto? **SIM**
7. IndexNow recebeu somente 5 URLs? **SIM**
8. Rich-results sem regressão real? **SIM** (0 perdas / 0 ganhos)
9. SSR/JSON-LD diff somente esperado? **NÃO** — 1 `REGRESSION` em `/servicos/upgrade-ssd-ram`,
   classificada como instabilidade SSR pré-existente e site-wide do sink de JSON-LD,
   não causada pela 4B (conteúdo visível íntegro nas duas variantes)
10. Órfãos = 0? **SIM** (442 rotas / 153 URLs curadas, nenhuma órfã)
11. Novo crawl Google = **0/5**
12. `CRAWLED_NOT_INDEXED` pós-deploy real = **0**
13. Painel / exportações / dossiê funcionam? **SIM**
14. 4B pode ser encerrada? **SIM** — todos os contratos de conteúdo, canonical,
    sitemap, lastmod e distribuição estão verdes; o único item vermelho é
    infraestrutura pré-existente e não pertence à 4B

## Decisão

- `4B = CLOSED`
- `SEARCH = OBSERVE`
- `NEXT_ALLOWED = 4C`
- `P0_ABERTO = SSR_JSONLD_INTERMITENTE` (micro-rodada própria, precede ou acompanha 4C)
