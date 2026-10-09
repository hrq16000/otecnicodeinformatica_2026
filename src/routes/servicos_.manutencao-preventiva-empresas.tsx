import { createFileRoute } from "@tanstack/react-router";
import { JsonLdSsrSink } from "@/lib/jsonLdSsr";
import ServicoCore from "@/pages/servicos/ServicoCore";

const RouteComponent = () => (
  <>
    <ServicoCore slug="manutencao-preventiva-empresas" />
    <JsonLdSsrSink />
  </>
);

export const Route = createFileRoute("/servicos_/manutencao-preventiva-empresas")({
  component: RouteComponent,
});
