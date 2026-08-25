import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { exportarCsv, exportarJson, exportarPdf } from "@/lib/exportarRelatorio";

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
    alerta?: { enviado: boolean; motivo?: string; status?: number } | null;
  } | null;
}

/** Monitor contínuo de rich results (public/rich-results-monitor.json). */
interface RotaRich {
  path: string;
  cluster?: string | null;
  declarados: string[];
  google: string[] | null;
  googleVerdict: string;
  googleStatus: string;
  mensagensValidacao: Array<{ tipo: string; item?: string | null; severidade: string; mensagem: string }>;
  bing: string;
  naoReconhecidos: string[];
  ganhos: string[];
  perdas: string[];
  alerta: "PERDA" | "GANHO" | "ESTAVEL";
  fonteComparacao: string;
}

interface MonitorRichResults {
  geradoEm: string;
  rodada: string;
  googleDisponivel: boolean;
  bing: string;
  rotas: RotaRich[];
  historicoTamanho?: number;
}

/** Diff SSR/JSON-LD entre deploys (public/ssr-diff-status.json). */
interface RotaDiff {
  path: string;
  estado: "UNCHANGED" | "CHANGED_OK" | "REGRESSION" | "NEW" | "MISSING";
  perdas: string[];
  ganhos: string[];
  hashBaseline: string | null;
  hashAtual: string | null;
  jsonldBaseline: string[] | null;
  jsonldAtual: string[] | null;
  palavrasBaseline: number | null;
  palavrasAtual: number | null;
  baselineDe: string | null;
}

interface StatusSsrDiff {
  geradoEm: string;
  rodada: string;
  origem: string;
  total: number;
  regressoes: number;
  rotas: RotaDiff[];
}


/**
 * Reobservação agendada: marcos fixos contados a partir do snapshot atual.
 * Não dispara nada sozinho — sinaliza o que já venceu para o operador rodar
 * `npm run report:index-status`. Sem data, nada é inventado.
 */
const MARCOS_REOBSERVACAO = [
  { dias: 3, rotulo: "D+3 — primeira leitura de crawl" },
  { dias: 7, rotulo: "D+7 — cobertura e canonical" },
  { dias: 14, rotulo: "D+14 — impressões iniciais" },
  { dias: 28, rotulo: "D+28 — janela completa de performance" },
];

const agenda = (geradoEm: string) => {
  const base = new Date(geradoEm).getTime();
  const agora = Date.now();
  return MARCOS_REOBSERVACAO.map((m) => {
    const quando = new Date(base + m.dias * 86400000);
    return { ...m, quando, vencido: quando.getTime() <= agora };
  });
};

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
/** id estável de dossiê por rota (usado como âncora do PDF por URL). */
const slugId = (path: string) => path.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home";


/** Snapshot da observação 2 (rodada 5A) — gerado fora do runtime. */
interface ObservacaoCohorts {
  geradoEm: string;
  searchConsole?: string;
  cohorts: {
    id: string;
    rotulo: string;
    urls: number;
    crawledPosMudanca: number;
    indexed: number;
    crawledNotIndexed: number;
    impressoes28d: number | string;
    cliques28d: number | string;
    decisao: string;
  }[];
  vereditos?: Record<string, unknown>;
}

