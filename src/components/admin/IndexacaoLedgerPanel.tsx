import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

/**
 * INDEXAÇÃO E DESEMPENHO REAL — Google Search Console + Bing Webmaster.
 *
 * Fonte única: `public/indexacao-ledger.json`, escrito por
 * `npm run report:indexacao-ledger`. Nada é estimado no navegador: quando
 * uma fonte está indisponível, o painel mostra "UNKNOWN" e o motivo — nunca
 * converte ausência de dado em zero nem afirma indexação completa.
 */

interface Consulta {
  consulta: string;
  impressoes: number;
  cliques: number;
  posicao?: number | null;
}

interface LinhaUrl {
  path: string;
  sitemap: string;
  segmento: string;
  google: {
    disponivel: boolean;
    impressoes: number | null;
    cliques: number | null;
    ctr: number | null;
    posicao: number | null;
    deltaImpressoes: number | null;
    deltaCliques: number | null;
    cobertura: string;
    verdict: string;
    ultimoRastreio: string | null;
  };
  bing: { disponivel: boolean; impressoes: number | null; cliques: number | null };
  consultas: Consulta[];
}

interface Segmento {
  nome: string;
  urls: number;
  impressoes: number;
  cliques: number;
  deltaImpressoes: number;
  comImpressao: number;
  indexadas: number;
  inspecionadas: number;
  consultas: { consulta: string; impressoes: number }[];
}

interface Ledger {
  geradoEm: string;
  janela: { atual: { inicio: string; fim: string }; anterior: { inicio: string; fim: string } };
  fontes: {
    google: { disponivel: boolean; propriedade: string | null; motivo: string | null };
    bing: {
      disponivel: boolean;
      motivo: string | null;
      crawl: Record<string, number> | null;
      totais: { cliques: number; impressoes: number } | null;
    };
  };
  cobertura: {
    urlsCuradas: number;
    inspecionadas: number;
    indexadas: number;
    percentualInspecionado: number;
    percentualIndexadoEntreInspecionadas: number | null;
    comImpressao: number | null;
    rastreadasNaoIndexadas: string[];
  };
  totaisGoogle: {
    impressoes: number | null;
    cliques: number | null;
    deltaImpressoes: number | null;
    deltaCliques: number | null;
  };
  segmentos: Segmento[];
  consultasTopGoogle: Consulta[];
  consultasTopBing: Consulta[];
  alertas: { nivel: string; mensagem: string }[];
  urls: LinhaUrl[];
  limitacoes: string;
}

const num = (v: number | null | undefined) => (v === null || v === undefined ? "UNKNOWN" : v.toLocaleString("pt-BR"));
const delta = (v: number | null | undefined) =>
  v === null || v === undefined ? "UNKNOWN" : `${v > 0 ? "+" : ""}${v.toLocaleString("pt-BR")}`;

function Kpi({ label, valor, hint }: { label: string; valor: string; hint?: string }) {
  return (
    <Card className="p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{valor}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </Card>
  );
}

function tomAlerta(nivel: string): "default" | "secondary" | "destructive" | "outline" {
  if (nivel === "regressao") return "destructive";
  if (nivel === "cobertura") return "outline";
  if (nivel === "config") return "secondary";
  return "outline";
}

