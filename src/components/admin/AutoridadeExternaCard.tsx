import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface Fonte {
  source_url: string;
  publisher: string | null;
  status: number | null;
  estado: string;
  redirecionado: boolean;
  origens: string[];
}

interface Perfil {
  plataforma: string;
  estado: string;
  prioridade: string;
  acao: string;
}

interface Snapshot {
  gerado_em: string;
  perfis: Perfil[];
  same_as: { aprovados: string[]; politica: string };
  backlinks_5b: { referringDomains: number; backlinks: number; authorityScore: number; classificacao: string };
  fontes_citadas: Fonte[];
  resumo: Record<string, number>;
}

/**
 * Painel "Autoridade externa" (Rodada 5C): estado dos perfis oficiais,
 * saúde dos links externos citados e baseline de backlinks da 5B.
 * Somente leitura — nenhuma ação de outreach é disparada daqui.
 */
export const AutoridadeExternaCard = () => {
  const [dados, setDados] = useState<Snapshot | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetch("/external-authority.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((d: Snapshot) => setDados(d))
      .catch(() => setErro("Snapshot ausente. Rode: npm run report:external-authority"));
  }, []);

  if (erro) {
    return (
      <Card className="p-5 text-sm text-muted-foreground" data-testid="autoridade-externa">
        {erro}
      </Card>
    );
  }
  if (!dados) {
    return <Card className="skel h-40" data-testid="autoridade-externa" aria-busy="true" />;
  }

  const problemas = dados.fontes_citadas.filter((f) => f.estado !== "OK");

  return (
    <Card className="p-5" data-testid="autoridade-externa">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold">Autoridade externa</h2>
        <span className="text-xs text-muted-foreground">
          Snapshot de {new Date(dados.gerado_em).toLocaleString("pt-BR")}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        {[
          ["Links externos", dados.resumo["links_verificados"] ?? 0],
          ["Quebrados", dados.resumo["quebrados"] ?? 0],
          ["Perfis pendentes", dados.resumo["p1_pendentes"] ?? 0],
          ["Domínios de referência", dados.backlinks_5b.referringDomains],
        ].map(([label, valor]) => (
          <div key={String(label)} className="rounded-lg border border-border p-3">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-2xl font-semibold tabular-nums">{valor}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-5 text-sm font-semibold">Perfis oficiais</h3>
      <ul className="mt-2 space-y-2 text-sm">
        {dados.perfis.map((p) => (
          <li key={p.plataforma} className="rounded-lg border border-border p-3">
            <span className="font-medium">{p.plataforma}</span>{" "}
            <span className="text-xs text-muted-foreground">
              · {p.estado} · {p.prioridade}
            </span>
            <p className="mt-1 text-muted-foreground">{p.acao}</p>
          </li>
        ))}
      </ul>

      <h3 className="mt-5 text-sm font-semibold">
        Links externos com atenção ({problemas.length})
      </h3>
      {problemas.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Todas as referências citadas responderam com sucesso.
        </p>
      ) : (
        <ul className="mt-2 space-y-1 text-sm">
          {problemas.slice(0, 20).map((f) => (
            <li key={f.source_url} className="text-muted-foreground">
              <span className="font-mono text-xs">{f.estado}</span>{" "}
              {f.status ? `(${f.status}) ` : ""}
              <span className="break-all">{f.source_url}</span>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        sameAs aprovados: {dados.same_as.aprovados.length}. {dados.same_as.politica}
      </p>
    </Card>
  );
};

export default AutoridadeExternaCard;
