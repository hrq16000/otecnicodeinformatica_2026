# Onda 10C — Lote 1 (Clusters 3 e 4)

**Escopo:** "Computador não liga" (cluster 3) e "Computador liga e desliga sozinho" (cluster 4).
**Regra aplicada:** nenhuma URL nova quando já existe dono de intenção. Só publicar satélite
quando a intenção estiver descoberta.

## 1. Auditoria de donos existentes

| Intenção do briefing | Dono existente | Decisão |
| --- | --- | --- |
| Fonte de alimentação com defeito | `/blog/como-testar-fonte-de-alimentacao-pc` | Reforçar, não duplicar |
| Placa-mãe com defeito | `/blog/como-diagnosticar-placa-mae-defeituosa` | Reforçar, não duplicar |
| Notebook não liga | `/blog/notebook-nao-liga-o-que-fazer` | Reforçar, não duplicar |
| Superaquecimento / pasta térmica | `/problemas/computador-esquentando` | Dono do cluster, não duplicar |
| Desliga sozinho (pilar) | `/problemas/computador-desliga-sozinho` | Pilar existente |
| Botão power / jump start | — | **Publicado** |
| Curto-circuito na placa | — | **Publicado** |
| BIOS corrompida / reset de CMOS | — | **Publicado** |

Motivo de não criar `/blog/pc-nao-liga-guia-completo` nem `/blog/pc-liga-e-desliga`: ambos
canibalizariam pilares já indexáveis (`/servicos/computador-nao-liga` e
`/problemas/computador-desliga-sozinho`).

## 2. Publicado neste lote

| URL | Cluster | Formato | Tabela | FAQ | Capa real |
| --- | --- | --- | --- | --- | --- |
| `/blog/botao-power-nao-funciona-jump-start-placa-mae` | 3 | Procedimento | diagnóstica (5 linhas) | 3 perguntas | Wikimedia, licença registrada |
| `/blog/curto-circuito-placa-mae-como-identificar` | 4 | Diagnóstico | diagnóstica (5 linhas) | 3 perguntas | Wikimedia, licença registrada |
| `/blog/bios-corrompida-reset-cmos-atualizacao` | 4 | Procedimento | decisão (5 linhas) | 3 perguntas | Wikimedia, licença registrada |

Cada artigo tem: resposta curta logo após a introdução, seção de causas, roteiro numerado,
aviso de segurança, tabela e seção "Quando chamar um técnico" com link para
`/servicos/conserto-de-computador` e `/diagnostico-tecnico`.

## 3. Interlinking

- Entrada: `/servicos/conserto-de-computador` → os três satélites
  (`src/lib/editorialInboundLinks.ts`).
- Laterais: botão power → fonte, placa-mãe, curto e notebook; curto → fonte, placa-mãe;
  BIOS → `/blog/computador-entra-direto-na-bios`.
- Sem link direto de WhatsApp dentro do corpo editorial (gate `check:editorial-no-direct-wa`).

## 4. Governança

- Registro de onda: `WAVE_10D` em `src/lib/blogEditorialRegistry.ts`; teto elevado para 45.
- Intenções mapeadas em `src/lib/contentIntentMap.ts` (sem colisão detectada).
- Revisão técnica e fontes em `src/lib/blogEditorialSources.ts`.
- Imagens: reais e licenciadas, sem IA (`check:ai-images`).

## 5. Verificação

Gates executados: `check:editorial-governance`, `check:content-intent`,
`check:intent-collisions`, `check:ai-images`, `check:editorial-no-direct-wa`,
`check:conversational-intent`. E2E novo: `e2e/onda-10c-lote1-satelites.spec.ts`
(SSR 200, H1 único, robots index, tabela, FAQPage único, Article, links internos vivos).

## 6. Veredito

Lote 1 concluído: 3 satélites indexáveis, 0 URL canibal, 0 imagem de IA.
**Parada solicitada respeitada** — clusters 5 a 10 não foram iniciados.
