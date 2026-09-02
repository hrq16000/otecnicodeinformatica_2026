import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  gscSnapshot,
  gscDisponivel,
  topPaginas,
  ROTULO_INDEXACAO,
  statusIndexacao,
} from "@/lib/gscSnapshot";

/**
 * STATUS REAL DO GOOGLE SEARCH CONSOLE.
 *
 * Lê exclusivamente o snapshot gerado por `scripts/report-gsc-snapshot.mjs`
 * (propriedade verificada, desempenho de 28 dias, inspeção de URL e sitemaps).
 * Sem snapshot válido, o painel declara indisponibilidade — nunca estima.
 */
export function GscSnapshotPanel() {
  const [busca, setBusca] = useState("");

  const paginas = useMemo(() => {
    const lista = topPaginas(60);
    const termo = busca.trim().toLowerCase();
    if (!termo) return lista;
    return lista.filter(
      (p) => p.caminho.toLowerCase().includes(termo) || p.consultas.some((c) => c.termo.includes(termo)),
    );
  }, [busca]);

  if (!gscDisponivel) {
    return (
      <Card className="p-4 text-sm">
        <h3 className="font-semibold">Search Console</h3>
        <p className="mt-2 text-muted-foreground">
          Snapshot indisponível{gscSnapshot.motivo ? `: ${gscSnapshot.motivo}` : "."} Rode{" "}
          <code>node scripts/report-gsc-snapshot.mjs --inspect</code> com as credenciais do conector.
        </p>
      </Card>
    );
  }

  const { propriedade, periodo, totais, inspecoes, sitemaps, geradoEm } = gscSnapshot;
  const indexadas = inspecoes.filter((i) => i.veredito === "PASS").length;
  const canonicoOk = inspecoes.filter(
    (i) => i.canonicoGoogle && i.canonicoDeclarado && i.canonicoGoogle === i.canonicoDeclarado,
  ).length;

  return (
    <section className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-semibold">Status real no Search Console</h3>
            <p className="text-xs text-muted-foreground">
              Propriedade <code>{propriedade?.siteUrl}</code> · período {periodo?.inicio} → {periodo?.fim} ·
              snapshot de {geradoEm ? new Date(geradoEm).toLocaleString("pt-BR") : "—"}
            </p>
          </div>
          <Badge variant="default">dados reais</Badge>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Cliques", totais?.cliques ?? 0],
            ["Impressões", totais?.impressoes ?? 0],
            ["Posição média", totais?.posicao ? totais.posicao.toFixed(1) : "—"],
            ["Páginas com dados", gscSnapshot.paginas.length],
          ].map(([rotulo, valor]) => (
            <div key={String(rotulo)} className="rounded-lg border border-border p-3">
              <dt className="text-xs text-muted-foreground">{rotulo}</dt>
              <dd className="text-lg font-semibold">{valor}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-muted-foreground">{gscSnapshot.limitacoes}</p>
      </Card>

      <Card className="p-4">
        <h4 className="font-semibold">Indexação e canônico (inspeção de URL)</h4>
        <p className="text-xs text-muted-foreground">
          {indexadas}/{inspecoes.length} URLs inspecionadas indexadas · {canonicoOk} com canônico do Google igual
          ao declarado.
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-2">URL</th>
                <th>Veredito</th>
                <th>Cobertura</th>
                <th>Canônico</th>
                <th>Último rastreio</th>
              </tr>
            </thead>
            <tbody>
              {inspecoes.map((i) => {
                const coerente =
                  i.canonicoGoogle && i.canonicoDeclarado ? i.canonicoGoogle === i.canonicoDeclarado : null;
                return (
                  <tr key={i.caminho} className="border-t border-border/60">
                    <td className="py-2 font-mono text-xs">{i.caminho}</td>
                    <td>
                      <Badge variant={i.veredito === "PASS" ? "default" : "outline"}>{i.veredito}</Badge>
                    </td>
                    <td className="text-xs text-muted-foreground">{i.cobertura ?? "—"}</td>
                    <td className="text-xs">
                      {coerente === null ? "—" : coerente ? "coerente" : "divergente"}
                    </td>
                    <td className="text-xs text-muted-foreground">
                      {i.ultimoRastreio ? new Date(i.ultimoRastreio).toLocaleDateString("pt-BR") : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-4">
        <h4 className="font-semibold">Sitemaps enviados</h4>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-2">Sitemap</th>
                <th>URLs</th>
                <th>Erros</th>
                <th>Avisos</th>
                <th>Último download</th>
              </tr>
            </thead>
            <tbody>
              {sitemaps.map((s) => (
                <tr key={s.path} className="border-t border-border/60">
                  <td className="py-2 font-mono text-xs">{s.path.replace(/^https?:\/\/[^/]+/, "")}</td>
                  <td>{s.urlsEnviadas}</td>
                  <td>{s.erros > 0 ? <Badge variant="destructive">{s.erros}</Badge> : 0}</td>
                  <td>{s.avisos}</td>
                  <td className="text-xs text-muted-foreground">
                    {s.ultimoDownload ? new Date(s.ultimoDownload).toLocaleDateString("pt-BR") : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-semibold">Desempenho por URL</h4>
          <Input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Filtrar por URL ou consulta"
            className="max-w-xs"
            aria-label="Filtrar desempenho por URL ou consulta"
          />
        </div>
        <div className="mt-3 space-y-3">
          {paginas.map((p) => (
            <details key={p.url} className="rounded-lg border border-border p-3">
              <summary className="cursor-pointer text-sm">
                <span className="font-mono text-xs">{p.caminho}</span>{" "}
                <Badge variant="outline" className="ml-2">
                  {ROTULO_INDEXACAO[statusIndexacao(p.caminho)]}
                </Badge>
                <span className="ml-2 text-xs text-muted-foreground">
                  {p.impressoes} impressões · {p.cliques} cliques · pos. {p.posicaoMedia ?? "—"}
                </span>
              </summary>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                {p.consultas.map((c) => (
                  <li key={c.termo}>
                    “{c.termo}” — {c.impressoes} impr. · pos. {c.posicao}
                  </li>
                ))}
              </ul>
            </details>
          ))}
          {paginas.length === 0 && <p className="text-sm text-muted-foreground">Nenhuma URL para o filtro.</p>}
        </div>
      </Card>
    </section>
  );
}
