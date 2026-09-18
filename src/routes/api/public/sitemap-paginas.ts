import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { absoluteUrl } from "@/lib/siteConfig";

/**
 * Sitemap incremental das páginas criadas em /admin/paginas.
 * Apenas páginas publicadas E liberadas para buscadores entram (fail-closed).
 */
export const Route = createFileRoute("/api/public/sitemap-paginas")({
  server: {
    handlers: {
      GET: async () => {
        const url = process.env["SUPABASE_URL"];
        const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
        if (!url || !key) {
          return new Response(
            `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
            { headers: { "content-type": "application/xml; charset=utf-8" } },
          );
        }

        const supabase = createClient<Database>(url, key, {
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

        const { data } = await supabase
          .from("paginas_editoriais")
          .select("slug, updated_at, indexavel, publicado")
          .eq("publicado", true)
          .eq("indexavel", true)
          .order("updated_at", { ascending: false });

        const linhas = (data ?? [])
          .map(
            (p) =>
              `  <url><loc>${absoluteUrl(`/guias/${p.slug}`)}</loc><lastmod>${new Date(
                p.updated_at as string,
              ).toISOString()}</lastmod></url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${linhas}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=300",
          },
        });
      },
    },
  },
});
