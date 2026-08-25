import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/campina-do-siqueira"];

export const Route = createFileRoute("/bairros_/campina-do-siqueira")({
  component: RouteComponent,
});
