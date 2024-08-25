import { defineClientConfig } from 'vuepress/client'
import { Icon } from './components/Icon.js'

declare const __ICONIFY_COMPONENT_NAME__: string

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component(__ICONIFY_COMPONENT_NAME__, Icon)
  },
})
