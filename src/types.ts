import type { EcmaVersion } from './constants.js'

export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T

export type Awaitable<T> = T | Promise<T>

export interface Options {
  root?: string

  globals: GlobalsOptions
  features: FeaturesOptions
  style: StyleOptions
}

export type UserOptions = DeepPartial<Options>

export type FeaturesOptions = {
  typescript?: boolean
  fileName?: boolean

  /**
   * Enable Vue ESLint rules.
   *
   * Requires `eslint-plugin-vue` and `vue-eslint-parser` to be installed.
   *
   * @default false
   */
  vue?: boolean

  /**
   * Enable stylistic ESLint rules.
   *
   * @see https://eslint.style/guide/config-presets
   * @default false
   */
  stylistic?: boolean

  /**
   * Enable formatters to handling formatting for different file types.
   *
   * Requires `eslint-plugin-format` to be installed.
   *
   * @default false
   */
  formatters?: false | FormattersOptions

  /**
   * Enable UnoCSS ESLint rules.
   *
   * Requires `unocss` and `@unocss/eslint-config` to be installed.
   *
   * @default false
   */
  unocss?: boolean
}

export type StyleOptions = {
  indent: number | 'tab'
  maxLen: number
  // complexity: number
  maxDepth: number
  maxParams: number
  chainDepth: number
}

export type GlobalsOptions = {
  version?: EcmaVersion
  browser?: boolean
  node?: boolean
}

export type FormattersOptions = {
  /**
   * Enable formatting support for CSS, Less, Sass, and SCSS.
   *
   * Currently only support Prettier.
   */
  css?: 'prettier' | boolean

  /**
   * Enable formatting support for HTML.
   *
   * Currently only support Prettier.
   */
  html?: 'prettier' | boolean

  /**
   * Enable formatting support for XML.
   *
   * Currently only support Prettier.
   */
  xml?: 'prettier' | boolean

  /**
   * Enable formatting support for SVG.
   *
   * Currently only support Prettier.
   */
  svg?: 'prettier' | boolean

  /**
   * Enable formatting support for Markdown.
   *
   * Support both Prettier and dprint.
   *
   * When set to `true`, it will use Prettier.
   */
  markdown?: 'prettier' | 'dprint' | boolean

  /**
   * Enable formatting support for GraphQL.
   */
  graphql?: 'prettier' | boolean

  /**
   * Custom options for Prettier.
   *
   * By default it's controlled by our own config.
   */

  prettierOptions?: any

  /**
   * Custom options for dprint.
   *
   * By default it's controlled by our own config.
   */
  dprintOptions?: boolean
}
