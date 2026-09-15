# Rodada editorial — Produtividade: Histórico de Arquivos

Data: 2026-09-15  
Issue: #30

## Objetivo

Aprofundar o guia aprovado sobre Histórico de Arquivos, com foco em cobertura verificável, restauração conservadora e limites do recurso antes de qualquer encaminhamento comercial.

## Correções editoriais

- cobertura descrita por bibliotecas padrão e personalizadas;
- inclusão de pasta externa explicada por associação a uma biblioteca;
- multiplicador universal de capacidade removido;
- configuração e reconexão do destino documentadas;
- restauração para local alternativo priorizada antes de substituir o original;
- diferença entre versionamento, sincronização e recuperação integral explicitada;
- unidade automatizada tratada como uma camada, não como única cópia;
- absolutos sobre causas de falha removidos;
- cinco FAQs técnicas adicionadas em paridade com `FAQPage`;
- três fontes oficiais Microsoft registradas e exibidas.

## Preservações

- slug, rota e canonical não foram alterados;
- nenhum conteúdo local, cidade ou serviço foi criado;
- CTA permaneceu apenas no encerramento;
- nenhuma recomendação comercial ou produto foi inserido.

## Validações

- `npm run build`: aprovado;
- `npm run verify`: 36/36 passos aprovados;
- testes: 47 arquivos e 863 testes aprovados;
- links internos: nenhum link quebrado;
- órfãs: nenhuma nova página órfã;
- prerender editorial: 79 HTMLs (hub + 78 artigos);
- JSON-LD estático: 79 HTMLs, 631 blocos, zero erro;
- paridade JSON-LD × conteúdo: aprovada, com 382 perguntas no conjunto;
- artigo-alvo: um `FAQPage`, cinco `Question`, cinco FAQs visíveis e três fontes visíveis;
- canonical do artigo-alvo: preservado;
- `deploy:check`: bloqueado no passo 8/37 por regressão herdada do preview; o plugin procura `dist/server/server.js`, enquanto o build gera `dist/server/index.mjs`;
- relatório estrito de cobertura sobre o subconjunto de 79 HTMLs: não aplicável como gate global, pois acusa rotas não produzidas pelo prerender editorial isolado.

## Resultado

Conteúdo e dados estruturados aprovados. A publicação pública deve ser confirmada separadamente após o merge e o deploy do ambiente conectado.
