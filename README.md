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

2. Import the config factory function in your `eslint.config.js` or (`eslint.config.mjs` if your project is not ESM):
```js
import { createConfig } from '@outloud/eslint-config-typescript'

export default createConfig({
  // options here
})
```

## Customization

`createConfig()` returns a chainable [`FlatConfigComposer`](https://github.com/antfu/eslint-flat-config-utils#composer) instance from [`eslint-flat-config-utils`](https://github.com/antfu/eslint-flat-config-utils) which allows you to manipulate the ESLint flat config with ease. If you want to combine with other configs, you can use the `.append()` method:

```ts
import { createConfig } from '@outloud/eslint-config-typescript'

export default createConfig({
  // options here
})
  .append({
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
    }
  })
```
