import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { exportarCsv, exportarJson } from "@/lib/exportarRelatorio";

/**
 * ABA "DIFFS" — o que mudou entre execuções, por domínio.
 *
 * Consolida schema/JSON-LD, FAQ visível, BreadcrumbList e assets num só lugar,
 * com o link direto para o artefato comparativo exato que originou cada alerta.
 * Só lê artefatos públicos já gerados: artefato ausente vira UNKNOWN com o
 * comando que o produz — nunca zero inventado.
 */

type Severidade = "CRITICAL" | "WARNING" | "INFO" | "UNKNOWN";

interface LinhaDiff extends Record<string, unknown> {
  dominio: "schema" | "faq" | "breadcrumb" | "assets";
  alvo: string;
  estado: string;
  severidade: Severidade;
  detalhe: string;
  artefato: string;
  comando: string;
}

const COR: Record<Severidade, string> = {
  CRITICAL: "bg-destructive/15 text-destructive border-destructive/30",
  WARNING: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  INFO: "bg-sky-500/15 text-sky-400 border-sky-500/30",
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

export default function EditorialDiffsPanel() {
  const [linhas, setLinhas] = useState<LinhaDiff[] | null>(null);
  const [geradoEm, setGeradoEm] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<"todos" | LinhaDiff["dominio"]>("todos");

  const carregar = useCallback(async () => {
    const [schema, fingerprints, assets, delta] = await Promise.all([
      buscar<Record<string, any>>("/editorial-schema-diff.json"),
      buscar<Record<string, any>>("/editorial-schema-snapshots.json"),
      buscar<Record<string, any>>("/editorial-assets-status.json"),
      buscar<Record<string, any>>("/editorial-audit-delta.json"),
    ]);

    const saida: LinhaDiff[] = [];

    // Schema / JSON-LD — diff entre builds.
    if (schema) {
      for (const l of (schema.linhas as Array<Record<string, any>>) ?? []) {
        if (l.estado === "IGUAL") continue;
        saida.push({
          dominio: "schema",
          alvo: String(l.url ?? l.owner ?? "—"),
          estado: String(l.estado ?? "UNKNOWN"),
          severidade: l.estado === "SCHEMA_REGRESSION" ? "CRITICAL" : "INFO",
          detalhe: String(
            l.motivo ?? l.detalhe ?? `Comparação ${schema.buildA ?? "?"} → ${schema.buildB ?? "?"}.`,
          ),
          artefato: "/editorial-schema-diff.json",
          comando: "schema:diff-editorial",
        });
      }
    } else {
      saida.push({
        dominio: "schema",
        alvo: "—",
        estado: "UNKNOWN",
        severidade: "UNKNOWN",
        detalhe: "Artefato de diff de schema ausente nesta build.",
        artefato: "/editorial-schema-diff.json",
        comando: "schema:diff-editorial",
      });
    }

    // FAQ visível e BreadcrumbList — paridade schema × HTML renderizado.
    const rotas = (fingerprints?.rotas as Array<Record<string, any>>) ?? [];
    for (const r of rotas) {
      const url = String(r.url ?? r.owner ?? "—");
      if (r.faq && r.faq.visivel === false) {
        saida.push({
          dominio: "faq",
          alvo: url,
          estado: "FAQ_VISIVEL_AUSENTE",
          severidade: "CRITICAL",
          detalhe: "FAQPage declarado sem FAQ visível 1:1 no HTML.",
          artefato: "/editorial-schema-snapshots.json",
          comando: "schema:snapshot-editorial",
        });
      }
      if (r.breadcrumb && r.breadcrumb.visivel === false) {
        saida.push({
          dominio: "breadcrumb",
          alvo: url,
          estado: "BREADCRUMB_VISUAL_AUSENTE",
          severidade: "WARNING",
          detalhe: "BreadcrumbList no schema sem trilha visual correspondente.",
          artefato: "/editorial-schema-snapshots.json",
          comando: "check:breadcrumb-parity",
        });
      }
    }
    if (!rotas.length) {
      saida.push({
        dominio: "breadcrumb",
        alvo: "—",
        estado: "UNKNOWN",
        severidade: "UNKNOWN",
        detalhe: "Snapshots de schema ausentes: rode o gate para popular FAQ/breadcrumb.",
        artefato: "/editorial-schema-snapshots.json",
        comando: "check:breadcrumb-parity",
      });
    }

    // Assets — licenciamento e proveniência.
    if (assets) {
      for (const a of (assets.assets as Array<Record<string, any>>) ?? []) {
        if (a.resultado === "PASS") continue;
        saida.push({
          dominio: "assets",
          alvo: String(a.slug ?? a.localPath ?? "—"),
          estado: String(a.resultado ?? "UNKNOWN"),
          severidade: a.resultado === "FAIL" ? "CRITICAL" : "WARNING",
          detalhe: [...(a.falhas ?? []), ...(a.avisos ?? [])].join(" · ") || "—",
          artefato: "/editorial-assets-status.json",
          comando: "check:editorial-assets",
        });
      }
    } else {
      saida.push({
        dominio: "assets",
        alvo: "—",
        estado: "UNKNOWN",
        severidade: "UNKNOWN",
        detalhe: "Status de assets ausente nesta build.",
        artefato: "/editorial-assets-status.json",
        comando: "check:editorial-assets",
      });
    }

    // Regressões agregadas do delta da auditoria.
    for (const r of (delta?.regressoes as Array<Record<string, any>>) ?? []) {
      saida.push({
        dominio: r.dominio === "assets" ? "assets" : "schema",
        alvo: `auditoria/${r.dominio}`,
        estado: "AUDITORIA_REGRESSAO",
        severidade: r.dominio === "schema" ? "CRITICAL" : "WARNING",
        detalhe: `${r.metrica}: ${r.de} → ${r.para} (${r.delta}).`,
        artefato: "/editorial-audit-delta.json",
        comando: "report:editorial-delta",
      });
    }

    setLinhas(saida);
    setGeradoEm(new Date().toISOString());
  }, []);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  if (!linhas) return <Skeleton className="h-56 w-full" />;

  const visiveis = linhas.filter((l) => filtro === "todos" || l.dominio === filtro);

  return (
    <section aria-label="Diffs dos relatórios editoriais">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {(["todos", "schema", "faq", "breadcrumb", "assets"] as const).map((d) => (
          <Button key={d} size="sm" variant={filtro === d ? "default" : "outline"} onClick={() => setFiltro(d)}>
            {d}
          </Button>
        ))}
        <span className="flex-1" />
        <Button size="sm" variant="outline" onClick={() => void carregar()}>
          Recarregar
        </Button>
        <Button size="sm" variant="outline" onClick={() => exportarCsv("editorial-diffs", visiveis)}>
          CSV
        </Button>
        <Button size="sm" variant="outline" onClick={() => exportarJson("editorial-diffs", { geradoEm, linhas: visiveis })}>
          JSON
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="p-3">Domínio</th>
              <th className="p-3">Alvo</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Detalhe</th>
              <th className="p-3">Artefato comparativo</th>
            </tr>
          </thead>
          <tbody>
            {visiveis.map((l, i) => (
              <tr key={`${l.dominio}-${l.alvo}-${i}`} className="border-t">
                <td className="p-3 uppercase text-xs text-muted-foreground">{l.dominio}</td>
                <td className="p-3 font-mono text-xs">{l.alvo}</td>
                <td className="p-3">
                  <Badge variant="outline" className={COR[l.severidade]}>
                    {l.estado}
                  </Badge>
                </td>
                <td className="p-3 text-xs text-muted-foreground">{l.detalhe}</td>
                <td className="p-3 text-xs">
                  <a className="underline underline-offset-2" href={l.artefato} target="_blank" rel="noreferrer noopener">
                    abrir artefato
                  </a>
                  <span className="block text-[11px] text-muted-foreground">
                    <code>npm run {l.comando}</code>
                  </span>
                </td>
              </tr>
            ))}
            {!visiveis.length && (
              <tr>
                <td colSpan={5} className="p-4 text-sm text-muted-foreground">
                  Nenhuma diferença registrada neste domínio.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Cada linha aponta para o artefato exato que gerou o alerta correspondente. Alertas seguem
        deduplicados por impressão digital do diff e com rate-limit por execução
        (<code>npm run alerts:editorial-regression</code>).
      </p>
    </section>
  );
}
