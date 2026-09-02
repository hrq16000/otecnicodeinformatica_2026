# Medição de indexação real — Google Search Console + Bing Webmaster

## O que este processo mede (e o que não mede)

Não é possível garantir "100% de indexação". A decisão de indexar é do Google e
do Bing e muda com o tempo. O que este projeto garante e mede é:

1. **Cobertura técnica válida (controlável)** — sitemap curado, canonical
   absoluto, robots, schema e SSR, validados pelos gates de build.
2. **Estado observado de indexação (leitura)** — `URL Inspection` do Search
   Console devolve o estado da versão indexada de cada URL. É leitura: não
   solicita indexação nem rastreio.
3. **Desempenho observado** — impressões, cliques, CTR e posição média por URL,
   por segmento e por consulta, em janelas de 28 dias comparáveis.
4. **Crescimento comprovado** — série temporal em `reports/indexacao-historico.json`.

## Fontes

| Fonte | Credencial | Métricas |
| --- | --- | --- |
| Google Search Console | `LOVABLE_API_KEY` + `GOOGLE_SEARCH_CONSOLE_API_KEY` (conector) | impressões, cliques, CTR, posição, consultas por página, cobertura por URL |
| Bing Webmaster Tools | `BING_WEBMASTER_API_KEY` (+ opcional `BING_SITE_URL`) | cliques/impressões do site e por página, consultas, estatísticas de rastreio |

Fail-closed: sem credencial, o campo vira `UNKNOWN` e `disponivel: false`.
Ausência de dado **nunca** é convertida em zero.

## Comandos

```sh
npm run report:indexacao-ledger              # coleta e gera o ledger
npm run report:indexacao-ledger:inspecionar  # + inspeciona 40 URLs (quota GSC)
npm run report:indexacao-ledger:alert        # sai 1 em regressão/cobertura ruim
```

Saídas:

- `public/indexacao-ledger.json` — consumido por `/admin/seo`.
- `reports/indexacao-ledger.md` — relatório legível da rodada.
- `reports/indexacao-historico.json` — série diária (idempotente por dia).
- `reports/indexacao-inspecao.json` — cache de URL Inspection (TTL 7 dias).

A URL Inspection tem cota diária baixa; por isso a inspeção é incremental
(`--inspecionar=N`) e cacheada. `percentualIndexadoEntreInspecionadas` só
considera URLs realmente lidas — nunca extrapola para o portal inteiro.

## Painel

`/admin/seo` mostra, abaixo do ledger de sitemap:

- KPIs de cobertura curada, indexadas/inspecionadas, impressões e cliques com
  variação contra a janela anterior;
- tabela por segmento (artigo, cidade, serviço, problema, bairro, biblioteca…)
  com consultas principais;
- tabela por URL com cobertura, impressões, cliques, delta, posição, Bing e
  consulta principal;
- alertas por nível: `config` (credencial ausente), `regressao` (queda de
  impressões), `atencao` (URL curada sem impressão em 28 dias) e `cobertura`
  (descoberta/rastreada mas não indexada).

## Limitações declaradas

- Search Console tem atraso de 2 a 3 dias; a janela padrão termina em D-3.
- Consultas de baixo volume são omitidas pelo Google por privacidade — "sem
  dados" não significa zero.
- `index:inspect` não solicita indexação nem faz teste ao vivo.
- Bing só entra no ledger com chave de API válida; sem ela o painel exibe
  `UNKNOWN`, e não zero.
