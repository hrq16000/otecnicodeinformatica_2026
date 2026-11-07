# Diagnóstico editorial sem rede — 07/11/2026

Issue #397 / PR #398. Objetivo: retomar validação dos cinco guias sem repetir o acesso externo bloqueado na rodada anterior.

## Inspeção

O setup Vitest compartilhado permite instanciar um cliente Supabase: fornece um stub WebSocket, mas não bloqueia fetch. O cliente real configura persistência e renovação de sessão e adiciona a chave pública às requisições. Isso é uma capacidade observada no código, não prova de qual chamada motivou o bloqueio anterior; o host e os dados efetivamente trocados não foram verificados. Não foi feita nova tentativa da suíte global.

Os cinco testes editoriais só verificam conteúdo estático, fontes, aprovação e FAQPage via renderToStaticMarkup. Seus mocks de roteamento e de slots de JSON-LD dispensam o backend. É possível executar esse subconjunto com uma política mais restritiva, sem dar acesso ao host nem fingir resposta bem-sucedida do Supabase.

## Implementação

- vitest.editorial.config.ts: cinco arquivos explícitos; envDir:false para não carregar arquivos .env; configuração independente dos projetos globais.
- Alias do cliente Supabase para módulo que lança EDITORIAL_BACKEND_IMPORT_FORBIDDEN antes de criar cliente.
- Setup que rejeita fetch, WebSocket, HTTP/HTTPS e conexão de socket/TLS. Qualquer tentativa contabilizada também reprova no afterAll, mesmo quando o código captura a exceção.
- Comando test:editorial:offline e workflow complementar, sem secrets e com contents:read.
- Fixture negativa fora da coleta normal: confirma a interdição da rede e do cliente. Não altera código de produção ou requisitos de aprovação.

## Resultados locais

- Cinco arquivos, 19/19 testes editoriais aprovados.
- Probe negativo: dois testes de proteção executados; saída 1 esperada, com EDITORIAL_NETWORK_ATTEMPTS=1. O fetch foi interceptado antes de envio; o import do backend lançou o erro dedicado.
- Leitor editorial Node: 7/7 aprovado.
- git diff --check aprovado.

O workflow remoto foi configurado, mas seu resultado não é presumido a partir da execução local. Não se afirma execução de todos os 904 testes, verify, build completo ou deploy:check nesta rodada. O bloqueio global anterior não foi contornado, removido ou declarado resolvido; esta é uma verificação complementar estritamente local, com escopo menor e documentado.

## Correção de interpretação

A mensagem UNKNOWN_ROUTES_DIR_MISSING, vista isoladamente no log anterior, não basta para diagnosticar falha real da árvore de rotas: scripts/__tests__/gates-negativos.test.mjs contém um cenário que exige exatamente essa mensagem ao omitir src/routes do fixture. Sem o resultado final da suíte bloqueada, não se atribui a ela a causa do bloqueio.

## Limites e próximo passo

Mantidos conteúdo, URLs, preços, schemas, status de indexação e PRs #384/#400. Sem merge, deploy ou promoção de Windows 11. O lote já teve SSR/DOM validado em 06/11; esta rodada recupera evidência unitária de conteúdo sem backend. Publicação continua dependente da integração e dos gates globais autorizados.
