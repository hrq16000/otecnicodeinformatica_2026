import { lazy, Suspense, useEffect, useState } from "react";

// A busca inclui o índice editorial; carregá-la no boot atrasava TODAS as páginas.
// O listener openSmartSearch permanece pronto desde a hidratação.
const SmartSearch = lazy(() => import("@/components/SmartSearch").then((m) => ({ default: m.SmartSearch })));

/**
 * Mantém a busca montada uma única vez para todo o portal. Qualquer botão ou
 * atalho pode abri-la emitindo o evento `openSmartSearch`, sem redirecionar o
 * visitante para uma página genérica.
 */
export function GlobalSmartSearch() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener("openSmartSearch", open);
    return () => window.removeEventListener("openSmartSearch", open);
  }, []);

  // SmartSearch só carrega quando aberta; seu atalho Ctrl/Cmd+K
  // precisa funcionar também ANTES do primeiro carregamento do módulo.
  // Quando aberta, o próprio SmartSearch cuida do atalho e do fechamento.
  useEffect(() => {
    if (isOpen) return;
    const onShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <Suspense fallback={<div role="status" aria-live="polite" className="sr-only">Carregando busca…</div>}>
      <SmartSearch isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Suspense>
  );
}
