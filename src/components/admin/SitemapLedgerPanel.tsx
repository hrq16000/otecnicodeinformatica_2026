import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

/**
 * Status real da submissão do sitemap dinâmico (Search Console + IndexNow).
 *
 * Fonte única: `public/sitemap-ledger.json`, escrito por
 * `scripts/sitemap-dynamic.mjs`. Nada é estimado no navegador: quando o
 * ledger não existe ou o status é PENDING_CONFIG/UNKNOWN, o painel diz
 * exatamente isso — nunca exibe sucesso fictício.
 */

interface Evento {
  id: string;
  action: string;
  status: string;
  source: string;
  timestamp: string;
  error?: string | null;
}

interface Ledger {
  geradoEm: string;
  host: string;
  modo: string;
  sitemap: { url: string; totalUrls: number; googleSearchConsole: string; indexNow: string };
  lotes: { total: number };
  diff: { adicionadas: string[]; removidas: string[]; regressoes: string[] };
  eventos: Evento[];
}

function tom(status: string): "default" | "secondary" | "destructive" | "outline" {
  if (/^(SUBMITTED|OK|HTTP 200|HTTP 202)/.test(status)) return "default";
  if (/^(DRY_RUN|SKIPPED|NOT_REQUESTED|generate|check)/.test(status)) return "secondary";
  if (/^(FAIL|FAILED)/.test(status)) return "destructive";
  return "outline";
}

export function SitemapLedgerPanel() {
  const [ledger, setLedger] = useState<Ledger | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetch("/sitemap-ledger.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setLedger)
      .catch((e) =>
        setErro(`Ledger indisponível (${e.message}). Rode "npm run sitemap:dynamic" para gerá-lo.`),
      );
  }, []);

  if (erro) {
    return <Card className="mt-6 border-destructive/40 p-4 text-sm text-destructive">{erro}</Card>;
  }
  if (!ledger) {
    return <Card className="mt-6 p-4 text-sm text-muted-foreground">Carregando status do sitemap…</Card>;
  }

  const ultimos = [...(ledger.eventos ?? [])].slice(-8).reverse();

  return (
    <Card className="mt-6 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-heading text-sm font-bold">Sitemap dinâmico e submissão</h2>
          <p className="text-xs text-muted-foreground">
            Gerado em {new Date(ledger.geradoEm).toLocaleString("pt-BR")} · modo{" "}
            <span className="font-mono">{ledger.modo}</span>
          </p>
        </div>
        <a className="text-xs underline" href={ledger.sitemap.url} target="_blank" rel="noreferrer">
          abrir sitemap.xml
        </a>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">URLs no sitemap</div>
          <div className="text-xl font-semibold">{ledger.sitemap.totalUrls}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Lotes aprovados</div>
          <div className="text-xl font-semibold">{ledger.lotes?.total ?? 0}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Search Console</div>
          <Badge variant={tom(ledger.sitemap.googleSearchConsole)}>{ledger.sitemap.googleSearchConsole}</Badge>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">IndexNow</div>
          <Badge variant={tom(ledger.sitemap.indexNow)}>{ledger.sitemap.indexNow}</Badge>
        </div>
      </div>

      {(ledger.diff?.adicionadas?.length > 0 || ledger.diff?.removidas?.length > 0) && (
        <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
          <div>
            <div className="font-semibold text-foreground">Entraram ({ledger.diff.adicionadas.length})</div>
            <ul className="mt-1 space-y-0.5 font-mono text-muted-foreground">
              {ledger.diff.adicionadas.slice(0, 12).map((p) => (
                <li key={p}>+ {p}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold text-foreground">Saíram ({ledger.diff.removidas.length})</div>
            <ul className="mt-1 space-y-0.5 font-mono text-muted-foreground">
              {ledger.diff.removidas.slice(0, 12).map((p) => (
                <li key={p}>- {p}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {ultimos.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="text-left uppercase text-muted-foreground">
              <tr>
                <th className="py-1 pr-3">Quando</th>
                <th className="py-1 pr-3">Ação</th>
                <th className="py-1 pr-3">Status</th>
                <th className="py-1">Origem</th>
              </tr>
            </thead>
            <tbody>
              {ultimos.map((e) => (
                <tr key={e.id} className="border-t border-border/60">
                  <td className="py-1 pr-3 whitespace-nowrap">{new Date(e.timestamp).toLocaleString("pt-BR")}</td>
                  <td className="py-1 pr-3 font-mono">{e.action}</td>
                  <td className="py-1 pr-3">
                    <Badge variant={tom(e.status)}>{e.status}</Badge>
                  </td>
                  <td className="py-1 font-mono text-muted-foreground">{e.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
