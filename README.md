# vuepress-plugin-iconify

[![CI](https://github.com/ntnyq/vuepress-plugin-iconify/workflows/CI/badge.svg)](https://github.com/ntnyq/vuepress-plugin-iconify/actions)
[![NPM VERSION](https://img.shields.io/npm/v/vuepress-plugin-iconify.svg)](https://www.npmjs.com/package/vuepress-plugin-iconify)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/vuepress-plugin-iconify.svg)](https://www.npmjs.com/package/vuepress-plugin-iconify)
[![LICENSE](https://img.shields.io/github/license/ntnyq/vuepress-plugin-iconify.svg)](https://github.com/ntnyq/vuepress-plugin-iconify/blob/main/LICENSE)

**vuepress-plugin-iconify** is a plugin for [VuePress](https://v2.vuepress.vuejs.org) that adds icons to your documentation.

:book: [Live Demo and Docs](https://vuepress-plugin-iconify.ntnyq.com)

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

## Prior Art

- [iconify](https://iconify.design)

## License

[MIT](./LICENSE) &copy; [@ntnyq](https://github.com/ntnyq)
