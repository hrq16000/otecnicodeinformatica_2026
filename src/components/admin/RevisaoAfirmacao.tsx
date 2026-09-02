import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * REVISÃO EDITORIAL DE UMA AFIRMAÇÃO — persistida em `trust_claim_reviews`.
 *
 * A classificação continua no ledger (`config/trust-claims-ledger.json`).
 * Aqui registramos apenas o acompanhamento humano: status de revisão,
 * observação e evidência, com autor e data — nada de conteúdo é removido
 * automaticamente.
 */

export type StatusRevisao = "pendente" | "em_revisao" | "revisado" | "aceito" | "remover";

export const STATUS_REVISAO: StatusRevisao[] = ["pendente", "em_revisao", "revisado", "aceito", "remover"];

export interface RevisaoRegistro {
  claim_key: string;
  status_revisao: StatusRevisao;
  observacao: string | null;
  evidencia: string | null;
  revisado_em: string | null;
}

export function tomRevisao(status: StatusRevisao): "default" | "secondary" | "outline" | "destructive" {
  if (status === "aceito" || status === "revisado") return "default";
  if (status === "em_revisao") return "outline";
  if (status === "remover") return "destructive";
  return "secondary";
}

interface Props {
  claimKey: string;
  arquivo: string;
  linha: number;
  familia: string;
  classificacao: string;
  registro?: RevisaoRegistro;
  onSalvo: (registro: RevisaoRegistro) => void;
}

export function RevisaoAfirmacao({ claimKey, arquivo, linha, familia, classificacao, registro, onSalvo }: Props) {
  const [aberto, setAberto] = useState(false);
  const [status, setStatus] = useState<StatusRevisao>(registro?.status_revisao ?? "pendente");
  const [observacao, setObservacao] = useState(registro?.observacao ?? "");
  const [evidencia, setEvidencia] = useState(registro?.evidencia ?? "");
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    setSalvando(true);
    const { data: sessao } = await supabase.auth.getUser();
    const payload = {
      claim_key: claimKey,
      arquivo,
      linha,
      familia,
      classificacao,
      status_revisao: status,
      observacao: observacao.trim() || null,
      evidencia: evidencia.trim() || null,
      revisado_por: sessao.user?.id ?? null,
      revisado_em: new Date().toISOString(),
    };
    const { error } = await supabase.from("trust_claim_reviews").upsert(payload, { onConflict: "claim_key" });
    setSalvando(false);
    if (error) {
      toast.error(`Não foi possível salvar a revisão: ${error.message}`);
      return;
    }
    toast.success("Revisão registrada.");
    onSalvo({
      claim_key: claimKey,
      status_revisao: status,
      observacao: payload.observacao,
      evidencia: payload.evidencia,
      revisado_em: payload.revisado_em,
    });
    setAberto(false);
  }

  const atual = registro?.status_revisao ?? "pendente";

  return (
    <div className="mt-3 border-t pt-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={tomRevisao(atual)}>revisão: {atual}</Badge>
        {registro?.revisado_em && (
          <span className="text-xs text-muted-foreground">
            em {new Date(registro.revisado_em).toLocaleDateString("pt-BR")}
          </span>
        )}
        <Button size="sm" variant="ghost" onClick={() => setAberto((v) => !v)}>
          {aberto ? "Fechar" : "Marcar revisão"}
        </Button>
      </div>
      {registro?.observacao && !aberto && (
        <p className="mt-1 text-xs text-muted-foreground">
          <strong>Observação:</strong> {registro.observacao}
        </p>
      )}
      {aberto && (
        <div className="mt-3 space-y-2">
          <div className="flex flex-wrap gap-1">
            {STATUS_REVISAO.map((s) => (
              <Button key={s} size="sm" variant={status === s ? "default" : "outline"} onClick={() => setStatus(s)}>
                {s}
              </Button>
            ))}
          </div>
          <Textarea
            aria-label="Observação editorial"
            placeholder="Observação editorial (o que precisa mudar, condição a explicitar…)"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            rows={2}
          />
          <Input
            aria-label="Evidência"
            placeholder="Evidência (link, arquivo, orçamento, documento do fabricante…)"
            value={evidencia}
            onChange={(e) => setEvidencia(e.target.value)}
          />
          <Button size="sm" onClick={salvar} disabled={salvando}>
            {salvando ? "Salvando…" : "Salvar revisão"}
          </Button>
        </div>
      )}
    </div>
  );
}
