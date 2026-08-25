import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/prado-velho"];

export const Route = createFileRoute("/bairros_/prado-velho")({
  component: RouteComponent,
});
