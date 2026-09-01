import { Link } from "@/lib/router-compat";
import { ArrowRight, Compass } from "lucide-react";
import { atlasPonteDoServico } from "@/lib/atlasPonteServicos";

/**
 * Ponte serviço → trilha do Atlas (Fase 2) — a volta da malha.
 * Renderiza apenas quando o serviço tem ponte curada (fail-closed): sem
 * declaração explícita, nada aparece. Bloco educativo e aditivo — não
 * substitui ficha comercial, preço nem CTA da página.
 */
export const AtlasPonteServico = ({ slug }: { slug: string }) => {
  const ponte = atlasPonteDoServico(slug);
  if (!ponte) return null;

  return (
    <section
      className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8"
      aria-labelledby="atlas-ponte-servico-titulo"
    >
      <h2
        id="atlas-ponte-servico-titulo"
        className="flex items-center gap-3 font-heading text-xl font-bold text-foreground md:text-2xl"
      >
        <Compass className="h-5 w-5 text-accent" aria-hidden="true" />
        Entenda antes de contratar
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
        {ponte.antesDeContratar}
      </p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        <Link
          to={ponte.hubHref}
          className="inline-flex items-center gap-1.5 font-heading text-sm font-bold text-accent hover:underline"
        >
          Trilha do tema: {ponte.tema.titulo}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          to="/guia-tecnico-informatica#guias-decisao"
          className="inline-flex items-center gap-1.5 font-heading text-sm font-bold text-accent hover:underline"
        >
          Guias de decisão do Atlas
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};
