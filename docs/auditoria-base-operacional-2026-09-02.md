# Auditoria da base operacional e editorial — 2026-09-02

Rodada de correção de base. **Nenhuma rota, slug, canonical ou URL pública foi
alterada.** Nenhum conteúdo foi removido. Nenhum preço foi alterado.

## 1. Arquivos analisados

| Escopo | Arquivos / fontes |
| --- | --- |
| Documentação operacional | `README.md`, `docs/runbook-deploy.md`, `docs/eeat-governance.md` |
| Fontes comerciais oficiais | `src/lib/config/commercial.ts`, `src/lib/politicaComercial.ts`, `src/lib/config/domain.ts`, `src/lib/siteConfig.ts`, `scripts/lib/site-env.mjs` |
| Copy comercial | `src/pages/servico-bairro/**`, `src/pages/bairros/**`, `src/pages/servicos/**`, `src/pages/ArrumarPC.tsx`, `src/pages/TecnicoInformaticaCampoMagro.tsx`, `src/components/scheduling/SchedulingSection.tsx` |
| Conteúdo editorial | `src/lib/problemaPagesData.ts`, `src/lib/servicosCore.ts`, `src/lib/enriquecimento*.ts`, `src/lib/glossarioTecnico.ts`, `src/lib/ferramentasTecnicas.ts` |
| Gates | `scripts/check-trust-claims.mjs` + `scripts/trust-claims-allowlist.json` |

## 2. Inconsistências encontradas

| # | Inconsistência | Evidência | Gravidade |
| --- | --- | --- | --- |
| 1 | Ausência de contrato operacional na raiz (`AGENTS.md`) | arquivo inexistente | alta |
| 2 | `README.md` com `REPLACE_WITH_PROJECT_ID`, sem domínio canônico, sugerindo deploy automático a partir de push | README linhas 1–74 originais | alta |
| 3 | `docs/runbook-deploy.md` tratava `tecnico.curitiba.br` (marca de origem) como domínio principal | título + tabela de evidências + seção Cloudflare | alta |
| 4 | "Diagnóstico gratuito" em páginas comerciais, em conflito com a fonte oficial (`commercialConfig.diagnosticoLabel = R$ 99,99` e `politicaComercial`: "é devido apenas o valor do diagnóstico informado antes") | `ConsertoNotebookPortao.tsx`, `ConsertoNotebookBatel.tsx`, `ArrumarPC.tsx`, `bairros/SaoDomingos.tsx` | alta |
| 5 | "Garantia em Todos os Serviços" / "Serviço garantido... voltamos sem custo" — garantia irrestrita, divergente da regra central (garantia sobre a mão de obra do serviço executado) | `servico-bairro/ServicoCidadePage.tsx`, `TecnicoInformaticaCampoMagro.tsx` | alta |
| 6 | "atendimento rápido" (17 ocorrências) e "receba o técnico ainda hoje" — promessa de prazo sem lastro | `problemaPagesData.ts`, páginas de bairro/serviço-bairro, `SchedulingSection.tsx` | média |
| 7 | "Valor do atendimento Grátis / você só paga se aprovar" — reforço de gratuidade contraditório com o item 4 | `ServicoCidadePage.tsx` | média |
| 8 | Dois falsos positivos do gate de confiança bloqueando o CI | `ferramentasTecnicas.ts:681`, `glossarioTecnico.ts:974` | baixa |

## 3. Correções realizadas

1. **`AGENTS.md` criado** com domínio, marca, branch, fluxo issue → branch → PR →
   validação → merge, proibições (URLs, remoção de conteúdo, páginas locais
   superficiais, avaliações/números inventados), regras de autoria e fontes
   primárias, estrutura obrigatória de conteúdo (fundamento → problema →
   verificação segura → limite → decisão → ferramenta → serviço), distinção
   informativo × comercial, regras de index/noindex/sitemap/canonical e
   obrigação de validação antes de publicar.
2. **`README.md` reescrito**: `REPLACE_WITH_PROJECT_ID` removido; domínio
   canônico explícito; deixa claro que o código vive no GitHub, que o Lovable
   apenas reflete o repositório, que a publicação exige confirmação no ambiente
   de deploy, que build verde não é deploy público e que indexação pelo Google
   não é garantida.
3. **`docs/runbook-deploy.md`** repontado para `otecnicodeinformatica.com.br`
   (título, curls de evidência, pré-voo Cloudflare) e com aviso explícito de que
   a rodada permanece não publicada até a confirmação do deploy.
