import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/bairros_/.vila-maria-antonieta-pinhais")({
  beforeLoad: () => {
    throw redirect({
      to: "/bairros/maria-antonieta",
      statusCode: 301,
    });
  },
});
