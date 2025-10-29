import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import globals from "globals"
import tseslint from "typescript-eslint"
import { config as baseConfig } from "./base.js"

/** @type {import("eslint").Linter.Config[]} */
export const config = [
  ...baseConfig,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.serviceworker },
    },
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "react/display-name": "off",
    },
  },
]
