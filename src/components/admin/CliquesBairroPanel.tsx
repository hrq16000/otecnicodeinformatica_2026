import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Linha = {
  problema: string | null;
  servico: string | null;
  cidade: string | null;
  bairro: string | null;
  neighborhood_slug: string | null;
};

const rotulo = (v: string | null | undefined) => (v && v !== "unknown" ? v : "não identificado");

type Grupo = { bairro: string; total: number; sintomas: [string, number][]; cidades: [string, number][] };

function top(m: Map<string, number>, n = 5) {
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

/** Cliques no WhatsApp agrupados por bairro, com sintoma e cidade dentro de cada bairro. */
export function CliquesBairroPanel() {
  const [dias, setDias] = useState(30);
  const [linhas, setLinhas] = useState<Linha[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    setLinhas(null);
    setErro(null);
    const desde = new Date(Date.now() - dias * 86400000).toISOString();
    supabase
      .from("click_events")
      .select("problema,servico,cidade,bairro,neighborhood_slug")
      .eq("event_type", "wa_click")
      .gte("created_at", desde)
      .limit(5000)
      .then(({ data, error }) => {
        if (error) setErro(error.message);
        else setLinhas((data ?? []) as Linha[]);
      });
  }, [dias]);

  const grupos = useMemo<Grupo[]>(() => {
    const m = new Map<string, { total: number; s: Map<string, number>; c: Map<string, number> }>();
    for (const l of linhas ?? []) {
      const b = rotulo(l.bairro ?? l.neighborhood_slug);
      const g = m.get(b) ?? { total: 0, s: new Map(), c: new Map() };
      g.total++;
      const s = rotulo(l.problema && l.problema !== "unknown" ? l.problema : l.servico);
      const c = rotulo(l.cidade);
      g.s.set(s, (g.s.get(s) ?? 0) + 1);
      g.c.set(c, (g.c.get(c) ?? 0) + 1);
      m.set(b, g);
    }
    return [...m.entries()]
      .map(([bairro, g]) => ({ bairro, total: g.total, sintomas: top(g.s), cidades: top(g.c, 3) }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 30);
  }, [linhas]);

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Cliques por bairro (sintoma e cidade)</h2>
          <p className="text-sm text-muted-foreground">
            Toques no WhatsApp agrupados pelo bairro da página, com os sintomas e cidades mais frequentes.
          </p>
        </div>
        <select
          aria-label="Período"
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
      {linhas && grupos.length === 0 && <p className="text-sm text-muted-foreground">Nenhum clique no período.</p>}
      {grupos.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="py-1 pr-3">Bairro</th>
                <th className="py-1 pr-3 text-right">Cliques</th>
                <th className="py-1 pr-3">Sintomas</th>
                <th className="py-1">Cidades</th>
              </tr>
            </thead>
            <tbody>
              {grupos.map((g) => (
                <tr key={g.bairro} className="border-t border-border align-top">
                  <td className="py-2 pr-3 font-medium text-foreground">{g.bairro}</td>
                  <td className="py-2 pr-3 text-right tabular-nums text-foreground">{g.total}</td>
                  <td className="py-2 pr-3 text-muted-foreground">
                    {g.sintomas.map(([k, n]) => `${k} (${n})`).join(" · ")}
                  </td>
                  <td className="py-2 text-muted-foreground">
                    {g.cidades.map(([k, n]) => `${k} (${n})`).join(" · ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
