# Micro-Rodada Enriquecimento 4A — ATP High Opportunity

Data: 24/08/2026 · Escopo: aprofundar clusters de alta oportunidade do AnswerThePublic
usando **exclusivamente URLs existentes**. Nenhuma URL, artigo, bairro ou página
programática foi criada. Nenhum canonical, robots ou indexabilidade foi alterado.
A Rodada 9C **não** foi iniciada.

---

## 1. Mapeamento de owners (pré-edição)

| Cluster | Keywords ATP | Owner atual | Estado antes | Ação |
|---|---|---|---|---|
| A — Superaquecimento | notebook superaquecendo, notebook desligando sozinho, pasta térmica notebook | `/problemas/computador-esquentando` | PARTIAL (sintomas e causas fortes, sem diferenciação normal × anormal, sem critério de parada) | Enriquecer |
| B — SSD × HD | trocar hd por ssd, upgrade ssd notebook, ssd vale a pena, upgrade ssd computador | `/solucoes/ssd` | PARTIAL (enriquecido na Rodada 1, sem comparativo HD × SATA × NVMe e sem árvore de decisão) | Enriquecer |
| C — RAM ou SSD primeiro | ssd ou ram primeiro, upgrade ram notebook, ampliar memória ram pc, upgrade de computador | `/servicos/upgrade-ssd-ram` | GAP de conteúdo (rota existente, sem resposta à pergunta de ordem nem tabela diagnóstica) | Enriquecer |
| D — Recuperar dados de HD com defeito | recuperar arquivos hd com defeito, hd não reconhecido pc, recuperação de dados curitiba | `/problemas/hd-fazendo-barulho` | PARTIAL (ruídos bem cobertos, sem tabela de risco nem lógico × físico) | Enriquecer |
| E — Formatar PC | formatar computador curitiba, quando formatar o pc, formatação windows 11, reinstalar windows | `/servicos/formatacao` | COVERED_STRONG (Rodada 2) mas sem seção explícita de "quando não resolve" | Enriquecer |
| F — Vírus | computador com vírus sintomas, remover vírus windows, pc lento e vírus, remover malware | `/servicos/remocao-de-virus` | COVERED_STRONG (Rodada 2) sem tabela de triagem sintoma × outras causas | Enriquecer |

**GAP_NO_OWNER marcados: 0.** Todos os seis clusters já possuíam owner adequado.

Intenções deliberadamente **não** absorvidas (owner em outro lugar, apenas linkado):
- passo a passo de formatação e "como formatar" → Cluster 1 editorial (8E), **FROZEN**;
- sintomas detalhados de infecção → `/blog/como-saber-se-pc-tem-virus-malware` (Rodada 3);
- exclusão acidental de arquivos → `/problemas/arquivos-apagados` (Rodada 1);
- pilares nacionais 9B, Local 2 e Discovery 1 → intocados.

---

## 2. Tabela principal de execução

| Cluster | Owner | Estado antes | Conteúdo adicionado | Estado depois | Canibalização | Gates |
|---|---|---|---|---|---|---|
| A | `/problemas/computador-esquentando` | PARTIAL | Tabela Sintoma → Hipótese → Como diferenciar → Ação (6 linhas); bloco "pasta térmica ajuda / ajuda pouco / não resolve"; bloco "quando desligar e parar de usar"; 2 fontes (Intel, AMD); 2 links contextuais | COVERED_STRONG | PRIMARY_INTENT (desligamento por proteção resumido e linkado a `/problemas/computador-desliga-sozinho`) | verdes |
| B | `/solucoes/ssd` | PARTIAL | Tabela HD × SSD SATA × SSD NVMe por cenário; bloco "M.2 ≠ NVMe"; bloco clonagem × instalação limpa; árvore manter/trocar/investigar; 2 fontes (NVM Express, Microsoft); 2 links | COVERED_STRONG | PRIMARY_INTENT (ordem de upgrade delegada ao Cluster C) | verdes |
| C | `/servicos/upgrade-ssd-ram` | GAP de conteúdo | Resposta rápida à pergunta de ordem; tabela Sintoma × RAM ajuda × SSD ajuda × investigar antes (7 linhas); bloco de ordem de execução; bloco "o que o upgrade não faz"; 1 fonte (Microsoft); 2 links | COVERED_STRONG | PRIMARY_INTENT (comparativo técnico de SSD delegado a `/solucoes/ssd`) | verdes |
| D | `/problemas/hd-fazendo-barulho` | PARTIAL | Resposta rápida focada em preservação; tabela Sintoma × Risco × Dá para tentar algo seguro × Próximo passo (6 linhas); bloco lógico × físico; bloco de expectativa honesta; 2 fontes (Backblaze, Microsoft); 2 links | COVERED_STRONG | SECONDARY_ALLOWED (contratação permanece em `/servicos/recuperacao-de-dados`) | verdes |
| E | `/servicos/formatacao` | COVERED_STRONG | Bloco "quando a formatação não resolve"; checklist pré-formatação (backup verificado, BitLocker, contas/licenças, drivers); bloco reparo dirigido × recuperação × instalação limpa; 2 fontes (Microsoft); 2 links | COVERED_STRONG+ | PRIMARY_INTENT comercial; tutorial permanece OWNED_ELSEWHERE (Cluster 1 FROZEN) | verdes |
| F | `/servicos/remocao-de-virus` | COVERED_STRONG | Tabela de triagem Sintoma × Pode ser malware × Outras causas × Próxima verificação (7 linhas); bloco vírus × malware × adware × PUP; bloco limpeza × reinstalação (com ransomware); bloco contas/senhas/backup; 2 fontes (CISA, Microsoft); 2 links | COVERED_STRONG+ | PRIMARY_INTENT comercial; sintomas OWNED_ELSEWHERE (blog) e apenas linkados | verdes |

