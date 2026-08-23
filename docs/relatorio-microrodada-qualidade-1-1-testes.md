# Micro-Rodada Qualidade 1.1 — Testes, gates e telemetria GA4

Data da execução: 2026-08-14 (UTC) · Stack: TanStack Start (SSR) · Base: `http://localhost:8080`

## 1. Correções aplicadas

### 1.1 GA4 `wa_funnel_open` deixava de ser observável (causa raiz real)

O script de Consent Mode injetado no `<head>` (`src/routes/__root.tsx`) declarava
`function gtag(){dataLayer.push(arguments);}` no escopo global. Em script clássico, a
**declaração de função é içada e sobrescreve `window.gtag`** — inclusive um `gtag` já
instalado antes (spy de teste, tag manager carregado primeiro). Resultado: o evento era
emitido, mas nunca chegava ao coletor observado — falha determinística, não flakiness.

Correção (idempotente, sem mudar tracking):

```js
window.dataLayer = window.dataLayer || [];
if (typeof window.gtag !== 'function') {
  window.gtag = function () { window.dataLayer.push(arguments); };
}
window.gtag('consent', 'default', { /* ... */ });
```

### 1.2 Spy de consentimento no E2E lia apenas `Array`

`gtag()` empurra o objeto `arguments` (array-like, não `Array`), então
`Array.isArray(a)` descartava todos os `consent update`. O spy de `e2e/consent-mode.spec.ts`
passou a ler por índice/`length`.

### 1.3 Asserção de contrato sem dependência de timing

Novo `src/lib/funnelAnalytics.open.test.ts` (jsdom, projeto `unit`): chama `trackFunnelOpen`
diretamente e valida o **schema** do payload — dimensões obrigatórias, preservação de
UTMs/`gclid`, ausência de chaves de PII (`BLOCKED_TELEMETRY_KEYS`) e cardinalidade ≤ 80 chars.
Sem hidratação, sem espera, sem rede.

### 1.4 Testes negativos e de não-regressão de gates

Novo `scripts/__tests__/gates-negativos.test.mjs` (projeto `scripts`): monta projetos-fixture
mínimos em `/tmp` (`src/routes` + `public/sitemap*.xml`) e executa o gate real com `cwd` na
fixture.

| Cenário | Esperado | Resultado |
| --- | --- | --- |
| Link interno para rota inexistente | `FAIL_BROKEN_LINK`, exit 1 | ✔ |
| Asset referenciado inexistente | `FAIL_MISSING_STATIC_FILE`, exit 1 | ✔ |
| URL de sitemap sem rota (rota stale) | `FAIL_SITEMAP_WITHOUT_ROUTE`, exit 1 | ✔ |
| Domínio não canônico no sitemap | `FAIL_NON_CANONICAL_DOMAIN`, exit 1 | ✔ |
| URL indexável sem link interno | `WARN_ORPHAN_INDEXABLE`; exit 1 só com `--strict` | ✔ |
| Fixture saudável | exit 0 | ✔ |
| Asset existente em `public/` | não acusa | ✔ |
| Rota privada (`/admin/...`) | não acusa | ✔ |
| Segmento dinâmico (`/blog/$slug`) | não acusa | ✔ |
| `src/routes` ausente | `UNKNOWN_ROUTES_DIR_MISSING`, exit 1 (fail-closed) | ✔ |

## 2. Contagens reais dos runners

| Suíte | Comando | Resultado | Tempo |
| --- | --- | --- | --- |
| Vitest `unit` — funil | `vitest run src/lib/funnelAnalytics.test.ts` | 4/4 PASS | 2,38 s |
| Vitest `unit` — contrato GA4 (novo) | `vitest run src/lib/funnelAnalytics.open.test.ts` | 3/3 PASS | 2,05 s |
| Vitest `scripts` — gates negativos (novo) | `vitest run --project scripts scripts/__tests__/gates-negativos.test.mjs` | 10/10 PASS | 1,39 s |
| Playwright — funil + consent | `playwright test e2e/whatsapp-funnel.spec.ts e2e/consent-mode.spec.ts` | 14/14 PASS | 27,9 s |

Antes da correção: 1 falha em `whatsapp-funnel` (GA4) e 4 falhas em `consent-mode`.
Depois: **0 falhas** nas duas specs.

## 3. Gates de SEO e indexação

Snapshot SSR gerado com `node scripts/snapshot-ssr.mjs dist http://localhost:8080`
(159 rotas gravadas) antes dos gates que dependem de HTML servido.

| Gate | Resultado |
| --- | --- |
| `audit:seo` | ✓ sem erros — 47 avisos (title/description acima do ideal) |
| `check:content-discovery` | ✓ coorte de 4 URLs encontrável |
| `check:content-intent` | ✓ 7 URLs, 7 pares tema × intenção únicos |
| `check:sitemap-source` | ✓ 153 URLs curadas = 153 emitidas em 8 sub-sitemaps |
| `check:robots` | ✓ 153 indexáveis liberadas, 5 áreas privadas bloqueadas, 10 sitemaps |
| `check:schema-standards` | ✓ 478 nós em 153 páginas indexáveis (não renderizadas: 0) |
| `check:jsonld-references` | ✓ sem `@id` duplicado |
| `check:malha-interna` | ✓ 16 páginas de serviço, 4 arestas obrigatórias |
| `check:internal-links` | ✓ 441 rotas, 161 URLs de sitemap, 0 links quebrados |
| `check:orphan-pages` | ✓ 0 URL indexável sem rota, 0 slug duplicado |

## 4. Auditoria de `/blog/como-resolver-tela-azul-windows`

JSON-LD verificado direto no HTML SSR (`data-schema-key`), sem duplicidade:
`organization`, `website`, `breadcrumb`, `article`, `local-business`,
`item-list-services`, `site-navigation` — **um script por slot**.

O nó do artigo emite `["BlogPosting","Article","TechArticle"]` com `@id` próprio
(`#article`), `headline`, `datePublished`, `dateModified` e `ImageObject`.
Nenhum `FAQPage` é emitido (a página não tem bloco de FAQ visível) e o
`LocalBusiness` vem do slot global, apenas referenciado.

## 5. Dívida remanescente (não bloqueante)

- 47 avisos de `audit:seo`: `description` entre 161 e 170 chars em páginas
  serviço × bairro e um `title` de 70 chars em `/solucoes/recuperacao-de-dados`.
  Correção editorial, sem impacto de gate.
