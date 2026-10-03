# Micro-rodada CTR GSC — snippets 1–3 — 2026-10-03

## Estado de partida

- `main`: `73801569d7b000881f6c7a537eb705e0394c3b57` (PR #343).
- janela GSC: **2026-09-03 a 2026-09-30**, dados assentados até **2026-09-29**.
- esta rodada NÃO reabre a revisão editorial 60/60 já concluída.
- objetivo: melhorar correspondência de snippet em páginas já fortes e já exibidas pelo Google, sem alterar URL, canonical, robots ou conteúdo técnico.

## Páginas selecionadas

| URL | Impressões | Cliques | CTR | Posição média |
|---|---:|---:|---:|---:|
| `/problemas/computador-nao-da-imagem` | 85 | 0 | 0% | 9,27 |
| `/blog/boot-uefi-ou-legacy-como-identificar` | 58 | 0 | 0% | 9,38 |
| `/blog/como-diagnosticar-placa-mae-defeituosa` | 44 | 0 | 0% | 9,05 |

Para UEFI/Legacy, o GSC expôs queries reais como:
- `boot mode uefi ou legacy`;
- `como saber se o pc é uefi ou legacy`;
- `modo uefi ou legacy`.

As outras duas páginas tiveram queries individuais suprimidas pelo GSC; nenhuma consulta foi inventada.

## Mudanças de snippet

### UEFI / Legacy

Novo title:
`Boot mode UEFI ou Legacy: como saber qual seu PC usa`

Nova description:
`Veja como identificar UEFI ou Legacy no Windows com msinfo32, conferir GPT/MBR e entender quando mudar o modo de boot sem perder a inicialização.`

### Placa-mãe

Novo title:
`Como saber se a placa-mãe está com defeito: diagnóstico`

Nova description:
`Separe fonte, RAM, vídeo, POST e firmware antes de culpar a placa-mãe. Veja sinais fortes, testes controlados e quando parar sem trocar peça por tentativa.`

### Computador sem imagem

Novo title:
`Computador liga mas não dá imagem: RAM, GPU ou monitor?`

Nova description:
`PC liga, coolers giram, mas fica sem vídeo? Separe monitor, cabo, RAM, GPU, fonte e POST com testes seguros antes de comprar ou trocar peças.`

## Guardrails

- nenhum corpo editorial foi alterado;
- nenhum conteúdo aprovado foi removido;
- canonical e robots permanecem iguais;
- títulos ficaram entre **52 e 55 caracteres**;
- descriptions ficaram entre **141 e 155 caracteres**;
- cada novo title/description aparece exatamente uma vez na fonte correspondente.

Resultado de CTR deve ser medido em janela posterior; esta rodada não presume ganho antes de dados novos do GSC.
