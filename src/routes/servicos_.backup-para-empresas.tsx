import { createFileRoute } from "@tanstack/react-router";
import { JsonLdSsrSink } from "@/lib/jsonLdSsr";
import ServicoCore from "@/pages/servicos/ServicoCore";

const RouteComponent = () => (
  <>
    <ServicoCore slug="backup-para-empresas" />
    <JsonLdSsrSink />
  </>
);

export const Route = createFileRoute("/servicos_/backup-para-empresas")({
  component: RouteComponent,
});
