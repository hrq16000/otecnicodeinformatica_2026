# Nova priorização GSC — micro-lote Colombo 1–4 — 2026-10-02

## Estado de partida

- `main` confirmado antes da rodada: `c00df84a6f5ac4fe93aa43c8c86684dd5b48b538` (PR #340).
- fila Pinhais anterior: **4/4 concluída**.
- política local antes desta micro-rodada: **76 entidades explícitas**, sendo **61 `SERVICO_CIDADE`**.
- Search Console: `sc-domain:otecnicodeinformatica.com.br`.
- janela GSC: **2026-09-03 a 2026-09-30**, dados assentados até **2026-09-29**.

## Por que Colombo

A landing `/tecnico-informatica-colombo` já está `index`, possui conteúdo local próprio e aparece no GSC atual com **4 impressões**, posição média **6,75**. Não foram encontradas rotas literais serviço×Colombo que competissem com os quatro pares selecionados.

## Seleção objetiva

| Ordem | URL nova | Página-pai usada como sinal | GSC atual |
|---|---|---|---:|
| 1 | `/servicos/conserto-tv/colombo` | `/servicos/conserto-tv` | 112 impressões |
| 2 | `/servicos/conserto-notebook/colombo` | `/servicos/manutencao-de-notebook` | 47 impressões |
| 3 | `/servicos/conserto-pc/colombo` | `/servicos/manutencao-de-computador` | 18 impressões |
| 4 | `/servicos/suporte-tecnico-empresarial/colombo` | `/servicos/suporte-tecnico-empresarial` | 13 impressões |

## Auditoria autoral antes da promoção

Métrica mantida:
- corpus = `intro` + parágrafos dos `blocos`;
- normalização de caixa, acentos e pontuação;
- Jaccard de 5-gramas;
- comparação contra todo o corpus autoral de `ServicoCidadePage`;
- piso editorial: **550 palavras autorais**;
- teto operacional de similaridade: **0,45**.

| URL | Palavras | Maior similaridade | Unicidade | Página mais próxima |
|---|---:|---:|---:|---|
| `/servicos/conserto-tv/colombo` | 822 | 3,44% | **96,6%** | `/servicos/conserto-tv/pinhais` |
| `/servicos/conserto-notebook/colombo` | 748 | 2,80% | **97,2%** | `/servicos/pc-gamer/pinhais` |
| `/servicos/conserto-pc/colombo` | 708 | 2,65% | **97,4%** | `/servicos/suporte-tecnico-empresarial/colombo` |
| `/servicos/suporte-tecnico-empresarial/colombo` | 697 | 11,85% | **88,1%** | `/servicos/suporte-tecnico-empresarial/pinhais` |

Após o lote, o corpus autoral passa a **65 páginas**. O maior par global passa a 11,85%, ainda muito abaixo do teto operacional de 45%.

Antes da promoção também foram corrigidos metadados que inicialmente colidiam entre cidades. Resultado final:

- **0 colisões de `title`** após remoção de topônimos;
- **0 colisões de `description`** após remoção de topônimos;
- todas as quatro páginas acima do piso de 550 palavras.

## Governança

Conteúdo restrito aos fatos institucionais autorizados:
- operação iniciada em Curitiba em 2006;
- rede nacional com mais de 6 mil prestadores credenciados;
- compromisso com tarifa mínima justa ao prestador;
- janela operacional variável de 2 a 72 horas úteis conforme urgência e disponibilidade.

Não foram criados: quantidade municipal de técnicos, ratings, depoimentos, `aggregateRating`, volume de atendimentos, filial, equipe fixa, certificação ou ETA garantido.

## Promoção proposta

Somente estas quatro entidades passam para:
- `index`;
- canonical self;
- `sitemap: true`;
- tier `SERVICO_CIDADE_COM_INTENCAO_LOCAL`.

A policy passa de **61 para 65 `SERVICO_CIDADE` explícitas**. Combinações de Colombo fora do lote permanecem fail-closed e fora do sitemap.

A entrada em produção depende de testes/gates e merge da PR.
