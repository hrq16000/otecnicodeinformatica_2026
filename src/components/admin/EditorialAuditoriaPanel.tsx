import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { exportarCsv, exportarJson } from "@/lib/exportarRelatorio";


/**
 * ABA "AUDITORIA" — KPIs consolidados da Onda 10C.
 *
 * Consome exclusivamente artefatos públicos já gerados pelos monitores/gates
 * (`public/editorial-*.json`). Nada é calculado em request, nada é inventado:
 * artefato ausente vira UNKNOWN com o motivo, nunca zero.
 */

type Estado = "OK" | "WARN" | "FAIL" | "UNKNOWN";

interface Kpi {
  id: string;
  titulo: string;
  estado: Estado;
  valor: string;
  detalhe: string;
  fonte: string;
}

const COR: Record<Estado, string> = {
  OK: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  WARN: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  FAIL: "bg-destructive/15 text-destructive border-destructive/30",
  UNKNOWN: "bg-muted text-muted-foreground border-border",
};

const buscar = async <T,>(url: string): Promise<T | null> => {
  try {
    const r = await fetch(url, { cache: "no-store" });
    return r.ok ? ((await r.json()) as T) : null;
  } catch {
    return null;
  }
};

const desconhecido = (id: string, titulo: string, fonte: string): Kpi => ({
  id,
  titulo,
  estado: "UNKNOWN",
  valor: "UNKNOWN",
  detalhe: `Artefato ausente — rode o gate correspondente (${fonte}).`,
  fonte,
});

interface DeltaArtefato {
  geradoEm?: string;
  estado?: string;
  auditoriaAtual?: string;
  auditoriaAnterior?: string | null;
  vereditoAtual?: string;
  linhas?: Array<Record<string, unknown>>;
  regressoes?: Array<Record<string, unknown>>;
}

