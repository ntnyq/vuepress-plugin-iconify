import { defineConfig } from 'tsdown'

export default defineConfig({
  clean: true,
  entry: ['src/node/**/*.ts', 'src/client/**/*.ts', 'src/shared/**/*.ts'],
  hash: false,
  platform: 'node',
  unbundle: true,
  dts: {
    generator: 'tsgo',
  },
})
