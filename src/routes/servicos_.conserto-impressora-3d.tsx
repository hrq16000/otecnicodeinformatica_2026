import { createFileRoute } from "@tanstack/react-router";
import { JsonLdSsrSink } from "@/lib/jsonLdSsr";
import ServicoCore from "@/pages/servicos/ServicoCore";

const RouteComponent = () => (
  <>
    <ServicoCore slug="conserto-impressora-3d" />
    <JsonLdSsrSink />
  </>
);

export const Route = createFileRoute("/servicos_/conserto-impressora-3d")({
  component: RouteComponent,
});
