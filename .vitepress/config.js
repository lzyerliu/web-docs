
import drawSidebar from './sidebar/draw.js'
import shootSidebar from './sidebar/shoot.js'
import codingSidebar from './sidebar/coding.js'
import nodeSidebar from './sidebar/node.js'
import toolSidebar from './sidebar/tool.js'

export default {
  title: 'BoomC',
  description: 'WebSite Description',
  // 主题
  themeConfig: {
    siteTitle: 'BoomC',
    // 导航栏
    nav: [
      { text: 'Guide', link: '/guide/' },
      {
        text: 'Coding',
        items: [
          { text: 'Web', link: '/coding/' },
          { text: 'Node', link: '/coding/node/' },
          { text: 'Tool', link: '/tool/git/' }
        ]
      },
      {
        text: 'Life',
        items: [
          { text: 'Motto', link: '/life/motto' },
          { text: 'Draw', link: '/life/draw/' },
          { text: 'Shoot', link: '/life/shoot/' }
        ]
      }
    ],
    // 侧边栏
    sidebar: {
      '/coding/': codingSidebar,
      '/coding/node/': nodeSidebar,
      '/life/draw/': drawSidebar,
      '/life/shoot/': shootSidebar,
      '/tool/git/': toolSidebar
    },
    // 底部显示页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present zzzzzy'
    },
    // 搜索
    search: {
      provider: 'local'
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/web-docs/favicon.ico' }]
  ],
  metaChunk: true, // 当设置为 true 时，将页面元数据提取到单独的 JavaScript 块中，而不是内联在初始 HTML 中
  base: '/web-docs/', // 站点将部署到的 base URL。如果计划在子路径例如 GitHub 页面）下部署站点，则需要设置此项。如果计划将站点部署到 https://foo.github.io/bar/，那么应该将 base 设置为 “/bar/”。它应该始终以 / 开头和结尾
  assetsDir: 'assets', // 指定放置生成的静态资源的目录。该路径应位于 outDir 内，并相对于它进行解析
  srcDir: './docs', // 相对于项目根目录的 markdown 文件所在的文件夹
  outDir: './.vitepress/dist', // 项目的构建输出位置
}
