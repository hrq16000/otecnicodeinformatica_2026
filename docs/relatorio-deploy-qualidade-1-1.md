# Micro-Rodada Deploy Qualidade 1.1 — Pós-deploy (produção real)

Execução: 2026-08-24 04:30–04:36 UTC · Alvo: `https://otecnicodeinformatica.com.br`
Ferramentas: Playwright (Chromium headless, desktop 1280×1800 e mobile 390×844 com toque), `curl`.

## 1. Identidade do deploy

| Item | Valor |
| --- | --- |
| `LOCAL_HEAD` (pré-deploy) | `977a66db` (contém `0c562a06`) |
| `REMOTE_HEAD` | `c47bbeb0` |
| `DEPLOY_HEAD` (publicado) | `c47bbeb0` |
| `x-deployment-id` | `f7f3365052f61652aa3b0ad53572a09b98d05def75baada64eaee12d353deed3` |
| Bundle servido | `index-CjjEHusf.js` (antes: `index-DJv0X5u-`) |
| `app_version` observado em evento GA4 real | `c47bbeb` |

Veredito: **produção serve o DEPLOY_HEAD esperado.**

## 2. Consent Mode v2

| Verificação | Resultado |
| --- | --- |
| `window.gtag` pré-instalado (spy) preservado após bootstrap | ✔ `spy_preserved = true` |
| Referência idêntica após o banner de consentimento | ✔ `spy_preserved_after_consent = true` |
| Reexecução do snippet de consent não substitui `gtag` | ✔ `ref_after = true`, evento seguinte ainda observado (1/1) |
| "Aceitar tudo" → update granted | ✔ `ad_storage/ad_user_data/ad_personalization/analytics_storage = granted` |
| "Recusar" → update denied | ✔ os quatro sinais `denied` |
| AdSense após recusa | ✔ `script[data-adsense="1"]` = 0 |

## 3. CTA flutuante e buffer pré-hidratação

| Verificação | Resultado |
| --- | --- |
| `WA_PREHYDRATION_SCRIPT` presente no HTML servido | ✔ |
| Toque mobile antes da hidratação (`hydrated_at_click = no`) | ✔ enfileirado em `__waFunnelQueue` |
| Modal abre após a hidratação, sem novo toque | ✔ `mobile_modal_open = true` |
| Replay único | ✔ 1 × `wa_funnel_open`, 1 × `triage_start` |
| Clique desktop pós-hidratação | ✔ 1 × `wa_funnel_open`, 1 × `triage_start`, modal aberto |
| Animação do CTA | `waPulse` (box-shadow), `transform: none`; com `prefers-reduced-motion: reduce` → `animation-name: none` |

## 4. Contrato de analytics (payloads reais capturados)

`wa_funnel_open` (desktop, com UTMs `?utm_source=ci&utm_medium=cpc&utm_campaign=post_deploy_smoke`):

```json
{"event_category":"wa_funnel","page_path":"/","route_type":"home","app_version":"c47bbeb",
 "session_id":"s_mt6qpd4d_sve8zqmw","device":"desktop","viewport_width":1280,"viewport_bucket":"desktop",
 "utm_source":"ci","utm_medium":"cpc","utm_campaign":"post_deploy_smoke",
 "attribution_channel":"ads","attribution_source":"ci","customer_type":"unknown",
 "cta_location":"float","has_preset":false,"click_location":"float"}
```

`triage_start` acrescenta `route`, `route_family`, `page_slug` e `intent: brand`, mantendo o mesmo `session_id`.

- UTMs preservadas ✔ · `click_location = float` ✔ · sem PII (nome, telefone, e-mail, CEP) ✔ · sem duplicação ✔.
- Toque pré-hidratação (mobile, sem UTM): `attribution_channel = direto`, `utm_medium = cta` — coerente com CTA interno.

## 5. SEO smoke (HTTP + canonical + schema)

| URL | HTTP | robots | canonical | H1 | JSON-LD (pós-hidratação) |
| --- | --- | --- | --- | --- | --- |
| `/` | 200 | index, follow | próprio | 1 | organization, website, web-page, local-business, item-list-services, site-navigation, faq |
| `/problemas/computador-lento` | 200 | index, follow | próprio | 1 | web-page, breadcrumb, local-business, faq, organization, website |
| `/blog/como-resolver-tela-azul-windows` | 200 | index, follow, max-image-preview:large | próprio | 1 | article/BlogPosting/TechArticle, breadcrumb, imageobject — **sem FAQPage** ✔ |
| `/bairros/boqueirao` | 200 | index, follow | próprio | 1 | breadcrumb, web-page, local-business, faq, organization, website (54 links internos) |
| `/servicos/formatacao-computador/batel` | 200 | index, follow | próprio | 1 | service, offer, place, faq |
| `/areas-atendidas` | 200 | index, follow | próprio | 1 | faq, organization, website — 21 links `/bairros/*` únicos |

Sem `@id` duplicado nas páginas amostradas. O HTML SSR entrega `organization` + `website`; os demais nós são
injetados na hidratação (mesmo comportamento em local e em produção — sem regressão de deploy).

## 6. Entregas desta fase

- `docs/relatorio-deploy-qualidade-1-1.md` (este arquivo).
- `e2e/cta-prehidratacao.spec.ts` — não-regressão do toque pré-hidratação com replay único
  (2/2 PASS em chromium e mobile).
- `scripts/generate-build-version.mjs` + `public/build-version.json` (gerado no `prebuild`) e
  `src/components/DeployVersionCheck.tsx`, exibido em `/status`: compara o SHA do bundle carregado
  (`window.__APP_VERSION__` / `APP_BUILD_INFO.version`) com o manifesto servido sem cache e alerta
  quando a produção não está no DEPLOY_HEAD.

## 7. Observações não bloqueantes

- No evento pré-hidratação em mobile, `app_version` reportou `dev` (o buffer é drenado antes da
  injeção completa do metadado de build). Não afeta o contrato; a dimensão fica correta nos
  eventos subsequentes da mesma sessão.
- `viewport_width` continua no payload GA4 (permitido pelo gate atual); a restrição da governança
  4E.4 se aplica à telemetria first-party `click_events`, que segue sem o campo.
