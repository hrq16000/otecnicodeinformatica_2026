# Plano — promoção gradual de páginas `noindex` → `index`

Objetivo: continuar convertendo páginas hoje fora do índice em páginas indexáveis,
**sem** criar URLs novas, sem alterar canonicals existentes e sem afrouxar os gates.
Cada promoção só acontece quando a página passa nos critérios de conteúdo próprio.

## Estoque atual de candidatos

| Família | Fora do índice hoje | Observação |
| --- | --- | --- |
| Blog / editorial | ~128 artigos `noindex,follow` | maior estoque; muitos já têm texto próprio |
| Bairros | ~200 (21 âncoras indexáveis) | política de poda em vigor |
| Serviço × bairro | 11 indexáveis; resto `noindex` | precisa de blocos autorais |
| Cidades | 5 `noindex` | operação real não comprovada |

## Regra de promoção (única, aplicável a todas as famílias)

Uma página só sai de `noindex` quando cumprir **todos** os itens:

1. Intenção única declarada e sem colisão (`check:intent-collisions`, `check:problem-intent`).
2. ≥ 700 palavras próprias no corpo, medidas contra o vocabulário do template.
3. Similaridade cruzada abaixo do teto do gate de similaridade local/editorial.
4. Estrutura obrigatória: fundamento → problema → verificação segura → limite → decisão → ferramenta → serviço.
5. Fonte primária citada (Microsoft Learn, CISA, CERT.br, NIST, fabricante).
6. Capa real licenciada, com crédito quando exigido (sem IA).
7. Interlinks bidirecionais (Atlas, sintoma, serviço, cidade) — zero órfã.
8. JSON-LD válido no HTML SSR e URL entrando pelo sitemap curado.

## Etapas

### 1. Inventário de promoção (relatório, sem mudança de índice)
- Novo `scripts/report-promocao-index.mjs`: varre todas as rotas `noindex`,
  aplica os critérios 1–4 de forma automática e classifica em
  **PRONTA** · **QUASE** (falta 1 item) · **LONGE**.
- Saída: `reports/promocao-index.json` + `.md` e artefato público para o painel.
- Comando: `npm run report:promocao-index`.

### 2. Painel em `/admin/seo`
- Novo bloco "Fila de promoção": tabela ordenada por prontidão, com o motivo do bloqueio
  de cada página e a onda sugerida. Leitura apenas — a promoção continua sendo por código.

### 3. Ondas de promoção (lotes pequenos e reversíveis)
- Lote de **até 8 URLs por onda**, priorizando editorial (maior estoque, menor risco de canibalização).
- Cada onda: elevar o teto editorial, marcar as URLs como indexáveis na fonte única
  (`localIndexPolicy.json` / registro editorial), regenerar o sitemap curado incremental
  e disparar IndexNow apenas para as URLs novas.
- Bairros e serviço × bairro entram só depois, e apenas com evidência de demanda no Search Console.

### 4. Gate de promoção
- Novo `scripts/check-promocao-index.mjs` no `verify`: falha se alguma URL marcada como
  indexável não cumprir os critérios 1–8 (fail-closed).
- Mantém tudo que já existe: `check:local-index-policy`, `check:editorial-cannibalization`,
  `check:jsonld-ssr`, `check:curated-meta`.

### 5. Observação pós-publicação
- Após cada onda, registrar o marco no coorte (`report:content-cohort`) e só planejar a
  próxima onda com leitura do Search Console (impressões/cliques das URLs promovidas).

## Fora de escopo
- Criar páginas novas ou mudar slugs/canonicals.
- Promover bairros em massa sem copy exclusiva.
- Prometer indexação: IndexNow e GSC são pedidos, não garantias.

## Riscos
- Promover artigos parecidos entre si canibaliza pilares → mitigado pelo gate de similaridade.
- Onda grande demais dilui a autoridade e atrasa o rastreamento → teto de 8 URLs por onda.
