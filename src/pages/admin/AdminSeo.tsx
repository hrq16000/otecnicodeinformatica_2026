import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { siteConfig } from "@/lib/siteConfig";

/**
 * PAINEL SEO POR URL — /admin/seo.
 *
 * Inventário: `public/seo-inventory.json` (gerado por `npm run seo:inventory`
 * a partir do HTML SSR real). Ajustes: tabela `seo_overrides` no backend, com
 * trilha de auditoria campo a campo em `seo_overrides_audit`.
 *
 * Nada é estimado no navegador: quando não há HTML no build, a linha aparece
 * marcada como "sem HTML" em vez de exibir metadata inventada.
 */

interface UrlSeo {
  path: string;
  sitemap: string;
  tipo: string;
  semHtml: boolean;
  title: string | null;
  description: string | null;
  canonical: string | null;
  robots: string | null;
  schemas: string[];
  avisos: string[];
  completude: number | null;
}

interface Inventario {
  geradoEm: string;
  total: number;
  comHtml: number;
  comAviso: number;
  urls: UrlSeo[];
}

interface Override {
  path: string;
  title: string | null;
  description: string | null;
  jsonld: unknown | null;
  canonical: string | null;
  noindex: boolean;
  updated_at?: string;
}

type Estado = "idle" | "salvando" | "salvo" | "erro";

function Kpi({ label, valor, hint }: { label: string; valor: string; hint?: string }) {
  return (
    <Card className="p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{valor}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </Card>
  );
}

const TIPOS = ["todos", "pilar", "servico", "artigo", "guia", "glossario", "ferramenta", "problema", "solucao", "equipamento", "bairro", "regiao"] as const;

