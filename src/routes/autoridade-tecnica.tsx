import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/autoridade-tecnica"];

export const Route = createFileRoute("/autoridade-tecnica")({
  component: RouteComponent,
});
