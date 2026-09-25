/**
 * REDE NACIONAL DE PROFISSIONAIS PARCEIROS
 *
 * Camada de acesso aos dados públicos da rede. Regras:
 * - Só existem perfis reais: nada é inventado, nada é "demo".
 * - Páginas locais (estado/cidade) só têm valor quando há parceiro real —
 *   por isso a UI é fail-closed: sem parceiro, não há página indexável.
 * - Parceiro é profissional independente divulgado na plataforma, nunca
 *   apresentado como equipe própria do portal.
 */

import { supabase } from "@/integrations/supabase/client";

export type Partner = {
  id: string;
  slug: string;
  nome_profissional: string;
  foto_url: string | null;
  cidade: string;
  estado: string;
  regioes_atendidas: string[];
  especialidades: string[];
  descricao: string | null;
  servicos: string[];
  experiencia: string | null;
  certificacoes: string[];
  horario: string | null;
  formas_atendimento: string[];
  whatsapp: string | null;
  site_url: string | null;
  redes_sociais: Record<string, string> | null;
};

export type PartnerPhoto = {
  id: string;
  url: string;
  legenda: string | null;
  ordem: number;
};

export type ProgramSettings = {
  preco_anual_centavos: number;
  moeda: string;
  aceitando_cadastros: boolean;
  texto_plano: string | null;
};

const PARTNER_FIELDS =
  "id,slug,nome_profissional,foto_url,cidade,estado,regioes_atendidas,especialidades,descricao,servicos,experiencia,certificacoes,horario,formas_atendimento,whatsapp,site_url,redes_sociais";

export const slugify = (valor: string) =>
  valor
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 100);

export const formatarPreco = (centavos: number, moeda = "BRL") =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: moeda }).format(centavos / 100);

/** Lista parceiros ativos, com filtros opcionais de local e especialidade. */
export async function listPartners(filtros: {
  estado?: string;
  cidade?: string;
  termo?: string;
} = {}): Promise<Partner[]> {
  let query = supabase
    .from("partners_public")
    .select(PARTNER_FIELDS)
    .order("nome_profissional", { ascending: true });

  if (filtros.estado) query = query.ilike("estado", filtros.estado.replace(/-/g, " "));
  if (filtros.cidade) query = query.ilike("cidade", filtros.cidade.replace(/-/g, " "));

  const { data, error } = await query;
  if (error || !data) return [];

  const termo = filtros.termo?.trim().toLowerCase();
  const lista = data as unknown as Partner[];
  if (!termo) return lista;

  return lista.filter((p) =>
    [p.nome_profissional, p.cidade, p.estado, ...p.especialidades, ...p.servicos]
      .join(" ")
      .toLowerCase()
      .includes(termo),
  );
}

/** Perfil público — retorna null quando o parceiro não está ativo. */
export async function getPartnerBySlug(slug: string): Promise<Partner | null> {
  const { data, error } = await supabase
    .from("partners_public")
    .select(PARTNER_FIELDS)
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return data as unknown as Partner;
}

/** Bucket privado: caminhos internos viram URL assinada de leitura. */
export const PARTNER_BUCKET = "parceiros";

