import { createFileRoute } from "@tanstack/react-router";
import { JsonLdSsrSink } from "@/lib/jsonLdSsr";
import ServicoCore from "@/pages/servicos/ServicoCore";

const RouteComponent = () => (
  <>
    <ServicoCore slug="suporte-tecnico-empresarial" />
    <JsonLdSsrSink />
  </>
);

export const Route = createFileRoute("/servicos_/suporte-tecnico-empresarial")({
  component: RouteComponent,
});
