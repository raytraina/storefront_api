import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {ignores: ["**/dist/*", "**/migrations/*"]},
  {
    "rules": {
      "@typescript-eslint/no-unused-expressions": [
        "error", 
        { "allowShortCircuit": true }
      ]
    }
  },
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];