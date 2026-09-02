import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

/**
 * Motion System Global — classes legadas proibidas.
 * Fonte única das regras usadas também por `eslint.motion.config.js`.
 */
const CLASSES_LEGADAS =
  "hover-streak|animated-border|card-shine|ring-pulse|elastic-click|animate-pulse-soft|cta-pulse|hover-scale";
const HOVER_SCALE = "(hover|group-hover|focus|active):scale-";

const MSG_LEGADO =
  "Classe de animação legada proibida (Motion System Global). Use .motion-surface, .skel/Skeleton ou .motion-status-live.";
const MSG_SCALE =
  "Hover/scale ad-hoc proibido. Use .motion-surface para feedback de superfície.";
const MSG_PULSE =
  "animate-pulse ad-hoc proibido. Use .skel ou os componentes de @/components/Skeleton; para status ao vivo use .motion-status-live.";

export const restricoesMotion = [
  { selector: `Literal[value=/${CLASSES_LEGADAS}/]`, message: MSG_LEGADO },
  { selector: `TemplateElement[value.raw=/${CLASSES_LEGADAS}/]`, message: MSG_LEGADO },
  { selector: `Literal[value=/${HOVER_SCALE}/]`, message: MSG_SCALE },
  { selector: `TemplateElement[value.raw=/${HOVER_SCALE}/]`, message: MSG_SCALE },
  { selector: "Literal[value=/animate-pulse(?![a-z-])/]", message: MSG_PULSE },
  { selector: "TemplateElement[value.raw=/animate-pulse(?![a-z-])/]", message: MSG_PULSE },
];



export default tseslint.config(
  { ignores: ["dist", ".output", ".vinxi"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "server-only",
              message:
                "TanStack Start does not use the Next.js `server-only` package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  eslintPluginPrettier,
);
