# iPhone 静态 Web App / PWA 开发规范

> 本规范适用于 `100-ai-apps` 中所有 Web / PWA 应用。核心定位：**Static Web App + PWA + Local First**。

## 1. 项目定位

本项目采用 **纯前端静态 Web App** 技术方案。

核心目标：

> 使用 Web 技术开发，在 Safari 中访问，并支持通过「分享 → 添加到主屏幕」安装到 iPhone 桌面，以接近原生 iOS App 的方式独立运行。

项目不依赖 App Store，不需要 Apple Developer 账号，不需要打包 IPA。

所有 Web / PWA 应用统一部署到又拍云，统一域名：

```text
https://apps.springlearn.cn
```

每个应用使用稳定的英文 `appSlug` 作为访问和部署子目录。

---

## 2. 核心技术原则

默认技术栈：

```text
React
TypeScript
Vite
Tailwind CSS
PWA
localStorage / IndexedDB
```

项目必须满足：

```text
纯静态
无 Node.js 服务端
无 Java 服务端
无数据库服务器
无 SSR
无 Serverless API 依赖
可执行 npm run build
dist/ 可直接部署
```

业务数据默认保存在设备本地。简单数据使用 `localStorage`，复杂、结构化、大量数据优先使用 `IndexedDB`。

---

## 3. 最终运行方式

```text
npm run build
      ↓
dist/
      ↓
上传 dist/ 内文件到又拍云 /<appSlug>/
      ↓
https://apps.springlearn.cn/<appSlug>/
      ↓
iPhone Safari 打开
      ↓
点击「分享」
      ↓
添加到主屏幕
      ↓
桌面生成 App 图标
      ↓
以后直接点击图标启动
```

设计和开发时，不应该将其视为「手机网页」，而应该将其视为一个使用 Web 技术实现的 iPhone App。

---

## 4. PWA 要求

每个 App 必须先确定稳定的英文 `appSlug`，使用 kebab-case，例如：

```text
speaking-training
travel-budget
```

Manifest 必须按应用子目录配置。以 `speaking-training` 为例：

```json
{
  "name": "应用名称",
  "short_name": "应用名称",
  "start_url": "/speaking-training/",
  "scope": "/speaking-training/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#ffffff",
  "icons": [
    {
      "src": "/speaking-training/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/speaking-training/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

`display: standalone` 是重要配置。`start_url` 和 `scope` 必须与 `/<appSlug>/` 一致。

禁止假设 App 部署在域名根路径 `/`。

---

## 5. iOS Web App 配置

HTML 必须配置：

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="应用名称">
```

Apple Touch Icon 必须兼容应用子目录，例如：

```html
<link rel="apple-touch-icon" href="/speaking-training/icons/apple-touch-icon.png">
```

目标是从 iPhone 主屏幕启动后获得尽可能接近独立 App 的体验。

---

## 6. 全屏设计原则

页面必须使用整个设备可用屏幕空间。禁止按照传统 H5 的 Safari Header + 网页内容 + Safari Bottom Bar 方式设计。

App 背景必须能够延伸到屏幕顶部和底部。

---

## 7. 禁止直接使用 100vh

业务主容器不要简单使用 `height: 100vh`，优先：

```css
html,
body,
#root {
  margin: 0;
  width: 100%;
  min-height: 100%;
}

body,
#root,
.app {
  min-height: 100dvh;
}
```

---

## 8. Safe Area 适配

必须适配刘海、Dynamic Island / 灵动岛、iPhone 圆角屏幕和 Home Indicator：

```css
env(safe-area-inset-top)
env(safe-area-inset-bottom)
env(safe-area-inset-left)
env(safe-area-inset-right)
```

原则：

```text
背景 → 延伸至整个物理屏幕
内容 → 避开 Safe Area
```

---

## 9. 顶部导航设计

不要照搬普通网页 Header。顶部导航必须与 Safe Area 联动：

```css
.app-header {
  padding-top: env(safe-area-inset-top);
  height: calc(56px + env(safe-area-inset-top));
}
```

真正导航内容高度保持约 `44px ～ 56px`。

---

## 10. 底部导航设计

存在 TabBar 时必须考虑 Home Indicator：

```css
.tabbar {
  min-height: calc(64px + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
}
```

内部按钮区域保持正常高度，Safe Area 作为额外底部空间。

---

## 11. 页面滚动

默认采用：

```text
App Shell 固定
+
Content 独立滚动
```

