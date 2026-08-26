import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { exportarCsv, exportarJson } from "@/lib/exportarRelatorio";

/**
 * ABA "SCHEMA DIFF" DO PAINEL EDITORIAL — Onda 10C · Infra 3 (Parte C).
 *
 * Lê apenas os artefatos semânticos já produzidos fora do runtime:
 *   public/editorial-schema-snapshots.json  (snapshots normalizados por build)
 *   public/editorial-schema-diff.json       (comparação pronta A × B)
 * Nenhum HTML/DOM completo é armazenado ou exibido.
 */

interface DiffLinha extends Record<string, unknown> {
  url: string;
  estado: string;
  fingerprintA?: string | null;
  fingerprintB?: string | null;
  nodes?: { de: number; para: number };
  tipos?: { added: string[]; removed: string[] };
  faq?: {
    countA: number;
    countB: number;
    addedQuestions: string[];
    removedQuestions: string[];
    changedAnswers: string[];
    hiddenInSchema: string[];
    visibleWithoutSchema: string[];
  };
  breadcrumb?: {
    countA: number;
    countB: number;
    added: string[];
    removed: string[];
    urlsMudadas: Array<{ nome: string; de: string | null; para: string | null }>;
    ordemAlterada: boolean;
    divergeUi: boolean;
  };
  artigo?: { presenteA: boolean; presenteB: boolean; mudancas: Array<{ campo: string; de: unknown; para: unknown }> };
  regressoes?: string[];
  motivo?: string;
}

interface Diff {
  geradoEm: string;
  buildA: string | null;
  buildB: string | null;
  builds?: Array<{ buildSha: string; geradoEm: string }>;
  estado: string;
  linhas: DiffLinha[];
}

