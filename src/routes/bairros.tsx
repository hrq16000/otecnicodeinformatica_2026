import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros"];

export const Route = createFileRoute("/bairros")({
  component: RouteComponent,
});
