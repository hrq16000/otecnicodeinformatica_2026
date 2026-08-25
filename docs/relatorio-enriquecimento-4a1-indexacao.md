# Rodada 4A.2 — Fechamento pós-deploy e evidência de indexabilidade

Fecha a 4A.1 com evidência pública. Nenhum item da 4B foi iniciado.

## 1. Deploy real

| Item | Valor |
| --- | --- |
| Build servido em produção | `build-version.json` → `buildTime` 2026-08-25T00:28:11Z |
| Commit de conteúdo da 4A | `0c562a06` (aprovado na 4A) |
| SHA reportado pelo build | `dev` — **defeito conhecido**: o ambiente de build não expõe o SHA do Git, então `/status` não consegue provar DEPLOY_MATCH por commit, apenas por `buildTime` |
| Verificado em (UTC) | 2026-08-25T00:38Z |

## 2. As 6 URLs da 4A (slugs reais)

Fonte única: `scripts/lib/owners-4a.mjs`.

| Cluster ATP | URL |
| --- | --- |
| A — superaquecimento / desliga sozinho | `/problemas/computador-esquentando` |
| B — SSD × HD | `/solucoes/ssd` |
| C — RAM ou SSD | `/servicos/upgrade-ssd-ram` |
| D — recuperar dados / HD com barulho | `/problemas/hd-fazendo-barulho` |
| E — formatar PC / Windows | `/servicos/formatacao` |
| F — vírus / malware | `/servicos/remocao-de-virus` |

## 3. Smoke público (HTML real de `https://otecnicodeinformatica.com.br`)

Comando: `npm run smoke:4a` · evidência: `docs/relatorio-smoke-4a.md`,
`reports/smoke-4a.json` e snapshots HTML/texto em `reports/smoke-4a/`.

Resultado da primeira execução: **5/6 PASS**.

- 200, `robots=index,follow`, canonical self, H1 único, tabela diagnóstica,
  links internos `<a href>` e JSON-LD válido: 6/6.
- Falha real: `/problemas/computador-esquentando` estava sem o bloco
  **Resposta rápida** no SSR — o owner do cluster A não tinha `respostaRapida`
  em `src/lib/enriquecimentoAtp4a.ts`. Corrigido nesta rodada com texto autoral
  (diferenciação carga × defeito, verificação em repouso, risco do desligamento
  abrupto). Vai a público no próximo deploy.

Dois falsos vermelhos do detector foram corrigidos no próprio script, não no site:

- `<table>` era procurado por texto de cabeçalho; agora procura a tag.
- "@id duplicado" contava nós de **referência** (`{"@id": …}`), que legitimamente
  se repetem; agora só nós que **definem** (`@id` + `@type`) contam como duplicata.

## 4. `lastmod` por hash de conteúdo

- `scripts/lib/content-fingerprint.mjs` normaliza o HTML servido (remove script,
  style, atributos voláteis) e gera sha256 do conteúdo visível.
- `npm run lastmod:fingerprint` grava `config/content-fingerprints.json`:
  **153 rotas** registradas. Bootstrap **não inventa data** — rota sem `lastmod`
  declarado fica sem `lastmod` até que o hash mude.
- Regeneração dos sitemaps após o bootstrap produziu **zero diferença** frente ao
  commit: nenhuma data artificial foi introduzida. `lastmod = 2026-08-25`
  permanece apenas nas 6 URLs materialmente alteradas na 4A.

## 5. IndexNow seletivo

`node scripts/indexnow-ping.mjs --urls=<as 6>` → `indexnow.org` HTTP **202** e
`bing` HTTP **202**, 6/6 ACEITA. Log por URL com classificação de erro
(`AUTH_KEY`, `NETWORK`, `HTTP`) em `public/indexnow-status.json`; o modo
`--changed` deriva a lista dos fingerprints.

## 6. Baseline Google Search Console (pós-publicação)

`npm run report:index-status` → `public/index-status.json`
(propriedade `sc-domain:otecnicodeinformatica.com.br`).

| URL | Status | Cobertura | Último crawl |
| --- | --- | --- | --- |
| `/servicos/upgrade-ssd-ram` | INDEXED | indexada | 2026-08-17T00:50:47Z |
| `/problemas/computador-esquentando` | NO_DATA | Detectada, mas não indexada | — |
| `/solucoes/ssd` | NO_DATA | Detectada, mas não indexada | — |
| `/problemas/hd-fazendo-barulho` | NO_DATA | Detectada, mas não indexada | — |
| `/servicos/formatacao` | NO_DATA | Detectada, mas não indexada | — |
| `/servicos/remocao-de-virus` | NO_DATA | Detectada, mas não indexada | — |

Leitura honesta: 1 indexada e 5 detectadas sem indexação. O crawl das versões
enriquecidas ainda não ocorreu — não há evidência de efeito da 4A, só baseline.

## 7. Testes 713/715 — diagnóstico

`src/__tests__/routes-import-smoke.test.ts` reexecutado isoladamente:
**412/412 PASS em 15,7 s**. Classificação: **COLD_START_FLAKE** (timeout de
transformação no primeiro carregamento), não defeito de produto.
`npx vitest run src/lib`: 207/207 PASS após a correção de conteúdo.

## 8. Gates executados

`check:content-intent` ✓ (7 URLs, 7 pares tema × intenção únicos) ·
`check:cannibalization` ✓ (19 páginas P0, só avisos pré-existentes).

## 9. Infraestrutura entregue

- `npm run smoke:4a` — smoke automático das 6 URLs com snapshot HTML/SSR por URL.
- `/admin/indexacao` — painel de status por URL (Google, Bing, IndexNow,
  impressões e cliques de 28 dias); campo sem fonte aparece como `—`/`NO_DATA`,
  nunca como zero.
- `npm run report:index-status` — coletor GSC/Bing/IndexNow do snapshot.
- `npm run lastmod:fingerprint` / `check:lastmod-fingerprint` — `lastmod` por
  hash de conteúdo real.
- Log e classificação de falhas do IndexNow em `public/indexnow-status.json`.

## 10. Pendências

1. Publicar a Resposta rápida de `/problemas/computador-esquentando` e reexecutar
   `npm run smoke:4a` para fechar 6/6.
2. Expor o SHA do Git no build para que `/status` prove DEPLOY_MATCH por commit.
3. Reobservar o GSC após o próximo crawl das 6 URLs antes de decidir a 4B.
