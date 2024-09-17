module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended', // Make sure 'plugin:prettier/recommended' comes last
    ],
    root: true,
    env: {
      node: true,
      jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'all' }],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-imports': 'off',
      // Add other rules as needed
    },
  };
  