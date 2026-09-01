import { Link } from "@/lib/router-compat";
import { ArrowRight, BookOpenText, ListChecks } from "lucide-react";
import { bibliotecaPonteDe } from "@/lib/bibliotecaPontes";

/**
 * Ponte página → Biblioteca Técnica (Fase 3): checklist/termos que ajudam a
 * decidir ANTES de contratar. Fail-closed: sem ponte curada, nada renderiza.
 * Bloco aditivo e educativo — não substitui ficha comercial, preço nem CTA.
 */
export const BibliotecaPonte = ({ chave }: { chave: string }) => {
  const ponte = bibliotecaPonteDe(chave);
  if (!ponte) return null;

  return (
    <section
      className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8"
      aria-labelledby="biblioteca-ponte-titulo"
    >
      <h2
        id="biblioteca-ponte-titulo"
        className="flex items-center gap-3 font-heading text-xl font-bold text-foreground md:text-2xl"
      >
        <BookOpenText className="h-5 w-5 text-accent" aria-hidden="true" />
        Verifique antes de decidir
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
        {ponte.intro}
      </p>

      {ponte.ferramentas.length > 0 ? (
        <div className="mt-4 space-y-3">
          {ponte.ferramentas.map((f) => (
            <Link
              key={f.slug}
              to={`/ferramentas/${f.slug}`}
              className="group flex items-start justify-between gap-3 rounded-xl border border-accent/40 bg-accent/5 p-4 transition-colors hover:border-accent"
            >
              <span className="flex items-start gap-3">
                <ListChecks className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  <span className="block font-heading text-sm font-bold text-foreground group-hover:text-accent">
                    {f.nome} — gratuito, sem cadastro
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {f.objetivo}
                  </span>
                </span>
              </span>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            </Link>
          ))}
        </div>
      ) : null}

      {ponte.termos.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-sm font-semibold text-foreground">No glossário técnico:</span>
          {ponte.termos.map((t) => (
            <Link
              key={t.slug}
              to={`/glossario/${t.slug}`}
              className="inline-flex items-center gap-1.5 font-heading text-sm font-bold text-accent underline-offset-4 hover:underline"
            >
              {t.termo}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
};
