# Micro-Rodada Fechamento Qualidade + Observação 1

Data: 2026-08-23 (UTC) · HEAD: `0c562a06` · Propriedade: `sc-domain:otecnicodeinformatica.com.br`

---

## PARTE A — PERSISTÊNCIA

### Fase 1 — Estado do Git
`git status` limpo antes desta rodada (nenhum arquivo modificado ou não rastreado).
Todo o trabalho de Qualidade 1.1 e 1.1B já está no HEAD oficial `0c562a06`
("Corrigiu teste GA4 `wa_funnel_open`"). Nada do workspace ficou fora do repositório.
Após esta rodada, os únicos arquivos alterados são **artefatos gerados**
(`public/seo-audit.json`, `public/gsc-local-status.json`, `reports/indexation-microlot-1.json`).

### Fase 2 — Relatórios
Presentes fisicamente e versionados:
- `docs/relatorio-microrodada-qualidade-1-1-testes.md`
- `docs/relatorio-microrodada-qualidade-1-1b-ga4.md`

### Fase 3 — Contrato dos testes (package.json)
| Comando | Implementação |
| --- | --- |
| `test:unit` (principal) | `vitest run --project unit --project scripts` |
| `test:integration` | `vitest run --project integration` |
| `test:e2e` | `playwright test` |
| `unit` | alias de compatibilidade para agentes/CI |

### Fase 4 — Vitest × Playwright (números reais)
- Vitest: **35 arquivos**, **715 testes** — 100% PASS. (`vitest list` enumera 36 arquivos,
  incluindo 1 sem casos coletados no projeto padrão.) `passWithNoTests: false`;
  `e2e/**` e `playwright/**` no `exclude` compartilhado; jsdom só por diretiva de arquivo.
- Playwright: `testDir: "e2e"`, `testMatch: /.*\.spec\.ts$/` — nunca coleta `src/__tests__`.
  Execução desta rodada (funil + consent): **30 testes PASS** em 2 projetos
  (chromium + mobile), 1,1 min.

### Fase 5 — Consent Mode
Preservado. `src/routes/__root.tsx` usa guarda idempotente
(`if (typeof window.gtag !== 'function') { ... }`), sem declaração `function gtag`
(que sofreria hoisting e clobbaria coletor já instalado). Nenhum wrapper encadeado.

### Fase 6/7 — Funil e teste GA4
Nada reescrito. Buffer pré-hidratação (`__waFunnelQueue`), replay de toque, dedupe,
`click_location=float`, `wa_funnel_open` (legado) e `triage_start` (canônico) intactos.
Conclusão anterior mantida: **STALE_TEST_EXPECTATION**. Suíte do funil verde.

### Fase 8 — Pipeline pré-commit
| Etapa | Resultado |
| --- | --- |
| `tsgo --noEmit` | ✓ exit 0 |
| `test:unit` | ✓ 715/715 |
| E2E funil + consent | ✓ 30/30 |
| check:analytics-event-contract | ✓ (snapshot NÃO atualizado) |
| check:analytics-pii | ✓ |
| check:analytics-local-context | ✓ |
| check:analytics-journey-integrity | ✓ |
| check:internal-links | ✓ |
| check:orphan-pages | ✓ |
| check:malha-interna | ✓ |
| check:schema-standards | ✓ |
| check:jsonld-refs | ✓ 109 rotas |
| check:rich-results | ✓ |
| check:sitemap-source | ✓ |
| check:robots | ✓ |
| `npm run build` | ✓ exit 0 |

Observação: o nome real do gate é `check:jsonld-refs` (não `check:jsonld-references`).

### Fases 9/10 — Commit e prova no HEAD
Não houve novo commit de código: o estado aprovado já estava persistido.
SHA oficial verificado: **`0c562a0668eb3262ce1d4f13210335e731a9c8db`**, contendo
relatórios, scripts de gate, configs de teste, novos testes e scripts do package.json.

