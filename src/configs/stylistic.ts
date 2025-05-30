import stylisticPlugin from '@stylistic/eslint-plugin'
import type { Linter } from 'eslint'
import type { Options } from '../types.js'

export function stylisticRules(options: Options): Partial<Linter.RulesRecord> {
  return {
    '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: false }],
    '@stylistic/array-bracket-newline': [
      'error', {
        multiline: true,
      },
    ],
    '@stylistic/array-bracket-spacing': ['error', 'never'],
    '@stylistic/array-element-newline': ['error', 'consistent'],
    '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],
    '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    '@stylistic/function-call-argument-newline': ['error', 'consistent'],
    '@stylistic/max-len': [
      'error', {
        code: options.style.maxLen,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
        ignorePattern: '^\\s*class="[^"]+"',
      },
    ],
    '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: options.style.chainDepth }],
    '@stylistic/object-curly-newline': [
      'error', {
        multiline: true,
        consistent: true,
      },
    ],
    '@stylistic/one-var-declaration-per-line': ['error'],
    '@stylistic/operator-linebreak': [
      'error', 'after', {
        overrides: {
          '?': 'before',
          ':': 'before',
          '=': 'none',
        },
      },
    ],
  }
}

export default function stylistic(options: Options): Linter.Config[] {
  const config = {
    name: 'outloud/stylistic',
    ...stylisticPlugin.configs.customize({
      indent: options.style.indent,
      quotes: 'single',
      semi: false,
      arrowParens: true,
      braceStyle: '1tbs',
      quoteProps: 'consistent-as-needed',
      commaDangle: 'always-multiline',
    }),
  }

  config.rules ??= {}
  Object.assign(config.rules, stylisticRules(options))

  return [config]
}
