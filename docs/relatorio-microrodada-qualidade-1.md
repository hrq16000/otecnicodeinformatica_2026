# Micro-rodada Qualidade 1 — dívida dos gates legados + lacuna de schema

Escopo: dívida técnica e governança. Nenhuma URL nova, nenhum bairro, nenhuma
alteração nas 5 pontes da Discovery 1, nos 4 bairros da Local 2 ou nos pilares 9B/9C.

## Estado inicial

| Gate | Estado | Causa |
| --- | --- | --- |
| `check:internal-links` | PASS | já migrado ao universo TanStack (441 rotas por arquivo) |
| `check:orphan-pages` | PASS | já usa route manifest + URLs curadas |
| `check:malha-interna` | FAIL | lia `dist/<rota>/index.html`; no TanStack Start esse arquivo não existe mais |
| `check:schema-standards` | PASS **vácuo** | varria `dist/**/index.html` e validava "0 nós em 0 páginas" |

## Findings e classificação

| Finding | Classificação | Correção |
| --- | --- | --- |
| `malha-interna`: 12 rotas "HTML estático ausente em dist" | LEGACY_FALSE_POSITIVE | gate migrado para `ssr-harness.mjs` (`prepararSsr` + `htmlDaRota`), com `FAIL_ROUTE_NOT_RENDERED` fail-closed |
| `schema-standards`: universo vazio | LEGACY_FALSE_POSITIVE (verde por cegueira) | universo passou a ser `CURATED_PATHS` renderizado por SSR; universo vazio agora é BLOQUEIO |
| `FAQPage` da home emitido em 27 artigos de blog e demais rotas | REAL_DEFECT | slot global de FAQ passou a valer só na home (paridade com `HomeFaqSsr`); rotas com FAQ própria seguem preenchendo o slot em `SLOT_PRIORITY.page` |
| `/servicos/remocao-de-virus`: 1 pergunta "invisível" | LEGACY_FALSE_POSITIVE do comparador | normalização de aspas tipográficas e entidades numéricas (`&#x27;`) nos dois lados |
| `/problemas/computador-lento` e `/problemas/notebook-nao-liga`: `BreadcrumbList` com nível intermediário sem `item` | REAL_DEFECT | "Problemas" é hub real (`/problemas`), agora com `href` no breadcrumb visual e URL no schema |

Nenhum threshold foi afrouxado, nenhuma allowlist por pathname foi criada e
nenhum arquivo gerado (`routeTree.gen.ts`) foi editado.

## Nova regra estrutural: FAQPage exige FAQ visível

`check:schema-standards` passou a validar paridade entre `FAQPage.mainEntity[].name`
e o texto visível servido no SSR. Um `FAQPage` sem bloco correspondente na página
reprova o gate — é a política do Google e o contrato do projeto.

## Resultado final

| Gate | Antes | Depois |
| --- | --- | --- |
| `check:malha-interna` | FAIL (12 rotas) | PASS — 16 páginas de serviço, 4 arestas obrigatórias (2 mútuas, 2 dirigidas) |
| `check:internal-links` | PASS | PASS — 424 destinos, 10 assets e 3 rotas privadas classificados |
| `check:orphan-pages` | PASS | PASS — 441 rotas, 153 curadas, 8 componentes sem rota classificados |
| `check:schema-standards` | PASS vácuo (0 páginas) | PASS real — 321 nós em 153/153 URLs curadas, 0 não renderizadas |
| `check:jsonld-references` · `check:rich-results` · `check:robots` · `check:sitemap-source` | PASS | PASS |
| `typecheck` | PASS | PASS |

## Vereditos

1. `check:malha-interna` verde sem reciprocidade artificial — SIM (arestas dirigidas preservadas).
2. `check:internal-links` distingue rota, asset e artefato gerado — SIM.
3. `check:orphan-pages` mede apenas rotas/URLs reais — SIM.
4. URLs indexáveis órfãs — 0.
5. `/blog/como-resolver-tela-azul-windows` satisfaz o contrato editorial — SIM: emite `["BlogPosting","Article","TechArticle"]` + `BreadcrumbList` únicos e **deixou de emitir** o `FAQPage` indevido.
6. Algum gate foi afrouxado — NÃO.
7. Pipeline confiável — SIM: cada PASS agora descreve HTML realmente servido.

## Pendências

- Não existe script `npm run unit` no projeto; a suíte Vitest só roda com configuração
  jsdom dedicada (execução direta acusa falhas pré-existentes de ambiente, sem relação
  com esta rodada). Recomendo tratar isso numa rodada própria de infraestrutura de testes.
- `check:rich-results` mantém 3 AVISOS (não bloqueantes) sobre `description` de `Service`
  e `telephone` de `LocalBusiness` em duas rotas de serviço × cidade.
