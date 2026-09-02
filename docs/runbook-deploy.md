# Runbook de deploy — otecnicodeinformatica.com.br

> Domínio canônico: **https://otecnicodeinformatica.com.br**.
> O código vive no GitHub (branch `main`). O Lovable pode refletir o
> repositório, mas **build verde não é deploy público**: a publicação só existe
> depois de confirmada no ambiente de deploy. Indexação pelo Google não é
> garantida — IndexNow e Search Console são pedidos, não promessas.

Documento curto e operacional. Usar em toda rodada de publicação.

## 1. Pré-deploy (obrigatório)

```bash
rm -rf dist
npm run build
npm run check:soft404
npm run check:sitemap-source
npm run check:internal-links
npm run check:jsonld-parity
npm run check:priority-urls:dist
npm test
```

Todos precisam sair com código 0. Qualquer falha bloqueia o deploy.

## 2. Publicação (cadeia oficial única)

A cadeia abaixo é a **única** sequência válida. Não existe atalho: nenhum
passo publica sozinho e nenhum passo pode ser pulado.

1. **PR validado → merge em `main`** (GitHub é a referência do código).
2. **Publicação no ambiente de deploy** (Lovable → Publish → Update).
   Enquanto essa confirmação não existir, a rodada permanece **não publicada**,
   mesmo com build verde e com o commit em `main`.
3. **Workflow Cloudflare edge** (aliases 301 + 404 real). Só informar a frase
   de aprovação quando também for publicar a matriz de redirects do domínio
   antigo.
4. **Descoberta**: `npm run sitemap:dynamic:submit` — sincroniza lotes
   aprovados, regenera os sitemaps curados, submete o `sitemap.xml` ao Search
   Console e dispara IndexNow apenas para o que entrou agora.
5. **Conferência do status**: abrir `/admin/seo`. O painel "Sitemap dinâmico e
   submissão" lê `public/sitemap-ledger.json` e mostra o status real
   (`SUBMITTED`, `PENDING_CONFIG`, `HTTP <código>`), o diff de URLs e os
   últimos eventos. Status ausente ou `PENDING_CONFIG` significa submissão
   **não** concluída — nunca tratar como sucesso.



## 3. Evidências pós-deploy (colar no PR/registro da rodada)

| Evidência | Comando / origem |
| --- | --- |
| Status HTTP 200/301/404 | `npm run verify:prod-status` |
| Headers das P0 | `curl -sSI https://otecnicodeinformatica.com.br/` |
| Assets carregando | `curl -sSI https://otecnicodeinformatica.com.br/assets/<hash>.js` |
| Console do navegador limpo | abrir home + 1 rota profunda |
| Triagem WhatsApp funcional | abrir modal, avançar PF e PJ |
| Rich results | `npm run report:post-deploy` |

## 4. Critérios objetivos de rollback

Reverter imediatamente se **qualquer** item ocorrer:

- Home (`/`) não retorna HTTP 200.
- Qualquer rota P0 retorna 404 ou 5xx.
- Assets (`/assets/*`) retornam 404 → build quebrado no edge.
- Alias conhecido deixa de retornar 301 → destino 200.
- URL válida passa a retornar 404 no worker (falso positivo de manifesto).
- Modal de triagem não abre ou não gera link do WhatsApp.
- Erro de JavaScript não tratado no console da home.

## 5. Como reverter

```bash
# Worker de borda
npx wrangler rollback --config cloudflare/wrangler.toml

# Matriz de redirects (ruleset dinâmico)
node scripts/publish-cloudflare-redirects.mjs --rollback=redirects/rollback/cloudflare/<stamp>.json

# Frontend
# Lovable → histórico de versões → restaurar a versão anterior publicada
```

Depois do rollback: rodar `npm run verify:prod-status` e registrar a causa
nesta pasta (`docs/rodada-*.md`).

## 6. Alertas contínuos

- Job semanal `SEO weekly monitoring`: indexação, Web Vitals, rank WoW.
- `scripts/notify-seo-alerts.mjs` envia Slack (`SLACK_WEBHOOK_URL`) e/ou
  e-mail (`ALERT_EMAIL_TO` + `RESEND_API_KEY`) com link para os artefatos.

## Credenciais Cloudflare e canais de alerta

Os segredos vivem **apenas** em GitHub → Settings → Secrets and variables → Actions
(não são gerenciáveis por aqui e nunca devem ser colados no chat):

| Secret | Uso | Escopo mínimo |
| --- | --- | --- |
| `CLOUDFLARE_API_TOKEN` | worker de borda + ruleset de redirects | Account: Workers Scripts Edit · Zone: Workers Routes Edit, Zone Read, Config Rules Edit, Cache Purge |
| `CLOUDFLARE_ACCOUNT_ID` | `wrangler deploy` | identificador |
| `CLOUDFLARE_ZONE_ID` | ruleset 301 do domínio antigo | identificador |
| `SLACK_WEBHOOK_URL` | alertas de SEO/Web Vitals | Incoming Webhook do canal |
| `ALERT_EMAIL_TO` + `RESEND_API_KEY` | alertas por e-mail | chave Resend com domínio verificado |

Pré-voo obrigatório antes de publicar o worker (somente leitura, roda no CI):

```
npm run check:cf-zone -- --enforce
```

Ele falha se `otecnicodeinformatica.com.br`/`www` não estiverem em uma zona
Cloudflare ativa da nossa conta **e** com o registro proxied.

Todo alerta enviado inclui o link dos artefatos do run e o link deste runbook.
