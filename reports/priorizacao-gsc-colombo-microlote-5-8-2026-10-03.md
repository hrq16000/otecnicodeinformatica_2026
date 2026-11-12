# Nova priorização GSC — micro-lote Colombo 5–8 — 2026-10-03

## Estado de partida

- `main` confirmado: `6117d8fa1bbc9c0f989536eef43f5bca2433c5a2` (PR #341).
- micro-lote Colombo 1–4: **4/4 concluído**.
- política local antes desta rodada: **80 entidades explícitas**, sendo **65 `SERVICO_CIDADE`**.
- Search Console: `sc-domain:otecnicodeinformatica.com.br`.
- janela GSC usada: **2026-09-03 a 2026-09-30**, dados assentados até **2026-09-29**.

## Priorização

Pinhais continua com o maior sinal municipal, mas os principais serviços remanescentes coincidem com rotas legadas que podem competir por intenção. Para não criar canibalização, a expansão seguiu em Colombo, cuja landing municipal já está indexável, possui conteúdo local próprio e tinha 4 impressões com posição média 6,75 na janela observada.

Não foram encontrados arquivos de rota literal serviço×Colombo competindo com os quatro pares escolhidos.

| Ordem | URL | Serviço-pai | GSC atual |
|---|---|---|---:|
| 5 | `/servicos/upgrade-ssd/colombo` | `/servicos/upgrade-ssd-ram` | 7 impressões |
| 6 | `/servicos/backup-recuperacao/colombo` | `/servicos/recuperacao-de-dados` | 6 impressões |
| 7 | `/servicos/redes-wifi/colombo` | `/servicos/redes-e-wifi` | 5 impressões |
| 8 | `/servicos/pc-gamer/colombo` | `/servicos/pc-gamer` | 1 impressão |

## Auditoria autoral antes da promoção

Métrica mantida:
- corpus = `intro` + parágrafos dos blocos;
- normalização de caixa, acentos e pontuação;
- Jaccard de 5-gramas;
- comparação contra todo o corpus autoral de `ServicoCidadePage`;
- piso editorial: **550 palavras**;
- teto operacional de similaridade: **0,45**.

| URL | Palavras | Maior similaridade | Unicidade |
|---|---:|---:|---:|
| `/servicos/upgrade-ssd/colombo` | 720 | 2,65% | **97,3%** |
| `/servicos/backup-recuperacao/colombo` | 637 | 2,08% | **97,9%** |
| `/servicos/redes-wifi/colombo` | 684 | 2,67% | **97,3%** |
| `/servicos/pc-gamer/colombo` | 605 | 2,65% | **97,3%** |

Após o conteúdo, o corpus autoral passa a **69 páginas**. O maior par global continua em **11,85%**, bem abaixo do teto de 45%.

Também foram verificados antes da promoção:
- **0 colisões de title** após remoção dos topônimos;
- **0 colisões de description** após remoção dos topônimos;
- as quatro URLs ainda estavam ausentes da policy durante a auditoria.

## Governança de claims

O lote mantém apenas fatos institucionais já autorizados:
- operação iniciada em Curitiba em 2006;
- rede nacional com mais de 6 mil prestadores credenciados;
- compromisso com tarifa mínima justa ao prestador;
- janela operacional variável de 2 a 72 horas úteis conforme urgência e disponibilidade.

Não foram inventados filial, laboratório, estoque, contagem municipal de técnicos, ratings, depoimentos, SLA ou ETA garantido.

## Promoção

Somente as quatro URLs acima foram adicionadas à policy como:
- `index`;
- canonical self;
- `sitemap: true`;
- tier `SERVICO_CIDADE_COM_INTENCAO_LOCAL`.

A policy passa de **65 para 69 `SERVICO_CIDADE` explícitas**. Outras combinações de Colombo continuam fail-closed até qualificação própria.

A publicação depende de testes/gates e merge da PR.
