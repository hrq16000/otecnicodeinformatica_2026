import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/pedido"];

export const Route = createFileRoute("/pedido")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Acompanhar pedido e falar com o técnico | O Técnico de Informática" },
      {
        name: "description",
        content: "Acompanhe seu pedido de conserto, envie fotos do equipamento e converse direto com a equipe técnica.",
      },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: "Acompanhar pedido | O Técnico de Informática" },
      { property: "og:description", content: "Converse com a equipe técnica e envie fotos do seu equipamento." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
