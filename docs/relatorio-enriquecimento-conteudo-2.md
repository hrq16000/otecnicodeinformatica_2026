# Micro-Rodada Enriquecimento de Conteúdo 2 — Serviços

Objetivo: transformar páginas comerciais rasas em páginas de apoio à decisão,
**sem criar URLs novas** e sem alterar canonical, robots ou indexabilidade.

## 1. Auditoria e seleção

Base: `docs/inventario-servicos.md` (16 rotas, todas nota A, porém com volumes
muito desiguais). Critério de seleção: menor densidade de conteúdo próprio e
maior distância entre a intenção comercial e o conteúdo de decisão oferecido.

| Rota selecionada | Palavras (antes) | Owner de intenção |
| --- | --- | --- |
| `/servicos/pc-gamer` | 1038 | Desempenho e manutenção de máquina de jogo |
| `/servicos/recuperacao-de-dados` | 1078 | Preservação e recuperação de arquivos |
| `/servicos/manutencao-de-notebook` | 1239 | Manutenção de portáteis |
| `/servicos/manutencao-de-computador` | 1252 | Manutenção de desktop |
| `/servicos/formatacao` | 1283 | Reinstalação de sistema |
| `/servicos/remocao-de-virus` | 1398 | Limpeza e segurança do sistema |

Páginas em coorte de observação (Local 2, Discovery 1, National 9B) e os
clusters `/problemas`, `/solucoes` e `/equipamentos` ficaram intocados.

## 2. O que foi adicionado por página

- **Resposta rápida** — resposta direta e honesta antes do conteúdo comercial,
  explicitando o que o serviço **não** resolve.
- **Tabela sintoma → causa → o que verificar** — orienta a decisão antes da
  contratação, com títulos próprios em cada página (nada de template).
- **Blocos de decisão** — checklists de pré-requisitos, comparação entre
  caminhos alternativos (formatar × restaurar × reset), limites do serviço,
  expectativa realista e critérios de urgência.

Nenhum preço novo foi criado: os valores continuam vindo da fonte única
(`precosConfig` / `siteConfig`) e nenhuma promessa de resultado foi adicionada
(especialmente em recuperação de dados, onde o texto declara explicitamente que
não há garantia de sucesso).

## 3. Implementação

- `src/lib/enriquecimentoServicos.ts` — conteúdo autoral por slug, tipado com
  `EnriquecimentoConteudo` (reaproveita a Enriquecimento 1).
- `src/components/servico/ServicoLandingLayout.tsx` — renderização condicional:
  resposta rápida logo após o hero e tabela + blocos antes da política/FAQ.
  Páginas sem entrada no mapa seguem exatamente como estavam.
- `e2e/servicos-enriquecimento.spec.ts` — novo spec.

## 4. Gates e testes

| Verificação | Resultado |
| --- | --- |
| `check:cannibalization` | ✓ nenhuma canibalização P0 (2 avisos pré-existentes de title/description) |
| `check:content-intent` | ✓ 7 URLs, 7 pares tema × intenção únicos |
| SSR real (`curl /servicos/pc-gamer`) | ✓ resposta rápida, tabela e blocos presentes no HTML servido |
| `e2e/servicos-enriquecimento.spec.ts` | ✓ 14/14 (chromium + mobile) |

O spec cobre: unicidade de `#resposta-rapida`, `#tabela-diagnostica` e `h1`,
volume mínimo da resposta rápida, mínimo de 4 linhas na tabela e ausência de
eventos GA4 duplicados (`wa_funnel_open`, `triage_start`, `wa_click`) por clique
no CTA.

## 5. Próximo passo

Rodar `npm run inventory:servicos` após o próximo build para registrar o novo
volume das 6 rotas e observar no Search Console, sem novas URLs, se as páginas
enriquecidas ganham impressões em consultas de decisão ("vale a pena formatar",
"formatar deixa mais rápido", "posso recuperar arquivo depois de formatar").
