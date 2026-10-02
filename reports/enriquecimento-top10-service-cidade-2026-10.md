# Enriquecimento top 10 — ServicoCidadePage — outubro/2026

Rodada restrita às posições 1–10 de `reports/priorizacao-enriquecimento-2026-10.md`.

## Escopo

Foram enriquecidas somente estas URLs:

1. `/servicos/conserto-tv/curitiba`
2. `/servicos/conserto-celular/curitiba`
3. `/servicos/suporte-empresas/curitiba`
4. `/servicos/atendimento-remoto/curitiba`
5. `/servicos/conserto-tv/sao-jose-dos-pinhais`
6. `/servicos/conserto-celular/sao-jose-dos-pinhais`
7. `/servicos/upgrade-ssd/sao-jose-dos-pinhais`
8. `/servicos/suporte-empresas/sao-jose-dos-pinhais`
9. `/servicos/atendimento-remoto/sao-jose-dos-pinhais`
10. `/servicos/montagem-de-pc/sao-jose-dos-pinhais`

Nenhuma política de indexação foi alterada. Não houve mudança de robots, noindex, sitemap, canonical, rota ou schema.

## Método

O cálculo replica o critério editorial usado para a família `ServicoCidadePage` em
`reports/auditoria-duplicidade-2026-09.md`:

- corpus autoral = `intro` + parágrafos de `blocos`;
- FAQ, CTA e texto compartilhado do template ficam fora do corpus;
- normalização para minúsculas, sem acentos e sem pontuação;
- comparação por Jaccard de 5-gramas;
- conteúdo único por página = `100% - maior similaridade encontrada`.

Antes desta rodada, as dez URLs eram fallback genérico sem bloco local autoral,
portanto estavam na medição conservadora de **0% de conteúdo local único**,
isto é, faixa **<30%**.

Após a rodada, as dez páginas foram comparadas entre si e contra todos os demais
blocos autorais de `ServicoCidadePage` presentes em
`servicoCuritibaBlocos.json` e `servicoSjpBlocos.json`.
As páginas restantes da família que continuam em fallback não possuem corpus
local autoral próprio; no mesmo critério da auditoria anterior, permanecem em 0%.

## Resultado

| URL | Antes | Depois | Maior similaridade | Página mais próxima | Palavras autorais |
| --- | ---: | ---: | ---: | --- | ---: |
| `/servicos/conserto-tv/curitiba` | 0,0% | **98,3%** | 1,7% | `/servicos/conserto-tv/sao-jose-dos-pinhais` | 846 |
| `/servicos/conserto-celular/curitiba` | 0,0% | **98,8%** | 1,2% | `/servicos/conserto-celular/sao-jose-dos-pinhais` | 702 |
| `/servicos/suporte-empresas/curitiba` | 0,0% | **98,5%** | 1,5% | `/servicos/suporte-empresas/sao-jose-dos-pinhais` | 702 |
| `/servicos/atendimento-remoto/curitiba` | 0,0% | **98,5%** | 1,5% | `/servicos/montagem-de-pc/sao-jose-dos-pinhais` | 682 |
| `/servicos/conserto-tv/sao-jose-dos-pinhais` | 0,0% | **97,6%** | 2,4% | `/servicos/montagem-de-pc/sao-jose-dos-pinhais` | 638 |
| `/servicos/conserto-celular/sao-jose-dos-pinhais` | 0,0% | **98,7%** | 1,3% | `/servicos/suporte-empresas/sao-jose-dos-pinhais` | 592 |
| `/servicos/upgrade-ssd/sao-jose-dos-pinhais` | 0,0% | **96,5%** | 3,5% | `/servicos/montagem-de-pc/sao-jose-dos-pinhais` | 569 |
| `/servicos/suporte-empresas/sao-jose-dos-pinhais` | 0,0% | **98,0%** | 2,0% | `/servicos/montagem-de-pc/sao-jose-dos-pinhais` | 559 |
| `/servicos/atendimento-remoto/sao-jose-dos-pinhais` | 0,0% | **98,9%** | 1,1% | `/servicos/conserto-tv/sao-jose-dos-pinhais` | 592 |
| `/servicos/montagem-de-pc/sao-jose-dos-pinhais` | 0,0% | **96,5%** | 3,5% | `/servicos/upgrade-ssd/sao-jose-dos-pinhais` | 555 |

### Conclusão

- 10/10 saíram da faixa <30%;
- 10/10 ultrapassaram 60% de conteúdo único;
- pior resultado de unicidade: **96,5%**;
- maior similaridade observada: **3,5%**;
- nenhuma página chega perto do limite de 85% de similaridade;
- nenhuma afirmação de avaliação, aggregateRating, depoimento, volume de atendimentos ou quantidade de prestadores por cidade foi adicionada;
- referências de 2006, rede nacional com mais de 6 mil prestadores, valorização do prestador e janela de 2 a 72 horas úteis foram usadas apenas nos limites factuais definidos pelo gestor, com condicionantes de urgência e agenda.

## Arquivos de produção alterados

- `src/lib/servicoCuritibaBlocos.json`
- `src/lib/servicoSjpBlocos.json`

Somente conteúdo autoral foi adicionado a essas fontes.