export function IndexacaoLedgerPanel() {
  const [ledger, setLedger] = useState<Ledger | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [segmento, setSegmento] = useState("todos");

  useEffect(() => {
    fetch("/indexacao-ledger.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setLedger)
      .catch((e) =>
        setErro(
          `Ledger de indexação indisponível (${e.message}). Rode "npm run report:indexacao-ledger" para gerá-lo.`,
        ),
      );
  }, []);

  const filtradas = useMemo(() => {
    if (!ledger) return [];
    const termo = busca.trim().toLowerCase();
    return ledger.urls
      .filter((u) => (segmento === "todos" ? true : u.segmento === segmento))
      .filter((u) => (termo ? u.path.toLowerCase().includes(termo) : true))
      .sort((a, b) => (b.google.impressoes ?? 0) - (a.google.impressoes ?? 0))
      .slice(0, 120);
  }, [ledger, busca, segmento]);

  if (erro) {
    return <Card className="mt-6 border-destructive/40 p-4 text-sm text-destructive">{erro}</Card>;
  }
  if (!ledger) {
    return <Card className="mt-6 p-4 text-sm text-muted-foreground">Carregando indexação real…</Card>;
  }

  const cob = ledger.cobertura;
  const segmentosDisponiveis = ["todos", ...ledger.segmentos.map((s) => s.nome)];

  return (
    <section className="mt-8 space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold">Indexação real e desempenho</h2>
          <p className="text-xs text-muted-foreground">
            Janela {ledger.janela.atual.inicio} → {ledger.janela.atual.fim} · gerado em{" "}
            {new Date(ledger.geradoEm).toLocaleString("pt-BR")}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant={ledger.fontes.google.disponivel ? "default" : "secondary"}>
            Google {ledger.fontes.google.disponivel ? "conectado" : "sem credencial"}
          </Badge>
          <Badge variant={ledger.fontes.bing.disponivel ? "default" : "secondary"}>
            Bing {ledger.fontes.bing.disponivel ? "conectado" : "sem credencial"}
          </Badge>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi
          label="Cobertura técnica curada"
          valor={`${cob.urlsCuradas}`}
          hint={`inspecionadas ${cob.inspecionadas} (${cob.percentualInspecionado}%)`}
        />
        <Kpi
          label="Indexadas (URL Inspection)"
          valor={cob.inspecionadas ? `${cob.indexadas}/${cob.inspecionadas}` : "UNKNOWN"}
          hint={
            cob.percentualIndexadoEntreInspecionadas === null
              ? "nenhuma URL inspecionada ainda"
              : `${cob.percentualIndexadoEntreInspecionadas}% entre as inspecionadas`
          }
        />
        <Kpi
          label="Impressões (Google)"
          valor={num(ledger.totaisGoogle.impressoes)}
          hint={`Δ ${delta(ledger.totaisGoogle.deltaImpressoes)} vs. janela anterior`}
        />
        <Kpi
          label="Cliques (Google)"
          valor={num(ledger.totaisGoogle.cliques)}
          hint={`Bing: ${ledger.fontes.bing.totais ? num(ledger.fontes.bing.totais.cliques) : "UNKNOWN"}`}
        />
      </div>

      {ledger.alertas.length > 0 && (
        <Card className="p-4">
          <div className="text-sm font-medium">Alertas</div>
          <ul className="mt-2 space-y-1 text-sm">
            {ledger.alertas.slice(0, 12).map((a, i) => (
              <li key={`${a.nivel}-${i}`} className="flex items-start gap-2">
                <Badge variant={tomAlerta(a.nivel)}>{a.nivel}</Badge>
                <span className="text-muted-foreground">{a.mensagem}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="overflow-x-auto p-4">
        <div className="text-sm font-medium">Por segmento (artigo, cidade, serviço…)</div>
        <table className="mt-3 w-full min-w-[720px] text-sm">
          <thead className="text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="py-1">Segmento</th>
              <th className="py-1 text-right">URLs</th>
              <th className="py-1 text-right">Impressões</th>
              <th className="py-1 text-right">Cliques</th>
              <th className="py-1 text-right">Δ impressões</th>
              <th className="py-1 text-right">Com impressão</th>
              <th className="py-1">Consultas principais</th>
            </tr>
          </thead>
          <tbody>
            {ledger.segmentos.map((s) => (
              <tr key={s.nome} className="border-t border-border/60">
                <td className="py-1.5 font-medium">{s.nome}</td>
                <td className="py-1.5 text-right">{s.urls}</td>
                <td className="py-1.5 text-right">{s.impressoes.toLocaleString("pt-BR")}</td>
                <td className="py-1.5 text-right">{s.cliques.toLocaleString("pt-BR")}</td>
                <td className="py-1.5 text-right">{delta(s.deltaImpressoes)}</td>
                <td className="py-1.5 text-right">
                  {s.comImpressao}/{s.urls}
                </td>
                <td className="py-1.5 text-xs text-muted-foreground">
                  {s.consultas.length
                    ? s.consultas.slice(0, 3).map((c) => c.consulta).join(" · ")
                    : "sem dados"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Filtrar por URL…"
            className="max-w-xs"
          />
          <select
            value={segmento}
            onChange={(e) => setSegmento(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-2 text-sm"
            aria-label="Filtrar por segmento"
          >
            {segmentosDisponiveis.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <span className="text-xs text-muted-foreground">{filtradas.length} URL(s) exibidas</span>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-1">URL</th>
                <th className="py-1">Cobertura</th>
                <th className="py-1 text-right">Impr. (G)</th>
                <th className="py-1 text-right">Cliques (G)</th>
                <th className="py-1 text-right">Δ impr.</th>
                <th className="py-1 text-right">Pos.</th>
                <th className="py-1 text-right">Impr. (Bing)</th>
                <th className="py-1">Consulta principal</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((u) => (
                <tr key={u.path} className="border-t border-border/60">
                  <td className="py-1.5 font-mono text-xs">{u.path}</td>
                  <td className="py-1.5">
                    <Badge variant={u.google.verdict === "PASS" ? "default" : "outline"}>
                      {u.google.cobertura}
                    </Badge>
                  </td>
                  <td className="py-1.5 text-right">{num(u.google.impressoes)}</td>
                  <td className="py-1.5 text-right">{num(u.google.cliques)}</td>
                  <td className="py-1.5 text-right">{delta(u.google.deltaImpressoes)}</td>
                  <td className="py-1.5 text-right">{u.google.posicao ?? "—"}</td>
                  <td className="py-1.5 text-right">{num(u.bing.impressoes)}</td>
                  <td className="py-1.5 text-xs text-muted-foreground">
                    {u.consultas[0]?.consulta ?? "sem dados"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-xs text-muted-foreground">{ledger.limitacoes}</p>
    </section>
  );
}
