import type { Linter } from 'eslint'
import type { Options } from '../types.js'
import { ensurePackages, interopDefault } from '../utils.js'

export default async function react(_options: Options): Promise<Linter.Config[]> {
  await ensurePackages(['eslint-plugin-react', 'eslint-plugin-react-hooks'])

  const pluginReact = await interopDefault(import('eslint-plugin-react'))
  const pluginReactHooks = await import('eslint-plugin-react-hooks')

  const configs: Linter.Config[] = [
    {
      files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
      plugins: {
        'react': pluginReact,
        'react-hooks': pluginReactHooks,
      },
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: {
        ...pluginReact.configs.recommended.rules,
        ...pluginReactHooks.configs.recommended.rules,
      },
    },
  ]

  return configs
}
