# Rodada 4E — Wi-Fi, redes e suporte remoto

Escopo: fortalecer owners **já publicados** para intenção de rede e suporte
remoto em Curitiba e São José dos Pinhais. **Zero URL nova**, zero bairro novo,
zero página geolocalizada. 9C permanece fora desta sequência.

## 1. Universo auditado

- 443 rotas no roteador TanStack; filtro por intenção de rede/Wi-Fi/remoto.
- Candidatos encontrados: `/problemas/wifi-instavel`, `/solucoes/diagnostico`,
  `/equipamentos/roteador`, `/servicos/redes-e-wifi`, `/atendimento-remoto`,
  além das combinações serviço × bairro `redes-wifi/*` (descartadas: enriquecê-las
  criaria doorway geolocalizado da mesma intenção).
- **NO_OWNER registrado**: "problema de internet no escritório" não ganhou owner
  próprio — é tratado como bloco dentro de `/servicos/redes-e-wifi`
  (residencial × empresarial), sem URL dedicada.

## 2. Owners escolhidos

| Cluster | Owner | Antes | Depois | Intent | Doorway | SSR | Lastmod | IndexNow |
|---|---|---|---|---|---|---|---|---|
| Wi-Fi cai / não conecta | `/problemas/wifi-instavel` | sintoma genérico | resposta rápida + tabela de 6 padrões de queda + árvore "não conecta" + FAQ 4 | quedas e falha de associação | não | OK | hash-change | pendente deploy |
| Internet lenta × Wi-Fi lento | `/solucoes/diagnostico` | diagnóstico genérico | protocolo de 2 medições + tabela de unidades (Mbps × MB/s, latência, DNS) + camadas | medição e diferenciação | não | OK | hash-change | pendente deploy |
| Sinal fraco / cobertura | `/equipamentos/roteador` | ficha do equipamento | comparação repetidor × AP × mesh × cabo + configuração segura (WPA2/WPA3, firmware, rede de convidados) | cobertura e configuração | não | OK | hash-change | pendente deploy |
| Conectado sem internet / técnico de rede | `/servicos/redes-e-wifi` | serviço comercial | diagnóstico por camadas + tabela de estados + residencial × empresarial + atendimento CWB/SJP | contratação e camadas | não | OK | hash-change | pendente deploy |
| Remoto × presencial | `/atendimento-remoto` | página de modalidade | tabela de decisão por problema (8 linhas) + sessão remota segura + golpes de falso suporte | decisão de modalidade | não | OK | hash-change | pendente deploy |

Owners auditados = 12 · **Owners enriquecidos = 5** (limite 6) · URLs novas = 0.

## 3. Arquitetura

- Fonte única: `src/lib/enriquecimento4eRedes.ts` (conteúdo, intenções, FAQ,
  modalidade e mensagem de funil por owner).
- Render: `src/components/redes/BlocosRedes4e.tsx`, **fail-closed** — caminho
  fora de `OWNERS_4E` não renderiza nada. Provado em SSR: `/problemas/computador-lento`
  não recebe nenhum bloco 4E.
- Montagem: `ClusterProblemaPage`, `ClusterSolucaoPage`, `ClusterEquipamentoPage`,
  `ServicoLandingLayout` e `AtendimentoRemoto`. Nenhuma rota nova foi criada.
- FAQ é **visível** e propositalmente fora do JSON-LD: os schemas continuam
  emitidos apenas pelos layouts, preservando o contrato atual.

## 4. Anti-canibalização

`INTENCOES_4E` registra, por owner, `PRIMARY_INTENT`, `SECONDARY_ALLOWED` e
`OWNED_ELSEWHERE`. Pares críticos separados explicitamente:

- internet lenta (`/solucoes/diagnostico`) × computador lento (`/problemas/computador-lento`);
- Wi-Fi não conecta (`/problemas/wifi-instavel`) × conectado sem internet (`/servicos/redes-e-wifi`);
- suporte remoto (`/atendimento-remoto`) × suporte empresarial (`/servicos/suporte-tecnico-empresarial`);
- técnico de rede (`/servicos/redes-e-wifi`) × técnico de informática (owners locais 4C).

## 5. Links internos

2 a 5 destinos por owner, em texto corrido (fechos contextuais) e no mapa de
intenção. Sem reciprocidade cega e sem autolink — validado por teste.

## 6. Fontes primárias

