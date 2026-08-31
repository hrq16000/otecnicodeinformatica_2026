import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Row = {
  url: string;
  lote: string;
  wave?: string;
  veredito: string;
  estadoBusca: string;
  motivo?: string | null;
  emSitemap?: boolean;
  indexNow?: string | null;
  submittedViaSitemap?: boolean;
  submittedViaIndexNow?: boolean;
  lastSubmissionAt?: string | null;
  publicadoNoSite?: boolean;
  canonicalValidado?: boolean;
  schemaValidado?: boolean;
  errosPublicacao?: string[];
  ultimoCrawl?: string | null;
};
type Ledger = {
  geradoEm: string;
  contagem: Record<string, number>;
  consolidada?: boolean;
  fonte?: { site?: string; gscDisponivel?: boolean; monitoradoEm?: string | null };
  urls: Row[];
};
type History = { historico: Array<{ geradoEm: string; contagem: Record<string, number> }> };

const STATUS = ["PUBLISHED", "PENDING", "PROBLEM", "UNKNOWN"] as const;
const colors: Record<string, string> = {
  PUBLISHED: "bg-emerald-500/15 text-emerald-400",
  PENDING: "bg-amber-500/15 text-amber-400",
  PROBLEM: "bg-destructive/15 text-destructive",
  UNKNOWN: "bg-muted text-muted-foreground",
};
const tipoDe = (r: Row) =>
  r.wave === "CASO" || r.lote.startsWith("CASO") ? "artigo" : r.lote.startsWith("11") ? "lote-4" : "onda-10c";
const fmt = (v?: string | null) => (v ? new Date(v).toLocaleString("pt-BR") : "—");

