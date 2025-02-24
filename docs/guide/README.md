---
sidebarDepth: 2
---

# Guide

**vuepress-plugin-iconify** is a plugin for [VuePress](https://v2.vuepress.vuejs.org) that adds icons to your documentation.

## Install

```shell
npm install vuepress-plugin-iconify -D
```

```shell
yarn add vuepress-plugin-iconify -D
```

```shell
pnpm add vuepress-plugin-iconify -D
```

## Usage

> See [Official Docs](https://v2.vuepress.vuejs.org/guide/plugin.html#plugin) about how to use a plugin in VuePress.

```ts
import { defineUserConfig } from 'vuepress'
import { iconifyPlugin } from 'vuepress-plugin-iconify'

export default defineUserConfig({
  plugins: [iconifyPlugin()],
})
```

Then, you can use the `VpIcon` component in your markdown docs:

```md
<vp-icon icon="vscode-icons:file-type-vue" width="50px" />

<vp-icon icon="vscode-icons:file-type-vue" width="50px" vFlip />

<vp-icon icon="vscode-icons:file-type-flutter" width="50px" hFlip />

<vp-icon icon="fa:github" width="50px" color="#9944a8" />

<vp-icon icon="fluent-emoji-flat:chipmunk" width="50px" :rotate="90" />

<vp-icon :icon="{ body: '<path fill=\'green\' d=\'M1393 1215q-39 125-123 250q-129 196-257 196q-49 0-140-32q-86-32-151-32q-61 0-142 33q-81 34-132 34q-152 0-301-259Q0 1144 0 902q0-228 113-374q113-144 284-144q72 0 177 30q104 30 138 30q45 0 143-34q102-34 173-34q119 0 213 65q52 36 104 100q-79 67-114 118q-65 94-65 207q0 124 69 223t158 126zM1017 42q0 61-29 136q-30 75-93 138q-54 54-108 72q-37 11-104 17q3-149 78-257Q835 41 1011 0q1 3 2.5 11t2.5 11q0 4 .5 10t.5 10z\'></path>', width: 1664, height: 1664 }" width="50px" />
```

<vp-icon icon="vscode-icons:file-type-vue" width="50px" />

<vp-icon icon="vscode-icons:file-type-vue" width="50px" vFlip />

<vp-icon icon="vscode-icons:file-type-flutter" width="50px" hFlip />

<vp-icon icon="fa:github" width="50px" color="#9944a8" />

<vp-icon icon="fluent-emoji-flat:chipmunk" width="50px" :rotate="90" />

<vp-icon :icon="{ body: '<path fill=\'green\' d=\'M1393 1215q-39 125-123 250q-129 196-257 196q-49 0-140-32q-86-32-151-32q-61 0-142 33q-81 34-132 34q-152 0-301-259Q0 1144 0 902q0-228 113-374q113-144 284-144q72 0 177 30q104 30 138 30q45 0 143-34q102-34 173-34q119 0 213 65q52 36 104 100q-79 67-114 118q-65 94-65 207q0 124 69 223t158 126zM1017 42q0 61-29 136q-30 75-93 138q-54 54-108 72q-37 11-104 17q3-149 78-257Q835 41 1011 0q1 3 2.5 11t2.5 11q0 4 .5 10t.5 10z\'></path>', width: 1664, height: 1664 }" width="50px" />

## Options

For advanced usage.

```ts
import { defineUserConfig } from 'vuepress'
import { iconifyPlugin } from 'vuepress-plugin-iconify'

export default defineUserConfig({
  plugins: [
    iconifyPlugin({
      componentName: 'VP',
    }),
  ],
})
```

### componentName

- **type:** `string`
- **default:** `VpIcon`

Override the default component name `VpIcon` via setting this option.

## Component props

**vuepress-plugin-iconify** is just a simple wrapper of [@iconify/vue](https://docs.iconify.design/icon-components/vue).

All it's [props](https://docs.iconify.design/icon-components/vue/#properties) are available.
