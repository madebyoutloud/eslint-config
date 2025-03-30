import process from 'node:process'
import { isPackageExists } from 'local-pkg'
import type { Awaitable } from './types.js'

export const parserPlain = {
  meta: {
    name: 'parser-plain',
  },
  parseForESLint: (code: string) => ({
    ast: {
      body: [],
      comments: [],
      loc: { end: code.length, start: 0 },
      range: [0, code.length],
      tokens: [],
      type: 'Program',
    },
    scopeManager: null,
    services: { isPlain: true },
    visitorKeys: {
      Program: [],
    },
  }),
}

export async function ensurePackages(packages: (string | undefined)[]): Promise<void> {
  if (process.env.CI || process.stdout.isTTY === false) {
    return
  }

  const nonExistingPackages = packages.filter((i) => i && !isPackageExists(i)) as string[]
  if (nonExistingPackages.length === 0) {
    return
  }

  const p = await import('@clack/prompts')
  const result = await p.confirm({
    message: `${nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${nonExistingPackages.join(', ')}. Do you want to install them?`,
  })
  if (result) {
    await import('@antfu/install-pkg').then((i) => i.installPackage(nonExistingPackages, { dev: true }))
  }
}

export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m

  return (resolved as any).default || resolved
}

export function removeUndefined<T extends object>(obj: T): T {
  return Object.fromEntries(Object.entries(obj)
    .filter(([, value]) => value !== undefined)) as T
}
