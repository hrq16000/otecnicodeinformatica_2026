import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { descricaoDe, prioridadeDe, type Prioridade } from "@/lib/funnelPrioridade";

type Linha = {
  id: string;
  created_at: string;
  sintoma: string | null;
  neighborhood_slug: string | null;
  city: string | null;
  status_atendimento: string;
  wa_message: string | null;
};

const ORDEM: Prioridade[] = ["alta", "media", "baixa", "sem prioridade"];
const ROTULO: Record<Prioridade, string> = {
  alta: "Alta — responder primeiro",
  media: "Média",
  baixa: "Baixa",
  "sem prioridade": "Sem prioridade (triagem comum)",
};
const ABERTOS = ["novo", "contatado", "agendado"];

/** Próxima ação real conforme status e idade do chamado. */
function sugestao(l: Linha): string {
  const horas = (Date.now() - new Date(l.created_at).getTime()) / 36e5;
  if (l.status_atendimento === "novo")
    return horas > 24
      ? "Responder já na conversa do WhatsApp — passou de 24 h sem contato."
      : "Responder na conversa do WhatsApp e marcar como contatado.";
  if (l.status_atendimento === "contatado") return "Combinar a modalidade e marcar como agendado.";
  return "Após o atendimento, marcar como fechado.";
}

/**
 * CHAMADOS POR PRIORIDADE — agrupa as solicitações abertas pela prioridade
 * estimada e sugere a próxima ação. O telefone do cliente não é gravado no
 * site: o contato acontece na conversa que ele próprio abriu no WhatsApp.
 */
export default function FunnelPrioridades({ dias = 30 }: { dias?: number }) {
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const desde = new Date(Date.now() - dias * 864e5).toISOString();
    void supabase
      .from("funnel_submissions")
      .select("id, created_at, sintoma, neighborhood_slug, city, status_atendimento, wa_message")
      .gte("created_at", desde)
      .in("status_atendimento", ABERTOS)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        setLinhas((data ?? []) as Linha[]);
        setCarregando(false);
      });
  }, [dias]);

  const marcar = async (id: string, status: string) => {
    const campos: { status_atendimento: string; atendido_em?: string } = { status_atendimento: status };
    if (status === "fechado") campos.atendido_em = new Date().toISOString();
    const { error } = await supabase.from("funnel_submissions").update(campos).eq("id", id);
    if (error) {
      toast({ title: "Não foi possível salvar", description: error.message, variant: "destructive" });
      return;
    }
    setLinhas((prev) =>
      ABERTOS.includes(status)
        ? prev.map((l) => (l.id === id ? { ...l, status_atendimento: status } : l))
        : prev.filter((l) => l.id !== id),
    );
    toast({ title: "Atualizado" });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Chamados abertos por prioridade ({dias} dias)</CardTitle>
      </CardHeader>
      <CardContent>
        {carregando ? (
          <p className="text-sm text-muted-foreground">Carregando…</p>
        ) : linhas.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum chamado aberto no período.</p>
        ) : (
          <div className="space-y-5">
            {ORDEM.map((p) => {
              const itens = linhas.filter((l) => prioridadeDe(l.wa_message) === p);
              if (!itens.length) return null;
              return (
                <div key={p}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-medium">{ROTULO[p]}</span>
                    <Badge variant={p === "alta" ? "destructive" : "secondary"}>{itens.length}</Badge>
                  </div>
                  <div className="space-y-2">
                    {itens.map((l) => {
                      const desc = descricaoDe(l.wa_message);
                      return (
                        <div key={l.id} className="rounded-md border p-3 text-sm">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span>{new Date(l.created_at).toLocaleString("pt-BR")}</span>
                            <span>· {l.neighborhood_slug || l.city || "sem bairro"}</span>
                            <Badge variant="outline">{l.status_atendimento}</Badge>
                          </div>
                          <p className="mt-1 font-medium">{l.sintoma || "—"}</p>
                          {desc && <p className="mt-1 text-muted-foreground">“{desc}”</p>}
                          <p className="mt-2 text-xs">
                            <strong>Próxima ação:</strong> {sugestao(l)}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {l.status_atendimento === "novo" && (
                              <Button size="sm" variant="outline" onClick={() => void marcar(l.id, "contatado")}>
                                Marcar contatado
                              </Button>
                            )}
                            {l.status_atendimento !== "agendado" && (
                              <Button size="sm" variant="outline" onClick={() => void marcar(l.id, "agendado")}>
                                Marcar agendado
                              </Button>
                            )}
                            <Button size="sm" onClick={() => void marcar(l.id, "fechado")}>
                              Marcar atendida
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
