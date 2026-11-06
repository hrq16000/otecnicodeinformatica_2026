# Validação do lote editorial — 06/11/2026

Issue #397 / PR #398. Nenhuma URL nova ou alteração comercial. PRs #384 e #400 preservados.

## Resultado

Adicionado check:editorial-batch-ssr: valida o bundle real dist/server/index.mjs, com dois processos frios por guia, captura HTML e comparação com DOM Chromium após JavaScript. Assets vêm apenas de dist/client; requisições externas do navegador são bloqueadas. O browser usa interceptação local do HTML do worker no endereço canônico, não o domínio público. Portanto isto comprova o bundle local, não deploy nem indexação.

Os cinco guias retornam 200; canonical único e correto, título, descrição, H1 e indexabilidade são conferidos antes e depois do JavaScript. Os quatro aprovados emitem Article, BreadcrumbList e FAQPage com cinco perguntas/respostas iguais ao conteúdo da seção visível. Datas originais conferidas. Windows 11 permanece noindex, com cinco FAQs visíveis e sem Article/FAQPage, preservando a política fail-closed.

Capturas e sumário reproduzíveis ficam em reports/editorial-batch-ssr (ignorado pelo Git). O helper existente render-jsonld-once.mjs ganhou somente captura HTML opcional e exposição do cabeçalho X-Robots-Tag no resultado; seu fingerprint e contrato anterior foram preservados. Cabeçalho X-Robots-Tag não foi retornado pelo worker nas cinco amostras; as diretivas meta continuam verificadas separadamente.

## Falha demonstrada e correção

Antes da mudança, /blog/editorial-inexistente-auditoria-20261106 retornava HTTP 200. O loader do blog retornava post:null, embora o corpo fosse de página ausente. Foi substituído por throw notFound(), sinal nativo do TanStack. Após recompilar, retorna HTTP 404 e não emite Article. O gate exige isso; não foi reduzido para aceitar 200.

O preview genérico continua configurado como vite preview; não se criou um alias server.js nem se alterou o preset Cloudflare. O novo diagnóstico usa o handler do build já utilizado pelo prerender existente. Isso não dispensa a correção/integração do preview e dos pipelines globais.

## Comparação SEO e revisão

Aplicada a skill lovable-seo-check, inclusive seu comparador Python sobre as capturas raw/rendered. Título, descrição, canonical, robots e H1 sem divergência. O comparador sinalizou somente dois links adicionados pelo aviso de privacidade: /politica-de-cookies-e-anuncios e /politica-de-privacidade#telemetria-funil; nenhum link foi removido na amostra MFA inspecionada. No Windows 11, os alertas de noindex são esperados, não erro a contornar.

Não houve mudança visual de layout. A alteração React é restrita ao sinal de ausência no loader, sem novos efeitos, dependências ou consultas. O uso de notFound já existe em outras rotas deste projeto.

## Validações e limites

- Build direto Vite cliente/SSR: aprovado após a correção.
- Gate do lote: cinco guias, dez renders frios e cinco DOMs Chromium aprovados, mais rota ausente 404.
- Diff sem erros de whitespace.
- Verify global foi iniciado, mas a revisão automática de segurança bloqueou sua continuidade por possível contato com host Supabase não verificado. O log também registrou UNKNOWN_ROUTES_DIR_MISSING durante os testes; não foi declarado resultado global aprovado.
- A execução unitária desta rodada também ficou bloqueada pela revisão automática por acesso externo não verificado. Não se reutilizam os 904 testes da rodada anterior como se fossem novos resultados.
- Não houve tentativa de contornar o bloqueio, usar outra credencial ou liberar o host. A retomada desses testes requer acesso autorizado e finalidade/dados trocados estabelecidos.
- Não declarados build completo com pre/postbuild, deploy:check, E2E geral ou a11y global aprovados.

Sem merge, deploy ou promoção de Windows 11. O próximo passo é integração do lote na base técnica validada e liberação autorizada da verificação global; não abrir mais URLs para mascarar essa pendência.
