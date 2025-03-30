import type { Linter } from 'eslint'
import type { Options } from '../types.js'
import { ensurePackages, interopDefault } from '../utils.js'

export default async function nxt(_options: Options): Promise<Linter.Config[]> {
  await ensurePackages(['@next/eslint-plugin-next'])

  // @ts-expect-error missing types
  const pluginNext = await interopDefault(import('@next/eslint-plugin-next'))

  const configs: Linter.Config[] = [
    {
      files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
      plugins: {
        '@next/next': pluginNext,
      },
      rules: {
        ...pluginNext.configs.recommended.rules,
        ...pluginNext.configs['core-web-vitals'].rules,
      },
    },
  ]

  return configs
}
