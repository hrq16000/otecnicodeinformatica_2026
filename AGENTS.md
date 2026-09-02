# AGENTS.md — O Técnico de Informática

Contrato operacional para qualquer agente (humano ou automatizado) que
trabalhe neste repositório. Vale para todas as rodadas.

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
