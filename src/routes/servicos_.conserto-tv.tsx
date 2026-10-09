import { createFileRoute } from "@tanstack/react-router";
import { JsonLdSsrSink } from "@/lib/jsonLdSsr";
import ServicoCore from "@/pages/servicos/ServicoCore";

const RouteComponent = () => (
  <>
    <ServicoCore slug="conserto-tv" />
    <JsonLdSsrSink />
  </>
);

export const Route = createFileRoute("/servicos_/conserto-tv")({
  component: RouteComponent,
});
