import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/glossario/:termo"];

export const Route = createFileRoute("/glossario_/$termo")({
  component: RouteComponent,
});
