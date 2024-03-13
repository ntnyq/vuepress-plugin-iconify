import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { iconifyPlugin } from 'vuepress-plugin-iconify'

export default defineUserConfig({
  title: 'vuepress-plugin-iconify',

  description: 'Using icons more easier in VuePress',

  bundler: viteBundler(),

  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22>%0A      <text y=%22.9em%22 font-size=%2290%22>%0A        %F0%9F%90%A3%0A      </text>%0A    </svg>',
        type: 'image/svg+xml',
      },
    ],
  ],

  theme: defaultTheme({
    repo: 'ntnyq/vuepress-plugin-iconify',
    docsRepo: 'ntnyq/vuepress-plugin-iconify',
    docsDir: 'docs',
    docsBranch: 'main',
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      {
        text: 'Changelog',
        link: 'https://github.com/ntnyq/vuepress-plugin-iconify/releases',
      },
    ],
    sidebar: ['/guide/'],
  }),

  plugins: [
    iconifyPlugin(),
    googleAnalyticsPlugin({
      // cSpell: disable-next-line
      id: 'G-97LTTPDNZH',
    }),
  ],
})
