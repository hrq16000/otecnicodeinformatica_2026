import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Linha = { problema: string | null; servico: string | null; cidade: string | null; path: string | null };

const rotulo = (v: string | null | undefined) => (v && v !== "unknown" ? v : "não identificado");

function agrupar(linhas: Linha[], chave: (l: Linha) => string) {
  const m = new Map<string, number>();
  for (const l of linhas) m.set(chave(l), (m.get(chave(l)) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15);
}

/** Cliques reais no WhatsApp (click_events) por sintoma e por cidade. */
export function WhatsappCliquesPanel() {
  const [dias, setDias] = useState(30);
  const [linhas, setLinhas] = useState<Linha[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    setLinhas(null);
    const desde = new Date(Date.now() - dias * 86400000).toISOString();
    supabase
      .from("click_events")
      .select("problema,servico,cidade,path")
      .eq("event_type", "wa_click")
      .gte("created_at", desde)
      .limit(5000)
      .then(({ data, error }) => {
        if (error) setErro(error.message);
        else setLinhas((data ?? []) as Linha[]);
      });
  }, [dias]);

  const porSintoma = useMemo(
    () => agrupar(linhas ?? [], (l) => rotulo(l.problema !== "unknown" ? l.problema : l.servico)),
    [linhas],
  );
  const porCidade = useMemo(() => agrupar(linhas ?? [], (l) => rotulo(l.cidade)), [linhas]);

  const Tabela = ({ titulo, dados }: { titulo: string; dados: [string, number][] }) => (
    <div className="rounded-lg border border-border p-4">
      <h3 className="mb-2 font-semibold text-foreground">{titulo}</h3>
      {dados.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum clique no período.</p>
      ) : (
        <table className="w-full text-sm">
          <tbody>
            {dados.map(([k, n]) => (
              <tr key={k} className="border-t border-border">
                <td className="py-1 text-foreground">{k}</td>
                <td className="py-1 text-right tabular-nums text-muted-foreground">{n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Cliques no WhatsApp por sintoma e cidade</h2>
          <p className="text-sm text-muted-foreground">
            Cada toque em um botão de WhatsApp do site. Cliques duplicados em sequência são descartados.
          </p>
        </div>
        <select
          className="rounded-md border border-border bg-background px-2 py-1 text-sm"
          value={dias}
          onChange={(e) => setDias(Number(e.target.value))}
        >
          <option value={7}>7 dias</option>
          <option value={30}>30 dias</option>
          <option value={90}>90 dias</option>
        </select>
      </div>
      {erro && <p className="text-sm text-destructive">Erro ao carregar: {erro}</p>}
      {!linhas && !erro && <p className="text-sm text-muted-foreground">Carregando…</p>}
      {linhas && (
        <>
          <p className="mb-3 text-sm text-foreground">
            Total no período: <strong>{linhas.length}</strong>
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Tabela titulo="Por sintoma / serviço" dados={porSintoma} />
            <Tabela titulo="Por cidade" dados={porCidade} />
          </div>
        </>
      )}
    </section>
  );
}
