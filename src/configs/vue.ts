import { mergeProcessors } from 'eslint-merge-processors'
import processorVueBlocks from 'eslint-processor-vue-blocks'
import type { Linter } from 'eslint'
import type { Options } from '../types.js'
import { ensurePackages, interopDefault, removeUndefined } from '../utils.js'

// imported from 'eslint-plugin-vue/lib/utils/inline-non-void-elements.json'
const INLINE_ELEMENTS = ['a', 'abbr', 'audio', 'b', 'bdi', 'bdo', 'canvas', 'cite', 'code', 'data', 'del', 'dfn', 'em', 'i', 'iframe', 'ins', 'kbd', 'label', 'map', 'mark', 'noscript', 'object', 'output', 'picture', 'q', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'svg', 'time', 'u', 'var', 'video']

export function vueRules(options: Options): Partial<Linter.RulesRecord> {
  return {
    // Deprecated in favor of 'vue/block-order'
    'vue/component-tags-order': undefined,
    'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],

    'vue/multi-word-component-names': 'off',
    'vue/html-button-has-type': 'error',
    'vue/valid-v-slot': [
      'error', {
        allowModifiers: true,
      },
    ],
    'vue/no-unused-vars': 'error',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/define-props-declaration': 'error',
    'vue/prefer-use-template-ref': 'error',
    'vue/prefer-separate-static-class': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/no-template-target-blank': 'error',
    'vue/no-ref-object-reactivity-loss': 'error',

    // style
    ...stylisticRules(options),
  }
}

export function stylisticRules(options: Options): Partial<Linter.RulesRecord> {
  if (!options.features.stylistic) {
    return {
      // Disable Vue's default stylistic rules when stylistic is not enabled
      'vue/html-closing-bracket-newline': undefined,
      'vue/html-closing-bracket-spacing': undefined,
      'vue/html-indent': undefined,
      'vue/html-quotes': undefined,
      'vue/max-attributes-per-line': undefined,
      'vue/multiline-html-element-content-newline': undefined,
      'vue/mustache-interpolation-spacing': undefined,
      'vue/no-multi-spaces': undefined,
      'vue/no-spaces-around-equal-signs-in-attribute': undefined,
      'vue/singleline-html-element-content-newline': undefined,
    }
  }

  return {
    'vue/array-bracket-spacing': ['error', 'never'],
    'vue/arrow-spacing': ['error', { after: true, before: true }],
    'vue/block-spacing': ['error', 'always'],
    'vue/block-tag-newline': [
      'error',
      {
        multiline: 'always',
        singleline: 'always',
      },
    ],
    'vue/brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'vue/html-indent': ['error', options.style.indent],
    'vue/html-quotes': ['error', 'double'],
    'vue/comma-dangle': ['error', 'always-multiline'], // commaDangle
    'vue/comma-spacing': ['error', { after: true, before: false }],
    'vue/comma-style': ['error', 'last'],
    'vue/html-comment-content-spacing': [
      'error',
      'always',
      { exceptions: ['-'] },
    ],
    'vue/key-spacing': ['error', { afterColon: true, beforeColon: false }],
    'vue/keyword-spacing': ['error', { after: true, before: true }],
    'vue/object-curly-newline': 'off',
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/object-property-newline': [
      'error',
      { allowMultiplePropertiesPerLine: true },
    ],
    'vue/one-component-per-file': 'off',
    'vue/operator-linebreak': ['error', 'before'],
    'vue/padding-line-between-blocks': ['error', 'always'],
    // 'vue/padding-line-between-tags': [
    //   'error', [
    //     {
    //       blankLine: 'consistent',
    //       prev: '*',
    //       next: '*',
    //     },
    //   ],
    // ],
    'vue/quote-props': ['error', 'consistent-as-needed'],
    'vue/require-default-prop': 'off',
    'vue/space-in-parens': ['error', 'never'],
    'vue/template-curly-spacing': 'error',
    'vue/multiline-html-element-content-newline': [
      'error', {
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea', 'router-link', 'RouterLink', 'nuxt-link', 'NuxtLink', 'u-link', 'ULink', ...INLINE_ELEMENTS],
        allowEmptyLines: false,
      },
    ],
    'vue/singleline-html-element-content-newline': [
      'error', {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea', 'router-link', 'RouterLink', 'nuxt-link', 'NuxtLink', 'u-link', 'ULink', ...INLINE_ELEMENTS],
        externalIgnores: [],
      },
    ],

    'vue/max-attributes-per-line': [
      'error', {
        singleline: { max: 6 },
        multiline: { max: 1 },
      },
    ],
    'vue/define-macros-order': [
      'error',
      {
        order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
      },
    ],
    // 'vue/v-on-handler-style': ['error', ['method', 'inline']],
    'vue/prefer-true-attribute-shorthand': 'error',
  }
}

export default async function vue(options: Options): Promise<Linter.Config[]> {
  await ensurePackages(['eslint-plugin-vue', 'vue-eslint-parser'])

  const pluginVue = await interopDefault(import('eslint-plugin-vue'))
  const parserVue = await import('vue-eslint-parser')

  const parser = options.features.typescript
    ? await import('./typescript.js').then((module) => module.parser)
    : undefined

  let processor = pluginVue.processors.vue

  if (options.features.formatters) {
    processor = mergeProcessors([
      pluginVue.processors.vue,
      processorVueBlocks({
        blocks: {
          styles: true,
        },
      }),
    ])
  }

  const vueConfigs = pluginVue.configs as any

  const configs: Linter.Config[] = [
    {
      name: 'outloud/vue/setup',
      plugins: {
        vue: pluginVue,
      },
      languageOptions: {
        parserOptions: {
          ecmaVersion: 'latest',
          extraFileExtensions: ['.vue'],
          parser,
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
        },
        // This allows Vue plugin to work with auto imports
        // https://github.com/vuejs/eslint-plugin-vue/pull/2422
        globals: {
          computed: 'readonly',
          defineEmits: 'readonly',
          defineExpose: 'readonly',
          defineProps: 'readonly',
          onMounted: 'readonly',
          onUnmounted: 'readonly',
          reactive: 'readonly',
          ref: 'readonly',
          shallowReactive: 'readonly',
          shallowRef: 'readonly',
          toRef: 'readonly',
          toRefs: 'readonly',
          watch: 'readonly',
          watchEffect: 'readonly',
        },
      },
    },
    {
      name: 'outloud/vue',
      files: ['**/*.vue'],
      languageOptions: {
        parser: parserVue,
      },
      processor,
      rules: {
        ...pluginVue.configs.base.rules,
        ...vueConfigs['essential'].rules,
        ...vueConfigs['strongly-recommended'].rules,
        ...vueConfigs['recommended'].rules,
        ...vueRules(options),
      },
    },
  ]

  for (const config of configs) {
    if (config.rules) {
      config.rules = removeUndefined(config.rules)
    }
  }

  return configs
}
