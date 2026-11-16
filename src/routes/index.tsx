import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/"];

export const Route = createFileRoute("/")({
  component: RouteComponent,
  // PageSEO em src/pages/Index.tsx é a única fonte dos metadados da Home.
  // Duplicar og:* aqui faz o gate check:geo reprovar o HTML SSR.
});
