import { type NuxtESLintConfigOptions, createConfigForNuxt } from '@nuxt/eslint-config/flat'
import { type FlatConfigComposer } from 'eslint-flat-config-utils';
import { type Linter } from 'eslint';
import { Options } from '../../shared/src/types';
import { defaultOptions } from '../../shared/src';
import javascript from '../../shared/src/javascript';
import imports from '../../shared/src/import';
import typescript from '../../shared/src/typescript';
import stylistic from '../../shared/src/stylistic';
import unocss from '@unocss/eslint-config/flat'

interface NuxtOptions extends Options {
  nuxt: NuxtESLintConfigOptions
  unocss: boolean
}

export function createConfig(opts: Partial<NuxtOptions> = {}): FlatConfigComposer<Linter.FlatConfig> {
  const options = Object.assign({
    unocss: true
  }, defaultOptions, opts)

  const config = createConfigForNuxt(options.nuxt)
  .append(javascript(options, false))
  .append(typescript(options, false))
  .append(imports(options, false))
  .append(stylistic(options, true))
  .append({
    name: 'outloud/vue',
    rules: {
      'vue/html-button-has-type': 'error',
      'vue/valid-v-slot': ['error', {
        'allowModifiers': true
      }],
      'vue/no-unused-vars': 'error',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'never',
            normal: 'never',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ],
      'vue/padding-line-between-blocks': 'error',
      'vue/padding-line-between-tags': ['error', [
        { blankLine: 'consistent', prev: '*', next: '*' }
      ]],
      'vue/block-order': [
        'error',
        {
          order: ['template', 'script', 'style'],
        },
      ],
      'vue/define-macros-order': [
        'error',
        {
          order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
        },
      ],
    }
  })

  if (options.unocss) {
    config.append(unocss as any)
  }

  return config
}
