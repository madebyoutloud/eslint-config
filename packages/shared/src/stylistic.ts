import stylisticPlugin from '@stylistic/eslint-plugin'
import type { Linter } from 'eslint'
import { Options } from './types'

export default function stylistic(options: Options, base: boolean): Linter.FlatConfig[] {
  const config: Linter.FlatConfig[] = []

  if (base) {
    config.push(stylisticPlugin.configs.customize({
      flat: true,
      indent: options.indent,
      quotes: 'single',
      semi: false,
      arrowParens: true,
      braceStyle: '1tbs',
      quoteProps: 'consistent-as-needed',
      commaDangle: 'always-multiline',
    }))
  }

  config.push({
    name: 'outloud/stylistic',
    rules: {
      '@stylistic/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/array-element-newline': ['error', 'consistent'],
      '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],
      '@stylistic/object-property-newline': ['error'],
      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/max-len': ['error', { 'tabWidth': 2, 'ignoreUrls': true, 'ignoreStrings': true, 'ignoreTemplateLiterals': true, 'ignoreRegExpLiterals': true, 'code': 100 }],
      '@stylistic/newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 1 }],
      '@stylistic/object-curly-newline': ['error', { 'multiline': true, 'consistent': true }],
      '@stylistic/one-var-declaration-per-line': ['error'],
    }
  })

  return config
}
