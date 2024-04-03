
import drawSidebar from './sidebar/draw.js'
import shootSidebar from './sidebar/shoot.js'
import codingSidebar from './sidebar/coding.js'

export default {
  title: 'WebSite',
  description: 'WebSite Description',
  // 主题
  themeConfig: {
    siteTitle: 'DOC Site',
    nav: [
      { text: 'Guide', link: '/coding/' },
      {
        text: 'Dropdown Menu',
        items: [
          { text: 'Draw', link: '/life/draw/' },
          { text: 'Shoot', link: '/life/shoot/' }
        ]
      }
    ],
    sidebar: {
      '/coding/': codingSidebar,
      '/life/draw/': drawSidebar,
      '/life/shoot/': shootSidebar
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present zzzzzy'
    },
    search: {
      provider: 'local'
    }
  },
  head: [],
  metaChunk: true
}
