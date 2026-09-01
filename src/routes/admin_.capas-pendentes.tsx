import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/capas-pendentes"];

export const Route = createFileRoute("/admin_/capas-pendentes")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Capas pendentes | Admin" },
      {
        name: "description",
        content:
          "URLs editoriais aprovadas sem capa real e o que bloqueia a publicação de cada uma.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});
