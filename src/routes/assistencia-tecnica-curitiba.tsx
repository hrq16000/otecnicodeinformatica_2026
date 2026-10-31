import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";
import { robotsContent } from "@/lib/indexingPolicy";

const RouteComponent = legacyRouteElements["/assistencia-tecnica-curitiba"];

export const Route = createFileRoute("/assistencia-tecnica-curitiba")({
  // Indexação explícita mesmo no primeiro SSR de uma rota lazy.
  head: () => ({ meta: [{ name: "robots", content: robotsContent(true) }] }),
  component: RouteComponent,
});
