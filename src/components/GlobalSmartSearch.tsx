import { useEffect, useState } from "react";
import { SmartSearch } from "@/components/SmartSearch";

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

  return <SmartSearch isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
