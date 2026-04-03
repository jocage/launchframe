import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier/flat";
import nextTs from "eslint-config-next/typescript";
import nextVitals from "eslint-config-next/core-web-vitals";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

const SOURCE_FILES = ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"];
const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: SOURCE_FILES,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: dirname
      },
      globals: {
        ...globals.browser,
        ...globals.nodeBuiltin
      }
    },
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports
    },
    settings: {
      "import/resolver": {
        typescript: true
      }
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports"
        }
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false
          }
        }
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object",
            "type"
          ],
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          },
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "before"
            }
          ],
          pathGroupsExcludedImportTypes: ["builtin"]
        }
      ],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_"
        }
      ]
    }
  },
  {
    files: SOURCE_FILES,
    ignores: ["drizzle.config.ts", "src/lib/env.ts"],
    rules: {
      "no-restricted-properties": [
        "error",
        {
          object: "process",
          property: "env",
          message: "Use the validated env object from src/lib/env.ts."
        }
      ]
    }
  },
  prettier,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "drizzle.config.ts",
    "eslint.config.mjs",
    "next.config.ts",
    "playwright.config.ts",
    "prettier.config.mjs",
    "proxy.ts",
    "next-env.d.ts",
    "vitest.config.ts"
  ])
]);
