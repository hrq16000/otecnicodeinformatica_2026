---
name: Onda 11C — guias técnicos profundos (manutenção, USB e backup)
description: 3 artigos indexáveis com capas reais licenciadas, pontes ao Atlas e teto editorial de 66 artigos.
type: feature
---

# Onda 11C (2026-09-03)

Slugs publicados (`WAVE_11C` em `src/lib/blogEditorialRegistry.ts`):

- `/blog/manutencao-preventiva-de-computador-guia-completo` — pilar do cluster
  manutenção preventiva (tema Atlas `manutencao-preventiva`).
- `/blog/dispositivo-usb-nao-reconhecido-o-que-fazer` — diagnóstico de
  periférico USB (tema Atlas `fundamentos`); não repete o roteiro de webcam.
- `/blog/como-testar-restauracao-de-backup` — pilar de dados e backup
  (tema Atlas `dados-backup`); objeto é o teste de restauração, não a escolha
  de destino (essa continua em `/decisoes/nuvem-ou-hd-externo`).

Regras aplicadas:

- Teto de artigos indexáveis subiu para **66** (`MAX_INDEXAVEIS` em
  `scripts/check-editorial-wave-3o.mjs`); sitemap curado passou a 235 URLs.
- Capas reais do Wikimedia Commons com crédito no registro: ventoinha
  empoeirada (CC BY-SA 3.0, McZusatz), conectores USB (CC BY-SA 3.0, Zephyris)
  e mídias de backup (CC BY-SA 4.0, Santeri Viinamäki). Variantes
  webp/avif/-768 geradas com sharp a partir do JPG 1200x630.
- Pontes bidirecionais declaradas em `src/lib/atlasPontesArtigos.ts` e intenção
  única em `src/lib/contentIntentMap.ts` (20 URLs, 20 pares tema × intenção).
- Sem preço, sem promessa de prazo, sem link direto de WhatsApp no corpo.
