import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/conserto-impressora-3d"];

export const Route = createFileRoute("/servicos_/conserto-impressora-3d")({
  component: RouteComponent,
});
