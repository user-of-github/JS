import stylistic from '@stylistic/eslint-plugin';
import parserTs from '@typescript-eslint/parser';


export default [
  {
    files: ['**/*.ts', '**/*.js'],
    ignores: ['.idea/*', 'node_modules/*', './package.json', './package-lock.json'],
    plugins: {
      '@stylistic': stylistic
    },
    languageOptions: {
      parser: parserTs,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/max-len': ['error', { 'code': 120, 'tabWidth': 4 }],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always']
    }
  }
];