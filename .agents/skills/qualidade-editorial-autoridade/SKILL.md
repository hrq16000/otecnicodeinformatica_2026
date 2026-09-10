---
name: qualidade-editorial-autoridade
description: Padrão de trabalho para enriquecer o conteúdo do portal de informática, publicar ondas editoriais com governança fail-closed e validar saúde de SEO, dados estruturados e malha interna após cada publicação.
---

# Qualidade editorial e autoridade semântica

Use esta skill em qualquer rodada de conteúdo, SEO técnico ou publicação do
portal. Ela descreve o que deve ser verdadeiro ao final da rodada, não a
ordem exata dos arquivos.

## Princípio

Toda ação deve aumentar a qualidade verificável do conteúdo: profundidade
própria, fonte primária citada, intenção única por URL e malha interna real.
Volume sem densidade reduz autoridade — é regressão, não progresso.

## Regras inegociáveis

1. **Fail-closed**: sem registro editorial explícito, o conteúdo é rascunho —
   noindex, fora do sitemap e fora da listagem pública.
2. **Uma URL, uma intenção**: informacional, diagnóstica, comercial e comercial
   local nunca compartilham página. Nunca criar variação por cidade/bairro sem
   demanda comprovada no Search Console.
3. **Nada inventado**: proibido avaliação, estrela, `aggregateRating`,
   depoimento, número de clientes, percentual de sucesso ou certificação sem
   evidência verificável no ledger de afirmações.
4. **Imagem real licenciada**: nenhuma imagem gerada por IA; crédito registrado
   quando a licença exigir.
5. **Preço, prazo e garantia** vêm exclusivamente da configuração comercial —
   nunca redigitados em página, PDF ou schema.
6. **URLs existentes não são removidas nem renomeadas** sem aprovação explícita.

## Estrutura obrigatória de página informativa

fundamento → problema → verificação segura → limite → decisão → ferramenta →
serviço (bloco de serviço é o último e é opcional).

## Publicação de uma onda

1. Registrar cada artigo nas fontes únicas: registro editorial, fontes/
   fact-check, capas, mapa de intenção, pontes do Atlas, FAQ própria e índice
   do hub.
2. Elevar o teto de artigos indexáveis somente junto do conteúdo aprovado.
3. Gerar o HTML e conferir que o artigo é servido com JSON-LD completo.
4. Sitemap: geração a partir do manifesto curado, com rastreamento
   **incremental por onda** — apenas URLs novas entram no ledger incremental e
   são enviadas ao IndexNow.

## Validação (bloqueante, nesta ordem)

```sh
npm run verify
npm run build
npm run deploy:check
npm run healthcheck:publicacao
```

`healthcheck:publicacao` encadeia:

- `seo:inventory` — lê o HTML realmente servido;
- `report:seo-healthcheck` — URLs quebradas, canônicos divergentes, erros de
  schema e páginas órfãs (`--base=` verifica por HTTP após publicar);
- `report:interlinks-sugestoes` — pares do mesmo cluster ainda sem ligação;
- `check:structured-data` — exige artigo (BlogPosting/Article/TechArticle)
  **e** FAQPage no HTML servido de cada URL editorial.

Resultados aparecem em `/admin/seo`. Conversões de WhatsApp e ligações são
acompanhadas em `/admin/conversao`.

## Critérios para marcar como indexável

Intenção única declarada · conteúdo próprio verificável na estrutura acima ·
fontes primárias citadas · autoria coerente · capa real licenciada ·
interlinks bidirecionais sem órfãs · JSON-LD válido no HTML servido · entrada
pelo sitemap curado · os quatro comandos acima em verde.
