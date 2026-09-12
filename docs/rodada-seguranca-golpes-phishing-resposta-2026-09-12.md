# Rodada editorial — Segurança: golpes e phishing

Data: 2026-09-12  
Issue: #24  
Rota preservada: `/blog/como-proteger-computador-golpes-internet`

## Objetivo

Aprofundar o guia para que a resposta seja proporcional ao evento observado, sem tratar uma mensagem suspeita, um clique, a exposição de credenciais, o acesso remoto e uma fraude financeira como situações equivalentes.

## Alterações editoriais

- adicionada matriz entre evento, risco principal e próxima ação;
- diferenciados clique sem interação, credencial informada, software instalado e pagamento realizado;
- preservação de evidências posicionada antes da exclusão de mensagens;
- contenção por desconexão limitada a acesso remoto, instalação desconhecida ou atividade em andamento;
- removidas afirmações absolutas sobre instituições, fabricantes, extensões e eficácia de medidas;
- incluídos critérios claros para interromper o procedimento autônomo;
- mantidos links comerciais apenas depois do conteúdo educativo e das fontes;
- adicionadas cinco perguntas técnicas com `FAQPage` em paridade com o conteúdo visível.

## Fontes visíveis

- Microsoft Support — Protect yourself from phishing;
- Microsoft Support — Protect yourself from tech support scams;
- CERT.br / NIC.br — Cartilha de Segurança para Internet — Golpes.

As fontes sustentam sinais de phishing, confirmação por canal oficial, resposta após exposição de credenciais e cautela com falso suporte. Não foram incluídas estatísticas, rankings, aplicativos de terceiros ou promessas de recuperação.

## Arquivos alterados

- `src/data/blogPostsContent.tsx`;
- `src/components/BlogPostFAQ.tsx`;
- `src/lib/blogEditorialSources.ts`;
- `src/lib/blogEditorialRegistry.ts`;
- este relatório.

## Integridade de publicação

- slug, rota e canonical: preservados;
- página nova: não criada;
- preço, prazo ou garantia: não adicionados;
- CTA educativo/comercial: mantido somente ao final;
- revisão editorial e fact-check: atualizados para 2026-09-12.

## Validação

- `npm run build`: aprovado; cliente e servidor SSR gerados;
- `npm run verify`: 36/36 passos aprovados;
- testes: 47 arquivos e 863 testes aprovados;
- `node scripts/prerender-blog.mjs`: 78 artigos e a página inicial renderizados diretamente pelo handler SSR;
- HTML específico: um `FAQPage`, cinco `Question`, fontes visíveis e canonical preservado;
- `node scripts/validate-jsonld-static.mjs dist/client`: 79 HTMLs, 631 blocos JSON-LD e zero erro;
- `npm run validate:jsonld`: 247 snapshots estáticos anteriores, 1.666 blocos e zero erro; sem snapshot novo pelo servidor HTTP;
- `npm run deploy:check`: bloqueado no passo 8/37 por regressão já presente no preview do `main`: o plugin procura `dist/server/server.js`, mas o build Nitro atual gera `dist/server/index.mjs`. A renderização direta do mesmo handler funcionou e foi validada, porém o gate de publicação não foi declarado como aprovado;
- `git diff --check`: aprovado após a limpeza dos artefatos gerados.

O aviso de configuração do Biome e os 48 avisos de tamanho de metadados já existentes foram mantidos fora do escopo. Nenhuma URL pública foi alterada.
