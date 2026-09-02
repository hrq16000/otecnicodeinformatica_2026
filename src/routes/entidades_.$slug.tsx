import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/entidades/:slug"];

export const Route = createFileRoute("/entidades_/$slug")({
  component: RouteComponent,
});
