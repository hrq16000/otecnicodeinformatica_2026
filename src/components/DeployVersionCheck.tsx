import { useEffect, useState } from "react";
import { APP_BUILD_INFO } from "@/lib/errorReporter";

type Manifest = { version: string; buildTime: string };
type Estado = "verificando" | "ok" | "divergente" | "indisponivel";
/** Camada que respondeu ao pedido do manifesto. */
type Camada = { rotulo: string; detalhe: string };

/** Traduz headers de borda em uma leitura humana: origem, CDN ou cache antigo. */
const classificarCamada = (h: Headers): Camada => {
  const cf = h.get("cf-cache-status");
  const age = Number(h.get("age") ?? "0");
  const via = h.get("x-served-by") ?? h.get("server") ?? "";
  const idade = age > 0 ? `${age}s de cache` : "sem idade de cache";
  if (!cf) return { rotulo: "Origem (sem CDN identificada)", detalhe: `${idade}${via ? ` · ${via}` : ""}` };
  const c = cf.toUpperCase();
  if (c === "HIT") return { rotulo: "CDN — resposta em cache", detalhe: `${idade}${via ? ` · ${via}` : ""}` };
  if (c === "MISS" || c === "EXPIRED" || c === "REVALIDATED")
    return { rotulo: `Origem através da CDN (${c.toLowerCase()})`, detalhe: idade };
  if (c === "DYNAMIC" || c === "BYPASS")
    return { rotulo: "Origem — cache ignorado", detalhe: `${c.toLowerCase()} · ${idade}` };
  return { rotulo: `CDN (${c.toLowerCase()})`, detalhe: idade };
};

/**
 * Verificação automática de identidade do deploy.
 *
 * Compara a versão embutida no bundle carregado pelo navegador
 * (`APP_BUILD_INFO.version` / `window.__APP_VERSION__`) com o manifesto
 * `public/build-version.json` gerado no build e servido sem cache.
 * Divergência = a produção está entregando um bundle diferente do
 * DEPLOY_HEAD (cache antigo, CDN parcial ou deploy incompleto).
 */
export const DeployVersionCheck = () => {
  const runtime =
    (typeof window !== "undefined" &&
      (window as unknown as { __APP_VERSION__?: string }).__APP_VERSION__) ||
    APP_BUILD_INFO.version;
  const [estado, setEstado] = useState<Estado>("verificando");
  const [manifesto, setManifesto] = useState<Manifest | null>(null);

  useEffect(() => {
    let vivo = true;
    fetch(`/build-version.json?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: Manifest) => {
        if (!vivo) return;
        setManifesto(data);
        setEstado(data.version === runtime ? "ok" : "divergente");
      })
      .catch(() => vivo && setEstado("indisponivel"));
    return () => {
      vivo = false;
    };
  }, [runtime]);

  const tom =
    estado === "ok"
      ? "border-emerald-500/40 bg-emerald-500/5"
      : estado === "divergente"
        ? "border-amber-500/50 bg-amber-500/10"
        : "border-border bg-muted/30";

  const titulo = {
    verificando: "Verificando a versão publicada…",
    ok: "✅ Bundle em produção corresponde ao deploy",
    divergente: "⚠️ Bundle divergente do deploy publicado",
    indisponivel: "Manifesto de versão indisponível",
  }[estado];

  return (
    <section className={`rounded-xl border p-4 mb-6 ${tom}`} role="status" aria-live="polite">
      <div className="text-base font-semibold">{titulo}</div>
      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <dt>Bundle carregado</dt>
        <dd>
          <code>{runtime}</code>
        </dd>
        <dt>Deploy publicado</dt>
        <dd>
          <code>{manifesto?.version ?? "—"}</code>
        </dd>
        <dt>Build</dt>
        <dd>
          {manifesto?.buildTime
            ? new Date(manifesto.buildTime).toLocaleString("pt-BR")
            : new Date(APP_BUILD_INFO.buildTime).toLocaleString("pt-BR")}
        </dd>
      </dl>
      {estado === "divergente" && (
        <p className="mt-2 text-sm">
          Recarregue a página com atualização forçada. Se persistir, o deploy não terminou de
          propagar na borda.
        </p>
      )}
    </section>
  );
};
