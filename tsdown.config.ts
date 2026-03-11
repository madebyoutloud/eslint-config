import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  treeshake: true,
  fixedExtension: false,
  outDir: './dist',
  format: ['esm'],
  dts: true,
  target: 'es2022',
  platform: 'node',
  deps: {
    onlyAllowBundle: [],
  },
})
