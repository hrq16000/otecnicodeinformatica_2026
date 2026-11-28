# AGENTS.md — O Técnico de Informática

Contrato operacional para qualquer agente (humano ou automatizado) que
trabalhe neste repositório. Vale para todas as rodadas.

- SEO journey reporting uses authenticated, role-checked reads and explicit lead-to-order links; never infer an order from a WhatsApp click or match personal text.
- Native milestone events are emitted in successful existing handlers without identifiers or personal data; internal telemetry remains a separate, bounded reporting source.
- Browser analytics tests must mark their navigation with QA UTMs so administrative commercial counts exclude automated test traffic without deleting history.
- Order progress metrics use persisted transition timestamps and separate started from completed; status writes compare the previous state to avoid counting stale concurrent edits.
- Administrative order creation copies journey and origin only from the confirmed lead after role validation; QA leads cannot create commercial orders, and dashboards refresh while visible.
- Daily completion and duration metrics use the first valid persisted milestone per order in São Paulo time; recent activity uses existing events, not heartbeats or claims of online presence.
- Order replies are public order updates persisted in the existing timeline through an admin-checked server function; first-response metrics use replies, not status changes, and timeline writes compare updated_at to prevent lost replies.
- Journey page views and WhatsApp clicks use separate bounded reads so click bursts cannot displace the visit denominator; report truncation explicitly.
- Per-visit paths use ordered existing events and first-entry attribution; name a search provider only from recorded evidence, deduplicate event IDs, and strip query/hash from displayed paths to avoid leaking personal parameters.
- Persist acquisition source and medium separately from CTA location; preserve explicit QA and do not repair ambiguous legacy attribution by guessing. Completion rates count distinct eligible visits with confirmed lead links and valid persisted completion milestones; suppress rates on partial or small samples.

## 1. Identidade do projeto

| Item | Valor |
| --- | --- |
| Marca oficial | **O Técnico de Informática** |
| Domínio principal | **https://otecnicodeinformatica.com.br** |
| Branch principal | **main** |
| Fonte única de marca/domínio | `src/lib/siteConfig.ts` + `src/lib/config/*` + `scripts/lib/site-env.mjs` |
| Contato | Somente WhatsApp (número canônico via `VITE_WHATSAPP_NUMBER`, nunca em texto visível) |

Domínios de outras marcas do ecossistema (`tecnico.curitiba.br`,
`tecnicocuritiba.com.br`, `precisodeumtecnico.com`, `mestredosservicos.com.br`)
são **proibidos** em código, conteúdo ou documentação operacional. O gate
`npm run check:brand-isolation` bloqueia reincidência.

## 2. Fluxo de trabalho obrigatório

```
issue → branch → PR → validação (build + gates) → merge em main
```

- Nada entra em `main` sem PR validado.
- Commit apenas das alterações da rodada em curso.
- Build verde **não** é deploy público (ver seção 7).
- Em triagem de segurança, autenticação, RLS, segredos ou achados de PR, aplicar `.agents/skills/security-evidence-triage/SKILL.md` como método complementar, sem substituir `SECURITY.md` nem os gates.

## 3. Proibições permanentes

- Alterar, renomear ou remover URLs, slugs, rotas ou canonicals existentes sem aprovação explícita.
- Apagar conteúdo publicado.
- Criar páginas locais superficiais, duplicadas ou geradas em massa (bairro × serviço).
- Inventar avaliações, estrelas, `aggregateRating`, número de clientes, percentuais de sucesso, depoimentos, certificações ou credenciais.
- Copiar conteúdo de outros portais.
- Usar imagens geradas por IA (gate `npm run check:ai-images`).
- Inserir CTA comercial dentro de conteúdo puramente educativo.
- Alterar preços, prazos ou garantia sem a fonte oficial (`src/lib/config/commercial.ts`, `src/lib/politicaComercial.ts`).

## 4. Regras editoriais

