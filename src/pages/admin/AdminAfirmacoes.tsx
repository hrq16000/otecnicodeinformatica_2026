import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { exportarCsv } from "@/lib/exportarRelatorio";
import { supabase } from "@/integrations/supabase/client";
import { RevisaoAfirmacao, type RevisaoRegistro } from "@/components/admin/RevisaoAfirmacao";
import auditoria from "@/data/trustClaimsAudit.json";
import auditoriaConteudo from "@/data/auditoriaConteudo.json";
import {
  desempenhoDaUrl,
  statusIndexacao,
  gscDisponivel,
  ROTULO_INDEXACAO,
  type GscConsulta,
} from "@/lib/gscSnapshot";

/**
 * AFIRMAÇÕES DE CONFIANÇA — /admin/afirmacoes.
 *
 * Inventário editorial (E-E-A-T) de todas as afirmações do copy público,
 * classificadas por `scripts/audit-trust-claims.mjs` e cruzadas com as URLs
 * do sitemap curado por `scripts/report-trust-claims-panel.mjs`.
 *
 * A tela é de LEITURA E ACOMPANHAMENTO: nada é recortado ou apagado aqui.
 * A revisão contínua acontece no ledger (`config/trust-claims-ledger.json`),
 * que permanece a fonte única da classificação.
 */

type Classe = "COMPROVADA" | "INSTITUCIONAL" | "CONDICIONAL" | "REMOVIDA" | "PENDENTE";

const CLASSES: Classe[] = ["COMPROVADA", "INSTITUCIONAL", "CONDICIONAL", "REMOVIDA", "PENDENTE"];

const CLASSE_DESC: Record<Classe, string> = {
  COMPROVADA: "Evidência verificável registrada no ledger.",
  INSTITUCIONAL: "Afirmação genérica, sem promessa específica.",
  CONDICIONAL: "Válida sob condição, que precisa estar explícita no texto.",
  REMOVIDA: "Retirada do conteúdo até existir evidência.",
  PENDENTE: "Sem entrada no ledger — bloqueia o gate de confiança.",
};

const CLASSE_VARIANT: Record<Classe, "default" | "secondary" | "outline" | "destructive"> = {
  COMPROVADA: "default",
  INSTITUCIONAL: "secondary",
  CONDICIONAL: "outline",
  REMOVIDA: "secondary",
  PENDENTE: "destructive",
};

interface Ocorrencia {
  familia: string;
  familiaTitulo: string;
  risco: string;
  arquivo: string;
  linha: number;
  trecho: string;
  classificacao: Classe;
  criterio: string;
  evidencia: string;
  acao: string;
  urls: string[];
}

interface UrlAuditada {
  path: string;
  curada: boolean;
  total: number;
  porClasse: Record<string, number>;
}

const dados = auditoria as unknown as {
  geradoEm: string;
  total: number;
  porClasse: Record<string, number>;
  urlsCuradas: number;
  familias: { id: string; titulo: string; risco: string; total: number }[];
  urls: UrlAuditada[];
  ocorrencias: Ocorrencia[];
};

function Kpi({ label, valor, hint }: { label: string; valor: string; hint?: string }) {
  return (
    <Card className="p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{valor}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </Card>
  );
}

interface ConteudoUrl {
  path: string;
  familiaTitulo: string;
  title: string;
  palavras: number;
  fontesPrimarias: boolean;
  limiteSeguranca: boolean;
  jsonLd: string[];
  ligacoes: Record<string, boolean>;
  alertasTecnicos: string[];
  alertasEditoriais: string[];
  ssr: string;
  status: string;
}

const conteudo = auditoriaConteudo as unknown as {
  geradoEm: string;
  total: number;
  porStatus: Record<string, number>;
  urls: ConteudoUrl[];
};

