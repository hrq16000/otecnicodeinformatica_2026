# Rodada editorial — Produtividade: teste de restauração de backup

Data da revisão: 2026-09-09

## Objetivo

Aprofundar o guia `/blog/como-testar-restauracao-de-backup` para transformar a existência de uma cópia em evidência operacional de recuperação, com escopo, amostragem, critérios de aprovação, tempo registrado, fontes primárias e FAQ técnica.

## Alterações realizadas

- Removida a periodicidade universal mensal/trimestral; a cadência agora acompanha impacto, mudança dos dados e tolerância à parada.
- Incluídos escopo, ponto de recuperação, tempo de recuperação e critério de aprovação em linguagem prática.
- Adicionados três níveis de teste: amostra de arquivos, pasta/conjunto de trabalho e recuperação ampla em ambiente isolado.
- A amostragem agora cobre pastas, datas, tamanhos e formatos distintos.
- Incluído registro de responsável, origem, versão, destino, duração, resultado e exceções.
- Adicionados gatilhos de repetição após troca de ferramenta, destino, credencial, retenção ou estrutura de pastas.
- A regra de múltiplas cópias passou a ser tratada como referência que não substitui retenção, controle de acesso e teste.
- Incluídas cinco FAQs técnicas no lugar da FAQ comercial genérica.
- Fontes primárias passaram a ser exibidas no artigo antes da oferta de serviço.

## Fontes primárias

- CISA — Back Up Business Data: https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/back-up-business-data
- NIST — SP 800-34 Rev. 1: https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final
- CISA — StopRansomware Guide: https://www.cisa.gov/stopransomware/ransomware-guide

## Arquivos alterados

- `src/data/blogPostsContent.tsx`
- `src/components/BlogPostFAQ.tsx`
- `src/lib/blogEditorialSources.ts`
- `src/lib/blogEditorialRegistry.ts`

## Validação

- `npm run check:editorial-technical-review`: aprovado.
- `npm run build`: aprovado.
- `npm run verify`: 35/35 passos aprovados; 860/860 testes aprovados.
- `npm run ssr:with-server -- npm run deploy:check`: 37/37 passos aprovados.
- SSR/JSON-LD: 247 HTMLs indexáveis e 1.666 blocos válidos; zero erro.
- FAQ: 1.520 perguntas em 270 `FAQPage`, com paridade 1:1.
- Links internos: nenhum link quebrado e nenhuma nova página órfã.
- `git diff --check`: aprovado.

## Integridade editorial e técnica

- URL, slug e canonical preservados.
- Nenhuma página local ou comercial criada.
- Nenhum preço, avaliação, credencial ou promessa de recuperação adicionado.
- A orientação útil, os limites e as fontes aparecem antes da conversão.
- O `FAQPage` corresponde às cinco perguntas e respostas visíveis do artigo.

## Publicação

O merge no GitHub e a atualização do domínio devem ser comprovados separadamente. Código no `main` não comprova que o ambiente conectado concluiu o deploy.
