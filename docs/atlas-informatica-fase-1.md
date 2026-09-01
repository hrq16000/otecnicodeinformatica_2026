# Atlas de Informática — Fase 1 (2026-09-01)

## O que foi feito

Rota canônica preservada: o hub vive em `/guia-tecnico-informatica` (nenhuma URL
criada, renomeada ou removida). A página foi transformada no **Atlas de
Informática**, mantendo todo o conteúdo anterior (famílias de falha, checklist,
upgrades, dados, rede, empresas, diagnóstico e FAQ) e adicionando:

1. **Trilhas por tema** (`src/lib/atlasInformatica.ts` + `AtlasTrilhas.tsx`):
   nove temas — fundamentos, Windows e inicialização, hardware e upgrades,
   redes/Wi-Fi, segurança e privacidade, dados e backup, manutenção preventiva,
   informática para empresas, decisões de compra/reparo. Cada trilha segue a
   ordem fixa *aprender → identificar → verificar → parar → resolver* e liga
   apenas conteúdo existente: guias aprovados no registro editorial
   (fail-closed em dobro via `isEditorialApproved`), páginas de sintoma
   (`/problemas/*`) e serviços canônicos.
2. **Guias de decisão**: seis perguntas com critério explícito (formatar ou
   reparar, SSD ou RAM, consertar ou substituir, remoto ou presencial, HD com
   ruído, backup antes da manutenção), todas apontando para conteúdo existente
   — nenhuma URL nova foi criada porque os donos de intenção já existiam.
3. **"Como este portal produz conteúdo técnico"**
   (`ComoProduzimosConteudo.tsx`): autoria institucional, revisão com data
   material (2026-09-01), fontes primárias (Microsoft, CISA, CERT.br,
   fabricantes), três níveis de risco e aviso de segurança (nunca desativar
   permanentemente Secure Boot/antivírus; risco sinalizado em comandos e
   procedimentos físicos). Versão completa no Atlas; compacta em `/problemas`;
   o hub `/blog` já tinha política editorial própria e ganhou o vínculo com o
   Atlas e a menção explícita a fontes primárias e data de revisão.
4. **Conexões editoriais**: Atlas ↔ artigos aprovados do blog; artigos ↔
   páginas de problemas; problemas ↔ serviços canônicos; tema empresarial ↔
   `/empresas` e `/empresa-de-ti-curitiba`; decisões ↔ `/quando-nao-compensa`
   e `/precos-e-politicas`. `/blog` e `/problemas` linkam de volta ao Atlas.
5. **JSON-LD**: o slot `web-page` do hub agora emite `CollectionPage` (mesma
   `@id`, prioridade de página — sem entidade duplicada) com `ItemList` dos
   nove temas ancorados. `FAQPage` e `BreadcrumbList` preservados;
   `LocalBusiness` continua sendo referência ao nó institucional. Nenhum
   `aggregateRating` fabricado.
6. **SEO**: título/descrição/H1 novos, espelhados em
   `scripts/curated-routes-meta.mjs` (shell estático em paridade);
   `lastmod` de `/guia-tecnico-informatica` e `/problemas` atualizado por
   mudança material; sitemap/robots inalterados (nenhuma URL nova).

## Gates e testes criados

- `scripts/check-atlas-hub.mjs` (`npm run check:atlas-hub`, semanal no CI em
  `seo-weekly.yml`): HTML SSR sem depender de JS (H1 + 9 temas + âncoras),
  todos os links do módulo renderizados e existentes no universo de rotas
  TanStack (zero órfãos), `CollectionPage`/`ItemList` coerentes com o HTML,
  `FAQPage` presente, `AggregateRating` proibido. Fail-closed sem dist.
- `src/__tests__/atlas-informatica.test.ts`: 9 temas únicos, trilhas na ordem
  canônica, artigos 100% aprovados (rascunho bloqueado), links validados
  contra `readRouteUniverse`, guias de decisão com critério e destino reais.

## Limitações e registro honesto

- **Indexação não é afirmada**: a meta é cobertura técnica e descoberta máxima
  (sitemap, canonical, malha interna, SSR). A decisão final de indexação
  pertence aos buscadores — acompanhamento contínuo via GSC
  (`monitor:indexing`) e relatórios semanais.
- Conteúdo local × nacional: o Atlas é informacional e não disputa intenção
  transacional local (pilar → `editorialClusters.ts`); gates anti-canibalização
  existentes continuam valendo.
- Fase 2 (fila futura): aprofundar vereditos técnicos por tema, expandir a
  trilha "parar" com mais casos de parada obrigatória e avaliar novos guias de
  decisão somente quando houver intenção distinta comprovada.
