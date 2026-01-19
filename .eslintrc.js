module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser', // <-- enable TypeScript parsing
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended', // <-- TS rules
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // your custom rules here
  },
};
