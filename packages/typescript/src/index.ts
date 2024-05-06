import { type FlatConfigComposer, composer } from 'eslint-flat-config-utils'
import { type Linter } from 'eslint'
import gitignore from 'eslint-config-flat-gitignore'
import { defaultOptions } from '../../../shared'
import javascript from '../../../shared/javascript'
import typescript from '../../../shared/typescript'
import imports from '../../../shared/imports'
import stylistic from '../../../shared/stylistic'
import type { Options } from '../../../shared/types'
import unicorn from '../../../shared/unicorn'

export function createConfig(opts: Partial<Options> = {}): FlatConfigComposer<Linter.FlatConfig> {
  const options = Object.assign({
    typescript: true,
  }, defaultOptions, opts)

  const c = composer()

  c.append(
    gitignore({ strict: false }),
    javascript(options),
    typescript(options),
    imports(options),
    stylistic(options),
    unicorn(options),
  )

  return c
}
