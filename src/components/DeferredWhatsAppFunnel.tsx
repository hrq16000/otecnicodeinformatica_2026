import { lazy, Suspense, useEffect, useState } from "react";

const WhatsAppFunnel = lazy(() =>
  import("@/components/WhatsAppFunnel").then((m) => ({ default: m.WhatsAppFunnel })),
);

type QueuedOpen = { location?: string; message?: string };

export const DeferredWhatsAppFunnel = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const w = window as Window & { __waFunnelQueue?: QueuedOpen[] };
    const enable = (event?: Event) => {
      if (event?.type === "wa-funnel:open") {
        const detail = (event as CustomEvent<QueuedOpen>).detail ?? {};
        w.__waFunnelQueue = [...(w.__waFunnelQueue ?? []), detail];
      }
      setEnabled(true);
    };

    window.addEventListener("wa-funnel:load", enable);
    window.addEventListener("wa-funnel:open", enable as EventListener);

    if ((w.__waFunnelQueue?.length ?? 0) > 0 || /#(?:agendamento|agendar|triagem)$/i.test(location.hash)) {
      setEnabled(true);
    }

    return () => {
      window.removeEventListener("wa-funnel:load", enable);
      window.removeEventListener("wa-funnel:open", enable as EventListener);
    };
  }, []);

  if (!enabled) return null;
  return (
    <Suspense fallback={null}>
      <WhatsAppFunnel />
    </Suspense>
  );
};

export default DeferredWhatsAppFunnel;
