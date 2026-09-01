import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/ferramentas/:slug"];

export const Route = createFileRoute("/ferramentas_/$slug")({
  component: RouteComponent,
});
