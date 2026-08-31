---
name: Onda 11A / Lote 4 — BIOS, UEFI e inicialização
description: Três conteúdos de BIOS/UEFI/boot publicados manualmente (liberação assinada em config/onda-11-liberacao.json), no sitemap dinâmico e no painel /admin/ondas.
type: feature
---

Lote 4 (Onda 11A) — conteúdo pronto, publicação governada:

- Slugs em `src/data/blogPostsContent.tsx`: `boot-uefi-ou-legacy-como-identificar` (pilar), `ordem-de-boot-na-bios-como-configurar`, `windows-reparo-automatico-em-loop`.
- Registrados em `src/lib/editorialWavesRegistry.ts` como `wave: "11A"`, `batch: "4"` (cluster `bios-uefi` e `inicializacao-windows`).
- **Não aprovados** em `blogEditorialRegistry.ts` de propósito: sem aprovação = noindex, fora do sitemap e fora da listagem (fail-closed). Promover só depois de `npm run check:onda-11-gate` passar (hoje bloqueia por 3 URLs 10C em PENDING/DISCOVERED) e de anexar capa real licenciada + fact-check em `blogEditorialSources.ts`/`blogEditorialCovers.ts`.
- `scripts/submit-onda-10c.mjs` não filtra mais por onda: submete todas as URLs monitoradas cuja página real passa na verificação de HTTP/metadata, então o Lote 4 entra em sitemap + IndexNow automaticamente no primeiro dia após a promoção.
- Automação diária: `.github/workflows/editorial-verdicts-daily.yml` (07:10 UTC) roda `submit:onda-10c` → `monitor:editorial-waves` → `report:editorial-verdicts` → `check:onda-11-gate` e commita os ledgers lidos por `/admin/editorial-ondas`.

Publicação manual (31/08/2026):

- `config/onda-11-liberacao.json` é a ÚNICA forma de liberar o gate sem a consolidação da 10C: exige `liberado`, `autorizadoPor`, `autorizadoEm` e `slugs`. Sem o arquivo, `check:onda-11-gate` volta a ser fail-closed.
- As 3 URLs estão aprovadas em `blogEditorialRegistry.ts` + `scripts/lib/editorial-wave.mjs`, portanto entram automaticamente em `sitemap-editorial.xml` e na submissão diária (`submit:onda-10c`).
- `npm run report:editorial-lotes` gera `public/editorial-lotes.json` (registry × aprovação × sitemap × submissões × vereditos) consumido por `/admin/ondas`; roda no prebuild.
