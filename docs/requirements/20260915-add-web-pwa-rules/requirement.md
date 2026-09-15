# 需求方案：新增 iPhone 静态 Web App / PWA 开发规范

## 基本信息

- 需求编号：无
- 提出日期：2026-09-15
- 当前状态：已确认
- 关联人员：用户、Agent

## 背景与问题

`100-ai-apps` 中的 Web / PWA 项目主要面向一种明确的产品形态：使用 Web 技术开发纯前端静态应用，通过 HTTPS 部署，在 iPhone Safari 中访问，并通过「分享 → 添加到主屏幕」安装到桌面，以接近原生 iOS App 的方式独立运行。

原方案将 Web / PWA 规则拆分为多个通用主题，并允许按需求逐步引入 Serverless / 后端。用户进一步明确，本规则不应定义为宽泛的通用 Web 规范，而应聚焦 **iPhone 静态 Web App / PWA**，坚持 Static Web App + PWA + Local First。

## 需求目标

建立 `rules/web-pwa/` 第一版规则，作为 iPhone 静态 Web App / PWA 的统一开发规范，使 AI 从产品设计、UI、技术实现、存储、PWA、离线、路由到静态部署都按照“安装在 iPhone 主屏幕上的 App”进行开发，而不是按照传统响应式手机网页开发。

## 需求范围

### 范围内

- 明确 React + TypeScript + Vite + Tailwind CSS + PWA + localStorage / IndexedDB 默认技术栈。
- 强制纯静态构建：无 Node.js 服务端、无 Java 服务端、无数据库服务器、无 SSR、无 Serverless API 依赖。
- 明确 `npm run build` 后 `dist/` 可直接部署到任意静态服务器 / CDN。
- 明确 iPhone Safari → 添加到主屏幕 → standalone 独立运行的最终使用方式。
- 定义 Manifest、Apple Web App meta、Apple Touch Icon、viewport-fit=cover 等配置。
- 定义 100dvh、Safe Area、Dynamic Island、Home Indicator、顶部导航、TabBar 和独立滚动区域规范。
- 定义 Touch、输入框字体、系统字体、资源本地化、静态路由、Service Worker、离线和更新机制。
- 明确 localStorage / IndexedDB 的本地优先数据原则。
- 明确 UI 应以 iPhone App 而非手机网页为设计对象。
- 定义最终项目验收清单。

### 范围外

- 不编写通用 PC Web 开发规范。
- 不引入服务端、Serverless、云数据库或登录服务器作为默认架构。
- 不编写微信小程序、桌面端、原生 iOS / Android 规则。
- 不修改任何具体 App 代码。

## 业务规则

1. Web / PWA 项目默认定位为纯前端静态 iPhone Web App。
2. 默认架构固定为 `Static Web App + PWA + Local First`。
3. 没有业务明确要求时，AI 禁止自行增加 Node Server、Spring Boot、MySQL、PostgreSQL、Firebase、Supabase、登录服务器和云数据库。
4. UI 从第一天按照安装在 iPhone 主屏幕上的 App 设计，不按传统 H5 网页设计。
5. 页面背景覆盖整个可用屏幕，内容避开 Safe Area；优先使用 `100dvh`，业务主容器禁止简单依赖 `100vh`。
6. 简单数据使用 localStorage；复杂、结构化、大量数据使用 IndexedDB，并考虑数据结构版本升级。
7. 核心 JS / CSS / 字体 / 图标 / 图片不得依赖不必要的第三方 CDN。
8. 静态服务器无法提供 SPA fallback 时优先使用 Hash Router。
9. 需要离线 App 体验时配置 Service Worker，并设计缓存版本和更新策略。
10. 最终产物必须可以通过 HTTPS 静态部署，并支持 Safari 添加到主屏幕后独立运行。

## 验收标准

1. 仓库存在 `rules/web-pwa/README.md`。
2. 规则完整覆盖用户给出的 28 个主题，不削弱核心约束。
3. 规则明确纯静态、PWA、Local First 三项架构原则。
4. 规则明确 iPhone 主屏幕安装、standalone、Safe Area、Dynamic Island、Home Indicator 和 100dvh。
5. 规则明确 localStorage / IndexedDB、本地资源、静态路由、离线与更新机制。
6. 规则明确 AI 不得默认引入后端 / Serverless / 云数据库。
7. 规则包含可执行的最终验收清单。
8. 本次不修改任何具体 App。

## 待确认事项

- 无。用户已明确要求按照其提供的《iPhone 静态 Web App / PWA 开发规范》重写规则。