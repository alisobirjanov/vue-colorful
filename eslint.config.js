import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },
  rules: {
    'antfu/top-level-function': 'off',
    'prefer-exponentiation-operator': 'off',
    'unicorn/prefer-number-properties': 'off',
    'ts/no-use-before-define': 'off',
    'prefer-template': 'off',
    'curly': 'off',
    'no-console': 'warn',
  },
})