- **Autoria e revisão**: responsabilidade técnica declarada em `src/lib/gestorResponsavel.ts`. Autoria/revisão só aparecem quando o conteúdo realmente as sustenta.
- **Fontes primárias**: Microsoft Learn/Support, CISA, CERT.br, NIST, documentação de fabricante. Referenciar, nunca copiar.
- **Provas**: só entram em `src/lib/eeatProofs.ts` com origem verificável (ver `docs/eeat-governance.md`). Sem prova, o bloco não renderiza — placeholder é proibido.
- **Linguagem factual e condicional** quando não houver prova:
  - "atendimento local mediante disponibilidade";
  - "garantia conforme o serviço executado";
  - "prazo informado após avaliação";
  - "tentativa de recuperação, sem garantia de resultado".
- Nunca recomendar desativação permanente de proteções (Secure Boot, antivírus, UAC).

### Estrutura de conteúdo (obrigatória em página informativa)

```
fundamento → problema → verificação segura → limite → decisão → ferramenta → serviço
```

O bloco de serviço é o último e é opcional; o valor da página precisa existir
sem ele.

### Informativo × comercial

| Tipo | Objetivo | CTA |
| --- | --- | --- |
| Informativo (blog, glossário, ferramentas, guias de decisão, Atlas) | ensinar e permitir decisão autônoma | ponte contextual discreta, no fim |
| Comercial (serviços, cidades, bairros, landing) | qualificar e converter | CTA de WhatsApp permitido |

Uma página = uma intenção principal. Não misturar.

## 5. Indexação

- `index` apenas para páginas com conteúdo próprio e intenção única.
- `noindex` para variações locais fracas, shells, painéis `/admin/*` e páginas sem densidade.
- Sitemap é **curado e fail-closed** (`scripts/lib/curated-urls.mjs` + `scripts/sitemap-dynamic.mjs`); nada entra manualmente.
- Canonical sempre absoluto no domínio principal, derivado de `src/lib/config/domain.ts`.
- Sem env configurada, o recurso fica desligado (noindex, sitemap vazio) — nunca fallback herdado.

## 6. Validação antes de publicar

Obrigatório e bloqueante — três comandos oficiais, nesta ordem:

```sh
npm run verify        # lint, testes, rotas, links, órfãs, marca, E-E-A-T, segurança
npm run build         # prebuild + vite build (SSR) + postbuild
npm run deploy:check  # robots, GEO, schema.org, JSON-LD, imagens, indexação
npm run test:a11y     # quando o ambiente de browser estiver disponível
```

Detalhes, flags e lista de passos: `docs/comandos-oficiais.md`.
Os passos ficam em `scripts/pipelines.config.mjs` (fonte única). Todos os
scripts individuais (`check:*`, `report:*`) continuam disponíveis para
diagnóstico pontual.


## 7. Publicação

- O código é mantido no **GitHub**; `main` é a referência.
- O Lovable **pode refletir** alterações do repositório, mas isso não é deploy.
- A publicação pública exige confirmação no ambiente de deploy (Publish/Cloudflare).
- **Build verde ≠ site publicado.**
- Indexação pelo Google **não pode ser garantida**: IndexNow e submissão ao Search Console são pedidos, não promessas.

## 8. Preços, garantia e promessas (fonte única)

Fonte oficial: `src/lib/config/commercial.ts` (+ `src/lib/politicaComercial.ts`).
Nenhum valor, prazo ou condição pode ser redigitado em página, PDF ou schema.

| Item | Valor oficial |
| --- | --- |
| Valor mínimo / diagnóstico | R$ 99,99 |
| Diária profissional (rede) | não incentivar abaixo de R$ 200 (não é preço de serviço pontual) |
| Anuidade de parceiro | R$ 49,99/ano (configurável) |
| Garantia | mão de obra do serviço executado, registrada no orçamento aprovado; peças seguem a garantia do fornecedor |
| Prazos | informados no diagnóstico, conforme peça e complexidade |
| Pagamentos | PIX, crédito, débito, dinheiro |
| Deslocamento | até 15 km conforme modalidade; R$ 2,00 por km excedente, informado antes |

Ressalva obrigatória em qualquer preço exibido: o valor final varia conforme
equipamento, urgência, deslocamento, complexidade, peças e condição real.

**Proibido**: avaliação, estrela, `aggregateRating`, depoimento, número de
clientes, percentual de sucesso, certificação ou parceria sem evidência
verificável. Gate: `npm run check:trust-claims`.

