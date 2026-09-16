# iPhone 静态 Web App / PWA 开发规范

> 本目录适用于 `100-ai-apps` 中所有 Web / PWA 应用。核心定位：**Static Web App + PWA + Local First + iOS App-like UI**。

## 1. 核心定位

项目采用纯前端静态 Web App 技术方案：

```text
React
TypeScript
Vite
Tailwind CSS
Konsta UI
PWA
localStorage / IndexedDB
```

默认目标：

```text
纯静态
无 Node.js 服务端
无 Java 服务端
无数据库服务器
无 SSR
无 Serverless API 依赖
npm run build 可成功执行
dist/ 可直接部署
```

设计和开发时，不应将其视为“手机网页”，而应视为：

> 使用 Web 技术实现、可从 iPhone 主屏幕启动的轻量 App。

---

## 2. 默认运行方式

```text
npm run build
      ↓
dist/
      ↓
部署到又拍云 /<appSlug>/
      ↓
https://apps.springlearn.cn/<appSlug>/
      ↓
iPhone Safari
      ↓
添加到主屏幕
      ↓
独立 App 方式启动
```

每个应用必须定义稳定的英文 `appSlug`，使用 kebab-case。

---

## 3. 规则文档索引

本 README 只保留总原则。实现时根据任务读取对应专项规范。

| 文档 | 负责内容 |
| --- | --- |
| [`APP_SHELL.md`](./APP_SHELL.md) | PWA、iOS Web App、100dvh、Safe Area、滚动、触摸、键盘、横竖屏 |
| [`KONSTA_UI.md`](./KONSTA_UI.md) | Konsta UI、iOS Theme、组件白名单、UI 选择规则、禁止网页感 |
| [`DATA_OFFLINE.md`](./DATA_OFFLINE.md) | Local First、localStorage、IndexedDB、Service Worker、离线与更新策略 |
| [`ROUTING_DEPLOY.md`](./ROUTING_DEPLOY.md) | appSlug、Hash Router、Vite base、Manifest、又拍云部署、发布脚本 |
| [`ICONS_ASSETS.md`](./ICONS_ASSETS.md) | Font Awesome Free、字体、图片、静态资源、子目录资源路径 |
| [`ACCEPTANCE.md`](./ACCEPTANCE.md) | 最终验收清单与受控例外 |

---

## 4. 默认技术决策

### UI

标准 iOS UI 默认使用 **Konsta UI**，并固定：

```tsx
<App theme="ios">
```

Konsta 已提供的标准组件不得无理由重复实现。

Tailwind CSS 主要负责布局、间距、业务样式和 Konsta 未覆盖的定制 UI。

详细规则见 [`KONSTA_UI.md`](./KONSTA_UI.md)。

### 数据

默认采用 Local First：

```text
简单数据 → localStorage
复杂、结构化、大量数据 → IndexedDB
```

没有明确需求时，禁止 AI 主动增加后端、云数据库或登录服务器。

详细规则见 [`DATA_OFFLINE.md`](./DATA_OFFLINE.md)。

### 路由

纯静态子目录部署默认优先使用 Hash Router。

只有部署环境明确配置 SPA fallback 时才考虑 Browser Router。

详细规则见 [`ROUTING_DEPLOY.md`](./ROUTING_DEPLOY.md)。

### 图标

默认使用 **Font Awesome Free**，通过 npm 本地构建并按需导入。

详细规则见 [`ICONS_ASSETS.md`](./ICONS_ASSETS.md)。

---

## 5. AI 开发总约束

AI 默认直接按以下方案实现：

```text
Static Web App
+
PWA
+
Local First
+
Konsta UI iOS Theme
+
又拍云静态部署
```

禁止 AI 未经需求确认主动增加：

```text
Node Server
Spring Boot
MySQL
PostgreSQL
Firebase
Supabase
账号服务器
云数据库
第二套完整 UI 组件库
```

如果业务明确需要账号、跨设备同步、多人共享、服务端计算等能力，应先进入当前 App 的需求与技术方案流程，再实施偏离默认规则的架构。

---

## 6. UI 总原则

设计优先级：

```text
App 感
>
触摸体验
>
信息层级
>
视觉表现
>
网页兼容性
```

优先使用移动端/iOS 交互：

```text
Tabbar
Navbar
List
Segmented
Sheet
Actions
Dialog
Toast
Swipe / 长按
```

避免：

```text
传统网页 Header
Sidebar
Breadcrumb
Footer
PC Table
浏览器式 Pagination
Hover 驱动交互
大量 Card Grid
Material / Android 风格组件
```

具体组件规则见 [`KONSTA_UI.md`](./KONSTA_UI.md)。

---

## 7. 受控例外

以下实现不是默认方案，使用时必须在当前 App 的 `requirement.md` 与 `technical-design.md` 中记录原因、边界和影响：

```text
document 级整页自然滚动
Browser Router
第二套 UI 体系
服务端后端
账号系统
跨设备同步
多人共享
云数据库
其他明显偏离本目录规范的方案
```

---

## 8. 完成定义

项目完成前必须执行 [`ACCEPTANCE.md`](./ACCEPTANCE.md) 中的验收清单。

最低要求：

```text
构建成功
静态可部署
PWA 可安装
iPhone 主屏幕独立启动
Safe Area 正确
无 document 意外滚动
Konsta 固定 iOS Theme
核心功能离线可用
本地数据可持久化
子目录路由与资源正确
```

---

## 9. 最终原则

```text
Web 技术实现
+
静态部署
+
PWA
+
Local First
+
iOS App Shell
+
Konsta UI
+
Font Awesome Free
+
独立 App 子目录部署
```

目标不是“做一个适配手机的网页”，而是：

> **使用 Web 技术实现一个可以从 iPhone 主屏幕启动、具备完整 App 感，并能稳定部署在 `apps.springlearn.cn/<appSlug>/` 下的轻量应用。**