const COR: Record<string, string> = {
  UNCHANGED: "bg-muted text-muted-foreground border-border",
  EXPECTED_CHANGE: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  CHANGED: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  SCHEMA_REGRESSION: "bg-destructive/15 text-destructive border-destructive/30",
  UNKNOWN: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

export default function EditorialSchemaDiffPanel({ lote }: { lote: string }) {
  const [diff, setDiff] = useState<Diff | null>(null);
  const [snapshots, setSnapshots] = useState<Array<{ buildSha: string; geradoEm: string }>>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [urlAberta, setUrlAberta] = useState<string | null>(null);
  const [loteDoUrl, setLoteDoUrl] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/editorial-schema-diff.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setDiff)
      .catch((e: Error) => setErro(e.message));
    fetch("/editorial-schema-snapshots.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        setSnapshots((d?.builds ?? []).map((b: { buildSha: string; geradoEm: string }) => b));
        const mapa: Record<string, string> = {};
        for (const [url, s] of Object.entries<{ lote?: string }>(d?.builds?.[0]?.rotas ?? {}))
          mapa[url] = s.lote ?? "—";
        setLoteDoUrl(mapa);
      })
      .catch(() => setSnapshots([]));
  }, []);

  const linhas = useMemo(
    () => (diff?.linhas ?? []).filter((l) => lote === "todos" || loteDoUrl[l.url] === lote),
    [diff, lote, loteDoUrl],
  );
  const linha = linhas.find((l) => l.url === urlAberta) ?? linhas[0];

  if (erro)
    return (
      <Card className="border-amber-500/40 p-4 text-sm">
        Diff indisponível ({erro}). Rode <code>npm run schema:snapshot-editorial</code> e{" "}
        <code>npm run schema:diff-editorial</code>.
      </Card>
    );
  if (!diff) return <Card className="p-4 text-sm text-muted-foreground">Carregando diff…</Card>;

  return (
    <section>
      <Card className="mb-4 p-4 text-sm">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="outline" className={COR[diff.estado] ?? COR.UNKNOWN}>
            SCHEMA: {diff.estado}
          </Badge>
          <span className="text-muted-foreground">
            Build A <code>{diff.buildA ?? "—"}</code> × Build B <code>{diff.buildB ?? "—"}</code>
          </span>
          <span className="flex-1" />
          <Button size="sm" variant="outline" onClick={() => exportarCsv("schema-diff-editorial", linhas)}>
            Exportar CSV
          </Button>
          <Button size="sm" variant="outline" onClick={() => exportarJson("schema-diff-editorial", linhas)}>
            Exportar JSON
          </Button>
        </div>
        {snapshots.length > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            Builds retidos: {snapshots.map((b) => b.buildSha).join(" · ")}
          </p>
        )}
      </Card>

      <div className="mb-4 flex flex-wrap gap-2">
        {linhas.map((l) => (
          <Button
            key={l.url}
            size="sm"
            variant={l.url === linha?.url ? "default" : "outline"}
            onClick={() => setUrlAberta(l.url)}
          >
            {l.url.split("/").pop()}
            <Badge variant="outline" className={`ml-2 ${COR[l.estado] ?? COR.UNKNOWN}`}>
              {l.estado}
            </Badge>
          </Button>
        ))}
      </div>

      {!linha ? (
        <Card className="p-4 text-sm text-muted-foreground">Nenhuma URL neste filtro.</Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-4 text-sm">
            <h3 className="mb-2 font-semibold">Resumo — {linha.url}</h3>
            <p>Fingerprint A: <code>{linha.fingerprintA ?? "—"}</code></p>
            <p>Fingerprint B: <code>{linha.fingerprintB ?? "—"}</code></p>
            <p>Nodes: {linha.nodes ? `${linha.nodes.de} → ${linha.nodes.para}` : "—"}</p>
            <p>FAQ: {linha.faq ? `${linha.faq.countA} → ${linha.faq.countB}` : "—"}</p>
            <p>Breadcrumb: {linha.breadcrumb ? `${linha.breadcrumb.countA} → ${linha.breadcrumb.countB}` : "—"}</p>
            {(linha.regressoes ?? []).length > 0 && (
              <ul className="mt-2 list-disc pl-4 text-destructive">
                {linha.regressoes?.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="p-4 text-sm">
            <h3 className="mb-2 font-semibold">Types</h3>
            <ul className="font-mono text-xs">
              {(linha.tipos?.removed ?? []).map((t) => (
                <li key={`r-${t}`} className="text-destructive">- {t}</li>
              ))}
              {(linha.tipos?.added ?? []).map((t) => (
                <li key={`a-${t}`} className="text-emerald-400">+ {t}</li>
              ))}
              {!(linha.tipos?.added ?? []).length && !(linha.tipos?.removed ?? []).length && (
                <li className="text-muted-foreground">sem alteração de tipos</li>
              )}
            </ul>
          </Card>

          <Card className="p-4 text-sm">
            <h3 className="mb-2 font-semibold">FAQPage</h3>
            <ul className="text-xs">
              {(linha.faq?.removedQuestions ?? []).map((q) => (
                <li key={`fr-${q}`} className="text-destructive">- {q}</li>
              ))}
              {(linha.faq?.addedQuestions ?? []).map((q) => (
                <li key={`fa-${q}`} className="text-emerald-400">+ {q}</li>
              ))}
              {(linha.faq?.changedAnswers ?? []).map((q) => (
                <li key={`fc-${q}`} className="text-amber-400">~ resposta alterada: {q}</li>
              ))}
              {(linha.faq?.hiddenInSchema ?? []).map((q) => (
                <li key={`fh-${q}`} className="text-destructive">HIDDEN_IN_SCHEMA: {q}</li>
              ))}
              {(linha.faq?.visibleWithoutSchema ?? []).map((q) => (
                <li key={`fv-${q}`} className="text-amber-400">VISIBLE_WITHOUT_SCHEMA: {q}</li>
              ))}
              {linha.faq &&
                !linha.faq.addedQuestions.length &&
                !linha.faq.removedQuestions.length &&
                !linha.faq.changedAnswers.length && (
                  <li className="text-muted-foreground">FAQ idêntica entre os builds</li>
                )}
            </ul>
          </Card>

          <Card className="p-4 text-sm">
            <h3 className="mb-2 font-semibold">Breadcrumb (UI × BreadcrumbList)</h3>
            <ul className="text-xs">
              {(linha.breadcrumb?.removed ?? []).map((t) => (
                <li key={`br-${t}`} className="text-destructive">- {t}</li>
              ))}
              {(linha.breadcrumb?.added ?? []).map((t) => (
                <li key={`ba-${t}`} className="text-emerald-400">+ {t}</li>
              ))}
              {(linha.breadcrumb?.urlsMudadas ?? []).map((u) => (
                <li key={`bu-${u.nome}`} className="text-amber-400">
                  URL alterada em “{u.nome}”: {String(u.de ?? "—")} → {String(u.para ?? "—")}
                </li>
              ))}
              {linha.breadcrumb?.ordemAlterada && <li className="text-amber-400">ordem alterada</li>}
              {linha.breadcrumb?.divergeUi && (
                <li className="text-destructive">schema diverge do breadcrumb visível</li>
              )}
              {linha.breadcrumb &&
                !linha.breadcrumb.added.length &&
                !linha.breadcrumb.removed.length &&
                !linha.breadcrumb.urlsMudadas.length &&
                !linha.breadcrumb.divergeUi && (
                  <li className="text-muted-foreground">breadcrumb idêntico e sincronizado com a UI</li>
                )}
            </ul>
          </Card>

          <Card className="p-4 text-sm lg:col-span-2">
            <h3 className="mb-2 font-semibold">Article / TechArticle</h3>
            {(linha.artigo?.mudancas ?? []).length === 0 ? (
              <p className="text-xs text-muted-foreground">
                headline, author, publisher, image, dateModified e mainEntityOfPage sem alteração.
              </p>
            ) : (
              <ul className="text-xs">
                {linha.artigo?.mudancas.map((m) => (
                  <li key={m.campo}>
                    <span className="font-mono">{m.campo}</span>: {JSON.stringify(m.de)} → {JSON.stringify(m.para)}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      )}
    </section>
  );
}
