// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { deferAnalyticsStart } from "./deferAnalyticsStart";

describe("analytics de terceiros — inicialização após pintura ou interação", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("não inicializa durante a primeira pintura; inicializa após o prazo", () => {
    const start = vi.fn();
    deferAnalyticsStart(start);
    vi.advanceTimersByTime(2499);
    expect(start).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(start).toHaveBeenCalledTimes(1);
    window.dispatchEvent(new Event("pointerdown"));
    expect(start).toHaveBeenCalledTimes(1);
  });

  it("carrega imediatamente no primeiro toque, sem segunda inicialização", () => {
    const start = vi.fn();
    deferAnalyticsStart(start);
    window.dispatchEvent(new Event("pointerdown"));
    expect(start).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(3000);
    window.dispatchEvent(new Event("keydown"));
    expect(start).toHaveBeenCalledTimes(1);
  });

  it("prioriza o teclado e permite cancelar antes da carga", () => {
    const start = vi.fn();
    const cancel = deferAnalyticsStart(start);
    window.dispatchEvent(new Event("keydown"));
    expect(start).toHaveBeenCalledTimes(1);
    cancel();
    vi.advanceTimersByTime(3000);
    expect(start).toHaveBeenCalledTimes(1);
  });

  it("cancelamento prévio impede execução e remove listeners", () => {
    const start = vi.fn();
    deferAnalyticsStart(start)();
    window.dispatchEvent(new Event("pointerdown"));
    vi.advanceTimersByTime(3000);
    expect(start).not.toHaveBeenCalled();
  });
});
