import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/butiatuvinha"];

export const Route = createFileRoute("/bairros_/butiatuvinha")({
  component: RouteComponent,
});
