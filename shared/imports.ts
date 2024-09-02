import pluginImport from 'eslint-plugin-import-x'
import type { Linter } from 'eslint'
import type { Options } from './types'

export function importRules(): Partial<Linter.RulesRecord> {
  return {
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-default': 'error',
    'import/no-self-import': 'error',

    'import/order': 'error',
    'import/newline-after-import': ['error', { count: 1 }],
  }
}

export default function imports(options: Options): Linter.FlatConfig[] {
  return [
    {
      name: 'outloud/import/base',
      plugins: {
         
        import: pluginImport as any,
      },
    },
    {
      name: 'outloud/import/rules',
      rules: importRules(),
    },
  ]
}
