# Consolidação editorial — estoque programático herdado

Data: 2026-09-25  
Escopo: `src/data/blogProgrammaticPosts.tsx`  
Princípio: não aumentar o índice com conteúdo fraco, duplicado ou datado.

## Resultado do inventário

Os 18 artigos programáticos herdados foram classificados em duas filas:

- **15 consolidações por 301**: a intenção já possui uma URL canônica mais forte, revisada e/ou indexável.
- **3 promovidas**: `/blog/como-fazer-backup-na-nuvem`, `/blog/wifi-caindo-toda-hora` e `/blog/pc-nao-liga-o-que-fazer` passaram por reescrita, revisão técnica e asset próprio;
- **0 em revisão**: o estoque programático herdado ficou totalmente classificado em consolidação ou owner qualificada.

A fonte executável dessa decisão é `src/lib/blogProgrammaticGovernance.ts`.

## Consolidações

| Alias herdado | Owner canônica |
| --- | --- |
| /blog/tela-azul-windows-como-resolver | /blog/como-resolver-tela-azul-windows |
| /blog/notebook-superaquecendo-solucoes | /blog/notebook-superaquecendo-o-que-fazer |
| /blog/pc-muito-lento-como-acelerar | /blog/computador-lento-causas-solucoes |
| /blog/como-remover-virus-sem-formatar | /blog/como-remover-virus-windows-iniciantes |
| /blog/windows-nao-atualiza-erros | /blog/windows-update-nao-funciona-o-que-verificar |
| /blog/impressora-nao-imprime-solucoes | /problemas/impressora-nao-imprime |
| /blog/ssd-vs-hd-vale-a-pena-upgrade | /blog/quando-trocar-hd-por-ssd |
| /blog/como-aumentar-velocidade-internet | /blog/internet-lenta-provedor-ou-roteador |
| /blog/como-saber-se-pc-tem-virus | /blog/como-saber-se-pc-tem-virus-malware |
| /blog/como-clonar-hd-para-ssd-passo-a-passo | /blog/como-clonar-hd-para-ssd |
| /blog/como-instalar-windows-11-do-zero-2026 | /blog/como-instalar-windows-11-do-zero |
| /blog/como-trocar-pasta-termica | /blog/como-trocar-pasta-termica-notebook |
| /blog/melhores-antivirus-gratuitos-2026 | /blog/como-escolher-um-bom-antivirus |
| /blog/diferenca-windows-10-vs-11 | /decisoes/atualizar-para-windows-11 |
| /blog/como-recuperar-arquivos-apagados | /blog/como-recuperar-arquivos-apagados-windows |

## Intenções promovidas após qualificação

- `/blog/como-fazer-backup-na-nuvem`: conteúdo independente de backup pessoal em nuvem, com distinção sincronização × backup, cópia independente, restauração testada, revisão CISA/NIST e capa vetorial própria.
- `/blog/wifi-caindo-toda-hora`: conteúdo independente de instabilidade Wi-Fi, com isolamento dispositivo × WLAN × roteador/modem × provedor, revisão FCC/Wi-Fi Alliance e capa vetorial própria.
- `/blog/pc-nao-liga-o-que-fazer`: owner independente para desktop sem energia/sem POST, com separação de alimentação, vídeo e boot, revisão técnica e capa vetorial própria.

## Correção estrutural feita nesta rodada

A matriz `REDIRECT_MATRIX` já continha algumas consolidações editoriais, mas `/blog/$slug` é uma rota dinâmica válida. Por isso o `RootNotFound` não era executado para aliases que ainda existiam no mapa programático.

A rota dinâmica do blog agora consulta a matriz no próprio loader e emite redirect HTTP 301 antes de carregar o conteúdo duplicado. Assim, a consolidação deixa de ser apenas documentação/edge e passa a funcionar também no SSR do aplicativo.

## Regra permanente

Qualquer novo item em `blogProgrammaticPosts.tsx` precisa aparecer na governança como `redirect` ou `review`. O teste bloqueante compara os dois inventários e impede artigo programático sem decisão editorial explícita.
