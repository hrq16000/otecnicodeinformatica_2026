# Rodada 1 — SSR do Atlas, guia de decisão, sitemap dinâmico no GSC e cadeia de deploy

Data: 2026-09-02 · Escopo aditivo. Nenhuma URL, slug, canonical, preço ou
conteúdo existente foi alterado ou removido.

## 1. Auditoria e reestruturação de `/guia-tecnico-informatica` (SSR)

Cada um dos nove temas do Atlas passou a renderizar, **no HTML sem
JavaScript**, um bloco de aprofundamento com sequência editorial fixa:

```
contexto → sinais → verificar com segurança → o que não fazer →
quando parar → reparar / substituir / escalar → próximos passos
```

- Fonte única: `src/lib/atlasAprofundamento.ts` (módulo novo, separado de
  `atlasInformatica.ts` para não quebrar o parse por regex dos gates).
- Renderização: `src/components/informatica/AtlasAprofundamentoBloco.tsx`,
  montado dentro do card do tema em `AtlasTrilhas.tsx`.
- Cada tema fecha com "Próximos passos" ligando ao pilar de sintoma, à
  ferramenta/checklist, ao guia de decisão e ao serviço canônico — todos
  destinos já existentes (validados pelo gate de links internos).
- Conteúdo autoral, factual e condicional. Nenhum preço, prazo, estatística
  ou avaliação inventada. Nenhuma recomendação de desativar proteção de
  segurança em caráter permanente.

Evidência SSR (harness, sem JS): os 9 blocos aparecem no HTML servido,
incluindo "Quando parar e não insistir" e o link para o novo guia.

## 2. Guia de decisão novo: trocar componente × reparar

- Página: `/decisoes/trocar-componente-ou-reparar` (rota dinâmica já
  existente `decisoes_.$slug`; nenhuma rota nova foi criada).
- Conteúdo: `src/lib/guiasDecisao.ts` — resposta direta, contexto, cinco
  passos de decisão, custo sem valor inventado, onde parar, 4 perguntas,
  6 links contextuais e fonte primária (NIST SP 800-88).
- Card correspondente no Atlas: `ATLAS_GUIAS_DECISAO` (âncora
  `#decisao-trocar-componente-ou-reparar`), com sinais dos dois lados e
  nível de risco "Exige atenção".
- Ponte bidirecional: `DECISAO_POR_SINTOMA` em `src/lib/atlasPontes.ts`
  liga `computador-desliga-sozinho` ao novo guia; o guia devolve links para
  os pilares e para o Atlas.
- Sitemap: slug declarado em `scripts/lib/curated-urls.mjs` (`DECISOES_SLUGS`).

## 3. Gate do Atlas migrado para SSR real

`scripts/check-atlas-hub.mjs` lia HTML estático em `dist/`, que não existe
mais no stack SSR (TanStack Start + Nitro) — o gate ficava bloqueado. Agora
ele usa `scripts/lib/ssr-harness.mjs` (`prepararSsr` + `htmlDaRota` +
`abortarSeBloqueado`), continuando fail-closed.

Resultado: `temas: 9 · links declarados: 77 · vereditos: 9 · guias: 11 ·
fontes: 9 — SSR íntegro, malha sem órfãos e JSON-LD coerente com o HTML.`

## 4. Sitemap dinâmico e status dentro de `/admin/seo`

- `npm run sitemap:dynamic:submit` executado: **222 URLs**, 63 lotes
  aprovados, `GSC SUBMITTED`, IndexNow sem novidade no diff (as URLs novas
  já haviam entrado no passo de build).
- IndexNow seletivo disparado para `/decisoes/trocar-componente-ou-reparar`,
  `/decisoes` e `/guia-tecnico-informatica`: HTTP 200 em indexnow.org e Bing,
  3 URLs aceitas.
- Painel novo `SitemapLedgerPanel` em `/admin/seo`, lendo
  `public/sitemap-ledger.json`: total de URLs, lotes aprovados, status do
  Search Console e do IndexNow, diff de entradas/saídas e os últimos eventos
  com origem (CI ou CLI). Sem ledger, o painel diz que o dado não existe —
  não estima nem exibe sucesso fictício.

## 5. Cadeia oficial de deploy

`docs/runbook-deploy.md` passou a declarar uma cadeia única e obrigatória:
PR validado → merge em `main` → publicação confirmada no ambiente de deploy →
workflow Cloudflare edge → `sitemap:dynamic:submit` → conferência em
`/admin/seo`. Reafirmado: **build verde não é deploy** e indexação não é
garantida.

## 6. Validações

| Gate | Resultado |
| --- | --- |
| `npm run build` | ✅ (postbuild: inventário de 222 URLs) |
| `npm test` | ✅ 855 testes (1 flake de timeout em `routes-import-smoke` sob carga total; passa isolado com 444/444) |
| `npm run check:atlas-hub` | ✅ agora via SSR real |
| `npm run check:internal-links` | ✅ 499 destinos, nenhum link quebrado |
| `npm run check:biblioteca` | ✅ 18 termos · 6 ferramentas · 10 guias · 8 pontes |
| `npm run check:route-tree` | ✅ 476 rotas |
| `npm run check:editorial-governance` | ✅ |
| `npm run check:interlinks-quality` | ✅ |
| `npm run check:national-authority-map` | ✅ |
| `npm run check:trust-claims` | ✅ |
| `npm run check:brand-isolation` | ✅ 4034 arquivos |
| `npm run check:content-intent` | ✅ 17 pares tema × intenção únicos |

## 7. Pendências

- Publicação pública depende de confirmação no ambiente de deploy — o código
  está no repositório, o domínio só reflete após o Publish.
- Veredito de indexação das URLs novas só existe depois do próximo ciclo do
  Search Console; acompanhar em `/admin/editorial-ondas` e `/admin/seo`.
