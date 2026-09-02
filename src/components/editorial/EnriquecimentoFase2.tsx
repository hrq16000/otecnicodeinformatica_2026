import { Link } from "@/lib/router-compat";
import { getEnriquecimentoFase2, FASE2_REVISADO_EM } from "@/lib/enriquecimentoFase2";

/**
 * FASE 2 — bloco aditivo de limite técnico, fontes primárias e ligação
 * semântica para artigos do blog. Renderiza no SSR (import estático) e
 * some por completo quando o artigo não tem pilar mapeado (fail-closed).
 */
export const EnriquecimentoFase2 = ({ slug }: { slug: string }) => {
  const pilar = getEnriquecimentoFase2(slug);
  if (!pilar) return null;

  return (
    <section
      className="not-prose mt-12 rounded-xl border border-accent/30 bg-accent/5 p-6"
      aria-labelledby={`fase2-${pilar.id}`}
    >
      <h2 id={`fase2-${pilar.id}`} className="font-heading text-xl font-bold text-foreground">
        {pilar.titulo}
      </h2>
      <p className="mt-2 text-base leading-relaxed text-muted-foreground">{pilar.intro}</p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="font-heading text-base font-bold text-foreground">Até onde ir sozinho</h3>
          <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
            {pilar.ateOndeIr.map((item) => (
              <li key={item} className="pl-4 -indent-4">— {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-heading text-base font-bold text-foreground">Quando parar</h3>
          <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
            {pilar.quandoParar.map((item) => (
              <li key={item} className="pl-4 -indent-4">— {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-heading text-base font-bold text-foreground">Fontes primárias consultadas</h3>
        <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
          {pilar.fontes.map((fonte) => (
            <li key={fonte.url}>
              <a
                href={fonte.url}
                rel="nofollow noopener external"
                target="_blank"
                className="font-semibold text-accent underline-offset-4 hover:underline"
              >
                {fonte.titulo}
              </a>
              {fonte.nota ? <span> — {fonte.nota}</span> : null}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-muted-foreground">
          Referências oficiais consultadas e conferidas em {FASE2_REVISADO_EM}. O texto acima é autoral;
          nenhuma fonte foi copiada.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-heading text-base font-bold text-foreground">Continue pelo caminho certo</h3>
        <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
          {pilar.links.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="font-semibold text-accent underline-offset-4 hover:underline">
                {link.anchor}
              </Link>
              <span> — {link.nota}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
