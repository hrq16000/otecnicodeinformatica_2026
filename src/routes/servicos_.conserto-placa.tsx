import { createFileRoute } from "@tanstack/react-router";
import { JsonLdSsrSink } from "@/lib/jsonLdSsr";
import ServicoCore from "@/pages/servicos/ServicoCore";

const RouteComponent = () => (
  <>
    <ServicoCore slug="conserto-placa" />
    <JsonLdSsrSink />
  </>
);

export const Route = createFileRoute("/servicos_/conserto-placa")({
  component: RouteComponent,
});
