import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  treeshake: 'smallest',
  outDir: './dist',
  format: ['esm'],
  dts: true,
  target: 'es2022',
  external: [
    'vue-eslint-parser',
    'eslint-plugin-vue',
    'eslint-plugin-format',
    '@unocss/eslint-config',
    '@prettier/plugin-xml',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    '@next/eslint-plugin-next',
  ],
})
