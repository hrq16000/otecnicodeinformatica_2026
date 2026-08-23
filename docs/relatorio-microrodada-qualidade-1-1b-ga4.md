# MICRO-RODADA QUALIDADE 1.1B — GA4 / wa_funnel_open / triage_start

Data: 2026-08-23 (UTC) · Escopo: analytics do funil. Nenhuma alteração em UX do CTA,
animação, buffer pré-hidratação, SEO, conteúdo, bairros ou Discovery.

## 1. Teste que falhava

`e2e/whatsapp-funnel.spec.ts` › "GA4 dispara wa_funnel_open com UTM payload".

## 2/3. Expected × Received

Reexecução controlada do estado atual (chromium + mobile, `--repeat-each=2`, 32 execuções):
**0 falhas**. A assertion `expect(open).toBeTruthy()` passa de forma determinística.
Conclusão: a falha reportada foi eliminada pela correção anterior (gtag do Consent Mode
tornado idempotente + drenagem da fila pré-hidratação); não há expected/received divergente
reproduzível no estado atual.

## 4. Payload real `wa_funnel_open` (clique real no CTA float, com UTMs)

```json
{
  "event_category": "wa_funnel", "page_path": "/", "route_type": "home",
  "app_version": "d4ad00da", "session_id": "s_…", "device": "desktop",
  "viewport_width": 1280, "viewport_bucket": "desktop",
  "utm_source": "ci", "utm_medium": "cpc", "utm_campaign": "triage_v5_e2e",
  "attribution_channel": "ads", "attribution_source": "ci", "gclid": "CI_GCLID_777",
  "customer_type": "unknown", "cta_location": "float", "click_location": "float",
  "has_preset": false
}
```

## 5. Payload real `triage_start`

```json
{
  "event_category": "wa_funnel", "page_path": "/", "route_type": "home",
  "app_version": "d4ad00da", "session_id": "s_…", "device": "desktop",
  "viewport_width": 1280, "viewport_bucket": "desktop",
  "utm_source": "ci", "utm_medium": "cpc", "utm_campaign": "triage_v5_e2e",
  "attribution_channel": "ads", "attribution_source": "ci", "gclid": "CI_GCLID_777",
  "customer_type": "unknown", "cta_location": "float", "click_location": "float",
  "route": "/", "route_family": "home", "page_slug": "home", "intent": "brand"
}
```

Diferença consciente (FASE 3/7): o canônico acrescenta o contexto de rota do contrato
central (`route`, `route_family`, `page_slug`, `intent`) e normaliza `cta_location` via
`normalizeCtaLocation()`; o legado mantém o valor histórico cru — que para `float` é
idêntico ao normalizado. Compatibilidade histórica intencional, sem PII e sem contexto falso.

## 6. Classificação da causa

**STALE_TEST_EXPECTATION** (residual): o teste antigo era fraco/instável e o defeito real
(perda do toque pré-hidratação + clobbering de `window.gtag`) já havia sido corrigido em
1.1. Nenhuma mudança de produção foi necessária nesta rodada.

## 7. Mudança realizada

Somente camada de teste, em `e2e/whatsapp-funnel.spec.ts`:
- teste GA4 reescrito para validar contrato completo, UTMs, origem do clique, ausência de PII,
  emissão do canônico e ausência de duplicação;
- novo teste de regressão do toque pré-hidratação.

## 8. Replay pré-hidratação

Teste novo atrasa o bundle do cliente, clica no CTA servido em SSR, e valida abertura do modal
após a hidratação. PASS em chromium e mobile.

## 9. Dedupe

1 clique → 1 `wa_funnel_open` + 1 `triage_start` (contagens asseguradas por assertion).
Proteções: fila drena apenas o primeiro item e `openFunnel` tem janela de 600 ms.

## 10. UTM

`utm_source=ci`, `utm_medium=cpc`, `utm_campaign=triage_v5_e2e` presentes nos dois eventos;
`gclid` presente por passthrough de `readUtms()` (não exigido pelo contrato, não assertado).

## 11. CTA location

`click_location = cta_location = "float"` nos dois eventos. Nenhum `unknown`/`test`/`other`.

## 12. PII

Nenhuma chave de PII/texto livre nos payloads (assertion explícita no E2E +
`sanitizeTelemetry` com 50+ chaves bloqueadas).

## 13. Gates

| Gate | Resultado |
| --- | --- |
| check:analytics-event-contract | ✓ 8 canônicos, 50 emitidos, 0 divergência (snapshot NÃO atualizado) |
| check:analytics-pii | ✓ 6 arquivos, 21 chaves |
| check:analytics-local-context | ✓ 7 cenários, 0 fallback |
| check:analytics-journey-integrity | ✓ TTL, dedupe, first/last touch |
| check:analytics-parity | ✓ alinhado GA4 × click_events × relatório |

## 14. Suíte final

- Playwright `e2e/whatsapp-funnel.spec.ts`: **18/18 PASS** (9 testes × chromium + mobile).
- Vitest analytics do funil: **7/7 PASS**.

## 15. Build

`npm run build` (Vite + Nitro) concluído com sucesso; `tsgo --noEmit` sem erros.

## 16. Pendências

Nenhuma. Snapshot do contrato preservado (FASE 12).

---

- VEREDITO 1: **STALE_TEST_EXPECTATION**
- VEREDITO 2: **SIM** (1 clique pré-hidratação → 1 abertura lógica)
- VEREDITO 3: **SIM** (`wa_funnel_open` compatível com o histórico)
- VEREDITO 4: **SIM** (`triage_start` continua emitido)
- VEREDITO 5: **NÃO** (sem PII)
- VEREDITO 6: **SIM** (suíte do funil 100% verde)
