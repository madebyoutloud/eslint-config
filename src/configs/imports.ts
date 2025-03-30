import pluginImport from 'eslint-plugin-import-x'
import type { Linter } from 'eslint'
import type { Options } from '../types.js'

export function importRules(options: Options): Partial<Linter.RulesRecord> {
  return {
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-default': 'error',
    'import/no-self-import': 'error',

    ...(options.features.stylistic ? stylisticRules(options) : {}),
  }
}

function stylisticRules(_options: Options): Partial<Linter.RulesRecord> {
  return {
    'import/order': 'error',
    'import/newline-after-import': ['error', { count: 1 }],
  }
}

export default function imports(options: Options): Linter.Config[] {
  return [
    {
      name: 'outloud/import',
      plugins: {
        import: pluginImport as any,
      },
      rules: importRules(options),
    },
  ]
}
