// @vitest-environment jsdom
/**
 * DETERMINISMO do evento GA4 `wa_funnel_open`.
 *
 * Garante que, independentemente do timing (mesma tarefa, microtask, timer
 * curto ou timer longo dentro da janela de dedupe):
 *   · o schema do payload é sempre o mesmo conjunto de chaves;
 *   · os campos estáveis não variam entre disparos;
 *   · a MEDIÇÃO (persistência em click_events) não é duplicada — o GA4
 *     continua registrando engajamento, mas a base recebe um único registro
 *     dentro da janela de deduplicação.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const insert = vi.fn(() => Promise.resolve({ error: null }));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: { from: () => ({ insert }) },
}));

import { trackFunnelOpen } from "./funnelAnalytics";

type Call = [string, string, Record<string, unknown>];

/** Campos que podem variar legitimamente entre disparos (ids/tempo). */
const VOLATEIS = new Set(["event_id", "journey_id", "timestamp", "engagement_time_msec"]);

function payloads(): Record<string, unknown>[] {
  const calls = (globalThis.gtag as unknown as { mock: { calls: Call[] } }).mock.calls;
  return calls.filter((c) => c[0] === "event" && c[1] === "wa_funnel_open").map((c) => c[2]);
}

describe("determinismo GA4 — wa_funnel_open", () => {
  beforeEach(() => {
    sessionStorage.clear();
    insert.mockClear();
    globalThis.gtag = vi.fn() as never;
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("mantém schema e valores estáveis com variações de timing", async () => {
    trackFunnelOpen("float", false);
    await Promise.resolve();
    trackFunnelOpen("float", false);
    vi.advanceTimersByTime(120);
    trackFunnelOpen("float", false);
    vi.advanceTimersByTime(2_000);
    trackFunnelOpen("float", false);

    const emitidos = payloads();
    expect(emitidos.length).toBe(4);

    const chaves = emitidos.map((p) => Object.keys(p).sort().join("|"));
    expect(new Set(chaves).size, "o schema do evento variou entre disparos").toBe(1);

    const estavel = (p: Record<string, unknown>) =>
      JSON.stringify(
        Object.fromEntries(Object.entries(p).filter(([k]) => !VOLATEIS.has(k)).sort()),
      );
    const assinaturas = new Set(emitidos.map(estavel));
    expect(assinaturas.size, "valores estáveis divergiram entre disparos").toBe(1);
  });

  it("não duplica a medição persistida dentro da janela de dedupe", () => {
    trackFunnelOpen("float", false);
    vi.advanceTimersByTime(50);
    trackFunnelOpen("float", false);
    vi.advanceTimersByTime(1_500);
    trackFunnelOpen("float", false);

    expect(payloads().length, "GA4 deve registrar todo engajamento").toBe(3);
    expect(insert, "click_events recebeu registro duplicado").toHaveBeenCalledTimes(1);
  });
});
