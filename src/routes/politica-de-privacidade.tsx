import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/politica-de-privacidade"];

export const Route = createFileRoute("/politica-de-privacidade")({
  // SSR: react-helmet/useCanonical no componente legado só ajustava o head
  // após a hidratação. Crawlers e redirects precisam do canonical no HTML inicial.
  head: () => ({
    links: [{ rel: "canonical", href: "https://otecnicodeinformatica.com.br/politica-de-privacidade" }],
  }),
  component: RouteComponent,
});
