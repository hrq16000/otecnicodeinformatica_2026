import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { exportarCsv, exportarJson } from "@/lib/exportarRelatorio";

/**
 * VISÃO CONSOLIDADA DE ONDAS E LOTES EDITORIAIS — /admin/ondas.
 *
 * Lê apenas `public/editorial-lotes.json`, gerado fora do runtime por
 * `scripts/report-editorial-lotes.mjs`. Nada aqui chama API nem estima número:
 * dado sem fonte aparece como "—" ou UNKNOWN.
 */

interface UrlLote extends Record<string, unknown> {
  wave: string;
  batch: string;
  lote: string;
  url: string;
  slug: string;
  cluster: string;
  role: string;
  publishedAt: string;
  aprovado: boolean;
  noSitemap: boolean;
  status: "PUBLICADO" | "PENDENTE" | "ERRO" | "RASCUNHO";
  veredito: string;
  estadoBusca: string;
  ultimoCrawl: string | null;
  submetidoSitemap: boolean;
  submetidoIndexNow: boolean;
  ultimaAtualizacao: string | null;
  httpStatus: number | null;
  canonicalValido: boolean | null;
  schemaValido: boolean | null;
  erros: string[];
}

interface ResumoLote {
  lote: string;
  wave: string;
  batch: string;
  total: number;
  publicadas: number;
  pendentes: number;
  erros: number;
  rascunhos: number;
  aprovadas: number;
  noSitemap: number;
  publicadoEm: string | null;
  ultimaAtualizacao: string | null;
  cobertura: number;
}

interface Consolidado {
  geradoEm: string;
  fonte: {
    gscDisponivel: boolean;
    verdictsEm: string | null;
    submissionsEm: string | null;
    sitemapDinamico: string;
  };
  liberacaoManual: {
    onda: string;
    lote: string;
    liberado: boolean;
    autorizadoPor: string | null;
    autorizadoEm: string | null;
  } | null;
  total: number;
  lotes: ResumoLote[];
  urls: UrlLote[];
}

const COR_STATUS: Record<string, string> = {
  PUBLICADO: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  PENDENTE: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  ERRO: "bg-destructive/15 text-destructive border-destructive/30",
  RASCUNHO: "bg-muted text-muted-foreground border-border",
};

const dataCurta = (v?: string | null) => (v ? new Date(v).toLocaleDateString("pt-BR") : "—");
const dataHora = (v?: string | null) => (v ? new Date(v).toLocaleString("pt-BR") : "—");

