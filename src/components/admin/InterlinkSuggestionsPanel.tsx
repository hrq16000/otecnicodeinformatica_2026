import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

/**
 * SUGESTÃO DE INTERLINKS — widget de /admin/seo.
 *
 * Fonte única: `public/interlink-suggestions.json`, escrito por
 * `npm run report:interlinks-sugestoes`. Os pares saem do tema já declarado
 * no índice editorial e dos links reais do HTML do build — nada é inferido
 * no navegador.
 */

interface Sugestao {
  cluster: string;
  de: string;
  deTitulo: string;
  para: string;
  paraTitulo: string;
  entradasDestino: number;
  saidasOrigem: number;
  /** Quanto maior, mais urgente é fechar esta ponta. */
  prioridade?: number;

}

interface Relatorio {
  geradoEm: string;
  artigosAnalisados: number;
  clusters: string[];
  totalSugestoes: number;
  sugestoes: Sugestao[];
}

export function InterlinkSuggestionsPanel() {
  const [dados, setDados] = useState<Relatorio | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [cluster, setCluster] = useState("todos");

  useEffect(() => {
    let ativo = true;
    fetch("/interlink-suggestions.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((j) => ativo && setDados(j))
      .catch((e) => ativo && setErro(String(e.message ?? e)));
    return () => {
      ativo = false;
    };
  }, []);

  // Ordena pelas pontas mais relevantes: prioridade calculada no relatório e,
  // em empate, o destino com menos links de entrada.
  const lista = useMemo(
    () =>
      (dados?.sugestoes ?? [])
        .filter((s) => cluster === "todos" || s.cluster === cluster)
        .slice()
        .sort(
          (a, b) =>
            (b.prioridade ?? 0) - (a.prioridade ?? 0) || a.entradasDestino - b.entradasDestino,
        )
        .slice(0, 30),
    [dados, cluster],
  );


  if (erro || !dados) {
    return (
      <Card className="p-4">
        <h2 className="text-lg font-semibold">Interlinks sugeridos por cluster</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {erro
            ? `Sem sugestões calculadas (${erro}). Rode "npm run report:interlinks-sugestoes" após o build.`
            : "Carregando…"}
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold">Interlinks sugeridos por cluster</h2>
        <Badge variant="outline">{dados.totalSugestoes} par(es)</Badge>
        <span className="text-xs text-muted-foreground">
          {dados.artigosAnalisados} artigo(s) · gerado em {new Date(dados.geradoEm).toLocaleString("pt-BR")}
        </span>
      </div>

      <p className="mt-1 text-xs text-muted-foreground">
        Pares do mesmo tema que ainda não se linkam. A origem é o artigo com malha mais madura; o destino é o que tem
        menos links de entrada. Publique o link só quando ele fizer sentido no texto.
      </p>

      <select
        value={cluster}
        onChange={(e) => setCluster(e.target.value)}
        className="mt-3 rounded-md border border-border bg-background px-2 py-1 text-sm"
      >
        <option value="todos">Todos os temas</option>
        {dados.clusters.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {lista.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">Nenhum par pendente neste tema — a malha já está fechada.</p>
      ) : (
        <ul className="mt-3 space-y-2 text-xs">
          {lista.map((s, i) => (
            <li
              key={`${s.de}->${s.para}`}
              className={`rounded-md border p-2 ${i < 5 ? "border-accent/40 bg-accent/5" : "border-border"}`}
            >
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide text-muted-foreground">
                <span>{s.cluster}</span>
                {i < 5 && <Badge variant="outline">ponta mais relevante</Badge>}
              </div>

              <div className="mt-1">
                <span className="font-medium">{s.deTitulo}</span>
                <span className="text-muted-foreground"> → </span>
                <span className="font-medium">{s.paraTitulo}</span>
              </div>
              <div className="mt-1 flex flex-wrap gap-x-3 text-muted-foreground">
                <code>{s.de}</code>
                <code>{s.para}</code>
                <span>entradas do destino: {s.entradasDestino}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
