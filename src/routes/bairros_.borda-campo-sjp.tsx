import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/bairros_/borda-campo-sjp")({
  beforeLoad: () => {
    throw redirect({
      to: "/bairros/borda-do-campo-sjp",
      statusCode: 301,
    });
  },
});
