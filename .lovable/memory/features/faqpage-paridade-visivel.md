---
name: FAQPage exige FAQ visível na página
description: FAQPage só pode ser emitido onde o bloco de perguntas está visível no HTML SSR; gate check:schema-standards valida paridade
type: feature
---

- O slot global `SCHEMA_SLOTS.faq` (`src/components/JsonLdSchema.tsx`) corresponde à FAQ
  visível da home (`HomeFaqSsr` / `src/lib/homeFaq.ts`) e **só vale na home**. Nunca
  reativar para todas as rotas: gerava `FAQPage` com 14 perguntas invisíveis em 27
  artigos de blog e demais páginas.
- Rotas com FAQ própria registram o slot em `SLOT_PRIORITY.page`.
- `scripts/check-schema-standards.mjs` roda sobre `CURATED_PATHS` via `ssr-harness.mjs`
  (nunca sobre `dist/**/index.html` — esses arquivos não existem no TanStack Start) e
  reprova qualquer `FAQPage` cujas perguntas não apareçam no texto visível. Universo
  vazio = BLOQUEIO (fail-closed).
- `check:malha-interna` também usa o harness SSR pelo mesmo motivo.
