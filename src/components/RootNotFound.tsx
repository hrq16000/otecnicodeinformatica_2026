import { lazy, Suspense, useEffect } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { REDIRECT_MATRIX } from "@/lib/redirectMatrix";
import { RouteLoader } from "@/components/RouteLoader";

// Mantém a matriz canônica de aliases; a consulta só ocorre em rotas 404.
const legacyNavigateRedirects: Record<string, string> = {
  "/patrocinadores": "/anuncie",
  "/admin": "/admin/funnel",
  "/index": "/",
};
const LegacyNotFound = lazy(() => import("@/pages/NotFound"));

export default function RootNotFound() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const target =
    legacyNavigateRedirects[normalized] ??
    REDIRECT_MATRIX.find((r) => r.from === normalized)?.to;

  useEffect(() => {
    if (target) router.navigate({ to: target, replace: true });
  }, [target, router]);

  if (target) return null;
  return (
    <Suspense fallback={<RouteLoader />}>
      <LegacyNotFound />
    </Suspense>
  );
}
