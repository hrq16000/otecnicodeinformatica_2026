import { lazy, Suspense, useEffect, useState } from "react";

/**
 * O catálogo da busca (SmartSearch e índices editoriais) é grande e não é
 * necessário para o HTML inicial. Carregá-lo somente na primeira abertura
 * reduz o JS executado na hidratação de TODAS as páginas do portal.
 *
 * O listener global permanece montado desde o início: botões existentes
 * continuam disparando "openSmartSearch" e o diálogo mantém seu estado.
 */
const SmartSearch = lazy(() =>
  import("@/components/SmartSearch").then(({ SmartSearch }) => ({ default: SmartSearch })),
);

export function GlobalSmartSearch() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener("openSmartSearch", open);
    return () => window.removeEventListener("openSmartSearch", open);
  }, []);

  // O import dinâmico só inicia depois da ação do visitante; não cria
  // elemento interativo oculto nem altera SSR/SEO da página.
  if (!isOpen) return null;

  return (
    <Suspense
      fallback={
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-4 top-1/2 z-[100] mx-auto max-w-sm -translate-y-1/2 rounded-xl bg-background p-6 text-center text-foreground shadow-xl"
        >
          Carregando busca…
        </div>
      }
    >
      <SmartSearch isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Suspense>
  );
}
