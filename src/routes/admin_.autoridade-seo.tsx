import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/autoridade-seo"];

export const Route = createFileRoute("/admin_/autoridade-seo")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Autoridade SEO | Admin" },
      {
        name: "description",
        content:
          "Densidade semântica, densidade de keywords e links internos das URLs editoriais publicadas.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});
