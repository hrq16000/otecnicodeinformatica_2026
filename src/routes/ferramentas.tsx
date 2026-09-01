import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/ferramentas"];

export const Route = createFileRoute("/ferramentas")({
  component: RouteComponent,
});
