// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { deferAnalyticsStart } from "./deferAnalyticsStart";

describe("analytics — após primeira pintura ou primeira interação", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("PerformanceObserver", undefined);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("sem Paint Timing API, inicia pelo fallback após 6s (uma vez)", () => {
    const start = vi.fn();
    deferAnalyticsStart(start);
    vi.advanceTimersByTime(5999);
    expect(start).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(start).toHaveBeenCalledTimes(1);
    window.dispatchEvent(new Event("pointerdown"));
    expect(start).toHaveBeenCalledTimes(1);
  });

  it("carrega imediatamente no primeiro toque e cancela fallback", () => {
    const start = vi.fn();
    deferAnalyticsStart(start);
    window.dispatchEvent(new Event("pointerdown"));
    expect(start).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(7000);
    expect(start).toHaveBeenCalledTimes(1);
  });

  it("teclado inicia sem esperar a pintura", () => {
    const start = vi.fn();
    deferAnalyticsStart(start);
    window.dispatchEvent(new Event("keydown"));
    expect(start).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(7000);
    expect(start).toHaveBeenCalledTimes(1);
  });

  it("FCP agenda o carregamento após 1250ms, sem duplicar", () => {
    const callbacks: Array<(list: { getEntries(): Array<{ name: string }> }) => void> = [];
    const disconnect = vi.fn();
    vi.stubGlobal("PerformanceObserver", class {
      constructor(callback: (list: { getEntries(): Array<{ name: string }> }) => void) {
        callbacks.push(callback);
      }
      observe() {}
      disconnect() { disconnect(); }
    });
    const start = vi.fn();
    deferAnalyticsStart(start);
    expect(callbacks).toHaveLength(1);
    callbacks[0]({ getEntries: () => [{ name: "first-paint" }] });
    vi.advanceTimersByTime(1300);
    expect(start).not.toHaveBeenCalled();
    callbacks[0]({ getEntries: () => [{ name: "first-contentful-paint" }] });
    vi.advanceTimersByTime(1249);
    expect(start).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(start).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(7000);
    expect(start).toHaveBeenCalledTimes(1);
    expect(disconnect).toHaveBeenCalled();
  });

  it("cancelar desmontagem não dispara analytics nem mantém timers", () => {
    const start = vi.fn();
    const cancel = deferAnalyticsStart(start);
    cancel();
    window.dispatchEvent(new Event("pointerdown"));
    vi.advanceTimersByTime(7000);
    expect(start).not.toHaveBeenCalled();
  });
});
