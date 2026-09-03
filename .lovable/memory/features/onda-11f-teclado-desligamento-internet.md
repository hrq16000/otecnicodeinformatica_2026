---
name: Onda 11F — teclado, desligamento repentino e internet por cabo
description: 3 artigos indexáveis com capas reais licenciadas, pontes ao Atlas e teto editorial de 75 artigos.
type: feature
---

# Onda 11F (2026-09-03)

Slugs publicados (`WAVE_11F` em `src/lib/blogEditorialRegistry.ts`):

- `/blog/teclado-de-notebook-nao-funciona-o-que-verificar` — tema Atlas
  `fundamentos`; teclado externo como divisor entre hardware interno e
  sistema. Não duplica notebook que não liga nem USB não reconhecido.
- `/blog/computador-desliga-sozinho-o-que-verificar` — tema Atlas
  `manutencao-preventiva`; padrão temporal separa proteção térmica, fonte,
  rede elétrica e memória. Tela azul e superaquecimento seguem em URLs próprias.
- `/blog/computador-nao-conecta-na-internet-por-cabo` — tema Atlas
  `redes-wifi`; separa ausência de enlace físico de ausência de navegação.
  Não canibaliza Wi-Fi nem internet lenta.

Regras aplicadas:

- Teto de artigos indexáveis subiu para **75** (`MAX_INDEXAVEIS` em
  `scripts/check-editorial-wave-3o.mjs`); sitemap curado passou a 244 URLs.
- Capas reais do Wikimedia Commons: teclado de notebook HP (CC BY-SA 4.0,
  Gugalcrom123), fonte com poeira (CC BY 2.0, Giulia Ciappa) e conector RJ-45
  em notebook (CC BY-SA 4.0, Pittigrilli/Zinnmann). Variantes webp/avif/-768
  geradas com sharp.
- `src/lib/editorialHubSummaries.ts` é derivado de `blogPostsContentBase`
  filtrado por `getApprovedSlugs()` — regenerar por script, nunca editar
  parcialmente à mão.
- Verificação: `verify` 34/34 (o teste `atlas-informatica` só passa isolado
  sob carga), `build` e `deploy:check` 37/37 (smoke pós-deploy depende do
  site publicado).
