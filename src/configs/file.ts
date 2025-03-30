// @ts-expect-error missing types
import checkFile from 'eslint-plugin-check-file'

import type { Linter } from 'eslint'
import type { Options } from '../types.js'

export default function file(_options: Options): Linter.Config[] {
  return [
    {
      name: 'outloud/file',
      plugins: {
        'check-file': checkFile,
      },
      rules: {
        'check-file/filename-naming-convention': [
          'error',
          {
            '**/*.{js,ts}': 'SNAKE_CASE',
          },
          {
            ignoreMiddleExtensions: true,
          },
        ],
      },
    },
  ]
}