export default function AdminSeo() {
  const [inv, setInv] = useState<Inventario | null>(null);
  const [erroInv, setErroInv] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<Record<string, Override>>({});
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]>("todos");
  const [somentePendentes, setSomentePendentes] = useState(false);
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const [rascunho, setRascunho] = useState<Override | null>(null);
  const [jsonTexto, setJsonTexto] = useState("");
  const [jsonErro, setJsonErro] = useState<string | null>(null);
  const [estado, setEstado] = useState<Estado>("idle");
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    fetch("/seo-inventory.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setInv)
      .catch((e) => setErroInv(`Inventário indisponível (${e.message}). Rode "npm run seo:inventory".`));
  }, []);

  useEffect(() => {
    supabase
      .from("seo_overrides")
      .select("path,title,description,jsonld,canonical,noindex,updated_at")
      .then(({ data }) => {
        if (!data) return;
        setOverrides(Object.fromEntries((data as Override[]).map((o) => [o.path, o])));
      });
  }, []);

  const linhas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return (inv?.urls ?? []).filter((u) => {
      if (tipo !== "todos" && u.tipo !== tipo) return false;
      if (termo && !u.path.toLowerCase().includes(termo) && !(u.title ?? "").toLowerCase().includes(termo)) return false;
      if (somentePendentes && u.avisos.length === 0 && !u.semHtml) return false;
      return true;
    });
  }, [inv, busca, tipo, somentePendentes]);

  function abrir(u: UrlSeo) {
    const atual = overrides[u.path];
    setSelecionada(u.path);
    setEstado("idle");
    setMensagem(null);
    setJsonErro(null);
    setRascunho({
      path: u.path,
      title: atual?.title ?? u.title ?? "",
      description: atual?.description ?? u.description ?? "",
      jsonld: atual?.jsonld ?? null,
      canonical: atual?.canonical ?? u.canonical ?? "",
      noindex: atual?.noindex ?? /noindex/i.test(u.robots ?? ""),
    });
    setJsonTexto(atual?.jsonld ? JSON.stringify(atual.jsonld, null, 2) : "");
  }

  async function salvar() {
    if (!rascunho) return;
    let jsonld: unknown = null;
    if (jsonTexto.trim()) {
      try {
        jsonld = JSON.parse(jsonTexto);
      } catch (e) {
        setJsonErro(e instanceof Error ? e.message : "JSON inválido");
        return;
      }
    }
    if (!rascunho.title?.trim() || !rascunho.description?.trim()) {
      if (!window.confirm("Title ou description vazios. Salvar mesmo assim?")) return;
    }
    setEstado("salvando");
    const { data: sessao } = await supabase.auth.getUser();
    const userId = sessao.user?.id ?? null;
    const anterior = overrides[rascunho.path];
    const registro = {
      path: rascunho.path,
      title: rascunho.title?.trim() || null,
      description: rascunho.description?.trim() || null,
      jsonld: jsonld as never,
      canonical: rascunho.canonical?.trim() || null,
      noindex: rascunho.noindex,
      updated_by: userId,
    };
    const { error } = await supabase.from("seo_overrides").upsert(registro, { onConflict: "path" });
    if (error) {
      setEstado("erro");
      setMensagem(error.message);
      return;
    }
    const campos: [string, string | null, string | null][] = [
      ["title", anterior?.title ?? null, registro.title],
      ["description", anterior?.description ?? null, registro.description],
      ["canonical", anterior?.canonical ?? null, registro.canonical],
      ["noindex", String(anterior?.noindex ?? false), String(registro.noindex)],
      ["jsonld", anterior?.jsonld ? JSON.stringify(anterior.jsonld) : null, jsonld ? JSON.stringify(jsonld) : null],
    ];
    const auditoria = campos
      .filter(([, a, b]) => (a ?? "") !== (b ?? ""))
      .map(([campo, valor_anterior, valor_novo]) => ({
        path: rascunho.path,
        campo,
        valor_anterior,
        valor_novo,
        changed_by: userId,
      }));
    if (auditoria.length) await supabase.from("seo_overrides_audit").insert(auditoria);

    setOverrides((prev) => ({ ...prev, [rascunho.path]: { ...registro, jsonld, updated_at: new Date().toISOString() } }));
    setEstado("salvo");
    setMensagem(`${auditoria.length} campo(s) atualizados sem recarregar o portal.`);
  }

  async function restaurarPadrao() {
    if (!rascunho) return;
    if (!window.confirm("Remover o override e voltar à metadata derivada do código?")) return;
    setEstado("salvando");
    const { error } = await supabase.from("seo_overrides").delete().eq("path", rascunho.path);
    if (error) {
      setEstado("erro");
      setMensagem(error.message);
      return;
    }
    setOverrides((prev) => {
      const copia = { ...prev };
      delete copia[rascunho.path];
      return copia;
    });
    setEstado("salvo");
    setMensagem("Override removido — a página volta à metadata padrão no próximo build.");
    setSelecionada(null);
  }

  const atual = inv?.urls.find((u) => u.path === selecionada) ?? null;

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-semibold">SEO por URL</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Inventário do HTML SSR real + ajustes auditáveis de title, description e JSON-LD. Alterações salvam sem recarregar o portal;
        a aplicação no HTML ocorre na próxima publicação.
      </p>

      {erroInv && <Card className="mt-4 border-destructive/40 p-4 text-sm text-destructive">{erroInv}</Card>}

      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        <Kpi label="URLs" valor={String(inv?.total ?? 0)} hint={inv ? `gerado em ${new Date(inv.geradoEm).toLocaleString("pt-BR")}` : "—"} />
        <Kpi label="Com HTML" valor={String(inv?.comHtml ?? 0)} hint="lidas do build SSR" />
        <Kpi label="Com aviso" valor={String(inv?.comAviso ?? 0)} hint="metadata incompleta" />
        <Kpi label="Overrides" valor={String(Object.keys(overrides).length)} hint="ajustes salvos no backend" />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Input className="max-w-xs" placeholder="Buscar por slug ou título" value={busca} onChange={(e) => setBusca(e.target.value)} />
        {TIPOS.map((t) => (
          <Button key={t} size="sm" variant={tipo === t ? "default" : "outline"} onClick={() => setTipo(t)}>
            {t}
          </Button>
        ))}
        <Button size="sm" variant={somentePendentes ? "default" : "outline"} onClick={() => setSomentePendentes((v) => !v)}>
          Só pendências
        </Button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-3 py-2">URL</th>
                <th className="px-3 py-2">Tipo</th>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Completude</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {linhas.map((u) => (
                <tr
                  key={u.path}
                  className={`cursor-pointer border-t border-border/60 hover:bg-muted/40 ${selecionada === u.path ? "bg-muted/60" : ""}`}
                  onClick={() => abrir(u)}
                >
                  <td className="px-3 py-2 font-mono text-xs">{u.path}</td>
                  <td className="px-3 py-2">{u.tipo}</td>
                  <td className="max-w-[22rem] truncate px-3 py-2">{overrides[u.path]?.title ?? u.title ?? "—"}</td>
                  <td className="px-3 py-2">{u.completude === null ? "—" : `${u.completude}%`}</td>
                  <td className="px-3 py-2">
                    {u.semHtml ? (
                      <Badge variant="outline">sem HTML</Badge>
                    ) : u.avisos.length ? (
                      <Badge variant="destructive">{u.avisos.length} aviso(s)</Badge>
                    ) : (
                      <Badge variant="secondary">ok</Badge>
                    )}
                    {overrides[u.path] && <Badge className="ml-1">override</Badge>}
                  </td>
                </tr>
              ))}
              {linhas.length === 0 && (
                <tr>
                  <td className="px-3 py-6 text-muted-foreground" colSpan={5}>
                    Nenhuma URL no filtro atual.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>

        <Card className="h-fit p-4">
          {!rascunho || !atual ? (
            <p className="text-sm text-muted-foreground">Selecione uma URL para editar title, description e JSON-LD.</p>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="font-mono text-xs text-muted-foreground">{rascunho.path}</div>
                <a
                  className="text-xs underline"
                  href={`${siteConfig.baseUrl}${rascunho.path}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  abrir no site
                </a>
              </div>

              {atual.avisos.length > 0 && (
                <ul className="rounded-md border border-destructive/40 p-2 text-xs text-destructive">
                  {atual.avisos.map((a) => (
                    <li key={a}>• {a}</li>
                  ))}
                </ul>
              )}

              <label className="block text-sm">
                Title
                <Input value={rascunho.title ?? ""} onChange={(e) => setRascunho({ ...rascunho, title: e.target.value })} />
                <span className={`text-xs ${(rascunho.title ?? "").length > 60 ? "text-destructive" : "text-muted-foreground"}`}>
                  {(rascunho.title ?? "").length}/60
                </span>
              </label>

              <label className="block text-sm">
                Description
                <Textarea
                  rows={3}
                  value={rascunho.description ?? ""}
                  onChange={(e) => setRascunho({ ...rascunho, description: e.target.value })}
                />
                <span className={`text-xs ${(rascunho.description ?? "").length > 160 ? "text-destructive" : "text-muted-foreground"}`}>
                  {(rascunho.description ?? "").length}/160
                </span>
              </label>

              <label className="block text-sm">
                Canonical
                <Input value={rascunho.canonical ?? ""} onChange={(e) => setRascunho({ ...rascunho, canonical: e.target.value })} />
              </label>
              {rascunho.canonical && !rascunho.canonical.startsWith(siteConfig.baseUrl) && (
                <p className="text-xs text-destructive">Canonical fora do domínio canônico — conflita com o sitemap.</p>
              )}

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={rascunho.noindex}
                  onChange={(e) => setRascunho({ ...rascunho, noindex: e.target.checked })}
                />
                Marcar como noindex
              </label>
              {rascunho.noindex && <p className="text-xs text-destructive">Esta URL está no sitemap curado — noindex gera conflito.</p>}

              <label className="block text-sm">
                JSON-LD (opcional — substitui o schema derivado)
                <Textarea
                  rows={8}
                  className="font-mono text-xs"
                  value={jsonTexto}
                  onChange={(e) => {
                    setJsonTexto(e.target.value);
                    setJsonErro(null);
                  }}
                />
              </label>
              {jsonErro && <p className="text-xs text-destructive">JSON inválido: {jsonErro}</p>}
              <p className="text-xs text-muted-foreground">Schemas no HTML atual: {atual.schemas.join(", ") || "nenhum"}</p>

              <div className="rounded-md border border-border p-3">
                <div className="text-xs uppercase text-muted-foreground">Prévia de snippet</div>
                <div className="mt-1 text-sm text-primary">{(rascunho.title ?? "").slice(0, 60) || "—"}</div>
                <div className="text-xs text-muted-foreground">{siteConfig.baseUrl}{rascunho.path}</div>
                <div className="text-xs">{(rascunho.description ?? "").slice(0, 160) || "—"}</div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button onClick={salvar} disabled={estado === "salvando"}>
                  {estado === "salvando" ? "Salvando…" : "Salvar"}
                </Button>
                <Button variant="outline" onClick={restaurarPadrao} disabled={!overrides[rascunho.path]}>
                  Restaurar padrão
                </Button>
              </div>
              {mensagem && <p className={`text-xs ${estado === "erro" ? "text-destructive" : "text-muted-foreground"}`}>{mensagem}</p>}
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
