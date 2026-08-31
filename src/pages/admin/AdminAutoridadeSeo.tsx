import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { exportarCsv } from "@/lib/exportarRelatorio";

/**
 * AUTORIDADE SEO — /admin/autoridade-seo.
 *
 * Acompanha a autoridade das URLs editoriais publicadas por três eixos:
 *   • densidade semântica (vocabulário distinto / termos úteis do <main>);
 *   • densidade de keywords (termo-alvo do slug + top termos e bigramas);
 *   • links internos (saída e entrada dentro do próprio corpus editorial).
 *
 * Fonte única: `public/autoridade-seo.json`, gerado por
 * `npm run report:autoridade-seo` a partir do HTML realmente renderizado.
 * Nada é estimado no navegador — sem relatório, o painel diz que falta rodar.
 */

interface Termo {
  termo: string;
  ocorrencias: number;
  densidade: number;
}

interface UrlAutoridade {
  url: string;
  slug: string;
  lote: string | null;
  aprovadoEm: string | null;
  titulo: string | null;
  palavras: number;
  termosUteis: number;
  densidadeSemantica: number;
  vocabulario: number;
  keywordPrincipal: Termo;
  topKeywords: Termo[];
  topBigramas: Termo[];
  headings: { h2: number; h3: number };
  schemas: string[];
  linksInternosSaida: number;
  linksSaida: string[];
  linksInternosEntrada: number;
  origensEntrada: string[];
  erro: string | null;
}

interface Relatorio {
  geradoEm: string;
  total: number;
  analisadas: number;
  falhas: number;
  medias: {
    palavras: number;
    densidadeSemantica: number;
    densidadeKeywordPrincipal: number;
    linksInternosSaida: number;
    linksInternosEntrada: number;
  };
  orfas: string[];
  urls: UrlAutoridade[];
}

const dataHora = (v?: string | null) => (v ? new Date(v).toLocaleString("pt-BR") : "—");

/** Faixas de referência editorial (não são metas do Google, são régua interna). */
const faixaSemantica = (v: number) =>
  v >= 55 ? "text-emerald-400" : v >= 45 ? "text-amber-400" : "text-destructive";
/** Densidade de keyword saudável: 0,5%–2,5%. Fora disso, sinaliza. */
const faixaKeyword = (v: number) =>
  v >= 0.5 && v <= 2.5 ? "text-emerald-400" : v > 2.5 ? "text-destructive" : "text-amber-400";

function Kpi({ label, valor, hint }: { label: string; valor: string; hint?: string }) {
  return (
    <Card className="p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{valor}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </Card>
  );
}

