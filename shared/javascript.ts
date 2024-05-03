// @ts-expect-error missing types
import jsEslint from '@eslint/js'
import type { Linter } from 'eslint'
import globals from 'globals'
import { type Options } from './types'

export function javascriptRules(options: Options): Partial<Linter.RulesRecord> {
  return {
    'yoda': 'error',
    'curly': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'max-depth': ['error', options.maxDepth],
    'max-params': ['error', options.maxParams],
    // 'complexity': ['error', options.complexity],
    'no-shadow': 'off',
  }
}

export default function javascript(options: Options): Linter.FlatConfig[] {
  const config: Linter.FlatConfig[] = []

  config.push({
    name: 'outloud/javascript/setup',
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

  config.push({
    name: 'outloud/javascript',
    rules: {
      ...jsEslint.configs.recommended.rules,
      ...javascriptRules(options),
    },
  })

  return config
}
