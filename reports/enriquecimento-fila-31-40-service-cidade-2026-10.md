# Enriquecimento fila 31–40 — ServicoCidadePage — outubro/2026

Rodada restrita às posições **31–40** de `reports/priorizacao-enriquecimento-2026-10.md`.

## URLs processadas

1. `/servicos/conserto-pc/campo-largo`
2. `/servicos/conserto-tv/campo-largo`
3. `/servicos/conserto-celular/campo-largo`
4. `/servicos/upgrade-ssd/campo-largo`
5. `/servicos/backup-recuperacao/campo-largo`
6. `/servicos/suporte-empresas/campo-largo`
7. `/servicos/atendimento-remoto/campo-largo`
8. `/servicos/montagem-de-pc/campo-largo`
9. `/servicos/pc-gamer/campo-largo`
10. `/servicos/suporte-home-office/campo-largo`

## Método

Mesma métrica editorial das rodadas anteriores:

- corpus autoral = `intro` + parágrafos de `blocos`;
- normalização para minúsculas, sem acentos e sem pontuação;
- Jaccard de 5-gramas;
- conteúdo único = `100% - maior similaridade`;
- comparação contra todas as páginas autorais de `ServicoCidadePage` na branch;
- piso operacional: **550 palavras autorais** antes da promoção.

Antes da rodada, as dez URLs usavam fallback genérico e eram tratadas de forma conservadora como **0% de conteúdo local único**.

## Resultado antes da promoção

| URL | Depois | Maior similaridade | Página mais próxima | Palavras autorais |
|---|---:|---:|---|---:|
| `/servicos/conserto-pc/campo-largo` | **95,4%** | 4,6% | `/servicos/conserto-notebook/campo-largo` | 560 |
| `/servicos/conserto-tv/campo-largo` | **97,4%** | 2,6% | `/servicos/upgrade-ssd/campo-largo` | 579 |
| `/servicos/conserto-celular/campo-largo` | **96,1%** | 3,9% | `/servicos/conserto-celular/araucaria` | 579 |
| `/servicos/upgrade-ssd/campo-largo` | **97,0%** | 3,0% | `/servicos/montagem-de-pc/campo-largo` | 574 |
| `/servicos/backup-recuperacao/campo-largo` | **97,4%** | 2,6% | `/servicos/atendimento-remoto/campo-largo` | 558 |
| `/servicos/suporte-empresas/campo-largo` | **97,1%** | 2,9% | `/servicos/suporte-empresas/araucaria` | 576 |
| `/servicos/atendimento-remoto/campo-largo` | **93,9%** | 6,1% | `/servicos/atendimento-remoto/araucaria` | 576 |
| `/servicos/montagem-de-pc/campo-largo` | **94,7%** | 5,3% | `/servicos/montagem-de-pc/araucaria` | 570 |
| `/servicos/pc-gamer/campo-largo` | **95,1%** | 4,9% | `/servicos/pc-gamer/araucaria` | 576 |
| `/servicos/suporte-home-office/campo-largo` | **95,6%** | 4,4% | `/servicos/suporte-home-office/araucaria` | 552 |

## Resultado global da família autoral

Com estas dez páginas, a família autoral de `ServicoCidadePage` passa a ter **57 páginas**.

O maior par encontrado em todo o corpus autoral foi:

- `/servicos/atendimento-remoto/araucaria`
- `/servicos/atendimento-remoto/campo-largo`
- similaridade: **6,1%**

Portanto, nenhuma página se aproxima do limite editorial de 85% de similaridade e todas as dez novas páginas permanecem muito acima do piso de 60% de conteúdo único.

## Metadata e interlinks

Antes da promoção também foi feita uma comparação de `title` e `description` entre cidades com topônimos removidos. Resultado:

- **0 colisões de title**;
- **0 colisões de description**;
- **0 interlinks quebrados** nas dez páginas da rodada.

## Arquitetura fail-closed

`src/lib/servicoCampoLargoBlocos.json` passa de uma para onze páginas autorais declaradas. A presença do conteúdo nesse arquivo não altera automaticamente as demais combinações de Campo Largo; a indexabilidade continua governada por `src/lib/localIndexPolicy.json`.

## Fatos e claims

A rodada mantém as regras de conteúdo já adotadas:

- origem da empresa em Curitiba em 2006;
- rede nacional com mais de 6 mil prestadores credenciados;
- referência de tarifa mínima justa ao prestador;
- janela operacional de 2 a 72 horas úteis explicada por urgência e disponibilidade;
- nenhuma contagem de prestadores por cidade;
- nenhum rating, depoimento, aggregateRating ou volume fictício de atendimentos.

A promoção para indexação só deve ocorrer depois destes resultados e dos gates de policy/SSR/sitemap.
