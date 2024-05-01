import type { Linter } from 'eslint'

export default function ignores(): Linter.FlatConfig[] {
  return [
    {
      ignores: [
        '**/node_modules',
        '**/build',
      ],
    },
  ]
}
