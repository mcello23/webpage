module.exports = {
    root: true,
    extends: [
      'react-app',
      'react-app/jest'
    ],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
    rules: {
      // Regras personalizadas aqui
    },
    settings: {
      // ...existing settings...
    }
  };