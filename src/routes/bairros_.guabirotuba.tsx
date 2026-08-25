import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/guabirotuba"];

export const Route = createFileRoute("/bairros_/guabirotuba")({
  component: RouteComponent,
});
