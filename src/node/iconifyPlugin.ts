import { URL, fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import type { Plugin } from 'vuepress'

const __dirname = fileURLToPath(new URL(`.`, import.meta.url))

export interface IconifyPluginOptions {
  componentName?: string
}

export const iconifyPlugin = (options: IconifyPluginOptions = {}): Plugin => {
  return {
    name: `iconify`,

    define: {
      __ICONIFY_COMPONENT_NAME__: options.componentName ?? `VpIcon`,
    },

    clientConfigFile: resolve(__dirname, `../client/config.js`),
  }
}
