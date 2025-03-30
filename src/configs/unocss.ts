import type { Linter } from 'eslint'
import type { Options } from '../types.js'
import { ensurePackages, interopDefault } from '../utils.js'

export default async function unocss(_options: Options): Promise<Linter.Config[]> {
  await ensurePackages(['unocss', '@unocss/eslint-config'])

  const config = await interopDefault(import('@unocss/eslint-config/flat'))

  return [config as any]
}
