import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";

/** Diagnóstico editorial sem credenciais, sem rede e sem substituir os gates globais. */
export default defineConfig({
  envDir: false,
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@/integrations/supabase/client", replacement: fileURLToPath(new URL("./src/test/editorialForbiddenClient.ts", import.meta.url)) },
      { find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) },
    ],
  },
  test: {
    environment: "node",
    setupFiles: ["src/test/editorialOfflineSetup.ts"],
    passWithNoTests: false,
    testTimeout: 30_000,
    include: process.env.EDITORIAL_NETWORK_NEGATIVE_PROBE === "1"
      ? ["src/test/fixtures/editorialNetworkBlocked.fixture.ts"]
      : [
          "src/lib/__tests__/windows11Migration.test.tsx",
          "src/lib/__tests__/smartDisk.test.tsx",
          "src/lib/__tests__/fileMigration.test.tsx",
          "src/lib/__tests__/wifiVisibility.test.tsx",
          "src/lib/__tests__/mfaRecovery.test.tsx",
          "src/lib/__tests__/bootRecoveryEditorial.test.tsx",
          "src/lib/__tests__/adwareRecurrenceEditorial.test.tsx",
          "src/lib/__tests__/notebookKeyboardEditorial.test.tsx",
        ],
  },
});
