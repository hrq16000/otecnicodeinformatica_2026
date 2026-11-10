import { lazy, Suspense, useEffect, useRef, useState } from "react";

/**
 * Bootstrap pequeno do funil: evita carregar todo o formulário antes de
 * alguém solicitar atendimento, sem perder os CTAs nem o buffer pré-hidratação.
 * O WhatsAppFunnel original continua responsável por validar/salvar o lead.
 */
const FullFunnel = lazy(() =>
  import("@/components/WhatsAppFunnel").then(({ WhatsAppFunnel }) => ({
    default: WhatsAppFunnel,
  })),
);

type QueuedOpen = { location?: string; message?: string };
type FunnelWindow = Window & {
  __waFunnelQueue?: QueuedOpen[];
  __lastCtaLocation?: string;
};
const hashes = new Set(["#agendamento", "#agendar", "#triagem"]);

function Ready({ refReady }: { refReady: { current: boolean } }) {
  useEffect(() => {
    refReady.current = true;
    return () => { refReady.current = false; };
  }, [refReady]);
  return null;
}

export function DeferredWhatsAppFunnel() {
  const [requested, setRequested] = useState(false);
  const ready = useRef(false);

  useEffect(() => {
    const w = window as FunnelWindow;
    const enqueue = (location = "programmatic", message?: string) => {
      const queue = (w.__waFunnelQueue ??= []);
      // O formulário original drena a primeira intenção sem duplicar eventos.
      if (queue.length === 0) queue.push({ location, message });
      setRequested(true);
    };
    const whatsAppUrl = (raw?: string | null) => {
      if (!raw) return null;
      try {
        const url = new URL(raw, window.location.origin);
        return ["wa.me", "api.whatsapp.com"].some(
          (host) => url.hostname === host || url.hostname.endsWith(`.${host}`),
        ) ? url : null;
      } catch { return null; }
    };
    const onIntent = (event: Event) => {
      if (ready.current) return; // O formulário completo já possui listener.
      const detail = (event as CustomEvent<QueuedOpen>).detail ?? {};
      enqueue(detail.location ?? "programmatic", detail.message);
    };
    const onClick = (event: MouseEvent) => {
      if (ready.current) return;
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (anchor?.dataset.funnelSkip === "1") return;
      const href = anchor?.getAttribute("href");
      const whatsapp = whatsAppUrl(href);
      if (whatsapp) {
        event.preventDefault();
        event.stopPropagation();
        const location =
          anchor?.closest<HTMLElement>("[data-cta-location]")?.dataset.ctaLocation ??
          (anchor?.closest("header") ? "header" : anchor?.closest("footer") ? "footer" : "cta");
        enqueue(location, whatsapp.searchParams.get("text") ?? undefined);
        return;
      }
      const cta = target?.closest<HTMLElement>('[data-wa-funnel="required"]');
      if (cta) {
        if (anchor) event.preventDefault();
        enqueue(cta.dataset.ctaLocation ?? "float");
      }
      if (href && hashes.has(href.toLowerCase())) setRequested(true);
    };
    const onHash = () => {
      if (hashes.has(window.location.hash.toLowerCase())) setRequested(true);
    };

    // Antes da hidratação, o script do head já pode ter recebido cliques.
    if (w.__waFunnelQueue?.length) setRequested(true);
    onHash();
    try {
      if (sessionStorage.getItem("wa-funnel:deeplink-ctx")) setRequested(true);
    } catch { /* storage opcional */ }

    // window.open é protegido desde o bootstrap, inclusive antes do modal
    // pesado resolver o chunk. Nunca permitir escape direto para wa.me.
    const nativeOpen = window.open.bind(window);
    window.open = ((url?: string | URL, target?: string, features?: string) => {
      if (!ready.current) {
        const whatsapp = whatsAppUrl(url?.toString());
        if (whatsapp) {
          enqueue(w.__lastCtaLocation ?? "programmatic", whatsapp.searchParams.get("text") ?? undefined);
          return null;
        }
      }
      return nativeOpen(url, target, features);
    }) as typeof window.open;

    window.addEventListener("wa-funnel:open", onIntent);
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("wa-funnel:open", onIntent);
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick, true);
      window.open = nativeOpen;
    };
  }, []);

  if (!requested) return null;
  return (
    <Suspense
      fallback={
        <div role="status" aria-live="polite"
          className="fixed bottom-20 right-4 z-[100] rounded-xl bg-card px-4 py-3 text-sm text-foreground shadow-lg">
          Carregando triagem…
        </div>
      }
    >
      <FullFunnel />
      <Ready refReady={ready} />
    </Suspense>
  );
}

export default DeferredWhatsAppFunnel;
