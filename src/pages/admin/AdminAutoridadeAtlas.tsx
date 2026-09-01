import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { exportarCsv } from "@/lib/exportarRelatorio";

/**
 * AUTORIDADE DO ATLAS — /admin/autoridade-atlas.
 *
 * Acompanha o grafo de conhecimento do hub /guia-tecnico-informatica:
 *   • densidade semântica de cada nó (vocabulário distinto / termos úteis);
 *   • mapa de conexões: grau de saída e de entrada DENTRO do Atlas;
 *   • cobertura por tema e nós que dependem só do hub (fragilidade).
 *
 * Fonte única: `public/autoridade-atlas.json` (npm run report:autoridade-atlas),
 * calculado sobre o HTML realmente renderizado. Nada é estimado no navegador.
 */

interface No {
  url: string;
  tipo: string;
  titulo?: string | null;
  palavras?: number;
  termosUteis?: number;
  vocabulario?: number;
  densidadeSemantica?: number;
  linksSaidaAtlas?: string[];
  grauSaidaTotal?: number;
  grauEntradaAtlas?: number;
  origensEntrada?: string[];
  erro: string | null;
}

interface Tema {
  id: string;
  titulo: string;
  destinos: number;
  renderizados: number;
  densidadeMedia: number;
  faltando: string[];
}

interface Relatorio {
  geradoEm: string;
  hub: string;
  total: number;
  analisados: number;
  falhas: number;
  temas: Tema[];
  guias: { pergunta: string; to: string }[];
  medias: {
    palavras: number;
    densidadeSemantica: number;
    grauSaidaAtlas: number;
    grauEntradaAtlas: number;
  };
  dependentesDoHub: string[];
  semEntrada: string[];
  nos: No[];
}

const dataHora = (v?: string | null) => (v ? new Date(v).toLocaleString("pt-BR") : "—");
const faixa = (v: number) =>
  v >= 55 ? "text-emerald-400" : v >= 45 ? "text-amber-400" : "text-destructive";

function Kpi({ label, valor, hint }: { label: string; valor: string; hint?: string }) {
  return (
    <Card className="p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{valor}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </Card>
  );
}

export default function AdminAutoridadeAtlas() {
  const [dados, setDados] = useState<Relatorio | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState<string>("todos");

  useEffect(() => {
    let vivo = true;
    fetch("/autoridade-atlas.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j) => vivo && setDados(j))
      .catch(() => vivo && setErro("Relatório ausente. Rode `npm run report:autoridade-atlas`."));
    return () => {
      vivo = false;
    };
  }, []);

  const tipos = useMemo(
    () => ["todos", ...new Set((dados?.nos ?? []).map((n) => n.tipo))],
    [dados],
  );

  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return (dados?.nos ?? [])
      .filter((n) => tipo === "todos" || n.tipo === tipo)
      .filter((n) => !q || n.url.toLowerCase().includes(q))
      .sort((a, b) => (b.grauEntradaAtlas ?? 0) - (a.grauEntradaAtlas ?? 0));
  }, [dados, tipo, busca]);

  if (erro) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-semibold">Autoridade do Atlas</h1>
        <Card className="mt-4 p-4 text-sm text-muted-foreground">{erro}</Card>
      </div>
    );
  }

  if (!dados) {
    return (
      <div className="mx-auto max-w-6xl space-y-4 p-6">
        <Skeleton className="h-8 w-72" />
        <div className="grid gap-3 sm:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-72" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-semibold">Autoridade do Atlas</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Hub {dados.hub} · gerado em {dataHora(dados.geradoEm)} · {dados.analisados}/{dados.total} nós
          renderizados{dados.falhas ? ` · ${dados.falhas} falha(s)` : ""}.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-4">
        <Kpi
          label="Densidade semântica média"
          valor={`${dados.medias.densidadeSemantica}%`}
          hint="vocabulário distinto / termos úteis"
        />
        <Kpi label="Grau de saída médio" valor={String(dados.medias.grauSaidaAtlas)} hint="links dentro do Atlas" />
        <Kpi label="Grau de entrada médio" valor={String(dados.medias.grauEntradaAtlas)} />
        <Kpi
          label="Dependentes só do hub"
          valor={String(dados.dependentesDoHub.length)}
          hint="recebem link apenas do Atlas"
        />
      </div>

      <section>
        <h2 className="mb-2 text-lg font-semibold">Cobertura por tema</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {dados.temas.map((t) => (
            <Card key={t.id} className="p-4">
              <div className="font-medium">{t.titulo}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {t.renderizados}/{t.destinos} destinos renderizados
              </div>
              <div className={`mt-2 text-xl font-semibold ${faixa(t.densidadeMedia)}`}>
                {t.densidadeMedia}%
              </div>
              {t.faltando.length > 0 && (
                <ul className="mt-2 list-inside list-disc text-xs text-destructive">
                  {t.faltando.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <h2 className="mr-2 text-lg font-semibold">Mapa de conexões</h2>
          {tipos.map((t) => (
            <Button key={t} size="sm" variant={tipo === t ? "default" : "outline"} onClick={() => setTipo(t)}>
              {t}
            </Button>
          ))}
          <Input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar URL"
            className="h-9 max-w-xs"
          />
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              exportarCsv(
                "autoridade-atlas",
                lista.map((n) => ({
                  url: n.url,
                  tipo: n.tipo,
                  densidade: n.densidadeSemantica ?? "",
                  saida: n.linksSaidaAtlas?.length ?? "",
                  entrada: n.grauEntradaAtlas ?? "",
                  erro: n.erro ?? "",
                })),
              )
            }
          >
            Exportar CSV
          </Button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="p-3">URL</th>
                <th className="p-3">Tipo</th>
                <th className="p-3">Palavras</th>
                <th className="p-3">Densidade</th>
                <th className="p-3">Saída</th>
                <th className="p-3">Entrada</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((n) => (
                <tr key={n.url} className="border-t border-border/60 align-top">
                  <td className="p-3">
                    <a href={n.url} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                      {n.url}
                    </a>
                    {n.erro && (
                      <Badge variant="destructive" className="ml-2">
                        {n.erro}
                      </Badge>
                    )}
                    {n.origensEntrada && n.origensEntrada.length > 0 && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        entra por: {n.origensEntrada.slice(0, 4).join(", ")}
                        {n.origensEntrada.length > 4 ? ` +${n.origensEntrada.length - 4}` : ""}
                      </div>
                    )}
                  </td>
                  <td className="p-3">{n.tipo}</td>
                  <td className="p-3">{n.palavras ?? "—"}</td>
                  <td className={`p-3 font-medium ${faixa(n.densidadeSemantica ?? 0)}`}>
                    {n.densidadeSemantica != null ? `${n.densidadeSemantica}%` : "—"}
                  </td>
                  <td className="p-3">{n.linksSaidaAtlas?.length ?? "—"}</td>
                  <td className="p-3">{n.grauEntradaAtlas ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
