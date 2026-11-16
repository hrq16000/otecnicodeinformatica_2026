import {useEffect,useState} from "react";
import {supabase} from "@/integrations/supabase/client";
import {summarizeOrders,type OrderMetricRow} from "@/lib/os/orderMetrics";
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
export function OrderWeeklyPanel(){
  const [days,setDays]=useState(30);
  const [rows,setRows]=useState<OrderMetricRow[]|null>(null);
  const [error,setError]=useState<string|null>(null);
  useEffect(()=>{let active=true;setRows(null);setError(null);
    const load=async()=>{const all:OrderMetricRow[]=[];for(let offset=0;;offset+=500){
      const {data,error}=await supabase.from("ordens_servico").select("created_at,status,sintomas,city,neighborhood_slug,etapas").order("id").range(offset,offset+499);
      if(!active)return;if(error){setError(error.message);return;}all.push(...(data??[]));if((data?.length??0)<500)break;
    }setRows(all);};void load();const timer=window.setInterval(()=>{if(document.visibilityState==="visible")void load();},30000);return()=>{active=false;window.clearInterval(timer);};
  },[]);
  const summary=summarizeOrders(rows??[],days);
  return <section className="mt-8 border-t border-border pt-6"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-semibold">Chamados atendidos por semana</h2><Button asChild variant="outline"><a href="/admin/ordens">Ordens de serviço</a></Button></div>
    <Select value={String(days)} onValueChange={v=>setDays(Number(v))}><SelectTrigger aria-label="Período dos atendimentos" className="my-3 w-40"><SelectValue /></SelectTrigger><SelectContent>{[7,30,90].map(n=><SelectItem key={n} value={String(n)}>{n} dias</SelectItem>)}</SelectContent></Select>
    <p className="text-sm text-muted-foreground">Conclusões registradas, separadas dos inícios. Semanas de São Paulo; criar uma OS não significa concluir o atendimento.</p>
    {error&&<p role="alert" className="text-destructive">{error}</p>}{!rows&&!error&&<p role="status">Carregando…</p>}
    <table className="my-3 w-full text-sm"><thead><tr className="text-left"><th>Semana de</th><th>Iniciados</th><th>Concluídos</th></tr></thead><tbody>{summary.weeks.map(([w,n])=><tr key={w}><td className="py-3">{w}</td><td>{n.started}</td><td>{n.completed}</td></tr>)}</tbody></table>
    {rows&&!summary.weeks.length&&<p className="text-muted-foreground">Sem transições registradas no período.</p>}
  </section>;
}