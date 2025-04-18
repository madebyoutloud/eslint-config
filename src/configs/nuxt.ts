import type { Linter } from 'eslint'
import type { Options } from '../types.js'
import { ensurePackages, interopDefault } from '../utils.js'

export default async function nuxt(_options: Options): Promise<Linter.Config[]> {
  await ensurePackages(['@nuxt/eslint-plugin'])

  const pluginNuxt = await interopDefault(import('@nuxt/eslint-plugin'))

  return [
    {
      name: 'outloud/nuxt/setup',
      plugins: {
        nuxt: pluginNuxt,
      },
    },
    {
      name: 'outloud/nuxt',
      rules: {
        'nuxt/prefer-import-meta': 'error',
      },
    },
    {
      name: 'outloud/nuxt/config',
      files: ['**/nuxt.config.?([cm])[jt]s?(x)'],
      rules: {
        'nuxt/nuxt-config-keys-order': 'error',
      },
    },
  ]
}
