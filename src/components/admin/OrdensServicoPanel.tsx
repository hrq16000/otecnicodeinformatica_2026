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
}

const CAMPOS =
  "id, protocolo, status, modalidade, equipamento, cliente_nome, previsao_conclusao, observacoes_publicas, created_at";

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

  const carregar = useCallback(async () => {
    setCarregando(true);
    const { data, error } = await supabase
      .from("ordens_servico")
      .select(CAMPOS)
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) toast.error(`Não foi possível carregar as ordens: ${error.message}`);
    setOrdens((data as OrdemRow[]) ?? []);
    setCarregando(false);
  }, []);

  useEffect(() => {
    void carregar();
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
    setSalvando(id);
    const { error } = await supabase
      .from("ordens_servico")
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq("id", id);
    setSalvando(null);
    if (error) {
      toast.error(`Falha ao atualizar: ${error.message}`);
      return;
    }
    setOrdens((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));
    toast.success("Ordem atualizada.");
  };

  return (
    <div className="space-y-4" data-testid="admin-ordens-servico">
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
                  Aberta em {new Date(os.created_at).toLocaleDateString("pt-BR")}
                  {os.modalidade ? ` · ${os.modalidade}` : ""}
                  {os.equipamento ? ` · ${os.equipamento}` : ""}
                </span>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <div className="grid gap-1.5">
                  <Label htmlFor={`status-${os.id}`}>Etapa</Label>
                  <Select
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
