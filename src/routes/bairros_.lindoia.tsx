import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/lindoia"];

export const Route = createFileRoute("/bairros_/lindoia")({
  component: RouteComponent,
});
