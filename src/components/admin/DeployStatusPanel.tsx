import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

/**
 * STATUS REAL DE DEPLOY — widget de /admin/seo.
 *
 * Fonte única: `public/deploy-status.json`, escrito por
 * `npm run report:deploy-status` (smoke test HTTP contra o domínio público).
 * Sem arquivo, o widget diz "não verificado" — nunca afirma publicação.
 */

interface Check {
  nome: string;
  url: string;
  status: number;
  ok: boolean;
  detalhe: string;
}

interface DeployStatus {
  geradoEm: string;
  dominioEsperado: string | null;
  status: string;
  motivo: string;
  checks: Check[];
  build: {
    local: { version: string | null; buildTime: string | null };
    publicado: { version?: string | null; buildTime?: string | null } | null;
    divergencia: string | null;
  };
}

function tom(status: string): "default" | "secondary" | "destructive" | "outline" {
  if (status === "PUBLICADO_ATUAL") return "default";
  if (status === "PUBLICADO_DESATUALIZADO") return "outline";
  if (status === "PENDING_CONFIG") return "secondary";
  return "destructive";
}

export function DeployStatusPanel() {
  const [dados, setDados] = useState<DeployStatus | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;
    fetch("/deploy-status.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((j) => ativo && setDados(j))
      .catch((e) => ativo && setErro(String(e.message ?? e)));
    return () => {
      ativo = false;
    };
  }, []);

  if (erro) {
    return (
      <Card className="p-4">
        <h2 className="text-lg font-semibold">Deploy real</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Não verificado ({erro}). Rode <code className="text-xs">npm run report:deploy-status</code> para gerar
          evidência real do domínio público.
        </p>
      </Card>
    );
  }

  if (!dados) {
    return (
      <Card className="p-4">
        <div role="status" aria-live="polite" className="text-sm text-muted-foreground">
          Carregando status de deploy…
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Deploy real</h2>
        <Badge variant={tom(dados.status)}>{dados.status}</Badge>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{dados.motivo}</p>
      <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Domínio esperado</dt>
          <dd className="font-medium">{dados.dominioEsperado ?? "não configurado"}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Última verificação</dt>
          <dd className="font-medium">{new Date(dados.geradoEm).toLocaleString("pt-BR")}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Build local</dt>
          <dd className="font-medium">{dados.build.local.version ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Build publicado</dt>
          <dd className="font-medium">
            {dados.build.publicado?.version ?? "desconhecido"}
            {dados.build.divergencia && (
              <span className="ml-2 text-destructive">({dados.build.divergencia})</span>
            )}
          </dd>
        </div>
      </dl>
      <ul className="mt-3 space-y-1 text-xs">
        {dados.checks.map((c) => (
          <li key={c.nome} className="flex flex-wrap items-center gap-2">
            <Badge variant={c.ok ? "default" : "destructive"}>{c.ok ? "OK" : "FALHA"}</Badge>
            <span className="font-medium">{c.nome}</span>
            <span className="text-muted-foreground">
              HTTP {c.status} · {c.detalhe}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
