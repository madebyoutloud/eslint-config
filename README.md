# ESLint config

Collection of ESLint configs for various projects.

## Packages
- `@outloud/eslint-config-typescript` - TypeScript project
- `@outloud/eslint-config-vue` - Vue.js project
- `@outloud/eslint-config-nuxt` - Nuxt project
- `@outloud/eslint-config-adonisjs` - AdonisJS project

## Usage
1. Install a config package, e.g. `@outloud/eslint-config-typescript` as dev dependency.
```bash
npm install -D @outloud/eslint-config-typescript
```

2. Import the config factory function in your `eslint.config.mjs`:
```js
import { createConfig } from '@outloud/eslint-config-typescript'

export default createConfig({
  // options here
})
```
