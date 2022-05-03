import path from 'path'
import { type Plugin } from '@vuepress/core'

export interface IconifyPluginOptions {
  componentName?: string
}

export const iconifyPlugin = (options: IconifyPluginOptions = {}): Plugin => {
  return {
    name: `iconify`,

    define: {
      __ICONIFY_COMPONENT_NAME__: options.componentName ?? `VpIcon`,
    },

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      `../client/clientAppEnhance.js`,
    ),
  }
}
