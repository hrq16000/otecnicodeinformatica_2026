import { Link } from "@/lib/router-compat";
import { AlertTriangle, ArrowRight, Ban, Compass, Eye, ShieldAlert, SquareCheck } from "lucide-react";
import { aprofundamentoDoTema } from "@/lib/atlasAprofundamento";

/**
 * FASE 5 — bloco de aprofundamento de cada tema do Atlas.
 *
 * Renderizado no SSR (sem JavaScript) dentro do card do tema, na ordem
 * editorial fixa: contexto → sinais → verificar → não fazer → pausar →
 * reparar/substituir/escalar → próximos passos.
 *
 * Fail-closed: tema sem aprofundamento declarado não renderiza nada.
 */

const Lista = ({
  titulo,
  itens,
  Icone,
  tom = "neutro",
}: {
  titulo: string;
  itens: string[];
  Icone: typeof Eye;
  tom?: "neutro" | "alerta" | "parada";
}) => {
  const marcador =
    tom === "parada" ? "text-destructive" : tom === "alerta" ? "text-accent" : "text-accent";
  return (
    <div>
      <h5 className="flex items-center gap-2 font-heading text-sm font-bold text-foreground">
        <Icone className={`h-4 w-4 ${marcador}`} aria-hidden="true" />
        {titulo}
      </h5>
      <ul className="mt-2 space-y-1.5">
        {itens.map((item) => (
          <li key={item} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
            <span aria-hidden="true" className={marcador}>
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const AtlasAprofundamentoBloco = ({ temaId, temaTitulo }: { temaId: string; temaTitulo: string }) => {
  const bloco = aprofundamentoDoTema(temaId);
  if (!bloco) return null;

  return (
    <section
      id={`tema-${temaId}-aprofundamento`}
      aria-label={`Aprofundamento do tema ${temaTitulo}`}
      className="mt-6 scroll-mt-24 rounded-xl border border-border bg-background p-5 md:p-6"
    >
      <p className="max-w-3xl font-heading text-sm font-bold leading-relaxed text-foreground md:text-base">
        {bloco.chamada}
      </p>

      {bloco.contexto.map((paragrafo) => (
        <p key={paragrafo.slice(0, 40)} className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {paragrafo}
        </p>
      ))}

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Lista titulo="Sinais que costumam aparecer" itens={bloco.sinais} Icone={Eye} />
        <Lista titulo="Como verificar com segurança" itens={bloco.verificar} Icone={SquareCheck} />
        <Lista titulo="O que não fazer" itens={bloco.naoFazer} Icone={Ban} tom="alerta" />
        <Lista titulo="Quando parar e não insistir" itens={bloco.pausar} Icone={ShieldAlert} tom="parada" />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {bloco.caminhos.map((c) => (
          <div key={c.rotulo} className="rounded-lg border border-border bg-card p-4">
            <p className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-wide text-accent">
              <AlertTriangle className="h-3 w-3" aria-hidden="true" />
              {c.rotulo}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{c.texto}</p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <h5 className="flex items-center gap-2 font-heading text-sm font-bold text-foreground">
          <Compass className="h-4 w-4 text-accent" aria-hidden="true" />
          Próximos passos
        </h5>
        <ul className="mt-2 grid gap-2 md:grid-cols-2">
          {bloco.proximosPassos.map((p) => (
            <li key={p.to} className="rounded-lg border border-border bg-card p-3">
              <Link
                to={p.to}
                className="inline-flex items-center gap-1 font-heading text-xs font-bold text-accent hover:underline"
              >
                {p.rotulo}
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.contexto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
