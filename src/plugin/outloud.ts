import type { ESLint } from 'eslint'
import { maxParams } from './rules/max-params.js'

const pluginOutloud: ESLint.Plugin = {
  meta: {
    name: '@outloud/eslint-plugin',
  },
  rules: {
    'max-params': maxParams,
  },
}

export default pluginOutloud
