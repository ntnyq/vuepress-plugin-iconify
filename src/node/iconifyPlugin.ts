import { getDirname, path } from 'vuepress/utils'
import { DEFAULT_COMPONENT_NAME } from '../shared/constants.js'
import { loadStaticIcons } from '../shared/utils.js'
import type { Plugin } from 'vuepress'
import type { IconifyPluginOptions } from '../shared/types.js'

const __dirname = getDirname(import.meta.url)
export type { IconifyPluginOptions } from '../shared/types.js'

export const iconifyPlugin = (options: IconifyPluginOptions = {}): Plugin => {
  const mode = options.mode ?? 'offline'
  const staticIcons = loadStaticIcons(options)

  return {
    name: 'iconify',

    define: {
      __ICONIFY_COMPONENT_NAME__:
        options.componentName ?? DEFAULT_COMPONENT_NAME,
      __ICONIFY_MODE__: mode,
      __ICONIFY_STATIC_ICONS__: staticIcons,
    },

    clientConfigFile: path.resolve(__dirname, '../client/config.mjs'),
  }
}
