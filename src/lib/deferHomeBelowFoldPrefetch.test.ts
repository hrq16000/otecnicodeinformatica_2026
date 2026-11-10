// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { deferHomeBelowFoldPrefetch } from "./deferHomeBelowFoldPrefetch";

describe("home — chunks abaixo da dobra não disputam a primeira pintura", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("não inicia cedo: somente aos 6s sem rolagem", () => {
    const prefetch = vi.fn();
    deferHomeBelowFoldPrefetch(prefetch);
    vi.advanceTimersByTime(5999);
    expect(prefetch).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(prefetch).toHaveBeenCalledTimes(1);
  });

  it("rolagem antecipa, sem repetição por wheel e timeout", () => {
    const prefetch = vi.fn();
    deferHomeBelowFoldPrefetch(prefetch);
    window.dispatchEvent(new Event("scroll"));
    expect(prefetch).toHaveBeenCalledTimes(1);
    window.dispatchEvent(new Event("wheel"));
    vi.advanceTimersByTime(7000);
    expect(prefetch).toHaveBeenCalledTimes(1);
  });

  it("navegação por teclado antecipa; Tab não inicia download", () => {
    const prefetch = vi.fn();
    deferHomeBelowFoldPrefetch(prefetch);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }));
    expect(prefetch).not.toHaveBeenCalled();
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "PageDown" }));
    expect(prefetch).toHaveBeenCalledTimes(1);
  });

  it("unmount remove listeners e timer, sem prefetch futuro", () => {
    const prefetch = vi.fn();
    deferHomeBelowFoldPrefetch(prefetch)();
    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "End" }));
    vi.advanceTimersByTime(8000);
    expect(prefetch).not.toHaveBeenCalled();
  });
});
