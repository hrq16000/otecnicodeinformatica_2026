import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/entidades"];

export const Route = createFileRoute("/entidades")({
  component: RouteComponent,
});
