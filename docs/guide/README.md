---
sidebarDepth: 2
---

# Guide

**vuepress-plugin-iconify** is a plugin for [VuePress](https://v2.vuepress.vuejs.org) that adds icons to your documentation.

## Install

```shell
$ npm install vuepress-plugin-iconify -D
# or
$ yarn add vuepress-plugin-iconify -D
# or
$ pnpm add vuepress-plugin-iconify -D
```

## Usage

> See [Official Docs](https://v2.vuepress.vuejs.org/guide/plugin.html#plugin) about how to use a plugin in VuePress.

```js
import { defineUserConfig } from '@vuepress/cli'
import { iconifyPlugin } from 'vuepress-plugin-iconify'

export default defineUserConfig({
  plugins: [iconifyPlugin()],
})
```

Then, you can use the `VpIcon` component in your docs:

```markdown
<vp-icon icon="vscode-icons:file-type-vue" width="50px" />

<vp-icon icon="vscode-icons:file-type-vue" width="50px" vertical-flip />

<vp-icon icon="vscode-icons:file-type-flutter" width="50px" horizontal-flip />

<vp-icon icon="fa:github" width="50" color="#24292f" />

<vp-icon icon="fa:apple" width="50" color="#24292f" rotate="90deg" />
```

<vp-icon icon="vscode-icons:file-type-vue" width="50px" />

<vp-icon icon="vscode-icons:file-type-vue" width="50px" vertical-flip />

<vp-icon icon="vscode-icons:file-type-flutter" width="50px" horizontal-flip />

<vp-icon icon="fa:github" width="50" color="#24292f" />

<vp-icon icon="fa:apple" width="50" color="#24292f" rotate="90deg" />

## Options

For advanced usage.

```js
import { defineUserConfig } from '@vuepress/cli'
import { iconifyPlugin } from 'vuepress-plugin-iconify'

export default defineUserConfig({
  plugins: [
    iconifyPlugin({
      componentName: `VP`,
    }),
  ],
})
```

### componentName

-   **type:** `string`
-   **default:** `VpIcon`

Override the default component name `VpIcon` via setting this option.

## Component props

**vuepress-plugin-iconify** is just a simple wrapper of [@iconify/vue](https://docs.iconify.design/icon-components/vue).

All it's [props](https://docs.iconify.design/icon-components/vue/#properties) are available.
