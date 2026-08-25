# Rodada 4B — ATP: não liga, sem imagem, lentidão, backup e Windows 10 × 11

Enriquecimento orientado à intenção **sem criar nenhuma URL**. Canonical, robots,
title, description e indexabilidade de todas as páginas permanecem exatamente
como estavam antes da rodada.

## 1. Mapa de owners (um owner por intenção)

| Cluster ATP | Owner (URL existente) | Situação |
| --- | --- | --- |
| A — notebook/PC não liga | `/problemas/notebook-nao-liga` | enriquecido nesta rodada |
| B — liga mas não dá imagem | `/problemas/computador-nao-da-imagem` | enriquecido nesta rodada |
| C — lento / travando | `/problemas/computador-lento` | enriquecido nesta rodada |
| D — backup | `/solucoes/backup` | enriquecido nesta rodada (soma à base da Rodada 1) |
| E — Windows 10 × Windows 11 / decidir versão ao formatar | `/solucoes/formatacao` | enriquecido nesta rodada |
| F — formatar (execução comercial) | `/servicos/formatacao` | **FROZEN** — owner da Rodada 4A, intocado |

Owners congelados da 4A e não tocados: `/problemas/computador-esquentando`,
`/solucoes/ssd`, `/servicos/upgrade-ssd-ram`, `/problemas/hd-fazendo-barulho`,
`/servicos/formatacao`, `/servicos/remocao-de-virus`
(fonte de verdade: `scripts/lib/owners-4b.mjs`).

**Anti-canibalização:** a intenção comercial de formatação continua exclusiva de
`/servicos/formatacao`; `/solucoes/formatacao` cobre a **decisão** (formatar ou
não, qual versão), sem repetir oferta de serviço. Gate `check:content-intent` e
`check:cannibalization` verdes após a mudança.

## 2. O que cada owner recebeu

Todos com conteúdo próprio (nada de template): resposta direta abaixo do H1,
tabela de decisão com coluna de ação, dois blocos técnicos com limites
explícitos e um link contextual em texto corrido por bloco.

- **Não liga** — separação energia × imagem × proteção, ordem correta dos testes
  (do reversível ao invasivo) e o recado de que equipamento morto raramente
  significa dado perdido. Fonte: Microsoft (inicialização avançada).
- **Sem imagem** — teste do cabo desconectado, teste da lanterna, teste cruzado e
  a lista do que não fazer (BIOS às cegas, troca por tentativa).
- **Lento** — quatro famílias de causa (disco, memória, temperatura, software),
  medida objetiva para cada uma e ganho realista de cada intervenção. Deixa
  claro quando formatar **não** resolve. Fonte: Microsoft (desempenho no Windows).
- **Backup** — o que cada tipo de cópia protege, rotina de teste de restauração
  (mensal/semestral/anual) e erros que anulam a rotina. Fonte: CISA StopRansomware.
- **Formatação (decisão)** — critérios reais entre Windows 10 e 11 (requisitos,
  software legado, expectativa de desempenho), checklist do que precisa estar
  pronto antes e quando formatar é a decisão errada. Fonte: requisitos oficiais
  do Windows 11.

Arquivos: `src/lib/enriquecimentoAtp4b.ts` (conteúdo),
`src/lib/enriquecimentoConteudo.ts` (merge 1 + 4A + 4B),
`src/pages/problemas/NotebookNaoLiga.tsx` e
`src/pages/problemas/ComputadorLento.tsx` (páginas próprias passaram a renderizar
os blocos compartilhados, no mesmo lugar das páginas de cluster).

## 3. Validação executada

- SSR local nos 5 owners: 200, exatamente 1 `<h1>`, bloco **Resposta rápida** e
  tabela presentes no HTML inicial (sem depender de hidratação).
- `npm run check:content-intent` — 7 URLs, 7 pares tema × intenção únicos, sem
  sobreposição.
- `npm run check:cannibalization` — nenhuma canibalização P0 (apenas avisos
  pré-existentes de páginas empresariais).
- Vitest `routes-import-smoke` — 412/412.
- Typecheck limpo.

Smoke público após deploy: `npm run smoke:4b`
(snapshots em `reports/smoke-4b/`, relatório em `docs/relatorio-smoke-4b.md`).

## 4. Infraestrutura entregue junto

- `scripts/lib/owners-4b.mjs` + `scripts/lib/owners.mjs`: owners por rodada, com
  `--rodada=4a|4b|todos` no smoke (`npm run smoke:4a|smoke:4b|smoke:owners`) e no
  coletor `report:index-status` (padrão: todos os 11 owners).
- **Alertas detalhados do IndexNow** (`scripts/indexnow-ping.mjs`): classificação
  por endpoint, estado do key file, lista de URLs não aceitas e ação sugerida,
  enviados a `INDEXNOW_ALERT_WEBHOOK`/`SLACK_WEBHOOK_URL`. Fail-safe: sem webhook,
  o diagnóstico vai para o log e o resultado fica em `public/indexnow-status.json`.
- **Painel `/admin/indexacao`**: exportação em CSV, JSON e PDF do quadro por URL,
  bloco de alerta quando o IndexNow falha ou o key file está inacessível, e
  **reobservação agendada** com marcos D+3, D+7, D+14 e D+28 contados a partir do
  snapshot — marcando o que já venceu, sem inventar coleta automática.

## 5. Limites e pendências

- Nenhuma reobservação é disparada pelo painel: ele apenas sinaliza o vencimento
  para rodar `npm run report:index-status`.
- O smoke público da 4B só é conclusivo depois do próximo deploy.
- Cluster F permanece congelado; qualquer reforço de formatação comercial exige
  nova rodada com o owner da 4A.
