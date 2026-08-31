import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/ondas"];

export const Route = createFileRoute("/admin_/ondas")({
  component: RouteComponent,
});
