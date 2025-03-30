import jsEslint from '@eslint/js'
import type { Linter } from 'eslint'
import globals from 'globals'
import type { Options } from '../types.js'

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

    // 'complexity': ['error', options.complexity],
    'no-shadow': [
      'error', {
        ignoreOnInitialization: true,
      },
    ],
    'object-shorthand': 'error',
    ...(options.features.stylistic ? stylisticRules(options) : {}),
  }
}

function stylisticRules(options: Options): Partial<Linter.RulesRecord> {
  return {
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'max-depth': ['error', options.style.maxDepth],
    'max-params': ['error', options.style.maxParams],
  }
}

export default function javascript(options: Options): Linter.Config[] {
  return [
    {
      name: 'outloud/javascript',
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
          ...(options.globals.browser ? globals.browser : {}),
          ...(options.globals.version ? globals[options.globals.version] : {}),
          ...(options.globals.node ? globals.node : {}),
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      rules: {
        ...jsEslint.configs.recommended.rules,
        ...javascriptRules(options),
      },
    },
  ]
}
