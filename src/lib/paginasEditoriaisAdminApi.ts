import { supabase } from "@/integrations/supabase/client";
import type { PaginaEditorial } from "@/lib/paginasEditoriais.functions";

export type { PaginaEditorial };

export type PaginaEditorialInput = {
  slug: string;
  tipo: "sintoma" | "solucao" | "cidade";
  titulo: string;
  meta_description: string;
  palavras_chave: string[];
  resumo: string;
  conteudo: string;
  publicado: boolean;
  indexavel: boolean;
};

const TABELA = "paginas_editoriais";

export function normalizarSlug(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function adminListarPaginas(): Promise<PaginaEditorial[]> {
  const { data, error } = await supabase
    .from(TABELA)
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as PaginaEditorial[];
}

export async function adminCriarPagina(input: PaginaEditorialInput): Promise<PaginaEditorial> {
  const { data, error } = await supabase.from(TABELA).insert(input).select("*").single();
  if (error) throw error;
  return data as PaginaEditorial;
}

export async function adminAtualizarPagina(
  id: string,
  input: Partial<PaginaEditorialInput>,
): Promise<PaginaEditorial> {
  const { data, error } = await supabase
    .from(TABELA)
    .update(input)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as PaginaEditorial;
}

export async function adminExcluirPagina(id: string): Promise<void> {
  const { error } = await supabase.from(TABELA).delete().eq("id", id);
  if (error) throw error;
}
