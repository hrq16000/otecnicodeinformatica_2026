import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/bairros_/jardim-claudia-ii-pinhais")({
  beforeLoad: () => {
    throw redirect({
      to: "/bairros/jardim-claudia",
      statusCode: 301,
    });
  },
});
