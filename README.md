# O Técnico de Informática

Portal técnico de informática. Domínio canônico:
**https://otecnicodeinformatica.com.br**

- Marca oficial: **O Técnico de Informática**
- Branch principal: **main**
- Contrato operacional do repositório: [`AGENTS.md`](./AGENTS.md)
- Runbook de publicação: [`docs/runbook-deploy.md`](./docs/runbook-deploy.md)

## Como o código chega ao ar

1. O código é mantido no **GitHub** (`main` é a referência).
2. O Lovable **pode refletir** alterações do repositório no ambiente de preview.
3. A **publicação pública precisa ser confirmada no ambiente de deploy**
   (Publish → Update, mais o workflow de borda quando houver mudança de rota).
4. **Build verde não é deploy público.** Um build/gates em verde só indica que a
   rodada está apta a ser publicada.
5. **Indexação pelo Google não pode ser garantida.** Submissão de sitemap e
   IndexNow são pedidos de rastreamento, não promessa de indexação.

Não existe deploy automático a partir de push: nenhum merge em `main` publica o
site sozinho.

## Desenvolvimento local

```sh
npm i
npm run dev
```

Requisitos: Node.js e npm ([instalar com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).
Variáveis de ambiente: copie `.env.example` para `.env`. Sem env configurada o
recurso correspondente fica **desligado** (fail-closed), nunca com fallback.

## Validação obrigatória antes de publicar

```sh
npm run build
npm test
npm run check:route-tree
npm run check:editorial-governance
npm run check:internal-links
npm run check:interlinks-quality
npm run check:national-authority-map
npm run validate:jsonld
npm run check:trust-claims
```

Qualquer falha bloqueia a publicação. Regras de conteúdo, indexação, autoria e
proibições estão em [`AGENTS.md`](./AGENTS.md).

## Stack

Vite · TypeScript · React · TanStack Start/Router · shadcn-ui · Tailwind CSS ·
backend gerenciado (Postgres + auth + storage).

## Domínio

Configuração de domínio no ambiente de deploy (Project → Settings → Domains).
Domínios de outras marcas do ecossistema não podem aparecer em código ou
conteúdo — gate `npm run check:brand-isolation`.


## Security regression gates

The database security posture for `reviews` and `og_validation_status` is guarded
by two automated gates that use **only** the public URL + publishable/anon key
(never the service_role key, never PII):

```sh
# Run both gates locally with clear per-invariant output (✓ / ✗)
npm run check:security

# Or run each individually
npm run check:public-data-exposure   # anon cannot read client_phone / select=* / og_validation_status
npm run check:security-findings      # fails if a NEW finding appears vs the committed baseline
```

Example output (all invariants holding):

```text
Public data exposure gate (anon key only)

  ✓ R1  anon can read safe public review columns (200)
  ✓ R2  anon cannot read client_phone (401)
  ✓ R3  anon cannot select=* on reviews (401)
  ✓ O1  anon cannot read og_validation_status (401)
  ✓ O2  anon cannot INSERT into og_validation_status (401)

OK: all public-data-exposure invariants hold.
```

If a private surface becomes reachable, the failing line is printed as
`✗ <id>  CONTRACT VIOLATED: ...` / `✗ <finding>  NEW FINDING: ...` and the
process exits non-zero. Both gates run in CI on **every pull request**
(`.github/workflows/security.yml`) and block the merge on any regression, and
`check:security-findings` also runs during `prebuild` so a regression fails the
build. They skip gracefully (exit 0) when run offline / without env.

### Manual check: authenticated non-admin sees zero reviews (no committed credentials)

The gates above only cover the anonymous role. Verifying that a **logged-in
non-admin** user gets zero rows and no `client_phone` requires a real session,
which cannot be automated without storing credentials. Do this by hand — never
commit any e-mail, password, or token:

1. Create a throwaway non-admin account **outside the repo** (do not add it to
   the `user_roles` table). Keep the credentials only in your password manager.
2. Sign in through the running app (`npm run dev`) as that user.
3. Open the browser DevTools console on any app page and run:

   ```js
   // Uses the app's already-authenticated Supabase client — no keys typed here.
   const { data, error } = await window.supabase?.from("reviews").select("*");
   console.log({ rows: data?.length ?? 0, error });
   ```

   If `window.supabase` is not exposed, run the same query from a component
   during development instead.
4. **Expected result:** `rows: 0` and no `client_phone` values anywhere in
   `data`, because the only `authenticated` SELECT policies require
   `has_role('admin')`. A non-zero row count or any `client_phone` value is a
   regression — stop and fix the RLS policy before shipping.
5. Sign out and delete the throwaway account when finished.

> Do not paste credentials into any script, test, `.env`, or commit. The manual
> step exists precisely so no login secret ever enters version control.

