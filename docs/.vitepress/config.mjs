import { defineConfig } from "vitepress"

export default defineConfig({
  title: "PureFlow",
  titleTemplate: "素流 - AI资产管家",
  description: "AI 原生资产管家 | 本地存储的数字外脑",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "文档", link: "/guide/" }
    ],
    sidebar: [
      {
        text: "介绍",
        items: [
          { text: "什么是 PureFlow?", link: "/guide/" },
          { text: "Pro 版与 AI 引擎", link: "/guide/pro" }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/zhangjh/SuStream" }
    ],
    footer: {
      message: "Build for Power Users.",
      copyright: "Copyright © 2026 PureFlow"
    }
  }
})
