import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";
import { SITE_BASE_URL } from "@/lib/siteConfig";
import { metaSocial } from "@/lib/socialMeta";

const RouteComponent = legacyRouteElements["/politica-de-privacidade"];
const CANONICAL = `${SITE_BASE_URL}/politica-de-privacidade`;

export const Route = createFileRoute("/politica-de-privacidade")({
  component: RouteComponent,
  head: () => ({
    meta: [
      ...metaSocial({
        titulo: "Política de Privacidade",
        descricao: "Conheça como O Técnico de Informática trata dados pessoais, aplica a LGPD, administra cookies e disponibiliza os direitos de quem utiliza o portal.",
        url: CANONICAL,
        imagem: `${SITE_BASE_URL}/og-image.png`,
      }),
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
});
