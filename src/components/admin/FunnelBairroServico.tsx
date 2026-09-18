import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Linha = {
  neighborhood_slug: string | null;
  city: string | null;
  service_slug: string | null;
  status_atendimento: string;
};

/**
 * Resumo de solicitações por bairro (e serviço), últimos N dias.
 * Fail-closed: sem dados no período, declara ausência em vez de estimar.
 */
export default function FunnelBairroServico({ dias = 30 }: { dias?: number }) {
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const desde = new Date(Date.now() - dias * 24 * 60 * 60 * 1000).toISOString();
    void supabase
      .from("funnel_submissions")
      .select("neighborhood_slug, city, service_slug, status_atendimento")
      .gte("created_at", desde)
      .then(({ data }) => {
        setLinhas((data ?? []) as Linha[]);
        setCarregando(false);
      });
  }, [dias]);

  const porBairro = new Map<
    string,
    { total: number; fechados: number; servicos: Map<string, number> }
  >();
  for (const l of linhas) {
    const chave = l.neighborhood_slug || l.city || "sem origem local";
    const atual = porBairro.get(chave) ?? { total: 0, fechados: 0, servicos: new Map() };
    atual.total += 1;
    if (l.status_atendimento === "fechado") atual.fechados += 1;
    if (l.service_slug) {
      atual.servicos.set(l.service_slug, (atual.servicos.get(l.service_slug) ?? 0) + 1);
    }
    porBairro.set(chave, atual);
  }
  const ordenado = Array.from(porBairro.entries()).sort((a, b) => b[1].total - a[1].total);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">
          Solicitações por bairro e serviço — últimos {dias} dias
        </CardTitle>
      </CardHeader>
      <CardContent>
        {carregando ? (
          <p className="text-sm text-muted-foreground">Carregando…</p>
        ) : ordenado.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhuma solicitação registrada no período.
          </p>
        ) : (
          <div className="space-y-2">
            {ordenado.map(([bairro, dados]) => (
              <div key={bairro} className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-medium min-w-40">{bairro}</span>
                <Badge variant="secondary">{dados.total} solicitação(ões)</Badge>
                {dados.fechados > 0 && (
                  <Badge variant="outline">{dados.fechados} fechada(s)</Badge>
                )}
                {Array.from(dados.servicos.entries())
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 4)
                  .map(([servico, n]) => (
                    <Badge key={servico} variant="outline">
                      {servico}: {n}
                    </Badge>
                  ))}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