### Fase 11 — Publicação
**DEPLOY_NEEDED = SIM.** O HTML servido em `https://otecnicodeinformatica.com.br/`
ainda contém `function gtag(...)` (versão que sobrescreve coletor) e **não** contém
`__waFunnelQueue`. Ou seja, Consent Mode idempotente e buffer pré-hidratação estão no
repositório, mas **não em produção**. Publicação pelo fluxo normal é necessária.

---

## PARTE B — OBSERVAÇÃO GSC

Fase 12 respeitada: nenhuma página, title, description, H1, canonical, robots, conteúdo
ou link foi alterado antes da leitura.

Janela de performance: últimos 28 dias — **171 impressões, 4 cliques** no site inteiro.

### Fase 13/14/15/16 — Coorte `indexation_microlot_1` (10 URLs)

| URL | Estado anterior | Estado atual | Last crawl mudou? | Impr. | Cliques | Decisão |
| --- | --- | --- | --- | --- | --- | --- |
| /bairros/afonso-pena | INDEXED | INDEXED (14/08) | não | NO_DATA | NO_DATA | INDEXED_PROGRESS · OBSERVE |
| /bairros/aviacao | UNKNOWN | URL unknown to Google | — | NO_DATA | NO_DATA | UNKNOWN_TO_GOOGLE · OBSERVE |
| /blog/backup-nuvem-empresas-qual-escolher | INDEXED | INDEXED (14/08) | não | NO_DATA | NO_DATA | INDEXED_PROGRESS |
| /blog/como-instalar-impressora-windows-passo-a-passo | DISCOVERED | Discovered – not indexed | sem crawl | NO_DATA | NO_DATA | DISCOVERED_NOT_INDEXED · OBSERVE |
| /equipamentos/impressora | DISCOVERED | Discovered – not indexed | sem crawl | NO_DATA | NO_DATA | DISCOVERED_NOT_INDEXED · OBSERVE |
| /equipamentos/roteador | UNKNOWN | URL unknown to Google | — | NO_DATA | NO_DATA | UNKNOWN_TO_GOOGLE · OBSERVE |
| /politica-de-pecas-do-cliente | UNKNOWN | URL unknown to Google | — | NO_DATA | NO_DATA | UNKNOWN_TO_GOOGLE · OBSERVE |
| /problemas/teclado-notebook-nao-funciona | DISCOVERED | Discovered – not indexed | sem crawl | NO_DATA | NO_DATA | DISCOVERED_NOT_INDEXED · OBSERVE |
| /servicos/formatacao-computador/batel | noindex | Excluded by ‘noindex’ (crawl 11/08) | não | NO_DATA | NO_DATA | **STALE_GSC_STATE** |
| /servicos/formatacao-computador/cic | noindex | Excluded by ‘noindex’ (crawl 12/08) | não | NO_DATA | NO_DATA | **STALE_GSC_STATE** |

Fase 16 aplicada: produção hoje serve `<meta name="robots" content="index, follow">`
em `/servicos/formatacao-computador/batel` (verificado por `curl`). O `noindex` reportado
vem de crawl de **11/08**, anterior à correção — **não é defeito atual**.

### Bairros da Micro-Rodada Local 2

| URL | Estado anterior | Estado atual | Last crawl | Classificação |
| --- | --- | --- | --- | --- |
| /bairros/boqueirao | INDEXED | INDEXED | 18/08 15:40Z | INDEXED_PROGRESS |
| /bairros/pinheirinho | INDEXED | INDEXED | 18/08 15:37Z | INDEXED_PROGRESS |
| /bairros/cajuru | NO_DATA (detectada) | URL unknown to Google | — | UNKNOWN_TO_GOOGLE · OBSERVE |
| /bairros/cidade-jardim-sjp | NO_DATA | URL unknown to Google | — | UNKNOWN_TO_GOOGLE · OBSERVE |

Resposta à pergunta da Fase 14: **2 de 4** foram rastreados após o deploy (18/08);
os outros 2 ainda não foram descobertos pelo Google.

