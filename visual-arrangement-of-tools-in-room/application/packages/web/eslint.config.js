import stylisticJs from '@stylistic/eslint-plugin-js';
import stylisticJsx from '@stylistic/eslint-plugin-jsx';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import parserTs from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    plugins: {
      '@stylistic/js': stylisticJs,
      '@stylistic/ts': stylisticTs,
      '@stylistic/jsx': stylisticJsx,
      'react-hooks': reactHooks
    },
    files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    languageOptions: {
      parser: parserTs
    },
    rules: {
      indent: [
        'warn',
        2,
        {
          SwitchCase: 1
        }
      ],
      quotes: ['warn', 'single'],
      semi: ['warn', 'always'],
      'max-len': ['warn', 135],
      'comma-dangle': ['warn', 'never'],

      '@stylistic/jsx/jsx-indent': ['warn', 2],
      '@stylistic/jsx/jsx-wrap-multilines': [
        'warn',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
          logical: 'parens-new-line'
        }
      ],
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn'
    },

    ignores: ['**/build/*', '**/node_modules/*', '**/src/schema.ts', 'package*.json', '**/package.json', 'public']
  }
];
