/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["@adonisjs/eslint-config/app"],
  plugins: ["eslint-plugin-import"],
  rules: {
    // common
    "comma-dangle": ["error", "always-multiline"],
    yoda: "error",
    curly: "error",

    "unicorn/filename-case": "off",

    "import/order": "error",
    "import/no-duplicates": "error",
    "import/newline-after-import": [
      "error",
      { considerComments: true, count: 1 },
    ],

    "@typescript-eslint/consistent-type-imports": [
      "off",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
  },
};
