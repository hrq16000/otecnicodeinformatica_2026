/**
 * INVENTÁRIO GSC POR URL + RASTREADOR DE CONSULTAS.
 *
 * Lista TODAS as URLs curadas do portal com o estado real reportado pelo
 * Google Search Console (inspeção quando existe, desempenho quando não) e os
 * termos reais que trouxeram impressões e cliques.
 *
 * Fail-closed: sem snapshot válido, o painel diz "sem dados" — nunca estima.
 */
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  gscConsultasTop,
  gscInventario,
  gscSnapshot,
  ROTULO_ESTADO,
  type EstadoInventario,
} from "@/lib/gscSnapshot";

const FILTROS: { id: "todas" | EstadoInventario; rotulo: string }[] = [
  { id: "todas", rotulo: "Todas" },
  { id: "indexada", rotulo: "Indexadas" },
  { id: "com-impressoes", rotulo: "Aparecem na busca" },
  { id: "nao-indexada", rotulo: "Não indexadas" },
  { id: "sem-dados", rotulo: "Sem dados" },
];

const VARIANTE: Record<EstadoInventario, "default" | "secondary" | "outline" | "destructive"> = {
  indexada: "default",
  "com-impressoes": "secondary",
  "nao-indexada": "destructive",
  "sem-dados": "outline",
};

export function GscInventarioPanel() {
  const [filtro, setFiltro] = useState<"todas" | EstadoInventario>("todas");
  const [busca, setBusca] = useState("");

  const contagem = useMemo(() => {
    const base: Record<string, number> = {};
    for (const item of gscInventario) base[item.estado] = (base[item.estado] ?? 0) + 1;
    return base;
  }, []);

  const linhas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return gscInventario.filter(
      (i) =>
        (filtro === "todas" || i.estado === filtro) &&
        (!termo ||
          i.caminho.toLowerCase().includes(termo) ||
          (i.consultaPrincipal ?? "").toLowerCase().includes(termo)),
    );
  }, [filtro, busca]);

  if (gscSnapshot.status !== "ok" || gscInventario.length === 0) {
    return (
      <Card className="mt-6 p-4">
        <h2 className="text-base font-semibold">Status por URL (Search Console)</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sem snapshot disponível. Rode <code>npm run report:gsc-snapshot</code> com as
          credenciais do conector para popular o inventário real.
        </p>
      </Card>
    );
  }

  return (
    <section className="mt-6 space-y-6">
      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold">Status por URL (Search Console)</h2>
            <p className="text-xs text-muted-foreground">
              {gscInventario.length} URLs curadas · período {gscSnapshot.periodo?.inicio} →{" "}
              {gscSnapshot.periodo?.fim} · propriedade {gscSnapshot.propriedade?.siteUrl}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTROS.map((f) => (
              <Button
                key={f.id}
                size="sm"
                variant={filtro === f.id ? "default" : "outline"}
                onClick={() => setFiltro(f.id)}
              >
                {f.rotulo}
                {f.id !== "todas" && ` (${contagem[f.id] ?? 0})`}
              </Button>
            ))}
          </div>
        </div>

        <Input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Filtrar por URL ou consulta"
          aria-label="Filtrar inventário por URL ou consulta"
          className="mt-3 max-w-xs"
        />

        <div className="mt-3 max-h-[32rem] overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-background text-left text-xs text-muted-foreground">
              <tr>
                <th className="py-2 pr-2">URL</th>
                <th className="py-2 pr-2">Estado</th>
                <th className="py-2 pr-2 text-right">Impr.</th>
                <th className="py-2 pr-2 text-right">Cliques</th>
                <th className="py-2 pr-2 text-right">Posição</th>
                <th className="py-2">Consulta principal</th>
              </tr>
            </thead>
            <tbody>
              {linhas.map((i) => (
                <tr key={i.caminho} className="border-t border-border align-top">
                  <td className="py-2 pr-2 font-mono text-xs">{i.caminho}</td>
                  <td className="py-2 pr-2">
                    <Badge variant={VARIANTE[i.estado]}>{ROTULO_ESTADO[i.estado]}</Badge>
                    {i.cobertura && (
                      <span className="ml-2 text-xs text-muted-foreground">{i.cobertura}</span>
                    )}
                  </td>
                  <td className="py-2 pr-2 text-right tabular-nums">{i.impressoes}</td>
                  <td className="py-2 pr-2 text-right tabular-nums">{i.cliques}</td>
                  <td className="py-2 pr-2 text-right tabular-nums">{i.posicaoMedia ?? "—"}</td>
                  <td className="py-2 text-xs text-muted-foreground">
                    {i.consultaPrincipal ?? "—"}
                  </td>
                </tr>
              ))}
              {linhas.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-3 text-sm text-muted-foreground">
                    Nenhuma URL para o filtro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Estado sem inspeção individual não prova ausência de indexação: o Search Console
          omite linhas de volume muito baixo e atrasa ~2 dias.
        </p>
      </Card>

      <Card className="p-4">
        <h2 className="text-base font-semibold">Rastreador de consultas reais</h2>
        <p className="text-xs text-muted-foreground">
          {gscConsultasTop.length} termos reportados no período. Cliques totais:{" "}
          {gscSnapshot.totais?.cliques ?? 0}.
        </p>
        <div className="mt-3 max-h-96 overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-background text-left text-xs text-muted-foreground">
              <tr>
                <th className="py-2 pr-2">Termo buscado</th>
                <th className="py-2 pr-2 text-right">Impr.</th>
                <th className="py-2 pr-2 text-right">Cliques</th>
                <th className="py-2 text-right">Posição</th>
              </tr>
            </thead>
            <tbody>
              {gscConsultasTop.slice(0, 200).map((c) => (
                <tr key={c.termo} className="border-t border-border">
                  <td className="py-2 pr-2">{c.termo}</td>
                  <td className="py-2 pr-2 text-right tabular-nums">{c.impressoes}</td>
                  <td className="py-2 pr-2 text-right tabular-nums">{c.cliques}</td>
                  <td className="py-2 text-right tabular-nums">{c.posicao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}
