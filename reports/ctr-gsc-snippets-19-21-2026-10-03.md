# Micro-rodada CTR GSC 19–21 — 2026-10-03

## Base

- `main` no início: `af878845d2bd53277092b46f5807dfcc13d458a5`
- Branch: `seo/ctr-gsc-snippets-19-21-20261003`
- Escopo: somente metadata editorial (title/excerpt) de 3 artigos já indexáveis.
- Fonte efetiva: `src/data/blogSupplementalPosts.tsx`, que sobrepõe a camada base na rota.
- Sem alteração de URL, slug, canonical, robots, política de indexação, sitemap, schema, conteúdo do corpo ou CTA.
- Páginas CTR 1–18 permanecem congeladas até nova janela de dados.

## Evidência GSC real

Search Console: `sc-domain:otecnicodeinformatica.com.br`, tipo `web`, janela **2026-09-03 a 2026-09-30**.  
Dados consolidados até **2026-09-29**.

| # | Página | Impressões | Cliques | Posição média |
|---|---|---:|---:|---:|
| 19 | `/blog/botao-power-nao-funciona-jump-start-placa-mae` | 9 | 0 | 10,67 |
| 20 | `/blog/windows-update-travado-desfazendo-alteracoes` | 7 | 0 | 10,57 |
| 21 | `/blog/como-recuperar-dados-hd-com-defeito` | 5 | 0 | 10,60 |

### Queries por página

- Botão power: 0 linhas; queries suprimidas/indisponíveis.
- Windows Update: 1 linha visível — `desfazendo alterações feitas no computador`, 1 impressão, 0 cliques, posição 18. O restante das impressões não expõe query no recorte.
- Recuperação de HD: 0 linhas; queries suprimidas/indisponíveis.

Nenhuma keyword foi inventada.

## Alterações

### 19. Botão power / PWR_SW

**Antes**
- Title: `Botão power não funciona: como testar o PWR_SW sem condenar fonte ou placa`
- Description: `Como separar botão, cabo e conector frontal de uma falha real de alimentação, identificar o PWR_SW pelo manual e interpretar corretamente o teste de partida pela placa-mãe.`

**Depois**
- Title: `Botão power não liga o PC? Veja como testar o PWR_SW`
- Description: `Se o PC não reage ao botão, veja como diferenciar botão, cabo, header frontal, fonte e placa-mãe e o que o teste no PWR_SW realmente prova.`

### 20. Windows Update / desfazendo alterações

**Antes**
- Title: `Windows Update: "desfazendo alterações feitas no computador" — o que fazer`
- Description: `O Windows tentou instalar uma atualização e voltou atrás? Veja como interpretar a reversão, registrar o erro, usar o solucionador e o Windows RE e evitar desligamentos ou scripts que pioram o quadro.`

**Depois**
- Title: `"Desfazendo alterações feitas no computador": o que fazer`
- Description: `Windows voltou atrás após atualizar? Veja quando esperar, como registrar KB e erro, usar o solucionador e o Windows RE e quando não forçar o desligamento.`

### 21. Recuperação de dados em HD com defeito

**Antes**
- Title: `Recuperar dados de HD com defeito: o que fazer antes de tentar consertar`
- Description: `HD lento, sumindo, com erros de leitura ou ruído? Veja quando parar de usar, quando uma cópia/imagem é prioridade e por que reparar o sistema de arquivos no disco original pode piorar a recuperação.`

**Depois**
- Title: `HD com defeito: como tentar recuperar dados sem piorar a falha`
- Description: `HD lento, sumindo, com erros ou ruído? Veja quando parar de usar, por que não rodar reparos no disco original e quando priorizar imagem de resgate ou laboratório.`

## Guardrails

- Nenhuma promessa de recuperação de dados.
- Nenhuma instrução de abertura de fonte ou medição energizada.
- Nenhuma afirmação de preço, SLA, disponibilidade ou cobertura local.
- Nenhuma página promovida para `index,follow`.
- Nenhum conteúdo do corpo removido ou reduzido.
