---
name: Ambiente local e canal de contato único
description: Stack local via supabase/config.local.toml + seed.sql + .env.local.example + dev:local/functions:serve; mocks de dev; gate check:contact-leak proibindo CNPJ/e-mail/tel na UI.
type: feature
---
- Backend local (Docker): `supabase start --config supabase/config.local.toml`. `supabase/config.toml` é gerenciado pela plataforma e **não** pode ser editado.
- `supabase/seed.sql` cria admin de teste `admin@local.test` / `admin123456` e configs iniciais (guardado por `to_regclass`, nunca quebra se a tabela não existir).
- `.env.local.example` → `.env.local`; scripts `npm run dev:local` e `npm run functions:serve`. Guia em `LOCAL_SETUP.md`.
- Integrações externas em desenvolvimento passam por `src/lib/devMocks.ts` (`withDevMock`): apenas `console.log`, retorno simulado, zero rede. Aplicado em `src/lib/indexNow.ts`.
- Gate `npm run check:contact-leak` (`scripts/check-contact-leak.mjs`, no CI): falha se `src/components` ou `src/pages` expuserem CNPJ formatado, `mailto:`, `tel:` ou e-mail literal. Contato só pelo fluxo de triagem/WhatsApp — o formulário de coleta não pede e-mail.
- `npm run report:vitals-b2b` mede LCP/INP/CLS das rotas empresariais agrupadas por cidade (`reports/vitals-b2b.{md,json}`).
