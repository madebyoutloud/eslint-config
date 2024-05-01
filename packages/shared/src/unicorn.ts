// @ts-expect-error missing types
import unicornEslint from 'eslint-plugin-unicorn';
import type { Linter } from 'eslint'

import { Options } from './types'

export default function unicorn(options: Options, base: boolean): Linter.FlatConfig[] {
  const config: Linter.FlatConfig[] = []

  if (base) {
    config.push({
      plugins: {
        unicorn: unicornEslint,
      }
    })
  }

  config.push({
    name: 'outloud/unicorn',
    rules: {
      'unicorn/prefer-module': 'error',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/filename-case': [
        'error',
        {
          case: 'snakeCase',
        },
      ],
      'unicorn/no-await-expression-member': 'error',
      'unicorn/no-for-loop': 'error',
      'unicorn/no-instanceof-array': 'error',
      'unicorn/prefer-number-properties': 'error',
    }
  })

  return config
}
