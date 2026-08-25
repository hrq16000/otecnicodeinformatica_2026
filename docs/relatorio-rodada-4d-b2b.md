# Rodada 4D — Autoridade B2B / Suporte de TI para empresas

Curitiba + São José dos Pinhais · **sem novas URLs**

## Owners selecionados (6)

| # | Owner (URL existente) | Intenção primária exclusiva |
|---|---|---|
| 1 | `/empresa-de-ti-curitiba` | Triagem e governança de chamados para empresa sem TI interna |
| 2 | `/empresas` | Contratação, nota fiscal de serviço e composição de valor para o CNPJ |
| 3 | `/servicos/suporte-tecnico-empresarial` | Decisão de modalidade: remoto × visita × bancada |
| 4 | `/servicos/manutencao-preventiva-empresas` | Desgaste programado, ciclo de manutenção e renovação do parque |
| 5 | `/servicos/backup-para-empresas` | Destino, retenção e teste real de restauração |
| 6 | `/servicos/suporte-home-office` | Onboarding e suporte da estação do colaborador remoto |

Cada owner tem: resposta rápida (>400 caracteres), tabela própria (6–7 linhas
com coluna de decisão), dois blocos técnicos autorais e FAQ B2B visível.

## Separação de intenção

`INTENCOES_4D` declara, para cada owner, duas intenções que ele **não** deve
responder e o owner real que responde cada uma. O teste garante que todo
encaminhamento aponta para outro owner existente — nada de página criada para
absorver termo.

## Gates

- `src/lib/__tests__/enriquecimento4d.test.ts` — 9 testes: 6 owners, zero URL
  nova, títulos únicos, **Jaccard entre owners < 0,40** (anti-doorway),
  intenções únicas, FAQ única, verdade comercial (sem SLA, mensalidade, prazo
  garantido, técnico dedicado, fidelidade) e mensagem de WhatsApp fail-closed
  sem número exposto.
- `npm run check:recurring-language` — inalterado, continua cobrindo o funil.
- `npm run check:jsonld-ssr` — agora também roda agendado em
  `.github/workflows/jsonld-coldstart.yml` (N=16, isolates frios diários).

## Renderização

`src/components/b2b/BlocosB2b4d.tsx` é **fail-closed**: caminho fora de
`OWNERS_4D` não renderiza nada. Montado em `ServicoLandingLayout` (por rota),
`Empresas.tsx` e `EmpresaDeTiCuritiba.tsx`.

- **FAQ visível apenas** — não entra em JSON-LD `FAQPage`; o schema das páginas
  de serviço continua vindo só de `ServiceLandingSchema`.
- **CTA de WhatsApp** com mensagem pré-preenchida por owner + cidade
  (Curitiba / São José dos Pinhais), disparando o funil global
  (`wa-funnel:open`) e registrando `wa_click` com `route`, `cta_position`,
  `segmento=empresa` e `cidade`. Nenhum número no DOM; sem links `tel:`,
  conforme a política de contato exclusivo por WhatsApp.
- **Prova social** via `ReviewsGrid` filtrado pela cidade escolhida —
  fail-closed: sem reviews reais, exibe garantias verificáveis, nunca
  `aggregateRating` inventado.

## Não fizemos

Nenhuma URL nova, nenhuma alteração de H1, título, canônico, robots ou política
comercial. Nenhuma promessa de prazo, exclusividade ou conformidade regulatória.