const AdminIndexacao = () => {
  const [dados, setDados] = useState<StatusIndexacao | null>(null);
  const [rich, setRich] = useState<MonitorRichResults | null>(null);
  const [diff, setDiff] = useState<StatusSsrDiff | null>(null);
  const [cohorts, setCohorts] = useState<ObservacaoCohorts | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const marcos = useMemo(() => (dados ? agenda(dados.geradoEm) : []), [dados]);
  const richPorPath = useMemo(
    () => new Map((rich?.rotas ?? []).map((r) => [r.path, r])),
    [rich],
  );
  const diffPorPath = useMemo(
    () => new Map((diff?.rotas ?? []).map((r) => [r.path, r])),
    [diff],
  );

  useEffect(() => {
    fetch("/index-status.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setDados)
      .catch((e) => setErro(e.message));
    fetch("/rich-results-monitor.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then(setRich)
      .catch(() => setRich(null));
    fetch("/ssr-diff-status.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then(setDiff)
      .catch(() => setDiff(null));
    fetch("/observacao-2-cohorts.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then(setCohorts)
      .catch(() => setCohorts(null));
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

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                exportarCsv(
                  "indexacao-por-url",
                  dados.rotas.map((r) => ({
                    path: r.path,
                    cluster: r.cluster ?? "",
                    status: r.google.status,
                    coverageState: r.google.coverageState ?? "",
                    robotsTxtState: r.google.robotsTxtState ?? "",
                    ultimoCrawl: r.google.ultimoCrawl ?? "",
                    canonicalGoogle: r.google.canonicalGoogle ?? "",
                    impressoes28d: r.impressoes28d,
                    cliques28d: r.cliques28d,
                    posicao28d: r.posicao28d ?? "",
                    indexnow:
                      dados.indexnow && dados.indexnow.porUrl[r.url] !== undefined
                        ? dados.indexnow.porUrl[r.url]
                          ? "aceita"
                          : "falha"
                        : "sem dado",
                  })),
                )
              }
            >
              Exportar CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => exportarJson("indexacao-por-url", dados)}>
              Exportar JSON
            </Button>
            <Button variant="outline" size="sm" onClick={() => exportarPdf("relatorio-indexacao", "Indexação por URL")}>
              Exportar PDF
            </Button>
          </div>

          <Card className="mt-4 p-4 text-sm">
            <div className="font-medium">Reobservação agendada</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Marcos contados a partir do snapshot ({dataCurta(dados.geradoEm)}). Vencido significa que já vale rodar{" "}
              <code>npm run report:index-status</code> novamente — nada é coletado automaticamente aqui.
            </p>
            <ul className="mt-3 space-y-1">
              {marcos.map((m) => (
                <li key={m.dias} className="flex flex-wrap items-center gap-2 text-xs">
                  <Badge tom={m.vencido ? "bg-amber-500/15 text-amber-500" : CORES.NO_DATA}>
                    {m.vencido ? "vencido" : "aguardando"}
                  </Badge>
                  <span>{m.rotulo}</span>
                  <span className="text-muted-foreground">{m.quando.toLocaleDateString("pt-BR")}</span>
                </li>
              ))}
            </ul>
          </Card>

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
              {(!dados.indexnow.sucesso || !dados.indexnow.keyFileOk) && (
                <div className="mt-2 rounded border border-destructive/30 bg-destructive/5 p-2 text-xs text-destructive">
                  Alerta{" "}
                  {dados.indexnow.alerta?.enviado
                    ? `enviado ao webhook (HTTP ${dados.indexnow.alerta.status ?? "—"})`
                    : `NÃO enviado: ${dados.indexnow.alerta?.motivo ?? "webhook não configurado"}`}
                  . Diagnóstico completo por endpoint em <code>reports/indexnow-log.json</code>.
                </div>
              )}
            </Card>
          )}

          <Card className="mt-4 p-4 text-sm">
            <div className="font-medium">
              Rich results por URL{" "}
              {rich ? (
                <Badge tom={rich.rotas.some((r) => r.alerta === "PERDA") ? "bg-destructive/15 text-destructive" : CORES.INDEXED}>
                  {rich.rotas.filter((r) => r.alerta === "PERDA").length} perda(s) ·{" "}
                  {rich.rotas.filter((r) => r.alerta === "GANHO").length} ganho(s)
                </Badge>
              ) : (
                <Badge>sem snapshot</Badge>
              )}
            </div>
            {!rich ? (
              <p className="mt-1 text-xs text-muted-foreground">
                Rode <code>npm run monitor:rich-results</code> para gerar <code>/rich-results-monitor.json</code>.
              </p>
            ) : (
              <>
                <p className="mt-1 text-xs text-muted-foreground">
                  Declarado no HTML SSR × detectado pelo Google ({rich.googleDisponivel ? "lido" : "UNKNOWN"}) · Bing{" "}
                  {rich.bing} · snapshot {dataCurta(rich.geradoEm)} ({rich.historicoTamanho ?? 1} no histórico).
                </p>
                <ul className="mt-3 space-y-2 text-xs">
                  {rich.rotas.map((r) => (
                    <li key={r.path} className="border-b pb-2 last:border-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          tom={
                            r.alerta === "PERDA"
                              ? "bg-destructive/15 text-destructive"
                              : r.alerta === "GANHO"
                                ? CORES.INDEXED
                                : CORES.NO_DATA
                          }
                        >
                          {r.alerta}
                        </Badge>
                        <span className="font-medium">{r.path}</span>
                        <span className="text-muted-foreground">verdict {r.googleVerdict}</span>
                      </div>
                      <div className="mt-1 text-muted-foreground">
                        declarado: {r.declarados.join(", ") || "—"} · Google:{" "}
                        {r.google ? r.google.join(", ") || "nenhum" : "UNKNOWN"} · Bing: {r.bing}
                      </div>
                      {r.perdas.length > 0 && (
                        <div className="mt-1 text-destructive">perdeu: {r.perdas.join(", ")}</div>
                      )}
                      {r.ganhos.length > 0 && <div className="mt-1 text-emerald-500">ganhou: {r.ganhos.join(", ")}</div>}
                      {r.mensagensValidacao.length > 0 && (
                        <ul className="mt-1 list-disc pl-4 text-amber-500">
                          {r.mensagensValidacao.map((m, i) => (
                            <li key={`${r.path}-msg-${i}`}>
                              {m.tipo} · {m.severidade}: {m.mensagem}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Card>

          <Card className="mt-4 p-4 text-sm">
            <div className="font-medium">
              Diff SSR/JSON-LD entre deploys{" "}
              {diff ? (
                <Badge tom={diff.regressoes ? "bg-destructive/15 text-destructive" : CORES.INDEXED}>
                  {diff.regressoes} regressão(ões) em {diff.total}
                </Badge>
              ) : (
                <Badge>sem snapshot</Badge>
              )}
            </div>
            {!diff ? (
              <p className="mt-1 text-xs text-muted-foreground">
                Rode <code>npm run report:ssr-diff</code> (baseline: <code>npm run ssr-diff:baseline</code>).
              </p>
            ) : (
              <>
                <p className="mt-1 text-xs text-muted-foreground">
                  Origem {diff.origem} · {dataCurta(diff.geradoEm)}. Detecta perda de bloco, schema, canonical, robots,
                  H1 ou texto mesmo quando o <code>lastmod</code> muda corretamente.
                </p>
                <ul className="mt-3 space-y-1 text-xs">
                  {diff.rotas.map((r) => (
                    <li key={r.path} className="flex flex-wrap items-center gap-2">
                      <Badge
                        tom={
                          r.estado === "REGRESSION"
                            ? "bg-destructive/15 text-destructive"
                            : r.estado === "CHANGED_OK"
                              ? "bg-amber-500/15 text-amber-500"
                              : CORES.NO_DATA
                        }
                      >
                        {r.estado}
                      </Badge>
                      <span>{r.path}</span>
                      <span className="text-muted-foreground">
                        {r.palavrasBaseline ?? "—"} → {r.palavrasAtual ?? "—"} palavras
                      </span>
                      {r.perdas.length > 0 && <span className="text-destructive">{r.perdas.join(" ; ")}</span>}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Card>

          <div className="mt-6 overflow-x-auto" id="relatorio-indexacao">
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
                  <th className="py-2 pr-3">Dossiê</th>
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
                    <td className="py-2 pr-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportarPdf(`dossie-${slugId(r.path)}`, `Dossiê de indexação — ${r.path}`)}
                      >
                        PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/*
            Dossiês por URL: ficam fora do fluxo visual (não são conteúdo da
            página) e servem de fonte para o PDF de auditoria por URL.
          */}
          <div className="sr-only" aria-hidden="true">
            {dados.rotas.map((r) => {
              const rr = richPorPath.get(r.path);
              const dd = diffPorPath.get(r.path);
              return (
                <section key={r.path} id={`dossie-${slugId(r.path)}`}>
                  <h2>{r.url}</h2>
                  <p>Cluster: {r.cluster ?? "—"}</p>
                  <h3>Indexação (Google Search Console)</h3>
                  <ul>
                    <li>Status: {r.google.status}</li>
                    <li>Verdict: {fmt(r.google.verdict)}</li>
                    <li>coverageState: {fmt(r.google.coverageState)}</li>
                    <li>robotsTxtState: {fmt(r.google.robotsTxtState)}</li>
                    <li>Último crawl: {dataCurta(r.google.ultimoCrawl)}</li>
                    <li>Canonical declarado: {fmt(r.google.canonicalDeclarado)}</li>
                    <li>Canonical do Google: {fmt(r.google.canonicalGoogle)}</li>
                    <li>Impressões 28d: {fmt(r.impressoes28d)}</li>
                    <li>Cliques 28d: {fmt(r.cliques28d)}</li>
                    <li>Posição 28d: {fmt(r.posicao28d)}</li>
                  </ul>
                  <h3>Schema e rich results</h3>
                  <ul>
                    <li>Declarado no SSR: {rr?.declarados.join(", ") || "—"}</li>
                    <li>Detectado pelo Google: {rr?.google ? rr.google.join(", ") || "nenhum" : "UNKNOWN"}</li>
                    <li>Verdict de rich results: {fmt(rr?.googleVerdict)}</li>
                    <li>Ainda não reconhecidos: {rr?.naoReconhecidos.join(", ") || "—"}</li>
                    <li>Bing: {fmt(rr?.bing)}</li>
                    {(rr?.mensagensValidacao ?? []).map((m, i) => (
                      <li key={`${r.path}-pdfmsg-${i}`}>
                        Validação {m.tipo} · {m.severidade}: {m.mensagem}
                      </li>
                    ))}
                  </ul>
                  <h3>SSR (diff contra o deploy anterior)</h3>
                  <ul>
                    <li>Estado: {fmt(dd?.estado)}</li>
                    <li>Hash baseline → atual: {fmt(dd?.hashBaseline)} → {fmt(dd?.hashAtual)}</li>
                    <li>
                      Palavras: {fmt(dd?.palavrasBaseline)} → {fmt(dd?.palavrasAtual)}
                    </li>
                    <li>Perdas: {dd?.perdas.join(" ; ") || "—"}</li>
                    <li>Ganhos: {dd?.ganhos.join(" ; ") || "—"}</li>
                    <li>Baseline capturada em: {dataCurta(dd?.baselineDe)}</li>
                  </ul>
                  <h3>IndexNow</h3>
                  <ul>
                    <li>
                      Último envio:{" "}
                      {dados.indexnow
                        ? dados.indexnow.porUrl[r.url] === undefined
                          ? "URL não enviada neste lote"
                          : dados.indexnow.porUrl[r.url]
                            ? "ACCEPTED (HTTP 2xx — recebimento da notificação, não indexação)"
                            : "REJECTED/UNKNOWN"
                        : "—"}
                    </li>
                    <li>Lote: {dados.indexnow ? `${dados.indexnow.modo} · ${dataCurta(dados.indexnow.geradoEm)}` : "—"}</li>
                    <li>Key file: {dados.indexnow ? (dados.indexnow.keyFileOk ? "acessível" : "INACESSÍVEL") : "—"}</li>
                  </ul>
                </section>
              );
            })}
          </div>
        </>

      )}
    </main>
  );
};

export default AdminIndexacao;
