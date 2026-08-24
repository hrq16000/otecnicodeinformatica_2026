import { Link } from "@/lib/router-compat";
import type { BlocoTecnico, TabelaDiagnostica } from "@/lib/enriquecimento";

/**
 * UI compartilhada dos blocos de enriquecimento (Micro-Rodada Enriquecimento 1).
 *
 * O componente é compartilhado; o CONTEÚDO não. Cada página define seus
 * próprios títulos, tabela e itens em src/lib/cluster*.ts.
 */

export const RespostaRapida = ({ texto }: { texto: string }) => (
  <section className="mt-8 rounded-xl border border-accent/40 bg-accent/5 p-5" aria-labelledby="resposta-rapida">
    <h2 id="resposta-rapida" className="font-heading text-xl font-bold text-foreground">
      Resposta rápida
    </h2>
    <p className="mt-2 text-base leading-relaxed text-muted-foreground">{texto}</p>
  </section>
);

export const TabelaDiagnosticaBloco = ({ tabela }: { tabela: TabelaDiagnostica }) => (
  <section className="mt-12" aria-labelledby="tabela-diagnostica">
    <h2 id="tabela-diagnostica" className="mb-4 font-heading text-2xl font-bold text-foreground">
      {tabela.titulo}
    </h2>
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <thead className="bg-secondary/50">
          <tr>
            <th scope="col" className="p-3 font-heading font-bold text-foreground">Sintoma</th>
            <th scope="col" className="p-3 font-heading font-bold text-foreground">Possível causa</th>
            <th scope="col" className="p-3 font-heading font-bold text-foreground">O que verificar</th>
          </tr>
        </thead>
        <tbody>
          {tabela.linhas.map((l) => (
            <tr key={l.sintoma} className="border-t border-border align-top">
              <th scope="row" className="p-3 font-semibold text-foreground">{l.sintoma}</th>
              <td className="p-3 leading-relaxed text-muted-foreground">{l.causa}</td>
              <td className="p-3 leading-relaxed text-muted-foreground">{l.verificar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

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
