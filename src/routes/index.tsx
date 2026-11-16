import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/"];

export const Route = createFileRoute("/")({
  component: RouteComponent,
  head: () => ({ meta: [
    { title: "O Técnico de Informática | Assistência e suporte" },
    { name: "description", content: "Descreva o problema do computador e encontre o próximo passo para assistência técnica e suporte em Curitiba e região." },
    { property: "og:title", content: "O Técnico de Informática | Assistência e suporte" },
    { property: "og:description", content: "Orientação para problemas de computadores, assistência técnica e suporte em Curitiba e região." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
});