export default function EditorialVerdictsPanel() {
  const [ledger, setLedger] = useState<Ledger | null>(null);
  const [history, setHistory] = useState<History | null>(null);
  const [status, setStatus] = useState("todos");
  const [tipo, setTipo] = useState("todos");
  const [lote, setLote] = useState("todos");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    void fetch("/editorial-verdicts.json", { cache: "no-store" })
      .then((r) => r.json())
      .then(setLedger)
      .catch(() => setLedger({ geradoEm: "", contagem: {}, urls: [] }));
    void fetch("/editorial-verdicts-history.json", { cache: "no-store" })
      .then((r) => r.json())
      .then(setHistory)
      .catch(() => setHistory({ historico: [] }));
  }, []);

  const lotes = useMemo(() => [...new Set((ledger?.urls ?? []).map((r) => r.lote))].sort(), [ledger]);
  const linhas = useMemo(
    () =>
      (ledger?.urls ?? []).filter(
        (r) =>
          (status === "todos" || r.veredito === status) &&
          (tipo === "todos" || tipoDe(r) === tipo) &&
          (lote === "todos" || r.lote === lote) &&
          (busca.trim() === "" || r.url.toLowerCase().includes(busca.trim().toLowerCase())),
      ),
    [ledger, status, tipo, lote, busca],
  );

  // Agrega o histórico por semana ISO para o gráfico de evolução de status.
  const semanas = useMemo(() => {
    const acc: Record<string, Record<string, number>> = {};
    for (const h of history?.historico ?? []) {
      const d = new Date(h.geradoEm);
      if (Number.isNaN(d.getTime())) continue;
      const jan1 = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      const semana = Math.ceil(((d.getTime() - jan1.getTime()) / 86400000 + jan1.getUTCDay() + 1) / 7);
      acc[`${d.getUTCFullYear()}-S${String(semana).padStart(2, "0")}`] = h.contagem;
    }
    return Object.entries(acc).sort(([a], [b]) => a.localeCompare(b));
  }, [history]);

  if (!ledger) return <Card className="p-4 text-sm text-muted-foreground">Carregando ledger de vereditos…</Card>;

  const total = Math.max(ledger.urls.length, 1);

  return (
    <section className="space-y-5">
      <Card className="p-4">
        <h2 className="font-semibold">Ledger de vereditos do Search Console</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          URLs da Onda 10C/10D, artigo 0xc0000428 e Lote 4 (quando publicado). Propriedade{" "}
          <code>{ledger.fonte?.site ?? "—"}</code> · última leitura {fmt(ledger.geradoEm)} · Search Console{" "}
          {ledger.fonte?.gscDisponivel ? "disponível" : "INDISPONÍVEL (fail-closed: UNKNOWN)"} · onda consolidada:{" "}
          <b>{ledger.consolidada ? "SIM" : "NÃO"}</b>
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          {STATUS.map((s) => (
            <div key={s}>
              <span className="text-xs text-muted-foreground">{s}</span>
              <div className="mt-1 h-2 rounded bg-muted">
                <div
                  className="h-2 rounded bg-accent"
                  style={{ width: `${Math.round(((ledger.contagem[s] ?? 0) / total) * 100)}%` }}
                />
              </div>
              <b>{ledger.contagem[s] ?? 0}</b>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h2 className="font-semibold">Status por semana</h2>
        {semanas.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">Sem histórico suficiente ainda.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {semanas.map(([semana, c]) => {
              const soma = Math.max(
                Object.values(c).reduce((a, b) => a + b, 0),
                1,
              );
              return (
                <div key={semana} className="grid grid-cols-[7rem_1fr] items-center gap-3 text-sm">
                  <span className="tabular-nums">{semana}</span>
                  <div className="flex h-5 overflow-hidden rounded bg-muted">
                    {STATUS.map((s) => (
                      <span
                        key={s}
                        className={colors[s]}
                        style={{ width: `${((c[s] ?? 0) / soma) * 100}%` }}
                        title={`${s}: ${c[s] ?? 0}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Card className="grid gap-3 p-4 sm:grid-cols-4">
        <label className="text-sm">
          <span className="text-xs text-muted-foreground">Status</span>
          <select
            className="mt-1 w-full rounded border bg-background p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="todos">todos</option>
            {STATUS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="text-xs text-muted-foreground">Tipo</span>
          <select
            className="mt-1 w-full rounded border bg-background p-2"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            {["todos", "onda-10c", "artigo", "lote-4"].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="text-xs text-muted-foreground">Onda / lote</span>
          <select
            className="mt-1 w-full rounded border bg-background p-2"
            value={lote}
            onChange={(e) => setLote(e.target.value)}
          >
            <option value="todos">todos</option>
            {lotes.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="text-xs text-muted-foreground">Slug / URL</span>
          <Input className="mt-1" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="/blog/…" />
        </label>
      </Card>

      <div className="overflow-x-auto rounded border">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="p-3">URL</th>
              <th>Lote</th>
              <th>Tipo</th>
              <th>Publicado</th>
              <th>Sitemap</th>
              <th>IndexNow</th>
              <th>Canonical</th>
              <th>Schema</th>
              <th>Última submissão</th>
              <th>Busca</th>
              <th>Veredito</th>
              <th>Observações</th>
            </tr>
          </thead>
          <tbody>
            {linhas.map((r) => (
              <tr key={r.url} className="border-t align-top">
                <td className="p-3">
                  <a className="underline" href={r.url}>
                    {r.url}
                  </a>
                </td>
                <td>{r.lote}</td>
                <td>{tipoDe(r)}</td>
                <td>{r.publicadoNoSite === undefined ? "—" : r.publicadoNoSite ? "sim" : "não"}</td>
                <td>{r.submittedViaSitemap ?? r.emSitemap ? "sim" : "não"}</td>
                <td>{r.submittedViaIndexNow || r.indexNow === "SUBMITTED" ? "sim" : "não"}</td>
                <td>{r.canonicalValidado === undefined ? "—" : r.canonicalValidado ? "ok" : "falha"}</td>
                <td>{r.schemaValidado === undefined ? "—" : r.schemaValidado ? "ok" : "falha"}</td>
                <td className="whitespace-nowrap text-xs">{fmt(r.lastSubmissionAt)}</td>
                <td className="text-xs">{r.estadoBusca}</td>
                <td>
                  <Badge className={colors[r.veredito]}>{r.veredito}</Badge>
                </td>
                <td className="max-w-[18rem] p-3 text-xs text-muted-foreground">
                  {[r.motivo, ...(r.errosPublicacao ?? [])].filter(Boolean).join(" · ") || "—"}
                </td>
              </tr>
            ))}
            {linhas.length === 0 && (
              <tr>
                <td className="p-4 text-sm text-muted-foreground" colSpan={12}>
                  Nenhuma URL para os filtros selecionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
