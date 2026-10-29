import { useEffect } from "react";
import { detectByIp, requestPreciseLocation } from "@/lib/geoContext";

/**
 * Sugere região ao formulário fora do carregamento crítico (após 6,5 s)
 * e localização precisa após 10 s. Não altera o funil nem o SSR.
 * Nada é exibido na interface.
 */
export const GeoAutoDetect = () => {
  useEffect(() => {
    let cancelled = false;
    // Evita consulta externa de geolocalização na janela de renderização
    // inicial de páginas SSR. A região é apenas sugestão para o formulário:
    // nenhum CTA depende dela para funcionar ou registrar o lead.
    // Lighthouse identifica ipwho.is como uma origem fora do caminho crítico.
    const idle = window.setTimeout(() => {
      if (!cancelled) void detectByIp();
    }, 6500);
    // Não abrir solicitação de GPS enquanto o visitante ainda lê a página.
    // Mantém a sugestão precisa em sessões mais longas sem bloquear o LCP.
    const precise = window.setTimeout(() => {
      if (!cancelled) void requestPreciseLocation();
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
