import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/conversas"];

export const Route = createFileRoute("/admin_/conversas")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Conversas por OS | Admin" },
      { name: "description", content: "Painel interno de conversas por ordem de serviço." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});
