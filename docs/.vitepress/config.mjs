import { defineConfig } from "vitepress"

export default defineConfig({
  title: "素流 PureFlow",
  titleTemplate: "AI 原生文件资产管家",
  description:
    "素流 PureFlow - Android 平台 AI 原生文件资产管家，零广告零追踪，端侧语义检索，对话式文件管理",
  lang: "zh-CN",
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    // Open Graph
    [
      "meta",
      {
        property: "og:title",
        content: "素流 PureFlow - AI 原生文件资产管家",
      },
    ],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Android 平台 AI 原生文件资产管家，零广告零追踪，端侧语义检索，对话式文件管理",
      },
    ],
    [
      "meta",
      { property: "og:image", content: "https://sustream.zhangjh.cn/logo.png" },
    ],
    ["meta", { property: "og:url", content: "https://sustream.zhangjh.cn/" }],
    ["meta", { property: "og:type", content: "website" }],
    // Twitter Card
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    [
      "meta",
      {
        name: "twitter:title",
        content: "素流 PureFlow - AI 原生文件资产管家",
      },
    ],
    [
      "meta",
      {
        name: "twitter:description",
        content:
          "Android 平台 AI 原生文件资产管家，零广告零追踪，端侧语义检索，对话式文件管理",
      },
    ],
    [
      "meta",
      { name: "twitter:image", content: "https://sustream.zhangjh.cn/logo.png" },
    ],
  ],
  sitemap: {
    hostname: "https://sustream.zhangjh.cn",
  },
  themeConfig: {
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索",
            buttonAriaLabel: "搜索",
          },
          modal: {
            displayDetails: "显示详情",
            resetButtonTitle: "清除查询",
            backButtonTitle: "返回",
            noResultsText: "没有找到相关结果",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },
    logo: "/logo.png",
    nav: [
      { text: "首页", link: "/" },
      { text: "功能特性", link: "/features" },
      { text: "下载", link: "/download" },
      { text: "获取激活码", link: "/guide/purchase" },
      {
        text: "指南",
        items: [
          { text: "什么是素流？", link: "/guide/" },
          { text: "安装说明", link: "/guide/install" },
          { text: "隐私安全说明", link: "/guide/privacy" },
          { text: "Pro 版 AI 引擎", link: "/guide/pro" },
          { text: "核心应用场景", link: "/guide/use-cases" },
          { text: "联系与反馈", link: "/guide/contact" },
        ],
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "入门",
          items: [
            { text: "什么是素流？", link: "/guide/" },
            { text: "安装说明", link: "/guide/install" },
            { text: "隐私安全说明", link: "/guide/privacy" },
            { text: "联系与反馈", link: "/guide/contact" },
          ],
        },
        {
          text: "进阶",
          items: [
            { text: "Pro 版 AI 引擎", link: "/guide/pro" },
            { text: "购买激活码", link: "/guide/purchase" },
            { text: "核心应用场景", link: "/guide/use-cases" },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/zhangjh/" },
    ],
    footer: {
      message: "为追求纯净与效率的你而生 ❤️",
      copyright: "Copyright © 2026 素流 PureFlow",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    outline: {
      label: "页面大纲",
    },
  },
})
