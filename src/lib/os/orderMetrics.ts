export type OrderMetricRow = {created_at:string; status:string; sintomas:string|null; city:string|null; neighborhood_slug:string|null; etapas:unknown};
export function statusMilestone(from:string,to:string) {
  if (from === to) return null;
  if (["pronta","entregue","concluida","concluída"].includes(to) && !["pronta","entregue","concluida","concluída"].includes(from)) return "completed";
  if (["em_triagem","em_laboratorio","em_reparo","em_andamento"].includes(to) && ["recebida","aberta","nova"].includes(from)) return "started";
  return null;
}
export function summarizeOrders(rows:OrderMetricRow[], days:number, now=Date.now()) {
  const since=now-days*86400000;
  const groups=new Map<string,number>();
  const weeks=new Map<string,{started:number;completed:number}>();
  for(const row of rows) {
    if(Date.parse(row.created_at)>=since) {
      const key=[row.sintomas||"Não informado",row.city||"Não informada",row.neighborhood_slug||"Não informado"].join(" · ");
      groups.set(key,(groups.get(key)??0)+1);
    }
    const seen=new Set<string>();
    for(const step of Array.isArray(row.etapas)?row.etapas:[]) {
      if(!step || typeof step!=="object" || !("metric" in step) || !("at" in step)) continue;
      if(typeof step.at!=="string" || !["started","completed"].includes(step.metric) || seen.has(step.metric)) continue;
      seen.add(step.metric);
      if(Date.parse(step.at)<since) continue;
      const local=new Date(Date.parse(step.at)-3*3600000);
      local.setUTCDate(local.getUTCDate()-((local.getUTCDay()+6)%7));
      const week=local.toISOString().slice(0,10);
      const count=weeks.get(week)??{started:0,completed:0};
      if(step.metric==="completed")count.completed++; else count.started++;
      weeks.set(week,count);
    }
  }
  return {groups:[...groups].sort((a,b)=>b[1]-a[1]),weeks:[...weeks].sort((a,b)=>b[0].localeCompare(a[0]))};
}