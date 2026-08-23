// @vitest-environment jsdom
import { describe, expect, it } from "vitest";

/**
 * Prova que o ambiente jsdom entrega o contrato de browser que alguns testes
 * exigem — sem mock global artificial de sessionStorage.
 */
describe("ambiente jsdom", () => {
  it("fornece window, document e location", () => {
    expect(typeof window).toBe("object");
    expect(typeof document).toBe("object");
    expect(window.location.href).toBeTruthy();
  });

  it("fornece sessionStorage e localStorage reais (Storage API)", () => {
    sessionStorage.setItem("qualidade_1_1", "ok");
    expect(sessionStorage.getItem("qualidade_1_1")).toBe("ok");
    localStorage.setItem("qualidade_1_1", "ok");
    expect(localStorage.getItem("qualidade_1_1")).toBe("ok");
    expect(sessionStorage).toBeInstanceOf(Storage);
  });

  it("o setup fornece matchMedia e observers usados por hooks de UI", () => {
    expect(typeof window.matchMedia).toBe("function");
    expect(window.matchMedia("(min-width: 640px)").matches).toBe(false);
    expect(typeof window.IntersectionObserver).toBe("function");
    expect(typeof window.ResizeObserver).toBe("function");
  });
});
