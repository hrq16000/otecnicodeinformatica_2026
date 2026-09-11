# Reposicionamento — o que já existe e o que falta

Antes de propor mudanças, analisei o portal atual. Boa parte da missão desta
rodada **já está implementada** e não deve ser refeita:

| Diretriz do briefing | Situação atual |
| --- | --- |
| Home orientada a problema, com pergunta principal | Pronta — "Qual problema de tecnologia precisamos resolver hoje?" |
| Campo para descrever o problema com sugestões | Pronto — busca inteligente com sinônimos e chips de sintoma |
| Quatro caminhos de entrada (problema / serviço / empresa / profissional) | Prontos, cada um com CTA próprio |
| Navegação por contexto (computadores, redes, dados, empresas) | Pronta — bloco em bento assimétrico, informática dominante |
| Faixa "Além da informática" secundária | Pronta |
| Mega-menu contextual no topo | Pronto |
| Funil de atendimento em 4 etapas | Pronto (`/atendimento`) |
| Página de valorização do trabalho técnico | Pronta |
| Diferenciação das marcas similares | Já é bloqueada por um verificador automático |

Refazer isso seria destruir trabalho aprovado. O que realmente falta são
**três lacunas concretas** do briefing.

## Lacuna 1 — Seção "Encontre sua solução" (exploração guiada)

Hoje o visitante escolhe por contexto e cai direto numa página. Falta a
exploração progressiva pedida: **problema → equipamento → solução →
atendimento**, dentro da própria Home, sem recarregar a página.

O que será feito: uma seção nova na Home onde o visitante avança em quatro
colunas/etapas. A cada escolha, as opções seguintes se ajustam; no fim
aparecem a página da solução correspondente e o botão de atendimento. Só usa
páginas que já existem — nenhum endereço novo, nenhum endereço alterado.

## Lacuna 2 — Ecossistemas de serviço explicitados

O briefing pede quatro ecossistemas nomeados (informática · conectividade e
infraestrutura · empresas e profissionais · além da informática). Hoje eles
existem espalhados. Serão organizados como agrupamento explícito na página
de serviços, reaproveitando os itens já cadastrados.

## Lacuna 3 — Transparência de deslocamento e condições na Home

Hoje aparece só uma linha discreta no fim do herói. Vira um bloco curto e
legível: cidades atendidas, modalidades, como o deslocamento é cobrado e o
valor mínimo — todos vindos da configuração comercial oficial, nunca
redigitados.

## Detalhes técnicos

- Nova seção `EncontreSuaSolucao` em `src/components/home/`, alimentada por um
  mapa de dados em `src/lib/`, com rotas validadas contra as existentes.
- Agrupamento por ecossistema derivado do catálogo de serviços atual.
- Bloco de condições lendo `src/lib/config/commercial.ts` (fonte única).
- Sem alteração de rotas, canonicals, sitemap ou conteúdo editorial.
- Validação: `npm run verify`, `npm run build`, `npm run deploy:check`.

## Fora do escopo desta rodada

Novos guias editoriais, painéis administrativos, rastreamento adicional e
submissões ao Google — cada um é uma rodada própria.
