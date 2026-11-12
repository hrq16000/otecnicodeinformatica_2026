# Micro-rodada CTR GSC — snippets 13–15 — 2026-10-03

## Estado de partida

- `main`: `bc3093feae4ec2158a21cfee47a6fe49f2cafefd` (PR #347).
- janela GSC: **2026-09-03 a 2026-09-30**, dados assentados até **2026-09-29**.
- páginas 1–12 das rodadas CTR anteriores foram excluídas.
- GSC retornou **135 páginas** no período; seleção restrita a zero clique, posição 5–15 e conteúdo já forte.
- as queries individuais das três páginas foram suprimidas; nenhuma query foi inferida ou inventada.
- a rota `/blog/$slug` compõe `blogPostsContentBase → blogSupplementalPosts → programmaticPosts`; as três páginas desta rodada existem somente como chave canônica em `blogPostsContentBase`, sem override suplementar/programático.

## Páginas selecionadas

| URL | Impressões | Cliques | CTR | Posição média |
|---|---:|---:|---:|---:|
| `/blog/como-conectar-wifi-tv-nao-conecta` | 216 | 0 | 0% | 9,25 |
| `/blog/curto-circuito-placa-mae-como-identificar` | 31 | 0 | 0% | 7,94 |
| `/blog/como-fazer-upgrade-ssd-nvme` | 20 | 0 | 0% | 8,05 |

## Novos snippets

### Smart TV não conecta ao Wi‑Fi

Title:
`Smart TV não conecta no Wi‑Fi? Veja o que testar primeiro`

Description:
`TV não acha a rede, conecta sem internet ou cai do Wi‑Fi? Veja como separar sinal, compatibilidade, roteador, software e falha da TV antes de resetar.`

### Possível curto na placa-mãe

Title:
`PC liga e desliga na hora? Como identificar possível curto`

Description:
`Veja como separar fonte, cabos, gabinete, periféricos e placa-mãe quando o PC liga e desliga, sem tratar continuidade ou troca de peças como prova de curto.`

### Upgrade SSD NVMe

Title:
`Upgrade para SSD NVMe: como saber se seu PC é compatível`

Description:
`Veja como confirmar slot M.2, suporte a NVMe, boot e espaço antes da compra e como escolher entre clonagem e instalação limpa sem confundir formato e interface.`

## Guardrails

- somente title/excerpt na fonte canônica já existente;
- nenhum corpo editorial alterado;
- nenhuma URL, canonical, robots, sitemap, policy ou schema alterada;
- nenhuma promoção de indexação;
- nenhuma query suprimida foi inferida;
- páginas CTR 1–12 permanecem congeladas;
- efeito em CTR só deve ser medido em nova janela posterior do GSC.