## 9. Governança de afirmações (E-E-A-T)

- Ledger: `config/trust-claims-ledger.json` — fonte única da classificação
  (COMPROVADA · INSTITUCIONAL · CONDICIONAL · REMOVIDA · PENDENTE).
- Inventário: `npm run report:afirmacoes` → `src/data/trustClaimsAudit.json`,
  com o cruzamento afirmação × URL do sitemap curado.
- Painel: `/admin/afirmacoes` (leitura/acompanhamento; classifica-se no ledger).
- Gates: `check:trust-claims` (bloqueia claim proibido) e `check:afirmacoes`
  (bloqueia inventário desatualizado). Ambos rodam em `npm run verify`.
- Depoimentos reais entram apenas por `/admin/reviews`, com autorização do
  cliente e aprovação editorial antes de qualquer publicação.

## 10. Critérios de publicação editorial

Uma página só é publicada como `index` quando cumpre **todos** os itens:

1. Intenção única e declarada; não canibaliza URL existente.
2. Conteúdo próprio e verificável, na estrutura
   fundamento → problema → verificação segura → limite → decisão → ferramenta → serviço.
3. Fontes primárias citadas (Microsoft Learn/Support, CISA, CERT.br, NIST,
   fabricante) — referenciadas, nunca copiadas.
4. Autoria/revisão coerentes com `src/lib/gestorResponsavel.ts`.
5. Capa real licenciada (sem IA) com crédito quando exigido.
6. Interlinks bidirecionais com entidade, problema, ferramenta, serviço e cidade
   correspondentes; zero órfãs.
7. JSON-LD válido no HTML SSR e URL entrando pelo sitemap curado (fail-closed).
8. `npm run verify` + `npm run build` + `npm run deploy:check` em verde.

Página local (bairro/cidade) só existe com conteúdo próprio e demanda real
comprovada no Search Console. Variação superficial permanece `noindex` e fora
do sitemap.

## Adoção visual de referências externas (17/11/2026)

