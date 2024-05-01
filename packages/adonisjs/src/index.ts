import { type FlatConfigComposer, composer } from 'eslint-flat-config-utils'
import { type Linter } from 'eslint';
import { defaultOptions } from '../../shared/src';
import gitignore from 'eslint-config-flat-gitignore'
import ignores from './ignores';
import javascript from '../../shared/src/javascript';
import typescript from '../../shared/src/typescript';
import imports from '../../shared/src/import';
import stylistic from '../../shared/src/stylistic';
import type { Options } from '../../shared/src/types';

export function createConfig(opts: Partial<Options> = {}): FlatConfigComposer<Linter.FlatConfig> {
  const options = Object.assign({}, defaultOptions, opts)

  const c = composer()

  c.append(
    gitignore({ strict: false }),
    ignores(),
    javascript(options, true),
    typescript(options, true),
    imports(options, true),
    stylistic(options, true),
  )

  return c
}
