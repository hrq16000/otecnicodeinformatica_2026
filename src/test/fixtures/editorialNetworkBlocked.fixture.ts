import { expect, it } from "vitest";

// Só coletado no probe negativo. Nenhuma chamada sai: o setup intercepta fetch.
// O teste captura a rejeição, mas o afterAll ainda deve falhar pela tentativa.
it("a tentativa capturada também precisa reprovar a suíte", async () => {
  await expect(fetch("https://editorial-probe.invalid")).rejects.toThrow("EDITORIAL_NETWORK_FORBIDDEN");
});

it("o cliente Supabase é substituído por uma falha, nunca por acesso real", async () => {
  await expect(import("@/integrations/supabase/client")).rejects.toThrow("EDITORIAL_BACKEND_IMPORT_FORBIDDEN");
});
