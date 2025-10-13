import { defineConfig } from 'tsdown'

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/node/**/*.ts', 'src/client/**/*.ts'],
  hash: false,
  platform: 'neutral',
  unbundle: true,
})
