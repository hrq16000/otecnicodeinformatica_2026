# Nova priorização GSC — micro-lote Pinhais 1–4 — 2026-10-02

## Estado de partida

- `main` confirmado antes da rodada: `e245a996603efb3c08daa63765695c19e38e6fb8` (PR #339).
- fila prioritária anterior: **40/40 concluída**; nenhuma URL das posições 1–40 é reutilizada nesta fila.
- política local antes desta micro-rodada: **72 entidades explícitas**, sendo **57 `SERVICO_CIDADE`**, todas as 57 já promovidas.
- Search Console usado: `sc-domain:otecnicodeinformatica.com.br`.
- janela GSC atual: **2026-09-03 a 2026-09-30**, dados assentados até **2026-09-29**.

## Critério da nova fila

A seleção não usa impressão direta de uma URL ainda canonicalizada/noindex como requisito, porque isso penalizaria justamente páginas que o Google não deveria tratar como destino independente antes da qualificação. O sinal de demanda vem da **página-pai/família de serviço**, cruzado com:

1. cidade cuja landing já possui política local qualificada — Pinhais;
2. intenção transacional/local que muda a execução do serviço;
3. ausência de conflito com as rotas literais já existentes em Pinhais;
4. possibilidade de produzir conteúdo autoral sem inventar filial, equipe local, SLA ou quantidade municipal de prestadores;
5. exclusão integral das 40 páginas da fila anterior.

## Conflitos evitados

Não foram escolhidas nesta rodada as combinações modernas que podem sobrepor as rotas literais já existentes em Pinhais:

- `/servicos/conserto-pc-notebook/pinhais`;
- `/servicos/formatacao-computador/pinhais`;
- `/servicos/redes-wifi/pinhais`;
- `/servicos/remocao-virus/pinhais`;
- `/servicos/upgrade-ssd-memoria/pinhais`.

## Micro-lote selecionado

| Ordem | URL nova | Página-pai usada como sinal | GSC atual |
|---|---|---|---:|
| 1 | `/servicos/conserto-tv/pinhais` | `/servicos/conserto-tv` | 112 impressões |
| 2 | `/servicos/suporte-tecnico-empresarial/pinhais` | `/servicos/suporte-tecnico-empresarial` | 13 impressões |
| 3 | `/servicos/backup-recuperacao/pinhais` | `/servicos/recuperacao-de-dados` | 6 impressões |
| 4 | `/servicos/pc-gamer/pinhais` | `/servicos/pc-gamer` | 1 impressão |

A fila atual tem, portanto, **4 páginas**.

## Auditoria autoral antes da promoção

Métrica mantida das rodadas anteriores:

- corpus = `intro` + parágrafos dos `blocos`;
- normalização de caixa, acentos e pontuação;
- Jaccard de 5-gramas;
- comparação contra todo o corpus autoral de `ServicoCidadePage`;
- piso editorial: **550 palavras autorais**;
- teto operacional de similaridade: **0,45**.

| URL | Palavras | Maior similaridade | Unicidade | Página mais próxima |
|---|---:|---:|---:|---|
| `/servicos/conserto-tv/pinhais` | 902 | 2,51% | **97,5%** | `/servicos/conserto-tv/campo-largo` |
| `/servicos/suporte-tecnico-empresarial/pinhais` | 783 | 2,25% | **97,7%** | `/servicos/pc-gamer/pinhais` |
| `/servicos/backup-recuperacao/pinhais` | 744 | 1,74% | **98,3%** | `/servicos/suporte-tecnico-empresarial/pinhais` |
| `/servicos/pc-gamer/pinhais` | 767 | 5,12% | **94,9%** | `/servicos/pc-gamer/campo-largo` |

Após adicionar o conteúdo, o corpus autoral passa a **61 páginas**. O maior par de similaridade de toda a família continua sendo o par antigo:

- `/servicos/atendimento-remoto/araucaria`;
- `/servicos/atendimento-remoto/campo-largo`;
- similaridade: **6,1%**.

Também foram verificados antes da promoção:

- **0 colisões de `title`** após remoção de topônimos;
- **0 colisões de `description`** após remoção de topônimos;
- todas as quatro páginas acima do piso de 550 palavras.

## Governança e claims

O conteúdo mantém somente fatos institucionais já autorizados:

- operação iniciada em Curitiba em 2006;
- rede nacional com mais de 6 mil prestadores credenciados;
- compromisso com tarifa mínima justa ao prestador;
- janela operacional de 2 a 72 horas úteis conforme urgência e disponibilidade.

Em todas as páginas, o número de prestadores é explicitamente tratado como **nacional**, nunca como contagem de Pinhais. Não foram criados ratings, depoimentos, volume de atendimentos, filial, equipe fixa, certificação ou ETA garantido.

## Promoção proposta nesta branch

Somente após a auditoria autoral acima, a branch declara estas quatro entidades como:

- `index`;
- canonical self;
- `sitemap: true`;
- tier `SERVICO_CIDADE_COM_INTENCAO_LOCAL`.

A policy passa de **57 para 61 `SERVICO_CIDADE` explícitas**. As demais combinações de Pinhais continuam fail-closed; por exemplo, `/servicos/conserto-celular/pinhais` permanece canonicalizada para o serviço-pai.

A efetivação em produção fica condicionada aos testes/gates e ao merge da PR.
