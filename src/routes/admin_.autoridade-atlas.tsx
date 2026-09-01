import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/autoridade-atlas"];

export const Route = createFileRoute("/admin_/autoridade-atlas")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Autoridade do Atlas | Admin" },
      {
        name: "description",
        content:
          "Densidade semântica e mapa de conexões do hub Atlas de Informática e seus destinos.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});
