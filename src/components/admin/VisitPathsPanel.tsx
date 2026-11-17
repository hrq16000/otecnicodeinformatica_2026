import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JOURNEY_ORIGIN_LABELS, type summarizeJourneys } from "@/lib/seoJourney";

type Visit = ReturnType<typeof summarizeJourneys>["visits"][number];
const date = (iso: string) => new Date(iso).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" });
const labels: Record<string, string> = { page_view: "Página visitada", wa_click: "Clique no WhatsApp", funnel_open: "Clique para abrir triagem", cta_click: "Clique de contato", call_click: "Clique de contato legado" };

export function VisitPathsPanel({ visits, rows }: { visits: Visit[]; rows: ReturnType<typeof summarizeJourneys>["rows"] }) {
  const [origin, setOrigin] = useState("all");
  const [symptomsOnly, setSymptomsOnly] = useState(false);
  const [page, setPage] = useState(0);
  const availableOrigins = [...new Set(visits.map(v => v.origin))];
  const filtered = useMemo(() => visits.filter(v => (origin === "all" || v.origin === origin) && (!symptomsOnly || v.steps.some(s => s.type === "page_view" && s.path?.startsWith("/problemas/")))).sort((a, b) => b.first.localeCompare(a.first)), [visits, origin, symptomsOnly]);
  const pages = Math.max(1, Math.ceil(filtered.length / 20));
  const current = Math.min(page, pages - 1);
  return <section className="mt-6 min-w-0" aria-labelledby="visit-paths-title">
    <h3 id="visit-paths-title" className="font-semibold">Origem e caminho de cada visita</h3>
    <p className="mt-1 text-sm text-muted-foreground">Somente páginas e cliques registrados; nenhuma pessoa é identificada. Buscador ausente no histórico permanece não registrado.</p>
    <div className="my-3 flex flex-wrap items-center gap-3">
      <Select value={origin} onValueChange={v => { setOrigin(v); setPage(0); }}><SelectTrigger className="w-full sm:w-72" aria-label="Origem das visitas individuais"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Todas as origens</SelectItem>{availableOrigins.map(o => <SelectItem key={o} value={o}>{JOURNEY_ORIGIN_LABELS[o] ?? "Não identificada"}</SelectItem>)}</SelectContent></Select>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={symptomsOnly} onChange={e => { setSymptomsOnly(e.target.checked); setPage(0); }} />Com página de sintoma</label>
      <span className="text-sm text-muted-foreground">{filtered.length} visitas</span>
    </div>
    <div className="divide-y divide-border border-y border-border">
      {filtered.slice(current * 20, (current + 1) * 20).map(v => {
        const steps = v.steps;
        const clicks = steps.filter(s => s.type !== "page_view").length;
        const submissions = rows.filter(row => row.journey_id === v.id);
        const orders = submissions.flatMap(row => row.orders);
        return <details key={v.id} className="py-3">
          <summary className="cursor-pointer break-words text-sm">
            <span className="font-medium">Visita {visits.indexOf(v) + 1} · {JOURNEY_ORIGIN_LABELS[v.origin] ?? "Não identificada"}</span>
            <span className="ml-2 text-muted-foreground">{date(v.first)} · {steps.filter(s => s.type === "page_view").length} páginas · {clicks} cliques</span>
            <span className="mt-1 block break-all text-muted-foreground">{steps.find(s => s.type === "page_view")?.path ?? "Página não registrada"} → {steps.filter(s => s.type === "page_view").at(-1)?.path ?? "—"}</span>
            <span className="mt-1 block text-muted-foreground">Sintoma: {submissions.find(row => row.sintoma)?.sintoma ?? v.symptom} · {v.city} · {v.neighborhood}</span>
            <span className="mt-1 block text-muted-foreground">{orders.length ? "OS vinculada" : submissions.length ? "Descrição enviada · sem OS vinculada" : v.wa ? "WhatsApp registrado · sem descrição vinculada" : "Sem descrição ou OS vinculada"} · Última atividade: {date(v.last)}</span>
          </summary>
          <ol className="mt-3 space-y-3 border-l border-border pl-4">
            {steps.map((s, i) => <li key={i} className="min-w-0 text-sm">
              <div className="flex flex-wrap items-center gap-2"><span className="text-xs text-muted-foreground">{date(s.at)}</span>{s.type !== "page_view" && <MousePointerClick className="h-3.5 w-3.5 text-primary" aria-hidden="true" />}<span className="font-medium">{labels[s.type] ?? "Interação registrada"}</span>{s.type === "page_view" && s.path?.startsWith("/problemas/") && <span className="text-primary">· Sintoma</span>}</div>
              <p className="break-all text-muted-foreground">{s.path ?? "Página não registrada"}{s.location ? ` · ${s.location}` : ""}</p>
            </li>)}
          </ol>
          {submissions.map(row => <p key={row.id} className="mt-3 text-sm text-muted-foreground">Descrição enviada: {date(row.created_at)} · {row.sintoma ?? "Sintoma não informado"}{row.orders.map(order => <span key={order.id} className="block">OS {order.protocolo} · {date(order.created_at)} · {order.status}</span>)}</p>)}
          {!orders.length && <p className="mt-3 text-xs text-muted-foreground">Sem OS vinculada neste recorte não comprova desistência; a pessoa pode ter continuado fora do site.</p>}
        </details>;
      })}
      {!filtered.length && <p className="py-4 text-sm text-muted-foreground">Sem visitas com caminho registrado neste recorte.</p>}
    </div>
    {pages > 1 && <div className="mt-3 flex items-center justify-end gap-3"><Button variant="outline" size="icon" aria-label="Visitas anteriores" disabled={current === 0} onClick={() => setPage(current - 1)}><ChevronLeft className="h-4 w-4" /></Button><span className="text-sm">{current + 1} / {pages}</span><Button variant="outline" size="icon" aria-label="Próximas visitas" disabled={current + 1 === pages} onClick={() => setPage(current + 1)}><ChevronRight className="h-4 w-4" /></Button></div>}
  </section>;
}