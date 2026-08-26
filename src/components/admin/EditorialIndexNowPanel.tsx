import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { exportarCsv, exportarJson } from "@/lib/exportarRelatorio";

/**
 * ABA "INDEXNOW" DO PAINEL EDITORIAL — Onda 10C · Infra 3 (Parte B).
 *
 * Consome a fonte única já produzida pela Infra 2
 * (reports/indexnow/editorial-wave-status.json), publicada de forma
 * SANITIZADA em public/editorial-indexnow-status.json. Nenhuma fila nova é
 * criada e a chave do IndexNow nunca é exposta.
 */

export interface LinhaIndexNow {
  url: string;
  wave: string | null;
  batch: string | null;
  lote: string | null;
  owner: string | null;
  currentContentHash: string | null;
  lastSubmittedHash: string | null;
  deploymentConfirmed: boolean;
  deploySha: string | null;
  submissionState: string;
  http: string | null;
  lastSubmittedAt: string | null;
  motivo: string | null;
  endpoint: string;
}

/** Normalização dos estados internos para o vocabulário do painel. */
export const ESTADO_UI: Record<string, string> = {
  READY: "READY",
  PENDING_DEPLOY: "PENDING_DEPLOY",
  SUBMITTED: "SUBMITTED",
  NOT_CHANGED: "UNCHANGED",
  ALREADY_SUBMITTED: "ALREADY_SUBMITTED",
  RETRYABLE: "RETRYABLE",
  FAILED: "FAILED",
  FAILED_CONFIG: "FAILED_CONFIG",
};

const COR: Record<string, string> = {
  SUBMITTED: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  READY: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  PENDING_DEPLOY: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  RETRYABLE: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  UNCHANGED: "bg-muted text-muted-foreground border-border",
  ALREADY_SUBMITTED: "bg-muted text-muted-foreground border-border",
  FAILED: "bg-destructive/15 text-destructive border-destructive/30",
  FAILED_CONFIG: "bg-destructive/15 text-destructive border-destructive/30",
};

const fmt = (v?: string | null) => (v ? new Date(v).toLocaleString("pt-BR") : "—");

/** Motivo explícito — nunca "só uma bolinha amarela". */
export function explicarEstado(l: LinhaIndexNow): string {
  const estado = ESTADO_UI[l.submissionState] ?? l.submissionState;
  if (estado === "READY")
    return "conteúdo alterado + deploy confirmado + hash ainda não enviado";
  if (estado === "PENDING_DEPLOY")
    return l.motivo ?? "contentHash novo ainda não provado em produção";
  if (estado === "SUBMITTED") return "aceito pelo endpoint (SUBMITTED ≠ INDEXED)";
  if (estado === "UNCHANGED" || estado === "ALREADY_SUBMITTED")
    return "hash idêntico ao último envio aceito — reenvio seria ruído";
  if (estado === "RETRYABLE") return l.motivo ?? "falha transitória — hash anterior preservado";
  if (estado === "FAILED_CONFIG") return l.motivo ?? "erro de configuração (key/keyLocation)";
  return l.motivo ?? "—";
}

