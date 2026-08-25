// Frontend helper: pings IndexNow via edge function.
// Use after publishing/updating a review, landing, post, etc.
import { supabase } from "@/integrations/supabase/client";
import { withDevMock } from "@/lib/devMocks";

type IndexNowResult = { ok: true; data: unknown } | { ok: false; error: string };

export async function pingIndexNow(urls: string | string[]): Promise<IndexNowResult> {
  const list = Array.isArray(urls) ? urls : [urls];
  if (list.length === 0) return { ok: false, error: "empty" };
  return withDevMock<IndexNowResult>(
    "indexnow-ping",
    { urls: list },
    { ok: true, data: { mocked: true, urls: list } },
    async () => {
      try {
        const { data, error } = await supabase.functions.invoke("indexnow-ping", {
          body: { urls: list },
        });
        if (error) return { ok: false, error: error.message };
        return { ok: true, data };
      } catch (e) {
        return { ok: false, error: e instanceof Error ? e.message : "unknown" };
      }
    },
  );
}
