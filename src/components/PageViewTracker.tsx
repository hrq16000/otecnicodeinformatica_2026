import { useEffect } from "react";
import { ANALYTICS_EVENTS, buildRouteContext, getJourneyId, recordTouchpoint } from "@/lib/analyticsContract";
// O módulo de funil contém persistência e clientes de rede.
// Mantê-lo fora do bundle inicial não altera a captura da atribuição.
const getFunnelAnalytics = () => import("@/lib/funnelAnalytics");

/**
 * RODADA 6 — FASE 8. Page view com contexto comum (rota, família, cidade,
 * bairro, serviço, intenção). Campos ausentes não são inventados.
 *
 * Nunca bloqueia navegação: qualquer falha é silenciosa (fail open).
 */
export const PageViewTracker = ({ path }: { path?: string }) => {
  useEffect(() => {
    try {
      const ctx = buildRouteContext(path);
      const touch = recordTouchpoint(ctx);
      const eventPayload = {
        ...ctx,
        journey_id: getJourneyId(),
        first_touch_route: touch.first_touch?.landing_route,
        last_touch_route: touch.last_touch.landing_route,
      };
      // Sem import estático: evita baixar o cliente de persistência antes
      // da primeira renderização. O contexto da rota é capturado no clique
      // de navegação, antes da resolução do chunk assíncrono.
      void getFunnelAnalytics()
        .then(({ track, registrarPageView }) => {
          track(ANALYTICS_EVENTS.pageView, eventPayload);
          registrarPageView();
        })
        .catch(() => { /* Métricas nunca bloqueiam navegação. */ });
    } catch {
      /* analytics nunca impede a navegação */
    }
  }, [path]);

  // FASE 13 — abandono de triagem sem timer invasivo.
  useEffect(() => {
    const onHide = () => {
      try {
        // A importação já é solicitada pelo page view durante a montagem;
        // o listener preserva o registro de abandono sem import estático.
        void getFunnelAnalytics()
          .then(({ registrarAbandonoSePendente }) => registrarAbandonoSePendente())
          .catch(() => { /* fail open */ });
      } catch {
        /* fail open */
      }
    };
    window.addEventListener("pagehide", onHide);
    return () => window.removeEventListener("pagehide", onHide);
  }, []);

  return null;
};

export default PageViewTracker;
