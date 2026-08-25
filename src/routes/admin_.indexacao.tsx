import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/indexacao"];

export const Route = createFileRoute("/admin_/indexacao")({
  component: RouteComponent,
});
