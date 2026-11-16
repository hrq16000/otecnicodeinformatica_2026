import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, RefreshCw } from "lucide-react";
import { normalizarStatusOs, OS_STATUS_OPTIONS } from "@/lib/os/osStatus";
import { statusMilestone, summarizeOrders } from "@/lib/os/orderMetrics";
import type { Json } from "@/integrations/supabase/types";

interface OrdemRow {
  id: string;
  protocolo: string;
  status: string;
  modalidade: string | null;
  equipamento: string | null;
  cliente_nome: string | null;
  previsao_conclusao: string | null;
  observacoes_publicas: string | null;
  created_at: string;
  sintomas: string | null;
  city: string | null;
  neighborhood_slug: string | null;
  marca_modelo: string | null;
  etapas: Json;
}

const CAMPOS =
  "id, protocolo, status, modalidade, equipamento, cliente_nome, previsao_conclusao, observacoes_publicas, created_at, sintomas, city, neighborhood_slug, marca_modelo, etapas";
const duration=(ms:number|null)=>ms===null?"Sem registro":`${(ms/3600000).toLocaleString("pt-BR",{maximumFractionDigits:1})} h`;

/**
 * Painel de ordens de serviço: busca por código único, filtros por modalidade
 * e status, e atualização de etapa/prazo/observação pública.
 * A observação pública é o único texto que o cliente vê na consulta.
 */