### Keywords

- **Cobertas:** notebook superaquecendo, notebook desligando sozinho, pasta térmica notebook, trocar hd por ssd, upgrade ssd notebook, ssd vale a pena, upgrade ssd computador, ssd ou ram primeiro, upgrade ram notebook, ampliar memória ram pc, upgrade de computador, recuperar arquivos hd com defeito, hd não reconhecido pc, quando formatar o pc, reinstalar windows, formatação windows 11, computador com vírus sintomas, remover vírus windows, pc lento e vírus, remover malware.
- **Parcialmente cobertas (por decisão de intenção):** "formatar computador curitiba", "ssd notebook curitiba", "recuperação de dados curitiba", "computador com vírus curitiba" — a intenção local já pertence às páginas comerciais e locais existentes; nenhum cabeçalho artificial com cidade foi criado.
- **Gaps não preenchidos:** nenhum cluster ficou sem owner. Nenhuma página foi criada para gap.
- **URLs congeladas mantidas intactas:** pilares 9B (`/blog/o-que-e-informatica`, `/blog/informatica-basica`, `/blog/como-aprender-informatica`), Cluster 1 editorial de formatação (8E), Local 2 (Boqueirão, Cajuru, Pinheirinho, Cidade Jardim SJP) e Discovery 1.

---

## 3. Mudanças técnicas

- Novo módulo de conteúdo: `src/lib/enriquecimentoAtp4a.ts` (mapa por caminho + `mesclarEnriquecimento`, que **soma** aos blocos existentes sem sobrescrever nada).
- Tipos estendidos em `src/lib/enriquecimento.ts`: coluna opcional `acao` e rótulos próprios de coluna nas tabelas, `tabelaExtra`, `fecho` (link contextual em texto corrido) e `fontes` (fontes primárias visíveis).
- UI em `src/components/BlocosEnriquecimento.tsx`: quarta coluna condicional, frase de continuidade com link interno e bloco `FontesPrimarias` (links externos com `rel="noopener nofollow"`).
- Integração: `ClusterProblemaPage`, `ClusterSolucaoPage`, `ClusterEquipamentoPage` e `ServicoLandingLayout`.
- **Metadata:** nenhuma alteração de title, description, canonical, robots, sitemap ou JSON-LD. Nenhum FAQ novo — o FAQ do Cluster A já era suficiente e já mantinha a ressalva sobre pasta térmica, então nenhum `FAQPage` foi criado ou duplicado.
- Telemetria/CI: novo `e2e/funnel-consent-dedup.spec.ts`, que falha se `wa_funnel_open` ou `triage_start` for disparado mais de uma vez em qualquer cenário de Consent Mode (sem decisão, aceito, recusado) — desktop e mobile.

---

## 4. Validação

