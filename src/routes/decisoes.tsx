import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/decisoes"];

export const Route = createFileRoute("/decisoes")({
  component: RouteComponent,
});
