import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/"];

export const Route = createFileRoute("/")({
  // A imagem da primeira dobra é o LCP mobile. Descoberta no head antes do
  // parser chegar à figura no corpo; desktop não carrega a foto mobile.
  head: () => ({
    links: [
      {
        rel: "preload",
        as: "image",
        href: "/fotos/bancada-tecnica.jpg",
        media: "(max-width: 1023px)",
        fetchPriority: "high",
      },
    ],
  }),
  component: RouteComponent,
});
