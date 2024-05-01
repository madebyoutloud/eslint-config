import pluginImport from 'eslint-plugin-import-x'
import type { Linter } from 'eslint'
import { Options } from './types'

export default function imports(options: Options, base: boolean): Linter.FlatConfig[] {
  const config: Linter.FlatConfig[] = []

  if (base) {
    config.push(
      {
        name: 'import',
        plugins: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          import: pluginImport as any,
        },
      },
    )
  }

  config.push({
    name: 'outloud/import',
    rules: {
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-named-default': 'error',
      'import/no-self-import': 'error',

      'import/order': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
    },
  })

  return config
}
