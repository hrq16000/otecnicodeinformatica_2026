import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/termos-e-condicoes"];

export const Route = createFileRoute("/termos-e-condicoes")({
  // O alias precisa de meta description no HTML inicial, independentemente
  // da hidratação do componente legado. PageSEO não a duplica nesta rota.
  head: () => ({
    meta: [{ name: "description", content: "Ponto único de termos, condições, valores e prazos: visita técnica de inspeção a partir de R$ 99,99 por 30 min." }],
  }),
  component: RouteComponent,
});
