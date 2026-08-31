import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/publicacoes-pendentes"];

export const Route = createFileRoute("/admin_/publicacoes-pendentes")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Publicações pendentes | Admin" },
      {
        name: "description",
        content: "URLs aprovadas editorialmente que ainda aguardam confirmação de publicação e indexação.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});
