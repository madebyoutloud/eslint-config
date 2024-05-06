// @ts-expect-error missing types
import unicornEslint from 'eslint-plugin-unicorn'
import type { Linter } from 'eslint'
import { type Options } from './types'

export function unicornRules(): Partial<Linter.RulesRecord> {
  return {
    'unicorn/error-message': 'error',
    'unicorn/no-new-array': 'error',
    'unicorn/no-new-buffer': 'error',
    'unicorn/no-for-loop': 'error',
    'unicorn/no-instanceof-array': 'error',
    'unicorn/prefer-module': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-number-properties': 'error',
    'unicorn/prefer-string-starts-ends-with': 'error',

    // 'unicorn/filename-case': [
    //   'error',
    //   {
    //     case: 'snakeCase',
    //   },
    // ],
  }
}

export default function unicorn(options: Options): Linter.FlatConfig[] {
  return [
    {
      name: 'outloud/unicorn/base',
      plugins: {
        unicorn: unicornEslint,
      },
    },
    {
      name: 'outloud/unicorn/rules',
      rules: unicornRules(),
    },
  ]
}
