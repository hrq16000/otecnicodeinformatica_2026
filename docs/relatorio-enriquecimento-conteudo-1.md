# Micro-Rodada Enriquecimento de Conteúdo 1

Data: 2026-08-24 (UTC) · Stack: TanStack Start (SSR) · Base local: `http://localhost:8080`

## 1. Escopo e regras

- Nenhuma URL nova, nenhuma alteração de canonical, robots, sitemap ou indexabilidade.
- Páginas em coorte de observação (Local 2, Discovery 1, National 9B) **não foram tocadas**.
- Blocos são opcionais e por página: componentes compartilhados, conteúdo exclusivo.

## 2. Páginas selecionadas (as mais superficiais dos três clusters)

| URL | Palavras SSR antes | Palavras SSR depois | Blocos adicionados |
| --- | --- | --- | --- |
| /problemas/arquivos-apagados | ~823 | 2388 | Resposta rápida · tabela diagnóstica · urgência real · lógico × físico · expectativa |
| /problemas/wifi-instavel | ~969 | 2691 | Resposta rápida · tabela diagnóstica · Wi-Fi × internet · glossário de rede |
| /solucoes/ssd | ~550 | 1700 | Resposta rápida · SATA × NVMe · o que muda/não muda · decisão reparar × substituir |
| /solucoes/backup | ~550 | 1746 | Resposta rápida · o que protege · 3-2-1 na prática · teste de restauração |
| /equipamentos/notebook | ~680 | 1950 | Resposta rápida · tabela diagnóstica · verificações seguras · upgrades · reparar × substituir |
| /equipamentos/roteador | ~680 | 1931 | Resposta rápida · tabela diagnóstica · operadora × próprio · fim de vida útil |

Contagem "depois" medida no HTML SSR real servido pelas rotas.

## 3. Implementação

- `src/lib/enriquecimento.ts` — tipos dos blocos opcionais.
- `src/lib/enriquecimentoConteudo.ts` — conteúdo autoral por caminho canônico (fonte única).
- `src/components/BlocosEnriquecimento.tsx` — `RespostaRapida`, `TabelaDiagnosticaBloco`, `BlocosTecnicos`.
- Renderização condicional em `ClusterProblemaPage`, `ClusterSolucaoPage` e `ClusterEquipamentoPage`.

Sem imagens novas (regra de zero IA preservada) e sem promessas de resultado garantido.

## 4. Gates

| Gate | Resultado |
| --- | --- |
| `tsgo --noEmit` | ✓ |
| Snapshot SSR (159 rotas) | ✓ |
| `check-cross-cluster-similarity` | ✓ 80 páginas, máx 0.071 |
| `check-intent-collisions` | ✓ 1034 pares, 0 colisão |
| `check:internal-links` | ✓ 0 link quebrado |
| `check:orphan-pages` | ✓ 0 órfã, 0 slug duplicado |
| Vitest `unit` | ✓ 701/701 |
| Playwright `cta-prehidratacao` | ✓ 4/4 (desktop + mobile) |

## 5. Infraestrutura adicionada nesta rodada

- `e2e/cta-prehidratacao.spec.ts` agora roda em desktop e mobile; o Consent Mode
  (`e2e/consent-mode.spec.ts`) já cobria Aceitar/Recusar nos dois viewports.
- `/status` passou a informar **quem respondeu** (origem, origem via CDN, CDN em cache
  com idade) além da comparação bundle × manifesto.
- `scripts/smoke-pos-deploy.mjs` + `npm run smoke:pos-deploy`: valida manifesto,
  `__APP_VERSION__` no HTML, 200 e conteúdo das URLs críticas, com a camada de borda
  registrada. Executado pelo workflow `Smoke pós-deploy`.
