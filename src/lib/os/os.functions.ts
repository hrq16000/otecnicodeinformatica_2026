import { createServerFn } from "@tanstack/react-start";

/**
 * Consulta pública de OS pelo código único.
 *
 * Só devolve campos operacionais (status, prazo, observações públicas).
 * Nenhum dado pessoal — nome, telefone, endereço e sintomas ficam fora da
 * resposta, porque o código sozinho não é uma credencial forte.
 */
export const consultarOsPorProtocolo = createServerFn({ method: "POST" })
  .inputValidator((input: { protocolo: string }) => ({
    protocolo: String(input?.protocolo ?? "").trim().toUpperCase(),
  }))
  .handler(async ({ data }) => {
    if (!/^OS-[A-Z]{2,4}-\d{8}-\d{3,5}$/.test(data.protocolo)) {
      return { encontrada: false as const, motivo: "formato" as const };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: os, error } = await supabaseAdmin
      .from("ordens_servico")
      .select(
        "protocolo, status, modalidade, equipamento, previsao_conclusao, observacoes_publicas, created_at, updated_at",
      )
      .eq("protocolo", data.protocolo)
      .maybeSingle();

    if (error) {
      console.error("[os] consulta por protocolo falhou:", error.message);
      return { encontrada: false as const, motivo: "indisponivel" as const };
    }
    if (!os) return { encontrada: false as const, motivo: "nao_encontrada" as const };

    return {
      encontrada: true as const,
      os: {
        protocolo: os.protocolo,
        status: os.status,
        modalidade: os.modalidade,
        equipamento: os.equipamento,
        previsaoConclusao: os.previsao_conclusao,
        observacoesPublicas: os.observacoes_publicas,
        criadaEm: os.created_at,
        atualizadaEm: os.updated_at,
      },
    };
  });
