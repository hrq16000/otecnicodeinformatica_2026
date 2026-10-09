import { createFileRoute } from "@tanstack/react-router";
import { JsonLdSsrSink } from "@/lib/jsonLdSsr";
import ServicoCore from "@/pages/servicos/ServicoCore";

const RouteComponent = () => (
  <>
    <ServicoCore slug="montagem-de-pc" />
    <JsonLdSsrSink />
  </>
);

export const Route = createFileRoute("/servicos_/montagem-de-pc")({
  component: RouteComponent,
});
