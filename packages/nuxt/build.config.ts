import { defineBuildConfig } from 'unbuild'
import path from 'node:path'

export default defineBuildConfig({
  entries: [
    'src/index.ts',
  ],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
