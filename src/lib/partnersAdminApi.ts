/**
 * GESTÃO ADMINISTRATIVA DA REDE DE PARCEIROS — /admin/parceiros.
 *
 * Leitura e curadoria dos cadastros reais (nada fictício) e da configuração
 * comercial do programa anual. Toda alteração de status passa por função
 * SECURITY DEFINER que exige papel de administrador no banco.
 */

import { supabase } from "@/integrations/supabase/client";
import type { ProgramSettings } from "@/lib/partnersApi";

export type PartnerStatus =
  | "iniciado"
  | "aguardando_analise"
  | "aprovado"
  | "ativo"
  | "vencido"
  | "suspenso";

export const PARTNER_STATUS: PartnerStatus[] = [
  "iniciado",
  "aguardando_analise",
  "aprovado",
  "ativo",
  "vencido",
  "suspenso",
];

export type AdminPartner = {
  id: string;
  slug: string;
  nome_profissional: string;
  cidade: string;
  estado: string;
  whatsapp: string | null;
  site_url: string | null;
  especialidades: string[];
  servicos: string[];
  descricao: string | null;
  status: PartnerStatus;
  plano_expira_em: string | null;
  notas_admin: string | null;
  created_at: string;
  updated_at: string;
};

export async function adminListPartners(): Promise<AdminPartner[]> {
  const { data, error } = await supabase.rpc("admin_list_partners");
  if (error) throw new Error(error.message);
  return ((data ?? []) as unknown as AdminPartner[]).sort((a, b) =>
    b.created_at.localeCompare(a.created_at),
  );
}

export async function adminUpdatePartnerStatus(input: {
  partnerId: string;
  status: PartnerStatus;
  planoExpiraEm: string | null;
  notasAdmin: string | null;
}) {
  const { error } = await supabase.rpc("admin_update_partner_status", {
    _partner_id: input.partnerId,
    _status: input.status,
    _plano_expira_em: input.planoExpiraEm,
    _notas_admin: input.notasAdmin,
  });
  if (error) throw new Error(error.message);
}

export async function adminUpdateProgramSettings(settings: ProgramSettings) {
  const { error } = await supabase
    .from("partner_program_settings")
    .update({
      preco_anual_centavos: settings.preco_anual_centavos,
      moeda: settings.moeda,
      aceitando_cadastros: settings.aceitando_cadastros,
      texto_plano: settings.texto_plano,
    })
    .eq("id", true);
  if (error) throw new Error(error.message);
}
