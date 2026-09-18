import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { autoridadePorSegmento } from "@/lib/gscAutoridade";
import { gscSnapshot } from "@/lib/gscSnapshot";

/**
 * DESEMPENHO REAL POR SEGMENTO (sintoma, cidade, serviço…).
 *
 * Dados reais do Search Console já consolidados no snapshot. Fail-closed:
 * sem snapshot válido, declara ausência em vez de estimar números.
 */
export function GscSegmentosPanel() {
  const segmentos = useMemo(() => autoridadePorSegmento(), []);

  if (segmentos.length === 0) {
    return (
      <Card className="p-4 text-sm">
        <h3 className="font-semibold">Cliques e impressões por sintoma e cidade</h3>
        <p className="mt-2 text-muted-foreground">
          Sem dados do Search Console no momento.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-semibold">Cliques e impressões por sintoma e cidade</h3>
        {gscSnapshot.periodo && (
          <span className="text-xs text-muted-foreground">
            {gscSnapshot.periodo.inicio} a {gscSnapshot.periodo.fim}
          </span>
        )}
      </div>

      <div className="mt-4 space-y-4">
        {segmentos.map((s) => (
          <div key={s.segmento} className="rounded-md border p-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">{s.segmento}</span>
              <Badge variant="secondary">{s.urls} URL(s)</Badge>
              <Badge variant="outline">{s.impressoes} impressões</Badge>
              <Badge variant="outline">{s.cliques} cliques</Badge>
              {s.posicao !== null && <Badge variant="outline">posição média {s.posicao}</Badge>}
            </div>
            <ul className="mt-2 space-y-1 text-sm">
              {s.topUrls.map((u) => (
                <li key={u.caminho} className="flex flex-wrap items-center gap-2">
                  <a
                    href={u.caminho}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline underline-offset-2"
                  >
                    {u.caminho}
                  </a>
                  <span className="text-xs text-muted-foreground">
                    {u.impressoes} impressões · {u.cliques} cliques
                    {u.posicao !== null ? ` · posição ${u.posicao}` : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
}
