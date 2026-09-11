import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  autoridadePorTermo,
  autoridadePorUrl,
  gscBaseline,
  resumoAutoridade,
} from "@/lib/gscAutoridade";

/**
 * AUTORIDADE REAL POR URL E POR TERMO (Search Console × baseline).
 *
 * Compara o período corrente com o marco congelado em
 * `src/data/gscBaseline.json`. Sem snapshot válido, declara indisponibilidade.
 */
const Delta = ({ valor, invertido = false }: { valor: number | null; invertido?: boolean }) => {
  if (valor === null) return <span className="text-muted-foreground">novo</span>;
  if (valor === 0) return <span className="text-muted-foreground">=</span>;
  const bom = invertido ? valor < 0 : valor > 0;
  const sinal = valor > 0 ? "+" : "";
  return (
    <span className={bom ? "text-emerald-600" : "text-amber-600"}>
      {sinal}
      {valor}
    </span>
  );
};

export function GscAutoridadePanel() {
  const [busca, setBusca] = useState("");
  const resumo = useMemo(() => resumoAutoridade(), []);
  const urls = useMemo(() => autoridadePorUrl(), []);
  const termos = useMemo(() => autoridadePorTermo(40), []);

  const filtro = busca.trim().toLowerCase();
  const urlsFiltradas = filtro
    ? urls.filter((u) => u.caminho.toLowerCase().includes(filtro) || (u.consultaPrincipal ?? "").includes(filtro))
    : urls.slice(0, 40);
  const termosFiltrados = filtro
    ? termos.filter((t) => t.termo.includes(filtro) || (t.caminho ?? "").includes(filtro))
    : termos;

  if (!resumo.disponivel) {
    return (
      <Card className="p-4 text-sm">
        <h3 className="font-semibold">Autoridade real por URL</h3>
        <p className="mt-2 text-muted-foreground">
          Sem dados do Search Console no momento. Rode{" "}
          <code>node scripts/report-gsc-snapshot.mjs --inspect</code> com as credenciais do conector.
        </p>
      </Card>
    );
  }

  return (
    <section className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-semibold">Autoridade real por URL e por termo</h3>
          <p className="text-xs text-muted-foreground">
            Período {resumo.periodo?.inicio} → {resumo.periodo?.fim} · baseline {resumo.basePeriodo?.inicio} →{" "}
            {resumo.basePeriodo?.fim} (congelado em {gscBaseline.congeladoEm})
          </p>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { rotulo: "Impressões", valor: resumo.impressoes, base: resumo.baseImpressoes },
            { rotulo: "Cliques", valor: resumo.cliques, base: resumo.baseCliques },
            { rotulo: "URLs com dados", valor: resumo.urlsComDados },
            { rotulo: "URLs novas", valor: resumo.urlsNovas },
            { rotulo: "Em alta", valor: resumo.urlsEmAlta },
            { rotulo: "Em queda", valor: resumo.urlsEmQueda },
          ].map((m) => (
            <div key={m.rotulo} className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">{m.rotulo}</p>
              <p className="text-lg font-semibold">{m.valor}</p>
              {m.base !== undefined && (
                <p className="text-xs text-muted-foreground">
                  baseline {m.base} · <Delta valor={m.valor - m.base} />
                </p>
              )}
            </div>
          ))}
        </div>

        <Input
          className="mt-3"
          placeholder="Filtrar por URL ou termo buscado"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </Card>

      <Card className="p-4">
        <h4 className="text-sm font-semibold">Por URL ({urlsFiltradas.length})</h4>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-muted-foreground">
              <tr>
                <th className="py-1">URL</th>
                <th className="py-1">Impressões</th>
                <th className="py-1">Δ baseline</th>
                <th className="py-1">Cliques</th>
                <th className="py-1">Posição</th>
                <th className="py-1">Δ posição</th>
                <th className="py-1">Termo principal</th>
              </tr>
            </thead>
            <tbody>
              {urlsFiltradas.map((u) => (
                <tr key={u.caminho} className="border-t">
                  <td className="py-1">
                    <a className="underline" href={u.caminho} target="_blank" rel="noreferrer">
                      {u.caminho}
                    </a>
                    {u.novidade && (
                      <Badge variant="secondary" className="ml-2">
                        nova
                      </Badge>
                    )}
                  </td>
                  <td className="py-1">{u.impressoes}</td>
                  <td className="py-1">
                    <Delta valor={u.deltaImpressoes} />
                  </td>
                  <td className="py-1">{u.cliques}</td>
                  <td className="py-1">{u.posicao ?? "—"}</td>
                  <td className="py-1">
                    <Delta valor={u.deltaPosicao} invertido />
                  </td>
                  <td className="py-1 text-muted-foreground">{u.consultaPrincipal ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-4">
        <h4 className="text-sm font-semibold">Por termo buscado ({termosFiltrados.length})</h4>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-muted-foreground">
              <tr>
                <th className="py-1">Termo</th>
                <th className="py-1">Impressões</th>
                <th className="py-1">Δ baseline</th>
                <th className="py-1">Cliques</th>
                <th className="py-1">Posição</th>
                <th className="py-1">Δ posição</th>
                <th className="py-1">Página correspondente</th>
              </tr>
            </thead>
            <tbody>
              {termosFiltrados.map((t) => (
                <tr key={t.termo} className="border-t">
                  <td className="py-1">
                    {t.termo}
                    {t.novidade && (
                      <Badge variant="secondary" className="ml-2">
                        novo
                      </Badge>
                    )}
                  </td>
                  <td className="py-1">{t.impressoes}</td>
                  <td className="py-1">
                    <Delta valor={t.deltaImpressoes} />
                  </td>
                  <td className="py-1">{t.cliques}</td>
                  <td className="py-1">{t.posicao}</td>
                  <td className="py-1">
                    <Delta valor={t.deltaPosicao} invertido />
                  </td>
                  <td className="py-1">
                    {t.caminho ? (
                      <a className="underline" href={t.caminho} target="_blank" rel="noreferrer">
                        {t.caminho}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}
