import { useCallback, useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { readSeoJourney, linkSeoOrder } from "@/lib/seoJourney.functions";
import { JOURNEY_ORIGIN_LABELS, recentVisitGroups, summarizeJourneys } from "@/lib/seoJourney";
import { VisitPathsPanel } from "@/components/admin/VisitPathsPanel";
import { CLUSTER_PROBLEMAS } from "@/lib/clusterProblemas";
import {OrderWeeklyPanel} from "@/components/admin/OrderWeeklyPanel";
import {CreateOrderFromLead} from "@/components/admin/CreateOrderFromLead";

const origins = JOURNEY_ORIGIN_LABELS;
const date = (iso: string | null) => iso ? new Date(iso).toLocaleString("pt-BR", {timeZone:"America/Sao_Paulo",dateStyle:"short",timeStyle:"short"}) : "—";
type Payload = Awaited<ReturnType<typeof readSeoJourney>>;
export function SeoJourneyPanel() {
  const read = useServerFn(readSeoJourney);
  const link = useServerFn(linkSeoOrder);
  const [days,setDays] = useState(30);
  const [exclude,setExclude] = useState(true);
  const [data,setData] = useState<Payload | null>(null);
  const [error,setError] = useState<string | null>(null);
  const [busy,setBusy] = useState(false);
  const [selections,setSelections] = useState<Record<string,string>>({});
  const [segment,setSegment] = useState("origin");
  const [now,setNow]=useState(Date.now());
  useEffect(()=>{const timer=window.setInterval(()=>setNow(Date.now()),10000);return()=>window.clearInterval(timer);},[]);
  const load = useCallback(async () => {
    setBusy(true); setError(null);
    try { setData(await read({data:{days}})); } catch(e) { setError(e instanceof Error ? e.message : "Falha ao carregar"); }
    finally { setBusy(false); }
  },[read,days]);
  useEffect(()=>{ void load(); },[load]);
  useEffect(()=>{const timer=window.setInterval(()=>{if(document.visibilityState==="visible")void load();},30000);return()=>window.clearInterval(timer);},[load]);
  const result = useMemo(()=> data ? summarizeJourneys(data.events,data.leads,data.orders,exclude) : null,[data,exclude]);
  const active=useMemo(()=>recentVisitGroups(result?.visits??[],now),[result,now]);
  const groups = useMemo(()=> {
    if (segment === "page") return (result?.pages ?? []).map(p => [p.path,p.visits] as [string,number]);
    const map = new Map<string,number>();
    for(const v of result?.visits ?? []) {
      const key = segment === "symptom" ? v.symptom : segment === "city" ? v.city : segment === "neighborhood" ? v.neighborhood : origins[v.origin] ?? "Não identificada";
      map.set(key,(map.get(key)??0)+1);
    }
    return [...map.entries()].sort((a,b)=>b[1]-a[1]);
  },[result,segment]);
  async function bind(leadId:string) {
    const orderId = selections[leadId];
    if(!orderId || !window.confirm("Confirmar que esta OS pertence à solicitação selecionada?")) return;
    setBusy(true); setError(null);
    try { await link({data:{leadId,orderId}}); await load(); }
    catch(e) { setError(e instanceof Error ? e.message : "Falha ao vincular"); setBusy(false); }
  }
  return <section className="mt-8 min-w-0 border-t border-border pt-6 [&_th]:pr-4 [&_td]:pr-4 [&_th]:pb-3" aria-labelledby="jornada-os-titulo">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 id="jornada-os-titulo" className="text-xl font-semibold">Visitas → descrição → WhatsApp → OS</h2>
      <div className="flex gap-2">
        <Select value={String(days)} onValueChange={v=>{setData(null);setDays(Number(v));}}><SelectTrigger aria-label="Período da jornada" className="w-32"><SelectValue /></SelectTrigger><SelectContent>{[7,30,90].map(n=><SelectItem key={n} value={String(n)}>{n} dias</SelectItem>)}</SelectContent></Select>
        <Button variant="outline" size="icon" aria-label="Atualizar jornada" onClick={()=>void load()} disabled={busy}><RefreshCw className="h-4 w-4" /></Button>
      </div>
    </div>
    <p className="mt-2 text-sm text-muted-foreground">Visitas registradas no site, não pessoas identificadas; origem sem referência não prova acesso direto. Google aparece separado somente quando a origem está registrada.</p>
    <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={exclude} onChange={e=>setExclude(e.target.checked)} />Excluir suspeitas de automação (20 páginas distintas no mesmo minuto); testes sempre excluídos</label>
    <p className="mt-1 text-xs text-muted-foreground">Suspeita não confirma robô; automações discretas podem permanecer. Abertura da página de status não confirma consulta de uma OS.</p>
    {error && <p role="alert" className="mt-4 text-destructive">{error}</p>}
    {busy && <p role="status" className="mt-4 text-muted-foreground">Carregando…</p>}
    {data?.limited && <p role="status" className="mt-4 font-medium text-destructive">Amostra parcial: limite de leitura atingido. Os números abaixo não representam todo o período.</p>}
    {result && data && <>
      <div className="my-5 grid gap-4 sm:grid-cols-4">{[["Visitas registradas",result.visits.length],["Descrições enviadas",result.rows.length],["Descrições com OS vinculada",result.converted],["Jornadas suspeitas",result.suspected]].map(([label,value])=><div key={label} className="border-l-2 border-border pl-3"><p className="text-xs text-muted-foreground">{label}</p><p className="text-2xl font-semibold">{value}</p></div>)}</div>
      <Select value={segment} onValueChange={setSegment}><SelectTrigger className="w-52" aria-label="Agrupar visitas por"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="page">Página</SelectItem><SelectItem value="origin">Origem</SelectItem><SelectItem value="symptom">Sintoma</SelectItem><SelectItem value="city">Cidade</SelectItem><SelectItem value="neighborhood">Bairro</SelectItem></SelectContent></Select>
      <div className="mt-3 max-h-64 overflow-auto"><table className="w-full text-sm"><thead><tr className="text-left"><th className="py-2">Grupo</th><th>Visitas</th></tr></thead><tbody>{groups.map(([label,n])=><tr key={label} className="border-t border-border"><td className="py-2">{label}</td><td>{n}</td></tr>)}</tbody></table>{!groups.length && <p className="py-4 text-muted-foreground">Sem visitas registradas no recorte.</p>}</div>
      <h3 className="mt-6 font-semibold">Conversão por origem</h3>
      <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left"><th className="py-2">Origem</th><th>Visitas</th><th>Com descrição</th><th>WhatsApp</th><th>Com OS</th></tr></thead><tbody>{result.origins.map(([origin,g])=><tr key={origin} className="border-t border-border"><td className="py-2">{origins[origin] ?? "Não identificada"}</td><td>{g.visits}</td><td>{g.descriptions}</td><td>{g.whatsapp}</td><td>{g.os}</td></tr>)}</tbody></table></div>
      <VisitPathsPanel visits={result.visits} />
      <h3 className="mt-6 font-semibold">Visitantes ativos por sintoma, cidade e bairro</h3>
      <p className="mt-1 text-sm text-muted-foreground">Visitas com atividade registrada nos últimos 30 minutos, não confirmação de presença online. Testes identificados são excluídos; histórico suspeito de Batel/Centro não comprova robôs.</p>
      <div className="mt-3 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left"><th>Sintoma · cidade · bairro</th><th>Visitas recentes</th><th>Última atividade</th><th>Desde o acesso</th></tr></thead><tbody>{active.map(g=><tr key={g.key} className="border-t border-border"><td className="py-3">{g.key}</td><td>{g.visits}</td><td>{date(g.last)}</td><td>{Math.floor(g.elapsedMs/60000)} min</td></tr>)}</tbody></table>{!active.length && <p className="py-4 text-muted-foreground">Sem atividade registrada nos últimos 30 minutos.</p>}</div>
      <h3 className="mt-6 font-semibold">Descrições e ordens de serviço</h3>
      <div className="mt-3 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left"><th>Sintoma informado</th><th>Cidade / bairro</th><th>Página de envio</th><th>Página de sintoma existente</th></tr></thead><tbody>{result.rows.map(l=> {
        const matching = CLUSTER_PROBLEMAS.find(p=>p.path === l.origin_route || p.slug === l.service_slug || p.slug === l.sintoma);
        return <tr key={l.id} className="border-t border-border"><td className="py-3">{l.sintoma || "Não informado"}</td><td>{l.city || "Não informada"} / {l.neighborhood_slug || "Não informado"}</td><td>{l.origin_route || "Não registrada"}</td><td>{matching ? <a className="text-primary underline" href={matching.path}>{matching.titulo}</a> : "Sem correspondência comprovada"}</td></tr>;
      })}</tbody></table></div>
      <p className="mt-1 text-xs text-muted-foreground">Datas em São Paulo. Só vínculo confirmado conta como conversão; nenhuma associação por telefone ou texto é presumida.</p>
      <div className="my-3 flex flex-wrap gap-3">{result.rows.filter(l=>!l.orders.length).map(l=><div key={l.id} className="space-y-2"><p className="text-sm">{date(l.created_at)} · {l.sintoma || "Sem sintoma"}</p><CreateOrderFromLead leadId={l.id} onCreated={()=>void load()}/></div>)}</div>
      <div className="mt-3 overflow-x-auto"><table className="w-full min-w-[850px] text-sm"><thead><tr className="text-left"><th className="py-2">Descrição enviada</th><th>Sintoma / cidade</th><th>Status do chamado</th><th>WhatsApp posterior</th><th>Página de status posterior</th><th>OS · data · status</th></tr></thead><tbody>{result.rows.map(l=><tr key={l.id} className="border-t border-border align-top"><td className="py-3">{date(l.created_at)}</td><td className="py-3">{l.sintoma || "Não identificado"}<br />{l.city || "Não identificada"}<br />{l.neighborhood_slug || "Bairro não identificado"}</td><td className="py-3">{l.status_atendimento}</td><td className="py-3">{date(l.whatsappAt)}</td><td className="py-3">{date(l.statusPageAt)}</td><td className="py-3">{l.orders.map(o=><p key={o.id}>{o.protocolo}<br />{date(o.created_at)} · {o.status}</p>)}{!l.orders.length && <div className="space-y-2"><Select value={selections[l.id]} onValueChange={v=>setSelections(p=>({...p,[l.id]:v}))}><SelectTrigger aria-label={`Vincular OS ao chamado de ${date(l.created_at)}`} className="w-52"><SelectValue placeholder="Selecionar OS real" /></SelectTrigger><SelectContent>{data.orders.filter(o=>!o.lead_id && o.created_at>=l.created_at).map(o=><SelectItem key={o.id} value={o.id}>{o.protocolo}</SelectItem>)}</SelectContent></Select><Button size="sm" variant="outline" disabled={busy || !selections[l.id]} onClick={()=>void bind(l.id)}>Confirmar vínculo</Button></div>}</td></tr>)}</tbody></table>{!result.rows.length && <p className="py-4 text-muted-foreground">Nenhuma descrição enviada no período.</p>}</div>
      <p className="mt-4 text-xs text-muted-foreground">Atualizado em {date(data.fetchedAt)}. A conversa no WhatsApp e retornos em outro dispositivo não são rastreados.</p>
    </>}
    <OrderWeeklyPanel />
  </section>;
}