import unicornEslint from 'eslint-plugin-unicorn'
import type { Linter } from 'eslint'
import type { Options } from '../types.js'

export function unicornRules(): Partial<Linter.RulesRecord> {
  return {
    // Pass error message when throwing errors
    'unicorn/error-message': 'error',
    // Uppercase regex escapes
    'unicorn/escape-case': 'error',
    // Array.isArray instead of instanceof
    'unicorn/no-instanceof-array': 'error',
    // Ban `new Array` as `Array` constructor's params are ambiguous
    'unicorn/no-new-array': 'error',
    // Prevent deprecated `new Buffer()`
    'unicorn/no-new-buffer': 'error',
    // Lowercase number formatting for octal, hex, binary (0x1'error' instead of 0X1'error')
    'unicorn/number-literal-case': 'error',
    // textContent instead of innerText
    'unicorn/prefer-dom-node-text-content': 'error',
    'unicorn/no-for-loop': 'error',
    'unicorn/prefer-module': 'error',
    // Prefer using the node: protocol
    'unicorn/prefer-node-protocol': 'error',
    // includes over indexOf when checking for existence
    'unicorn/prefer-includes': 'error',
    // Prefer using number properties like `Number.isNaN` rather than `isNaN`
    'unicorn/prefer-number-properties': 'error',
    // String methods startsWith/endsWith instead of more complicated stuff
    'unicorn/prefer-string-starts-ends-with': 'error',
    // Enforce throwing type error when throwing error while checking typeof
    'unicorn/prefer-type-error': 'error',
    // Use new when throwing error
    'unicorn/throw-new-error': 'error',
  }
}

export default function unicorn(_options: Options): Linter.Config[] {
  return [
    {
      name: 'outloud/unicorn/setup',
      plugins: {
        unicorn: unicornEslint,
      },
    },
    {
      name: 'outloud/unicorn',
      rules: unicornRules(),
    },
  ]
}
