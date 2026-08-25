import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

/**
 * PAINEL DE INDEXAÇÃO POR URL — Google (GSC) · Bing · IndexNow.
 *
 * Lê apenas artefatos públicos gerados fora do runtime:
 *   - public/index-status.json     (scripts/report-index-status.mjs)
 *   - public/indexnow-status.json  (scripts/indexnow-ping.mjs)
 * Nada aqui chama API em tempo de request e nada inventa número: campo sem
 * fonte aparece como "—" ou UNKNOWN/NO_DATA, nunca como zero.
 */

interface RichResult {
  tipo: string;
  itens: number;
}

interface RotaIndexacao {
  path: string;
  url: string;
  cluster?: string | null;
  impressoes28d: number | string;
  cliques28d: number | string;
  posicao28d?: number | string | null;
  google: {
    status: string;
    verdict?: string;
    coverageState?: string;
    robotsTxtState?: string;
    indexingState?: string;
    ultimoCrawl?: string | null;
    canonicalGoogle?: string | null;
    canonicalDeclarado?: string | null;
    richResults?: RichResult[];
    richResultsVerdict?: string;
    motivo?: string;
  };
}

interface StatusIndexacao {
  geradoEm: string;
  site: string;
  disponivel: boolean;
  rotas: RotaIndexacao[];
  bing: { webmasterTools: string; motivo?: string | null; sitemapDeclaradoNoRobots: boolean | string };
  indexnow: {
    geradoEm: string;
    modo: string;
    sucesso: boolean;
    totalUrls: number;
    keyFileOk: boolean;
    porUrl: Record<string, boolean>;
  } | null;
}

const CORES: Record<string, string> = {
  INDEXED: "bg-emerald-500/15 text-emerald-500",
  DISCOVERED_NOT_INDEXED: "bg-amber-500/15 text-amber-500",
  CRAWLED_NOT_INDEXED: "bg-amber-500/15 text-amber-500",
  NO_DATA: "bg-muted text-muted-foreground",
  UNKNOWN: "bg-muted text-muted-foreground",
};

const Badge = ({ children, tom }: { children: React.ReactNode; tom?: string }) => (
  <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${tom ?? "bg-muted text-muted-foreground"}`}>
    {children}
  </span>
);

const fmt = (v: unknown) =>
  v === null || v === undefined || v === "" ? "—" : typeof v === "string" ? v : String(v);

const dataCurta = (iso?: string | null) => (iso ? new Date(iso).toLocaleString("pt-BR") : "—");

const AdminIndexacao = () => {
  const [dados, setDados] = useState<StatusIndexacao | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetch("/index-status.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setDados)
      .catch((e) => setErro(e.message));
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Indexação por URL</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Google Search Console, Bing e IndexNow por página. Snapshot gerado fora do runtime; ausência de dado
        aparece como UNKNOWN/NO_DATA e nunca como zero.
      </p>

      {erro && (
        <Card className="mt-6 p-4 text-sm">
          Snapshot ainda não publicado (<code>/index-status.json</code>: {erro}). Rode{" "}
          <code>npm run report:index-status</code>.
        </Card>
      )}

      {dados && (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Card className="p-4">
              <div className="text-xs uppercase text-muted-foreground">Snapshot</div>
              <div className="mt-1 text-sm">{dataCurta(dados.geradoEm)}</div>
              <div className="mt-1 text-xs text-muted-foreground">{dados.site}</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs uppercase text-muted-foreground">Search Console</div>
              <div className="mt-1 text-sm">
                {dados.disponivel ? <Badge tom={CORES.INDEXED}>conectado</Badge> : <Badge>UNKNOWN</Badge>}
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-xs uppercase text-muted-foreground">Bing Webmaster</div>
              <div className="mt-1 text-sm">
                <Badge tom={dados.bing.webmasterTools === "VERIFIED" ? CORES.INDEXED : undefined}>
                  {dados.bing.webmasterTools}
                </Badge>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                sitemap no robots: {String(dados.bing.sitemapDeclaradoNoRobots)}
              </div>
            </Card>
          </div>

          {dados.indexnow && (
            <Card className="mt-4 p-4 text-sm">
              <div className="font-medium">
                IndexNow — modo {dados.indexnow.modo} ·{" "}
                <Badge tom={dados.indexnow.sucesso ? CORES.INDEXED : "bg-destructive/15 text-destructive"}>
                  {dados.indexnow.sucesso ? "aceito" : "falhou"}
                </Badge>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {dados.indexnow.totalUrls} URL(s) · key file {dados.indexnow.keyFileOk ? "acessível" : "INACESSÍVEL"} ·{" "}
                {dataCurta(dados.indexnow.geradoEm)}
              </div>
            </Card>
          )}

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                  <th className="py-2 pr-3">URL</th>
                  <th className="py-2 pr-3">Google</th>
                  <th className="py-2 pr-3">Cobertura</th>
                  <th className="py-2 pr-3">Último crawl</th>
                  <th className="py-2 pr-3">Rich results</th>
                  <th className="py-2 pr-3">Impr. 28d</th>
                  <th className="py-2 pr-3">Cliques 28d</th>
                  <th className="py-2 pr-3">IndexNow</th>
                </tr>
              </thead>
              <tbody>
                {dados.rotas.map((r) => (
                  <tr key={r.path} className="border-b align-top">
                    <td className="py-2 pr-3">
                      <div className="font-medium">{r.path}</div>
                      {r.cluster && <div className="text-xs text-muted-foreground">{r.cluster}</div>}
                      {r.google.canonicalGoogle && r.google.canonicalGoogle !== r.url && (
                        <div className="text-xs text-amber-500">
                          canonical Google: {r.google.canonicalGoogle}
                        </div>
                      )}
                    </td>
                    <td className="py-2 pr-3">
                      <Badge tom={CORES[r.google.status]}>{r.google.status}</Badge>
                    </td>
                    <td className="py-2 pr-3 text-xs">{fmt(r.google.coverageState)}</td>
                    <td className="py-2 pr-3 text-xs">{dataCurta(r.google.ultimoCrawl)}</td>
                    <td className="py-2 pr-3 text-xs">
                      {r.google.richResults && r.google.richResults.length > 0
                        ? r.google.richResults.map((x) => `${x.tipo} (${x.itens})`).join(", ")
                        : fmt(r.google.richResultsVerdict)}
                    </td>
                    <td className="py-2 pr-3">{fmt(r.impressoes28d)}</td>
                    <td className="py-2 pr-3">{fmt(r.cliques28d)}</td>
                    <td className="py-2 pr-3 text-xs">
                      {dados.indexnow
                        ? dados.indexnow.porUrl[r.url] === undefined
                          ? "—"
                          : dados.indexnow.porUrl[r.url]
                            ? "aceita"
                            : "falha"
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
};

export default AdminIndexacao;
