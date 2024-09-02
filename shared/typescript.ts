import tsEslint from 'typescript-eslint'
import type { Linter } from 'eslint'
import { type Options } from './types'

export interface TypescriptOptions extends Options {
  extensions?: string[]
}

export function typescriptRules(): Partial<Linter.RulesRecord> {
  return {
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': [
      'error', {
      // builtinGlobals: true,
        ignoreOnInitialization: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error', {
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        vars: 'all',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'no-public' },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
    ],
    '@typescript-eslint/no-import-type-side-effects': 'error',

    // type-aware
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
  }
}

export default function typescript(options: TypescriptOptions): Linter.FlatConfig[] {
  const files = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts']
  options.vue && files.push('**/*.vue')

  return [
    tsEslint.configs.base as Linter.FlatConfig,
    tsEslint.configs.eslintRecommended as Linter.FlatConfig,
    {
      name: 'outloud/typescript/rules',
      files,
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: options.root ?? process.cwd(),
        },
      },
      rules: {
        ...tsEslint.configs.recommended.at(-1)!.rules,
        ...tsEslint.configs.strict.at(-1)!.rules,
        ...tsEslint.configs.stylistic.at(-1)!.rules,
        ...typescriptRules(),
      },
    },
  ]
}
