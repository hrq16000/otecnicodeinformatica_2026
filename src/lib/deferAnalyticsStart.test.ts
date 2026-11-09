// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { deferAnalyticsStart } from "./deferAnalyticsStart";

describe("analytics de terceiros — sem competição no carregamento inicial", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("não inicia durante os primeiros 6s sem interação", () => {
    const start = vi.fn();
    deferAnalyticsStart(start);
    vi.advanceTimersByTime(5999);
    expect(start).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(start).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(3000);
    expect(start).toHaveBeenCalledTimes(1);
  });

  it("inicia no primeiro toque e cancela o timeout", () => {
    const start = vi.fn();
    deferAnalyticsStart(start);
    window.dispatchEvent(new Event("pointerdown"));
    expect(start).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(7000);
    expect(start).toHaveBeenCalledTimes(1);
  });

  it("inicia no teclado para não atrasar a primeira conversão", () => {
    const start = vi.fn();
    deferAnalyticsStart(start);
    window.dispatchEvent(new Event("keydown"));
    expect(start).toHaveBeenCalledTimes(1);
    window.dispatchEvent(new Event("pointerdown"));
    vi.advanceTimersByTime(7000);
    expect(start).toHaveBeenCalledTimes(1);
  });

  it("sem Paint Timing, mantém exatamente o prazo configurado", () => {
    const start = vi.fn();
    deferAnalyticsStart(start, 4200);
    vi.advanceTimersByTime(4199);
    expect(start).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(start).toHaveBeenCalledTimes(1);
  });

  it("cancelamento remove timer e listeners sem iniciar analytics", () => {
    const start = vi.fn();
    deferAnalyticsStart(start)();
    window.dispatchEvent(new Event("pointerdown"));
    window.dispatchEvent(new Event("keydown"));
    vi.advanceTimersByTime(7000);
    expect(start).not.toHaveBeenCalled();
  });
});
