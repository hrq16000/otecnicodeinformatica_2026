---
name: Onda 10C — Lote 4 (webcam e Windows Update)
description: 6 artigos dos clusters webcam e Windows Update, regras de segurança contra hack de registro e desativação de serviços, cache tratado por renomeação reversível.
type: feature
---

Onda 10C · Lote 4 (`WAVE_10G` no registro editorial, `WAVE_10C_BATCH_4` no registry de ondas),
publicada em 2026-08-26. Teto editorial: 60 artigos aprovados.

URLs (todas em `/blog`, sem novas rotas):

- Cluster 9 (webcam): `webcam-nao-funciona-o-que-verificar` (pilar),
  `permissoes-de-camera-no-windows`, `webcam-usb-nao-e-detectada`.
- Cluster 10 (Windows Update): `windows-update-nao-funciona-o-que-verificar` (pilar),
  `limpar-cache-do-windows-update-softwaredistribution`,
  `windows-update-travado-desfazendo-alteracoes`.

Regras de conteúdo que valem para qualquer artigo futuro desses temas (travadas por
`e2e/onda-10c-lote4.spec.ts`):

- Câmera bloqueada nunca é resolvida por edição de registro. O caminho publicado são as quatro
  camadas de permissão do Windows + permissão por site no navegador.
- Windows Update nunca é "consertado" desativando o serviço de atualização nem o serviço de
  reparo do Update.
- Cache do Update: parar serviços → **renomear** `SoftwareDistribution` → reiniciar serviços.
  Apagar como primeiro passo é proibido; scripts de reset de terceiros são recusados.
- Reversão ("desfazendo alterações") é proteção, não defeito. Desligamento forçado só depois de
  horas sem atividade e sempre com ressalva de risco.

Rota comercial de backup válida: `/servicos/backup-para-empresas` (`/servicos/backup-de-dados`
não existe e produz 404 nos gates de link).

Relatório: `docs/relatorio-onda-10c-lote-4.md`.
