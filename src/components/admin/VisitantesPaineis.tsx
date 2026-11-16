import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const rotulo = (v: string | null | undefined) => (v && v !== "unknown" ? v : "não identificado");
const desdeIso = (dias: number) => new Date(Date.now() - dias * 86400000).toISOString();

function FiltroDias({ dias, setDias }: { dias: number; setDias: (n: number) => void }) {
  return (
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
  );
}

type Ev = {
  session_id: string | null;
  problema: string | null;
  servico: string | null;
  cidade: string | null;
  bairro: string | null;
  neighborhood_slug: string | null;
};

/** Visitantes únicos (sessões) que interagiram com o site, por sintoma, cidade e bairro. */
export function VisitantesSegmentoPanel() {
  const [dias, setDias] = useState(30);
  const [linhas, setLinhas] = useState<Ev[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    setLinhas(null);
    setErro(null);
    supabase
      .from("click_events")
      .select("session_id,problema,servico,cidade,bairro,neighborhood_slug")
      .gte("created_at", desdeIso(dias))
      .not("session_id", "is", null)
      .limit(10000)
      .then(({ data, error }) => (error ? setErro(error.message) : setLinhas((data ?? []) as Ev[])));
  }, [dias]);

  const tabelas = useMemo(() => {
    const contar = (chave: (e: Ev) => string) => {
      const m = new Map<string, Set<string>>();
      for (const e of linhas ?? []) {
        const k = chave(e);
        if (!m.has(k)) m.set(k, new Set());
        m.get(k)!.add(e.session_id!);
      }
      return [...m.entries()].map(([k, s]) => [k, s.size] as [string, number]).sort((a, b) => b[1] - a[1]).slice(0, 15);
    };
    return {
      total: new Set((linhas ?? []).map((e) => e.session_id)).size,
      sintoma: contar((e) => rotulo(e.problema && e.problema !== "unknown" ? e.problema : e.servico)),
      cidade: contar((e) => rotulo(e.cidade)),
      bairro: contar((e) => rotulo(e.bairro ?? e.neighborhood_slug)),
    };
  }, [linhas]);

  const Tabela = ({ titulo, dados }: { titulo: string; dados: [string, number][] }) => (
    <div className="rounded-lg border border-border p-4">
      <h3 className="mb-2 font-semibold text-foreground">{titulo}</h3>
      {dados.length === 0 ? (
        <p className="text-sm text-muted-foreground">Sem visitantes no período.</p>
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
          <h2 className="text-lg font-semibold text-foreground">Visitantes por sintoma, cidade e bairro</h2>
          <p className="text-sm text-muted-foreground">
            Visitantes únicos que tocaram em algum botão do site no período (cada visita conta uma vez por grupo).
          </p>
        </div>
        <FiltroDias dias={dias} setDias={setDias} />
      </div>
      {erro && <p className="text-sm text-destructive">Erro ao carregar: {erro}</p>}
      {!linhas && !erro && <p className="text-sm text-muted-foreground">Carregando…</p>}
      {linhas && (
        <>
          <p className="mb-3 text-sm text-foreground">
            Visitantes únicos: <strong>{tabelas.total}</strong>
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Tabela titulo="Por sintoma / serviço" dados={tabelas.sintoma} />
            <Tabela titulo="Por cidade" dados={tabelas.cidade} />
            <Tabela titulo="Por bairro" dados={tabelas.bairro} />
          </div>
        </>
      )}
    </section>
  );
}

/** Quantos visitantes descreveram o problema na caixa da home e quantos entraram no WhatsApp. */
export function CaixaProblemaWhatsappPanel() {
  const [dias, setDias] = useState(30);
  const [dados, setDados] = useState<{ caixa: Set<string>; wa: Set<string> } | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    setDados(null);
    setErro(null);
    const desde = desdeIso(dias);
    Promise.all([
      supabase
        .from("funnel_submissions")
        .select("session_id")
        .eq("equipamento", "descricao_ia")
        .gte("created_at", desde)
        .limit(10000),
      supabase
        .from("click_events")
        .select("session_id")
        .eq("event_type", "wa_click")
        .gte("created_at", desde)
        .not("session_id", "is", null)
        .limit(10000),
    ]).then(([a, b]) => {
      if (a.error || b.error) return setErro((a.error ?? b.error)!.message);
      setDados({
        caixa: new Set((a.data ?? []).map((r) => r.session_id)),
        wa: new Set((b.data ?? []).map((r) => r.session_id as string)),
      });
    });
  }, [dias]);

  const ambos = dados ? [...dados.caixa].filter((s) => dados.wa.has(s)).length : 0;
  const Card = ({ titulo, valor, nota }: { titulo: string; valor: number | string; nota: string }) => (
    <div className="rounded-lg border border-border p-4">
      <p className="text-sm text-muted-foreground">{titulo}</p>
      <p className="text-2xl font-semibold tabular-nums text-foreground">{valor}</p>
      <p className="mt-1 text-xs text-muted-foreground">{nota}</p>
    </div>
  );

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Caixa de problema × WhatsApp</h2>
          <p className="text-sm text-muted-foreground">Visitantes únicos no período.</p>
        </div>
        <FiltroDias dias={dias} setDias={setDias} />
      </div>
      {erro && <p className="text-sm text-destructive">Erro ao carregar: {erro}</p>}
      {!dados && !erro && <p className="text-sm text-muted-foreground">Carregando…</p>}
      {dados && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card titulo="Preencheram a caixa de problema" valor={dados.caixa.size} nota="Descrições enviadas na home" />
          <Card titulo="Entraram no WhatsApp" valor={dados.wa.size} nota="Tocaram em qualquer botão de WhatsApp" />
          <Card
            titulo="Descreveram e depois foram ao WhatsApp"
            valor={dados.caixa.size ? `${ambos} (${Math.round((ambos / dados.caixa.size) * 100)}%)` : ambos}
            nota="Mesma visita nos dois"
          />
        </div>
      )}
    </section>
  );
}
