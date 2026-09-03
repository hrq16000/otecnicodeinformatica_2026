---
name: Onda 11D — guias técnicos profundos (térmica, mídia removível e versões)
description: 3 artigos indexáveis com capas reais licenciadas, pontes ao Atlas e teto editorial de 69 artigos.
type: feature
---

# Onda 11D (2026-09-03)

Slugs publicados (`WAVE_11D` em `src/lib/blogEditorialRegistry.ts`):

- `/blog/como-monitorar-temperatura-do-computador` — satélite do cluster
  manutenção preventiva (tema Atlas `manutencao-preventiva`); objeto é o método
  de medição e a tendência, não o sintoma de superaquecimento.
- `/blog/pendrive-somente-leitura-protegido-contra-gravacao` — satélite de
  periféricos USB (tema Atlas `fundamentos`); trata da mídia reconhecida que
  recusa escrita, sem repetir o guia de USB não reconhecido.
- `/blog/historico-de-arquivos-windows-como-configurar` — satélite de dados e
  backup (tema Atlas `dados-backup`); configuração do versionamento nativo; o
  teste de restauração continua em `/blog/como-testar-restauracao-de-backup`.

Regras aplicadas:

- Teto de artigos indexáveis subiu para **69** (`MAX_INDEXAVEIS` em
  `scripts/check-editorial-wave-3o.mjs`); sitemap curado passou a 238 URLs.
- Capas reais do Wikimedia Commons com crédito no registro: conjunto ventoinha
  + dissipador (CC BY-SA 4.0, Siarhei Besarab), pendrive com trava de gravação
  (Free Art License 1.3, smial) e HD externo portátil (CC BY-SA 4.0, Sam
  Frazier). Variantes webp/avif/-768 geradas com sharp.
- Pontes bidirecionais em `src/lib/atlasPontesArtigos.ts` e intenção única em
  `src/lib/contentIntentMap.ts` (23 URLs, 23 pares tema × intenção).
- Painel `/admin/seo` atualizado via `report:afirmacoes` + `report-seo-inventory`
  (238 URLs curadas).
