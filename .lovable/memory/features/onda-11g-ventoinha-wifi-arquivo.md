---
name: Onda 11G — ventoinha, Wi-Fi invisível e arquivo corrompido
description: Três guias publicados na Onda 11G, com capas licenciadas, FAQ própria, pontes ao Atlas e teto editorial de 78 artigos indexáveis.
type: feature
---
Slugs (2026-09-03):
- `ventoinha-do-computador-fazendo-barulho-o-que-verificar` — Diagnóstico; pilar /servicos/manutencao-de-computador; capa CC BY-SA 4.0 (Hannes Grobe).
- `rede-wifi-nao-aparece-na-lista-o-que-verificar` — Redes; pilar /servicos/redes-e-wifi; capa CC BY 4.0 (Hayden Schiff).
- `arquivo-corrompido-nao-abre-o-que-fazer` — Dados; pilar /servicos/recuperacao-de-dados; capa CC BY 4.0 (Mk2010).

Regras aprendidas:
- `MAX_INDEXAVEIS` em `scripts/check-editorial-wave-3o.mjs` passou para 78.
- Depois de `npm run build`, rodar `node scripts/prerender-blog.mjs` e copiar `dist/client/blog/<slug>/index.html` para `dist/blog/<slug>/index.html`, senão `check:geo` acusa meta ausente.
- FAQ própria por artigo fica em `PILOT_FAQ` (src/components/BlogPostFAQ.tsx), sem preço, prazo ou promessa.
