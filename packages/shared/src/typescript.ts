import tsEslint from 'typescript-eslint'
import type { Linter } from 'eslint'
import globals from 'globals'
import { Options } from './types'

export default function typescript(options: Options, base: boolean): Linter.FlatConfig[] {
  const config: Linter.FlatConfig[] = []

  if (base) {
    config.push(
      ...(tsEslint.configs.recommended as Linter.FlatConfig[]),
      ...(tsEslint.configs.stylistic as Linter.FlatConfig[]),
    )
  }

  config.push({
    name: 'outloud/typescript',
    rules: {
      "@typescript-eslint/no-shadow": "error",
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports'
        }
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
  })

  return config
}
