import { configs } from 'eslint-plugin-regexp'
import type { Linter } from 'eslint'
import type { Options } from '../types.js'

export default function regexp(_options: Options): Linter.Config[] {
  return [
    {
      ...configs['flat/recommended'] as Linter.Config,
      name: 'outloud/regexp',
    },
  ]
}
