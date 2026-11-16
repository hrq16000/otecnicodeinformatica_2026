import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const respondToOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input:unknown)=>z.object({ id: z.string().uuid(), expectedUpdatedAt: z.string(), text: z.string().trim().min(1).max(4000) }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: admin, error: roleError } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (roleError || !admin) throw new Error("Acesso administrativo necessário");
    const { data: order, error } = await context.supabase.from("ordens_servico").select("etapas,updated_at").eq("id", data.id).single();
    if (error || !order) throw new Error("Ordem indisponível");
    if (order.updated_at !== data.expectedUpdatedAt) throw new Error("Ordem alterada; atualize a lista antes de responder");
    const at = new Date().toISOString();
    const etapas = [...(Array.isArray(order.etapas) ? order.etapas : []), { metric: "responded", at, titulo: "Resposta do atendimento", em: at, detalhe: data.text }];
    const { data: saved, error: saveError } = await context.supabase.from("ordens_servico")
      .update({ etapas, observacoes_publicas: data.text, updated_at: at })
      .eq("id", data.id).eq("updated_at", order.updated_at).select("id").maybeSingle();
    if (saveError || !saved) throw new Error("Resposta não salva; atualize a ordem e tente novamente");
    return { etapas, observacoes_publicas: data.text, updated_at: at };
  });