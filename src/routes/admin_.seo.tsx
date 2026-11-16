import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/seo"];

export const Route = createFileRoute("/admin_/seo")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "SEO por URL | Admin" },
      {
        name: "description",
        content: "Inventário de title, description, canonical e JSON-LD de todas as URLs curadas, com edição auditável.",
      },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: "SEO e jornadas | O Técnico de Informática" },
      { property: "og:description", content: "Painel administrativo de SEO, visitas e vínculos com ordens de serviço." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
