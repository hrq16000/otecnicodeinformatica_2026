---
name: Onda 11B — biblioteca técnica ampliada
description: 3 guias de decisão, 3 termos de glossário e 1 roteiro novos; espelho estático regenerado; sitemap curado em 221 URLs.
type: feature
---
Onda 11B (aditiva, nenhuma URL removida ou renomeada):

- Decisões: `/decisoes/atualizar-para-windows-11`, `/decisoes/nuvem-ou-hd-externo`,
  `/decisoes/montar-ou-comprar-pronto` — cada guia exige card correspondente em
  `ATLAS_GUIAS_DECISAO` (gate `check:biblioteca`).
- Glossário: `secure-boot`, `driver`, `particao` (18 termos).
- Ferramenta: `roteiro-wifi-instavel` (6 ferramentas).
- Ponte bidirecional nova: sintoma `arquivos-apagados` → decisão `nuvem-ou-hd-externo`
  em `DECISAO_POR_SINTOMA`.
- `scripts/lib/biblioteca-static.mjs` é ESPELHO GERADO: ao mexer em
  glossário/ferramentas, regerar título/descrição com o mesmo truncamento (158/155)
  ou o gate bloqueia.
- Sitemap curado: 221 URLs; IndexNow disparado com `--all` após publicar.
