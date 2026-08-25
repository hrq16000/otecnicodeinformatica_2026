---
name: Rodada 4E — Wi-Fi, redes e suporte remoto
description: Owners de rede/remoto enriquecidos sem URLs novas, com separação de intenção internet lenta × Wi-Fi lento e remoto × presencial
type: feature
---

- 5 owners da 4E (nunca criar URL nova para essas intenções):
  `/problemas/wifi-instavel` (quedas e falha de associação),
  `/solucoes/diagnostico` (medição: internet lenta × Wi-Fi lento),
  `/equipamentos/roteador` (cobertura e configuração segura),
  `/servicos/redes-e-wifi` (conectado sem internet, contratação, residencial × PJ),
  `/atendimento-remoto` (decisão remoto × presencial e golpes de falso suporte).
- Fonte única: `src/lib/enriquecimento4eRedes.ts`; render fail-closed por
  `src/components/redes/BlocosRedes4e.tsx` (caminho fora do mapa não renderiza nada).
- "Problema de internet no escritório" é NO_OWNER proposital: vive como bloco em
  `/servicos/redes-e-wifi`. Combinações `redes-wifi × bairro` não recebem enriquecimento
  (evita doorway geolocalizado).
- FAQ da 4E é visível e **fora** do JSON-LD; schemas seguem emitidos só pelos layouts.
- CTA sempre dentro do funil global, contexto sem PII (route, cta_position, segmento=redes,
  modalidade, cidade Curitiba/SJP) e href via `whatsappLinkComContexto`.
- Gate anti-doorway da rodada: `src/lib/__tests__/enriquecimento4e.test.ts` (Jaccard < 0,40).
- `npm run report:vitals-4e` mede CWV dos owners; cold start de JSON-LD + rich results
  monitorados em `.github/workflows/jsonld-coldstart.yml`.
- Dívida pré-existente (não da 4E): `check:local-doorway` e `check:jsonld-refs` falham
  apenas em pares/`#primaryimage` de `/bairros/*`.
