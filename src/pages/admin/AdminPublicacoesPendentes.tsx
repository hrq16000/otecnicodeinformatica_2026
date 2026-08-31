import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { pingIndexNow } from "@/lib/indexNow";
import { exportarCsv } from "@/lib/exportarRelatorio";
import { siteConfig } from "@/lib/siteConfig";

/**
 * PUBLICAÇÕES PENDENTES — /admin/publicacoes-pendentes.
 *
 * Lista URLs aprovadas editorialmente que ainda NÃO estão confirmadas no ar
 * (sem veredito PUBLICADO no Search Console, fora do sitemap dinâmico ou com
 * erro de publicação). Fonte única: `public/editorial-lotes.json`, gerado por
 * `npm run report:editorial-lotes`. Nada é estimado aqui.
 *
 * Ação rápida: liberação automática = disparo de IndexNow para a(s) URL(s)
 * selecionada(s), que é a única publicação que pode partir do navegador.
 * A entrada no sitemap e a submissão ao Search Console seguem no job diário.
 */

interface UrlLote {
  wave: string;
  batch: string;
  lote: string;
  url: string;
  slug: string;
  cluster: string;
  aprovado: boolean;
  noSitemap: boolean;
  status: "PUBLICADO" | "PENDENTE" | "ERRO" | "RASCUNHO";
  veredito: string;
  estadoBusca: string;
  publishedAt: string;
  ultimaAtualizacao: string | null;
  submetidoIndexNow: boolean;
  submetidoSitemap: boolean;
  httpStatus: number | null;
  erros: string[];
}

interface Consolidado {
  geradoEm: string;
  fonte: { gscDisponivel: boolean };
  urls: UrlLote[];
}

const dataHora = (v?: string | null) => (v ? new Date(v).toLocaleString("pt-BR") : "—");

const COR: Record<string, string> = {
  PENDENTE: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  ERRO: "bg-destructive/15 text-destructive border-destructive/30",
  RASCUNHO: "bg-muted text-muted-foreground border-border",
};

export default function AdminPublicacoesPendentes() {
  const [dados, setDados] = useState<Consolidado | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [selecao, setSelecao] = useState<string[]>([]);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    fetch("/editorial-lotes.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setDados)
      .catch((e: Error) => setErro(e.message));
  }, []);

  const pendentes = useMemo(
    () => (dados?.urls ?? []).filter((u) => u.aprovado && u.status !== "PUBLICADO"),
    [dados],
  );

  const alternar = (url: string) =>
    setSelecao((s) => (s.includes(url) ? s.filter((u) => u !== url) : [...s, url]));

  async function liberar(urls: string[]) {
    if (!urls.length) return;
    setEnviando(true);
    const absolutas = urls.map((u) => `${siteConfig.baseUrl}${u}`);
    const r = await pingIndexNow(absolutas);
    setEnviando(false);
    if (r.ok) toast.success(`IndexNow disparado para ${urls.length} URL(s).`);
    else toast.error(`Falha no IndexNow: ${r.error}`);
  }

  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Publicações pendentes</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          URLs aprovadas editorialmente que ainda não têm confirmação de publicação.
          {dados ? ` Relatório gerado em ${dataHora(dados.geradoEm)}.` : ""}
        </p>
      </header>

      {erro && (
        <Card className="border-destructive/40 p-4 text-sm">
          Relatório indisponível ({erro}). Rode <code>npm run report:editorial-lotes</code>.
        </Card>
      )}

      {!dados && !erro && <Skeleton className="h-56 w-full" />}

      {dados && (
        <>
          {!dados.fonte.gscDisponivel && (
            <Card className="mb-4 border-amber-500/40 p-4 text-sm">
              Search Console sem credenciais neste ambiente: o veredito de indexação aparece como
              UNKNOWN e a URL permanece listada como pendente.
            </Card>
          )}

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge variant="outline">{pendentes.length} pendente(s)</Badge>
            <Button
              size="sm"
              disabled={enviando || pendentes.length === 0}
              onClick={() => void liberar(pendentes.map((u) => u.url))}
            >
              Liberar todas (IndexNow)
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={enviando || selecao.length === 0}
              onClick={() => void liberar(selecao)}
            >
              Liberar selecionadas ({selecao.length})
            </Button>
            <Button
              size="sm"
              variant="ghost"
              disabled={pendentes.length === 0}
              onClick={() => exportarCsv("publicacoes-pendentes", pendentes as unknown as Record<string, unknown>[])}
            >
              Exportar CSV
            </Button>
          </div>

          {pendentes.length === 0 ? (
            <Card className="p-6 text-sm text-muted-foreground">
              Nenhuma URL aprovada aguardando publicação.
            </Card>
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="p-3" />
                    <th className="p-3">URL</th>
                    <th className="p-3">Lote</th>
                    <th className="p-3">Aprovada em</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Sitemap</th>
                    <th className="p-3">IndexNow</th>
                    <th className="p-3">Observações</th>
                    <th className="p-3">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {pendentes.map((u) => (
                    <tr key={u.url} className="border-t align-top">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          aria-label={`Selecionar ${u.url}`}
                          checked={selecao.includes(u.url)}
                          onChange={() => alternar(u.url)}
                        />
                      </td>
                      <td className="p-3">
                        <a className="underline" href={u.url} target="_blank" rel="noreferrer">
                          {u.url}
                        </a>
                        <div className="text-xs text-muted-foreground">{u.cluster}</div>
                      </td>
                      <td className="p-3">{u.lote}</td>
                      <td className="p-3">{u.publishedAt}</td>
                      <td className="p-3">
                        <Badge variant="outline" className={COR[u.status] ?? ""}>
                          {u.status}
                        </Badge>
                        <div className="text-xs text-muted-foreground">{u.estadoBusca}</div>
                      </td>
                      <td className="p-3">{u.noSitemap ? "sim" : "não"}</td>
                      <td className="p-3">{u.submetidoIndexNow ? "sim" : "não"}</td>
                      <td className="p-3 text-xs text-muted-foreground">
                        {u.erros.length ? u.erros.join("; ") : u.httpStatus ? `HTTP ${u.httpStatus}` : "—"}
                      </td>
                      <td className="p-3">
                        <Button size="sm" variant="outline" disabled={enviando} onClick={() => void liberar([u.url])}>
                          Liberar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            A entrada no sitemap dinâmico e a submissão ao Search Console rodam no job diário
            (<code>submit:onda-10c</code> → <code>indexnow:editorial</code> →{" "}
            <code>report:editorial-verdicts</code>). O botão acima apenas antecipa o IndexNow.
          </p>
        </>
      )}
    </main>
  );
}
