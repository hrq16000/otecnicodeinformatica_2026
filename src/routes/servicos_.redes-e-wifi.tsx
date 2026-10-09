import { createFileRoute } from "@tanstack/react-router";
import { JsonLdSsrSink } from "@/lib/jsonLdSsr";
import ServicoCore from "@/pages/servicos/ServicoCore";

const RouteComponent = () => (
  <>
    <ServicoCore slug="redes-e-wifi" />
    <JsonLdSsrSink />
  </>
);

export const Route = createFileRoute("/servicos_/redes-e-wifi")({
  component: RouteComponent,
});
