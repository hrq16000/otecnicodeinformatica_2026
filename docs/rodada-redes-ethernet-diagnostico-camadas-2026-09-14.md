# Rodada editorial — Redes: diagnóstico Ethernet por camadas

Data da revisão: 2026-09-14  
Issue: #28  
Rota preservada: `/blog/computador-nao-conecta-na-internet-por-cabo`

## Objetivo

Aprofundar um guia aprovado do pilar Redes sem criar URL nova, separando ausência de enlace, falha de DHCP/endereço, gateway, DNS e acesso externo. A utilidade diagnóstica precede a conversão comercial.

## Arquivos editoriais analisados e alterados

- `src/data/blogPostsContent.tsx`
- `src/components/BlogPostFAQ.tsx`
- `src/lib/blogEditorialRegistry.ts`
- `src/lib/blogEditorialSources.ts`

## Inconsistências encontradas

- A luz da porta era apresentada como prova definitiva da camada com defeito.
- Wi-Fi funcional era tratado como descarte absoluto do provedor.
- Enlace, DHCP, gateway, DNS e navegação estavam concentrados numa etapa genérica.
- O artigo não ensinava a registrar a configuração antes de alterá-la.
- A FAQ repetia a conclusão absoluta sobre Wi-Fi e provedor.
- Não havia fontes técnicas visíveis no guia.

## Correções realizadas

- Diagnóstico reorganizado em cinco camadas, da observação física à saída externa.
- Incluídos testes cruzados de cabo, porta, computador, dock e adaptador.
- Adicionados `ipconfig /all`, `ping` ao gateway informado pelo próprio sistema e `nslookup example.com` como verificações de observação.
- Resultados passaram a ser descritos como evidências combinadas, sem conclusão por comando isolado.
- Incluída interpretação cautelosa de endereço automático `169.254.x.x` sem configuração manual por palpite.
- Redefinição de Rede, remoção de driver e comandos modificadores foram posicionados depois da coleta de evidências, com alerta para VPNs, adaptadores virtuais e redes empresariais.
- FAQ técnica atualizada em paridade com o conteúdo visível.
- Quatro fontes Microsoft consultadas foram registradas e exibidas.
- Datas de revisão editorial e fact-check atualizadas para 2026-09-14.

## Fontes consultadas

- Microsoft Support — Fix Ethernet connection problems in Windows: <https://support.microsoft.com/en-us/windows/experience/connectivity-networking/fix-ethernet-connection-problems-in-windows>
- Microsoft Learn — ipconfig: <https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig>
- Microsoft Learn — ping: <https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ping>
- Microsoft Learn — nslookup: <https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/nslookup>

## Preservações e limites

- Slug, rota e canonical não foram alterados.
- Nenhuma cidade, bairro, serviço ou página adicional foi criada.
- Preços, WhatsApp, funil e promessas comerciais não foram modificados.
- A chamada comercial permanece somente após diagnóstico, limites e referências.
- O artigo não ensina IP, gateway ou DNS arbitrários e não recomenda sequências destrutivas de redefinição.

## Validações executadas

| Validação | Resultado |
|---|---|
| `npm run build` | Aprovado; cliente e servidor gerados, com `dist/server/index.mjs` |
| `npm run verify` | Aprovado: 36/36 gates |
| `npm test` dentro de `verify` | Aprovado: 47 arquivos e 863 testes |
| `node scripts/prerender-blog.mjs` | Aprovado: 78 artigos e a página inicial, total de 79 HTMLs |
| `node scripts/validate-jsonld-static.mjs dist/client` | Aprovado: 79/79 HTMLs, 631 blocos JSON-LD, zero erro |
| inspeção do HTML-alvo | Aprovado: um `FAQPage`, cinco `Question`, quatro fontes visíveis e canonical preservado |
| `git diff --check` | Aprovado |
| `npm run deploy:check` | Bloqueado por regressão operacional herdada: não havia preview em `localhost:8080`; o snapshot gravou zero HTML e o gate GEO interpretou `dist/client` como prefixo de rota |

Na primeira execução de `verify`, um teste remoto de privilégios excedeu 20 segundos; a repetição isolada aprovou 3/3 testes. Após gerar o inventário ausente com `npm run report:problem-intent`, a execução integral aprovou 36/36 gates e 863/863 testes.

## Riscos pendentes

- O pipeline `deploy:check` depende de um servidor de preview e ainda não o inicia de forma autônoma neste ambiente.
- O build atual gera `dist/server/index.mjs`; rotinas antigas que esperam outro entrypoint precisam ser alinhadas em rodada operacional separada.
- Build aprovado e merge no GitHub não comprovam atualização do domínio público; o conteúdo exclusivo desta rodada deve ser verificado após o deploy do ambiente conectado.
