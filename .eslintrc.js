module.exports = {
  root: true,

  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },

  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/prettier',
    '@vue/typescript',
    'taro/vue3'
  ],

  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        trailingComma: 'none',
        arrowParens: 'avoid',
        printWidth: 100
      }
    ],
    'no-console': 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': [
      'off',
      {
        ignores: ['index'] //需要忽略的组件名
      }
    ],
    '@typescript-eslint/no-unused-vars': 'warn'
  }
};
