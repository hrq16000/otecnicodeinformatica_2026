# Enriquecimento fila 21–30 — ServicoCidadePage — outubro/2026

Rodada restrita às posições **21–30** de `reports/priorizacao-enriquecimento-2026-10.md`.

## URLs processadas

1. `/servicos/backup-recuperacao/araucaria`
2. `/servicos/suporte-empresas/araucaria`
3. `/servicos/atendimento-remoto/araucaria`
4. `/servicos/montagem-de-pc/araucaria`
5. `/servicos/pc-gamer/araucaria`
6. `/servicos/suporte-home-office/araucaria`
7. `/servicos/suporte-tecnico-empresarial/araucaria`
8. `/servicos/manutencao-preventiva-empresas/araucaria`
9. `/servicos/backup-para-empresas/araucaria`
10. `/servicos/conserto-notebook/campo-largo`

## Método

Mesma métrica editorial das rodadas anteriores:

- corpus autoral = `intro` + parágrafos de `blocos`;
- normalização para minúsculas, sem acentos e sem pontuação;
- Jaccard de 5-gramas;
- conteúdo único = `100% - maior similaridade`;
- comparação contra todas as páginas autorais de `ServicoCidadePage` disponíveis na branch;
- piso operacional adicional: **550 palavras autorais** antes da promoção.

Antes da rodada, as dez URLs usavam fallback genérico e eram tratadas de forma
conservadora como **0% de conteúdo local único**, faixa **<30%**.

## Resultado antes da promoção

| URL | Antes | Depois | Maior similaridade | Página mais próxima | Palavras autorais |
|---|---:|---:|---:|---|---:|
| `/servicos/backup-recuperacao/araucaria` | 0,0% | **97,0%** | 3,0% | `/servicos/conserto-pc/araucaria` | 587 |
| `/servicos/suporte-empresas/araucaria` | 0,0% | **97,1%** | 2,9% | `/servicos/montagem-de-pc/araucaria` | 550 |
| `/servicos/atendimento-remoto/araucaria` | 0,0% | **97,3%** | 2,7% | `/servicos/suporte-home-office/araucaria` | 580 |
| `/servicos/montagem-de-pc/araucaria` | 0,0% | **97,1%** | 2,9% | `/servicos/suporte-empresas/araucaria` | 562 |
| `/servicos/pc-gamer/araucaria` | 0,0% | **97,0%** | 3,0% | `/servicos/conserto-pc/araucaria` | 553 |
| `/servicos/suporte-home-office/araucaria` | 0,0% | **96,9%** | 3,1% | `/servicos/manutencao-preventiva-empresas/araucaria` | 559 |
| `/servicos/suporte-tecnico-empresarial/araucaria` | 0,0% | **97,5%** | 2,5% | `/servicos/atendimento-remoto/araucaria` | 576 |
| `/servicos/manutencao-preventiva-empresas/araucaria` | 0,0% | **96,9%** | 3,1% | `/servicos/suporte-home-office/araucaria` | 554 |
| `/servicos/backup-para-empresas/araucaria` | 0,0% | **97,4%** | 2,6% | `/servicos/backup-para-empresas/sao-jose-dos-pinhais` | 555 |
| `/servicos/conserto-notebook/campo-largo` | 0,0% | **96,5%** | 3,5% | `/servicos/conserto-notebook/araucaria` | 568 |

## Resultado global da família autoral

Após incluir estas dez páginas, a família autoral de `ServicoCidadePage`
passa a ter **47 páginas**. O maior par encontrado no corpus autoral completo
continua sendo:

- `/servicos/conserto-celular/sao-jose-dos-pinhais`
- `/servicos/conserto-celular/araucaria`
- similaridade: **4,7%**

Nenhuma página se aproxima do limite editorial de 85% de similaridade e todas
as dez novas páginas permanecem muito acima do piso de 60% de conteúdo único.

## Arquitetura fail-closed

Araucária reaproveita a fonte local própria criada na rodada anterior e passa
a declarar mais nove serviços. Campo Largo ganha uma fonte nova e isolada:

- `src/lib/servicoCampoLargoBlocos.json`

Somente `conserto-notebook` é declarado para Campo Largo nesta rodada. Nenhum
outro serviço da cidade recebe conteúdo local automaticamente.

O gate de intenção local também passa a remover topônimos de Campo Largo
(Campo Largo, Ferraria, Bateias, Santa Cruz, Rondinha, Botiatuva, Itaqui,
São Marcos, Três Córregos, Vila Solene e Timbotuva) nas comparações cidade ×
cidade, para que troca de localidade não conte como originalidade artificial.

## Fatos e claims

A rodada mantém a disciplina de conteúdo já adotada:

- origem da empresa em Curitiba em 2006;
- rede nacional com mais de 6 mil prestadores credenciados;
- compromisso de valorização do prestador e referência de tarifa mínima justa;
- janela operacional variável de 2 a 72 horas úteis, explicada por urgência e disponibilidade de agenda;
- nenhum número de prestadores por cidade;
- nenhum rating, depoimento, aggregateRating ou volume fictício de atendimentos.

A promoção para indexação só deve ocorrer depois destes resultados e dos gates
de policy/SSR/sitemap.
