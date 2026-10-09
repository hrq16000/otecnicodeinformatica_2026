import { createFileRoute } from "@tanstack/react-router";
import { JsonLdSsrSink } from "@/lib/jsonLdSsr";
import ServicoCore from "@/pages/servicos/ServicoCore";

const RouteComponent = () => (
  <>
    <ServicoCore slug="upgrade-ssd-ram" />
    <JsonLdSsrSink />
  </>
);

export const Route = createFileRoute("/servicos_/upgrade-ssd-ram")({
  component: RouteComponent,
});
