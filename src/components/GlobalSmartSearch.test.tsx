// @vitest-environment jsdom
import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GlobalSmartSearch } from "./GlobalSmartSearch";

const importacao = vi.hoisted(() => ({ carregamentos: 0 }));

vi.mock("@/components/SmartSearch", async () => {
  importacao.carregamentos += 1;
  const { createElement } = await import("react");
  return {
    SmartSearch: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
      isOpen
        ? createElement(
            "div",
            { role: "dialog", "aria-label": "Busca global" },
            createElement("button", { type: "button", onClick: onClose }, "Fechar busca"),
          )
        : null,
  };
});

describe("busca global — código carregado sob demanda", () => {
  it("não baixa o catálogo fechado; abre, fecha e reabre sem novo import", async () => {
    const view = render(<GlobalSmartSearch />);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(importacao.carregamentos).toBe(0);

    act(() => window.dispatchEvent(new Event("openSmartSearch")));
    expect(await screen.findByRole("dialog", { name: "Busca global" })).toBeTruthy();
    expect(importacao.carregamentos).toBe(1);

    act(() => screen.getByRole("button", { name: "Fechar busca" }).click());
    expect(screen.queryByRole("dialog")).toBeNull();

    act(() => window.dispatchEvent(new Event("openSmartSearch")));
    expect(await screen.findByRole("dialog", { name: "Busca global" })).toBeTruthy();
    expect(importacao.carregamentos).toBe(1);
    view.unmount();
  });
});
