import { describe, expect, it } from "vitest";
import { recentVisitGroups, summarizeJourneys, suspiciousJourneys, type JourneyEvent, type JourneyLead } from "./seoJourney";
const event = (patch: Partial<JourneyEvent> = {}): JourneyEvent => ({ created_at: "2026-11-16T12:00:00Z", journey_id: "j1", event_type: "page_view", path: "/", problema: null, cidade: null, neighborhood_slug: null, attribution_channel: "seo", ...patch });
const lead: JourneyLead = { id: "l1", created_at: "2026-11-16T12:01:00Z", journey_id: "j1", equipamento: "descricao_ia", sintoma: "tela", city: null, neighborhood_slug: null, status_atendimento: "novo" };
describe("jornada até a OS", () => {
  it("preserva origem Google na entrada e ordena páginas e cliques até o sintoma", () => {
    const result = summarizeJourneys([
      event({created_at:"2026-11-16T12:02:00Z",path:"/problemas/computador-lento",attribution_channel:"direto"}),
      event({utm_source:"google",utm_medium:"organic"}),
      event({created_at:"2026-11-16T12:03:00Z",path:"/problemas/computador-lento",event_type:"wa_click",cta_location:"sintoma"}),
    ], [], []);
    expect(result.visits[0]?.origin).toBe("google");
    expect(result.visits[0]?.steps.map(s=>[s.type,s.path])).toEqual([["page_view","/"],["page_view","/problemas/computador-lento"],["wa_click","/problemas/computador-lento"]]);
  });
  it("não inventa Google em busca sem fonte nem direto em origem ausente", () => {
    expect(summarizeJourneys([event()],[],[]).visits[0]?.origin).toBe("seo");
    expect(summarizeJourneys([event({attribution_channel:null})],[],[]).visits[0]?.origin).toBe("unknown");
  });
  it("preserva redes sociais e direto sem misturar jornadas", () => {
    const result=summarizeJourneys([event({attribution_channel:"social"}),event({journey_id:"j2",attribution_channel:"direto"})],[],[]);
    expect(result.visits.map(v=>v.origin)).toEqual(["social","direto"]);
  });
  it("deduplica o mesmo evento, mantém cliques distintos e remove parâmetros das páginas", () => {
    const click=event({event_type:"wa_click",event_id:"click1",path:"/problemas/computador-lento?nome=privado#contato"});
    const result=summarizeJourneys([event(),click,click,{...click,event_id:"click2"}],[],[]);
    expect(result.visits[0]?.steps).toHaveLength(3);
    expect(result.visits[0]?.steps[1]?.path).toBe("/problemas/computador-lento");
  });
  it("conta uma visita por página sem duplicar reloads e exclui testes QA", () => {
    const result = summarizeJourneys([event({path:"/bairros/batel"}),event({path:"/bairros/batel"}),event({path:"/bairros/centro"}),event({path:"/bairros/batel",journey_id:"test",utm_source:"qa"})], [], []);
    expect(result.pages).toEqual([{path:"/bairros/batel",visits:1},{path:"/bairros/centro",visits:1}]);
  });
  it("conta visitas sem clique e exclui QA", () => expect(summarizeJourneys([event(), event({journey_id: "qa1", utm_source: "qa"})], [], []).visits).toHaveLength(1));
  it("exclui toda a jornada marcada como teste mesmo após navegação sem UTM",()=>{
    expect(summarizeJourneys([event({utm_source:"playwright",path:"/bairros/batel"}),event({path:"/bairros/centro",event_type:"wa_click"}),event({path:"/bairros/centro"})],[lead],[]).visits).toHaveLength(0);
    expect(summarizeJourneys([event({utm_source:"qa"})],[lead],[]).rows).toHaveLength(0);
  });
  it("não conta WhatsApp anterior à descrição como passo posterior", () => expect(summarizeJourneys([event(),event({event_type: "wa_click"})], [lead], []).rows[0]?.whatsappAt).toBeNull());
  it("só converte a descrição com vínculo explícito de OS e data posterior", () => {
    const os = {id:"o1",protocolo:"OS-TEST",status:"nova",created_at:"2026-11-16T12:02:00Z",journey_id:"j1",lead_id:null};
    expect(summarizeJourneys([event()], [lead], [os]).converted).toBe(0);
    expect(summarizeJourneys([event()], [lead], [{...os,lead_id:"l1"}]).converted).toBe(1);
  });
  it("sinaliza 20 rotas distintas no minuto, mas não 19", () => {
    const events = Array.from({length:20}, (_,i)=> event({path:`/bairros/b${i}`}));
    expect(suspiciousJourneys(events.slice(0,19)).size).toBe(0);
    expect(suspiciousJourneys(events).has("j1")).toBe(true);
  });
  it("atividade recente usa último acesso em 30 minutos e não inclui QA de Batel/Centro",()=>{
    const result=summarizeJourneys([event({created_at:"2026-11-16T11:00:00Z"}),event({created_at:"2026-11-16T12:00:00Z",cidade:"Curitiba",neighborhood_slug:"Batel",problema:"tela"}),event({journey_id:"qa",path:"/bairros/centro",utm_source:"qa"}),event({journey_id:"old",created_at:"2026-11-16T11:00:00Z"})],[],[]);
    expect(recentVisitGroups(result.visits,Date.parse("2026-11-16T12:10:00Z"))).toEqual([{key:"tela · Curitiba · Batel",visits:1,last:"2026-11-16T12:00:00Z",elapsedMs:600000}]);
  });
});