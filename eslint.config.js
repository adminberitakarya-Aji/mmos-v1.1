/**
 * ESLint 9 Flat Config for MMOS Monorepo
 * 
 * This is the root ESLint config. Each package should extend this
 * with their own package-specific overrides if needed.
 */

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  // Base configuration for all packages
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/*.d.ts",
      "**/*.js.map",
      "**/*.d.ts.map",
      "**/coverage/**",
      "**/.tsbuildinfo",
      "**/eslint.config.js",
    ],
  },

  // JavaScript recommended rules
  js.configs.recommended,

  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,

  // Type-aware linting: required for rules like no-floating-promises and
  // await-thenable below, which need real type information (not just
  // syntax) to work. `projectService: true` tells typescript-eslint to
  // find and use each file's own nearest tsconfig.json automatically,
  // instead of us listing every package's tsconfig by hand here.
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Prettier config (must be last to override conflicting rules)
  prettier,

  // Global rules for the monorepo
  {
    rules: {
      // Enforce consistent use of === and !==
      eqeqeq: ["error", "always"],

      // Disallow unused variables (with some exceptions for _ prefixes)
      // NOTE: the base rule is turned off in favor of the TS-aware
      // version below - it doesn't understand TS-only constructs like
      // interface method signatures (`interface X { get(id: string):
      // void }`), where `id` is never "used" because it's just a type
      // signature, not an implementation. Leaving both on false-positives
      // on every interface/contracts.ts file in the monorepo.
      "no-unused-vars": "off",

      // Require JSDoc comments for public APIs
      "require-jsdoc": "off",

      // Disallow debugger statements
      "no-debugger": "error",

      // Disallow console.log in production code
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // TypeScript-specific rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/await-thenable": "error",
    },
  },

  // Package-specific overrides
  {
    files: ["packages/**/*.ts"],
    rules: {
      // Allow node: protocol imports in packages
      "@typescript-eslint/no-restricted-imports": "off",
    },
  },

  // Test files - more lenient
  {
    files: ["**/test/**/*.ts", "**/*.test.ts", "**/*.spec.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
    },
  },

  // Config files - allow common patterns
  {
    files: [
      "**/tsconfig*.json",
      "**/*.config.js",
      "**/*.config.mjs",
      "**/*.config.ts",
      "**/eslint.config.js",
      "**/prettier.config.js",
      "**/.eslintrc*",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
    },
  },
);