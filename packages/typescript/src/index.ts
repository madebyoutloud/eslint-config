import { type FlatConfigComposer, composer } from 'eslint-flat-config-utils'
import { type Linter } from 'eslint'
import gitignore from 'eslint-config-flat-gitignore'
import { defaultOptions } from '../../../shared'
import javascript from '../../../shared/javascript'
import typescript from '../../../shared/typescript'
import imports from '../../../shared/imports'
import stylistic from '../../../shared/stylistic'
import type { Options } from '../../../shared/types'

export function createConfig(opts: Partial<Options> = {}): FlatConfigComposer<Linter.FlatConfig> {
  const options = Object.assign({}, defaultOptions, opts)

  const c = composer()

  c.append(
    gitignore({ strict: false }),
    javascript(options),
    typescript(options),
    imports(options),
    stylistic(options),
  )

  return c
}
