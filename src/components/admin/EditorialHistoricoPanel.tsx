import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { exportarCsv, exportarJson } from "@/lib/exportarRelatorio";

/**
 * ABA "HISTÓRICO" — execuções da auditoria 10C.
 *
 * Consome `public/editorial-audit-history.json` (gerado por
 * `npm run report:editorial-history`). Cada linha aponta para o artefato JSON
 * exato daquela execução; artefato ausente vira UNKNOWN, nunca zero.
 *
 * Filtros (status, data, responsável, tipo de execução), busca livre e
 * paginação rodam sobre o índice já carregado — nada é recalculado no servidor.
 * Ordenação padrão: última execução primeiro.
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
const POR_PAGINA = 10;

const linhaCsv = (e: Execucao) => ({
  quando: e.geradoEm ?? "UNKNOWN",
  wave: e.wave,
  veredito: e.veredito,
  responsavel: e.responsavel,
  origem: e.origem,
  commit: e.commit ?? "",
  jobUrl: e.jobUrl ?? "",
  artefato: e.artefato,
  ...e.estados,
});

export default function EditorialHistoricoPanel() {
  const [indice, setIndice] = useState<Indice | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [selecionada, setSelecionada] = useState<Execucao | null>(null);
  const [detalhe, setDetalhe] = useState<Record<string, unknown> | null>(null);

  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("todos");
  const [origem, setOrigem] = useState("todos");
  const [responsavel, setResponsavel] = useState("todos");
  const [de, setDe] = useState("");
  const [ate, setAte] = useState("");
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    fetch("/editorial-audit-history.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setIndice)
      .catch((e: Error) => setErro(e.message));
  }, []);

  const execucoes = useMemo(
    () =>
      [...(indice?.execucoes ?? [])].sort(
        (a, b) => new Date(b.geradoEm ?? 0).getTime() - new Date(a.geradoEm ?? 0).getTime(),
      ),
    [indice],
  );

  const opcoes = useMemo(
    () => ({
      status: [...new Set(execucoes.map((e) => e.veredito))].sort(),
      origem: [...new Set(execucoes.map((e) => e.origem))].sort(),
      responsavel: [...new Set(execucoes.map((e) => e.responsavel))].sort(),
    }),
    [execucoes],
  );

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    const inicio = de ? new Date(`${de}T00:00:00`).getTime() : null;
    const fim = ate ? new Date(`${ate}T23:59:59`).getTime() : null;
    return execucoes.filter((e) => {
      if (status !== "todos" && e.veredito !== status) return false;
      if (origem !== "todos" && e.origem !== origem) return false;
      if (responsavel !== "todos" && e.responsavel !== responsavel) return false;
      const t = e.geradoEm ? new Date(e.geradoEm).getTime() : null;
      if (inicio !== null && (t === null || t < inicio)) return false;
      if (fim !== null && (t === null || t > fim)) return false;
      if (!termo) return true;
      return JSON.stringify(e).toLowerCase().includes(termo);
    });
  }, [execucoes, busca, status, origem, responsavel, de, ate]);

  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / POR_PAGINA));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const visiveis = filtradas.slice((paginaAtual - 1) * POR_PAGINA, paginaAtual * POR_PAGINA);

  useEffect(() => {
    setPagina(1);
  }, [busca, status, origem, responsavel, de, ate]);

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

  const baixarArtefato = async (execucao: Execucao) => {
    try {
      const r = await fetch(execucao.artefato, { cache: "no-store" });
      exportarJson(`auditoria-10c-${execucao.arquivo.replace(/\.json$/, "")}`, r.ok ? await r.json() : { erro: "UNKNOWN" });
    } catch {
      exportarJson(`auditoria-10c-${execucao.arquivo.replace(/\.json$/, "")}`, { erro: "UNKNOWN" });
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
            {filtradas.length}/{indice.total}{" "}
            <span className="text-xs font-normal text-muted-foreground">· índice de {fmt(indice.geradoEm)}</span>
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => exportarCsv("auditoria-10c-historico", filtradas.map(linhaCsv))}
          disabled={!filtradas.length}
        >
          Histórico CSV
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => exportarJson("auditoria-10c-historico", { ...indice, execucoes: filtradas })}
          disabled={!filtradas.length}
        >
          Histórico JSON
        </Button>
      </div>

      <div className="mb-4 grid gap-2 rounded-lg border p-3 sm:grid-cols-2 lg:grid-cols-6" data-testid="historico-filtros">
        <Input
          aria-label="Buscar no histórico"
          placeholder="Buscar (commit, job, KPI…)"
          value={busca}
          onChange={(ev) => setBusca(ev.target.value)}
          className="lg:col-span-2"
        />
        <select
          aria-label="Filtrar por status"
          className="h-9 rounded-md border bg-background px-2 text-sm"
          value={status}
          onChange={(ev) => setStatus(ev.target.value)}
        >
          <option value="todos">Status: todos</option>
          {opcoes.status.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <select
          aria-label="Filtrar por tipo de execução"
          className="h-9 rounded-md border bg-background px-2 text-sm"
          value={origem}
          onChange={(ev) => setOrigem(ev.target.value)}
        >
          <option value="todos">Tipo: todos</option>
          {opcoes.origem.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <select
          aria-label="Filtrar por responsável"
          className="h-9 rounded-md border bg-background px-2 text-sm"
          value={responsavel}
          onChange={(ev) => setResponsavel(ev.target.value)}
        >
          <option value="todos">Responsável: todos</option>
          {opcoes.responsavel.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-1">
          <Input aria-label="Data inicial" type="date" value={de} onChange={(ev) => setDe(ev.target.value)} />
          <Input aria-label="Data final" type="date" value={ate} onChange={(ev) => setAte(ev.target.value)} />
        </div>
      </div>

      {indice.motivo && <Card className="mb-4 p-4 text-sm text-muted-foreground">{indice.motivo}</Card>}

      {filtradas.length === 0 ? (
        <Card className="p-4 text-sm text-muted-foreground">Nenhuma execução corresponde aos filtros aplicados.</Card>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3">Quando</th>
                <th className="p-3">Veredito</th>
                <th className="p-3">Responsável</th>
                <th className="p-3">Origem</th>
                <th className="p-3">Artefatos</th>
              </tr>
            </thead>
            <tbody>
              {visiveis.map((e) => (
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
                    <div className="flex flex-wrap items-center gap-2">
                      <a className="underline" href={e.artefato} target="_blank" rel="noreferrer">
                        JSON
                      </a>
                      <Button size="sm" variant="ghost" onClick={() => void baixarArtefato(e)}>
                        Baixar JSON
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => exportarCsv(`auditoria-10c-${e.arquivo.replace(/\.json$/, "")}`, [linhaCsv(e)])}
                      >
                        CSV
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => void abrir(e)}>
                        Ver KPIs
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtradas.length > POR_PAGINA && (
        <div className="mt-3 flex items-center gap-2 text-xs" data-testid="historico-paginacao">
          <Button size="sm" variant="outline" disabled={paginaAtual <= 1} onClick={() => setPagina(paginaAtual - 1)}>
            Anterior
          </Button>
          <span className="text-muted-foreground">
            Página {paginaAtual} de {totalPaginas}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={paginaAtual >= totalPaginas}
            onClick={() => setPagina(paginaAtual + 1)}
          >
            Próxima
          </Button>
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Relatórios consolidados: <a className="underline" href="/editorial-audit-10c.json" target="_blank" rel="noreferrer">auditoria completa</a>
        {" · "}
        <a className="underline" href="/editorial-audit-delta.json" target="_blank" rel="noreferrer">
          delta
        </a>
        . Artefatos são públicos apenas em leitura; o painel exige sessão admin.
      </p>

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