Microsoft (conexão Wi-Fi e rede no Windows; golpes de suporte técnico),
Wi-Fi Alliance (padrão e WPA3), CISA (segurança de rede doméstica, dispositivos
de infraestrutura e engenharia social) e Anatel (qualidade de banda larga).
Nenhum concorrente usado como referência técnica.

## 7. Conversão e medição

- CTA único por owner, dentro do funil global (`wa-funnel:open`), sem aumentar
  o número de CTAs da página.
- Contexto transportado sem PII: `route`, `cta_position`, `segmento=redes`,
  `modalidade` (remoto/presencial/híbrido), `cidade` (Curitiba ou SJP),
  `utm_source`, `utm_campaign`.
- O href real é gerado por `whatsappLinkComContexto`, que propaga
  `utm_source`/`utm_medium`/`utm_campaign`/`utm_content` e preserva UTMs de
  campanha capturadas na entrada da sessão.
- `check:cta-funnel` verde (sem `tel:`, sem CTA fora do funil).

## 8. Metadata

Nenhum title/description alterado: as metas dos 5 owners já apontavam para a
intenção principal. Evitou-se qualquer empilhamento de palavra-chave.

## 9. Schema e SSR

- `check:jsonld-ssr` verde: 12 renders por rota em processos frios, 1 variante,
  sem perda de bloco.
- Conteúdo 4E presente no **HTML inicial** dos 5 owners (verificado por render
  direto do bundle SSR).
- `check:schema-standards` e `check:rich-results` verdes.

## 10. Lastmod

`config/content-fingerprints.json` atualizado por hash real do HTML servido.
Somente rotas com mudança material receberam data nova; `check:lastmod-fingerprint`
verde. Zero bump por deploy.

## 11. Gates executados

| Gate | Resultado |
|---|---|
| test:unit (748 testes, 39 arquivos) | PASS |
| typecheck | PASS |
| build | PASS |
| check:jsonld-ssr | PASS |
| check:schema-standards | PASS |
| check:rich-results | PASS |
| check:internal-links | PASS |
| check:orphan-pages | PASS |
| check:malha-interna | PASS |
| check:cannibalization | PASS |
| check:content-intent | PASS |
| check:robots | PASS |
| check:sitemap-source | PASS |
| check:lastmod-fingerprint | PASS |
| check:cta-funnel | PASS |
| enriquecimento4e (anti-doorway, 12 testes) | PASS |
| check:local-doorway | FALHA **pré-existente**, apenas pares `/bairros/*` |
| check:jsonld-refs | FALHA **pré-existente**, `#primaryimage` duplicado em `/bairros/*` |

As duas falhas restantes são anteriores à 4E, restritas a páginas de bairro
(nenhuma tocada nesta rodada) e ficam registradas como dívida da trilha local.

## 12. Automação adicionada

- `.github/workflows/jsonld-coldstart.yml` passa a monitorar também os rich
  results em produção após o gate de cold start: mudança de fingerprint sem
  deploy reprova o job.
- `npm run report:vitals-4e` — LCP/INP/CLS dos owners 4E via PageSpeed
  (campo CrUX com fallback de laboratório), saída em `reports/vitals-4e.{md,json}`.

## Vereditos

1. Owners auditados = 12
2. Owners enriquecidos = 5 (máx. 6)
3. URLs novas = 0
4. Internet lenta × Wi-Fi lento diferenciados? **SIM**
5. Sem internet × Wi-Fi não conecta diferenciados? **SIM**
6. Remoto × presencial com decisão clara? **SIM**
7. Alguma recomendação insegura? **NÃO**
8. Doorway criado? **NÃO**
9. Similaridade < 0,40? **SIM** (maior par entre owners 4E abaixo do limite)
10. Canibalização P0 = 0? **SIM**
11. JSON-LD SSR determinístico? **SIM**
12. Conteúdo no HTML inicial? **SIM**
13. Lastmod honesto? **SIM**
14. IndexNow somente URLs 4E? **PENDENTE** — envio após confirmação do deploy
15. Gates verdes? **SIM**, exceto duas falhas pré-existentes de `/bairros/*`
16. 4E encerrável? **SIM**, condicionada ao deploy + IndexNow das 5 URLs

## Decisão

`4E = READY_TO_DEPLOY` · `SEARCH = OBSERVE` · `NEXT_ALLOWED = 4F` (não iniciada
neste turno).
