---
name: Rodada 4D — Autoridade B2B
description: 6 owners empresariais existentes (CWB/SJP), fonte única em enriquecimento4dB2b.ts, gate anti-doorway <0,40 e FAQ B2B fora do JSON-LD
type: feature
---

Owners B2B (sem URL nova): `/empresa-de-ti-curitiba`, `/empresas`,
`/servicos/suporte-tecnico-empresarial`, `/servicos/manutencao-preventiva-empresas`,
`/servicos/backup-para-empresas`, `/servicos/suporte-home-office`.

- Fonte única: `src/lib/enriquecimento4dB2b.ts` (OWNERS_4D, INTENCOES_4D,
  ENRIQUECIMENTO_4D, FAQ_4D, mensagemWhatsapp4d).
- Render fail-closed: `src/components/b2b/BlocosB2b4d.tsx` — path fora do mapa não renderiza.
- Uma intenção primária por owner; intenções evitadas apontam para outro owner real.
- Gate: `src/lib/__tests__/enriquecimento4d.test.ts` (Jaccard < 0,40, verdade comercial,
  WhatsApp sem número exposto).
- FAQ B2B é **visível apenas** — nunca entra em JSON-LD FAQPage.
- CTA usa funil global `wa-funnel:open` com mensagem por owner + cidade (Curitiba / SJP)
  e `trackWaClick` com segmento=empresa. Sem `tel:`.
- Prova social por `ReviewsGrid` filtrado por cidade, fail-closed (sem rating inventado).
- Cold start do JSON-LD reexecutado diariamente em `.github/workflows/jsonld-coldstart.yml`.
