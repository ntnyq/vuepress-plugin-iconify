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

The plugin runs in offline mode by default:

- build step scans your source files and collects icon ids (`prefix:name`)
- matched icon data is bundled into static client payload
- missing icons do not trigger runtime network requests in offline mode

Install icon collections for your used prefixes, for example:

```shell
pnpm add -D @iconify-json/vscode-icons @iconify-json/fa @iconify-json/fluent-emoji-flat
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
      mode: 'offline',
      icons: ['fa:github'],
      staticIcons: {
        collections: {
          'vscode-icons': true,
        },
      },
      scan: true,
    }),
  ],
})
```

### componentName

- **type:** `string`
- **default:** `VpIcon`

Override the default component name `VpIcon` via setting this option.

### mode

- **type:** `'offline' | 'online'`
- **default:** `'offline'`

Controls runtime behavior for missing icon data.

- `offline`: strict offline rendering, no network fallback.
- `online`: allows runtime fallback requests for missing icons.

### icons

- **type:** `string[]`
- **default:** `[]`

Explicit icon ids to always include in static payload.

### staticIcons

- **type:** `{ collections?: Record<string, true | string[]>; icons?: string[] }`
- **default:** `undefined`

Additional static icon sources.

- `collections[prefix] = true`: include the whole icon set.
- `collections[prefix] = ['name1', 'name2']`: include selected icons.
- `icons`: include explicit `prefix:name` ids.

### scan

- **type:** `boolean`
- **default:** `true`

Automatically scans project files and extracts `prefix:name` icon ids.

### scanDirs

- **type:** `string[]`
- **default:** `['.']`

Directories to scan when `scan` is enabled.

### scanExtensions

- **type:** `string[]`
- **default:** `['.md', '.mdx', '.vue', '.html']`

File extensions used by the scan collector.

### ignoreDirs

- **type:** `string[]`
- **default:** common build and dependency folders (`node_modules`, `dist`, `.git`, etc.)

Additional directories to skip when scanning.

## Component props

**vuepress-plugin-iconify** is just a simple wrapper of [@iconify/vue](https://docs.iconify.design/icon-components/vue).

All it's [props](https://docs.iconify.design/icon-components/vue/#properties) are available.
