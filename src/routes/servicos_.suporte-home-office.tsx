import { createFileRoute } from "@tanstack/react-router";
import { JsonLdSsrSink } from "@/lib/jsonLdSsr";
import ServicoCore from "@/pages/servicos/ServicoCore";

const RouteComponent = () => (
  <>
    <ServicoCore slug="suporte-home-office" />
    <JsonLdSsrSink />
  </>
);

export const Route = createFileRoute("/servicos_/suporte-home-office")({
  component: RouteComponent,
});
