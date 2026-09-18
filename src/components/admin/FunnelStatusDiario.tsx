import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Linha = { created_at: string; status_atendimento: string };

const STATUS = ["novo", "contatado", "agendado", "fechado", "perdido"] as const;

/** Métricas diárias de solicitações por status (últimos 14 dias). */
export default function FunnelStatusDiario({ dias = 14 }: { dias?: number }) {
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const desde = new Date(Date.now() - dias * 24 * 60 * 60 * 1000).toISOString();
    void supabase
      .from("funnel_submissions")
      .select("created_at, status_atendimento")
      .gte("created_at", desde)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setLinhas((data ?? []) as Linha[]);
        setCarregando(false);
      });
  }, [dias]);

  const porDia = new Map<string, Record<string, number>>();
  for (const l of linhas) {
    const dia = new Date(l.created_at).toISOString().slice(0, 10);
    const atual = porDia.get(dia) ?? {};
    atual[l.status_atendimento] = (atual[l.status_atendimento] ?? 0) + 1;
    porDia.set(dia, atual);
  }
  const dias_ordenados = Array.from(porDia.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">
          Solicitações por dia e status — últimos {dias} dias
        </CardTitle>
      </CardHeader>
      <CardContent>
        {carregando ? (
          <p className="text-sm text-muted-foreground">Carregando…</p>
        ) : dias_ordenados.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhuma solicitação registrada no período.
          </p>
        ) : (
          <div className="space-y-2">
            {dias_ordenados.map(([dia, contagens]) => {
              const total = Object.values(contagens).reduce((a, b) => a + b, 0);
              return (
                <div key={dia} className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-medium w-24">
                    {new Date(`${dia}T12:00:00Z`).toLocaleDateString("pt-BR")}
                  </span>
                  <Badge variant="secondary">{total} no total</Badge>
                  {STATUS.filter((s) => contagens[s]).map((s) => (
                    <Badge key={s} variant="outline">
                      {s}: {contagens[s]}
                    </Badge>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
