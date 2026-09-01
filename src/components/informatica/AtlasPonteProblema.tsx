import { Link } from "@/lib/router-compat";
import { ArrowRight, Compass } from "lucide-react";
import { atlasPonteDoSintoma, decisaoDoSintoma } from "@/lib/atlasPontes";
import { guiaDecisaoPorSlug } from "@/lib/guiasDecisao";

/**
 * Ponte sintoma → trilha do Atlas → serviço.
 * Renderiza apenas quando o sintoma tem ponte curada (fail-closed): sem
 * declaração explícita, nada aparece — o portal não inventa relação temática.
 */
export const AtlasPonteProblema = ({ sintomaSlug }: { sintomaSlug: string }) => {
  const ponte = atlasPonteDoSintoma(sintomaSlug);
  const decisao = decisaoDoSintoma(sintomaSlug);
  const guiaDecisao = decisao ? guiaDecisaoPorSlug(decisao.slug) : undefined;
  if (!ponte) return null;

  return (
    <section
      className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8"
      aria-labelledby="atlas-ponte-titulo"
    >
      <h2
        id="atlas-ponte-titulo"
        className="flex items-center gap-3 font-heading text-xl font-bold text-foreground md:text-2xl"
      >
        <Compass className="h-5 w-5 text-accent" aria-hidden="true" />
        Onde este sintoma entra no Atlas
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
        {ponte.porQue}
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <Link
          to={ponte.hubHref}
          className="rounded-xl border border-border bg-background p-4 transition-colors hover:border-accent"
        >
          <span className="text-[0.65rem] font-bold uppercase tracking-wide text-accent">Tema</span>
          <span className="mt-1 block font-heading text-sm font-bold text-foreground">
            {ponte.tema.titulo}
          </span>
          <span className="mt-1 block text-xs text-muted-foreground">
            Trilha completa: aprender, identificar, verificar, parar e resolver.
          </span>
        </Link>

        {ponte.verificar && (
          <Link
            to={ponte.verificar.to}
            className="rounded-xl border border-border bg-background p-4 transition-colors hover:border-accent"
          >
            <span className="text-[0.65rem] font-bold uppercase tracking-wide text-accent">
              Verificar com segurança
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
              {ponte.verificar.desc}
            </span>
            <span className="mt-2 inline-flex items-center gap-1 font-heading text-xs font-bold text-accent">
              {ponte.verificar.linkLabel}
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </Link>
        )}

        {ponte.parar && (
          <Link
            to={ponte.parar.to}
            className="rounded-xl border border-border bg-background p-4 transition-colors hover:border-accent"
          >
            <span className="text-[0.65rem] font-bold uppercase tracking-wide text-accent">
              Quando parar
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
              {ponte.parar.desc}
            </span>
            <span className="mt-2 inline-flex items-center gap-1 font-heading text-xs font-bold text-accent">
              {ponte.parar.linkLabel}
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </Link>
        )}
      </div>

      {decisao && guiaDecisao && (
        <div className="mt-5 rounded-xl border border-accent/40 bg-accent/5 p-4 md:p-5">
          <p className="text-[0.65rem] font-bold uppercase tracking-wide text-accent">
            Decisão que costuma vir a seguir
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{decisao.porQue}</p>
          <Link
            to={`/decisoes/${guiaDecisao.slug}`}
            className="mt-3 inline-flex items-center gap-1.5 font-heading text-sm font-bold text-accent hover:underline"
          >
            {guiaDecisao.nomeCurto}: ler o guia de decisão
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </section>
  );
};
