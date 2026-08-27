import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { exportarCsv, exportarJson } from "@/lib/exportarRelatorio";

/**
 * ABA "HISTÓRICO" — execuções da auditoria 10C.
 *
 * Consome `public/editorial-audit-history.json` (gerado por
 * `npm run report:editorial-history`). Cada linha aponta para o artefato JSON
 * exato daquela execução; artefato ausente vira UNKNOWN, nunca zero.
 */

interface Execucao {
  arquivo: string;
  artefato: string;
  wave: string;
  geradoEm: string | null;
  veredito: string;
  responsavel: string;
  origem: string;
  commit: string | null;
  jobUrl: string | null;
  estados: Record<string, string>;
}

interface Indice {
  geradoEm: string;
  total: number;
  motivo: string | null;
  execucoes: Execucao[];
}

const COR: Record<string, string> = {
  SAUDAVEL: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  ATENCAO: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  BLOQUEADO: "bg-destructive/15 text-destructive border-destructive/30",
  SEM_DADOS: "bg-muted text-muted-foreground border-border",
  UNKNOWN: "bg-muted text-muted-foreground border-border",
};

const fmt = (v: string | null) => (v ? new Date(v).toLocaleString("pt-BR") : "UNKNOWN");

export default function EditorialHistoricoPanel() {
  const [indice, setIndice] = useState<Indice | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [selecionada, setSelecionada] = useState<Execucao | null>(null);
  const [detalhe, setDetalhe] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch("/editorial-audit-history.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setIndice)
      .catch((e: Error) => setErro(e.message));
  }, []);

  const abrir = async (execucao: Execucao) => {
    setSelecionada(execucao);
    setDetalhe(null);
    try {
      const r = await fetch(execucao.artefato, { cache: "no-store" });
      setDetalhe(r.ok ? await r.json() : null);
    } catch {
      setDetalhe(null);
    }
  };

  if (erro)
    return (
      <Card className="border-amber-500/40 p-4 text-sm" data-testid="historico-indisponivel">
        Histórico indisponível ({erro}). Rode <code>npm run report:editorial-history</code>.
      </Card>
    );

  if (!indice) return <Skeleton className="h-56 w-full" />;

  return (
    <section aria-label="Histórico de execuções da auditoria 10C" data-testid="historico-auditoria">
      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border p-3">
        <div className="mr-auto">
          <p className="text-xs uppercase text-muted-foreground">Execuções registradas</p>
          <p className="text-lg font-semibold">
            {indice.total}{" "}
            <span className="text-xs font-normal text-muted-foreground">· índice de {fmt(indice.geradoEm)}</span>
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => exportarCsv("auditoria-10c-historico", indice.execucoes as never)}
          disabled={!indice.total}
        >
          Histórico CSV
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => exportarJson("auditoria-10c-historico", indice)}
          disabled={!indice.total}
        >
          Histórico JSON
        </Button>
      </div>

      {indice.motivo && <Card className="mb-4 p-4 text-sm text-muted-foreground">{indice.motivo}</Card>}

      {indice.total > 0 && (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3">Quando</th>
                <th className="p-3">Veredito</th>
                <th className="p-3">Responsável</th>
                <th className="p-3">Origem</th>
                <th className="p-3">Artefato</th>
              </tr>
            </thead>
            <tbody>
              {indice.execucoes.map((e) => (
                <tr key={e.arquivo} className="border-t">
                  <td className="p-3 whitespace-nowrap">{fmt(e.geradoEm)}</td>
                  <td className="p-3">
                    <Badge variant="outline" className={COR[e.veredito] ?? COR.UNKNOWN}>
                      {e.veredito}
                    </Badge>
                  </td>
                  <td className="p-3 text-xs">{e.responsavel}</td>
                  <td className="p-3 text-xs">
                    {e.origem}
                    {e.jobUrl && (
                      <>
                        {" · "}
                        <a className="underline" href={e.jobUrl} target="_blank" rel="noreferrer">
                          job
                        </a>
                      </>
                    )}
                    {e.commit && <p className="font-mono text-[11px] text-muted-foreground">{e.commit.slice(0, 7)}</p>}
                  </td>
                  <td className="p-3 text-xs">
                    <a className="underline" href={e.artefato} target="_blank" rel="noreferrer">
                      JSON
                    </a>
                    <Button size="sm" variant="ghost" className="ml-2" onClick={() => void abrir(e)}>
                      Ver KPIs
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selecionada && (
        <Card className="mt-4 p-4" data-testid="historico-detalhe">
          <p className="text-xs uppercase text-muted-foreground">
            Execução {fmt(selecionada.geradoEm)} — {selecionada.veredito}
          </p>
          {detalhe ? (
            <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(selecionada.estados).map(([nome, estado]) => (
                <div key={nome} className="rounded border p-2 text-xs">
                  <span className="uppercase text-muted-foreground">{nome}</span>
                  <Badge variant="outline" className={`ml-2 ${COR[estado] ?? COR.UNKNOWN}`}>
                    {estado}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-xs text-muted-foreground">
              Artefato desta execução não pôde ser lido — estado UNKNOWN.
            </p>
          )}
        </Card>
      )}
    </section>
  );
}