export default function AdminOndas() {
  const [dados, setDados] = useState<Consolidado | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [onda, setOnda] = useState("todas");
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    fetch("/editorial-lotes.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setDados)
      .catch((e: Error) => setErro(e.message));
  }, []);

  const ondas = useMemo(
    () => ["todas", ...new Set((dados?.lotes ?? []).map((l) => l.wave))],
    [dados],
  );

  const urls = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return (dados?.urls ?? []).filter(
      (u) =>
        (onda === "todas" || u.wave === onda) &&
        (status === "todos" || u.status === status) &&
        (!termo || u.url.toLowerCase().includes(termo) || u.cluster.toLowerCase().includes(termo)),
    );
  }, [dados, onda, status, busca]);

  const lotes = useMemo(
    () => (dados?.lotes ?? []).filter((l) => onda === "todas" || l.wave === onda),
    [dados, onda],
  );

  const totalPublicadas = (dados?.urls ?? []).filter((u) => u.status === "PUBLICADO").length;

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Ondas editoriais — status consolidado</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Cruzamento de registro de ondas, aprovação editorial, sitemap dinâmico, submissões e
          vereditos do Search Console.
          {dados ? ` Gerado em ${dataHora(dados.geradoEm)}.` : ""}
        </p>
      </header>

      {erro && (
        <Card className="border-destructive/40 p-4 text-sm">
          Relatório indisponível ({erro}). Rode <code>npm run report:editorial-lotes</code>.
        </Card>
      )}

      {!dados && !erro && <Skeleton className="h-64 w-full" />}

      {dados && (
        <>
          {!dados.fonte.gscDisponivel && (
            <Card className="mb-4 border-amber-500/40 p-4 text-sm">
              Search Console sem credenciais neste ambiente: vereditos aparecem como UNKNOWN.
            </Card>
          )}

          {dados.liberacaoManual?.liberado && (
            <Card className="mb-4 border-sky-500/40 p-4 text-sm">
              Liberação manual registrada para a Onda {dados.liberacaoManual.onda} / Lote{" "}
              {dados.liberacaoManual.lote} — autorizada por {dados.liberacaoManual.autorizadoPor} em{" "}
              {dataHora(dados.liberacaoManual.autorizadoEm)}.
            </Card>
          )}

          <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4">
              <p className="text-xs uppercase text-muted-foreground">URLs monitoradas</p>
              <p className="mt-1 text-2xl font-semibold">{dados.total}</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs uppercase text-muted-foreground">Publicadas (GSC)</p>
              <p className="mt-1 text-2xl font-semibold">{totalPublicadas}</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs uppercase text-muted-foreground">Lotes</p>
              <p className="mt-1 text-2xl font-semibold">{dados.lotes.length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs uppercase text-muted-foreground">No sitemap</p>
              <p className="mt-1 text-2xl font-semibold">
                {dados.urls.filter((u) => u.noSitemap).length}
              </p>
            </Card>
          </div>

          <div className="mb-4 overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="p-3">Lote</th>
                  <th className="p-3">Publicado em</th>
                  <th className="p-3">URLs</th>
                  <th className="p-3">Publicadas</th>
                  <th className="p-3">Pendentes</th>
                  <th className="p-3">Rascunhos</th>
                  <th className="p-3">Sitemap</th>
                  <th className="p-3">Cobertura</th>
                  <th className="p-3">Última submissão</th>
                </tr>
              </thead>
              <tbody>
                {lotes.map((l) => (
                  <tr key={l.lote} className="border-t">
                    <td className="p-3 font-medium">{l.lote}</td>
                    <td className="p-3">{dataCurta(l.publicadoEm)}</td>
                    <td className="p-3">{l.total}</td>
                    <td className="p-3">{l.publicadas}</td>
                    <td className="p-3">{l.pendentes}</td>
                    <td className="p-3">{l.rascunhos}</td>
                    <td className="p-3">
                      {l.noSitemap}/{l.total}
                    </td>
                    <td className="p-3">{dados.fonte.gscDisponivel ? `${l.cobertura}%` : "UNKNOWN"}</td>
                    <td className="p-3">{dataHora(l.ultimaAtualizacao)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            {ondas.map((w) => (
              <Button key={w} size="sm" variant={w === onda ? "default" : "outline"} onClick={() => setOnda(w)}>
                {w}
              </Button>
            ))}
            <span className="mx-1 h-5 w-px bg-border" />
            {["todos", "PUBLICADO", "PENDENTE", "ERRO", "RASCUNHO"].map((s) => (
              <Button
                key={s}
                size="sm"
                variant={s === status ? "default" : "outline"}
                onClick={() => setStatus(s)}
              >
                {s}
              </Button>
            ))}
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Filtrar por URL ou cluster"
              aria-label="Filtrar por URL ou cluster"
              className="h-9 min-w-[220px] flex-1 rounded-md border bg-background px-3 text-sm"
            />
            <Button size="sm" variant="outline" onClick={() => exportarCsv("ondas-consolidado", urls)}>
              CSV
            </Button>
            <Button size="sm" variant="outline" onClick={() => exportarJson("ondas-consolidado", urls)}>
              JSON
            </Button>
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="p-3">URL</th>
                  <th className="p-3">Lote</th>
                  <th className="p-3">Cluster</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Veredito</th>
                  <th className="p-3">Sitemap</th>
                  <th className="p-3">IndexNow</th>
                  <th className="p-3">Último crawl</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((u) => (
                  <tr key={u.url} className="border-t align-top">
                    <td className="p-3">
                      <a className="underline underline-offset-2" href={u.url}>
                        {u.url}
                      </a>
                      {u.erros.length > 0 && (
                        <p className="mt-1 text-xs text-destructive">{u.erros.join(" · ")}</p>
                      )}
                    </td>
                    <td className="p-3 whitespace-nowrap">{u.lote}</td>
                    <td className="p-3">{u.cluster}</td>
                    <td className="p-3">
                      <Badge variant="outline" className={COR_STATUS[u.status]}>
                        {u.status}
                      </Badge>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {u.veredito} · {u.estadoBusca}
                    </td>
                    <td className="p-3">{u.noSitemap ? "sim" : "não"}</td>
                    <td className="p-3">{u.submetidoIndexNow ? "enviado" : "—"}</td>
                    <td className="p-3 whitespace-nowrap">{dataHora(u.ultimoCrawl)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {urls.length === 0 && (
            <p className="mt-4 text-sm text-muted-foreground">Nenhuma URL para os filtros atuais.</p>
          )}
        </>
      )}
    </main>
  );
}