export default function EditorialIndexNowPanel({ lote }: { lote: string }) {
  const [dados, setDados] = useState<{ geradoEm: string; rotas: LinhaIndexNow[] } | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [estado, setEstado] = useState("todos");
  const [busca, setBusca] = useState("");
  const [aberta, setAberta] = useState<string | null>(null);

  useEffect(() => {
    fetch("/editorial-indexnow-status.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setDados)
      .catch((e: Error) => setErro(e.message));
  }, []);

  const linhas = useMemo(() => {
    const todas = dados?.rotas ?? [];
    return todas.filter((l) => {
      const ui = ESTADO_UI[l.submissionState] ?? l.submissionState;
      if (lote !== "todos" && l.lote !== lote) return false;
      if (estado !== "todos" && ui !== estado) return false;
      if (busca && !l.url.toLowerCase().includes(busca.toLowerCase())) return false;
      return true;
    });
  }, [dados, lote, estado, busca]);

  const contar = (alvo: string) =>
    linhas.filter((l) => (ESTADO_UI[l.submissionState] ?? l.submissionState) === alvo).length;

  const porLote = useMemo(() => {
    const mapa = new Map<string, Record<string, number>>();
    for (const l of dados?.rotas ?? []) {
      const chave = l.lote ?? "—";
      const ui = ESTADO_UI[l.submissionState] ?? l.submissionState;
      const atual = mapa.get(chave) ?? {};
      atual[ui] = (atual[ui] ?? 0) + 1;
      mapa.set(chave, atual);
    }
    return [...mapa.entries()];
  }, [dados]);

  if (erro)
    return (
      <Card className="border-amber-500/40 p-4 text-sm">
        Fila indisponível ({erro}). Rode <code>npm run indexnow:editorial -- --wave=10C --dry-run</code>.
      </Card>
    );
  if (!dados) return <Card className="p-4 text-sm text-muted-foreground">Carregando fila…</Card>;

  return (
    <section>
      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {(["READY", "PENDING_DEPLOY", "SUBMITTED", "FAILED"] as const).map((e) => (
          <Card key={e} className="p-4">
            <p className="text-xs uppercase text-muted-foreground">{e}</p>
            <p className="mt-1 text-2xl font-semibold">{contar(e)}</p>
          </Card>
        ))}
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        {["todos", "READY", "PENDING_DEPLOY", "SUBMITTED", "UNCHANGED", "RETRYABLE", "FAILED", "FAILED_CONFIG"].map(
          (e) => (
            <Button key={e} size="sm" variant={e === estado ? "default" : "outline"} onClick={() => setEstado(e)}>
              {e}
            </Button>
          ),
        )}
        <Input
          className="h-8 w-56"
          placeholder="Buscar URL…"
          value={busca}
          onChange={(ev) => setBusca(ev.target.value)}
        />
        <span className="flex-1" />
        <Button size="sm" variant="outline" onClick={() => exportarCsv("indexnow-editorial", linhas)}>
          Exportar CSV
        </Button>
        <Button size="sm" variant="outline" onClick={() => exportarJson("indexnow-editorial", linhas)}>
          Exportar JSON
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="p-3">URL</th>
              <th className="p-3">Wave</th>
              <th className="p-3">Lote</th>
              <th className="p-3">Hash atual</th>
              <th className="p-3">Hash enviado</th>
              <th className="p-3">Deploy</th>
              <th className="p-3">Estado</th>
              <th className="p-3">HTTP</th>
              <th className="p-3">Último envio</th>
            </tr>
          </thead>
          <tbody>
            {linhas.map((l) => {
              const ui = ESTADO_UI[l.submissionState] ?? l.submissionState;
              return (
                <tr key={l.url} className="border-t align-top">
                  <td className="p-3">
                    <button
                      type="button"
                      className="text-left underline underline-offset-2"
                      onClick={() => setAberta(aberta === l.url ? null : l.url)}
                    >
                      {l.url}
                    </button>
                    {aberta === l.url && (
                      <dl className="mt-2 space-y-1 rounded-md border bg-muted/30 p-3 text-xs">
                        <div>Current contentHash: <span className="font-mono">{l.currentContentHash ?? "—"}</span></div>
                        <div>Last submitted hash: <span className="font-mono">{l.lastSubmittedHash ?? "—"}</span></div>
                        <div>Material diff? {l.currentContentHash !== l.lastSubmittedHash ? "SIM" : "NÃO"}</div>
                        <div>Deployment confirmed? {l.deploymentConfirmed ? "SIM" : "NÃO"}</div>
                        <div>Last deploy hash público: <span className="font-mono">{l.deploySha ?? "—"}</span></div>
                        <div>Last submission: {fmt(l.lastSubmittedAt)}</div>
                        <div>Endpoint results: {l.endpoint} · {l.http ?? "—"}</div>
                        <div>Failure reason: {ui.startsWith("FAILED") || ui === "RETRYABLE" ? (l.motivo ?? "—") : "—"}</div>
                        <div>
                          Next allowed action:{" "}
                          {ui === "RETRYABLE" ? (
                            <code>npm run indexnow:editorial -- --wave={l.wave} --batch={l.batch}</code>
                          ) : ui === "READY" ? (
                            <code>npm run indexnow:editorial -- --wave={l.wave} --batch={l.batch}</code>
                          ) : (
                            "nenhuma (reenvio sem diff material é proibido)"
                          )}
                        </div>
                      </dl>
                    )}
                    <p className="text-xs text-muted-foreground">owner: {l.owner ?? "—"}</p>
                  </td>
                  <td className="p-3 whitespace-nowrap">{l.wave ?? "—"}</td>
                  <td className="p-3 whitespace-nowrap">{l.lote ?? "—"}</td>
                  <td className="p-3 font-mono text-xs">{l.currentContentHash ?? "—"}</td>
                  <td className="p-3 font-mono text-xs">{l.lastSubmittedHash ?? "—"}</td>
                  <td className="p-3 whitespace-nowrap">{l.deploymentConfirmed ? "confirmado" : "não confirmado"}</td>
                  <td className="p-3">
                    <Badge variant="outline" className={COR[ui] ?? COR.UNCHANGED}>
                      {ui}
                    </Badge>
                    <p className="mt-1 max-w-xs text-xs text-muted-foreground">{explicarEstado(l)}</p>
                  </td>
                  <td className="p-3 whitespace-nowrap">{l.http ?? "—"}</td>
                  <td className="p-3 whitespace-nowrap">{fmt(l.lastSubmittedAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h3 className="mt-6 mb-2 text-sm font-semibold uppercase text-muted-foreground">Resumo por onda/lote</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {porLote.map(([chave, contagens]) => (
          <Card key={chave} className="p-4 text-sm">
            <p className="font-semibold">{chave}</p>
            {Object.entries(contagens).map(([e, n]) => (
              <p key={e} className="text-muted-foreground">
                {e} {n}
              </p>
            ))}
          </Card>
        ))}
      </div>
    </section>
  );
}
