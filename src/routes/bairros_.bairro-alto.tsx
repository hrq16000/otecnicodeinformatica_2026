import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/bairro-alto"];

export const Route = createFileRoute("/bairros_/bairro-alto")({
  component: RouteComponent,
});
