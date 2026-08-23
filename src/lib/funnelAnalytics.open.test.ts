// @vitest-environment jsdom
/**
 * Asserção de CONTRATO do evento GA4 `wa_funnel_open`.
 * Sem dependência de timing/hidratação: chama o helper diretamente e valida
 * o schema do payload (chaves obrigatórias, tipos e ausência de PII).
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { trackFunnelOpen, BLOCKED_TELEMETRY_KEYS } from "./funnelAnalytics";

declare global {
  // eslint-disable-next-line no-var
  var gtag: ((...a: unknown[]) => void) | undefined;
}

type Call = [string, string, Record<string, unknown>];

function openPayload(): Record<string, unknown> {
  const calls = (globalThis.gtag as unknown as { mock: { calls: Call[] } }).mock.calls;
  const hit = calls.find((c) => c[0] === "event" && c[1] === "wa_funnel_open");
  expect(hit, "wa_funnel_open não foi emitido").toBeTruthy();
  return hit![2];
}

describe("contrato GA4 — wa_funnel_open", () => {
  beforeEach(() => {
    sessionStorage.clear();
    sessionStorage.setItem(
      "utm_payload_v1",
      JSON.stringify({
        utm_source: "google",
        utm_medium: "cpc",
        utm_campaign: "triage_v5",
        gclid: "CI_GCLID_777",
      }),
    );
    globalThis.gtag = vi.fn();
  });

  it("emite todas as dimensões obrigatórias do contrato", () => {
    trackFunnelOpen("float", false);
    const p = openPayload();

    for (const key of [
      "event_category",
      "page_path",
      "route_type",
      "app_version",
      "session_id",
      "device",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "attribution_channel",
      "attribution_source",
      "click_location",
      "cta_location",
      "customer_type",
      "has_preset",
    ]) {
      expect(p, `faltou a dimensão ${key}`).toHaveProperty(key);
    }

    expect(p.event_category).toBe("wa_funnel");
    expect(p.click_location).toBe("float");
    expect(p.cta_location).toBe("float");
    expect(p.has_preset).toBe(false);
    expect(typeof p.app_version).toBe("string");
  });

  it("preserva UTMs e gclid capturados na sessão", () => {
    trackFunnelOpen("header", true);
    const p = openPayload();
    expect(p.utm_source).toBe("google");
    expect(p.utm_medium).toBe("cpc");
    expect(p.utm_campaign).toBe("triage_v5");
    expect(p.gclid).toBe("CI_GCLID_777");
    expect(p.has_preset).toBe(true);
  });

  it("não vaza nenhuma chave bloqueada e mantém cardinalidade baixa", () => {
    trackFunnelOpen("cta", false);
    const p = openPayload();
    for (const key of Object.keys(p)) {
      expect(BLOCKED_TELEMETRY_KEYS).not.toContain(key.toLowerCase());
      const v = p[key];
      expect(["string", "number", "boolean"]).toContain(typeof v);
      if (typeof v === "string") expect(v.length).toBeLessThanOrEqual(80);
    }
  });
});
