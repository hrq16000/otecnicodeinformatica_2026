import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/fanny"];

export const Route = createFileRoute("/bairros_/fanny")({
  component: RouteComponent,
});
