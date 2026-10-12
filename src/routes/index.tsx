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
        href: "/fotos/bancada-tecnica-768.avif",
        imageSrcSet: "/fotos/bancada-tecnica-480.avif 480w, /fotos/bancada-tecnica-768.avif 768w, /fotos/bancada-tecnica-1280.avif 1280w",
        imageSizes: "(max-width: 1023px) calc(100vw - 34px), 768px",
        media: "(max-width: 1023px)",
        fetchPriority: "high",
      },
    ],
  }),
  component: RouteComponent,
});
