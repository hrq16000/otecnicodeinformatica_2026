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
- parser da FAQ confirmado com 5 perguntas visíveis e 5 entradas estruturadas;
- inventário: 865 testes Vitest e 1.156 testes Playwright coletados sem mistura de runners;
- testes: 865/865 aprovados;
- `npm run verify`: 37/37 passos aprovados;
- `npm run build`: aprovado com 247 URLs no sitemap curado;
- `npm run deploy:check`: 37/37 passos aprovados com o servidor SSR iniciado pelo próprio comando;
- SSR: 328 páginas renderizadas;
- JSON-LD: 247 HTMLs, 1.666 blocos válidos e zero erro;
- paridade: 1.523 perguntas em 270 `FAQPage`, sem divergência;
- nenhuma URL, slug ou canonical alterado.

## Correções do pipeline — 20/09/2026

- CI alinhado ao requisito real das dependências: Node.js 22.12;
- `@testing-library/dom` declarado diretamente e lockfiles npm/Bun sincronizados, eliminando a falha de instalação limpa;
- workflows que executam scripts Bun agora instalam a versão 1.4.2 explicitamente;
- domínio e flag de indexação definidos de forma explícita nos builds de PR;
- inventário E2E deixou de acessar `dist/` durante a simples coleta;
- relatório de intenção em `/problemas` passou a ser gerado antes do gate que o consome;
- o gate editorial agora exige HTML apenas para artigos aprovados e delega imagem/interlinks aos gates especializados; CTA continua opcional em conteúdo informativo;
- `deploy:check` passou a iniciar e encerrar automaticamente o servidor SSR necessário aos snapshots.
- o Lighthouse passou a usar o mesmo servidor SSR supervisionado dos demais gates, evitando HTTP 500 do `vite preview`;
- a coorte do Lighthouse passou a usar a rota canônica `/servicos/upgrade-ssd-ram`, substituindo o slug inexistente `/servicos/upgrade-ssd` que respondia 404;
- a medição de desempenho passou a executar o Worker Cloudflare compilado e os assets de `dist/client`; o servidor `vite dev` deixou de contaminar TBT e score com módulos e transformações de desenvolvimento;
- o teste de acessibilidade do sumário passou a localizar o `role=status` específico, sem conflito com a região `aria-live` das notificações;
- `/assistencia-tecnica-curitiba` voltou a respeitar a política central: `noindex, follow` e exclusão do sitemap, sem alterar a URL ou o canonical;
- os gates locais agora recebem domínio, flag de indexação e atualização forçada dos snapshots SSR de forma explícita.

## Estado dos gates remotos

- build local aprovado após as correções, com 246 URLs curadas;
- política local de robots/canonical/sitemap aprovada com 32 rotas;
- o gate de similaridade de introduções locais revelou passivo anterior em páginas de bairros e permanece bloqueante;
- a auditoria de dependências mantém vulnerabilidades altas herdadas;
- o Gitleaks continua bloqueado por configuração/licença da organização.

Por esses bloqueios, o PR permanece aberto e não deve ser mesclado nem apresentado como publicado.
