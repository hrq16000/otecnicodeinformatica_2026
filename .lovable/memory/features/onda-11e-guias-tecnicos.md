---
name: Onda 11E — vídeo, energia de notebook e migração de arquivos
description: 3 artigos indexáveis com capas reais licenciadas, pontes ao Atlas e teto editorial de 72 artigos.
type: feature
---

# Onda 11E (2026-09-03)

Slugs publicados (`WAVE_11E` em `src/lib/blogEditorialRegistry.ts`):

- `/blog/monitor-sem-sinal-o-que-verificar` — cluster `video-e-exibicao`
  (tema Atlas `fundamentos`); separa monitor vivo, caminho do vídeo e
  computador que não inicia. Não duplica notebook que não liga nem placa-mãe.
- `/blog/bateria-de-notebook-nao-carrega-o-que-verificar` — cluster
  `manutencao-preventiva`; distingue fonte, conector, limite de carga do
  fabricante e célula em fim de vida, com parada obrigatória por segurança.
- `/blog/como-migrar-arquivos-para-um-computador-novo` — cluster
  `dados-backup`; evento pontual de troca de máquina (inventário, método,
  conferência, descarte), sem invadir a rotina contínua de backup.

Regras aplicadas:

- Teto de artigos indexáveis subiu para **72** (`MAX_INDEXAVEIS` em
  `scripts/check-editorial-wave-3o.mjs`); sitemap curado passou a 241 URLs.
- Capas reais do Wikimedia Commons: cabo HDMI (CC BY-SA 4.0, Kannan
  Shanmugam), notebook com bateria removida (CC BY-SA 2.0, Intel Free Press)
  e HD externo ligado a notebook por USB-C (CC BY 4.0, Augkun-ane). Variantes
  webp/avif/-768 geradas com sharp.
- Pontes em `src/lib/atlasPontesArtigos.ts` e intenção única em
  `src/lib/contentIntentMap.ts` (26 URLs, 26 pares tema × intenção).
- `check:editorial-cluster` bloqueia "solução definitiva" e "no mesmo dia" —
  reescrever a frase, nunca desligar o gate.
- Painel `/admin/seo` atualizado por `report:afirmacoes` + `report-seo-inventory`
  (241 URLs curadas).
