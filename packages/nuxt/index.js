/** @type {import('eslint').Linter.Config}  */
module.exports = {
  extends: ["@nuxtjs/eslint-config-typescript", "@unocss"],
  rules: {
    "no-console": ["error", { allow: ["warn", "error"] }],
    "comma-dangle": ["error", "always-multiline"],
    yoda: "error",
    curly: "error",

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

    "vue/html-button-has-type": "error",
    "vue/no-multiple-template-root": "off",
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
        order: [
          "defineOptions",
          "defineProps",
          "defineModel",
          "defineEmits",
          "defineSlots",
          "defineExpose",
        ],
      },
    ],

    "@unocss/order": "error",
  },
};
