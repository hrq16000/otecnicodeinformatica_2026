# Micro-rodada CTR GSC 16–18 — 2026-10-03

## Base

- `main` no início: `adff4bc56007e65de5d672d9fe7097fe968d1842`
- Branch: `seo/ctr-gsc-snippets-16-18-20261003`
- Escopo: somente metadata editorial (title/excerpt) de 3 artigos já indexáveis.
- Sem alteração de URL, slug, canonical, robots, política de indexação, sitemap, schema, conteúdo do corpo ou CTA.
- Páginas CTR 1–15 permanecem congeladas até nova janela de dados.

## Evidência GSC real

Consulta: Search Console `sc-domain:otecnicodeinformatica.com.br`, tipo `web`, dimensão `page`.

Janela solicitada: **2026-09-03 a 2026-09-30**.  
Dados consolidados até: **2026-09-29**; 2026-09-30 ainda consta como incompleto.

| # | Página | Impressões | Cliques | Posição média |
|---|---|---:|---:|---:|
| 16 | `/blog/webcam-usb-nao-e-detectada` | 17 | 0 | 9,24 |
| 17 | `/blog/como-testar-fonte-de-alimentacao-pc` | 15 | 0 | 7,27 |
| 18 | `/blog/windows-11-lento-como-resolver` | 15 | 0 | 7,67 |

A consulta por `query` filtrada por cada página retornou 0 linhas para as três URLs. As queries estão suprimidas/indisponíveis neste recorte; nenhuma palavra-chave foi inventada.

## Fonte canônica de metadata

As três entradas possuem exatamente uma definição estrutural no `blogPostsContentBase` em `src/data/blogPostsContent.tsx` e nenhuma definição equivalente em `blogSupplementalPosts` ou `programmaticPosts`. A rota `/blog/$slug` resolve base + suplementares + programáticos e usa `title`/`excerpt` no SSR/meta social.

## Alterações

### 16. Webcam USB não é detectada

**Antes**
- Title: `Webcam USB não é detectada no Windows: diagnóstico por etapas`
- Description: `Como separar conexão USB, hub, enumeração, driver UVC, permissão e defeito físico quando uma webcam externa não aparece no Windows.`

**Depois**
- Title: `Webcam USB não aparece no Windows? Veja o que verificar`
- Description: `Webcam USB não é detectada? Veja como separar porta, hub, enumeração, driver UVC, permissões e defeito físico antes de reinstalar drivers ou trocar a câmera.`

### 17. Teste de fonte

**Antes**
- Title: `Como testar a fonte do PC com segurança: sinais, limites e diagnóstico`
- Description: `Veja o que cada teste de fonte realmente prova, por que tensão em repouso não basta, quando parar e como confirmar a suspeita sem condenar fonte ou placa por tentativa.`

**Depois**
- Title: `Como testar a fonte do PC sem condenar a peça por engano`
- Description: `PC não liga, reinicia ou desliga sob carga? Veja o que testes de fonte realmente provam, quando parar e como separar fonte, cabos e placa-mãe com segurança.`

### 18. Windows 11 lento

**Antes**
- Title: `Windows 11 lento: diagnóstico por recurso antes de otimizar`
- Description: `Windows 11 lento não aponta para uma causa única. Veja como separar inicialização, armazenamento, memória, CPU, temperatura e software antes de decidir por ajuste, upgrade ou reinstalação.`

**Depois**
- Title: `Windows 11 lento? Como descobrir o que está travando o PC`
- Description: `Windows 11 lento ao iniciar, abrir programas ou alternar tarefas? Veja como comparar CPU, memória, disco, temperatura e processos antes de otimizar ou trocar peças.`

## Guardrails

- Não há promessa de resultado, prazo, preço, SLA ou disponibilidade.
- Não há afirmação local, filial ou prestador inventado.
- O artigo de fonte mantém o posicionamento seguro: medições energizadas ficam para bancada; o snippet não incentiva abertura da fonte.
- Nenhuma página nova foi promovida para `index,follow`.
- Nenhum conteúdo existente foi removido ou reduzido.
