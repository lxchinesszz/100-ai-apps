# iPhone 静态 Web App / PWA 开发规范

## 1. 项目定位

本规则适用于采用 **纯前端静态 Web App** 技术方案，并以 iPhone 主屏幕安装体验为主要目标的项目。

核心目标：

> 使用 Web 技术开发，在 Safari 中访问，并支持通过「分享 → 添加到主屏幕」安装到 iPhone 桌面，以接近原生 iOS App 的方式独立运行。

项目不依赖 App Store，不需要 Apple Developer 账号，不需要打包 IPA。

最终交付物必须可以直接部署到静态文件服务器，例如：

- 又拍云
- Cloudflare Pages
- GitHub Pages
- Nginx
- 任意静态 CDN

部署后用户通过 HTTPS 地址访问即可。

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

业务数据默认保存在设备本地。

简单数据使用：

```text
localStorage
```

复杂、结构化、大量数据优先：

```text
IndexedDB
```

---

## 3. 最终运行方式

用户使用流程：

```text
部署静态网站
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

添加到主屏幕后，应尽可能以独立 Web App 形式运行。

设计和开发时，不应该将其视为「手机网页」。应该将其视为：

> 一个使用 Web 技术实现的 iPhone App。

---

## 4. PWA 要求

项目必须提供 Web App Manifest，例如：

```json
{
  "name": "应用名称",
  "short_name": "应用名称",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#ffffff",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

其中：

```text
display: standalone
```

是重要配置。

禁止把安装后的应用设计成仍然依赖 Safari 地址栏和浏览器工具栏操作。

---

## 5. iOS Web App 配置

HTML 必须配置适用于 iPhone 的 viewport：

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, viewport-fit=cover"
/>
```

同时配置：

```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta
  name="apple-mobile-web-app-status-bar-style"
  content="black-translucent"
>
<meta name="apple-mobile-web-app-title" content="应用名称">
```

提供 Apple Touch Icon：

```html
<link
  rel="apple-touch-icon"
  href="/icons/apple-touch-icon.png"
>
```

目标是从 iPhone 主屏幕启动后获得尽可能接近独立 App 的体验。

---

## 6. 全屏设计原则

这是本项目非常重要的 UI 规范。

页面必须使用整个设备可用屏幕空间。

禁止按照传统 H5 网页方式设计：

```text
Safari Header
↓
网页内容
↓
Safari Bottom Bar
```

正确理解应该是：

```text
┌───────────────────────┐
│     iPhone 顶部区域    │
│                       │
│                       │
│        App UI         │
│                       │
│                       │
│                       │
│     Home Indicator    │
└───────────────────────┘
```

App 背景必须能够延伸到屏幕顶部和底部。

---

## 7. 禁止直接使用 100vh

移动 Safari 存在动态 viewport 问题。

业务主容器不要简单写：

```css
height: 100vh;
```

优先使用：

```css
min-height: 100dvh;
```

基础结构：

```css
html,
body,
#root {
  margin: 0;
  width: 100%;
  min-height: 100%;
}

body {
  min-height: 100dvh;
}

#root {
  min-height: 100dvh;
}
```

App 主容器：

```css
.app {
  width: 100%;
  min-height: 100dvh;
}
```

---

## 8. Safe Area 适配

必须适配：

- 刘海
- Dynamic Island / 灵动岛
- iPhone 圆角屏幕
- Home Indicator

使用：

```css
env(safe-area-inset-top)
env(safe-area-inset-bottom)
env(safe-area-inset-left)
env(safe-area-inset-right)
```

例如：

```css
.app-content {
  padding-top: env(safe-area-inset-top);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
}
```

注意：**Safe Area 不应该简单加在整个页面背景上。**

正确方式是：

```text
背景
→ 延伸至整个物理屏幕

内容
→ 避开 Safe Area
```

例如：

```css
.app {
  min-height: 100dvh;
  background: var(--app-background);
}

