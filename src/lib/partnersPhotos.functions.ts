import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Assina (link temporário de 1 hora) caminhos internos do bucket privado
 * "parceiros" para exibição em páginas públicas. Feito no servidor com o
 * cliente privilegiado: o público não precisa (e não tem) permissão de
 * leitura direta na pasta — cada foto é entregue por URL assinada.
 */
export const assinarFotos = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        paths: z.array(z.string().min(1).max(300)).min(1).max(30),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: assinadas } = await supabaseAdmin.storage
      .from("parceiros")
      .createSignedUrls(data.paths, 60 * 60);

    const mapa: Record<string, string> = {};
    for (const item of assinadas ?? []) {
      if (item.signedUrl && item.path) mapa[item.path] = item.signedUrl;
    }
    return mapa;
  });
