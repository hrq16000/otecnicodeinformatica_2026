import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type PaginaEditorial = {
  id: string;
  slug: string;
  tipo: "sintoma" | "solucao" | "cidade";
  titulo: string;
  meta_description: string;
  palavras_chave: string[];
  resumo: string;
  conteudo: string;
  publicado: boolean;
  indexavel: boolean;
  updated_at: string;
};

const CAMPOS =
  "id, slug, tipo, titulo, meta_description, palavras_chave, resumo, conteudo, publicado, indexavel, updated_at";

/** Cliente publicável somente-leitura (RLS anon: apenas páginas publicadas). */
function clientePublico() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const obterPaginaEditorial = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => ({ slug: String(data.slug ?? "") }))
  .handler(async ({ data }): Promise<PaginaEditorial | null> => {
    if (!data.slug) return null;
    const { data: linha } = await clientePublico()
      .from("paginas_editoriais")
      .select(CAMPOS)
      .eq("slug", data.slug)
      .eq("publicado", true)
      .maybeSingle();
    return (linha as PaginaEditorial | null) ?? null;
  });

export const listarPaginasEditoriais = createServerFn({ method: "GET" }).handler(
  async (): Promise<PaginaEditorial[]> => {
    const { data } = await clientePublico()
      .from("paginas_editoriais")
      .select(CAMPOS)
      .eq("publicado", true)
      .order("updated_at", { ascending: false });
    return (data as PaginaEditorial[] | null) ?? [];
  },
);
