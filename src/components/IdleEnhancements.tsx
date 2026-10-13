import { lazy, Suspense, useEffect, useState } from "react";

const WhatsAppChatbot = lazy(() =>
  import("@/components/WhatsAppChatbot").then((m) => ({ default: m.WhatsAppChatbot })),
);
const SocialProofProvider = lazy(() =>
  import("@/components/social-proof").then((m) => ({ default: m.SocialProofProvider })),
);
const GA4ChecklistPanel = lazy(() =>
  import("@/components/GA4ChecklistPanel").then((m) => ({ default: m.GA4ChecklistPanel })),
);
const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })),
);
const Sonner = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })),
);

export const IdleEnhancements = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let activated = false;

    const activate = () => {
      if (activated) return;
      activated = true;
      setEnabled(true);
    };
    const scheduleIdle = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(activate, { timeout: 2000 });
      } else {
        idleId = globalThis.setTimeout(activate, 1000) as unknown as number;
      }
    };

    const timerId = globalThis.setTimeout(scheduleIdle, 6000) as unknown as number;
    window.addEventListener("pointerdown", activate, { once: true, passive: true });
    window.addEventListener("keydown", activate, { once: true });

    return () => {
      globalThis.clearTimeout(timerId);
      window.removeEventListener("pointerdown", activate);
      window.removeEventListener("keydown", activate);
      if (idleId !== undefined) {
        if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
        else globalThis.clearTimeout(idleId);
      }
    };
  }, []);

  if (!enabled) return null;

  return (
    <Suspense fallback={null}>
      <Toaster />
      <Sonner />
      <WhatsAppChatbot />
      <SocialProofProvider />
      <GA4ChecklistPanel />
    </Suspense>
  );
};

export default IdleEnhancements;
