import { type FlatConfigComposer, composer } from 'eslint-flat-config-utils'
import type { Linter } from 'eslint'
import gitignore from 'eslint-config-flat-gitignore'
import { isPackageExists } from 'local-pkg'
import type { Options, UserOptions } from './types.js'
import javascript from './configs/javascript.js'
import imports from './configs/imports.js'
import unicorn from './configs/unicorn.js'
import regexp from './configs/regexp.js'

export function createConfig(opts: Partial<Options> = {}): FlatConfigComposer<Linter.Config> {
  const options = resolveOptions(opts)

  const c = composer()

  c.append(
    gitignore({ strict: false }),
    javascript(options),
    imports(options),
    unicorn(options),
    regexp(options),
  )

  if (options.features.typescript) {
    c.append(import('./configs/typescript.js').then((module) => module.default(options)))
  }

  if (options.features.vue) {
    c.append(import('./configs/vue.js').then((module) => module.default(options)))
  }

  if (options.features.nuxt) {
    c.append(import('./configs/nuxt.js').then((module) => module.default(options)))
  }

  if (options.features.react) {
    c.append(import('./configs/react.js').then((module) => module.default(options)))
  }

  if (options.features.next) {
    c.append(import('./configs/next.js').then((module) => module.default(options)))
  }

  if (options.features.stylistic) {
    c.append(import('./configs/stylistic.js').then((module) => module.default(options)))
  }

  if (options.features.unocss) {
    c.append(import('./configs/unocss.js').then((module) => module.default(options)))
  }

  if (options.features.fileName) {
    c.append(import('./configs/file.js').then((module) => module.default(options)))
  }

  if (options.features.formatters) {
    c.append(import('./configs/formatters.js').then((module) => module.default(options)))
  }

  return c
}

function resolveOptions(options: UserOptions = {}): Options {
  return {
    globals: {
      version: 'es2021',
      browser: options.features?.vue ?? options.features?.react ?? false,
      node: true,
      ...options.globals,
    },

    features: {
      typescript: isPackageExists('typescript'),
      stylistic: true,
      // fileName: true,
      ...options.features,
    },

    style: {
      indent: 2,
      maxLength: 120,
      maxLines: 100,
      complexity: 7,
      maxDepth: 3,
      maxParams: 5,
      maxStatements: 20,
      chainDepth: 2,
      ...options.style,
    },
  }
}
