# Enriquecimento fila 11–20 — ServicoCidadePage — outubro/2026

Rodada restrita às posições **11–20** de `reports/priorizacao-enriquecimento-2026-10.md`.

## URLs processadas

1. `/servicos/pc-gamer/sao-jose-dos-pinhais`
2. `/servicos/suporte-home-office/sao-jose-dos-pinhais`
3. `/servicos/suporte-tecnico-empresarial/sao-jose-dos-pinhais`
4. `/servicos/manutencao-preventiva-empresas/sao-jose-dos-pinhais`
5. `/servicos/backup-para-empresas/sao-jose-dos-pinhais`
6. `/servicos/conserto-notebook/araucaria`
7. `/servicos/conserto-pc/araucaria`
8. `/servicos/conserto-tv/araucaria`
9. `/servicos/conserto-celular/araucaria`
10. `/servicos/upgrade-ssd/araucaria`

## Método

Mesma métrica editorial usada em `reports/auditoria-duplicidade-2026-09.md`
e na rodada anterior:

- corpus autoral = `intro` + parágrafos de `blocos`;
- normalização para minúsculas, sem acentos e sem pontuação;
- Jaccard de 5-gramas;
- conteúdo único = `100% - maior similaridade`;
- comparação contra todas as páginas autorais de `ServicoCidadePage` disponíveis na branch.

Antes da rodada, as dez URLs usavam fallback genérico e eram tratadas de forma
conservadora como **0% de conteúdo local único**, faixa **<30%**.

## Resultado antes da promoção

| URL | Antes | Depois | Maior similaridade | Página mais próxima | Palavras autorais |
|---|---:|---:|---:|---|---:|
| `/servicos/pc-gamer/sao-jose-dos-pinhais` | 0,0% | **96,9%** | 3,1% | `/servicos/conserto-pc/araucaria` | 579 |
| `/servicos/suporte-home-office/sao-jose-dos-pinhais` | 0,0% | **97,3%** | 2,7% | `/servicos/pc-gamer/sao-jose-dos-pinhais` | 568 |
| `/servicos/suporte-tecnico-empresarial/sao-jose-dos-pinhais` | 0,0% | **97,8%** | 2,2% | `/servicos/backup-para-empresas/sao-jose-dos-pinhais` | 569 |
| `/servicos/manutencao-preventiva-empresas/sao-jose-dos-pinhais` | 0,0% | **97,9%** | 2,1% | `/servicos/conserto-tv/araucaria` | 577 |
| `/servicos/backup-para-empresas/sao-jose-dos-pinhais` | 0,0% | **97,8%** | 2,2% | `/servicos/suporte-tecnico-empresarial/sao-jose-dos-pinhais` | 577 |
| `/servicos/conserto-notebook/araucaria` | 0,0% | **97,3%** | 2,7% | `/servicos/conserto-tv/araucaria` | 575 |
| `/servicos/conserto-pc/araucaria` | 0,0% | **96,9%** | 3,1% | `/servicos/pc-gamer/sao-jose-dos-pinhais` | 562 |
| `/servicos/conserto-tv/araucaria` | 0,0% | **97,3%** | 2,7% | `/servicos/conserto-notebook/araucaria` | 569 |
| `/servicos/conserto-celular/araucaria` | 0,0% | **95,3%** | 4,7% | `/servicos/conserto-celular/sao-jose-dos-pinhais` | 564 |
| `/servicos/upgrade-ssd/araucaria` | 0,0% | **97,2%** | 2,8% | `/servicos/upgrade-ssd/sao-jose-dos-pinhais` | 563 |

### Resultado global da família autoral

Após incluir estas dez páginas, a família autoral de `ServicoCidadePage` passa
a ter **37 páginas**. O maior par encontrado em todo o corpus autoral é:

- `/servicos/conserto-celular/sao-jose-dos-pinhais`
- `/servicos/conserto-celular/araucaria`
- similaridade: **4,7%**

Logo, nenhuma página se aproxima do limite editorial de 85% de similaridade e
todas as dez novas páginas permanecem muito acima do piso de 60% de conteúdo
único.

## Arquitetura

Para Araucária foi adicionada uma fonte fail-closed própria:

- `src/lib/servicoAraucariaBlocos.json`

Ela é ligada ao mesmo resolvedor usado por Curitiba e São José dos Pinhais,
sem gerar conteúdo para outros serviços da cidade. Apenas os cinco slugs
declarados no arquivo recebem bloco autoral.

## Fatos e claims

A rodada mantém a mesma disciplina da anterior:

- origem da empresa em Curitiba em 2006;
- rede nacional com mais de 6 mil prestadores credenciados;
- compromisso de valorização do prestador e referência de tarifa mínima justa;
- janela operacional variável de 2 a 72 horas úteis, explicada por urgência e disponibilidade de agenda;
- nenhum número de prestadores por cidade;
- nenhum rating, depoimento, aggregateRating ou volume de atendimentos inventado.

A promoção para indexação só deve ocorrer após estes resultados e os gates de
policy/SSR/sitemap.
