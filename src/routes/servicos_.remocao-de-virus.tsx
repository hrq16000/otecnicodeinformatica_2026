import { createFileRoute } from "@tanstack/react-router";
import { JsonLdSsrSink } from "@/lib/jsonLdSsr";
import ServicoCore from "@/pages/servicos/ServicoCore";

const RouteComponent = () => (
  <>
    <ServicoCore slug="remocao-de-virus" />
    <JsonLdSsrSink />
  </>
);

export const Route = createFileRoute("/servicos_/remocao-de-virus")({
  component: RouteComponent,
});
