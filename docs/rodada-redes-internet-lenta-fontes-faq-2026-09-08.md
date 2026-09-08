# Rodada editorial — Redes: internet lenta, provedor ou roteador

Data da revisão: 2026-09-08

## Objetivo

Aprofundar o guia `/blog/internet-lenta-provedor-ou-roteador` com um protocolo reproduzível de medição, critérios que separam falha do provedor, limitação do enlace e problema de Wi-Fi, além de referências primárias e dados estruturados em paridade com o conteúdo visível.

## Alterações realizadas

- Incluído um preparo de teste em cinco etapas: cabo, pausa de tráfego concorrente, velocidade negociada do enlace, repetição em horários distintos e registro das condições.
- Separadas três medições: cabo, Wi-Fi próximo ao roteador e Wi-Fi no local do problema.
- Explicados download, upload, latência, jitter e perda de pacotes sem reduzir o diagnóstico ao maior número exibido no teste.
- Refinada a tabela de decisão para evitar atribuir automaticamente toda lentidão ao provedor.
- Substituídas cinco respostas genéricas por FAQs técnicas sobre enlace de 100 Mbps, ping, Wi-Fi e abertura de chamado.
- Exibidas no artigo as fontes técnicas consultadas.
- Atualizados o registro editorial e a data de checagem factual.
- Sincronizada a allowlist estrita do gate editorial com os domínios primários FCC e NVM Express já usados pelo manifesto de fontes.

## Fontes primárias

- Federal Communications Commission — Home Network Tips: https://www.fcc.gov/home-network-tips
- Federal Communications Commission — FCC Mobile Speed Test App FAQ: https://www.fcc.gov/BroadbandData/speed-test-app-faq
- Wi-Fi Alliance — Wi-Fi Alliance connects and expands home Wi-Fi: https://www.wi-fi.org/news-events/newsroom/wi-fi-alliance-connects-and-expands-home-wi-fi

## Arquivos alterados

- `src/data/blogPostsContent.tsx`
- `src/components/BlogPostFAQ.tsx`
- `src/lib/blogEditorialSources.ts`
- `src/lib/blogEditorialRegistry.ts`
- `scripts/check-editorial-technical-review.mjs`

## Validação

- `npm run check:editorial-technical-review`: aprovado.
- `npm run build`: aprovado; 247 URLs no inventário pós-build.
- `npm run verify`: 35/35 passos aprovados; 860/860 testes aprovados.
- `npm run ssr:with-server -- npm run deploy:check`: 37/37 passos aprovados.
- SSR: 247 HTMLs indexáveis com JSON-LD.
- JSON-LD: 1.666 blocos válidos; zero erro.
- FAQ: 1.519 perguntas em 270 `FAQPage`, com paridade 1:1.
- Links internos: nenhum link quebrado e nenhuma nova página órfã.
- `git diff --check`: aprovado.

Um primeiro rerun de `verify` teve timeout isolado na integração remota `admin_link_os_lead`; a repetição completa passou com 860/860 testes. O aviso não estava relacionado ao conteúdo revisado.

## Integridade editorial e técnica

- URL, slug e canonical foram preservados.
- Nenhuma página local ou comercial foi criada.
- O conteúdo útil e os limites do diagnóstico aparecem antes da oferta de serviço.
- O `FAQPage` permanece equivalente às perguntas e respostas visíveis.
- Não foram adicionados preços, avaliações, credenciais ou promessas de resultado.

## Publicação

O merge no GitHub e a atualização pública devem ser registrados separadamente. A presença do conteúdo no `main` não comprova, por si só, que o ambiente conectado executou o deploy.