4. **Diagnóstico**: "gratuito" → "com valor informado antes" nas 4 páginas
   afetadas, alinhado à fonte oficial. **Nenhum valor numérico foi alterado.**
5. **Garantia**: "Garantia em Todos os Serviços" → "Garantia conforme o serviço
   executado"; descrição passa a "Garantia sobre a mão de obra do reparo
   executado, registrada no orçamento".
6. **Prazo/promessa**: "atendimento rápido" → "atendimento conforme
   disponibilidade"; "receba o técnico ainda hoje" → "o horário depende da
   disponibilidade da agenda"; "Valor do atendimento Grátis" → "Valor informado
   antes / Você aprova o valor antes de qualquer execução".
7. **Allowlist do gate de confiança** com justificativa técnica para os dois
   falsos positivos (texto sobre reincidência de queda de Wi-Fi e alerta contra
   desligar o Secure Boot).

17 arquivos de `src/` alterados — apenas copy, sem mudança de rota, dado
estrutural, preço ou funil de WhatsApp.

## 4. Mantido por falta de evidência

- **Preços** (`R$ 99,99`, `R$ 89,99`, `R$ 149,99`, `R$ 299,99`) mantidos como
  estão: a fonte oficial define apenas o piso e o diagnóstico; alterar valores
  específicos exigiria decisão comercial, não auditoria.
- **"Garantia de 90 dias"** mantida — é a regra central vigente
  (`politicaComercial`), reforçada pelo gate `garantia-divergente`.
- **"desde 1998"** mantido — é o ano institucional oficial do gate.
- **Conflitos de copy em páginas históricas** (variações de texto entre bairros)
  mantidos: são redações diferentes da mesma política, não divergência de
  política.
- Documentos históricos em `docs/` que citam a marca de origem foram
  preservados como registro da migração; não são documentação operacional.

## 5. Riscos pendentes

1. `npm run validate:jsonld` depende de `dist/index.html` estático, que não
   existe no build SSR (Nitro). O gate precisa ser portado para o harness SSR
   (`scripts/lib/ssr-harness.mjs`) — hoje é um falso bloqueio, não uma
   regressão de schema.
2. Preços continuam hardcoded em páginas de serviço × bairro; a centralização
   em `commercialConfig` exige rodada própria de refatoração (fora do escopo,
   por risco de alterar valor por suposição).
3. Copy de garantia ainda tem redações múltiplas entre verticais; a
   consolidação em componente único fica para rodada de arquitetura de copy.

## 6. Validações executadas

| Comando | Resultado |
| --- | --- |
| `npm run build` | ✅ built in 7.16s + postbuild (`seo-inventory`: 221 URLs, 0 avisos) |
| `npm test` | ✅ 46 arquivos / **855 testes** aprovados |
| `npm run check:route-tree` | ✅ 476 arquivos de rota cobertos |
| `npm run check:editorial-governance` | ✅ fail-closed OK (190 artigos, 63 aprovados, sitemap 221 URLs) |
| `npm run check:national-authority-map` | ✅ 17 tópicos, 9 decisões, mapa válido |
| `npm run check:interlinks-quality` | ✅ 75 links em 15 páginas, 0 avisos |
| `npm run check:internal-links` | ✅ 0 links quebrados (475 rotas, 229 URLs de sitemap) |
| `npm run check:trust-claims` | ✅ nenhum claim não comprovável |
| `npm run validate:jsonld` | ⚠️ **bloqueado** — script exige `dist/index.html`, inexistente no build SSR (ver risco 1) |

## 7. Verificações finais

- Nenhuma rota, slug ou canonical alterado (`check:route-tree` e
  `check:internal-links` estáveis, sitemap segue com 221 URLs curadas).
- Domínio canônico confirmado: `https://otecnicodeinformatica.com.br`
  (`src/lib/config/domain.ts`).
- Nenhuma avaliação, depoimento, número de clientes ou credencial adicionada.
- Nenhuma página de bairro, cidade ou serviço criada.
- Funil de WhatsApp intocado (testes de integração do funil seguem verdes).

## 8. Publicação

Alterações ficam no repositório. **A publicação pública não foi disparada nesta
rodada** — build verde não é deploy: a confirmação precisa ocorrer no ambiente
de deploy. Indexação pelo Google segue não garantida.
