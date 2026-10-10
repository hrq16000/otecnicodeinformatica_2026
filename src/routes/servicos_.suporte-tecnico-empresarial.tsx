import { createFileRoute } from "@tanstack/react-router";
import { lazyPaginaComJsonLd } from "@/lib/lazyPaginaComJsonLd";

// Carrega somente a página visitada, sem o registro geral de rotas.
// O sink permanece após a página resolvida para SSR em isolate frio e quente.
const RouteComponent = lazyPaginaComJsonLd(() =>
  import("@/pages/servicos/SuporteTecnicoEmpresarialCore"),
);

export const Route = createFileRoute("/servicos_/suporte-tecnico-empresarial")({
  component: RouteComponent,
});
