import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { exportarCsv, exportarJson } from "@/lib/exportarRelatorio";

/**
 * PAINEL EDITORIAL CONSOLIDADO POR ONDA/LOTE — Onda 10C · Infra 1.
 *
 * Lê apenas o artefato público `public/editorial-waves-status.json`, gerado
 * fora do runtime por `scripts/monitor-editorial-waves.ts` (gateway único do
 * Search Console). Nada aqui chama API em tempo de request e nada inventa
 * número: campo sem fonte aparece como "—" ou UNKNOWN, nunca como zero.
 */

interface RotaOnda {
  wave: string;
  batch: string;
  lote: string;
  url: string;
  urlAbsoluta: string;
  ownerId: string;
  cluster: string;
  role: string;
  publishedAt: string;
  contentHash: string | null;
  sitemapLastmod: string | null;
  indexNowSentAt: string | null;
  google: {
    status: string;
    verdict?: string;
    coverageState?: string;
    robotsTxtState?: string;
    ultimoCrawl?: string | null;
    canonicalGoogle?: string | null;
    canonicalDeclarado?: string | null;
    motivo?: string;
  };
}

interface StatusOndas {
  geradoEm: string;
  site: string;
  disponivel: boolean;
  lotes: Array<{ lote: string; total: number; indexadas: number | string; cobertura: number | string }>;
  rotas: RotaOnda[];
}

const COR: Record<string, string> = {
  INDEXED: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  CRAWLED_NOT_INDEXED: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  DISCOVERED_NOT_INDEXED: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  NO_DATA: "bg-muted text-muted-foreground border-border",
  UNKNOWN: "bg-muted text-muted-foreground border-border",
};

const fmt = (v?: string | null) => (v ? new Date(v).toLocaleString("pt-BR") : "—");

export default function AdminEditorialOndas() {
  const [status, setStatus] = useState<StatusOndas | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [lote, setLote] = useState<string>("todos");

  useEffect(() => {
    fetch("/editorial-waves-status.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setStatus)
      .catch((e: Error) => setErro(e.message));
  }, []);

  const lotes = useMemo(
    () => ["todos", ...new Set((status?.rotas ?? []).map((r) => r.lote))],
    [status],
  );
  const rotas = useMemo(
    () => (status?.rotas ?? []).filter((r) => lote === "todos" || r.lote === lote),
    [status, lote],
  );

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Ondas editoriais — indexação por lote</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fonte: Search Console (URL Inspection), sitemap publicado e registro do IndexNow.
          {status ? ` Gerado em ${fmt(status.geradoEm)} · propriedade ${status.site}.` : ""}
        </p>
      </header>

      {erro && (
        <Card className="border-destructive/40 p-4 text-sm">
          Relatório indisponível ({erro}). Rode <code>npm run monitor:editorial-waves</code>.
        </Card>
      )}

      {!status && !erro && <Skeleton className="h-64 w-full" />}

      {status && (
        <>
          {!status.disponivel && (
            <Card className="mb-4 border-amber-500/40 p-4 text-sm">
              Search Console sem credenciais neste ambiente: os estados aparecem como UNKNOWN.
            </Card>
          )}

          <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {status.lotes.map((l) => (
              <Card key={l.lote} className="p-4">
                <p className="text-xs uppercase text-muted-foreground">Lote {l.lote}</p>
                <p className="mt-1 text-2xl font-semibold">
                  {typeof l.cobertura === "number" ? `${l.cobertura}%` : "UNKNOWN"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {typeof l.indexadas === "number" ? `${l.indexadas}/${l.total} indexadas` : `${l.total} URLs`}
                </p>
              </Card>
            ))}
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            {lotes.map((l) => (
              <Button key={l} size="sm" variant={l === lote ? "default" : "outline"} onClick={() => setLote(l)}>
                {l}
              </Button>
            ))}
            <span className="flex-1" />
            <Button size="sm" variant="outline" onClick={() => exportarCsv("ondas-editoriais", rotas)}>
              CSV
            </Button>
            <Button size="sm" variant="outline" onClick={() => exportarJson("ondas-editoriais", rotas)}>
              JSON
            </Button>
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-3">URL</th>
                  <th className="p-3">Lote</th>
                  <th className="p-3">Cluster</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3">Último rastreio</th>
                  <th className="p-3">sitemap lastmod</th>
                  <th className="p-3">IndexNow</th>
                  <th className="p-3">contentHash</th>
                </tr>
              </thead>
              <tbody>
                {rotas.map((r) => (
                  <tr key={r.url} className="border-t align-top">
                    <td className="p-3">
                      <a className="underline underline-offset-2" href={r.url}>
                        {r.url}
                      </a>
                      <p className="text-xs text-muted-foreground">owner: {r.ownerId}</p>
                    </td>
                    <td className="p-3 whitespace-nowrap">{r.lote}</td>
                    <td className="p-3 whitespace-nowrap">{r.cluster}</td>
                    <td className="p-3">
                      <Badge variant="outline" className={COR[r.google.status] ?? COR.UNKNOWN}>
                        {r.google.status}
                      </Badge>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {r.google.coverageState ?? r.google.motivo ?? "—"}
                      </p>
                    </td>
                    <td className="p-3 whitespace-nowrap">{fmt(r.google.ultimoCrawl)}</td>
                    <td className="p-3 whitespace-nowrap">{r.sitemapLastmod ?? "—"}</td>
                    <td className="p-3 whitespace-nowrap">{r.indexNowSentAt ? fmt(r.indexNowSentAt) : "—"}</td>
                    <td className="p-3 font-mono text-xs">{r.contentHash ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