export default function EditorialAuditoriaPanel({ lote }: { lote: string }) {
  const [kpis, setKpis] = useState<Kpi[] | null>(null);
  const [executando, setExecutando] = useState(false);
  const [executadoEm, setExecutadoEm] = useState<string | null>(null);
  const [delta, setDelta] = useState<DeltaArtefato | null>(null);
  const [veredito, setVeredito] = useState<string>("UNKNOWN");

  const carregar = useCallback(async () => {
    setExecutando(true);
    const [indexacao, indexnow, schema, assets, alertas, auditoria, deltaArt] = await Promise.all([
      buscar<Record<string, any>>("/editorial-waves-status.json"),
      buscar<Record<string, any>>("/editorial-indexnow-status.json"),
      buscar<Record<string, any>>("/editorial-schema-diff.json"),
      buscar<Record<string, any>>("/editorial-assets-status.json"),
      buscar<Record<string, any>>("/editorial-waves-alerts.json"),
      buscar<Record<string, any>>("/editorial-audit-10c.json"),
      buscar<DeltaArtefato>("/editorial-audit-delta.json"),
    ]);
    setDelta(deltaArt);
    setVeredito(String(auditoria?.veredito ?? "UNKNOWN"));
    {


      const filtrar = <T extends { lote?: string }>(itens: T[] | undefined) =>
        (itens ?? []).filter((i) => lote === "todos" || i.lote === lote);

      const lista: Kpi[] = [];

      if (indexacao) {
        const rotas = filtrar(indexacao.rotas as { lote?: string; google?: { status?: string } }[]);
        const indexadas = rotas.filter((r) => r.google?.status === "INDEXED").length;
        const cobertura = rotas.length ? Math.round((indexadas / rotas.length) * 100) : null;
        lista.push({
          id: "indexacao",
          titulo: "Indexação",
          estado: !indexacao.disponivel ? "UNKNOWN" : cobertura === null ? "UNKNOWN" : cobertura > 0 ? "OK" : "WARN",
          valor: cobertura === null ? "UNKNOWN" : `${cobertura}%`,
          detalhe: indexacao.disponivel
            ? `${indexadas}/${rotas.length} URLs indexadas segundo o Search Console.`
            : "Search Console sem credencial neste ambiente.",
          fonte: "monitor:editorial-waves",
        });
      } else lista.push(desconhecido("indexacao", "Indexação", "monitor:editorial-waves"));

      if (indexnow) {
        const rotas = filtrar(indexnow.rotas as { lote?: string; submissionState?: string }[]);
        const contagem = rotas.reduce<Record<string, number>>((acc, r) => {
          const s = r.submissionState ?? "UNKNOWN";
          acc[s] = (acc[s] ?? 0) + 1;
          return acc;
        }, {});
        const falhas = (contagem.FAILED ?? 0) + (contagem.RETRYABLE ?? 0);
        lista.push({
          id: "indexnow",
          titulo: "IndexNow",
          estado: falhas > 0 ? "WARN" : "OK",
          valor: `${rotas.length} URLs`,
          detalhe:
            Object.entries(contagem)
              .map(([e, n]) => `${e}: ${n}`)
              .join(" · ") || "Fila vazia.",
          fonte: "indexnow:editorial",
        });
      } else lista.push(desconhecido("indexnow", "IndexNow", "indexnow:editorial"));

      if (schema) {
        const regressoes = ((schema.linhas as { estado?: string }[]) ?? []).filter(
          (l) => l.estado === "SCHEMA_REGRESSION",
        ).length;
        lista.push({
          id: "schema",
          titulo: "Schema / JSON-LD",
          estado: regressoes > 0 ? "FAIL" : schema.estado === "UNKNOWN" ? "UNKNOWN" : "OK",
          valor: String(schema.estado ?? "UNKNOWN"),
          detalhe:
            regressoes > 0
              ? `${regressoes} regressão(ões) entre ${schema.buildA ?? "?"} e ${schema.buildB ?? "?"}.`
              : (schema.motivo ?? `Comparação entre ${schema.buildA ?? "?"} e ${schema.buildB ?? "?"}.`),
          fonte: "schema:diff-editorial",
        });
      } else lista.push(desconhecido("schema", "Schema / JSON-LD", "schema:diff-editorial"));

      if (assets) {
        const naoRegistrados = (assets.unregistered as string[] | undefined)?.length ?? 0;
        lista.push({
          id: "assets",
          titulo: "Assets e licenciamento",
          estado: (assets.fail ?? 0) > 0 || naoRegistrados > 0 ? "FAIL" : (assets.warn ?? 0) > 0 ? "WARN" : "OK",
          valor: `${assets.pass ?? 0}/${assets.total ?? 0} PASS`,
          detalhe: `Sem licença ${assets.semLicenca ?? 0} · sem atribuição ${assets.semAtribuicao ?? 0} · não registrados ${naoRegistrados}.`,
          fonte: "check:editorial-assets",
        });
      } else lista.push(desconhecido("assets", "Assets e licenciamento", "check:editorial-assets"));

      // Canibalização e órfãs são gates pré-publicação sem artefato público:
      // fail-closed em UNKNOWN em vez de exibir zero.
      lista.push(
        desconhecido("canibalizacao", "Canibalização", "check:editorial-cannibalization"),
        desconhecido("orphans", "Páginas órfãs", "check:orphan-trend"),
      );

      if (alertas) {
        const eventos = filtrar(alertas.alertas as { lote?: string; severity?: string }[]);
        const criticos = eventos.filter((e) => e.severity === "CRITICAL").length;
        lista.push({
          id: "alertas",
          titulo: "Alertas",
          estado: criticos > 0 ? "FAIL" : eventos.length > 0 ? "WARN" : "OK",
          valor: `${eventos.length} evento(s)`,
          detalhe: `${criticos} crítico(s) · entrega ${alertas.entrega?.estado ?? "UNKNOWN"}.`,
          fonte: "alerts:editorial",
        });
      } else lista.push(desconhecido("alertas", "Alertas", "alerts:editorial"));

      setKpis(lista);
    }
    setExecutadoEm(new Date().toISOString());
    setExecutando(false);
  }, [lote]);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  const exportarKpis = (formato: "csv" | "json") => {
    const linhas = (kpis ?? []).map((k) => ({
      kpi: k.titulo,
      estado: k.estado,
      valor: k.valor,
      detalhe: k.detalhe,
      fonte: k.fonte,
      lote,
      veredito,
      geradoEm: executadoEm ?? "",
    }));
    if (formato === "csv") exportarCsv("auditoria-10c-kpis", linhas);
    else exportarJson("auditoria-10c-kpis", { lote, veredito, geradoEm: executadoEm, kpis: linhas });
  };

  const exportarDelta = (formato: "csv" | "json") => {
    if (!delta) return;
    const linhas = (delta.linhas ?? []) as Array<Record<string, unknown>>;
    if (formato === "csv") exportarCsv("auditoria-10c-delta", linhas);
    else exportarJson("auditoria-10c-delta", delta);
  };

  if (!kpis) return <Skeleton className="h-56 w-full" />;

  return (
    <section aria-label="KPIs da auditoria editorial">
      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border p-3">
        <div className="mr-auto">
          <p className="text-xs uppercase text-muted-foreground">Veredito da auditoria</p>
          <p className="text-lg font-semibold">
            {veredito}{" "}
            <span className="text-xs font-normal text-muted-foreground">
              {executadoEm ? `· recalculado em ${new Date(executadoEm).toLocaleString("pt-BR")}` : ""}
            </span>
          </p>
        </div>
        <Button size="sm" onClick={() => void carregar()} disabled={executando}>
          {executando ? "Executando…" : "Executar auditoria agora"}
        </Button>
        <Button size="sm" variant="outline" onClick={() => exportarKpis("csv")}>
          KPIs CSV
        </Button>
        <Button size="sm" variant="outline" onClick={() => exportarKpis("json")}>
          KPIs JSON
        </Button>
        <Button size="sm" variant="outline" onClick={() => exportarDelta("csv")} disabled={!delta}>
          Delta CSV
        </Button>
        <Button size="sm" variant="outline" onClick={() => exportarDelta("json")} disabled={!delta}>
          Delta JSON
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((k) => (
          <Card key={k.id} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs uppercase text-muted-foreground">{k.titulo}</p>
              <Badge variant="outline" className={COR[k.estado]}>
                {k.estado}
              </Badge>
            </div>
            <p className="mt-2 text-xl font-semibold">{k.valor}</p>
            <p className="mt-1 text-xs text-muted-foreground">{k.detalhe}</p>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Fonte: <code>npm run {k.fonte}</code>
            </p>
          </Card>
        ))}
      </div>

      {delta && (
        <Card className="mt-4 p-4">
          <p className="text-xs uppercase text-muted-foreground">
            Delta contra a execução anterior — {delta.estado ?? "UNKNOWN"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {delta.auditoriaAnterior
              ? `Comparando ${delta.auditoriaAnterior} → ${delta.auditoriaAtual}.`
              : "Primeira execução registrada: sem base de comparação."}{" "}
            {(delta.regressoes?.length ?? 0) > 0
              ? `${delta.regressoes?.length} regressão(ões) detectada(s).`
              : "Sem regressões."}
          </p>
        </Card>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        A execução sob demanda recalcula os KPIs a partir dos artefatos publicados. Relatório humano completo em{" "}
        <code>docs/relatorio-onda-10c-auditoria-kpis.md</code> e comparativo entre execuções em{" "}
        <code>docs/relatorio-onda-10c-delta.md</code> (gerados por <code>npm run audit:editorial-10c</code> e{" "}
        <code>npm run report:editorial-delta</code>).
      </p>

    </section>
  );
}
