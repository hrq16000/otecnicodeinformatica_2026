---
name: Intenção conversacional + gate orphan-trend
description: Blocos "o que/como/por que/onde" nacionais em /problemas, FAQPage único por URL e baseline versionado de páginas órfãs.
type: feature
---

- Fonte única dos blocos conversacionais: `src/lib/intencaoConversacional.ts`
  (path → título, intro, perguntas por tipo `o-que|como|por-que|onde`, alertas de risco).
  UI em `src/components/BlocosConversacionais.tsx` (H2 = pergunta exata, H3 = passos,
  caixa "Revisado por responsável técnico" sem inventar credencial).
- **Conteúdo informativo é NACIONAL**: proibido citar cidade/bairro nas respostas de
  "o que", "como" e "por que". Localização só na intenção "onde" e no CTA (conversão regional).
- **Um único FAQPage por URL**: `ClusterProblemaPage` mescla `dados.faq` com
  `faqConversacional(path)` e deduplica antes de emitir o slot.
- Gate bloqueante `npm run check:conversational-intent` (CI): cobertura das 4 intenções,
  formato de pergunta, faixa de resposta, sem promessa proibida e valores conferidos
  contra `src/lib/precosConfig.ts`.
- E2E `e2e/conversational-ssr.spec.ts`: perguntas em `<h2>` no HTML bruto, robots
  index/follow, FAQPage único + TechArticle, âncoras internas sem 404.
- **Orphan trend**: baseline versionado em `config/orphan-trend-baseline.json`
  (`reports/` é gitignored, por isso só recebe espelho gerado em
  `reports/orphan-baseline.json`). Comandos: `npm run orphan:baseline` (atualiza, nunca
  deixa subir), `check:orphan-trend` (compara), `check:orphan-baseline` (exige o arquivo —
  roda no `prebuild` e no CI com mensagem instrutiva). Heurísticas ignoram `/admin`,
  `/api`, `/status`, `/funil-indisponivel`, rotas paramétricas e âncoras.
