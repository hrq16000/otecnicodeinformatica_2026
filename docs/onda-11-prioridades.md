# Onda 11 — mapa de prioridades (P1–P3)

Gerado em 2026-08-31T17:57:04.665Z. Este documento **não autoriza criar URLs**: é a fila
priorizada a partir dos dados disponíveis no repositório e nas integrações já
existentes. Candidato sem evidência é rebaixado, nunca promovido.

- Search Console disponível: sim
- Cobertura de indexação da Onda 10C: 86.4%
- Publicação liberada: **sim, mediante gate anti-canibalização por candidato**

## Bloqueios ativos

Nenhum.

## Fila priorizada

| # | Prioridade | Cluster | Intenção | Score base → ajustado | Owner existente | Ação |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | P1 | BIOS e UEFI | diagnóstico de boot e POST | 82 → 82 | /blog/hd-nao-e-reconhecido-na-bios-o-que-fazer | Preparar briefing e rodar o gate anti-canibalização com o candidato antes de qualquer URL. |
| 2 | P1 | Inicialização do Windows | reparo automático e boot loop | 80 → 80 | /blog/windows-update-travado-desfazendo-alteracoes | Preparar briefing e rodar o gate anti-canibalização com o candidato antes de qualquer URL. |
| 3 | P1 | RAM e MemTest | diagnóstico de memória e estabilidade | 76 → 76 | /blog/testar-memoria-ram-memtest86 | Preparar briefing e rodar o gate anti-canibalização com o candidato antes de qualquer URL. |
| 4 | P1 | USB e periféricos | dispositivo USB não reconhecido | 72 → 72 | /blog/webcam-usb-nao-e-detectada | Preparar briefing e rodar o gate anti-canibalização com o candidato antes de qualquer URL. |
| 5 | P1 | Segurança do Windows | malware phishing ransomware | 70 → 70 | /blog/como-proteger-computador-golpes-internet | Preparar briefing e rodar o gate anti-canibalização com o candidato antes de qualquer URL. |

## Ajustes aplicados

- **BIOS e UEFI** — risco declarado: não duplicar SSD não detectado ou reset CMOS
- **Inicialização do Windows** — risco declarado: não duplicar tela azul ou Windows Update
- **RAM e MemTest** — risco declarado: não duplicar sintomas de RAM insuficiente
- **USB e periféricos** — risco declarado: não duplicar webcam USB
- **Segurança do Windows** — risco declarado: não duplicar remoção de vírus ou ransomware empresarial

## Regra de execução

1. Nenhum item vira URL sem passar por `npm run check:editorial-cannibalization -- --candidato="..."`.
2. Enquanto houver bloqueio ativo, a onda permanece em observação.
3. Reexecutar este mapa após cada auditoria consolidada.
