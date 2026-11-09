/**
 * Adia o download de gtag.js (~190 KiB) até depois da primeira pintura.
 * O HTML SSR já contém Consent Mode v2 + stub de gtag/dataLayer;
 * eventos emitidos antes do carregamento continuam enfileirados.
 *
 * Em visitas rápidas, clique/toque ou teclado inicia a biblioteca de imediato.
 * Se o navegador não expõe a entrada 'first-contentful-paint' (ou a aba
 * permanece oculta), fallback assegura inicialização automática em até 6s.
 *
 * Não modifica políticas de consentimento, IDs de GA4/Ads, conversões nem
 * telemetria first-party dos funis.
 */
export function deferAnalyticsStart(
  start: () => void,
  fallbackMs = 6000,
  postPaintMs = 1250,
): () => void {
  if (typeof window === "undefined") return () => {};

  let finished = false;
  let paintTimer: number | undefined;
  let observer: PerformanceObserver | undefined;

  const teardown = () => {
    window.removeEventListener("pointerdown", launch, true);
    window.removeEventListener("keydown", launch, true);
    window.clearTimeout(fallbackTimer);
    if (paintTimer !== undefined) window.clearTimeout(paintTimer);
    observer?.disconnect();
  };
  const launch = () => {
    if (finished) return;
    finished = true;
    teardown();
    start();
  };
  const afterPaint = () => {
    if (finished || paintTimer !== undefined) return;
    paintTimer = window.setTimeout(launch, postPaintMs);
  };

  const fallbackTimer = window.setTimeout(launch, fallbackMs);
  window.addEventListener("pointerdown", launch, true);
  window.addEventListener("keydown", launch, true);

  // O observer buffered captura FCP mesmo quando a hidratação já terminou.
  // Não usar requestIdleCallback: ele pode disparar ANTES da pintura real.
  try {
    const existing = window.performance?.getEntriesByType?.("paint") ?? [];
    if (existing.some((entry) => entry.name === "first-contentful-paint")) {
      afterPaint();
    } else if (typeof PerformanceObserver !== "undefined") {
      observer = new PerformanceObserver((list) => {
        if (list.getEntries().some((entry) => entry.name === "first-contentful-paint")) {
          afterPaint();
          observer?.disconnect();
        }
      });
      observer.observe({ type: "paint", buffered: true });
    }
  } catch {
    observer?.disconnect();
    // Ambiente sem Paint Timing API: mantém fallback e primeira interação.
  }

  return () => {
    if (finished) return;
    finished = true;
    teardown();
  };
}
