import tsEslint from 'typescript-eslint'
import type { Linter } from 'eslint'
import { type Options } from './types'

export function typescriptRules(): Partial<Linter.RulesRecord> {
  return {
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

export default function typescript(options: Options): Linter.FlatConfig[] {
  return [
    ...tsEslint.configs.recommended as Linter.FlatConfig[],
    ...tsEslint.configs.strict as Linter.FlatConfig[],
    {
      name: 'outloud/typescript',
      languageOptions: {
        parser: tsEslint.parser as any,
      },
      rules: typescriptRules(),
    },
  ]
}
