// @ts-expect-error missing types
import jsEslint from '@eslint/js'
import type { Linter } from 'eslint'
import globals from 'globals'
import { Options } from './types'

export default function javascript(options: Options, base: boolean): Linter.FlatConfig[] {
  const config: Linter.FlatConfig[] = []

  if (base) {
    Object.assign(config, {
      name: 'javascript',
      ...jsEslint.configs.recommended,
      languageOptions: {
        ecmaVersion: 2022,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 2022,
          sourceType: 'module',
        },
        sourceType: 'module',
        globals: {
          ...globals.es2021,
          ...globals.node,
        },
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
    })
  }

  config.push({
    name: 'outloud/javascript',
    rules: {
      'yoda': 'error',
      'curly': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'max-depth': ['error', options.maxDepth],
      'max-params': ['error', options.maxParams],
      'complexity': ['error', options.complexity],
      'no-shadow': 'off',
    }
  })

  return config
}
