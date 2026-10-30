# Validadores editoriais — 29 de outubro de 2026

## Resultado

Correção local dos leitores usados por `check:content-intent` e `check:editorial-technical-review`, na base `6bbcd0c8`. Relacionada à validação pendente da issue #397.

Nenhuma alteração em conteúdo, URLs, canonicals, dados estruturados, indexabilidade, preços ou thresholds. Os arquivos pendentes da worktree principal foram preservados.

## Causas e correções

1. O gate de intenção lia apenas `blogPostsContent.tsx`, enquanto a página compõe base, suplementares e programáticos nessa ordem. O novo leitor usa a AST TypeScript sem executar TSX e respeita essa precedência.
2. O gate aceitava apenas `to="..."`. O novo leitor reconhece links JSX `to` e `href`, incluindo expressões literais; ignora comentários, texto e metadados fora do corpo. Links HTML literais nas definições programáticas também são reconhecidos.
3. O gate de fontes mantinha uma allowlist reduzida e duplicada. Agora lê o array literal `ALLOWED_SOURCE_HOSTS` da fonte editorial oficial, sem modificar nem ampliar essa lista.

## Validação executada

- `node --test scripts/lib/editorial-static-catalog.test.mjs`: 5/5 aprovados, incluindo precedência, links falsos em comentários/metadados, definições programáticas, rejeição de hosts não autorizados e falha fechada em declarações inválidas.
- `npx vitest run src/lib/__tests__/blogSupplementalPosts.test.ts src/lib/__tests__/blogProgrammaticGovernance.test.ts`: 25/25 aprovados.
- `git diff --check`: aprovado.
- `node scripts/check-content-intent.mjs`: bloqueado por 47 pontes ausentes na versão vencedora dos artigos. Antes da correção eram reportadas cinco falhas, incluindo quatro falsos artigos ausentes; os links nas versões substituídas não representam o corpo renderizado e deixam de satisfazer o gate.
- `node scripts/check-editorial-technical-review.mjs`: bloqueado por sete URLs em cinco hosts não cadastrados na allowlist canônica: `www.gnu.org`, `www.seagate.com`, `www.amd.com`, `br.msi.com` e `download-2.msi.com`.

Essas falhas restantes não foram suprimidas. A etapa seguinte deve revisar as pontes por intenção, e classificar as fontes restantes com evidência; não adicionar links ou hosts indiscriminadamente para produzir um resultado verde.

Não foram executados novamente build completo, SSR, acessibilidade ou deploy:check nesta micro-rodada. A aprovação dos testes específicos não equivale à aprovação global ou à publicação.

## Continuidade e publicação

A worktree `portal-content` e o objeto Git `4a29ded7`, mencionados na rodada anterior, não foram encontrados no ambiente disponível. O guia Windows 11 não foi declarado recuperado nem reenviado.

Branch desta correção: `fix/editorial-intent-resolver-20261029`. Nenhum push, PR, merge ou deploy foi realizado: o bloqueio anterior de envio ao GitHub exige autorização explícita antes de uma nova tentativa. O PR #396 foi consultado por leitura e continuava aberto, sem merge.
