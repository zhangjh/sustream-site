import { defineConfig } from "vitepress"

export default defineConfig({
  title: "素流 PureFlow",
  titleTemplate: ":title - 素流 PureFlow | AI 原生文件资产管家",
  description:
    "素流 PureFlow - Android 平台 AI 原生文件资产管家，零广告零追踪，端侧语义检索，对话式文件管理，纯净隐私的本地数字外脑",
  lang: "zh-CN",
  lastUpdated: true,
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    ["link", { rel: "apple-touch-icon", href: "/logo.png" }],
    // 全局 SEO meta
    [
      "meta",
      {
        name: "keywords",
        content:
          "素流, PureFlow, Android文件管理器, AI文件管家, 端侧AI, 语义搜索, 对话式文件管理, 零广告, 隐私保护, AI Agent, 智能清理, BYOK, 文件管理, 数字资产管理, ES文件浏览器替代, ES文件管理器替代, 无广告文件管理器, Android文件浏览器",
      },
    ],
    ["meta", { name: "author", content: "素流 PureFlow" }],
    ["meta", { name: "robots", content: "index, follow" }],
    // 51.la 站点统计
    [
      "script",
      {
        charset: "UTF-8",
        id: "LA_COLLECT",
        src: "//sdk.51.la/js-sdk-pro.min.js",
      },
    ],
    [
      "script",
      {},
      'LA.init({id:"LBgHc5k7b4XcINBe",ck:"LBgHc5k7b4XcINBe",autoTrack:true})',
    ],
    // Open Graph
    ["meta", { property: "og:site_name", content: "素流 PureFlow" }],
    ["meta", { property: "og:locale", content: "zh_CN" }],
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
          "Android 平台 AI 原生文件资产管家，零广告零追踪，端侧语义检索，对话式文件管理，纯净隐私的本地数字外脑",
      },
    ],
    [
      "meta",
      { property: "og:image", content: "https://sustream.zhangjh.cn/logo.png" },
    ],
    [
      "meta",
      { property: "og:image:alt", content: "素流 PureFlow Logo" },
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
          "Android 平台 AI 原生文件资产管家，零广告零追踪，端侧语义检索，对话式文件管理，纯净隐私的本地数字外脑",
      },
    ],
    [
      "meta",
      { name: "twitter:image", content: "https://sustream.zhangjh.cn/logo.png" },
    ],
    [
      "meta",
      { name: "twitter:image:alt", content: "素流 PureFlow Logo" },
    ],
    // JSON-LD 结构化数据
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "素流 PureFlow",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Android",
        description:
          "Android 平台 AI 原生文件资产管家，零广告零追踪，端侧语义检索，对话式文件管理",
        url: "https://sustream.zhangjh.cn",
        image: "https://sustream.zhangjh.cn/logo.png",
        author: {
          "@type": "Organization",
          name: "素流 PureFlow",
          url: "https://sustream.zhangjh.cn",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "CNY",
          description: "基础版免费，Pro 版一次购买永久使用",
        },
        featureList: [
          "文件浏览与管理（列表/网格视图、面包屑导航、多标签页）",
          "快速分类访问（收藏、图片、视频、文档等 8 个快捷入口）",
          "跨目录剪贴板",
          "文件操作（复制、剪切、重命名、删除、压缩、撤销）",
          "高级排序（名称、大小、时间、类型）",
          "压缩包管理（zip/rar/7z 免解压查看）",
          "ePub 阅读器",
          "PDF 查看器",
          "文本查看器",
          "图片查看器",
          "媒体播放器",
          "基础清理（缓存、临时文件、空文件夹）",
          "深度存储分析（可视化占用分布、大文件与重复文件识别）",
          "Material Design 3 UI（深色模式）",
          "端侧语义检索（MobileCLIP2 本地向量化，中英文离线可用）",
          "相似图片检测（近重复与语义相似分组，智能推荐保留）",
          "智能清理建议（多类型覆盖，风险等级与置信度评估）",
          "智能聚合（DBSCAN 语义聚类自动分类）",
          "智能伴读（ePub 总结与问答互动）",
          "素匣隐私保险箱（AI 敏感文件扫描 + 加密存储）",
          "素流助理 AI Agent（对话式文件管理，7 个工具链）",
          "文档语义搜索（BGE 模型，跨语言内容检索）",
          "BYOK 零加价模式（自带 API Key，数据不经中转）",
        ],
      }),
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
