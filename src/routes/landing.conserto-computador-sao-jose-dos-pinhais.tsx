import { createFileRoute } from "@tanstack/react-router";
import { ConsertoComputadorSJP } from "@/pages/landing/ConsertoComputadorSJP";

export const Route = createFileRoute("/landing/conserto-computador-sao-jose-dos-pinhais")({
  component: ConsertoComputadorSJP,
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
    ],
  }),
});
