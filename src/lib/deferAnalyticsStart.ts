/**
 * Carrega gtag.js (~190 KiB) fora da janela crítica inicial, preservando
 * o Consent Mode v2 e o dataLayer já declarados no HTML SSR.
 *
 * A primeira interação do visitante inicia imediatamente o download, para
 * não postergar eventos de conversão; sem interação, há fallback de 6s.
 *
 * A versão anterior usava o first-contentful-paint nativo para agendar
 * o gtag. Nos LHRs (Lighthouse com throttling simulado), isso fez a
 * transferência começar aos ~1,63s, ANTES do FCP simulado de ~4,3s.
 * Não usar Paint Timing como equivalente ao FCP simulado do Lighthouse.
 *
 * Trade-off: pageviews sem interação e mais curtas que 6s podem não chegar
 * ao GA4. Não altera telemetria first-party, IDs, consentimento ou funis.
 */
export function deferAnalyticsStart(start: () => void, delayMs = 6000): () => void {
  if (typeof window === "undefined") return () => {};

  let finished = false;
  const teardown = () => {
    window.removeEventListener("pointerdown", launch, true);
    window.removeEventListener("keydown", launch, true);
    window.clearTimeout(timer);
  };
  const launch = () => {
    if (finished) return;
    finished = true;
    teardown();
    start();
  };

  const timer = window.setTimeout(launch, delayMs);
  window.addEventListener("pointerdown", launch, true);
  window.addEventListener("keydown", launch, true);

  return () => {
    if (finished) return;
    finished = true;
    teardown();
  };
}
