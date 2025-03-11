const config = {
  trailingComma: 'none',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 135,

  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrder: [
    '^react$',
    '^react-dom',
    '^react-router',
    '^react-intl',
    '^react',
    '<THIRD_PARTY_MODULES>',
    '^@/core/(.*)$',
    '^@/stores/(.*)$',
    '@/',
    '^@/components/(.*)$',
    '^../',
    '^[./]'
  ]
};

module.exports = config;