推荐：

```text
App
├── Header
├── Main Scroll Area
└── TabBar
```

Header 和 TabBar 不应随整个浏览器页面一起滚动。

---

## 12. 禁止出现网页感

避免网页式导航栏、大面积 PC Header、Footer、友情链接、面包屑、浏览器式分页、PC 表格和 Hover 驱动交互。

优先采用 Bottom TabBar、Sheet、Bottom Sheet、Segmented Control、Swipe、Modal、Toast、Action Sheet、长按和触摸反馈。

---

## 13. Touch 交互

核心操作必须适合触摸。按钮点击区域建议至少 `44 × 44px`。不要依赖 hover、右键或鼠标悬浮才能发现功能。

轻量点击反馈示例：

```css
button:active {
  transform: scale(0.97);
}
```

---

## 14. 禁止页面意外缩放

输入框字体不要小于 `16px`：

```css
input,
textarea,
select {
  font-size: 16px;
}
```

避免 iOS Safari 聚焦输入框时自动放大页面。

---

## 15. 本地数据

没有明确要求服务器时，**禁止 AI 自行增加后端**。

打卡记录、训练进度、预算、消费记录、设置、主题、历史记录、草稿等默认保存到本机。

简单应用使用 `localStorage`，较复杂应用使用 `IndexedDB`，并考虑数据结构版本升级。

---

## 16. 离线运行

纯本地工具应该优先支持离线运行。需要真正 App 感时配置 Service Worker，使 HTML、CSS、JavaScript、字体、图标和核心静态图片在首次加载后进入合理缓存。

Service Worker 必须限制在当前 `/<appSlug>/` scope 内，禁止控制其他 App 的目录。

---

## 17. 网络依赖原则

核心功能不得依赖第三方 CDN。核心 JS、CSS、字体、图标、图片尽量随项目一起构建和部署，避免离线时字体、图标或 JS 失效。

---

## 18. 字体

优先使用 iOS 系统字体：

```css
font-family:
  -apple-system,
  BlinkMacSystemFont,
  "SF Pro Display",
  "SF Pro Text",
  "Helvetica Neue",
  Arial,
  sans-serif;
```

中文环境继续依赖系统字体 fallback，不应为了模仿 Apple UI 强制在线加载字体。

---

## 19. 图片与资源

静态资源进入 `/public` 或经过 Vite 构建。不要依赖远程图片作为核心 UI。

部署在子目录时，禁止无意识使用指向域名根目录的 `/icons/...`、`/images/...` 等路径。最终资源 URL 必须位于当前 `/<appSlug>/` 下，或由 Vite `base` 正确处理。

---

## 20. 页面路由

纯静态又拍云子目录部署默认优先使用 Hash Router：

```text
https://apps.springlearn.cn/<appSlug>/#/
https://apps.springlearn.cn/<appSlug>/#/training
https://apps.springlearn.cn/<appSlug>/#/history
```

这样刷新不会因为静态服务器缺少 SPA fallback 而产生 404。

只有部署环境明确配置 SPA fallback 时才考虑 Browser Router。

---

## 21. 更新机制

Service Worker 不允许无限缓存旧 JS。必须设计 `Cache Version + Update Strategy`。

发现新版本时可以后台更新，或者提示用户“发现新版本 / 立即更新”。缓存 key 建议包含 `appSlug` 和版本号，避免同域名下不同 App 的缓存命名冲突。

---

## 22. UI 设计尺寸

设计稿以现代 iPhone 竖屏为主要目标，建议按 `393 × 852` 附近逻辑尺寸设计，但代码禁止固定手机宽高。

至少适配 `375px / 390px / 393px / 402px / 430px` 等常见手机宽度。

---

## 23. 横屏

除非产品明确需要，否则默认以竖屏体验为第一优先级。横屏保证页面不崩坏即可。

---

## 24. 状态栏与主题

页面背景色、Manifest `theme_color` 和 HTML `<meta name="theme-color">` 应保持一致，使状态栏区域自然融入 App 背景，减少“上面是系统、下面是网页”的割裂感。

---

## 25. AI 开发约束

AI 不应主动询问是否需要后端、数据库或 App Store，除非业务明确要求。

默认直接按照：

```text
Static Web App
+
PWA
+
Local First
```

实现。

禁止擅自增加 Node Server、Spring Boot、MySQL、PostgreSQL、Firebase、Supabase、登录服务器和云数据库。

