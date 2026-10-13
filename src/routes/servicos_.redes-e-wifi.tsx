import { createFileRoute } from "@tanstack/react-router";
import { lazyPaginaComJsonLd } from "@/lib/lazyPaginaComJsonLd";

// Página própria do slug: o registry global não é carregado nesta rota.
// JSON-LD continua no segmento SSR da página resolvida.
const RouteComponent = lazyPaginaComJsonLd(() => import("@/pages/servicos/RedesWifiCore"));

export const Route = createFileRoute("/servicos_/redes-e-wifi")({
  component: RouteComponent,
});
