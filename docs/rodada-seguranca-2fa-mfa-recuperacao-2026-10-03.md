# Rodada Segurança — 2FA/MFA e recuperação — 2026-10-03

## Escopo

- Issue: #104.
- URL preservada: `/blog/como-configurar-2fa-em-tudo`.
- Pilar: Segurança e identidade.
- Intenção: orientar a escolha, ativação, recuperação e troca de dispositivo sem transformar o guia em página comercial.

## Revisão editorial

- preservada a data original de publicação (`2026-04-20`);
- revisão técnica atualizada para `2026-10-03`;
- removidas listas de produtos, periodicidade arbitrária e afirmações absolutas;
- separados 2FA e MFA;
- comparados SMS, TOTP, confirmação no aplicativo e autenticadores FIDO;
- recuperação e método reserva posicionados antes da ativação;
- incluídos teste de entrada, troca/perda do celular e critérios de parada;
- CTA comercial não foi adicionado; permanecem apenas pontes editoriais para recuperação de conta e segurança de Wi-Fi empresarial.

## Fontes primárias

- CISA — Require Multifactor Authentication: <https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/require-multifactor-authentication>
- NIST SP 800-63B-4 — Authenticator and Verifier Requirements: <https://pages.nist.gov/800-63-4/sp800-63b/authenticators/>

## Dados estruturados e SSR

A inspeção do HTML SSR da rota confirmou:

- título visível e `headline`: `Como Configurar 2FA e MFA sem Perder o Acesso`;
- `datePublished`: `2026-04-20T08:00:00-03:00`;
- `dateModified`: `2026-10-03T08:00:00-03:00`;
- cinco perguntas visíveis;
- cinco entidades `Question` no `FAQPage`, em paridade 1:1;
- oito blocos JSON-LD na página.

## Validações

| Validação | Resultado |
| --- | --- |
| Testes executados pelo `npm run verify` | 56 arquivos e 930 testes aprovados |
| `npm run test:unit` após a consolidação na fonte canônica | 54 arquivos e 923 testes aprovados |
| `npm run build` | aprovado |
| `npm run check:promocao-index` em 2026-10-05 | a rota revisada superou o mínimo de 700 palavras; o comando ainda bloqueia por 11 promoções herdadas de outras rotas |
| `npm run check:internal-links` | aprovado; nenhum link quebrado |
| Inspeção SSR da rota | aprovada |
| `npm run verify` completo | bloqueado por 9 claims herdados fora do escopo |
| `npm run deploy:check` completo | bloqueado por 53 H2 duplicados herdados em outras rotas |
| `npm run check:editorial-governance` | bloqueado por passivo global anterior à rodada |
| `npm run check:editorial-technical-review` | bloqueado pela allowlist global de fontes, inclusive NIST |
| `npm run validate:jsonld` isolado | sem servidor SSR; validação específica feita sobre o HTML gerado pelo deploy check |

Os limites dos gates não foram reduzidos. Nenhum bloqueio listado foi introduzido pelos arquivos editoriais desta rodada.

## Arquivos editoriais alterados

- `src/data/blogPostsContent.tsx`
- `src/components/BlogPostFAQ.tsx`
- `src/lib/blogEditorialRegistry.ts`
- `src/lib/blogEditorialSources.ts`
