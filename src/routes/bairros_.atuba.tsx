import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/atuba"];

export const Route = createFileRoute("/bairros_/atuba")({
  component: RouteComponent,
});
