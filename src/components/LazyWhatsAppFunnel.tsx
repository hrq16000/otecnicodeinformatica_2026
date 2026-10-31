import { useCallback, useEffect, useState, type ComponentType } from "react";

/**
 * Interceptador mínimo: o formulário completo de triagem só entra no bundle
 * após intenção de contato, sem deixar nenhum WhatsApp escapar pelo intervalo.
 * Preserva buffer pré-hidratação, deep links, anchors WA e window.open.
 */
type BufferedWa = { location?: string; message?: string };
type FunnelModule = ComponentType;
type FunnelWindow = Window & { __waFunnelQueue?: BufferedWa[] };

const AGENDAMENTO_HASH = /^#(?:agendamento|agendar|triagem)$/i;

function isWhatsapp(href?: string | null) {
  if (!href) return false;
  try {
    const host = new URL(href, window.location.origin).hostname.toLowerCase();
    return host === "wa.me" || host.endsWith(".wa.me") ||
      host === "api.whatsapp.com" || host.endsWith(".api.whatsapp.com");
  } catch {
    return false;
  }
}

function needsRestoredTriage() {
  try {
    const raw = sessionStorage.getItem("wa-funnel:deeplink-ctx");
    if (!raw) return false;
    const ctx = JSON.parse(raw) as { path?: string; savedAt?: number };
    return ctx.path === window.location.pathname &&
      typeof ctx.savedAt === "number" &&
      Date.now() - ctx.savedAt < 30 * 60_000;
  } catch {
    return false;
  }
}

export function LazyWhatsAppFunnel() {
  const [requested, setRequested] = useState(false);
  const [Funnel, setFunnel] = useState<FunnelModule | null>(null);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);

  const requestLoad = useCallback(() => setRequested(true), []);

  const queueOpen = useCallback((location: string, message?: string) => {
    const w = window as FunnelWindow;
    if (document.documentElement.dataset.waFunnelReady === "1") return;
    const queue = w.__waFunnelQueue ?? [];
    // Múltiplos listeners do mesmo clique (botão + evento) abrem uma triagem só.
    const previous = queue[queue.length - 1];
    if (!previous || previous.location !== location || previous.message !== message) {
      w.__waFunnelQueue = [...queue, { location, message }].slice(-20);
    }
    setRequested(true);
  }, []);

  useEffect(() => {
    if ((window as FunnelWindow).__waFunnelQueue?.length ||
        AGENDAMENTO_HASH.test(window.location.hash) || needsRestoredTriage()) {
      requestLoad();
    }

    const handleHash = () => {
      if (AGENDAMENTO_HASH.test(window.location.hash)) requestLoad();
    };
    const onWaEvent = (event: Event) => {
      if (document.documentElement.dataset.waFunnelReady === "1") return;
      const details = (event as CustomEvent<{ location?: string; message?: string }>).detail;
      queueOpen(details?.location || "programmatic", details?.message);
    };
    const onClick = (event: MouseEvent) => {
      if (document.documentElement.dataset.waFunnelReady === "1") return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      const href = link?.getAttribute("href");
      if (link && isWhatsapp(href) && link.dataset.funnelSkip !== "1") {
        event.preventDefault();
        event.stopPropagation();
        let message: string | undefined;
        try { message = new URL(href!, window.location.href).searchParams.get("text") || undefined; }
        catch { /* URL inválida: abrir o funil mesmo assim */ }
        queueOpen(link.closest<HTMLElement>("[data-cta-location]")?.dataset.ctaLocation ||
          (link.closest("header") ? "header" : link.closest("footer") ? "footer" : "cta"), message);
        return;
      }
      const marked = target.closest<HTMLElement>('[data-wa-funnel="required"]');
      if (marked) {
        queueOpen(marked.dataset.ctaLocation || "float");
      } else if (link && AGENDAMENTO_HASH.test(href || "")) {
        requestLoad();
      }
    };

    const nativeOpen = window.open.bind(window);
    const safeOpen = ((url?: string | URL, target?: string, features?: string) => {
      const value = typeof url === "string" ? url : url?.toString();
      if (document.documentElement.dataset.waFunnelReady !== "1" && isWhatsapp(value)) {
        let message: string | undefined;
        try { message = new URL(value!, window.location.href).searchParams.get("text") || undefined; }
        catch { /* noop */ }
        queueOpen("programmatic", message);
        return null;
      }
      return nativeOpen(url, target, features);
    }) as typeof window.open;
    window.open = safeOpen;
    document.addEventListener("click", onClick, true);
    window.addEventListener("wa-funnel:open", onWaEvent);
    window.addEventListener("hashchange", handleHash);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("wa-funnel:open", onWaEvent);
      window.removeEventListener("hashchange", handleHash);
      if (window.open === safeOpen) window.open = nativeOpen;
    };
  }, [queueOpen, requestLoad]);

  useEffect(() => {
    if (!requested || Funnel) return;
    let mounted = true;
    import("@/components/WhatsAppFunnel")
      .then(({ WhatsAppFunnel }) => {
        if (mounted) {
          setFunnel(() => WhatsAppFunnel);
          setFailed(false);
        }
      })
      .catch(() => { if (mounted) setFailed(true); });
    return () => { mounted = false; };
  }, [requested, Funnel, retry]);

  if (Funnel) return <Funnel />;
  if (!failed) return null;
  return (
    <div role="alert" className="fixed bottom-20 right-4 z-[120] rounded-lg bg-card p-4 shadow-lg">
      Não foi possível abrir a triagem.
      <button type="button" className="ml-3 underline" onClick={() => { setFailed(false); setRetry((n) => n + 1); }}>
        Tentar novamente
      </button>
    </div>
  );
}
