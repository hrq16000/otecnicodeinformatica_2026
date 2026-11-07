import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";
import { ATENDIMENTO_REMOTO_DESCRIPTION } from "@/lib/atendimentoRemotoSeo";

const RouteComponent = legacyRouteElements["/atendimento-remoto"];

export const Route = createFileRoute("/atendimento-remoto")({
  component: RouteComponent,
  // SEO disponível no HTML SSR mesmo enquanto o corpo da rota carrega.
  head: () => ({ meta: [{ name: "description", content: ATENDIMENTO_REMOTO_DESCRIPTION }] }),
});
