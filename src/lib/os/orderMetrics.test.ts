import {describe,it,expect} from "vitest";
import {statusMilestone,summarizeOrders} from "./orderMetrics";
describe("métricas OS",()=>{
  it("mede início de aberta para em andamento, sem contar criação como atendimento",()=>{
    expect(statusMilestone("aberta","em_andamento")).toBe("started");
    expect(statusMilestone("recebida","recebida")).toBeNull();
  });
  it("mede conclusão uma vez, não entrega depois de pronta",()=>{
    expect(statusMilestone("em_reparo","pronta")).toBe("completed");
    expect(statusMilestone("pronta","entregue")).toBeNull();
  });
  it("filtra criações em 7 dias e conta conclusão por semana de São Paulo sem duplicar a OS",()=>{
    const r={created_at:"2026-11-10T12:00:00Z",status:"pronta",sintomas:"wifi",city:"Curitiba",neighborhood_slug:"Batel",etapas:[{metric:"completed",at:"2026-11-16T02:00:00Z"},{metric:"completed",at:"2026-11-16T03:00:00Z"}]};
    const out=summarizeOrders([r,{...r,created_at:"2026-10-01T12:00:00Z",etapas:[]}],7,Date.parse("2026-11-16T12:00:00Z"));
    expect(out.groups).toEqual([["wifi · Curitiba · Batel",1]]);
    expect(out.weeks).toEqual([["2026-11-09",{started:0,completed:1}]]);
  });
  it("mede primeira resposta, conclusão e fechamento por dia sem duplicar transições",()=>{
    const out=summarizeOrders([{created_at:"2026-11-15T12:00:00Z",status:"pronta",sintomas:"tela",city:"Curitiba",neighborhood_slug:"Batel",etapas:[{metric:"started",at:"2026-11-15T14:00:00Z"},{metric:"started",at:"2026-11-15T15:00:00Z"},{metric:"completed",at:"2026-11-16T02:00:00Z"}]}],7,Date.parse("2026-11-16T12:00:00Z"));
    expect(out.durations[0]).toEqual({key:"tela · Batel",responseMs:7200000,completionMs:50400000,responseCount:1,completionCount:1});
    expect(out.daily).toEqual([["2026-11-15",{created:1,completed:1}]]);
  });
  it("não presume resposta sem histórico nem inclui data futura ou inválida",()=>{
    const out=summarizeOrders([{created_at:"2026-11-15T12:00:00Z",status:"pronta",sintomas:null,city:null,neighborhood_slug:null,etapas:[{metric:"completed",at:"invalid"},{metric:"started",at:"2026-11-18T12:00:00Z"}]}],7,Date.parse("2026-11-16T12:00:00Z"));
    expect(out.durations).toEqual([]);expect(out.weeks).toEqual([]);
  });
});