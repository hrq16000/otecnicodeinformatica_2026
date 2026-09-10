import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

/**
 * HEALTHCHECK SEO — widget de /admin/seo.
 *
 * Fonte única: `public/seo-healthcheck.json`, escrito por
 * `npm run report:seo-healthcheck` a partir do inventário do HTML SSR real.
 * Sem arquivo, o widget diz "não verificado" — nunca afirma saúde.
 */

interface Item {
  path: string;
  motivo?: string;
  canonical?: string | null;
  schemas?: string[];
  curada?: boolean;
}

interface Healthcheck {
  geradoEm: string;
  base: string;
  totalUrls: number;
  resumo: {
    urlsQuebradas: number;
    semHtmlNoBuild?: number;
    canonicoIncorreto: number;
    schemaInvalido: number;
    orfas: number | null;
    criticos: number;
    status: string;
  };
  problemas: {
    urlsQuebradas: Item[];
    semHtmlNoBuild?: Item[];
    canonicoIncorreto: Item[];
    schemaInvalido: Item[];
    orfas: Item[] | null;
  };
}

const GRUPOS: Array<{ chave: keyof Healthcheck["problemas"]; titulo: string }> = [
  { chave: "urlsQuebradas", titulo: "URLs quebradas (sem HTML servido)" },
  { chave: "canonicoIncorreto", titulo: "Canônicos incorretos" },
  { chave: "semHtmlNoBuild", titulo: "Sem HTML prerenderizado (informativo)" },
  { chave: "schemaInvalido", titulo: "Erros de schema (JSON-LD)" },
  { chave: "orfas", titulo: "Páginas órfãs (sem link de entrada)" },
];

export function SeoHealthcheckPanel() {
  const [dados, setDados] = useState<Healthcheck | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;
    fetch("/seo-healthcheck.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((j) => ativo && setDados(j))
      .catch((e) => ativo && setErro(String(e.message ?? e)));
    return () => {
      ativo = false;
    };
  }, []);

  if (erro || !dados) {
    return (
      <Card className="p-4">
        <h2 className="text-lg font-semibold">Healthcheck de publicação</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {erro
            ? `Não verificado (${erro}). Rode "npm run report:seo-healthcheck" após a publicação.`
            : "Carregando…"}
        </p>
      </Card>
    );
  }

  const r = dados.resumo;

  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold">Healthcheck de publicação</h2>
        <Badge variant={r.criticos === 0 ? "default" : "destructive"}>{r.status}</Badge>
        <span className="text-xs text-muted-foreground">
          {dados.totalUrls} URL(s) curadas · gerado em {new Date(dados.geradoEm).toLocaleString("pt-BR")}
        </span>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-4">
        {[
          ["Quebradas", r.urlsQuebradas],
          ["Canônico", r.canonicoIncorreto],
          ["Schema", r.schemaInvalido],
          ["Órfãs", r.orfas],
        ].map(([label, valor]) => (
          <div key={String(label)} className="rounded-md border border-border p-3">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
            <div className={`text-xl font-semibold ${Number(valor) > 0 ? "text-destructive" : ""}`}>
              {valor === null ? "—" : String(valor)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {GRUPOS.map(({ chave, titulo }) => {
          const itens = dados.problemas[chave];
          if (!itens || itens.length === 0) return null;
          return (
            <div key={chave}>
              <div className="text-sm font-medium">
                {titulo} <span className="text-muted-foreground">({itens.length})</span>
              </div>
              <ul className="mt-1 space-y-1 text-xs">
                {itens.slice(0, 12).map((i) => (
                  <li key={`${chave}-${i.path}`} className="flex flex-wrap gap-x-2 text-muted-foreground">
                    <code className="text-foreground">{i.path}</code>
                    {i.motivo && <span>— {i.motivo}</span>}
                  </li>
                ))}
                {itens.length > 12 && <li className="text-muted-foreground">+ {itens.length - 12} outra(s)…</li>}
              </ul>
            </div>
          );
        })}
        {r.criticos === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhuma URL quebrada, canônico divergente ou schema faltando nesta publicação.
          </p>
        )}
      </div>
    </Card>
  );
}
