import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/decisoes/:slug"];

export const Route = createFileRoute("/decisoes_/$slug")({
  component: RouteComponent,
});
