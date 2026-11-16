export type OrderMetricRow = {created_at:string; status:string; sintomas:string|null; city:string|null; neighborhood_slug:string|null; etapas:unknown};
export function orderAgeDays(createdAt:string,now=Date.now()) {
  const created=Date.parse(createdAt);
  return Number.isFinite(created) && created<=now ? (now-created)/86400000 : null;
}
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
  const daily=new Map<string,{created:number;completed:number}>();
  const durations=new Map<string,{response:number[];completion:number[]}>();
  const localDay=(time:number)=>new Date(time-3*3600000).toISOString().slice(0,10);
  for(const row of rows) {
    const created=Date.parse(row.created_at);
    if(Number.isFinite(created) && created>=since && created<=now) {
      const key=[row.sintomas||"Não informado",row.city||"Não informada",row.neighborhood_slug||"Não informado"].join(" · ");
      groups.set(key,(groups.get(key)??0)+1);
      const day=localDay(created);
      const count=daily.get(day)??{created:0,completed:0};count.created++;daily.set(day,count);
    }
    const seen=new Set<string>();
    const steps=(Array.isArray(row.etapas)?row.etapas:[]).filter(step=>step && typeof step==="object" && "at" in step && typeof step.at==="string").sort((a,b)=>Date.parse(a.at)-Date.parse(b.at));
    for(const step of steps) {
      if(!step || typeof step!=="object" || !("metric" in step) || !("at" in step)) continue;
      if(typeof step.at!=="string" || !["started","completed","responded"].includes(step.metric) || seen.has(step.metric)) continue;
      const time=Date.parse(step.at);
      if(!Number.isFinite(time) || !Number.isFinite(created) || time<created || time>now)continue;
      seen.add(step.metric);
      if(time<since) continue;
      const key=[row.sintomas||"Não informado",row.neighborhood_slug||"Não informado"].join(" · ");
      if(step.metric!=="started") {
        const duration=durations.get(key)??{response:[],completion:[]};
        if(step.metric==="responded")duration.response.push(time-created);else duration.completion.push(time-created);
        durations.set(key,duration);
      }
      if(step.metric==="responded") continue;
      if(step.metric==="completed") {const day=localDay(time);const count=daily.get(day)??{created:0,completed:0};count.completed++;daily.set(day,count);}
      const local=new Date(time-3*3600000);
      local.setUTCDate(local.getUTCDate()-((local.getUTCDay()+6)%7));
      const week=local.toISOString().slice(0,10);
      const count=weeks.get(week)??{started:0,completed:0};
      if(step.metric==="completed")count.completed++; else count.started++;
      weeks.set(week,count);
    }
  }
  const mean=(values:number[])=>values.length?values.reduce((a,b)=>a+b,0)/values.length:null;
  return {groups:[...groups].sort((a,b)=>b[1]-a[1]),weeks:[...weeks].sort((a,b)=>b[0].localeCompare(a[0])),daily:[...daily].sort((a,b)=>b[0].localeCompare(a[0])),durations:[...durations].map(([key,d])=>({key,responseMs:mean(d.response),completionMs:mean(d.completion),responseCount:d.response.length,completionCount:d.completion.length}))};
}