如果业务明确出现账号、跨设备同步、多人共享、服务端计算等能力，应先进入当前 App 的需求与技术方案流程，明确偏离本默认规则后再实施。

---

## 26. AI UI 设计原则

AI 生成 UI 时首先考虑：

```text
这是一个安装在 iPhone 主屏幕上的 App
```

而不是响应式手机网页。

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

所有页面需要考虑 Safe Area、Dynamic Island、Home Indicator、Bottom TabBar、触摸区域、滚动区域和键盘弹出。

---

## 27. 统一域名与又拍云部署规范

所有 Web / PWA 应用统一部署到又拍云，统一域名：

```text
https://apps.springlearn.cn
```

每个应用必须定义稳定的英文 `appSlug`，建议使用 kebab-case。应用名、URL 子目录、又拍云目录和构建 base 必须使用同一个 slug。

例如：

```text
appSlug
speaking-training

访问地址
https://apps.springlearn.cn/speaking-training/

又拍云目录
/speaking-training/

Vite base
/speaking-training/

Manifest start_url
/speaking-training/

Manifest scope
/speaking-training/
```

Vite 示例：

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/speaking-training/'
})
```

部署时上传的是 `dist/` **内部的全部文件**，目标为又拍云 `/<appSlug>/`，不要再额外嵌套一层 `dist`：

```text
dist/index.html
→ /<appSlug>/index.html

dist/assets/...
→ /<appSlug>/assets/...
```

禁止部署成：

```text
/<appSlug>/dist/index.html
```

`appSlug` 一旦发布并被用户添加到主屏幕，应视为稳定标识，不应随意修改。

---

## 28. 验收标准

AI 完成项目后必须检查：

- [ ] `npm run build` 可以成功执行。
- [ ] `dist/` 可以独立部署，不需要服务器运行时。
- [ ] 已定义稳定的英文 `appSlug`。
- [ ] Vite `base` 为 `/<appSlug>/`。
- [ ] Manifest `start_url` 和 `scope` 为 `/<appSlug>/`。
- [ ] App Icon、Manifest、JS、CSS、图片等资源在子目录下正确加载。
- [ ] Service Worker scope 不越过当前 `/<appSlug>/`。
- [ ] `dist/` 内文件可直接上传到又拍云 `/<appSlug>/`。
- [ ] `https://apps.springlearn.cn/<appSlug>/` 可以正常访问。
- [ ] Hash Router 路由刷新不会 404。
- [ ] Safari 可以正常访问并添加到 iPhone 主屏幕。
- [ ] 从桌面启动后以独立 Web App 方式运行。
- [ ] 页面背景覆盖整个屏幕区域。
- [ ] 安装后不依赖 Safari 地址栏和浏览器工具栏完成核心操作。
- [ ] 正确适配 Dynamic Island / 刘海和 Home Indicator。
- [ ] 不出现顶部、底部异常白边。
- [ ] 不使用固定手机高度，正确使用 `100dvh`。
- [ ] 输入框不会触发异常页面放大。
- [ ] 数据能够保存在本机，刷新页面不会导致数据丢失。
- [ ] 核心资源不存在不必要的第三方 CDN 依赖。
- [ ] 已配置 PWA / Manifest / App Icon。
- [ ] 如果要求离线模式，断网后核心功能仍然可使用。

---

## 29. 最终技术架构

```text
┌──────────────────────────────┐
│            iPhone            │
│                              │
│    Home Screen Web App       │
│                              │
│  React + TypeScript + PWA    │
│  LocalStorage / IndexedDB    │
└───────────────┬──────────────┘
                │
          首次访问 / 更新
                │
                ▼
https://apps.springlearn.cn/<appSlug>/
                │
                ▼
┌──────────────────────────────┐
│           又拍云             │
│                              │
│       /<appSlug>/            │
│                              │
│ HTML / CSS / JS / Assets     │
└──────────────────────────────┘
```

最终原则：

> 能在浏览器完成的个人工具，优先做成静态 Web App。

> 能保存在本机的数据，不引入服务器。

> 能通过 PWA 获得 App 体验，不为了上架而开发原生 App。

> UI 从第一天就按照 iPhone App 设计，而不是开发完成后再把网页“适配成手机端”。

> 所有 Web / PWA 应用统一发布到 `https://apps.springlearn.cn/<appSlug>/`。

> 最终产物应该做到：打开 Safari → 添加到主屏幕 → 从此以后用户基本不需要意识到它是一个网页。