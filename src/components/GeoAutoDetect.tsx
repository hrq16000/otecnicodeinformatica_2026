import { useEffect } from "react";

/**
 * Sugere região ao formulário fora do carregamento crítico (após 6,5 s)
 * e localização precisa após 10 s. Não altera o funil nem o SSR.
 * Nada é exibido na interface.
 */
export const GeoAutoDetect = () => {
  useEffect(() => {
    let cancelled = false;
    // Geolocalização é apenas sugestão e só roda depois de 6,5 s:
    // não carregar seu módulo no JavaScript crítico de todas as rotas.
    const idle = window.setTimeout(() => {
      if (!cancelled) {
        void import("@/lib/geoContext")
          .then(({ detectByIp }) => {
            if (!cancelled) return detectByIp();
          })
          .catch(() => { /* geolocalização nunca bloqueia o formulário */ });
      }
    }, 6500);
    // Não abrir solicitação de GPS enquanto o visitante ainda lê a página.
    const precise = window.setTimeout(() => {
      if (!cancelled) {
        void import("@/lib/geoContext")
          .then(({ requestPreciseLocation }) => {
            if (!cancelled) return requestPreciseLocation();
          })
          .catch(() => { /* sugestão opcional, fail open */ });
      }
    }, 10000);
    return () => {
      cancelled = true;
      window.clearTimeout(idle);
      window.clearTimeout(precise);
    };
  }, []);
  return null;
};

export default GeoAutoDetect;
