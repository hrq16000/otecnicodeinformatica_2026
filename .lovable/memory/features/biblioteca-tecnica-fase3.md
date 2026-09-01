---
name: Fase 3 — biblioteca técnica (glossário + ferramentas)
description: /glossario (15 termos DefinedTerm) e /ferramentas (5 checklists), 22 rotas indexáveis, pontes bidirecionais com problemas/serviços/Atlas e gate check:biblioteca.
type: feature
---

- Rotas: `/glossario` + 15 termos (`glossario_.$termo.tsx`) e `/ferramentas` +
  5 checklists (`ferramentas_.$slug.tsx`). Fonte única: `src/lib/glossarioTecnico.ts`
  e `src/lib/ferramentasTecnicas.ts`. Slug desconhecido → 404 real na borda
  (manifesto) e 404 própria no SPA.
- Conteúdo funciona sem JavaScript (SSR + espelho estático em
  `scripts/lib/biblioteca-static.mjs`). JSON-LD `DefinedTerm`/`DefinedTermSet`
  com paridade visível obrigatória.
- Pontes contextuais em `src/lib/bibliotecaPontes.ts` (componente
  `BibliotecaPonte.tsx`): problemas ⇄ glossário/ferramentas ⇄ Atlas. Sempre
  aditivas — nunca substituem links existentes.
- Gate bloqueante `npm run check:biblioteca` (prebuild): slugs únicos,
  metadados, destinos reais das pontes, proibição de recomendar desativação
  permanente de proteções e de promessa de prazo.
- Regra editorial: todo passo tem nível de risco e critério de "onde parar";
  preço só via `precosConfig`; sem cidade em slug de biblioteca.
- A11y desta fase virou contrato: tabela rolável de `BlocosEnriquecimento`
  tem `role="region"` + `tabIndex={0}`; estado ativo de toggles usa
  `bg-accent text-accent-foreground` (nunca `text-accent` sobre tinta).
- `check:nap` extrai o nome do nó LocalBusiness/Organization do JSON-LD
  (nunca a primeira `"name"` crua do HTML). `report-external-authority.mjs`
  exclui arquivos de teste.
- Pendência conhecida: nó LocalBusiness duplicado em páginas serviço×cidade
  (latente, só visível em snapshot completo) e falso positivo "24 horas" no
  regex de claims do `check:jsonld-p0`.
