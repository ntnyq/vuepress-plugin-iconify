import { addIcon } from '@iconify/vue'
import { defineClientConfig } from 'vuepress/client'
import { Icon } from './components/Icon.js'
import type { IconifyIconData } from '../shared/types.js'

declare const __ICONIFY_COMPONENT_NAME__: string
declare const __ICONIFY_STATIC_ICONS__: Record<string, IconifyIconData>

export default defineClientConfig({
  enhance({ app }) {
    for (const [iconName, iconData] of Object.entries(
      __ICONIFY_STATIC_ICONS__,
    )) {
      addIcon(iconName, iconData as never)
    }

    app.component(__ICONIFY_COMPONENT_NAME__, Icon)
  },
})
