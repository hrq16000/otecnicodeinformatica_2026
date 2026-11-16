import { lazy, Suspense, useEffect, useState } from "react";

// A triagem completa só é necessária após uma intenção real do visitante.
// Seu formulário, diálogos e catálogos não devem ocupar a thread principal
// de todas as páginas durante a primeira pintura/LCP.
const DeferredFunnel = lazy(() =>
  import("@/components/WhatsAppFunnel").then(({ WhatsAppFunnel }) => ({
    default: WhatsAppFunnel,
  })),
);

type FunnelIntent = { location?: string; message?: string };
type FunnelWindow = Window & {
  __waFunnelQueue?: FunnelIntent[];
  __waFunnelBridgeReady?: boolean;
  __lastCtaType?: string;
  __lastCtaLocation?: string;
};

const SCHEDULING_HASHES = new Set(["#agendamento", "#agendar", "#triagem"]);

function isWhatsAppHref(href: string | null | undefined) {
  if (!href) return false;
  try {
    const url = new URL(href, window.location.origin);
    return ["wa.me", "api.whatsapp.com"].some((host) => url.hostname.endsWith(host));
  } catch {
    return false;
  }
}

function getPreset(href: string | null | undefined) {
  if (!href) return undefined;
  try {
    return new URL(href, window.location.origin).searchParams.get("text") || undefined;
  } catch {
    return undefined;
  }
}

function hasSchedulingContext() {
  try {
    const raw = sessionStorage.getItem("wa-funnel:deeplink-ctx");
    if (!raw) return false;
    const ctx = JSON.parse(raw) as { path?: string; savedAt?: number };
    return (
      ctx.path === window.location.pathname &&
      typeof ctx.savedAt === "number" &&
      Date.now() - ctx.savedAt <= 30 * 60 * 1000
    );
  } catch {
    return false;
  }
}

/**
 * Ponte leve de intenção antes do import assíncrono da triagem.
 * A própria triagem assume os handlers assim que estiver montada; nenhum CTA
 * pode navegar direto ao WhatsApp enquanto o chunk ainda está carregando.
 */
export function WhatsAppFunnelOnDemand() {
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    const appWindow = window as FunnelWindow;
    const request = () => setRequested(true);
    const queue = (location: string, message?: string) => {
      (appWindow.__waFunnelQueue ||= []).push({ location, message });
      request();
    };

    if (
      appWindow.__waFunnelQueue?.length ||
      SCHEDULING_HASHES.has(window.location.hash.toLowerCase()) ||
      hasSchedulingContext()
    ) {
      request();
    }

    const onClick = (event: MouseEvent) => {
      if (appWindow.__waFunnelBridgeReady) return;
      const anchor = (event.target as Element | null)?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");

      if (href && SCHEDULING_HASHES.has(href.toLowerCase())) {
        request();
        return;
      }
      if (!isWhatsAppHref(href) || anchor.dataset.funnelSkip === "1") return;

      event.preventDefault();
      event.stopPropagation();

      let location = "cta";
      const ctaLocation = anchor.closest<HTMLElement>("[data-cta-location]")?.dataset.ctaLocation;
      if (ctaLocation) location = ctaLocation;
      else if (anchor.closest("header")) location = "header";
      else if (anchor.closest("footer")) location = "footer";
      else if (anchor.closest("[data-wa-medium]")) {
        location = anchor.closest<HTMLElement>("[data-wa-medium]")?.dataset.waMedium || "cta";
      } else if (anchor.getAttribute("aria-label")?.toLowerCase().includes("whatsapp")) {
        location = "float";
      }
      queue(location, getPreset(href));
    };

    const onOpen = (event: Event) => {
      if (appWindow.__waFunnelBridgeReady) return;
      const detail = (event as CustomEvent<FunnelIntent>).detail || {};
      queue(detail.location || "programmatic", detail.message);
    };

    const onHashChange = () => {
      if (SCHEDULING_HASHES.has(window.location.hash.toLowerCase())) request();
    };

    const originalOpen = window.open.bind(window);
    window.open = ((url?: string | URL, targetName?: string, features?: string) => {
      if (!appWindow.__waFunnelBridgeReady) {
        const href = typeof url === "string" ? url : url?.toString();
        if (isWhatsAppHref(href)) {
          const location =
            appWindow.__lastCtaType === "whatsapp"
              ? appWindow.__lastCtaLocation || "programmatic"
              : "programmatic";
          queue(location, getPreset(href));
          return null;
        }
      }
      return originalOpen(url, targetName, features);
    }) as typeof window.open;

    document.addEventListener("click", onClick, true);
    window.addEventListener("wa-funnel:open", onOpen);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("wa-funnel:open", onOpen);
      window.removeEventListener("hashchange", onHashChange);
      window.open = originalOpen;
    };
  }, []);

  return requested ? (
    <Suspense fallback={<span className="sr-only" role="status">Abrindo atendimento…</span>}>
      <DeferredFunnel />
    </Suspense>
  ) : null;
}
