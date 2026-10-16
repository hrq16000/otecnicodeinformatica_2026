import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";
import { ATENDIMENTO_REMOTO_DESCRIPTION } from "@/lib/seo/atendimentoRemotoMeta";

const RouteComponent = legacyRouteElements["/atendimento-remoto"];

export const Route = createFileRoute("/atendimento-remoto")({
  // Emitir já no head da rota evita perda intermitente no primeiro SSR/cold start.
  head: () => ({ meta: [{ name: "description", content: ATENDIMENTO_REMOTO_DESCRIPTION }] }),
  component: RouteComponent,
});