export default function AdminAutoridadeSeo() {
  const [dados, setDados] = useState<Relatorio | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [lote, setLote] = useState("todos");
  const [aberta, setAberta] = useState<string | null>(null);

  useEffect(() => {
    fetch("/autoridade-seo.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setDados)
      .catch((e: Error) => setErro(e.message));
  }, []);

  const lotesDisponiveis = useMemo(
    () => ["todos", ...new Set((dados?.urls ?? []).map((u) => u.lote ?? "sem lote"))],
    [dados],
  );

  const linhas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return (dados?.urls ?? [])
      .filter((u) => (lote === "todos" ? true : (u.lote ?? "sem lote") === lote))
      .filter((u) => (termo ? `${u.url} ${u.titulo ?? ""}`.toLowerCase().includes(termo) : true))
      .sort((a, b) => b.densidadeSemantica - a.densidadeSemantica);
  }, [dados, busca, lote]);

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Autoridade SEO</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Densidade semântica, densidade de keywords e malha de links internos das URLs editoriais
          publicadas.{dados ? ` Relatório gerado em ${dataHora(dados.geradoEm)}.` : ""}
        </p>
      </header>

      {erro && (
        <Card className="border-destructive/40 p-4 text-sm">
          Relatório indisponível ({erro}). Rode <code>npm run report:autoridade-seo</code>.
        </Card>
      )}

      {!dados && !erro && <Skeleton className="h-64 w-full" />}

      {dados && (
        <>
          <section className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <Kpi
              label="URLs analisadas"
              valor={`${dados.analisadas}/${dados.total}`}
              hint={dados.falhas ? `${dados.falhas} sem HTML` : "todas renderizadas"}
            />
            <Kpi label="Palavras (média)" valor={String(dados.medias.palavras)} />
            <Kpi
              label="Dens. semântica"
              valor={`${dados.medias.densidadeSemantica}%`}
              hint="vocabulário distinto / termos úteis"
            />
            <Kpi
              label="Dens. keyword-alvo"
              valor={`${dados.medias.densidadeKeywordPrincipal}%`}
              hint="faixa saudável 0,5%–2,5%"
            />
            <Kpi
              label="Links internos"
              valor={`${dados.medias.linksInternosSaida} ↗ / ${dados.medias.linksInternosEntrada} ↘`}
              hint={`${dados.orfas.length} URL(s) sem link de entrada`}
            />
          </section>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por URL ou título"
              className="max-w-xs"
              aria-label="Buscar URL"
            />
            <select
              className="h-9 rounded-md border bg-background px-2 text-sm"
              value={lote}
              onChange={(e) => setLote(e.target.value)}
              aria-label="Filtrar por lote"
            >
              {lotesDisponiveis.map((l) => (
                <option key={l} value={l}>
                  {l === "todos" ? "Todos os lotes" : l}
                </option>
              ))}
            </select>
            <Badge variant="outline">{linhas.length} URL(s)</Badge>
            <Button
              size="sm"
              variant="ghost"
              disabled={!linhas.length}
              onClick={() =>
                exportarCsv(
                  "autoridade-seo",
                  linhas.map((u) => ({
                    url: u.url,
                    lote: u.lote ?? "",
                    palavras: u.palavras,
                    densidadeSemantica: u.densidadeSemantica,
                    keywordPrincipal: u.keywordPrincipal.termo,
                    densidadeKeyword: u.keywordPrincipal.densidade,
                    linksSaida: u.linksInternosSaida,
                    linksEntrada: u.linksInternosEntrada,
                    topKeywords: u.topKeywords.map((t) => `${t.termo} ${t.densidade}%`).join(" | "),
                  })) as unknown as Record<string, unknown>[],
                )
              }
            >
              Exportar CSV
            </Button>
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="p-3">URL</th>
                  <th className="p-3">Lote</th>
                  <th className="p-3">Palavras</th>
                  <th className="p-3">Dens. semântica</th>
                  <th className="p-3">Keyword-alvo</th>
                  <th className="p-3">Links ↗ / ↘</th>
                  <th className="p-3">Schemas</th>
                  <th className="p-3" />
                </tr>
              </thead>
              <tbody>
                {linhas.map((u) => (
                  <>
                    <tr key={u.url} className="border-t align-top">
                      <td className="p-3">
                        <a className="underline" href={u.url} target="_blank" rel="noreferrer">
                          {u.url}
                        </a>
                        <div className="max-w-sm truncate text-xs text-muted-foreground">
                          {u.titulo ?? "—"}
                        </div>
                      </td>
                      <td className="p-3">{u.lote ?? "—"}</td>
                      <td className="p-3">{u.erro ? "—" : u.palavras}</td>
                      <td className={`p-3 font-medium ${faixaSemantica(u.densidadeSemantica)}`}>
                        {u.erro ? "—" : `${u.densidadeSemantica}%`}
                      </td>
                      <td className="p-3">
                        {u.erro ? (
                          "—"
                        ) : (
                          <>
                            <span className={faixaKeyword(u.keywordPrincipal.densidade)}>
                              {u.keywordPrincipal.densidade}%
                            </span>
                            <div className="text-xs text-muted-foreground">
                              {u.keywordPrincipal.ocorrencias}× “{u.keywordPrincipal.termo}”
                            </div>
                          </>
                        )}
                      </td>
                      <td className="p-3">
                        {u.erro ? "—" : `${u.linksInternosSaida} / ${u.linksInternosEntrada}`}
                        {!u.erro && u.linksInternosEntrada === 0 && (
                          <div className="text-xs text-destructive">sem link de entrada</div>
                        )}
                      </td>
                      <td className="p-3 text-xs text-muted-foreground">
                        {u.erro ? u.erro : u.schemas.slice(0, 4).join(", ")}
                      </td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setAberta(aberta === u.url ? null : u.url)}
                        >
                          {aberta === u.url ? "Fechar" : "Detalhar"}
                        </Button>
                      </td>
                    </tr>
                    {aberta === u.url && !u.erro && (
                      <tr key={`${u.url}-detalhe`} className="border-t bg-muted/30">
                        <td colSpan={8} className="p-4">
                          <div className="grid gap-4 md:grid-cols-3">
                            <div>
                              <h2 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                                Top keywords
                              </h2>
                              <ul className="space-y-1 text-xs">
                                {u.topKeywords.map((t) => (
                                  <li key={t.termo} className="flex justify-between gap-2">
                                    <span>{t.termo}</span>
                                    <span className="text-muted-foreground">
                                      {t.ocorrencias}× · {t.densidade}%
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h2 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                                Bigramas (densidade semântica)
                              </h2>
                              <ul className="space-y-1 text-xs">
                                {u.topBigramas.map((t) => (
                                  <li key={t.termo} className="flex justify-between gap-2">
                                    <span>{t.termo}</span>
                                    <span className="text-muted-foreground">
                                      {t.ocorrencias}× · {t.densidade}%
                                    </span>
                                  </li>
                                ))}
                              </ul>
                              <p className="mt-2 text-xs text-muted-foreground">
                                {u.vocabulario} termos distintos · H2 {u.headings.h2} · H3{" "}
                                {u.headings.h3}
                              </p>
                            </div>
                            <div>
                              <h2 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                                Links internos
                              </h2>
                              <p className="text-xs text-muted-foreground">Saída ({u.linksSaida.length}):</p>
                              <ul className="mb-2 space-y-0.5 text-xs">
                                {u.linksSaida.map((l) => (
                                  <li key={l}>
                                    <a className="underline" href={l} target="_blank" rel="noreferrer">
                                      {l}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                              <p className="text-xs text-muted-foreground">
                                Entrada ({u.origensEntrada.length}):
                              </p>
                              <ul className="space-y-0.5 text-xs">
                                {u.origensEntrada.length ? (
                                  u.origensEntrada.map((l) => (
                                    <li key={l}>
                                      <a className="underline" href={l} target="_blank" rel="noreferrer">
                                        {l}
                                      </a>
                                    </li>
                                  ))
                                ) : (
                                  <li className="text-destructive">nenhuma</li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Densidade semântica = termos distintos ÷ termos úteis do conteúdo (stopwords removidas).
            Números vêm do HTML renderizado no build; atualize com{" "}
            <code>npm run report:autoridade-seo</code>.
          </p>
        </>
      )}
    </main>
  );
}
