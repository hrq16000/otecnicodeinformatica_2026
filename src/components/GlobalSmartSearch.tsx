import { lazy, Suspense, useEffect, useState } from "react";

// Os catálogos da busca só são necessários quando o visitante abre o modal.
const SmartSearch = lazy(() =>
  import("@/components/SmartSearch").then(({ SmartSearch }) => ({
    default: SmartSearch,
  })),
);

/**
 * Mantém a busca montada uma única vez para todo o portal. Qualquer botão ou
 * atalho pode abri-la emitindo o evento `openSmartSearch`, sem redirecionar o
 * visitante para uma página genérica.
 */
export function GlobalSmartSearch() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const open = () => setIsOpen(true);
    // Captura o atalho antes do módulo sob demanda e evita o segundo handler
    // interno da busca, para que Ctrl/Cmd+K alterne exatamente uma vez.
    const toggleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        event.stopImmediatePropagation();
        setIsOpen((current) => !current);
      }
    };
    window.addEventListener("openSmartSearch", open);
    window.addEventListener("keydown", toggleShortcut, true);
    return () => {
      window.removeEventListener("openSmartSearch", open);
      window.removeEventListener("keydown", toggleShortcut, true);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <Suspense
      fallback={
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 pt-[15vh]"
        >
          <span className="rounded-xl border border-border bg-background px-5 py-4 text-sm text-foreground shadow-xl">
            Abrindo busca…
          </span>
        </div>
      }
    >
      <SmartSearch isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Suspense>
  );
}
