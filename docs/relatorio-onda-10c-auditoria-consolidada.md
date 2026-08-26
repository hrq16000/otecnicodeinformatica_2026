# Onda 10C — Auditoria consolidada

**Data:** 2026-08-26  
**Escopo:** consolidação sem criação de novas URLs  
**Branch:** `codex/auditoria-10c-consolidada`

## Veredito

A Onda 10C/Lote 4 está publicada e tecnicamente validada. A consolidação de SEO ainda está **incompleta** porque o Search Console real não foi disponibilizado ao executor e o pacote final de exports ainda não existia. A decisão operacional é **FIX + OBSERVE** antes de publicar a próxima onda.

## Evidências

- 6 URLs novas nos clusters Webcam e Windows Update.
- Cannibalization pré-publicação: aprovado.
- Assets: 22 PASS, 0 FAIL.
- Governance: aprovado; sitemap com 182 URLs.
- Technical review: aprovado.
- No-direct-WA: 0 violações.
- Export-secrets: 7 artefatos sem segredo.
- TypeScript: sem erros.
- E2E do lote: 44/44.
- E2E de infraestrutura: 88/88.
- Auditoria SEO: 109 rotas, 0 erros e 47 avisos.

## O que foi consolidado nesta branch

- Relatório consolidado da Onda 10C.
- Status explícito de indexação do Lote 4.
- Limite de cinco oportunidades P1 para a próxima expansão.
- Separação entre fatos verificados, pendências de GSC e decisões futuras.

## GSC e crawl

As seis URLs do Lote 4 aparecem como publicadas, mas em `NO_DATA`. Isso não significa “não indexado”. Não é permitido declarar `INDEXED` ou `CRAWLED_NOT_INDEXED` sem:

1. crawl posterior à mudança material;
2. canonical correto;
3. index/follow permitido;
4. sitemap atualizado;
5. SSR verificável;
6. persistência do estado por tempo suficiente.

A medição real de crawl, impressões, cliques e canonical do Google requer uma execução autenticada do monitor no ambiente que possui acesso ao Search Console.

## Avisos SEO

Existem 47 avisos de title/meta description. Eles devem ser corrigidos na fonte central de metadados, agrupando rotas e preservando intenção e CTR. Não foi feita alteração automática nesta branch, pois o checkout local não pôde ser baixado por falha de credenciais do Git e alterar somente o artefato gerado seria incorreto.

## Próximas oportunidades P1

As oportunidades estão registradas em `docs/onda-11-oportunidades-p1.csv` e `docs/onda-11-oportunidades-p1.json`. Nenhuma URL foi criada ou publicada.

## Decisão

Não iniciar Lote 5 nesta auditoria. Primeiro executar GSC real, corrigir os avisos de metadata na fonte, gerar exports finais com SHA-256 e revisar canibalização. Só então escolher entre `EXPAND`, `ENRICH`, `FIX` ou `OBSERVE`.
