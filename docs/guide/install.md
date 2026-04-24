# 安装说明

## 1. 下载应用

PureFlow (素流) 目前处于内测阶段。您可以从以下渠道获取最新版本：

- [GitHub Releases](https://github.com/zhangjh/SuStream/releases)
- [酷安应用市场](https://www.coolapk.com/apk/cn.zhangjh.sustream)

## 2. 权限说明

### 基础版 (无需联网)

PureFlow 基础版在安装后仅需要以下核心权限即可完美运行：

- **文件存储权限**：用于浏览、管理、操作您的本地文件。

**重要提示**：基础版 PureFlow 运行时无需任何网络权限。您的所有文件操作和数据处理均在本地完成，从根源上杜绝隐私泄露风险。

### Pro 版 AI 引擎 (可选联网)

当您在 Pro 版中启用 AI 引擎或使用 BYOK (Bring Your Own Key) 模式时，应用会根据您的配置进行网络连接，用于调用您指定的大模型 API 服务。此过程仅传输结构化的指令和文件元数据，您的文件内容绝不会直接上传。

## 3. 常见问题

- **为什么 PureFlow 包体这么小？**
  PureFlow 采用原生 Kotlin 开发，极致优化。AI 引擎相关模型默认不内置，采用动态下载方式。

- **如何开启 ePub 阅读器？**
  在文件浏览器中点击 `.epub` 文件即可自动打开内置阅读器。

- **如何预览压缩包？**
  PureFlow 支持常见的 `.zip`, `.rar`, `.7z` 格式，无需解压即可直接查看内部文件列表及内容。
