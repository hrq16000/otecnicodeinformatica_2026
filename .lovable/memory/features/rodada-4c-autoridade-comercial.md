---
name: Rodada 4C — autoridade comercial local
description: 6 owners comerciais enriquecidos (Curitiba + SJP), uma intenção por URL, gate anti-doorway e renderização fail-closed
type: feature
---

## Owners (nenhuma URL nova)

Fonte única: `src/lib/enriquecimento4cLocal.ts` (`ENRIQUECIMENTO_4C` + `INTENCOES_4C`).

| URL | Intenção primária |
| --- | --- |
| /tecnico-informatica-curitiba | contratar profissional: o que exigir antes do orçamento |
| /assistencia-tecnica-curitiba | bancada: ordem de serviço, prazo, peça, garantia |
| /tecnico-informatica-sao-jose-pinhais | logística e janela de horário em SJP |
| /atendimento-domicilio | resolve no endereço × vai para bancada |
| /areas-atendidas | cobertura e deslocamento no orçamento |
| /atendimento-remoto | o que a sessão remota alcança e onde para |

Owners técnicos de `/servicos/*` e os congelados nas rodadas 4A/4B ficam fora desta rodada.

## Regras

- Canonical, robots, sitemap e indexabilidade inalterados; nenhuma página nova.
- Renderização por `src/components/local/BlocosLocal4c.tsx`, **fail-closed**: cidade/rota sem conteúdo autoral declarado não renderiza nada (evita template repetido em `CidadeLandingLayout`).
- Anti-doorway garantido por `src/lib/__tests__/enriquecimento4c.test.ts`: similaridade Jaccard entre owners < 0,40, títulos de tabela/bloco únicos, intenções primárias únicas e cada intenção evitada encaminhada ao owner dono dela.
- Cada owner precisa de resposta rápida (>300 caracteres), tabela própria com rótulos de coluna próprios (≥6 linhas) e ≥2 blocos técnicos.
