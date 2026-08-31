import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

/**
 * Alias operacional de /admin/conversas — o painel de chat por OS.
 * Mesma tela, mesma autorização admin, sem código de verificação.
 */
const RouteComponent = legacyRouteElements["/admin/conversas"];

export const Route = createFileRoute("/admin_/chat-os")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Chat por OS | Admin" },
      { name: "description", content: "Painel interno de chat por ordem de serviço, com fotos e histórico." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});
