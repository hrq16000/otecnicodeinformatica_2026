import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/"];

export const Route = createFileRoute("/")({
  // Imagem principal da dobra mobile: prioridade de download declarada
  // no HTML inicial. Em desktop ela não é exibida (HeroTriagem usa outra).
  head: () => ({
    links: [{
      rel: "preload",
      as: "image",
      href: "/fotos/bancada-tecnica.jpg",
      media: "(max-width: 1023px)",
      fetchPriority: "high",
    }],
  }),
  component: RouteComponent,
});
