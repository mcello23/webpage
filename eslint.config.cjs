const js = require("@eslint/js");
const eslintPluginReact = require(require.resolve("eslint-plugin-react"));
const eslintPluginReactHooks = require(require.resolve("eslint-plugin-react-hooks"));

module.exports = [
  {
    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...(js.configs.recommended.languageOptions?.globals || {}),
        document: "readonly",
        window: "readonly",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "warn",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];