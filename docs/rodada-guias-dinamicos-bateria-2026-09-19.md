# Rodada: guias dinâmicos e bateria — 19/09/2026

## Objetivo

Corrigir a apresentação e os dados estruturados das páginas `/guias/:slug` e aplicar o padrão editorial ao guia `bateria-do-notebook-dura-pouco`.

## Alterações

- renderização de Markdown por `react-markdown`, sem habilitar HTML bruto;
- suporte visível a títulos, listas numeradas, ênfase, código e links;
- links externos com `noopener noreferrer`;
- `Article` e `BreadcrumbList` no coletor SSR existente;
- `FAQPage` gerado apenas das perguntas e respostas visíveis sob `## Perguntas frequentes`;
- data de atualização visível;
- guia de bateria reescrito com triagem de risco, relatório do Windows, comparação controlada e limites claros;
- fontes primárias Microsoft exibidas no conteúdo;
- CTA mantido somente após diagnóstico, limites, FAQ e fontes.

## Preservado

- slug e canonical;
- estado de publicação e indexabilidade;
- modelo fail-closed das páginas editoriais;
- nenhuma nova cidade, bairro ou página comercial.

## Verificação editorial

- removidos percentuais universais para condenar a bateria;
- removidas relações absolutas entre idade e defeito;
- inchaço tratado como condição de interrupção imediata do uso;
- `powercfg /batteryreport` apresentado como ferramenta de diagnóstico, não reparo;
- paridade entre FAQ visível e `FAQPage` por extração da mesma fonte textual.

## Fontes

- Microsoft Support: Caring for your battery in Windows.
- Microsoft Learn: Powercfg command-line options.

## Validação

- revisão estática do TSX e da migração SQL;
- diff restrito à rota compartilhada, uma migração de conteúdo e este relatório;
- build, testes, SSR e validadores JSON-LD devem ser executados pelo CI do repositório antes do merge.
