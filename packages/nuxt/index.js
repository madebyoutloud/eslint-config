/** @type {import('eslint').Linter.Config}  */
module.exports = {
  extends: ["@nuxtjs/eslint-config-typescript", "@unocss"],
  rules: {
    "@unocss/order": "error",
  }
}
