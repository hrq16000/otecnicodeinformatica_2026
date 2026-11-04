import { createFileRoute } from "@tanstack/react-router";
import ComunidadeNacional from "@/pages/ComunidadeNacional";

export const Route = createFileRoute("/comunidade-nacional")({
  component: ComunidadeNacional,
});
