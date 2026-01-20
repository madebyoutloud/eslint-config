import type { EcmaVersion } from './constants.js'

export interface Options {
  root?: string

  globals: GlobalsOptions
  features: FeaturesOptions
  style: StyleOptions
}

export type UserOptions = DeepPartial<Options>

export interface FeaturesOptions {
  /**
   * Enable TypeScript rules
   *
   * @default true
   */
  typescript?: boolean

  /**
   * Enable stylistic ESLint rules.
   *
   * @see https://eslint.style/guide/config-presets
   * @default false
   */
  stylistic?: boolean

  /**
   * Enable file name convention rules.
   *
   * @default false
   */
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
   * Enable Nuxt ESLint rules.
   *
   * Requires `@nuxt/eslint-plugin` to be installed.
   *
   * @default false
   */
  nuxt?: boolean

  /**
   * Enable React ESLint rules.
   *
   * Requires `eslint-plugin-react` to be installed.
   *
   * @default false
   */
  react?: boolean

  /**
   * Enable Next.js ESLint rules.
   *
   * Requires `@next/eslint-plugin-next` to be installed.
   *
   * @default false
   */
  next?: boolean

  /**
   * Enable UnoCSS ESLint rules.
   *
   * Requires `unocss` and `@unocss/eslint-config` to be installed.
   *
   * @default false
   */
  unocss?: boolean

  /**
   * Enable formatters to handling formatting for different file types.
   *
   * Requires `eslint-plugin-format` to be installed.
   *
   * @default false
   */
  formatters?: false | FormattersOptions
}

export interface StyleOptions {
  indent: number | 'tab'
  complexity: number
  maxDepth: number
  maxParams: number
  chainDepth: number
  maxLength: number
  maxLines: number
  maxStatements: number
}

export interface GlobalsOptions {
  version?: EcmaVersion
  browser?: boolean
  node?: boolean
}

export interface FormattersOptions {
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

// utils
export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T

export type Awaitable<T> = T | Promise<T>
