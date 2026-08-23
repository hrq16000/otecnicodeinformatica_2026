/**
 * Setup compartilhado do Vitest.
 *
 * Só registra o que existe teste real precisando. Nada de "zoológico" de mocks:
 * quando o ambiente é `node`, este arquivo não toca em DOM algum.
 */
import { afterEach } from "vitest";

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
