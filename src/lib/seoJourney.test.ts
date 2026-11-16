import { describe, expect, it } from "vitest";
import { summarizeJourneys, suspiciousJourneys, type JourneyEvent, type JourneyLead } from "./seoJourney";
const event = (patch: Partial<JourneyEvent> = {}): JourneyEvent => ({ created_at: "2026-11-16T12:00:00Z", journey_id: "j1", event_type: "page_view", path: "/", problema: null, cidade: null, neighborhood_slug: null, attribution_channel: "seo", ...patch });
const lead: JourneyLead = { id: "l1", created_at: "2026-11-16T12:01:00Z", journey_id: "j1", equipamento: "descricao_ia", sintoma: "tela", city: null, neighborhood_slug: null, status_atendimento: "novo" };
describe("jornada até a OS", () => {
  it("conta visitas sem clique e exclui QA", () => expect(summarizeJourneys([event(), event({journey_id: "qa1", utm_source: "qa"})], [], []).visits).toHaveLength(1));
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
});