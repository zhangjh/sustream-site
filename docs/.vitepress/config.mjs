import { defineConfig } from "vitepress"

export default defineConfig({
  title: "素流 PureFlow",
  titleTemplate: "AI 原生资产管家",
  description: "素流 PureFlow - 拒绝臃肿与监控 · 端侧 AI 语义检索 · 你的本地私人数字外脑",
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: "首页", link: "/" },
      { text: "下载", link: "/download" },
      { text: "指南", link: "/guide/" }
    ],
    sidebar: [
      {
        text: "入门指南",
        items: [
          { text: "什么是素流?", link: "/guide/" },
          { text: "安装说明", link: "/guide/install" },
          { text: "隐私安全说明", link: "/guide/privacy" }
        ]
      },
      {
        text: "高级特性",
        items: [
          { text: "Pro 版 AI 引擎", link: "/guide/pro" },
          { text: "语义检索系统", link: "/guide/semantic" },
          { text: "自动化工作流", link: "/guide/workflow" }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/zhangjh/SuStream" }
    ],
    footer: {
      message: "Build for Power Users with ❤️",
      copyright: "Copyright © 2026 PureFlow"
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      label: '页面大纲'
    }
  }
})
