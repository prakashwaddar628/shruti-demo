import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // 1. Load the Next.js presets FIRST
  ...nextVitals,
  ...nextTs,

  // 2. Define your overrides LAST (so they win)
  {
    rules: {
      "no-console": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      
      // This will now successfully disable the 'any' warning globally
      "@typescript-eslint/no-explicit-any": "off",
      
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    }
  },
  
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;