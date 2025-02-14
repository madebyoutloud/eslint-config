// @ts-expect-error missing types
import pluginVue from 'eslint-plugin-vue'
import * as parserVue from 'vue-eslint-parser'
import tsEslint from 'typescript-eslint'
import type { Linter } from 'eslint'
import type { Options } from './types'

const INLINE_ELEMENTS = ['a', 'abbr', 'audio', 'b', 'bdi', 'bdo', 'canvas', 'cite', 'code', 'data', 'del', 'dfn', 'em', 'i', 'iframe', 'ins', 'kbd', 'label', 'map', 'mark', 'noscript', 'object', 'output', 'picture', 'q', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'svg', 'time', 'u', 'var', 'video']

export function vueRules(options: Options): Partial<Linter.RulesRecord> {
  return {
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
    'vue/padding-line-between-blocks': 'error',
    // 'vue/padding-line-between-tags': [
    //   'error', [
    //     {
    //       blankLine: 'consistent',
    //       prev: '*',
    //       next: '*',
    //     },
    //   ],
    // ],
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

    // style
    'vue/array-bracket-spacing': ['error', 'never'],
    'vue/arrow-spacing': [
      'error', {
        after: true,
        before: true,
      },
    ],
    'vue/block-spacing': ['error', 'always'],
    'vue/block-tag-newline': [
      'error',
      {
        multiline: 'always',
        singleline: 'always',
      },
    ],
    'vue/brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'vue/html-indent': ['error', options.indent],
    'vue/html-quotes': ['error', 'double'],
    'vue/comma-dangle': ['error', 'always-multiline'],
    'vue/comma-spacing': [
      'error', {
        after: true,
        before: false,
      },
    ],
    'vue/comma-style': ['error', 'last'],
    'vue/html-comment-content-spacing': [
      'error',
      'always',
      { exceptions: ['-'] },
    ],
    'vue/key-spacing': [
      'error', {
        afterColon: true,
        beforeColon: false,
      },
    ],
    'vue/keyword-spacing': [
      'error', {
        after: true,
        before: true,
      },
    ],
    'vue/object-curly-newline': 'off',
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/object-property-newline': [
      'error',
      { allowMultiplePropertiesPerLine: true },
    ],
    'vue/one-component-per-file': 'off',
    'vue/operator-linebreak': ['error', 'before'],
    'vue/quote-props': ['error', 'consistent-as-needed'],
    'vue/require-default-prop': 'off',
    'vue/space-in-parens': ['error', 'never'],
    'vue/template-curly-spacing': 'error',
    'vue/multiline-html-element-content-newline': [
      'error', {
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea', 'router-link', 'RouterLink', ...INLINE_ELEMENTS],
        allowEmptyLines: false,
      },
    ],
    'vue/max-attributes-per-line': [
      'error', {
        singleline: {
          max: 6,
        },
        multiline: {
          max: 1,
        },
      },
    ],

    // max-len
    '@stylistic/max-len': 'off',
    'vue/max-len': [
      'error', {
        code: options.maxLen,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreHTMLAttributeValues: true,
        ignoreHTMLTextContents: true,
      },
    ],

    // filename case

    'unicorn/filename-case': [
      options.fileName ? 'error' : 'off',
      {
        cases: { pascalCase: true, camelCase: true },
      },
    ],
  }
}

export default function vue(options: Options): Linter.FlatConfig[] {
  return [
    {
      plugins: {
        vue: pluginVue,
      },
      languageOptions: {
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
      name: 'outloud/vue/rules',
      files: ['**/*.vue'],
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          extraFileExtensions: ['.vue'],
          parser: options.typescript ? tsEslint.parser : undefined,
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      processor: pluginVue.processors.vue,
      rules: {
        ...pluginVue.configs.base.rules,
        ...pluginVue.configs['vue3-essential'].rules,
        ...pluginVue.configs['vue3-strongly-recommended'].rules,
        ...pluginVue.configs['vue3-recommended'].rules,
        ...vueRules(options),
      },
    },
  ]
}
