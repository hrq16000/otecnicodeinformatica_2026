import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { exportarCsv, exportarJson } from "@/lib/exportarRelatorio";
import EditorialAuditoriaPanel from "@/components/admin/EditorialAuditoriaPanel";
import EditorialIndexNowPanel from "@/components/admin/EditorialIndexNowPanel";
import EditorialSchemaDiffPanel from "@/components/admin/EditorialSchemaDiffPanel";


/**
 * PAINEL EDITORIAL CONSOLIDADO POR ONDA/LOTE — Onda 10C · Infra 1.
 *
 * Lê apenas o artefato público `public/editorial-waves-status.json`, gerado
 * fora do runtime por `scripts/monitor-editorial-waves.ts` (gateway único do
 * Search Console). Nada aqui chama API em tempo de request e nada inventa
 * número: campo sem fonte aparece como "—" ou UNKNOWN, nunca como zero.
 */

interface RotaOnda extends Record<string, unknown> {
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

interface Alerta {
  url: string;
  lote: string;
  owner: string;
  source: string;
  eventType: string;
  previousState: string | null;
  currentState: string;
  severity: string;
  observedAt: string;
}

interface AssetLinha {
  owner: string;
  slug: string;
  localPath: string;
  originalUrl: string | null;
  author: string | null;
  license: string;
  licenseUrl: string | null;
  attributionRequired: boolean;
  attributionText: string | null;
  sourceType: string;
  fileHash: string | null;
  formats: string[];
  resultado: string;
  falhas: string[];
  avisos: string[];
}

interface StatusAssets {
  geradoEm: string;
  total: number;
  pass: number;
  warn: number;
  fail: number;
  semLicenca: number;
  semAtribuicao: number;
  unregistered: string[];
  unused: string[];
  assets: AssetLinha[];
}

const COR_SEV: Record<string, string> = {
  CRITICAL: "bg-destructive/15 text-destructive border-destructive/30",
  WARNING: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  INFO: "bg-sky-500/15 text-sky-400 border-sky-500/30",
};

export default function AdminEditorialOndas() {
  const [status, setStatus] = useState<StatusOndas | null>(null);
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [assets, setAssets] = useState<StatusAssets | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [lote, setLote] = useState<string>("todos");
  const [aba, setAba] = useState<"indexacao" | "auditoria" | "indexnow" | "schema">("indexacao");

  useEffect(() => {
    fetch("/editorial-waves-status.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setStatus)
      .catch((e: Error) => setErro(e.message));
    fetch("/editorial-waves-alerts.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setAlertas(d?.alertas ?? []))
      .catch(() => setAlertas([]));
    fetch("/editorial-assets-status.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then(setAssets)
      .catch(() => setAssets(null));
  }, []);

  const lotes = useMemo(
    () => ["todos", ...new Set((status?.rotas ?? []).map((r) => r.lote))],
    [status],
  );
  const rotas = useMemo(
    () => (status?.rotas ?? []).filter((r) => lote === "todos" || r.lote === lote),
    [status, lote],
  );
  const alertasDoLote = useMemo(
    () => alertas.filter((a) => lote === "todos" || a.lote === lote).slice(0, 30),
    [alertas, lote],
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

          <nav className="mb-4 flex flex-wrap gap-2 border-b pb-2" aria-label="Abas do painel editorial">
            {([
              ["indexacao", "Indexação, alertas e assets"],
              ["auditoria", "Auditoria (KPIs)"],
              ["indexnow", "IndexNow"],
              ["schema", "Schema Diff"],
            ] as const).map(([id, rotulo]) => (
              <Button
                key={id}
                size="sm"
                variant={aba === id ? "default" : "ghost"}
                onClick={() => setAba(id)}
              >
                {rotulo}
              </Button>
            ))}
          </nav>


          {aba === "indexacao" && (
          <>
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

          <section className="mt-8">
            <h2 className="mb-2 text-lg font-semibold">Alertas recentes (mudança de estado)</h2>
            <p className="mb-3 text-xs text-muted-foreground">
              Disparados só na transição (edge-triggered) e deduplicados. Estado interno
              (PUBLISHED) é do pipeline editorial; o Google não informa esse campo.
            </p>
            {alertasDoLote.length === 0 ? (
              <Card className="p-4 text-sm text-muted-foreground">
                Nenhuma mudança de estado registrada para este filtro.
              </Card>
            ) : (
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left">
                    <tr>
                      <th className="p-3">Quando</th>
                      <th className="p-3">URL</th>
                      <th className="p-3">Fonte</th>
                      <th className="p-3">Transição</th>
                      <th className="p-3">Severidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alertasDoLote.map((a) => (
                      <tr key={`${a.url}-${a.observedAt}-${a.eventType}`} className="border-t">
                        <td className="p-3 whitespace-nowrap">{fmt(a.observedAt)}</td>
                        <td className="p-3">{a.url}</td>
                        <td className="p-3 whitespace-nowrap">{a.source}</td>
                        <td className="p-3 whitespace-nowrap">
                          {(a.previousState ?? "∅") + " → " + a.currentState}
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className={COR_SEV[a.severity] ?? COR_SEV.INFO}>
                            {a.severity}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="mt-8">
            <h2 className="mb-2 text-lg font-semibold">Assets &amp; licenciamento</h2>
            {!assets ? (
              <Card className="p-4 text-sm text-muted-foreground">
                Rode <code>npm run check:editorial-assets</code> para gerar o inventário.
              </Card>
            ) : (
              <>
                <div className="mb-3 grid gap-3 sm:grid-cols-4">
                  {[
                    ["Assets", assets.total],
                    ["PASS", assets.pass],
                    ["Sem licença", assets.semLicenca],
                    ["Sem atribuição", assets.semAtribuicao],
                  ].map(([rotulo, valor]) => (
                    <Card key={String(rotulo)} className="p-4">
                      <p className="text-xs uppercase text-muted-foreground">{rotulo}</p>
                      <p className="mt-1 text-2xl font-semibold">{valor}</p>
                    </Card>
                  ))}
                </div>
                {assets.unregistered.length > 0 && (
                  <Card className="mb-3 border-destructive/40 p-4 text-sm">
                    Asset sem registro de proveniência: {assets.unregistered.join(", ")}
                  </Card>
                )}
                <div className="overflow-x-auto rounded-lg border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-left">
                      <tr>
                        <th className="p-3">Arquivo</th>
                        <th className="p-3">Origem</th>
                        <th className="p-3">Licença</th>
                        <th className="p-3">Autor / atribuição</th>
                        <th className="p-3">Formatos</th>
                        <th className="p-3">Hash</th>
                        <th className="p-3">Gate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assets.assets.map((a) => (
                        <tr key={a.localPath} className="border-t align-top">
                          <td className="p-3">
                            {a.localPath}
                            <p className="text-xs text-muted-foreground">owner: {a.owner}</p>
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            {a.originalUrl ? (
                              <a
                                className="underline underline-offset-2"
                                href={a.originalUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {a.sourceType}
                              </a>
                            ) : (
                              a.sourceType
                            )}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            {a.licenseUrl ? (
                              <a
                                className="underline underline-offset-2"
                                href={a.licenseUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {a.license}
                              </a>
                            ) : (
                              a.license
                            )}
                          </td>
                          <td className="p-3 text-xs">
                            {a.author ?? "—"}
                            {a.attributionRequired && (
                              <p className="text-muted-foreground">{a.attributionText ?? "—"}</p>
                            )}
                          </td>
                          <td className="p-3 text-xs">
                            {a.formats.map((f) => f.split(".").pop()).join(" · ")}
                          </td>
                          <td className="p-3 font-mono text-xs">
                            {a.fileHash?.replace("sha256:", "").slice(0, 12) ?? "—"}
                          </td>
                          <td className="p-3">
                            <Badge
                              variant="outline"
                              className={
                                a.resultado === "PASS"
                                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                  : a.resultado === "WARN"
                                    ? COR_SEV.WARNING
                                    : COR_SEV.CRITICAL
                              }
                            >
                              {a.resultado}
                            </Badge>
                            {a.falhas.length > 0 && (
                              <p className="mt-1 text-xs text-muted-foreground">{a.falhas.join(", ")}</p>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </section>
          </>
          )}
          {aba === "auditoria" && <EditorialAuditoriaPanel lote={lote} />}
          {aba === "indexnow" && <EditorialIndexNowPanel lote={lote} />}

          {aba === "schema" && <EditorialSchemaDiffPanel lote={lote} />}
        </>

      )}
    </main>
  );
}
