import { getDirname, path } from 'vuepress/utils'
import type { Plugin } from 'vuepress'

const __dirname = getDirname(import.meta.url)

export interface IconifyPluginOptions {
  componentName?: string
}

export const iconifyPlugin = (options: IconifyPluginOptions = {}): Plugin => {
  return {
    name: 'iconify',

    define: {
      __ICONIFY_COMPONENT_NAME__: options.componentName ?? 'VpIcon',
    },

    clientConfigFile: path.resolve(__dirname, '../client/config.js'),
  }
}
