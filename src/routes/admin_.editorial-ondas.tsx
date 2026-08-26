import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/editorial-ondas"];

export const Route = createFileRoute("/admin_/editorial-ondas")({
  component: RouteComponent,
});
