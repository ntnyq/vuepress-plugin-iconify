import path from 'path'
import type { Plugin } from 'vuepress'

export interface IconifyPluginOptions {
  componentName?: string
}

export const iconifyPlugin = (options: IconifyPluginOptions = {}): Plugin => {
  return {
    name: `iconify`,

    define: {
      __ICONIFY_COMPONENT_NAME__: options.componentName ?? `VpIcon`,
    },

    clientConfigFile: path.resolve(__dirname, `../client/config.js`),
  }
}
