import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/depoimentos"];

export const Route = createFileRoute("/admin_/depoimentos")({
  component: RouteComponent,
});
