import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { exportarCsv } from "@/lib/exportarRelatorio";
import { pingIndexNow } from "@/lib/indexNow";
import { siteConfig } from "@/lib/siteConfig";
import { GLOSSARIO_TERMOS } from "@/lib/glossarioTecnico";
import { FERRAMENTAS_TECNICAS } from "@/lib/ferramentasTecnicas";
import { GUIAS_DECISAO, DECISOES_REVISADO_EM, cardAtlasDoGuia } from "@/lib/guiasDecisao";

/**
 * BIBLIOTECA TÉCNICA — /admin/biblioteca.
 *
 * Inventário operacional das URLs da biblioteca (glossário, ferramentas e
 * guias de decisão) lido diretamente das fontes únicas do código — sem
 * relatório intermediário, portanto sempre coerente com o que está no ar.
 *
 * A única ação disponível é reenviar a URL ao IndexNow: o painel não edita
 * conteúdo nem altera indexabilidade (isso vive nos gates e no sitemap).
 */

type Grupo = "glossario" | "ferramentas" | "decisoes";

interface Item {
  grupo: Grupo;
  slug: string;
  url: string;
  titulo: string;
  detalhe: string;
  risco?: string;
  fontes: number;
  links: number;
}

const GRUPO_ROTULO: Record<Grupo, string> = {
  glossario: "Glossário",
  ferramentas: "Ferramentas",
  decisoes: "Decisões",
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

export default function AdminBiblioteca() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<Grupo | "todas">("todas");
  const [enviando, setEnviando] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  const itens = useMemo<Item[]>(() => {
    const glossario: Item[] = GLOSSARIO_TERMOS.map((t) => ({
      grupo: "glossario",
      slug: t.slug,
      url: `/glossario/${t.slug}`,
      titulo: t.termo,
      detalhe: t.categoria,
      risco: t.risco,
      fontes: t.fontes?.length ?? 0,
      links: t.links?.length ?? 0,
    }));
    const ferramentas: Item[] = FERRAMENTAS_TECNICAS.map((f) => ({
      grupo: "ferramentas",
      slug: f.slug,
      url: `/ferramentas/${f.slug}`,
      titulo: f.nome,
      detalhe: `${f.passos.length} passo(s)`,
      risco: f.risco,
      fontes: f.fontes?.length ?? 0,
      links: f.links?.length ?? 0,
    }));
    const decisoes: Item[] = GUIAS_DECISAO.map((g) => ({
      grupo: "decisoes",
      slug: g.slug,
      url: `/decisoes/${g.slug}`,
      titulo: g.nomeCurto,
      detalhe: `${g.comoDecidir.length} critério(s) · ${g.perguntas.length} FAQ`,
      risco: cardAtlasDoGuia(g.slug)?.risco,
      fontes: g.fontes?.length ?? 0,
      links: g.links.length,
    }));
    return [...decisoes, ...ferramentas, ...glossario];
  }, []);

  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return itens
      .filter((i) => filtro === "todas" || i.grupo === filtro)
      .filter((i) => !q || i.slug.includes(q) || i.titulo.toLowerCase().includes(q));
  }, [itens, filtro, busca]);

  const semFontes = itens.filter((i) => i.fontes === 0).length;
  const semLinks = itens.filter((i) => i.links === 0).length;

  async function reenviar(item: Item) {
    setEnviando(item.slug);
    const res = await pingIndexNow(`${siteConfig.baseUrl}${item.url}`);
    setEnviando(null);
    setFeedback((f) => ({
      ...f,
      [item.slug]: res.ok ? "IndexNow enviado" : `Falhou: ${res.error}`,
    }));
  }

  async function reenviarLote() {
    setEnviando("__lote__");
    const res = await pingIndexNow(lista.map((i) => `${siteConfig.baseUrl}${i.url}`));
    setEnviando(null);
    setFeedback((f) => ({
      ...f,
      __lote__: res.ok ? `IndexNow enviado para ${lista.length} URL(s)` : `Falhou: ${res.error}`,
    }));
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-semibold">Biblioteca técnica</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Inventário das URLs consultáveis do portal, lido das fontes únicas do código. Revisão
          editorial mais recente: {DECISOES_REVISADO_EM.split("-").reverse().join("/")}.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-4">
        <Kpi label="URLs na biblioteca" valor={String(itens.length + 3)} hint="inclui os 3 hubs" />
        <Kpi label="Guias de decisão" valor={String(GUIAS_DECISAO.length)} />
        <Kpi label="Sem fonte primária" valor={String(semFontes)} hint="revisar citação oficial" />
        <Kpi label="Sem link contextual" valor={String(semLinks)} hint="risco de página órfã" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {(["todas", "decisoes", "ferramentas", "glossario"] as const).map((g) => (
          <Button
            key={g}
            size="sm"
            variant={filtro === g ? "default" : "outline"}
            onClick={() => setFiltro(g)}
          >
            {g === "todas" ? "Todas" : GRUPO_ROTULO[g]}
          </Button>
        ))}
        <Input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por slug ou título"
          className="h-9 max-w-xs"
        />
        <Button size="sm" variant="outline" onClick={reenviarLote} disabled={enviando !== null}>
          Reenviar visíveis ao IndexNow
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            exportarCsv(
              "biblioteca-tecnica",
              lista.map((i) => ({
                grupo: GRUPO_ROTULO[i.grupo],
                slug: i.slug,
                url: i.url,
                titulo: i.titulo,
                risco: i.risco ?? "",
                fontes: i.fontes,
                links: i.links,
              })),
            )
          }
        >
          Exportar CSV
        </Button>
      </div>
      {feedback["__lote__"] && (
        <p className="text-xs text-muted-foreground">{feedback["__lote__"]}</p>
      )}

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="p-3">Grupo</th>
              <th className="p-3">Título</th>
              <th className="p-3">URL</th>
              <th className="p-3">Detalhe</th>
              <th className="p-3">Risco</th>
              <th className="p-3">Fontes</th>
              <th className="p-3">Links</th>
              <th className="p-3">Ação</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((i) => (
              <tr key={i.url} className="border-b border-border/60 align-top">
                <td className="p-3">
                  <Badge variant="outline">{GRUPO_ROTULO[i.grupo]}</Badge>
                </td>
                <td className="p-3 font-medium">{i.titulo}</td>
                <td className="p-3">
                  <a href={i.url} className="text-accent underline-offset-4 hover:underline">
                    {i.url}
                  </a>
                </td>
                <td className="p-3 text-muted-foreground">{i.detalhe}</td>
                <td className="p-3 text-muted-foreground">{i.risco ?? "—"}</td>
                <td className="p-3 text-muted-foreground">{i.fontes}</td>
                <td className="p-3 text-muted-foreground">{i.links}</td>
                <td className="p-3">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={enviando !== null}
                    onClick={() => reenviar(i)}
                  >
                    {enviando === i.slug ? "Enviando…" : "IndexNow"}
                  </Button>
                  {feedback[i.slug] && (
                    <span className="ml-2 text-xs text-muted-foreground">{feedback[i.slug]}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
