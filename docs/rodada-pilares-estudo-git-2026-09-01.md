# Rodada via Git — pilares de estudo do Atlas

**Data:** 2026-09-01  
**Escopo:** navegação editorial do Atlas de Informática  
**Status:** pronto para validação do pipeline

## Entrega

O hub `/guia-tecnico-informatica` recebeu a seção **Pilares de estudo: por onde continuar**, com cinco percursos curtos:

- Windows e inicialização;
- Segurança e dados;
- Hardware e desempenho;
- Redes e Wi-Fi;
- Produtividade e rotina.

Cada percurso começa por um fundamento, passa por um sintoma ou contexto e termina em uma verificação, ferramenta ou decisão já existente. Nenhuma rota nova foi criada e nenhum CTA comercial foi inserido no meio do conteúdo.

## Governança

- Links apontam para páginas existentes do Atlas, blog, problemas e ferramentas.
- O texto deixa explícita a ordem fundamento → sintoma → verificação/decisão.
- A seção foi adicionada ao sumário da página para descoberta acessível.
- JSON-LD existente do Atlas permanece como `CollectionPage` dos temas canônicos; a seção é uma camada de navegação, não uma nova entidade indexável.

## Validações executadas

- `node scripts/check-route-tree.mjs` — OK.
- `node scripts/check-national-authority-map.mjs` — OK.
- `git diff --check` — OK.

O build completo não foi executado localmente porque o clone não possui `node_modules` e o ambiente não disponibilizou `bun`. O pipeline deve executar a validação TypeScript, build SSR e gates de links/SEO antes do deploy.
