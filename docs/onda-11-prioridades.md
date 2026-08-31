# Onda 11 — mapa de prioridades (P1–P3)

Gerado em 2026-08-31T17:39:34.798Z. Este documento **não autoriza criar URLs**: é a fila
priorizada a partir dos dados disponíveis no repositório e nas integrações já
existentes. Candidato sem evidência é rebaixado, nunca promovido.

- Search Console disponível: sim
- Cobertura de indexação da Onda 10C: 0%
- Publicação liberada: **não**

## Bloqueios ativos

- Onda 10C com 0% de cobertura de indexação: publicar novo lote antes de sinal do Google dilui rastreio.

## Fila priorizada

| # | Prioridade | Cluster | Intenção | Score base → ajustado | Owner existente | Ação |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | P1 | BIOS e UEFI | diagnóstico de boot e POST | 82 → 72 | /blog/hd-nao-e-reconhecido-na-bios-o-que-fazer | Preparar briefing e rodar o gate anti-canibalização com o candidato antes de qualquer URL. |
| 2 | P1 | Inicialização do Windows | reparo automático e boot loop | 80 → 70 | /blog/windows-update-travado-desfazendo-alteracoes | Preparar briefing e rodar o gate anti-canibalização com o candidato antes de qualquer URL. |
| 3 | P2 | RAM e MemTest | diagnóstico de memória e estabilidade | 76 → 66 | /blog/testar-memoria-ram-memtest86 | Manter em observação: reavaliar quando houver impressões no GSC para a intenção. |
| 4 | P2 | USB e periféricos | dispositivo USB não reconhecido | 72 → 62 | /blog/webcam-usb-nao-e-detectada | Manter em observação: reavaliar quando houver impressões no GSC para a intenção. |
| 5 | P2 | Segurança do Windows | malware phishing ransomware | 70 → 60 | /blog/como-proteger-computador-golpes-internet | Manter em observação: reavaliar quando houver impressões no GSC para a intenção. |

## Ajustes aplicados

- **BIOS e UEFI** — −10 Onda 10C ainda sem indexação consolidada; risco declarado: não duplicar SSD não detectado ou reset CMOS
- **Inicialização do Windows** — −10 Onda 10C ainda sem indexação consolidada; risco declarado: não duplicar tela azul ou Windows Update
- **RAM e MemTest** — −10 Onda 10C ainda sem indexação consolidada; risco declarado: não duplicar sintomas de RAM insuficiente
- **USB e periféricos** — −10 Onda 10C ainda sem indexação consolidada; risco declarado: não duplicar webcam USB
- **Segurança do Windows** — −10 Onda 10C ainda sem indexação consolidada; risco declarado: não duplicar remoção de vírus ou ransomware empresarial

## Regra de execução

1. Nenhum item vira URL sem passar por `npm run check:editorial-cannibalization -- --candidato="..."`.
2. Enquanto houver bloqueio ativo, a onda permanece em observação.
3. Reexecutar este mapa após cada auditoria consolidada.
