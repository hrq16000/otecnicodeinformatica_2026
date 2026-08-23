import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";

/**
 * Fonte ÚNICA de configuração do Vitest (Micro-Rodada Qualidade 1.1).
 *
 * Regras do contrato:
 *  • Vitest NUNCA coleta specs do Playwright (e2e/**, playwright/**).
 *  • Playwright NUNCA coleta testes unitários (testDir: e2e).
 *  • Ambiente padrão = node. Testes que dependem de DOM/sessionStorage
 *    declaram no topo do arquivo:  // @vitest-environment jsdom
 *  • `passWithNoTests: false` → suíte vazia é FALHA, não falso verde.
 */
const SHARED_EXCLUDE = [
  "**/node_modules/**",
  "**/dist/**",
  "**/.output/**",
  "**/.nitro/**",
  "**/.vinxi/**",
  "e2e/**",
  "playwright/**",
  "**/*.e2e.*",
];

const plugins = [react()];

// Alias explícito (e não vite-tsconfig-paths): `import.meta.glob("@/assets/...")`
// só resolve com alias real de resolve.alias.
const alias = { "@": fileURLToPath(new URL("./src", import.meta.url)) };

export default defineConfig({
  plugins,
  resolve: { alias },
  test: {
    passWithNoTests: false,
    globals: false,
    projects: [
      {
        plugins,
        resolve: { alias },
        test: {
          name: "unit",
          root: process.cwd(),
          environment: "node",
          include: ["src/**/*.test.{ts,tsx}"],
          exclude: [...SHARED_EXCLUDE, "src/**/*.integration.test.{ts,tsx}"],
          setupFiles: ["src/test/setup.ts"],
          passWithNoTests: false,
        },
      },
      {
        plugins,
        resolve: { alias },
        test: {
          name: "integration",
          root: process.cwd(),
          environment: "jsdom",
          include: ["src/**/*.integration.test.{ts,tsx}"],
          exclude: SHARED_EXCLUDE,
          setupFiles: ["src/test/setup.ts"],
          passWithNoTests: false,
        },
      },
      {
        resolve: { alias },
        test: {
          name: "scripts",
          root: process.cwd(),
          environment: "node",
          include: ["scripts/__tests__/**/*.test.mjs"],
          exclude: SHARED_EXCLUDE,
          passWithNoTests: false,
          testTimeout: 30_000,
        },
      },
    ],
  },
});
