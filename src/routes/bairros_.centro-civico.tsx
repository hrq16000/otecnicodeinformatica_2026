import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/centro-civico"];

export const Route = createFileRoute("/bairros_/centro-civico")({
  component: RouteComponent,
});
