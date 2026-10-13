import { lazy, Suspense, useEffect, useState } from "react";

const SmartSearch = lazy(() =>
  import("@/components/SmartSearch").then((m) => ({ default: m.SmartSearch })),
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
    window.addEventListener("openSmartSearch", open);
    return () => window.removeEventListener("openSmartSearch", open);
  }, []);

  if (!isOpen) return null;
  return (
    <Suspense fallback={null}>
      <SmartSearch isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Suspense>
  );
}
