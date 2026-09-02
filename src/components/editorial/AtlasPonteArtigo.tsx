import { Link } from "@/lib/router-compat";
import { ArrowRight, Compass } from "lucide-react";
import { atlasPonteDoArtigo } from "@/lib/atlasPontesArtigos";

/**
 * Ponte artigo-pilar → trilha do Atlas → próximo passo editorial.
 * Fail-closed: sem ponte curada para o slug, nada é renderizado.
 * Bloco informativo — nenhum CTA comercial aqui.
 */
export const AtlasPonteArtigo = ({ slug }: { slug: string }) => {
  const ponte = atlasPonteDoArtigo(slug);
  if (!ponte) return null;

  return (
    <section
      className="not-prose mt-12 rounded-2xl border border-border bg-card p-6 md:p-8"
      aria-labelledby="atlas-ponte-artigo-titulo"
    >
      <h2
        id="atlas-ponte-artigo-titulo"
        className="flex items-center gap-3 font-heading text-xl font-bold text-foreground md:text-2xl"
      >
        <Compass className="h-5 w-5 text-accent" aria-hidden="true" />
        Onde este guia entra no Atlas
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
        {ponte.porQue}
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <Link
          to={ponte.hubHref}
          className="rounded-xl border border-border bg-background p-4 transition-colors hover:border-accent"
        >
          <span className="text-[0.65rem] font-bold uppercase tracking-wide text-accent">
            Tema
          </span>
          <span className="mt-1 block font-heading text-sm font-bold text-foreground">
            {ponte.tema.titulo}
          </span>
          <span className="mt-1 block text-xs text-muted-foreground">
            Trilha completa: aprender, identificar, verificar, parar e resolver.
          </span>
        </Link>

        <Link
          to={ponte.proximoPasso.to}
          className="rounded-xl border border-border bg-background p-4 transition-colors hover:border-accent"
        >
          <span className="text-[0.65rem] font-bold uppercase tracking-wide text-accent">
            Próximo passo
          </span>
          <span className="mt-1 block font-heading text-sm font-bold text-foreground">
            {ponte.proximoPasso.rotulo}
          </span>
          <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
            {ponte.proximoPasso.contexto}
          </span>
          <span className="mt-2 inline-flex items-center gap-1 font-heading text-xs font-bold text-accent">
            Continuar
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
};
