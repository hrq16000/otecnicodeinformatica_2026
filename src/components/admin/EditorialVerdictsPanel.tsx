import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type Row = { url: string; lote: string; veredito: string; estadoBusca: string; motivo?: string | null };
type Ledger = { geradoEm: string; contagem: Record<string, number>; urls: Row[] };
type History = { historico: Array<{ geradoEm: string; contagem: Record<string, number> }> };
const colors: Record<string, string> = { PUBLISHED: "bg-emerald-500/15 text-emerald-400", PENDING: "bg-amber-500/15 text-amber-400", PROBLEM: "bg-destructive/15 text-destructive", UNKNOWN: "bg-muted text-muted-foreground" };

export default function EditorialVerdictsPanel() {
  const [ledger, setLedger] = useState<Ledger | null>(null);
  const [history, setHistory] = useState<History | null>(null);
  useEffect(() => { void fetch("/editorial-verdicts.json", { cache: "no-store" }).then((r) => r.json()).then(setLedger); void fetch("/editorial-verdicts-history.json", { cache: "no-store" }).then((r) => r.json()).then(setHistory).catch(() => setHistory({ historico: [] })); }, []);
  const weeks = useMemo(() => (history?.historico ?? []).reduce<Record<string, Record<string, number>>>((a, h) => { const k = h.geradoEm.slice(0, 10); a[k] = h.contagem; return a; }, {}), [history]);
  if (!ledger) return <Card className="p-4 text-sm text-muted-foreground">Carregando ledger de vereditos…</Card>;
  return <section className="space-y-5"><Card className="p-4"><h2 className="font-semibold">Ledger de vereditos</h2><p className="mt-1 text-sm text-muted-foreground">URLs da Onda 10C/10D e caso 0xc0000428. Atualizado em {new Date(ledger.geradoEm).toLocaleString("pt-BR")}.</p><div className="mt-4 grid gap-3 sm:grid-cols-4">{["PUBLISHED", "PENDING", "PROBLEM", "UNKNOWN"].map((s) => <div key={s}><span className="text-xs text-muted-foreground">{s}</span><div className="mt-1 h-2 rounded bg-muted"><div className="h-2 rounded bg-accent" style={{ width: `${Math.round(((ledger.contagem[s] ?? 0) / Math.max(ledger.urls.length, 1)) * 100)}%` }} /></div><b>{ledger.contagem[s] ?? 0}</b></div>)}</div></Card><Card className="p-4"><h2 className="font-semibold">Status por semana</h2><div className="mt-3 space-y-2">{Object.entries(weeks).map(([week, c]) => <div key={week} className="grid grid-cols-[7rem_1fr] gap-3 text-sm"><span>{week}</span><div className="flex h-5 overflow-hidden rounded bg-muted">{["PUBLISHED", "PENDING", "PROBLEM", "UNKNOWN"].map((s) => <span key={s} className={colors[s]} style={{ width: `${((c[s] ?? 0) / Math.max(Object.values(c).reduce((a, b) => a + b, 0), 1)) * 100}%` }} title={`${s}: ${c[s] ?? 0}`} />)}</div></div>)}</div></Card><div className="overflow-x-auto rounded border"><table className="w-full text-sm"><thead><tr className="text-left"><th className="p-3">URL</th><th>Lote</th><th>Busca</th><th>Veredito</th></tr></thead><tbody>{ledger.urls.map((r) => <tr key={r.url} className="border-t"><td className="p-3"><a className="underline" href={r.url}>{r.url}</a></td><td>{r.lote}</td><td>{r.estadoBusca}</td><td><Badge className={colors[r.veredito]}>{r.veredito}</Badge></td></tr>)}</tbody></table></div></section>;
}
