import { useEffect } from "react";

let pageAnalyticsPromise:
  | Promise<
      [
        typeof import("@/lib/analyticsContract"),
        typeof import("@/lib/funnelAnalytics"),
      ]
    >
  | null = null;

const loadPageAnalytics = () => {
  pageAnalyticsPromise ??= Promise.all([
    import("@/lib/analyticsContract"),
    import("@/lib/funnelAnalytics"),
  ]);
  return pageAnalyticsPromise;
};

/**
 * RODADA 6 — FASE 8. Page view com contexto comum (rota, família, cidade,
 * bairro, serviço, intenção). Campos ausentes não são inventados.
 *
 * Nunca bloqueia navegação: qualquer falha é silenciosa (fail open).
 * A telemetria é carregada após a hidratação para não competir com o
 * conteúdo inicial nem inflar a long task do bundle principal.
 */
export const PageViewTracker = ({ path }: { path?: string }) => {
  useEffect(() => {
    let active = true;

    void loadPageAnalytics()
      .then(([contract, funnel]) => {
        if (!active) return;
        try {
          const ctx = contract.buildRouteContext(path);
          const touch = contract.recordTouchpoint(ctx);
          funnel.track(contract.ANALYTICS_EVENTS.pageView, {
            ...ctx,
            journey_id: contract.getJourneyId(),
            first_touch_route: touch.first_touch?.landing_route,
            last_touch_route: touch.last_touch.landing_route,
          });
          funnel.registrarPageView();
        } catch {
          /* analytics nunca impede a navegação */
        }
      })
      .catch(() => {
        /* telemetria é best-effort */
      });

    return () => {
      active = false;
    };
  }, [path]);

  // FASE 13 — abandono de triagem sem timer invasivo.
  useEffect(() => {
    let active = true;
    let onHide: (() => void) | null = null;

    void loadPageAnalytics()
      .then(([, funnel]) => {
        if (!active) return;
        onHide = () => {
          try {
            funnel.registrarAbandonoSePendente();
          } catch {
            /* fail open */
          }
        };
        window.addEventListener("pagehide", onHide);
      })
      .catch(() => {
        /* telemetria é best-effort */
      });

    return () => {
      active = false;
      if (onHide) window.removeEventListener("pagehide", onHide);
    };
  }, []);

  return null;
};

export default PageViewTracker;
