export const EcmaVersion = [
  'es2015',
  'es2016',
  'es2017',
  'es2018',
  'es2019',
  'es2020',
  'es2021',
  'es2022',
  'es2023',
  'es2024',
  'es2025',
  'es3',
  'es5',
] as const
export type EcmaVersion = typeof EcmaVersion[number]
