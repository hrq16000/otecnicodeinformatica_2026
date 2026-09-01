import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { exportarCsv } from "@/lib/exportarRelatorio";
import { pingIndexNow } from "@/lib/indexNow";
import { siteConfig } from "@/lib/siteConfig";

/**
 * CAPAS PENDENTES — /admin/capas-pendentes.
 *
 * Mostra, por URL editorial aprovada, o que ainda impede a publicação real.
 * Capa gerada por IA é proibida no projeto: o painel nunca "resolve" a capa,
 * ele expõe o bloqueio para que a foto real/licenciada seja providenciada.
 *
 * "Publicação rápida" só é oferecida quando a URL está PRONTA (aprovada, com
 * capa real e já no sitemap): a ação dispara IndexNow para a URL. Fail-closed —
 * URL bloqueada tem o botão desabilitado com o motivo à vista.
 *
 * Fonte única: `public/capas-pendentes.json` (npm run report:capas-pendentes).
 */

interface UrlCapa {
  slug: string;
  url: string;
  status: string;
  approvedAt: string | null;
  capa: string | null;
  imageOrigin: string;
  imageLicense: string | null;
  imageAttribution: string | null;
  naOnda: boolean;
  noSitemap: boolean;
  bloqueios: string[];
  pronta: boolean;
}

interface Relatorio {
  geradoEm: string;
  total: number;
  aprovadas: number;
  semCapa: number;
  prontasForaDoSitemap: number;
  urls: UrlCapa[];
}

type Filtro = "bloqueadas" | "sem-capa" | "prontas" | "todas";

const dataHora = (v?: string | null) => (v ? new Date(v).toLocaleString("pt-BR") : "—");

function Kpi({ label, valor, hint }: { label: string; valor: string; hint?: string }) {
  return (
    <Card className="p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{valor}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </Card>
  );
}

export default function AdminCapasPendentes() {
  const [dados, setDados] = useState<Relatorio | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("bloqueadas");
  const [enviando, setEnviando] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  useEffect(() => {
    let vivo = true;
    fetch("/capas-pendentes.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j) => vivo && setDados(j))
      .catch(() => vivo && setErro("Relatório ausente. Rode `npm run report:capas-pendentes`."));
    return () => {
      vivo = false;
    };
  }, []);

  const lista = useMemo(() => {
    const todas = dados?.urls ?? [];
    const porFiltro = todas.filter((u) => {
      if (filtro === "todas") return true;
      if (filtro === "prontas") return u.pronta;
      if (filtro === "sem-capa") return !u.capa;
      return !u.pronta;
    });
    const q = busca.trim().toLowerCase();
    return q ? porFiltro.filter((u) => u.slug.includes(q) || u.bloqueios.join(" ").toLowerCase().includes(q)) : porFiltro;
  }, [dados, filtro, busca]);

  async function publicar(u: UrlCapa) {
    setEnviando(u.slug);
    const res = await pingIndexNow(`${siteConfig.baseUrl}${u.url}`);
    setEnviando(null);
    setFeedback((f) => ({
      ...f,
      [u.slug]: res.ok ? "IndexNow enviado" : `Falhou: ${res.error}`,
    }));
  }

  if (erro) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-semibold">Capas pendentes</h1>
        <Card className="mt-4 p-4 text-sm text-muted-foreground">{erro}</Card>
      </div>
    );
  }

  if (!dados) {
    return (
      <div className="mx-auto max-w-6xl space-y-4 p-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-3 sm:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-semibold">Capas pendentes</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerado em {dataHora(dados.geradoEm)}. Capa precisa ser foto real (própria ou licenciada) —
          imagem gerada por IA é bloqueada por política do portal.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-4">
        <Kpi label="URLs no registro" valor={String(dados.total)} />
        <Kpi label="Aprovadas" valor={String(dados.aprovadas)} />
        <Kpi label="Aprovadas sem capa" valor={String(dados.semCapa)} hint="não entram no sitemap" />
        <Kpi
          label="Prontas fora do sitemap"
          valor={String(dados.prontasForaDoSitemap)}
          hint="rode sync:editorial-sitemap"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {(["bloqueadas", "sem-capa", "prontas", "todas"] as Filtro[]).map((f) => (
          <Button key={f} size="sm" variant={filtro === f ? "default" : "outline"} onClick={() => setFiltro(f)}>
            {f}
          </Button>
        ))}
        <Input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar slug ou bloqueio"
          className="h-9 max-w-xs"
        />
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            exportarCsv(
              "capas-pendentes",
              lista.map((u) => ({
                url: u.url,
                status: u.status,
                capa: u.capa ?? "",
                origem: u.imageOrigin,
                sitemap: u.noSitemap ? "sim" : "nao",
                bloqueios: u.bloqueios.join(" | "),
              })),
            )
          }
        >
          Exportar CSV
        </Button>
      </div>

      <div className="space-y-3">
        {lista.length === 0 && (
          <Card className="p-4 text-sm text-muted-foreground">Nada neste filtro.</Card>
        )}
        {lista.map((u) => (
          <Card key={u.slug} className="p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <a
                    href={u.url}
                    className="truncate font-medium underline-offset-4 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {u.url}
                  </a>
                  <Badge variant={u.status === "approved" ? "default" : "secondary"}>{u.status}</Badge>
                  {u.pronta ? (
                    <Badge className="bg-emerald-600 text-white">pronta</Badge>
                  ) : (
                    <Badge variant="destructive">bloqueada</Badge>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Capa: {u.capa ?? "ausente"} · origem: {u.imageOrigin}
                  {u.imageLicense ? ` · licença: ${u.imageLicense}` : ""}
                  {u.noSitemap ? " · no sitemap" : " · fora do sitemap"}
                </p>
                {u.bloqueios.length > 0 && (
                  <ul className="mt-2 list-inside list-disc text-xs text-destructive">
                    {u.bloqueios.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <Button
                  size="sm"
                  disabled={!u.pronta || enviando === u.slug}
                  onClick={() => publicar(u)}
                  title={u.pronta ? "Dispara IndexNow para esta URL" : "Resolva os bloqueios antes"}
                >
                  {enviando === u.slug ? "Enviando…" : "Publicação rápida"}
                </Button>
                {feedback[u.slug] && (
                  <span className="text-xs text-muted-foreground">{feedback[u.slug]}</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
