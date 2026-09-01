---
name: Autoridade do Atlas, capas pendentes e pontes sintoma→tema
description: Painéis /admin/autoridade-atlas e /admin/capas-pendentes, relatórios fail-closed e ponte curada de cada cluster de /problemas para o tema do Atlas
type: feature
---
- `/admin/autoridade-atlas` lê `public/autoridade-atlas.json` (`npm run report:autoridade-atlas`), gerado do HTML SSR real: densidade semântica por nó, grau de saída/entrada dentro do grafo do Atlas, cobertura por tema e nós dependentes só do hub. Nada é estimado no navegador.
- `/admin/capas-pendentes` lê `public/capas-pendentes.json` (`npm run report:capas-pendentes`): lista bloqueios por URL (status, capa real ausente, origem `generated` proibida, licenciada sem atribuição, fora da onda do sitemap). "Publicação rápida" só é habilitada para URL pronta e apenas dispara IndexNow — o painel nunca gera capa.
- Ponte de arquitetura: `src/lib/atlasPontes.ts` mapeia cada slug de `CLUSTER_PROBLEMAS` para um tema do Atlas com justificativa própria (sem template repetido); `AtlasPonteProblema.tsx` renderiza sintoma → verificar → parar → tema em SSR. Fail-closed: sintoma sem ponte declarada não mostra o bloco.
- Guias de decisão passaram a 7 (incluído "limpeza interna ou pasta térmica"). Testes em `src/__tests__/atlas-informatica.test.ts` exigem cobertura total dos clusters e textos únicos.
