import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  treeshake: 'smallest',
  outDir: './dist',
  format: ['esm', 'cjs'],
  dts: true,
  target: 'es2022',
})
