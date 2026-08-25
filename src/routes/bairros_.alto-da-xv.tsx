import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/alto-da-xv"];

export const Route = createFileRoute("/bairros_/alto-da-xv")({
  component: RouteComponent,
});
