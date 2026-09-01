import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/glossario"];

export const Route = createFileRoute("/glossario")({
  component: RouteComponent,
});
