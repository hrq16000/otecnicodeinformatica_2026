import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/vista-alegre"];

export const Route = createFileRoute("/bairros_/vista-alegre")({
  component: RouteComponent,
});
