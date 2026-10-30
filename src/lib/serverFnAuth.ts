import { createMiddleware } from "@tanstack/react-start";

/**
 * Encaminha a sessão às server functions sem carregar o SDK de autenticação
 * em toda visita pública. O token é lido a cada chamada, inclusive após refresh
 * ou logout; a validação de identidade continua no servidor.
 * Mantido fora de integrations/supabase, cujos arquivos são gerados.
 */
export const attachSessionAuth = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return next({
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
);
