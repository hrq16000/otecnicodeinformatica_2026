/**
 * Na home, evita baixar recursos abaixo da dobra antes do FCP mobile.
 * O requestIdleCallback pode executar muito antes da primeira pintura, e o
 * prefetch manual de HomeSections/Footer competia com CSS, JS e imagem LCP.
 *
 * O lazy + LazyOnVisible continuam controlando a montagem e a reserva de
 * espaço para CLS/SSR; mudamos SOMENTE o prefetch antecipado.
 * Ao rolar ou usar teclas de navegação, a busca inicia imediatamente.
 */
export function deferHomeBelowFoldPrefetch(
  prefetch: () => void,
  delayMs = 6000,
): () => void {
  if (typeof window === "undefined") return () => {};

  let stopped = false;
  const cleanup = () => {
    window.clearTimeout(timer);
    window.removeEventListener("scroll", activate);
    window.removeEventListener("wheel", activate);
    window.removeEventListener("touchmove", activate);
    window.removeEventListener("keydown", onKeyDown);
  };
  const activate = () => {
    if (stopped) return;
    stopped = true;
    cleanup();
    prefetch();
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (["PageDown", "End", "ArrowDown", " ", "Spacebar"].includes(event.key)) {
      activate();
    }
  };
  const timer = window.setTimeout(activate, delayMs);
  window.addEventListener("scroll", activate, { passive: true });
  window.addEventListener("wheel", activate, { passive: true });
  window.addEventListener("touchmove", activate, { passive: true });
  window.addEventListener("keydown", onKeyDown);

  return () => {
    if (stopped) return;
    stopped = true;
    cleanup();
  };
}
