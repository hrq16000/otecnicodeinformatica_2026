import { useEffect, useState } from "react";
import { MapPin, X } from "lucide-react";
import { getGeoContext, subscribeGeo } from "@/lib/geoContext";
import { regioesPorUf, ufDaRegiao } from "@/lib/nacional/comunidadePublica";
import { commercialConfig } from "@/lib/config/commercial";

/**
 * Social proof sem PII e sem presença falsa.
 * Aparece no máximo uma vez por sessão, somente após identificar UF com DDD
 * conferido. Nunca anuncia agenda, profissional verificado ou cobertura municipal.
 */
const KEY = "comunidade_nacional_proof_v1";

export default function ComunidadeSocialProof() {
  const [uf, setUf] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) return;
    try {
      if (sessionStorage.getItem(KEY) === "dismissed") return;
    } catch {
      // Sem storage: só controla abertura durante esta montagem.
    }

    const verificar = (region?: string) => {
      const sigla = ufDaRegiao(region);
      if (!sigla || regioesPorUf(sigla).length === 0) return;
      setUf(sigla);
      setDismissed(false);
    };

    verificar(getGeoContext()?.region);
    return subscribeGeo((g) => verificar(g?.region));
  }, []);

  if (dismissed || !uf) return null;

  const regioes = regioesPorUf(uf);
  const ddds = [...new Set(regioes.map((r) => r.ddd))];
  if (ddds.length === 0) return null;
  const ocultar = () => {
    setDismissed(true);
    try { sessionStorage.setItem(KEY, "dismissed"); } catch { /* armazenamento opcional */ }
  };

  return (
    <aside
      role="status"
      aria-label="Informação sobre a comunidade técnica na sua região"
      className="fixed bottom-24 left-3 right-3 z-[50] max-w-sm rounded-2xl border border-border bg-background p-5 text-foreground shadow-xl sm:left-auto sm:right-6"
    >
      <button type="button" onClick={ocultar} aria-label="Fechar aviso"
        className="absolute right-3 top-3 rounded-lg p-2 hover:bg-muted">
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <p className="flex items-center gap-2 pr-8 text-sm font-bold text-primary">
        <MapPin className="h-4 w-4" aria-hidden="true" />
        Comunidade técnica na região {uf}
      </p>
      <p className="mt-2 text-sm leading-relaxed">
        Há integrantes do grupo com DDD {ddds.join(", ")} associado a esse estado.
        Isso não confirma a localização nem a disponibilidade atual de um profissional.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Serviço rápido programado: referência de{" "}
        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(commercialConfig.comunidadeNacional.atendimentoProgramadoCentavos / 100)},
        incluindo{" "}
        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(commercialConfig.comunidadeNacional.taxaClienteCentavos / 100)}
        de taxa da plataforma. Negociação direta e livre, sujeita à confirmação.
      </p>
      <a href="/comunidade-nacional" onClick={ocultar}
        className="mt-4 inline-flex min-h-10 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">
        Ver mapa e condições
      </a>
    </aside>
  );
}