export const OrdensServicoPanel = () => {
  const [ordens, setOrdens] = useState<OrdemRow[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [codigo, setCodigo] = useState("");
  const [modalidade, setModalidade] = useState("todas");
  const [status, setStatus] = useState("todos");
  const [salvando, setSalvando] = useState<string | null>(null);
  const [dias,setDias] = useState(30);
  const [erro,setErro] = useState<string|null>(null);
  const metricas=useMemo(()=>summarizeOrders(ordens,dias),[ordens,dias]);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    const all:OrdemRow[]=[];
    for(let offset=0;;offset+=500) {
      const {data,error}=await supabase.from("ordens_servico").select(CAMPOS).order("created_at",{ascending:false}).order("id").range(offset,offset+499);
      if(error){setErro(error.message);break;}
      all.push(...((data ?? []) as OrdemRow[]));
      if((data?.length??0)<500)break;
    }
    setOrdens(all);
    setCarregando(false);
  }, []);

  useEffect(() => {
    void carregar();
    const timer=window.setInterval(()=>{if(document.visibilityState==="visible")void carregar();},30000);
    return()=>window.clearInterval(timer);
  }, [carregar]);

  const modalidades = useMemo(
    () => Array.from(new Set(ordens.map((o) => o.modalidade).filter(Boolean) as string[])).sort(),
    [ordens],
  );

  const filtradas = useMemo(() => {
    const busca = codigo.trim().toUpperCase();
    return ordens.filter((o) => {
      if (busca && !o.protocolo.toUpperCase().includes(busca)) return false;
      if (modalidade !== "todas" && o.modalidade !== modalidade) return false;
      if (status !== "todos" && normalizarStatusOs(o.status).id !== status) return false;
      return true;
    });
  }, [ordens, codigo, modalidade, status]);

  const atualizar = async (id: string, patch: Partial<OrdemRow>) => {
    const anterior=ordens.find(o=>o.id===id);
    if(!anterior || salvando) return;
    const metric=patch.status ? statusMilestone(anterior.status,patch.status) : null;
    const at=new Date().toISOString();
    const etapas=Array.isArray(anterior.etapas)?anterior.etapas:[];
    const updated=patch.status && patch.status!==anterior.status ? {...patch,etapas:[...etapas,{status:patch.status,at,...(metric?{metric}:{})}]}:patch;
    setSalvando(id);
    const { error, data } = await supabase
      .from("ordens_servico")
      .update({ ...updated, updated_at: at })
      .eq("id", id).eq("status",anterior.status).select("id").maybeSingle();
    setSalvando(null);
    if (error || !data) {
      toast.error(`Falha ao atualizar: ${error?.message ?? "Ordem alterada por outra pessoa; atualize a lista"}`);
      return;
    }
    setOrdens((prev) => prev.map((o) => (o.id === id ? { ...o, ...updated } : o)));
    if(metric) window.__lovableEvents?.track?.("project.order_service_progressed",{stage:metric});
    toast.success("Ordem atualizada.");
  };

  return (
    <div className="space-y-4" data-testid="admin-ordens-servico">
      <section className="border-b border-border pb-5 [&_th]:pr-4 [&_td]:pr-4">
        <h2 className="text-lg font-semibold">Ordens por sintoma, cidade e bairro</h2>
        <Select value={String(dias)} onValueChange={v=>setDias(Number(v))}><SelectTrigger aria-label="Período das ordens" className="my-3 w-40"><SelectValue /></SelectTrigger><SelectContent>{[7,30,90].map(n=><SelectItem key={n} value={String(n)}>{n} dias</SelectItem>)}</SelectContent></Select>
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left"><th>Sintoma · cidade · bairro</th><th>Criadas</th></tr></thead><tbody>{metricas.groups.map(([key,n])=><tr key={key}><td className="py-2">{key}</td><td>{n}</td></tr>)}</tbody></table></div>
        <h2 className="mt-5 text-lg font-semibold">Atendimentos por semana</h2>
        <p className="text-sm text-muted-foreground">Semanas de São Paulo. Início e conclusão são separados; histórico anterior sem transição registrada não é presumido.</p>
        <table className="mt-3 w-full text-sm"><thead><tr className="text-left"><th>Semana de</th><th>Iniciados</th><th>Concluídos</th></tr></thead><tbody>{metricas.weeks.map(([week,n])=><tr key={week}><td className="py-2">{week}</td><td>{n.started}</td><td>{n.completed}</td></tr>)}</tbody></table>
        {!metricas.weeks.length && <p className="py-3 text-muted-foreground">Sem transições registradas no período.</p>}
        <h2 className="mt-5 text-lg font-semibold">Fechamento por dia</h2>
        <table className="mt-3 w-full text-sm"><thead><tr className="text-left"><th>Dia · São Paulo</th><th>Criadas</th><th>Concluídas</th></tr></thead><tbody>{metricas.daily.map(([day,n])=><tr key={day}><td className="py-2">{day}</td><td>{n.created}</td><td>{n.completed}</td></tr>)}</tbody></table>
        <h2 className="mt-5 text-lg font-semibold">Tempo médio por sintoma e bairro</h2>
        <p className="text-sm text-muted-foreground">Resposta operacional: criação da OS até o primeiro início registrado. Conclusão: criação até serviço pronto. Não mede mensagens no WhatsApp. Amostra por transições no período.</p>
        <div className="overflow-x-auto"><table className="mt-3 w-full text-sm"><thead><tr className="text-left"><th>Sintoma · bairro</th><th>Primeira resposta</th><th>OS medidas</th><th>Conclusão</th><th>OS medidas</th></tr></thead><tbody>{metricas.durations.map(d=><tr key={d.key}><td className="py-2">{d.key}</td><td>{duration(d.responseMs)}</td><td>{d.responseCount}</td><td>{duration(d.completionMs)}</td><td>{d.completionCount}</td></tr>)}</tbody></table></div>
        {!metricas.durations.length && <p className="py-3 text-muted-foreground">Sem tempos registrados no período.</p>}
      </section>
      {erro && <p role="alert" className="text-destructive">Leitura incompleta: {erro}</p>}
      {carregando && <p role="status">Carregando ordens…</p>}
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto] sm:items-end">
        <div className="grid gap-1.5">
          <Label htmlFor="filtro-codigo">Código único</Label>
          <Input
            id="filtro-codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="OS-OTI-…"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="filtro-modalidade">Modalidade</Label>
          <Select value={modalidade} onValueChange={setModalidade}>
            <SelectTrigger id="filtro-modalidade" className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              {modalidades.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="filtro-status">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="filtro-status" className="w-52">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              {OS_STATUS_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={() => void carregar()} disabled={carregando}>
          {carregando ? (
            <Loader2 className="mr-1.5 h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <RefreshCw className="mr-1.5 h-4 w-4" aria-hidden="true" />
          )}
          Atualizar
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        {filtradas.length} ordem(ns) no filtro atual · {ordens.length} carregada(s).
      </p>

      <div className="space-y-3">
        {filtradas.map((os) => {
          const atual = normalizarStatusOs(os.status);
          return (
            <Card key={os.id} className="p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-mono text-sm font-semibold">{os.protocolo}</h3>
                <span className="text-xs text-muted-foreground">
                  Criada em {new Date(os.created_at).toLocaleString("pt-BR",{timeZone:"America/Sao_Paulo",dateStyle:"short",timeStyle:"short"})} · {atual.label}
                  {os.modalidade ? ` · ${os.modalidade}` : ""}
                  {os.equipamento ? ` · ${os.equipamento}` : ""}
                </span>
              </div>

              <p className="mt-3 text-sm">{os.cliente_nome || "Cliente não informado"} · {os.marca_modelo || "Modelo não informado"}</p>
              <p className="text-sm">{os.sintomas || "Sintoma não informado"} · {os.city || "Cidade não informada"} · {os.neighborhood_slug || "Bairro não informado"}</p>

              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <div className="grid gap-1.5">
                  <Label htmlFor={`status-${os.id}`}>Etapa</Label>
                  <Select
                    disabled={salvando!==null}
                    value={atual.id}
                    onValueChange={(v) => void atualizar(os.id, { status: v })}
                  >
                    <SelectTrigger id={`status-${os.id}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {OS_STATUS_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor={`prazo-${os.id}`}>Previsão de conclusão</Label>
                  <Input
                    id={`prazo-${os.id}`}
                    type="date"
                    defaultValue={os.previsao_conclusao?.slice(0, 10) ?? ""}
                    onBlur={(e) =>
                      void atualizar(os.id, {
                        previsao_conclusao: e.target.value
                          ? new Date(`${e.target.value}T12:00:00`).toISOString()
                          : null,
                      })
                    }
                  />
                </div>
                <div className="grid gap-1.5 md:col-span-1">
                  <Label htmlFor={`obs-${os.id}`}>Observação pública</Label>
                  <Textarea
                    id={`obs-${os.id}`}
                    rows={2}
                    defaultValue={os.observacoes_publicas ?? ""}
                    onBlur={(e) => void atualizar(os.id, { observacoes_publicas: e.target.value })}
                  />
                </div>
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                O cliente vê: <strong>{atual.label}</strong> — {atual.proximoPasso}
                {salvando === os.id ? " · salvando…" : ""}
              </p>
            </Card>
          );
        })}
        {!carregando && filtradas.length === 0 ? (
          <p className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
            Nenhuma ordem encontrada com esses filtros.
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default OrdensServicoPanel;