### Discovery 1 (5 URLs)

| URL | Estado atual | Last crawl | Impr. | Cliques | Classificação |
| --- | --- | --- | --- | --- | --- |
| /equipamentos/desktop | Discovered – not indexed | — | NO_DATA | NO_DATA | DISCOVERED_NOT_INDEXED |
| /equipamentos/impressora | Discovered – not indexed | — | NO_DATA | NO_DATA | DISCOVERED_NOT_INDEXED |
| /blog/como-resolver-tela-azul-windows | Submitted and indexed | 14/08 11:16Z | 1 | 0 | INDEXED_PROGRESS |
| /servicos/conserto-pc-notebook/centro | Discovered – not indexed | — | NO_DATA | NO_DATA | DISCOVERED_NOT_INDEXED |
| /servicos/formatacao-computador/batel | Excluded by ‘noindex’ | 11/08 23:00Z | NO_DATA | NO_DATA | STALE_GSC_STATE |

Nenhum crawl posterior ao `discovery_fix_applied_at` foi registrado nas 4 URLs
não indexadas — a correção de profundidade ainda não foi reamostrada pelo Google.

### Fase 17 — Coorte `national_foundations_9b`

| URL | Discovery | Last crawl | Impr. | Cliques | Veredito (policy) |
| --- | --- | --- | --- | --- | --- |
| /blog/o-que-e-informatica | Discovered – not indexed | — | NO_DATA | NO_DATA | AGUARDANDO_INDEXACAO |
| /blog/informatica-basica | URL unknown to Google | — | NO_DATA | NO_DATA | UNKNOWN |
| /blog/como-aprender-informatica | Discovered – not indexed | — | NO_DATA | NO_DATA | AGUARDANDO_INDEXACAO |

Nenhuma query atribuída às três URLs na janela de 28 dias.

### Fase 18/19 — Gate 9C
A policy real é `podeExpandirOndaEditorial()` em `src/lib/nationalFoundationCohort.ts`:
libera apenas com `clicks > 0` em alguma URL da coorte. Cliques observados: **0**.
→ **9C permanece BLOQUEADA.** Threshold não alterado; impressão não é clique.
Sample size do site inteiro (4 cliques / 171 impressões em 28 dias) não sustenta
nenhuma inferência de performance — separar GATE RELEASE de PERFORMANCE CONFIDENCE.

### Fase 21 — Decisão por família
- **LOCAL:** OBSERVE (2/4 indexados; 2 ainda não descobertos — sem ação editorial).
- **DISCOVERY:** OBSERVE (correções aplicadas, sem recrawl posterior; batel é STALE).
- **NATIONAL 9B:** OBSERVE (sem clique real → sem RELEASE_9C).

Decisões registradas, **não executadas**.

---

## VEREDITOS

1. Mudanças de Qualidade 1.1/1.1B no HEAD oficial? **SIM** (`0c562a06`).
2. Pipeline oficial de testes reproduzível no repositório? **SIM**.
3. Mudanças funcionais já em produção? **NÃO** (Consent Mode idempotente e buffer
   pré-hidratação ausentes no HTML servido → DEPLOY_NEEDED = SIM).
4. URLs da coorte `indexation_microlot_1` com novo crawl desde as correções? **0/10**
   (crawls existentes são de 11–14/08, anteriores às correções).
5. Quantas estão INDEXED? **2/10** (afonso-pena, backup-nuvem-empresas).
6. Alguma CRAWLED_NOT_INDEXED após as correções? **NÃO** (os casos "não indexados"
   são DISCOVERED/UNKNOWN; os dois `noindex` são STALE_GSC_STATE).
7. `national_foundations_9b` registrou clique real? **NÃO**.
8. Policy libera 9C? **NÃO**.
9. Ação técnica/editorial necessária agora? **SIM — apenas publicação** (deploy das
   correções de funil/Consent Mode). Conteúdo e SEO: **NÃO — OBSERVE**.
