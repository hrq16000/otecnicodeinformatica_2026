import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/parceiro"];

export const Route = createFileRoute("/parceiro")({
  component: RouteComponent,
});
