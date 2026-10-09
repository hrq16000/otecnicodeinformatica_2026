import { createFileRoute } from "@tanstack/react-router";
import { JsonLdSsrSink } from "@/lib/jsonLdSsr";
import ServicoCore from "@/pages/servicos/ServicoCore";

const RouteComponent = () => (
  <>
    <ServicoCore slug="manutencao-de-computador" />
    <JsonLdSsrSink />
  </>
);

export const Route = createFileRoute("/servicos_/manutencao-de-computador")({
  component: RouteComponent,
});
