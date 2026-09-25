/**
 * Setup compartilhado do Vitest.
 *
 * Só registra o que existe teste real precisando. Nada de "zoológico" de mocks:
 * quando o ambiente é `node`, este arquivo não toca em DOM algum.
 */
import { afterEach } from "vitest";

// Supabase v2 valida a presença de WebSocket ao criar o client em ambiente Node.
// A suíte unitária não usa Realtime; um stub mínimo evita que imports puros de páginas
// falhem antes mesmo do teste começar. Em jsdom/browser o WebSocket real permanece intacto.
if (typeof globalThis.WebSocket === "undefined") {
  class TestWebSocket {
    static readonly CONNECTING = 0;
    static readonly OPEN = 1;
    static readonly CLOSING = 2;
    static readonly CLOSED = 3;
  }
  globalThis.WebSocket = TestWebSocket as unknown as typeof WebSocket;
}

const hasDom = typeof window !== "undefined" && typeof document !== "undefined";

if (hasDom) {
  // matchers do jest-dom usados pelos testes de componente
  await import("@testing-library/jest-dom/vitest");

  // jsdom não implementa matchMedia/observers usados por hooks de UI.
  if (!window.matchMedia) {
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
  }

  for (const name of ["IntersectionObserver", "ResizeObserver"] as const) {
    if (!(name in window)) {
      (window as unknown as Record<string, unknown>)[name] = class {
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
          return [];
        }
      };
    }
  }

  afterEach(() => {
    // storages do jsdom são reais; basta zerar entre testes
    try {
      sessionStorage.clear();
      localStorage.clear();
    } catch {
      /* ambiente sem storage: nada a limpar */
    }
  });
}
