import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/bairros_/thomaz-coelho-ii")({
  beforeLoad: () => {
    throw redirect({
      to: "/bairros/thomaz-coelho",
      statusCode: 301,
    });
  },
});
