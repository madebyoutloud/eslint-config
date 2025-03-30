import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  treeshake: 'smallest',
  outDir: './dist',
  format: ['esm', 'cjs'],
  dts: true,
  target: 'es2022',
  external: [
    'vue-eslint-parser',
    'eslint-plugin-vue',
    'eslint-plugin-format',
    '@unocss/eslint-config',
    '@prettier/plugin-xml',
  ],
})
