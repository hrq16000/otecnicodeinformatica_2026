import { Link } from "@/lib/router-compat";
import type {
  BlocoTecnico,
  FechoContextual,
  FontePrimaria,
  TabelaDiagnostica,
} from "@/lib/enriquecimento";

/**
 * UI compartilhada dos blocos de enriquecimento (Micro-Rodada Enriquecimento 1).
 *
 * O componente é compartilhado; o CONTEÚDO não. Cada página define seus
 * próprios títulos, tabela e itens em src/lib/cluster*.ts.
 */

export const RespostaRapida = ({
  texto,
  titulo = "Resposta rápida",
  id = "resposta-rapida",
}: {
  texto: string;
  /** Rótulo do bloco. Rotas com mais de um bloco usam títulos distintos
   *  para não repetir o mesmo H2 na mesma página (gate check:geo). */
  titulo?: string;
  id?: string;
}) => (
  <section className="mt-8 rounded-xl border border-accent/40 bg-accent/5 p-5" aria-labelledby={id}>
    <h2 id={id} className="font-heading text-xl font-bold text-foreground">
      {titulo}
    </h2>
    <p className="mt-2 text-base leading-relaxed text-muted-foreground">{texto}</p>
  </section>
);


const FechoLink = ({ fecho }: { fecho: FechoContextual }) => (
  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
    {fecho.antes}
    <Link to={fecho.to} className="font-bold text-accent underline-offset-4 hover:underline">
      {fecho.anchor}
    </Link>
    {fecho.depois}
  </p>
);

export const TabelaDiagnosticaBloco = ({
  tabela,
  id = "tabela-diagnostica",
}: {
  tabela: TabelaDiagnostica;
  id?: string;
}) => {
  const temAcao = tabela.linhas.some((l) => l.acao);
  const c = tabela.colunas ?? {};
  return (
    <section className="mt-12" aria-labelledby={id}>
      <h2 id={id} className="mb-4 font-heading text-2xl font-bold text-foreground">
        {tabela.titulo}
      </h2>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <thead className="bg-secondary/50">
            <tr>
              <th scope="col" className="p-3 font-heading font-bold text-foreground">{c.sintoma ?? "Sintoma"}</th>
              <th scope="col" className="p-3 font-heading font-bold text-foreground">{c.causa ?? "Possível causa"}</th>
              <th scope="col" className="p-3 font-heading font-bold text-foreground">{c.verificar ?? "O que verificar"}</th>
              {temAcao ? (
                <th scope="col" className="p-3 font-heading font-bold text-foreground">{c.acao ?? "Ação"}</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {tabela.linhas.map((l) => (
              <tr key={l.sintoma} className="border-t border-border align-top">
                <th scope="row" className="p-3 font-semibold text-foreground">{l.sintoma}</th>
                <td className="p-3 leading-relaxed text-muted-foreground">{l.causa}</td>
                <td className="p-3 leading-relaxed text-muted-foreground">{l.verificar}</td>
                {temAcao ? <td className="p-3 leading-relaxed text-muted-foreground">{l.acao ?? "—"}</td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export const BlocoTecnicoSecao = ({ bloco }: { bloco: BlocoTecnico }) => (
  <section className="mt-12" aria-labelledby={bloco.id}>
    <h2 id={bloco.id} className="mb-4 font-heading text-2xl font-bold text-foreground">
      {bloco.titulo}
    </h2>
    {bloco.intro ? (
      <p className="mb-4 text-base leading-relaxed text-muted-foreground">{bloco.intro}</p>
    ) : null}
    <div className="grid gap-4 sm:grid-cols-2">
      {bloco.itens.map((i) => (
        <article key={i.titulo} className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-heading font-bold text-foreground">{i.titulo}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.desc}</p>
        </article>
      ))}
    </div>
    {bloco.fecho ? <FechoLink fecho={bloco.fecho} /> : null}
  </section>
);

export const BlocosTecnicos = ({ blocos }: { blocos?: BlocoTecnico[] }) =>
  blocos && blocos.length > 0 ? (
    <>
      {blocos.map((b) => (
        <BlocoTecnicoSecao key={b.id} bloco={b} />
      ))}
    </>
  ) : null;

/** Fontes primárias visíveis (fabricantes e órgãos técnicos). */
export const FontesPrimarias = ({ fontes }: { fontes?: FontePrimaria[] }) =>
  fontes && fontes.length > 0 ? (
    <section className="mt-12" aria-labelledby="fontes-tecnicas">
      <h2 id="fontes-tecnicas" className="mb-3 font-heading text-xl font-bold text-foreground">
        Fontes técnicas consultadas
      </h2>
      <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
        {fontes.map((f) => (
          <li key={f.url}>
            <a
              href={f.url}
              target="_blank"
              rel="noopener nofollow"
              className="font-bold text-accent underline-offset-4 hover:underline"
            >
              {f.titulo}
            </a>
            {f.nota ? ` — ${f.nota}` : null}
          </li>
        ))}
      </ul>
    </section>
  ) : null;


/** Aviso de dados — usado só onde o procedimento pode afetar arquivos. */
export const AvisoDados = ({ texto }: { texto: string }) => (
  <p className="mt-6 rounded-xl border border-border bg-secondary/40 p-5 text-sm leading-relaxed text-muted-foreground">
    <strong className="text-foreground">Antes de qualquer apagamento: </strong>
    {texto}{" "}
    <Link to="/solucoes/backup" className="font-bold text-accent underline-offset-4 hover:underline">
      como o backup é conferido
    </Link>
    .
  </p>
);