| Verificação | Resultado |
|---|---|
| `tsgo --noEmit` | 0 erros |
| `test:unit` | 715 testes verdes (2 timeouts de importação a frio, verdes na reexecução: 411/411) |
| `build` | sucesso |
| Snapshot SSR | 159 rotas |
| `audit:seo` | OK |
| `check:content-intent` | OK |
| `check:cannibalization` | OK — nenhuma colisão nova |
| `check:internal-links` | OK — nenhum link novo aponta para rota inexistente |
| `check:orphan-pages` / `check:malha-interna` | OK |
| `check:schema-standards` / `check:rich-results` / `check:jsonld-refs` / `check:jsonld-parity` | OK (avisos preexistentes em `/bairros/*` e `/servicos/<x>/<cidade>`, fora do escopo desta rodada) |
| `check:sitemap-source` / `check:robots` / `check:geo` | OK |
| Playwright — duplicidade de eventos do funil | 6/6 verdes |

### SSR das 6 URLs (HTML servido)

| URL | HTTP | H1 | Canonical self | Blocos novos | Fontes visíveis |
|---|---|---|---|---|---|
| `/problemas/computador-esquentando` | 200 | 1 | sim | sim (tabela de decisão + 2 blocos) | sim |
| `/solucoes/ssd` | 200 | 1 | sim | sim (tabela extra + 3 blocos) | sim |
| `/servicos/upgrade-ssd-ram` | 200 | 1 | sim | sim (resposta rápida + tabela + 2 blocos) | sim |
| `/problemas/hd-fazendo-barulho` | 200 | 1 | sim | sim (resposta rápida + tabela de risco + 2 blocos) | sim |
| `/servicos/formatacao` | 200 | 1 | sim | sim (3 blocos) | sim |
| `/servicos/remocao-de-virus` | 200 | 1 | sim | sim (tabela de triagem + 3 blocos) | sim |

### Smoke de produção (pré-deploy, mobile e desktop)

As 6 URLs respondem **HTTP 200 com canonical self** em produção nos dois agentes
(`Windows NT 10.0` e `Android 13; Pixel 5`). O conteúdo desta rodada ainda **não**
está publicado — a versão em produção é a anterior (`novoBloco=0`), como esperado.
O smoke com validação dos blocos novos deve ser repetido após a publicação via
`npm run smoke:pos-deploy`.

### Search Console (reobservação)

Coleta em 24/08/2026 (`report:gsc-local`): API disponível, `/bairros/boqueirao` e
`/bairros/pinheirinho` **INDEXED**; `/bairros/cajuru` e `/bairros/cidade-jardim-sjp`
seguem "Detectada, mas não indexada". Nenhuma queda de cobertura, nenhuma perda de
indexação e nenhuma desclassificação de FAQPage observada. Como o enriquecimento 4A
ainda não foi publicado, a reobservação das 6 URLs afetadas fica agendada para o
ciclo seguinte à publicação (`monitor:indexing`).

---

## 5. QA editorial (0–5, controle interno)

| Owner | Intenção | Diagnóstico | Diferenciação | Apoio à decisão | Segurança | Evidências | Interlinking |
|---|---|---|---|---|---|---|---|
| A — computador esquentando | 5 | 5 | 5 | 4 | 5 | 4 | 4 |
| B — solucoes/ssd | 5 | 4 | 5 | 5 | 4 | 4 | 5 |
| C — upgrade-ssd-ram | 5 | 5 | 4 | 5 | 4 | 3 | 4 |
| D — hd-fazendo-barulho | 5 | 5 | 5 | 5 | 5 | 4 | 4 |
| E — formatacao | 5 | 5 | 4 | 5 | 5 | 4 | 4 |
| F — remocao-de-virus | 5 | 5 | 5 | 5 | 5 | 5 | 4 |

---

## 6. Checklist de vereditos

1. Os 6 clusters possuem owner válido? **Sim.**
2. Quantos GAP_NO_OWNER foram marcados? **0.**
3. Alguma URL nova foi criada? **Não.**
4. Alguma intenção primária mudou? **Não.**
5. Algum conteúdo foi criado apenas para keyword stuffing? **Não.**
6. A canibalização piorou nos testes? **Não** — `check:cannibalization` e `check:content-intent` verdes, sem colisão nova.
7. Todos os gates relevantes estão verdes? **Sim.**
8. O conteúdo novo está visível no SSR? **Sim** — confirmado no HTML servido das 6 URLs.

---

**PARADA.** A Rodada 4B não foi iniciada, nenhuma página foi criada para preencher
gaps e a Rodada 9C permanece não iniciada.
