import { lazy, Suspense, useEffect, useState } from "react";

// Recursos auxiliares globais são carregados independentemente do catálogo
// de centenas de páginas. Não importar legacyRouteElements no shell raiz.
const WhatsAppChatbot = lazy(() => import("@/components/WhatsAppChatbot").then((m) => ({ default: m.WhatsAppChatbot })));
const SocialProofProvider = lazy(() => import("@/components/social-proof").then((m) => ({ default: m.SocialProofProvider })));
const GA4ChecklistPanel = lazy(() => import("@/components/GA4ChecklistPanel").then((m) => ({ default: m.GA4ChecklistPanel })));
const Toaster = lazy(() => import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })));

export const RootIdleEnhancements = () => {
  const [enabled, setEnabled] = useState(false);
  const [extrasReady, setExtrasReady] = useState(false);

  useEffect(() => {
    const activate = () => setEnabled(true);
    const idleId: number = typeof window.requestIdleCallback === "function"
      ? window.requestIdleCallback(activate, { timeout: 4500 })
      : (globalThis.setTimeout(activate, 2500) as unknown as number);
    const extrasTimer = window.setTimeout(() => setExtrasReady(true), 8500);
    return () => {
      window.clearTimeout(extrasTimer);
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      } else {
        globalThis.clearTimeout(idleId);
      }
    };
  }, []);

  if (!enabled) return null;

  return (
    <Suspense fallback={null}>
      <Toaster />
      <Sonner />
      {extrasReady && (
        <>
          <WhatsAppChatbot />
          <SocialProofProvider />
          {typeof window !== "undefined" && window.location.pathname.startsWith("/admin/") && (
            <GA4ChecklistPanel />
          )}
        </>
      )}
    </Suspense>
  );
};
