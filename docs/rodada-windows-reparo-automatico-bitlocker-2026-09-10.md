# Rodada Windows — Reparo Automático, Windows RE e BitLocker

Data da revisão: 2026-09-10  
Issue: #21  
URL preservada: `/blog/windows-reparo-automatico-em-loop`

## Objetivo

Aprofundar o guia de laço do Reparo Automático com uma sequência segura de decisão, priorizando dados e diagnóstico antes de comandos de boot, redefinição ou reinstalação.

## Alterações editoriais

- A tela de Reparo Automático passou a ser tratada como sintoma, não como prova de corrupção do Windows ou falha do SSD.
- Foi adicionada uma matriz que relaciona o evento anterior ao laço, a hipótese inicial e a primeira ação coerente.
- As opções do Windows RE foram organizadas por impacto: Reparo de Inicialização, desinstalação de atualização, Modo de Segurança, Restauração do Sistema e, por último, redefinição ou reinstalação.
- A chave BitLocker e a cópia dos arquivos insubstituíveis passaram a ser pré-condições explícitas.
- `bootrec`, `bcdedit` e `bcdboot` deixaram de aparecer como tentativa genérica: o texto exige unidade desbloqueada, instalação, firmware e partições identificados.
- Foram acrescentados critérios de parada para sinais de falha física e proibições de formatar a partição EFI, limpar o TPM ou desativar o Secure Boot como tentativa de rotina.
- Cinco perguntas técnicas específicas substituem a FAQ comercial genérica nesta URL.
- As fontes primárias agora ficam visíveis no artigo e alimentam o manifesto editorial.

## Fontes consultadas

- Microsoft Support — Windows recovery environment: `https://support.microsoft.com/en-us/windows/experience/backup-recovery/windows-recovery-environment`
- Microsoft Support — Recovery options in Windows: `https://support.microsoft.com/en-us/windows/experience/backup-recovery/recovery-options-in-windows`
- Microsoft Support — Finding your BitLocker recovery key in Windows: `https://support.microsoft.com/en-us/windows/finding-your-bitlocker-recovery-key-in-windows-6b71ad27-0b89-ea08-f143-056f5ab347d6`
- Microsoft Learn — BCDBoot command-line options: `https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/bcdboot-command-line-options-techref-di`

Todas foram consultadas materialmente. Não houve reprodução extensa de texto externo.

## Arquivos alterados

- `src/data/blogPostsContent.tsx`
- `src/components/BlogPostFAQ.tsx`
- `src/lib/blogEditorialSources.ts`
- `src/lib/blogEditorialRegistry.ts`
- este relatório

## Dados estruturados e indexação

- `FAQPage` presente no HTML SSR, com cinco perguntas visíveis em paridade 1:1.
- `Article` mantém autoria e revisão editorial declaradas.
- Quatro referências editoriais estão visíveis no HTML.
- Slug, rota, canonical e data original de publicação foram preservados.
- Nenhuma URL nova foi criada e nenhuma página foi promovida ou removida do sitemap.

## Validação

| Comando/gate | Resultado |
| --- | --- |
| `npm run check:editorial-technical-review` | aprovado |
| `git diff --check` | aprovado |
| `npm run build` | aprovado |
| `npm run verify` | 35/35 passos, 860 testes, 0 falhas |
| `npm run ssr:with-server -- npm run deploy:check` | 36 passos aprovados; 1 smoke público opcional degradado |
| JSON-LD estático | 247 HTMLs, 1.666 blocos, 0 erros |
| Rich results | 328 HTMLs; 270 `FAQPage`; aprovado |
| Paridade JSON-LD | 1.521 perguntas de FAQ em paridade |
| Links internos e órfãs | nenhum link quebrado e nenhuma nova página órfã |

O smoke público retornou HTTP 502 para o manifesto e as rotas verificadas em 2026-09-10. Essa indisponibilidade externa não afetou build, SSR ou gates estáticos, mas impede declarar a versão pública como atualizada.

## Riscos remanescentes

- O conteúdo só estará público depois que o ambiente conectado concluir o deploy/Publish e responder ao smoke.
- Os comandos avançados continuam deliberadamente sem passo a passo genérico; seu uso depende de identificar corretamente instalação, criptografia, firmware e partições.
- Falha física de armazenamento não é corrigida por ferramentas do Windows RE.
