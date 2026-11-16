import { isQaEvent, type QaCheckable } from "@/lib/qaExclusion";
import { ehTrafegoInterno } from "@/lib/canalAtribuicao";

export type JourneyEvent = QaCheckable & {
  created_at: string; journey_id: string | null; event_type: string;
  path: string | null; problema: string | null; cidade: string | null;
  neighborhood_slug: string | null; attribution_channel: string | null;
};
export type JourneyLead = QaCheckable & {
  id: string; created_at: string; journey_id: string | null; equipamento: string | null;
  sintoma: string | null; city: string | null; neighborhood_slug: string | null;
  status_atendimento: string;
  origin_route?: string | null;
  service_slug?: string | null;
};
export type JourneyOs = { id: string; protocolo: string; created_at: string; status: string; lead_id: string | null; journey_id: string | null };

// A rajada é um sinal de automação, nunca prova de que a visita é um robô.
export function suspiciousJourneys(events: JourneyEvent[]) {
  const buckets = new Map<string, Set<string>>();
  const suspected = new Set<string>();
  for (const e of events) {
    if (!e.journey_id || !e.path || e.event_type !== "page_view") continue;
    const key = `${e.journey_id}:${Math.floor(Date.parse(e.created_at) / 60000)}`;
    const paths = buckets.get(key) ?? new Set<string>();
    paths.add(e.path); buckets.set(key, paths);
    if (paths.size >= 20) suspected.add(e.journey_id);
  }
  return suspected;
}

export function summarizeJourneys(events: JourneyEvent[], leads: JourneyLead[], orders: JourneyOs[], excludeSuspected = true) {
  const excludedIds=new Set(events.filter(e=>isQaEvent(e)||ehTrafegoInterno(e)).map(e=>e.journey_id).filter((id):id is string=>Boolean(id)));
  const commercial = events.filter(e => !isQaEvent(e) && !ehTrafegoInterno(e) && (!e.journey_id || !excludedIds.has(e.journey_id)));
  const suspected = suspiciousJourneys(commercial);
  const visits = new Map<string, { origin: string; symptom: string; city: string; neighborhood: string; first: string; last: string; wa: string | null; statusPage: string | null }>();
  const pages = new Map<string, Set<string>>();
  for (const e of [...commercial].sort((a,b) => a.created_at.localeCompare(b.created_at))) {
    if (!e.journey_id || (excludeSuspected && suspected.has(e.journey_id))) continue;
    if (e.event_type === "page_view" && e.path) {
      const ids = pages.get(e.path) ?? new Set<string>();
      ids.add(e.journey_id); pages.set(e.path, ids);
    }
    let v = visits.get(e.journey_id);
    if (!v) {
      // Só page_view fornece o denominador; cliques órfãos não inventam visitas.
      if (e.event_type !== "page_view") continue;
      v = { origin: e.attribution_channel || "unknown", symptom: "não identificado", city: "não identificada", neighborhood: "não identificado", first: e.created_at, last:e.created_at, wa: null, statusPage: null };
      visits.set(e.journey_id, v);
    }
    v.last=e.created_at;
    if (e.problema && e.problema !== "unknown") v.symptom = e.problema;
    if (e.cidade) v.city = e.cidade;
    if (e.neighborhood_slug) v.neighborhood = e.neighborhood_slug;
    if (e.event_type === "wa_click" && !v.wa) v.wa = e.created_at;
    if (e.path === "/status-da-ordem-de-servico" && !v.statusPage) v.statusPage = e.created_at;
  }
  const rows = leads.filter(l => l.equipamento === "descricao_ia" && !isQaEvent(l) && !ehTrafegoInterno(l) && (!l.journey_id || !excludedIds.has(l.journey_id)) && (!excludeSuspected || !l.journey_id || !suspected.has(l.journey_id))).map(l => {
    const visit = l.journey_id ? visits.get(l.journey_id) : undefined;
    const linked = orders.filter(o => o.lead_id === l.id && o.created_at >= l.created_at);
    return { ...l, origin: visit?.origin ?? "unknown", whatsappAt: visit?.wa && visit.wa >= l.created_at ? visit.wa : null, statusPageAt: visit?.statusPage && visit.statusPage >= l.created_at ? visit.statusPage : null, orders: linked };
  });
  const origins = new Map<string, { visits: number; descriptions: number; whatsapp: number; os: number }>();
  for (const [id,v] of visits) {
    const group = origins.get(v.origin) ?? { visits: 0, descriptions: 0, whatsapp: 0, os: 0 };
    const submitted = rows.filter(l => l.journey_id === id);
    group.visits++; if (v.wa) group.whatsapp++; if (submitted.length) group.descriptions++; if (submitted.some(l => l.orders.length)) group.os++;
    origins.set(v.origin, group);
  }
  return { visits: [...visits.values()], pages: [...pages].map(([path,ids]) => ({path, visits:ids.size})).sort((a,b)=>b.visits-a.visits), origins: [...origins.entries()], rows, suspected: suspected.size, converted: rows.filter(l => l.orders.length).length };
}

// Atividade observada, não presença online; não cria heartbeat nem identidade pessoal.
export function recentVisitGroups(visits:ReturnType<typeof summarizeJourneys>["visits"],now=Date.now()) {
  const groups=new Map<string,{visits:number;last:string;elapsedMs:number}>();
  for(const visit of visits) {
    const elapsedMs=now-Date.parse(visit.last);
    if(!Number.isFinite(elapsedMs) || elapsedMs<0 || elapsedMs>30*60000)continue;
    const key=[visit.symptom,visit.city,visit.neighborhood].join(" · ");
    const group=groups.get(key)??{visits:0,last:visit.last,elapsedMs};
    group.visits++;if(visit.last>group.last){group.last=visit.last;group.elapsedMs=elapsedMs;}groups.set(key,group);
  }
  return [...groups].map(([key,g])=>({key,...g})).sort((a,b)=>a.elapsedMs-b.elapsedMs);
}