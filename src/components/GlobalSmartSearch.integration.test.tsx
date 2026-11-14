import "@testing-library/jest-dom/vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, expect, it, vi } from "vitest";
import { GlobalSmartSearch } from "./GlobalSmartSearch";

const loaded = vi.hoisted(() => ({ count: vi.fn() }));

vi.mock("@/components/SmartSearch", () => {
  loaded.count();
  return {
    SmartSearch: ({ onClose }: { isOpen: boolean; onClose: () => void }) => (
      <div role="dialog" aria-label="Busca">
        <button type="button" onClick={onClose}>
          Fechar busca
        </button>
      </div>
    ),
  };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

it("carrega a busca só após abertura e preserva evento e Ctrl/Cmd+K", async () => {
  expect(renderToStaticMarkup(<GlobalSmartSearch />)).toBe("");
  expect(loaded.count).not.toHaveBeenCalled();

  const { container } = render(<GlobalSmartSearch />);
  expect(container).toBeEmptyDOMElement();

  await act(async () => {
    window.dispatchEvent(new CustomEvent("openSmartSearch"));
  });
  expect(await screen.findByRole("dialog", { name: "Busca" })).toBeVisible();
  expect(loaded.count).toHaveBeenCalledTimes(1);

  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Fechar busca" }));
  });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  await act(async () => {
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
  });
  expect(await screen.findByRole("dialog", { name: "Busca" })).toBeVisible();

  await act(async () => {
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
  });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  await act(async () => {
    fireEvent.keyDown(window, { key: "k", metaKey: true });
  });
  expect(await screen.findByRole("dialog", { name: "Busca" })).toBeVisible();
});
