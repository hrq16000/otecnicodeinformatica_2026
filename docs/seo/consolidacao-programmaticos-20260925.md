# Consolidação editorial — estoque programático herdado

Data: 2026-09-25  
Escopo: `src/data/blogProgrammaticPosts.tsx`  
Princípio: não aumentar o índice com conteúdo fraco, duplicado ou datado.

## Resultado do inventário

Os 18 artigos programáticos herdados foram classificados em duas filas:

- **13 consolidações por 301**: a intenção já possui uma URL canônica mais forte, revisada e/ou indexável.
- **5 em revisão**: podem sustentar intenção própria, mas o conteúdo atual não passa o padrão editorial.

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

## Intenções mantidas em revisão

- `/blog/pc-nao-liga-o-que-fazer`: reescrever removendo ponte de fonte com clipe, reset de CMOS como receita genérica e conclusões por tentativa.
- `/blog/wifi-caindo-toda-hora`: reescrever com isolamento dispositivo × LAN × Wi-Fi × provedor, sem números universais de conexões/canais.
- `/blog/como-fazer-backup-na-nuvem`: qualificar com versionamento, restauração testada, cópia independente e fontes primárias.
- `/blog/como-recuperar-arquivos-apagados`: qualificar com prioridade absoluta a não sobrescrever a mídia e critérios de parada.
- `/blog/diferenca-windows-10-vs-11`: atualizar para o contexto pós-fim de suporte do Windows 10 e separar comparação da decisão de upgrade.

## Correção estrutural feita nesta rodada

A matriz `REDIRECT_MATRIX` já continha algumas consolidações editoriais, mas `/blog/$slug` é uma rota dinâmica válida. Por isso o `RootNotFound` não era executado para aliases que ainda existiam no mapa programático.

A rota dinâmica do blog agora consulta a matriz no próprio loader e emite redirect HTTP 301 antes de carregar o conteúdo duplicado. Assim, a consolidação deixa de ser apenas documentação/edge e passa a funcionar também no SSR do aplicativo.

## Regra permanente

Qualquer novo item em `blogProgrammaticPosts.tsx` precisa aparecer na governança como `redirect` ou `review`. O teste bloqueante compara os dois inventários e impede artigo programático sem decisão editorial explícita.
