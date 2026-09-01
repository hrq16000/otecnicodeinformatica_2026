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
    ],
  }),
});
