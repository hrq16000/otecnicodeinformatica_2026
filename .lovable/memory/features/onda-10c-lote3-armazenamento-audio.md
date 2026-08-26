---
name: Onda 10C — Lote 3 (armazenamento não detectado e áudio)
description: 6 satélites de HD/SSD não detectado e áudio sem som, com regra de segurança que proíbe CHKDSK como recomendação padrão em disco suspeito de falha física.
type: feature
---

- URLs (todas indexáveis, bloco `WAVE_10F` em `blogEditorialRegistry.ts` e `WAVE_10C_BATCH_3` em `editorialWavesRegistry.ts`):
  `/blog/hd-nao-e-reconhecido-na-bios-o-que-fazer` (pilar cluster 7),
  `/blog/ssd-nvme-nao-aparece-no-gerenciador-de-discos`,
  `/blog/disco-com-setores-defeituosos-smart-o-que-fazer`,
  `/blog/computador-sem-som-o-que-verificar` (pilar cluster 8),
  `/blog/fone-de-ouvido-nao-e-reconhecido-no-pc`,
  `/blog/servico-de-audio-do-windows-nao-esta-em-execucao`.
- **Regra de segurança permanente:** CHKDSK nunca é recomendação padrão para disco suspeito de
  falha física (ruído, SMART crítico, desconexões, dados sem cópia). Ordem obrigatória em qualquer
  conteúdo de armazenamento: parar de usar → copiar → imagem bit a bit → investigar → substituir.
  Gate vivo em `e2e/onda-10c-lote3-satelites.spec.ts`.
- Owners preservados sem duplicação: `como-recuperar-dados-hd-com-defeito`, `/problemas/hd-fazendo-barulho`,
  `como-fazer-upgrade-ssd-nvme`, `troquei-o-ssd-e-o-pc-so-abre-a-bios`, `erro-no-bootable-device-como-resolver`.
- Cluster de áudio era 100% vago antes deste lote; toda intenção de som passa por esses 3 owners.
- Capas: fotografia real do Wikimedia Commons (CC/PD), variantes WebP/AVIF, proveniência em
  `editorialAssetsRegistry`. Relatório: `docs/relatorio-onda-10c-lote-3.md`.