.app-content {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

这样背景可以进入灵动岛附近区域，但按钮、文字等重要内容不会被遮挡。

---

## 9. 顶部导航设计

不要照搬普通网页 Header。

推荐：

```text
┌──────────────────────┐
│      Safe Area       │
│                      │
│  ←     页面标题    ··· │
│                      │
│      页面内容         │
```

顶部导航应该与 Safe Area 联动。

例如：

```css
.app-header {
  padding-top: env(safe-area-inset-top);
  height: calc(56px + env(safe-area-inset-top));
}
```

真正导航内容高度保持约：

```text
44px ～ 56px
```

---

## 10. 底部导航设计

如果存在 TabBar：

```text
首页
训练
记录
我的
```

必须考虑 Home Indicator。

不要写死：

```css
height: 60px;
```

应该设计为：

```css
.tabbar {
  padding-bottom: env(safe-area-inset-bottom);
}
```

例如：

```css
.tabbar {
  min-height: calc(
    64px + env(safe-area-inset-bottom)
  );
}
```

内部按钮区域保持正常高度，Safe Area 作为额外底部空间。

---

## 11. 页面滚动

默认：

```text
App Shell 固定
+
Content 独立滚动
```

推荐结构：

```text
App
├── Header
├── Main Scroll Area
└── TabBar
```

不要让 Header、TabBar、整个页面一起随浏览器页面滚动。

页面应该表现得更像原生 App。

---

## 12. 禁止出现网页感

UI 设计时避免明显的传统网页特征。

避免：

```text
网页式导航栏
大面积 PC Header
Footer
友情链接
网页面包屑
浏览器式分页
PC 表格
Hover 驱动交互
```

优先采用移动 App 交互：

```text
Bottom TabBar
Sheet
Bottom Sheet
Segmented Control
Swipe
Modal
Toast
Action Sheet
长按
触摸反馈
```

---

## 13. Touch 交互

所有核心操作必须适合触摸。

按钮点击区域建议至少：

```text
44 × 44px
```

不要设计只能依靠 hover、右键、鼠标悬浮才能发现的功能。

点击应该有明确反馈，例如：

```css
button:active {
  transform: scale(0.97);
}
```

但动画应该轻量，不影响响应速度。

---

## 14. 禁止页面意外缩放

输入框字体不要小于：

```text
16px
```

避免 iOS Safari 聚焦输入框时自动放大页面。

例如：

```css
input,
textarea,
select {
  font-size: 16px;
}
```

---

## 15. 本地数据

没有明确要求服务器时：**禁止 AI 自行增加后端。**

例如用户的：

```text
打卡记录
训练进度
预算
消费记录
设置
主题
历史记录
草稿
```

默认保存到本机。

简单应用：

```text
localStorage
```

较复杂应用：

```text
IndexedDB
```

必须考虑数据结构版本升级。

---

## 16. 离线运行

如果项目要求具有真正的「App 感」，应配置 Service Worker。

目标：第一次联网访问并加载完成后：

```text
HTML
CSS
JavaScript
字体
图标
核心静态图片
```

进入本地缓存。

之后在合理的缓存策略下：

```text
无网络
↓
点击桌面 App
↓
仍然可以启动
↓
核心功能可以使用
```

纯本地工具应该优先支持离线运行。

---

## 17. 网络依赖原则

核心功能不得依赖第三方 CDN。

禁止：

```html
<script src="https://cdn.xxx.com/..."></script>
```

核心 JS、CSS、字体、图标、图片尽量随项目一起构建和部署。

否则断网后可能出现：

```text
页面能打开
但字体丢失
图标丢失
JS 失效
```

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

中文环境可以继续依赖系统字体 fallback。

不应为了模仿 Apple UI 强制在线加载字体。

---

## 19. 图片与资源

静态资源统一进入：

```text
/public
```

或者经过 Vite 构建。

不要依赖远程图片作为核心 UI。

例如：

```text
/public
  /icons
  /images
  /illustrations
```

保证整个应用可以独立部署。

---

## 20. 页面路由

纯静态部署必须考虑刷新问题。

如果服务器无法配置 SPA fallback，优先：

```text
Hash Router
```

例如：

```text
/#/
/#/training
/#/history
/#/settings
```

这样直接部署到 CDN / 对象存储也不会因为刷新子路由产生 404。

如果部署环境明确支持 SPA fallback，再使用 Browser Router。

---

## 21. 更新机制

用户从桌面启动 Web App 后，也应该能够获取新版本。

Service Worker 不允许无限缓存旧 JS。

必须设计合理的：

```text
Cache Version
+
Update Strategy
```

当发现新版本时，可以后台更新，或者提示：

```text
发现新版本
[立即更新]
```

---

## 22. UI 设计尺寸

设计稿以现代 iPhone 竖屏为主要目标。

建议按照：

```text
393 × 852
```

附近的逻辑尺寸进行设计。

但代码禁止固定：

```text
width: 393px;
height: 852px;
```

必须响应式适配不同 iPhone。

支持至少：

```text
375px
390px
393px
402px
430px
```

等常见手机宽度。

---

## 23. 横屏

除非产品明确需要，否则：

> 默认以竖屏体验为第一优先级。

横屏保证页面不崩坏即可，不需要专门设计复杂横屏 UI。

---

## 24. 状态栏与主题

页面背景色、Manifest 中的：

```json
"theme_color"
```

以及 HTML：

```html
<meta name="theme-color">
```

应该保持一致。

如果页面顶部是深色，状态栏区域也应该自然融入深色背景。

如果页面顶部是浅色，状态栏区域自然融入浅色背景。

目标是减少：

> 「上面是系统、下面是网页」

这种明显割裂感。

---

## 25. AI 开发约束

当 AI 根据本规范开发项目时，不要询问：

```text
是否需要后端？
是否需要数据库？
是否需要 App Store？
```

除非业务明确要求。

默认直接按照：

```text
Static Web App
+
PWA
+
Local First
```

实现。

禁止擅自增加：

```text
Node Server
Spring Boot
MySQL
PostgreSQL
Firebase
Supabase
登录服务器
云数据库
```

如果业务明确出现账号、跨设备同步、多人共享、服务端计算等能力，应先进入当前 App 的需求与技术方案流程，明确偏离本默认规则后再实施，不得由 AI 自行升级架构。

---

## 26. AI UI 设计原则

AI 在生成 UI 时，必须首先考虑：

```text
这是一个安装在 iPhone 主屏幕上的 App
```

而不是：

```text
这是一个响应式手机网页
```

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

所有页面都需要考虑：

```text
Safe Area
Dynamic Island
Home Indicator
Bottom TabBar
触摸区域
滚动区域
键盘弹出
```

---

## 27. 验收标准

AI 完成项目后必须检查：

- [ ] `npm run build` 可以成功执行。
- [ ] `dist/` 可以独立部署。
- [ ] 不需要服务器运行时。
- [ ] Safari 可以正常访问。
- [ ] 可以添加到 iPhone 主屏幕。
- [ ] 从桌面启动后以独立 Web App 方式运行。
- [ ] 页面背景覆盖整个屏幕区域。
- [ ] 安装后不依赖 Safari 地址栏和浏览器工具栏完成核心操作。
- [ ] 正确适配 Dynamic Island / 刘海。
- [ ] 正确适配 Home Indicator。
- [ ] 不出现顶部、底部异常白边。
- [ ] 不使用固定手机高度。
- [ ] 正确使用 `100dvh`。
- [ ] 输入框不会触发异常页面放大。
- [ ] 数据能够保存在本机。
- [ ] 刷新页面不会导致数据丢失。
- [ ] 静态部署情况下路由不会 404。
- [ ] 核心资源不存在不必要的第三方 CDN 依赖。
- [ ] 配置 PWA / Manifest / App Icon。
- [ ] 如果要求离线模式，断网后核心功能仍然可使用。

---

## 28. 最终技术架构

统一采用：

```text
┌──────────────────────────────┐
│            iPhone            │
│                              │
│    Home Screen Web App       │
│                              │
│  ┌────────────────────────┐  │
│  │ React + TypeScript     │  │
│  │                        │  │
│  │ App UI                 │  │
│  │                        │  │
│  │ Local Storage          │  │
│  │ IndexedDB              │  │
│  │ Service Worker         │  │
│  └────────────────────────┘  │
│                              │
└───────────────┬──────────────┘
                │
          首次访问 / 更新
                │
                ▼
┌──────────────────────────────┐
│       Static Hosting         │
│                              │
│         dist/                │
│                              │
│ HTML / CSS / JS / Assets     │
└──────────────────────────────┘
```

最终原则：

> 能在浏览器完成的个人工具，优先做成静态 Web App。

> 能保存在本机的数据，不引入服务器。

> 能通过 PWA 获得 App 体验，不为了上架而开发原生 App。

> UI 从第一天就按照 iPhone App 设计，而不是开发完成后再把网页“适配成手机端”。

> 最终产物应该做到：打开 Safari → 添加到主屏幕 → 从此以后用户基本不需要意识到它是一个网页。