- **TasteSkill** (https://www.tasteskill.dev/): usar como referência crítica de direção de arte, identidade, hierarquia e layout; preservar a marca e criar composição original.
- **Transitions.dev** (https://transitions.dev/): adotar microtransições CSS pontuais em menus, filtros, modais e feedback; respeitar teclado, foco, contraste e `prefers-reduced-motion`. Evitar `transition: all`.
- **React Bits** (https://reactbits.dev/): avaliar componentes React gratuitos individualmente e verificar licença MIT + Commons Clause, dependências e custo de hidratação. Sem instalação em massa ou uso de Pro não licenciado.
- **RiseClub** (https://riseclub.tech/): somente benchmark de comunidade, trilhas, notícias e engajamento; nunca copiar conteúdo, interface, imagens ou dados.
- Aplicação específica: Home, /servicos, /empresas e seções de contexto. Priorizar imagens reais licenciadas; não usar IA, prova social fictícia nem animação que retarde LCP ou indexação. Preservar a separação editorial/comercial e os gates visuais existentes.
- Implementar em micro-PR própria, medir 390/1440 e preservar SEO, SSR (se houver), LCP, segurança, privacidade, funis e conteúdo factual. Nenhuma regra aqui autoriza mexer em produção, banco, RLS, DNS ou pagamentos.

## Padrão universal de contato e seleção contextual (27/11/2026)

- **Privacidade e identidade:** não publicar faixas decorativas de “Informações de contato” com e-mail operacional, cidade/endereço da operação, nome institucional antigo (Ping Soluções) ou cartões redundantes. Usar a marca própria do projeto e o canal/funil oficial existente. Não substituir a razão social por um nome inventado: aguardar a nova identidade confirmada. Distinguir informação promocional de identificação legal obrigatória, requisitos do comércio, privacidade/LGPD, endereço de cliente/loja autorizado e área geográfica de atendimento/SEO; preservar contratos e dados privados, sem alterar CNPJ, termos, integrações ou dados de terceiros por inferência.
- **Funil contextual em popup:** em CTAs de atendimento, orçamento, suporte, indicação ou cadastro, abrir o fluxo canônico sobre a página de origem (dialog/modal acessível, sheet no mobile quando adequado). Não navegar para uma página de contato como caminho comum. Preservar a rota e posição de scroll e capturar origem/posicionamento, especialidade, problema, objetivo, cidade/UF/bairro, modalidade/urgência apenas quando realmente conhecidos pela rota/ação ou selecionados pelo visitante. Reaproveitar contexto existente; não perguntar novamente nem obrigar a selecionar o que já foi confirmado. Permitir revisar/corrigir antes do envio. Manter link direto existente como fallback SSR/sem JS ou entrada deliberada, sem duplicar funil. Foco inicial e retorno ao gatilho, Escape, scroll interno, acessibilidade/teclado e reduced-motion; não perder rascunho por fechamento acidental.
- **Seleção inteligente universal:** para campos de escolha pesquisáveis (objetivo, especialidade, categoria, município, UF/bairro, serviço/produto, filtros e seletores administrativos compatíveis), permitir digitação + sugestões/autocomplete + seleção; não exigir percorrer catálogos extensos. Preferir componente combobox acessível já existente ou nativo comprovado; busca tolerante a caixa/acentos e sinônimos do catálogo, resultados priorizados e limitados, grupos quando úteis, estados vazio/loading/erro, navegação ↑/↓/Enter/Escape, toque e foco. Escolha automática somente quando correspondência inequívoca e confirmável, sem fingir decisão do visitante; guardar IDs canônicos, texto livre apenas onde permitido, e opção “Outro”/manual. Para escolhas pequenas, priorizar clareza e interação simples; quando compatível, permitir digitar. Preservar validação no servidor, catálogos, permissões, consentimento e contratos de checkout.
- **Contexto e dados:** prioridade = escolha explícita do visitante > contexto inequívoco da página/gatilho > defaults seguros; nunca sobrescrever edição ou inferir cidade/especialidade desconhecida. Origem imutável da abertura, UTM/atribuição sanitizadas; não incluir respostas, endereço, e-mail, telefone, dados privados, tokens ou texto livre em URL, analytics ou logs. Não armazenar ou enviar automaticamente; preservar as regras locais existentes de persistência autorizada, preços, revisão, consentimento e canal oficial.
- **QA/GO:** 390/768/1440 + teclado, reduced-motion, texto longo, lista de 100+ itens, pesquisa com/sem acento, vazio, seleção/auto-preenchimento explícito, edição/retorno, abrir/fechar na origem, contexto de serviço/cidade/problema e quatro intenções aplicáveis; nenhum envio real em QA. Preservar SSR, canonical, sitemap, SEO, LCP, acessibilidade, segurança, regras comerciais e isolamento por marca.
- **Execução:** norma permanente, não implementação estrutural automática. Inventariar os seletores/CTAs existentes, reutilizar a triagem/modal/combobox realmente compatível, integrar em micro-PR própria por projeto na futura rodada dedicada e publicar só com gates locais e confirmação. Não instalar dependências nem rodar agente/fila/Max do Lovable para esta documentação.

## Contrato de evolução do motor de atendimento e CRM (28/11/2026)

- Norma permanente e plano pós-ciclo visual: [docs/CONTRATO_MOTOR_ATENDIMENTO_E_CRM.md](docs/CONTRATO_MOTOR_ATENDIMENTO_E_CRM.md). Regras de cidade/bairro/UF contextual, classificação de modalidade, evidência necessária, persistência privada antes do WhatsApp, Google Sheets/CRM e CTA acessível. Respeitar o perfil local e os contratos vigentes. Registro documental; execução somente após concluir o ciclo visual atual.

## Contrato de SEO, descoberta por IA e inteligência comercial — Rodadas 21–30 (28/11/2026)

- Norma permanente: [docs/CONTRATO_SEO_CONHECIMENTO_IA.md](docs/CONTRATO_SEO_CONHECIMENTO_IA.md). Executar em micro-rodadas, começando por imagens sociais/metadata; depois Schema.org com auditoria, SEO técnico, conhecimento, preços reais, recomendações, simulador, analytics, autoridade temática e consolidação. Respeitar a aderência local, privacidade, dados reais, gates atuais e autorização específica de custos. Documentação não equivale a alteração funcional, merge, deploy, indexação ou recomendação por IA.
