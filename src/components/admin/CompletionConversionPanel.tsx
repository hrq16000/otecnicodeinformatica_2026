import { useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { completionConversion, type JourneyLead, type JourneyOs, type summarizeJourneys } from "@/lib/seoJourney";

export function CompletionConversionPanel({ result, leads, orders, limited }: { result: ReturnType<typeof summarizeJourneys>; leads: JourneyLead[]; orders: JourneyOs[]; limited: boolean }) {
  const [dimension, setDimension] = useState<"symptom" | "city" | "neighborhood">("symptom");
  const rows = useMemo(() => completionConversion(result, leads, orders, dimension, limited), [result, leads, orders, dimension, limited]);
  return <section className="mt-6 min-w-0" aria-labelledby="completion-conversion-title">
    <div className="flex flex-wrap items-center justify-between gap-3"><h3 id="completion-conversion-title" className="font-semibold">Conversão de visita até OS concluída</h3>
      <Select value={dimension} onValueChange={v => { if (v === "symptom" || v === "city" || v === "neighborhood") setDimension(v); }}><SelectTrigger aria-label="Agrupar conversão até conclusão" className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="symptom">Sintoma</SelectItem><SelectItem value="city">Cidade</SelectItem><SelectItem value="neighborhood">Bairro</SelectItem></SelectContent></Select>
    </div>
    <p className="mt-2 text-sm text-muted-foreground">Visitas do período selecionado com conclusão registrada até a última atualização. Cada visita conta uma vez; só OS vinculada ao chamado confirmado conta.</p>
    <div className="mt-3 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left"><th className="py-2">Grupo</th><th>Visitas</th><th>Com OS</th><th>Com OS concluída</th><th>Conversão</th></tr></thead><tbody>{rows.map(r => <tr key={r.label} className="border-t border-border"><td className="py-3">{r.label}</td><td>{r.visits}</td><td>{r.withOrder}</td><td>{r.completed}</td><td className="whitespace-nowrap">{r.rate === null ? "—" : `${r.rate.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`}</td></tr>)}</tbody></table>{!rows.length && <p className="py-4 text-muted-foreground">Sem visitas elegíveis neste período.</p>}</div>
    <p className="mt-2 text-xs text-muted-foreground">Taxa = visitas com OS concluída ÷ visitas do grupo. Taxas não são exibidas em amostras parciais ou grupos com menos de 5 visitas. Status sem data de conclusão não comprova atendimento concluído; testes identificados são excluídos.</p>
  </section>;
}