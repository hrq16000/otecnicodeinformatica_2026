# Comandos oficiais

O projeto tem centenas de scripts npm de diagnóstico. Para o dia a dia existem
**três comandos oficiais** que orquestram os gates essenciais. Todos os scripts
individuais continuam existindo e podem ser chamados diretamente.

| Comando | Quando usar | O que faz |
| --- | --- | --- |
| `npm run verify` | antes de abrir PR / durante o desenvolvimento | lint, testes, rotas, links internos, órfãs, canibalização, marca, E-E-A-T, segurança e analytics (não precisa de `dist/`) |
| `npm run build` | para gerar o artefato publicável | `prebuild` (sitemap, robots, llms, interlinks, auditoria SEO) + `vite build` (SSR) + `postbuild` (inventário SEO) |
| `npm run deploy:check` | depois do build, antes de publicar | robots, cabeçalhos, GEO, schema.org, JSON-LD SSR/estático, rich results, imagens, contato canônico e relatórios de indexação |

Ordem recomendada:

```sh
npm run verify
npm run build
npm run deploy:check
```

## Fonte única

Os passos ficam em `scripts/pipelines.config.mjs` e são executados por
`scripts/run-pipeline.mjs`. Para incluir um gate novo no fluxo oficial, basta
adicionar uma entrada nesse arquivo — nada mais precisa mudar.

## Flags

```sh
npm run verify:list                 # lista os passos sem executar
npm run deploy:check:list
npm run verify -- --skip=test       # pula passos específicos
npm run verify -- --only=check:internal-links,check:orphan-ratchet
npm run verify -- --continue        # executa tudo e falha só no fim
npm run deploy:check:strict         # torna os passos opcionais bloqueantes
```

## Passos opcionais

Alguns passos de `deploy:check` dependem de rede ou credenciais (Search Console,
Bing, site publicado). Eles são marcados como `optional`: falham como **aviso**,
nunca sozinhos bloqueiam. Use `deploy:check:strict` quando o ambiente tiver as
credenciais e você quiser tratá-los como gate real.

## Relatórios

Cada execução grava um resumo em `reports/pipeline-verify.json` e
`reports/pipeline-deploy-check.json` com duração, status e falhas por passo.
O CI publica esses arquivos como artefato `pipeline-reports`.

## CI/CD

O workflow `.github/workflows/ci.yml` usa os comandos oficiais:

- job `unit`: testes Vitest (por isso o CI roda `npm run verify -- --skip=test`);
- job `build`: `verify` → `build` → `deploy:check` + os gates que exigem servidor
  local (`check:local-interlinking`, `check-index-health`);
- jobs de e2e, lighthouse e IndexNow permanecem como estavam.

## Scripts individuais

Nada foi removido. Para diagnóstico específico continue usando, por exemplo:

```sh
npm run check:jsonld-ssr
npm run report:indexacao-ledger
npm run report:autoridade-seo
```

Consulte a lista completa com `npm run` ou `node -e "console.log(Object.keys(require('./package.json').scripts).join('\n'))"`.
