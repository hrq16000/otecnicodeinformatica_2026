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
