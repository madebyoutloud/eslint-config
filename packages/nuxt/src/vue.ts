import { type Linter } from 'eslint'

export function vueRules(): Partial<Linter.RulesRecord> {
  return {
    'vue/html-button-has-type': 'error',
    'vue/valid-v-slot': ['error', {
      allowModifiers: true,
    }],
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
    'vue/padding-line-between-tags': ['error', [
      {
        blankLine: 'consistent',
        prev: '*',
        next: '*',
      },
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
}
