import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/parceiros"];

export const Route = createFileRoute("/admin_/parceiros")({
  component: RouteComponent,
});
