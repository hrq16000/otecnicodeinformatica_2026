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
});