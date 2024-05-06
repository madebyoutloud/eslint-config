import tsEslint from 'typescript-eslint'
import type { Linter } from 'eslint'
import { type Options } from './types'

export interface TypescriptOptions extends Options {
  extensions?: string[]
}

export function typescriptRules(): Partial<Linter.RulesRecord> {
  return {
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error', {
      args: 'after-used',
      argsIgnorePattern: '^_',
      ignoreRestSiblings: true,
      vars: 'all',
      varsIgnorePattern: '^_',
    }],
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
  }
}

export default function typescript(options: TypescriptOptions): Linter.FlatConfig[] {
  const files = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts']
  options.vue && files.push('**/*.vue')

  return [
    {
      name: 'outloud/typescript/base',
      plugins: {
        '@typescript-eslint': tsEslint.plugin as any,
      },
    },
    {
      name: 'outloud/typescript/rules',
      files,
      languageOptions: {
        parser: tsEslint.parser as any,
      },
      rules: {
        ...tsEslint.configs.eslintRecommended.rules,
        ...tsEslint.configs.recommended.at(-1)!.rules,
        ...tsEslint.configs.strict.at(-1)!.rules,
        ...tsEslint.configs.stylistic.at(-1)!.rules,
        ...typescriptRules(),
      },
    },
  ]
}