export default function AdminAfirmacoes() {
  const [aba, setAba] = useState<"afirmacoes" | "urls" | "conteudo">("afirmacoes");
  const [revisoes, setRevisoes] = useState<Record<string, RevisaoRegistro>>({});

  useEffect(() => {
    let ativo = true;
    void supabase
      .from("trust_claim_reviews")
      .select("claim_key,status_revisao,observacao,evidencia,revisado_em")
      .then(({ data }) => {
        if (!ativo || !data) return;
        setRevisoes(Object.fromEntries((data as RevisaoRegistro[]).map((r) => [r.claim_key, r])));
      });
    return () => {
      ativo = false;
    };
  }, []);
  const [busca, setBusca] = useState("");
  const [classe, setClasse] = useState<Classe | "todas">("todas");
  const [familia, setFamilia] = useState<string | "todas">("todas");
  const [somenteCuradas, setSomenteCuradas] = useState(true);

  const ocorrencias = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return dados.ocorrencias.filter((o) => {
      if (classe !== "todas" && o.classificacao !== classe) return false;
      if (familia !== "todas" && o.familia !== familia) return false;
      if (!termo) return true;
      return (
        o.trecho.toLowerCase().includes(termo) ||
        o.arquivo.toLowerCase().includes(termo) ||
        o.urls.some((u) => u.toLowerCase().includes(termo))
      );
    });
  }, [busca, classe, familia]);

  const urls = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return dados.urls.filter((u) => {
      if (somenteCuradas && !u.curada) return false;
      if (classe !== "todas" && !(u.porClasse[classe] > 0)) return false;
      if (!termo) return true;
      return u.path.toLowerCase().includes(termo);
    });
  }, [busca, classe, somenteCuradas]);

  const urlsSemAfirmacao = dados.urls.filter((u) => u.curada && u.total === 0).length;

  const conteudoFiltrado = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return conteudo.urls.filter((u) => {
      if (!termo) return true;
      return u.path.toLowerCase().includes(termo) || (u.title ?? "").toLowerCase().includes(termo);
    });
  }, [busca]);

  return (
    <main className="container mx-auto px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Afirmações de confiança</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Inventário E-E-A-T de todo o copy público, classificado por evidência. Esta tela é de
          acompanhamento: a reclassificação é feita no ledger{" "}
          <code className="text-xs">config/trust-claims-ledger.json</code> e regenerada com{" "}
          <code className="text-xs">npm run report:afirmacoes</code>. Última geração:{" "}
          {dados.geradoEm}.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Kpi label="Afirmações" valor={String(dados.total)} hint={`${dados.familias.length} famílias`} />
        {CLASSES.map((c) => (
          <Kpi key={c} label={c} valor={String(dados.porClasse[c] ?? 0)} hint={CLASSE_DESC[c]} />
        ))}
      </section>

      <section className="mt-6 flex flex-wrap items-center gap-2">
        <Button variant={aba === "afirmacoes" ? "default" : "outline"} size="sm" onClick={() => setAba("afirmacoes")}>
          Afirmações
        </Button>
        <Button variant={aba === "urls" ? "default" : "outline"} size="sm" onClick={() => setAba("urls")}>
          URLs do sitemap ({dados.urlsCuradas})
        </Button>
        <Button variant={aba === "conteudo" ? "default" : "outline"} size="sm" onClick={() => setAba("conteudo")}>
          Conteúdo E-E-A-T ({conteudo.total})
        </Button>
        <Input
          className="w-full max-w-xs"
          placeholder="Buscar trecho, arquivo ou URL"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <Button
          variant={classe === "todas" ? "default" : "outline"}
          size="sm"
          onClick={() => setClasse("todas")}
        >
          Todas as classes
        </Button>
        {CLASSES.map((c) => (
          <Button key={c} variant={classe === c ? "default" : "outline"} size="sm" onClick={() => setClasse(c)}>
            {c}
          </Button>
        ))}
        {aba === "urls" && (
          <Button variant={somenteCuradas ? "default" : "outline"} size="sm" onClick={() => setSomenteCuradas((v) => !v)}>
            {somenteCuradas ? "Somente sitemap" : "Todas as rotas"}
          </Button>
        )}
      </section>

      {aba === "afirmacoes" && (
        <section className="mt-4 flex flex-wrap gap-2">
          <Button variant={familia === "todas" ? "secondary" : "ghost"} size="sm" onClick={() => setFamilia("todas")}>
            Todas as famílias
          </Button>
          {dados.familias.map((f) => (
            <Button
              key={f.id}
              variant={familia === f.id ? "secondary" : "ghost"}
              size="sm"
              title={f.risco}
              onClick={() => setFamilia(f.id)}
            >
              {f.titulo} ({f.total})
            </Button>
          ))}
        </section>
      )}

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {aba === "afirmacoes"
            ? `${ocorrencias.length} afirmações exibidas`
            : aba === "urls"
              ? `${urls.length} URLs exibidas · ${urlsSemAfirmacao} URLs curadas sem afirmação mapeada`
              : `${conteudoFiltrado.length} URLs auditadas · ${conteudo.porStatus["ALERTA_EDITORIAL"] ?? 0} com alerta editorial · ${conteudo.porStatus["ALERTA_TECNICO"] ?? 0} com alerta técnico`}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            aba === "afirmacoes"
              ? exportarCsv(
                  "afirmacoes",
                  ocorrencias.map((o) => ({
                    classificacao: o.classificacao,
                    familia: o.familiaTitulo,
                    arquivo: `${o.arquivo}:${o.linha}`,
                    urls: o.urls.join(" | "),
                    trecho: o.trecho,
                    criterio: o.criterio,
                    evidencia: o.evidencia,
                  })),
                )
              : exportarCsv(
                  "afirmacoes-urls",
                  urls.map((u) => ({
                    url: u.path,
                    sitemap: u.curada ? "sim" : "nao",
                    total: u.total,
                    ...u.porClasse,
                  })),
                )
          }
        >
          Exportar CSV
        </Button>
      </div>

      {aba === "afirmacoes" ? (
        <ul className="mt-4 space-y-3">
          {ocorrencias.map((o, i) => (
            <li key={`${o.arquivo}-${o.linha}-${i}`}>
              <Card className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={CLASSE_VARIANT[o.classificacao]}>{o.classificacao}</Badge>
                  <span className="text-sm font-medium">{o.familiaTitulo}</span>
                  <code className="text-xs text-muted-foreground">
                    {o.arquivo}:{o.linha}
                  </code>
                </div>
                <p className="mt-2 text-sm">{o.trecho}</p>
                {o.criterio && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    <strong>Critério:</strong> {o.criterio}
                  </p>
                )}
                {o.evidencia && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    <strong>Evidência:</strong> {o.evidencia}
                  </p>
                )}
                {o.acao && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    <strong>Ação:</strong> {o.acao}
                  </p>
                )}
                {o.urls.length > 0 && (
                  <p className="mt-2 flex flex-wrap gap-2 text-xs">
                    {o.urls.slice(0, 8).map((u) => (
                      <a key={u} href={u} className="underline underline-offset-2">
                        {u}
                      </a>
                    ))}
                    {o.urls.length > 8 && (
                      <span className="text-muted-foreground">+{o.urls.length - 8}</span>
                    )}
                  </p>
                )}
                <RevisaoAfirmacao
                  claimKey={`${o.arquivo}:${o.linha}:${o.familia}`}
                  arquivo={o.arquivo}
                  linha={o.linha}
                  familia={o.familia}
                  classificacao={o.classificacao}
                  registro={revisoes[`${o.arquivo}:${o.linha}:${o.familia}`]}
                  onSalvo={(r) => setRevisoes((atual) => ({ ...atual, [r.claim_key]: r }))}
                />
              </Card>
            </li>
          ))}
          {ocorrencias.length === 0 && (
            <li className="text-sm text-muted-foreground">Nenhuma afirmação para este filtro.</li>
          )}
        </ul>
      ) : aba === "urls" ? (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                <th className="py-2 pr-4">URL</th>
                <th className="py-2 pr-4">Sitemap</th>
                <th className="py-2 pr-4">Google</th>
                <th className="py-2 pr-4">Impr.</th>
                <th className="py-2 pr-4">Cliques</th>
                <th className="py-2 pr-4">Consultas reais</th>
                <th className="py-2 pr-4">Total</th>
                {CLASSES.map((c) => (
                  <th key={c} className="py-2 pr-4">
                    {c.slice(0, 4)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {urls.map((u) => {
                const perf = desempenhoDaUrl(u.path);
                const status = statusIndexacao(u.path);
                return (
                  <tr key={u.path} className="border-b last:border-0">
                    <td className="py-2 pr-4">
                      <a href={u.path} className="underline underline-offset-2">
                        {u.path}
                      </a>
                    </td>
                    <td className="py-2 pr-4">
                      <Badge variant={u.curada ? "default" : "outline"}>{u.curada ? "curada" : "fora"}</Badge>
                    </td>
                    <td className="py-2 pr-4">
                      <Badge
                        variant={
                          status === "indexada" || status === "com-impressoes"
                            ? "default"
                            : status === "desconhecida"
                              ? "destructive"
                              : "outline"
                        }
                        title={
                          gscDisponivel
                            ? ROTULO_INDEXACAO[status]
                            : "Snapshot do Search Console indisponível"
                        }
                      >
                        {gscDisponivel ? ROTULO_INDEXACAO[status] : "sem snapshot"}
                      </Badge>
                    </td>
                    <td className="py-2 pr-4">{perf?.impressoes ?? "—"}</td>
                    <td className="py-2 pr-4">{perf?.cliques ?? "—"}</td>
                    <td className="max-w-xs py-2 pr-4 text-xs text-muted-foreground">
                      {perf
                        ? perf.consultas
                            .slice(0, 3)
                            .map((c: GscConsulta) => `${c.termo} (pos. ${c.posicao})`)
                            .join(" · ")
                        : "—"}
                    </td>
                    <td className="py-2 pr-4">{u.total}</td>
                    {CLASSES.map((c) => (
                      <td key={c} className="py-2 pr-4">
                        {u.porClasse[c] ?? 0}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {urls.length === 0 && (
            <p className="mt-4 text-sm text-muted-foreground">Nenhuma URL para este filtro.</p>
          )}
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {conteudoFiltrado.map((u) => (
            <li key={u.path}>
              <Card className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={u.status === "OK" ? "default" : "destructive"}>{u.status}</Badge>
                  <Badge variant={u.ssr === "OK" ? "secondary" : "destructive"}>SSR {u.ssr}</Badge>
                  <a href={u.path} className="text-sm font-medium underline underline-offset-2">
                    {u.path}
                  </a>
                  <span className="text-xs text-muted-foreground">{u.familiaTitulo}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{u.title}</p>
                <p className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span>{u.palavras} palavras</span>
                  <span>{u.fontesPrimarias ? "fontes primárias" : "sem fonte primária"}</span>
                  <span>{u.limiteSeguranca ? "limite de segurança" : "sem limite declarado"}</span>
                  <span>JSON-LD: {u.jsonLd.join(", ") || "nenhum"}</span>
                  <span>
                    ligações:{" "}
                    {Object.entries(u.ligacoes)
                      .filter(([, v]) => v)
                      .map(([k]) => k)
                      .join(", ") || "nenhuma"}
                  </span>
                </p>
                {[...u.alertasTecnicos, ...u.alertasEditoriais].length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                    {u.alertasTecnicos.map((a) => (
                      <li key={`t-${a}`}>técnico: {a}</li>
                    ))}
                    {u.alertasEditoriais.map((a) => (
                      <li key={`e-${a}`}>editorial: {a}</li>
                    ))}
                  </ul>
                )}
              </Card>
            </li>
          ))}
          {conteudoFiltrado.length === 0 && (
            <li className="text-sm text-muted-foreground">Nenhuma URL auditada para este filtro.</li>
          )}
        </ul>
      )}
    </main>
  );
}
