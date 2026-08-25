import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/bairros"];

export const Route = createFileRoute("/admin_/bairros")({
  component: RouteComponent,
});
