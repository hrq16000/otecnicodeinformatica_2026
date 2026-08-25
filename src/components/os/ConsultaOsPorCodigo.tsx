import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { consultarOsPorProtocolo } from "@/lib/os/os.functions";
import { findOsRecord, isValidOsNumero, normalizeOsNumero } from "@/lib/osRegistry";
import { linhaDoTempoOs, normalizarStatusOs, type OsStatusInfo } from "@/lib/os/osStatus";

type Resultado =
  | { tipo: "formato" }
  | { tipo: "indisponivel" }
  | { tipo: "nao-encontrada" }
  | {
      tipo: "ok";
      protocolo: string;
      status: OsStatusInfo;
      origem: "servidor" | "local";
      modalidade?: string | null;
      equipamento?: string | null;
      previsao?: string | null;
      observacoes?: string | null;
      criadaEm?: string | null;
    };

const dataBr = (v?: string | null) => (v ? new Date(v).toLocaleDateString("pt-BR") : null);

/**
 * Consulta objetiva por código único: estado atual, prazo estimado da etapa
 * e próximo passo. Sem dados pessoais na resposta.
 */
export const ConsultaOsPorCodigo = ({ autoFocus = false }: { autoFocus?: boolean }) => {
  const consultar = useServerFn(consultarOsPorProtocolo);
  const [codigo, setCodigo] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const buscar = async () => {
    const alvo = normalizeOsNumero(codigo);
    if (!isValidOsNumero(alvo)) {
      setResultado({ tipo: "formato" });
      return;
    }
    setCarregando(true);
    try {
      const r = await consultar({ data: { protocolo: alvo } });
      if (r.encontrada) {
        setResultado({
          tipo: "ok",
          origem: "servidor",
          protocolo: r.os.protocolo,
          status: normalizarStatusOs(r.os.status),
          modalidade: r.os.modalidade,
          equipamento: r.os.equipamento,
          previsao: r.os.previsaoConclusao,
          observacoes: r.os.observacoesPublicas,
          criadaEm: r.os.criadaEm,
        });
        return;
      }
      if (r.motivo === "indisponivel") {
        setResultado({ tipo: "indisponivel" });
        return;
      }
      // Fallback: OS aberta neste navegador e ainda não registrada na operação.
      const local = findOsRecord(alvo);
      setResultado(
        local
          ? {
              tipo: "ok",
              origem: "local",
              protocolo: local.protocolo,
              status: normalizarStatusOs("recebida"),
              modalidade: local.modalidade ?? null,
              equipamento: local.servico,
              criadaEm: new Date(local.criadoEm).toISOString(),
            }
          : { tipo: "nao-encontrada" },
      );
    } catch {
      setResultado({ tipo: "indisponivel" });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="space-y-5" data-testid="consulta-os-codigo">
      <div className="grid gap-2">
        <Label htmlFor="os-codigo-consulta">Código único da O.S</Label>
        <div className="flex flex-wrap gap-3">
          <Input
            id="os-codigo-consulta"
            value={codigo}
            autoFocus={autoFocus}
            onChange={(e) => setCodigo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void buscar();
            }}
            placeholder="OS-OTI-20260825-1234"
            className="max-w-xs"
          />
          <Button onClick={() => void buscar()} disabled={carregando}>
            {carregando ? "Consultando…" : "Consultar"}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          O código aparece no resumo gerado na abertura da OS e no atendimento.
        </p>
      </div>

      {resultado?.tipo === "formato" ? (
        <p className="rounded-lg border border-border bg-card p-4 text-sm" role="status">
          Código fora do formato esperado (OS-OTI-AAAAMMDD-0000). Confira e tente de novo.
        </p>
      ) : null}
      {resultado?.tipo === "indisponivel" ? (
        <p className="rounded-lg border border-border bg-card p-4 text-sm" role="status">
          A consulta está indisponível agora. Tente novamente em alguns minutos ou confirme a etapa
          pelo atendimento no WhatsApp.
        </p>
      ) : null}
      {resultado?.tipo === "nao-encontrada" ? (
        <p className="rounded-lg border border-border bg-card p-4 text-sm" role="status">
          Não encontramos esse código. Confira os dígitos ou confirme pelo atendimento no WhatsApp.
        </p>
      ) : null}

      {resultado?.tipo === "ok" ? (
        <article
          className="rounded-xl border border-border bg-card p-5"
          data-testid="os-status-resultado"
          data-status={resultado.status.id}
        >
          <header className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-heading text-lg font-semibold text-foreground">
              {resultado.protocolo}
            </h3>
            <span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-medium text-accent">
              {resultado.status.label}
            </span>
          </header>

          <p className="mt-3 text-sm text-foreground/80">{resultado.status.descricao}</p>

          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">Próximo passo</dt>
              <dd className="text-sm text-foreground">{resultado.status.proximoPasso}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">Prazo estimado</dt>
              <dd className="text-sm text-foreground">
                {dataBr(resultado.previsao) ?? resultado.status.prazoEstimado}
              </dd>
            </div>
            {resultado.modalidade ? (
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Modalidade</dt>
                <dd className="text-sm text-foreground">{resultado.modalidade}</dd>
              </div>
            ) : null}
            {resultado.equipamento ? (
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Equipamento</dt>
                <dd className="text-sm text-foreground">{resultado.equipamento}</dd>
              </div>
            ) : null}
          </dl>

          {resultado.observacoes ? (
            <p className="mt-4 rounded-lg border border-border bg-background/60 p-3 text-sm text-foreground/80">
              {resultado.observacoes}
            </p>
          ) : null}

          <ol className="mt-5 space-y-2">
            {linhaDoTempoOs(resultado.status).map((etapa) => (
              <li key={etapa.id} className="flex items-start gap-3 text-sm">
                <span
                  aria-hidden="true"
                  className={
                    etapa.estado === "concluida"
                      ? "mt-1 h-2.5 w-2.5 rounded-full bg-accent"
                      : etapa.estado === "atual"
                        ? "mt-1 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-accent/25"
                        : "mt-1 h-2.5 w-2.5 rounded-full bg-border"
                  }
                />
                <span
                  className={
                    etapa.estado === "futura" ? "text-muted-foreground" : "text-foreground"
                  }
                >
                  <strong className="font-medium">{etapa.label}</strong> — {etapa.prazoEstimado}
                </span>
              </li>
            ))}
          </ol>

          {resultado.origem === "local" ? (
            <p className="mt-4 text-xs text-muted-foreground">
              Registro encontrado neste navegador. A operação confirma a etapa oficial pelo
              atendimento assim que a OS entra na fila.
            </p>
          ) : null}
        </article>
      ) : null}
    </div>
  );
};

export default ConsultaOsPorCodigo;
