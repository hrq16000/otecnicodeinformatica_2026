import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/afirmacoes"];

export const Route = createFileRoute("/admin_/afirmacoes")({
  component: RouteComponent,
});
