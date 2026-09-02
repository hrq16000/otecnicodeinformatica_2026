import { Link } from "@/lib/router-compat";
import { ArrowRight, BookOpen, ExternalLink, ListChecks, Scale, Stethoscope, Wrench } from "lucide-react";
import {
  ATLAS_ETAPA_LABEL,
  ATLAS_TEMAS,
  atlasArtigosAprovados,
  type AtlasTema,
} from "@/lib/atlasInformatica";
import { AtlasAprofundamentoBloco } from "@/components/informatica/AtlasAprofundamentoBloco";


/**
 * Trilhas do Atlas de Informática (Fases 1–2).
 * Cada tema segue a mesma progressão editorial:
 * aprender → identificar → verificar → parar → resolver.
 * Fase 2 adiciona o veredito técnico da bancada e as fontes primárias
 * visíveis — SOMENTE nos temas que declaram fontes (fail-closed).
 * Todo link aponta para conteúdo já existente e aprovado (fail-closed).
 */

const TemaCard = ({ tema }: { tema: AtlasTema }) => {
  const artigos = atlasArtigosAprovados(tema);

  return (
    <article
      id={`tema-${tema.id}`}
      aria-labelledby={`tema-${tema.id}-titulo`}
      className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 md:p-8"
    >
      <h3
        id={`tema-${tema.id}-titulo`}
        className="font-heading text-xl font-bold text-foreground md:text-2xl"
      >
        {tema.titulo}
      </h3>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
        {tema.resumo}
      </p>

      <aside
        aria-label={`Veredito técnico do tema ${tema.titulo}`}
        className="mt-4 flex items-start gap-3 rounded-xl border-l-4 border-accent bg-secondary/40 p-4"
      >
        <Scale className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-wide text-accent">
            Veredito da bancada
          </p>
          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {tema.veredito}
          </p>
        </div>
      </aside>

      <ol className="mt-5 grid gap-3 md:grid-cols-5" aria-label={`Trilha do tema ${tema.titulo}`}>
        {tema.trilha.map((passo, i) => (
          <li
            key={passo.etapa}
            className="flex h-full flex-col rounded-xl border border-border bg-background p-4"
          >
            <span className="text-[0.65rem] font-bold uppercase tracking-wide text-accent">
              {i + 1}. {ATLAS_ETAPA_LABEL[passo.etapa]}
            </span>
            <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
              {passo.desc}
            </p>
            <Link
              to={passo.to}
              className="mt-3 inline-flex items-center gap-1 font-heading text-xs font-bold text-accent hover:underline"
            >
              {passo.linkLabel}
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {artigos.length > 0 && (
          <div>
            <h4 className="flex items-center gap-2 font-heading text-sm font-bold text-foreground">
              <BookOpen className="h-4 w-4 text-accent" aria-hidden="true" />
              Guias aprovados
            </h4>
            <ul className="mt-2 space-y-1.5">
              {artigos.map((a) => (
                <li key={a.slug}>
                  <Link
                    to={`/blog/${a.slug}`}
                    className="text-sm leading-snug text-muted-foreground underline-offset-2 hover:text-accent hover:underline"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tema.problemas.length > 0 && (
          <div>
            <h4 className="flex items-center gap-2 font-heading text-sm font-bold text-foreground">
              <Stethoscope className="h-4 w-4 text-accent" aria-hidden="true" />
              Entrar pelo sintoma
            </h4>
            <ul className="mt-2 space-y-1.5">
              {tema.problemas.map((p) => (
                <li key={p.to}>
                  <Link
                    to={p.to}
                    className="text-sm leading-snug text-muted-foreground underline-offset-2 hover:text-accent hover:underline"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="flex items-center gap-2 font-heading text-sm font-bold text-foreground">
            <Wrench className="h-4 w-4 text-accent" aria-hidden="true" />
            Quando precisar de ajuda
          </h4>
          <ul className="mt-2 space-y-1.5">
            {tema.servicos.map((s) => (
              <li key={s.to}>
                <Link
                  to={s.to}
                  className="text-sm leading-snug text-muted-foreground underline-offset-2 hover:text-accent hover:underline"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AtlasAprofundamentoBloco temaId={tema.id} temaTitulo={tema.titulo} />



      {tema.fontes && tema.fontes.length > 0 && (
        <footer className="mt-6 border-t border-border pt-4">
          <p className="text-[0.65rem] font-bold uppercase tracking-wide text-muted-foreground">
            Fontes primárias deste tema
          </p>
          <ul className="mt-2 space-y-1">
            {tema.fontes.map((f) => (
              <li key={f.url} className="text-xs leading-relaxed text-muted-foreground">
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener nofollow"
                  className="inline-flex items-center gap-1 font-semibold text-foreground underline-offset-2 hover:text-accent hover:underline"
                >
                  {f.titulo}
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>{" "}
                — {f.nota}
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
};

export const AtlasTrilhas = () => (
  <section id="atlas" className="scroll-mt-24" aria-labelledby="atlas-titulo">
    <h2 id="atlas-titulo" className="mb-3 flex items-center gap-3 text-2xl font-bold text-foreground">
      <ListChecks className="h-6 w-6 text-accent" aria-hidden="true" />
      Trilhas por tema
    </h2>
    <p className="mb-6 max-w-3xl text-muted-foreground">
      Nove temas cobrem o essencial da informática doméstica e de escritório. Cada trilha segue a
      mesma ordem: aprender o fundamento, identificar o sintoma, executar só verificações seguras,
      saber quando parar e, por fim, escolher a solução adequada — que nem sempre é contratar um
      serviço.
    </p>
    <div className="space-y-6">
      {ATLAS_TEMAS.map((tema) => (
        <TemaCard key={tema.id} tema={tema} />
      ))}
    </div>
  </section>
);
