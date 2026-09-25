import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { exportarCsv } from "@/lib/exportarRelatorio";

type Acao = {
  id: string;
  created_at: string;
  neighborhood_slug: string | null;
  city: string | null;
  service_slug: string | null;
  equipamento: string | null;
  sintoma: string | null;
  status_atendimento: string;
  prazo: string | null;
};

const STATUS = ["novo", "contatado", "agendado", "fechado", "perdido"] as const;

const hoje = () => new Date().toISOString().slice(0, 10);

/** SLA: primeiro contato em até 24 h após a solicitação. */
const sla = (l: Acao) =>
  l.status_atendimento !== "novo"
    ? "respondido"
    : Date.now() - new Date(l.created_at).getTime() > 864e5
      ? "estourado"
      : "no prazo";

/**
 * AÇÕES POR BAIRRO E SERVIÇO — gestão direta de cada solicitação.
 * Mostra status e prazo editáveis, agrupados por bairro/cidade.
 * Fail-closed: sem solicitações no período, declara ausência.
 */
export default function FunnelAcoesBairro({ dias = 60 }: { dias?: number }) {
  const [linhas, setLinhas] = useState<Acao[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const desde = new Date(Date.now() - dias * 864e5).toISOString();
    void supabase
      .from("funnel_submissions")
      .select("id, created_at, neighborhood_slug, city, service_slug, equipamento, sintoma, status_atendimento, prazo")
      .gte("created_at", desde)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setLinhas((data ?? []) as Acao[]);
        setCarregando(false);
      });
  }, [dias]);

  const salvar = async (id: string, campos: Partial<Pick<Acao, "status_atendimento" | "prazo">>) => {
    const { error } = await supabase.from("funnel_submissions").update(campos).eq("id", id);
    if (error) {
      toast({ title: "Não foi possível salvar", description: error.message, variant: "destructive" });
      return;
    }
    setLinhas((prev) => prev.map((l) => (l.id === id ? { ...l, ...campos } : l)));
    toast({ title: "Atualizado" });
  };

  const grupos = new Map<string, Acao[]>();
  for (const l of linhas) {
    const chave = l.neighborhood_slug || l.city || "sem origem local";
    grupos.set(chave, [...(grupos.get(chave) ?? []), l]);
  }
  const ordenado = Array.from(grupos.entries()).sort((a, b) => b[1].length - a[1].length);

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">
          Ações por bairro e serviço — status, prazo e SLA ({dias} dias)
        </CardTitle>
        <button
          type="button"
          className="rounded-md border px-3 py-1 text-xs"
          disabled={!linhas.length}
          onClick={() =>
            exportarCsv(
              "chamados",
              linhas.map((l) => ({
                data: l.created_at.slice(0, 10),
                bairro: l.neighborhood_slug ?? "",
                cidade: l.city ?? "",
                servico: l.service_slug ?? l.equipamento ?? "",
                sintoma: l.sintoma ?? "",
                status: l.status_atendimento,
                prazo: l.prazo ?? "",
                sla: sla(l),
              })),
            )
          }
        >
          Exportar CSV
        </button>
      </CardHeader>
      <CardContent>
        {carregando ? (
          <p className="text-sm text-muted-foreground">Carregando…</p>
        ) : ordenado.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma solicitação registrada no período.</p>
        ) : (
          <div className="space-y-5">
            {ordenado.map(([bairro, itens]) => (
              <div key={bairro}>
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-medium">{bairro}</span>
                  <Badge variant="secondary">{itens.length}</Badge>
                  {itens.some((i) => i.prazo && i.prazo < hoje() && i.status_atendimento !== "fechado") && (
                    <Badge variant="destructive">prazo vencido</Badge>
                  )}
                </div>
                <div className="space-y-2">
                  {itens.map((i) => (
                    <div
                      key={i.id}
                      className="flex flex-wrap items-center gap-2 rounded-md border p-2 text-sm"
                    >
                      <span className="min-w-28 text-xs text-muted-foreground">
                        {new Date(i.created_at).toLocaleDateString("pt-BR")}
                      </span>
                      <span className="min-w-40">
                        {i.service_slug || i.equipamento || "—"}
                        {i.sintoma ? ` · ${i.sintoma}` : ""}
                      </span>
                      <select
                        className="h-8 rounded-md border bg-background px-2 text-xs"
                        value={i.status_atendimento}
                        onChange={(e) => void salvar(i.id, { status_atendimento: e.target.value })}
                        aria-label="Status do atendimento"
                      >
                        {STATUS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <Input
                        type="date"
                        className="h-8 w-40 text-xs"
                        defaultValue={i.prazo ?? ""}
                        aria-label="Prazo de atendimento"
                        onBlur={(e) => {
                          const valor = e.target.value || null;
                          if (valor !== (i.prazo ?? null)) void salvar(i.id, { prazo: valor });
                        }}
                      />
                      {sla(i) === "estourado" && (
                        <Badge variant="destructive" className="text-[10px]">
                          SLA 24 h estourado
                        </Badge>
                      )}
                      {i.prazo && i.prazo < hoje() && i.status_atendimento !== "fechado" && (
                        <Badge variant="destructive" className="text-[10px]">
                          vencido
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
