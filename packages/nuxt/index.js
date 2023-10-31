/** @type {import('eslint').Linter.Config}  */
module.exports = {
  extends: ["@nuxtjs/eslint-config-typescript", "@unocss"],
  rules: {
    // common
    "comma-dangle": ["error", "always-multiline"],
    yoda: "error",
    curly: "error",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "space-before-blocks": "error",

    "import/order": "error",
    "import/no-duplicates": "error",
    "import/newline-after-import": [
      "error",
      { considerComments: true, count: 1 },
    ],

    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],

    // extra
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "error",

    // vue
    "vue/html-button-has-type": "error",
    "vue/multi-word-component-names": "off",
    "vue/no-multiple-template-root": "off",
    "vue/padding-line-between-blocks": "error",
    "vue/padding-line-between-tags": "error",
    "vue/html-self-closing": [
      "error",
      {
        html: { void: "always", normal: "never", component: "always" },
        svg: "always",
        math: "always",
      },
    ],
    "vue/block-order": [
      "error",
      {
        order: ["template", "script", "style"],
      },
    ],
    "vue/define-macros-order": [
      "error",
      {
        order: ["defineOptions", "defineProps", "defineEmits", "defineSlots"],
      },
    ],

    // unocss
    "@unocss/order": "error",
  },
};
