/**
 * Evita competir com o FCP/LCP inicial pelo download do gtag.js (~190 KiB).
 * Consent Mode e dataLayer já existem no HTML e continuam a enfileirar eventos.
 * Uma interação do usuário antecipa imediatamente a inicialização, inclusive
 * dos eventos de conversão — sem aguardar o timeout.
 *
 * Não muda envs, propriedades GA/Ads, consentimento ou eventos first-party.
 */
export function deferAnalyticsStart(start: () => void, delayMs = 2500): () => void {
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
