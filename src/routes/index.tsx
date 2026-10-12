import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/"];

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{
      rel: "preload",
      as: "image",
      href: "/fotos/bancada-tecnica-768.avif",
      imageSrcSet: "/fotos/bancada-tecnica-480.avif 480w, /fotos/bancada-tecnica-768.avif 768w, /fotos/bancada-tecnica-1024.avif 1024w",
      imageSizes: "(max-width: 1023px) calc(100vw - 34px), 768px",
      media: "(max-width: 1023px)",
      fetchPriority: "high",
    }],
  }),
  component: RouteComponent,
});
