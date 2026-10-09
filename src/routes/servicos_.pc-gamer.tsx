import { createFileRoute } from "@tanstack/react-router";
import { JsonLdSsrSink } from "@/lib/jsonLdSsr";
import ServicoCore from "@/pages/servicos/ServicoCore";

const RouteComponent = () => (
  <>
    <ServicoCore slug="pc-gamer" />
    <JsonLdSsrSink />
  </>
);

export const Route = createFileRoute("/servicos_/pc-gamer")({
  component: RouteComponent,
});
