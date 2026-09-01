import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/biblioteca"];

export const Route = createFileRoute("/admin_/biblioteca")({
  component: RouteComponent,
});
