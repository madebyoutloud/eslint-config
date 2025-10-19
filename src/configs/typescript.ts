import tsEslint from 'typescript-eslint'
import type { Linter } from 'eslint'
import type { Options } from '../types.js'

export const parser = tsEslint.parser as any

export function typescriptRules(): Partial<Linter.RulesRecord> {
  return {
    // Include typescript eslint rules in *.vue files
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts
    'constructor-super': 'off', // ts(2335) & ts(2377)
    'getter-return': 'off', // ts(2378)
    'no-const-assign': 'off', // ts(2588)
    'no-dupe-args': 'off', // ts(2300)
    'no-dupe-class-members': 'off', // ts(2393) & ts(2300)
    'no-dupe-keys': 'off', // ts(1117)
    'no-func-assign': 'off', // ts(2539)
    'no-import-assign': 'off', // ts(2539) & ts(2540)
    'no-new-symbol': 'off', // ts(7009)
    'no-obj-calls': 'off', // ts(2349)
    'no-redeclare': 'off', // ts(2451)
    'no-setter-return': 'off', // ts(2408)
    'no-this-before-super': 'off', // ts(2376)
    'no-undef': 'off', // ts(2304)
    'no-unreachable': 'off', // ts(7027)
    'no-unsafe-negation': 'off', // ts(2365) & ts(2360) & ts(2358)
    'no-var': 'error', // ts transpiles let/const to var, so no need for vars any more
    'prefer-const': 'error', // ts provides better types with const
    'prefer-rest-params': 'error', // ts provides better types with rest args over arguments
    'prefer-spread': 'error', // ts transpiles spread to apply, so no need for manual apply
    'valid-typeof': 'off', // ts(2367)
    'no-unused-vars': 'off', // ts takes care of this

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
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/no-empty-object-type': [
      'error', {
        allowInterfaces: 'with-single-extends',
      },
    ],

    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/unified-signatures': [
      'error', {
        ignoreDifferentlyNamedParameters: true,
      },
    ],
    '@typescript-eslint/no-unsafe-declaration-merging': 'error',

    // type-aware
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
        disallowTypeAnnotations: false,
      },
    ],
  }
}

export default function typescript(options: Options): Linter.Config[] {
  const files = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts']
  options.features.vue && files.push('**/*.vue')

  return [
    {
      name: 'outloud/typescript/setup',
      plugins: {
        '@typescript-eslint': tsEslint.plugin as any,
      },
    },
    {
      name: 'outloud/typescript',
      files,
      languageOptions: {
        parser: tsEslint.parser as any,
        sourceType: 'module',
        parserOptions: {
          projectService: {
            allowDefaultProject: ['*.ts', '*.js', '*.mjs'],
          },
          tsconfigRootDir: options.root ?? process.cwd(),
        },
      },
      rules: {
        ...tsEslint.configs.recommended.at(-1)!.rules,
        ...tsEslint.configs.strict.at(-1)!.rules,
        ...(options.features.stylistic ? tsEslint.configs.stylistic.at(-1)!.rules : {}),
        ...typescriptRules(),
      },
    },
  ]
}
