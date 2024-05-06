// @ts-expect-error missing types
import jsEslint from '@eslint/js'
import type { Linter } from 'eslint'
import globals from 'globals'
import { type Options } from './types'

export function javascriptRules(options: Options): Partial<Linter.RulesRecord> {
  return {
    'eqeqeq': ['error', 'always'],
    'new-parens': ['error', 'always'],
    'no-caller': ['error'],
    'no-eval': ['error'],
    'no-inner-declarations': ['error'],
    'no-proto': ['error'],
    'no-self-compare': ['error'],
    'no-new-wrappers': ['error'],
    'no-undef-init': ['error'],
    'no-unsafe-finally': ['error'],
    'no-array-constructor': ['error'],
    'yoda': 'error',
    'curly': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'max-depth': ['error', options.maxDepth],
    'max-params': ['error', options.maxParams],
    // 'complexity': ['error', options.complexity],
  }
}

export default function javascript(options: Options): Linter.FlatConfig[] {
  return [{
    name: 'outloud/javascript/base',
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.es2021,
        ...(options.node ? globals.node : {}),
        ...(options.browser ? globals.browser : {}),
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  }, {
    name: 'outloud/javascript/rules',
    rules: {
      ...jsEslint.configs.recommended.rules,
      ...javascriptRules(options),
    },
  }]
}
