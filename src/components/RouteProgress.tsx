import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Barra de progresso de navegação (Onda 4T, restaurada pós-migração TanStack).
 *
 * Usa os tokens globais `.route-progress` de src/styles.css — o mesmo visual
 * do stack anterior (App.tsx). Só aparece quando a transição de rota demora
 * mais que um breve intervalo, para não piscar em navegações instantâneas
 * (a maioria, com preload). `prefers-reduced-motion` neutraliza a animação
 * no próprio CSS global.
 */
const DELAY_MS = 120;

export const RouteProgress = () => {
  const emTransicao = useRouterState({ select: (s) => s.status === "pending" });
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (!emTransicao) {
      setVisivel(false);
      return;
    }
    const timer = window.setTimeout(() => setVisivel(true), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [emTransicao]);

  if (!visivel) return null;

  return (
    <div className="route-progress" role="progressbar" aria-label="Carregando página">
      <span />
    </div>
  );
};

export default RouteProgress;
