---
name: Autoridade do Atlas, capas pendentes e pontes sintoma→tema
description: Painéis /admin/autoridade-atlas e /admin/capas-pendentes, relatórios fail-closed, pontes bidirecionais Atlas ↔ pilares ↔ serviços e vereditos da bancada (Fase 2)
type: feature
---
- `/admin/autoridade-atlas` lê `public/autoridade-atlas.json` (`npm run report:autoridade-atlas`), gerado do HTML SSR real: densidade semântica por nó, grau de saída/entrada dentro do grafo do Atlas, cobertura por tema e nós dependentes só do hub. Nada é estimado no navegador.
- `/admin/capas-pendentes` lê `public/capas-pendentes.json` (`npm run report:capas-pendentes`): lista bloqueios por URL (status, capa real ausente, origem `generated` proibida, licenciada sem atribuição, fora da onda do sitemap). "Publicação rápida" só é habilitada para URL pronta e apenas dispara IndexNow — o painel nunca gera capa.
- Ponte de arquitetura: `src/lib/atlasPontes.ts` mapeia cada slug de `CLUSTER_PROBLEMAS` para um tema do Atlas com justificativa própria (sem template repetido); `AtlasPonteProblema.tsx` renderiza sintoma → verificar → parar → tema em SSR. Fail-closed: sintoma sem ponte declarada não mostra o bloco.
- Guias de decisão passaram a 7 (incluído "limpeza interna ou pasta térmica"). Testes em `src/__tests__/atlas-informatica.test.ts` exigem cobertura total dos clusters e textos únicos.

## Fase 2 (2026-09-01) — vereditos, fontes primárias e malha bidirecional
- Cada um dos 9 temas tem **veredito da bancada** (experiência real, sem número inventado) e **fontes primárias** de uma allowlist fixa em `src/lib/atlasInformatica.ts` (support/learn.microsoft.com, cisa.gov, cert.br, nist.gov, wi-fi.org e fabricantes). Fonte fora da allowlist quebra teste e gate.
- Guias de decisão redesenhados: cada um expõe **sinais observáveis dos dois lados** + nível de risco canônico (`seguro` | `atencao` | `parada`), com âncora `#decisao-<id>`. "Parada obrigatória" usa badge destructive (HD com ruído).
- Ponte serviço→Atlas: `src/lib/atlasPonteServicos.ts` + `AtlasPonteServico.tsx` ("Entenda antes de contratar") injetado via `ServicoCore.tsx` só para serviços mapeados — fail-closed, sem template repetido entre serviços.
- Gate `check:atlas-hub` (Fase 2) valida no HTML servido: 9 vereditos, fontes com host da allowlist, 7 âncoras `#decisao-`, pontes renderizadas nos pilares/serviços declarados.
- `lastmod` só muda por alteração material via `config/content-fingerprints.json` (`update-content-fingerprints.mjs` roda pós-build; rotas sem HTML no dist preservam registro anterior). Nunca datar o site inteiro.