export async function resolvePhotoUrl(url: string): Promise<string | null> {
  if (/^https?:\/\//i.test(url)) return url;
  const { data } = await supabase.storage.from(PARTNER_BUCKET).createSignedUrl(url, 60 * 60);
  return data?.signedUrl ?? null;
}

export async function getPartnerPhotos(partnerId: string): Promise<PartnerPhoto[]> {
  const { data, error } = await supabase
    .from("partner_photos")
    .select("id,url,legenda,ordem")
    .eq("partner_id", partnerId)
    .order("ordem", { ascending: true });
  if (error || !data) return [];

  const fotos = data as PartnerPhoto[];
  const resolvidas = await Promise.all(
    fotos.map(async (f) => ({ ...f, url: (await resolvePhotoUrl(f.url)) ?? "" })),
  );
  return resolvidas.filter((f) => f.url);
}

/** Configuração comercial do programa — administrada, nunca hardcoded na UI. */
export async function getProgramSettings(): Promise<ProgramSettings | null> {
  const { data, error } = await supabase
    .from("partner_program_settings")
    .select("preco_anual_centavos,moeda,aceitando_cadastros,texto_plano")
    .maybeSingle();
  if (error || !data) return null;
  return data as ProgramSettings;
}

export type PartnerApplication = {
  nome_profissional: string;
  cidade: string;
  estado: string;
  whatsapp: string;
  documento_tipo: string;
  documento: string;
  especialidades: string[];
  servicos: string[];
  regioes_atendidas: string[];
  formas_atendimento: string[];
  descricao: string;
  experiencia: string;
};

/**
 * Envia cadastro: entra sempre como "aguardando análise" (RLS reforça isso).
 * Quando existe sessão, o cadastro fica vinculado à conta — é isso que
 * permite ao profissional editar o próprio perfil depois da aprovação.
 */
export async function submitPartnerApplication(app: PartnerApplication) {
  const base = slugify(`${app.nome_profissional}-${app.cidade}`);
  const slug = `${base}-${Math.random().toString(36).slice(2, 6)}`;
  const { data: sessao } = await supabase.auth.getSession();

  return supabase.from("partners").insert({
    ...app,
    slug,
    user_id: sessao.session?.user.id ?? null,
    status: "aguardando_analise" as const,
    aceite_termos_em: new Date().toISOString(),
  });
}

// ── ÁREA DO PARCEIRO (dono do cadastro) ──────────────────────────

export type MyPartner = Partner & {
  status: string;
  plano_expira_em: string | null;
};

/** Cadastro do usuário autenticado — null quando ele ainda não tem perfil. */
export async function getMyPartner(): Promise<MyPartner | null> {
  const { data, error } = await supabase.rpc("get_my_partner");
  if (error || !data || data.length === 0) return null;
  return data[0] as unknown as MyPartner;
}

/** Fotos do próprio portfólio, com o caminho interno preservado. */
export async function getMyPartnerPhotos(): Promise<PartnerPhoto[]> {
  const { data, error } = await supabase.rpc("get_my_partner_photos");
  if (error || !data) return [];
  return data as unknown as PartnerPhoto[];
}

export type PartnerEditableFields = {
  descricao: string;
  experiencia: string;
  horario: string;
  whatsapp: string;
  site_url: string;
  servicos: string[];
  especialidades: string[];
  regioes_atendidas: string[];
  formas_atendimento: string[];
};

/**
 * Atualiza o próprio perfil. Status, plano e notas administrativas ficam
 * fora do alcance do parceiro — a política do banco recusa qualquer tentativa.
 */
export async function updateMyPartner(partnerId: string, campos: PartnerEditableFields) {
  return supabase
    .from("partners")
    .update({
      descricao: campos.descricao.slice(0, 4000) || null,
      experiencia: campos.experiencia.slice(0, 2000) || null,
      horario: campos.horario.slice(0, 200) || null,
      whatsapp: campos.whatsapp.replace(/\D/g, "").slice(0, 20) || null,
      site_url: campos.site_url.trim() || null,
      servicos: campos.servicos.slice(0, 30),
      especialidades: campos.especialidades.slice(0, 20),
      regioes_atendidas: campos.regioes_atendidas.slice(0, 30),
      formas_atendimento: campos.formas_atendimento.slice(0, 10),
    })
    .eq("id", partnerId);
}

/** Envia uma foto de trabalho real para a pasta do próprio parceiro. */
export async function uploadPartnerPhoto(partnerId: string, arquivo: File, legenda: string) {
  const extensao = arquivo.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const caminho = `${partnerId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extensao}`;

  const upload = await supabase.storage.from(PARTNER_BUCKET).upload(caminho, arquivo, {
    cacheControl: "3600",
    upsert: false,
  });
  if (upload.error) return { error: upload.error };

  return supabase.from("partner_photos").insert({
    partner_id: partnerId,
    url: caminho,
    legenda: legenda.trim().slice(0, 160) || null,
    ordem: 0,
  });
}

export async function deletePartnerPhoto(foto: PartnerPhoto) {
  if (!/^https?:\/\//i.test(foto.url)) {
    await supabase.storage.from(PARTNER_BUCKET).remove([foto.url]);
  }
  return supabase.from("partner_photos").delete().eq("id", foto.id);
}
