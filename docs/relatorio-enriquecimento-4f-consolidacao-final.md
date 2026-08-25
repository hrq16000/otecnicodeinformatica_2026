# Rodada 4F — Consolidação final de autoridade e cobertura

Encerra a sequência 4A → 4F. Nenhuma URL nova foi criada: a rodada mediu a
cobertura real no HTML SSR, corrigiu regressões detectadas por gate e fechou a
governança de indexação e performance.

## 1. Matriz mestra de cobertura

Gerada por `npm run report:authority-coverage` a partir dos registros de
enriquecimento (`src/lib/enriquecimento*.ts`) cruzados com o HTML SSR de `dist/`.
Saídas: `reports/authority-coverage-final.json` e `.md`.

- Owners auditados: **29** (28 indexáveis + `/empresas`, que é `noindex` por decisão anterior e entra como N/A)
- Score médio: **41/50**
- Distribuição: **STRONG 14 · ADEQUATE 14 · PARTIAL 0 · WEAK 0**
- Clusters: Comercial local 6 · B2B 6 · Problemas 6 · ATP hardware 5 · ATP software/dados 4 · Redes e remoto 2

### Score de Autoridade (0–50)

Só evidência verificável no HTML servido: profundidade textual (12), resposta
direta no topo (8), tabela diagnóstica (6), fontes primárias (6), FAQ própria (6),
JSON-LD Service/LocalBusiness (6), malha interna de saída (6).

## 2. Gaps críticos

**Nenhum owner WEAK ou PARTIAL.** A auditoria inicial acusou dois candidatos e
ambos foram desqualificados por evidência:

| Candidato | Veredito |
| --- | --- |
| `/empresas` | `noindex` deliberado — fora do universo indexável, não é gap |
| `/problemas/computador-desliga-sozinho` | Falso positivo do extrator (link `to:` lido como owner); a página é ADEQUATE |

Como não houve gap real, nenhuma URL entrou como `FUTURE_CANDIDATE` nesta rodada.

## 3. Regressão corrigida (REAL_REGRESSION)

O gate `check:geo` acusou H2 repetido em três owners da 4E —
`/atendimento-remoto`, `/equipamentos/roteador` e `/problemas/wifi-instavel`.
Causa: o bloco de rede da 4E emitia um segundo `Resposta rápida` em páginas que
já tinham o bloco das rodadas anteriores.

Correção: `RespostaRapida` passou a aceitar `titulo` e `id`, e o bloco 4E usa
`Resposta rápida sobre rede e conexão` / `#resposta-rapida-rede`. O `id`
original segue único por rota (contrato do E2E `servicos-enriquecimento`).

## 4. Open Graph e Twitter Cards automáticos

Novo `src/lib/socialMeta.ts` é a fonte única de `<title>`, `description`,
`og:*` e `twitter:*`, com as mesmas janelas do gate (title 25–70, description
70–165). Aplicado à rota `/blog/$slug` (SSR) e ao `BlogPost` (head pós-hidratação),
eliminando as 13 divergências `og:title ≠ <title>` que o `check:geo` reportava.

## 5. Novos gates de CI

| Gate | O que bloqueia |
| --- | --- |
| `npm run check:index-headers` | robots.txt ausente/bloqueante, `Sitemap:` não absoluto ou inexistente no build, `<loc>` relativo ou multi-host, `X-Robots-Tag: noindex` em rota pública |
| `npm run check:phone-visibility` | qualquer telefone/WhatsApp em texto legível no HTML entregue (rodapé, botões, páginas de serviço) |

Ambos rodam no `ci.yml` junto de `check:robots`, com a matriz de autoridade.

## 6. Budgets de performance por rota de serviço

`lighthouserc.servicos.json` + workflow `performance-servicos`: 8 rotas de
serviço, 3 execuções, budgets **bloqueantes** de LCP ≤ 2500 ms, CLS ≤ 0,1 e
TBT ≤ 200 ms (proxy de INP, que não existe em laboratório). Relatórios são
publicados como artefato.

Corrigido também `lighthouse-prod.yml`, que ainda apontava para o domínio da
marca de origem — agora audita `https://otecnicodeinformatica.com.br/`.

## 7. Bateria de gates (build + snapshot SSR de 159 rotas)

| Gate | Resultado |
| --- | --- |
| `check:geo` | ✔ (avisos remanescentes: comprimento de title/description em rotas pré-existentes) |
| `check:schema-standards` | ✔ 478 nós em 153 páginas indexáveis |
| `check:cannibalization` | ✔ sem canibalização P0 |
| `check:internal-links` / `check:orphan-pages` / `check:malha-interna` | ✔ zero órfãos, zero links quebrados |
| `check:sitemap-source` / `check:robots` / `check:index-headers` | ✔ 153 URLs curadas, 10 sitemaps |
| `check:jsonld-references` / `check:rich-results` | ✔ (avisos de `description` opcional em Service) |
| `check:lastmod-fingerprint` | ✔ após `npm run lastmod:fingerprint` (lastmod honesto) |
| `check:phone-visibility` | ✔ 159 páginas sem número legível |
| Typecheck | ✔ limpo |

Dívida pré-existente mantida fora do escopo: `check:local-doorway` segue
acusando similaridade de introdução entre bairros (Sítio Cercado, Boqueirão,
Cajuru, Pinheirinho, Aviação, Cidade Jardim), tema da trilha de bairros.

## 8. Veredito

A sequência 4A–4F está encerrada: todos os owners enriquecidos estão em
ADEQUATE ou STRONG, sem gaps de intenção abertos e sem doorway nos clusters
comerciais. A próxima decisão de conteúdo deve nascer de evidência do Search
Console, não de expansão especulativa.
