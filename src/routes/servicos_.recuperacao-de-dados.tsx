import { createFileRoute } from "@tanstack/react-router";
import { JsonLdSsrSink } from "@/lib/jsonLdSsr";
import ServicoCore from "@/pages/servicos/ServicoCore";

const RouteComponent = () => (
  <>
    <ServicoCore slug="recuperacao-de-dados" />
    <JsonLdSsrSink />
  </>
);

export const Route = createFileRoute("/servicos_/recuperacao-de-dados")({
  component: RouteComponent,
});
