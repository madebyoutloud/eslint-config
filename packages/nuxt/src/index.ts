import { type NuxtESLintConfigOptions, createConfigForNuxt } from '@nuxt/eslint-config/flat'
import { type FlatConfigComposer } from 'eslint-flat-config-utils'
import { type Linter } from 'eslint'
import unocss from '@unocss/eslint-config/flat'
import { type Options } from '../../../shared/types'
import { defaultOptions } from '../../../shared'
import { javascriptRules } from '../../../shared/javascript'
import { typescriptRules } from '../../../shared/typescript'
import { stylisticRules } from '../../../shared/stylistic'
import { importRules } from '../../../shared/imports'
import unicorn from '../../../shared/unicorn'
import { vueRules } from '../../../shared/vue'

interface NuxtOptions extends Options {
  nuxt: NuxtESLintConfigOptions
  unocss: boolean
}

export function createConfig(
  opts: Partial<NuxtOptions> = {},
): FlatConfigComposer<Linter.FlatConfig> {
  const options = Object.assign({
    unocss: true,
    nuxt: {
      features: {
        stylistic: true,
      },
    },
  } as NuxtOptions, defaultOptions, opts)

  const config = createConfigForNuxt(options.nuxt)
    .override('nuxt/javascript', {
      rules: javascriptRules(options),
    })
    .override('nuxt/typescript/rules', {
      rules: typescriptRules(),
    })
    .override('nuxt/import/rules', {
      rules: importRules(),
    })
    .override('nuxt/vue/rules', {
      rules: vueRules(options),
    })
    .append({
      name: 'outloud/stylistic',
      rules: stylisticRules(),
    })
    .append(unicorn(options))

  if (options.unocss) {
    config.append(unocss as any)
  }

  return config
}
