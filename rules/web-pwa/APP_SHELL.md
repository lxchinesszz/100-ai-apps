# iPhone App Shell 与 PWA 运行规范

> 本规范负责 Web/PWA 在 iPhone 上的独立 App 运行形态、动态视口、Safe Area、滚动、触摸与输入法适配。

## 1. PWA 与 iOS Web App

每个 App 必须定义稳定的 `appSlug`，Manifest 的 `start_url` 与 `scope` 必须位于 `/<appSlug>/`。

HTML 必须配置：

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="应用名称">
```

Apple Touch Icon 必须使用当前 App 子目录下的资源。

设计目标不是手机网页，而是从 iPhone 主屏幕启动的独立 App。

---

## 2. 固定 App Shell

默认使用固定 App Shell，禁止让 `document` 随业务内容增长并产生普通网页式滚动。

```css
html,
body,
#root {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
}
```

不要使用 `min-height: 100dvh` 让根容器被业务内容撑高。

推荐结构：

```text
App
├── Header / Navbar
├── Main Scroll Area
└── TabBar / Toolbar
```

---

## 3. Safe Area

必须适配：

```css
env(safe-area-inset-top)
env(safe-area-inset-bottom)
env(safe-area-inset-left)
env(safe-area-inset-right)
```

原则：

```text
背景延伸至整个物理屏幕
内容避开 Safe Area
```

顶部与底部固定区域必须把 Safe Area 计算进自身尺寸，不能额外把 App Shell 撑出视口。

---

## 4. 顶部与底部区域

顶部导航真实内容高度通常保持在约 `44px ～ 56px`，并额外叠加顶部 Safe Area。

存在 TabBar 时，底部按钮区域之外额外保留 `safe-area-inset-bottom`，避免 Home Indicator 遮挡。

Header / Navbar 与 TabBar / Toolbar 默认固定，不随业务内容滚动。

### 4.1 Bottom Safe Area 单一责任原则

底部 Safe Area 只能由一个层级负责，禁止 App Shell、Main Content、TabBar / Toolbar 多层重复叠加 `env(safe-area-inset-bottom)`。

默认职责固定为：

```text
App Shell
- 负责 100dvh
- 不额外增加 bottom safe area

Main Content
- flex: 1
- min-height: 0
- 不预留 TabBar 高度
- 不重复增加 bottom safe area

TabBar / Bottom Toolbar
- 作为 flex: none 占据正常布局空间
- 自己负责 env(safe-area-inset-bottom)
```

推荐基线：

```css
html,
body,
#root {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
}

.app-shell {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
}

.app-main {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.app-tabbar {
  flex: none;
  padding-bottom: env(safe-area-inset-bottom);
}
```

禁止以下重复占位：

```text
App Shell padding-bottom: env(safe-area-inset-bottom)
+
Main Content 为 TabBar 再预留 bottom padding
+
TabBar 自己再次 padding-bottom: env(safe-area-inset-bottom)
```

如果 TabBar / Toolbar 已在正常 Flex / Grid 布局流中占据高度，Main Content 不得再人为预留一份 TabBar 高度；只有 TabBar 使用脱离文档流的 `position: fixed` / `absolute` 时，才允许 Main Content 按实际遮挡高度进行明确补偿，并且仍只能计算一次 Safe Area。

添加到 iPhone 主屏幕后，TabBar 下方只应存在正常 Home Indicator 安全区，不得出现明显高于系统安全区的大块空白。发现底部异常空白时，优先检查：

1. `env(safe-area-inset-bottom)` 是否被多个层级重复使用。
2. Main Content 是否同时预留了 TabBar 高度和 Safe Area。
3. Konsta `Tabbar` / `Toolbar` 自身是否已经处理底部安全区。
4. App Shell 是否同时存在 `100dvh` 与额外 bottom padding / margin。
5. `body` / `#root` 与 App Shell 背景色不同，导致未覆盖区域被误认为额外空白。

---

## 5. 页面滚动

需要滚动的业务内容必须放入显式内部滚动区：

```css
.app-main {
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  -webkit-overflow-scrolling: touch;
}
```

Grid 布局同样要允许中间轨道收缩，例如使用 `minmax(0, 1fr)`。

滚动要求：

- 短内容不产生额外滚动。
- 长内容仅在内部业务区域滚动。
- 滚动到首尾后不继续把滚动链传递给 document。
- Header、TabBar、App Shell 保持稳定。
- 不依赖全局 JavaScript 拦截触摸事件作为常规方案。

文章阅读、长文档等确需整页自然滚动的页面可以例外，但必须在该 App 的需求与技术方案中明确记录。

---

## 6. Safari 动态视口与横竖屏

App Shell 使用 `dvh` 跟随 Safari 地址栏变化与横竖屏切换。

默认以现代 iPhone 竖屏为主要设计目标，设计稿可参考 `393 × 852`，代码禁止写死设备宽高。

至少验证常见宽度：

```text
375 / 390 / 393 / 402 / 430px
```

横屏默认保证页面不崩坏即可，除非产品明确要求横屏体验。

---

## 7. Touch 与输入

核心操作点击区域至少 `44 × 44px`。

禁止依赖 hover、右键或鼠标悬浮才能发现功能。

输入框字体不得小于 `16px`，避免 iOS Safari 聚焦后自动缩放。

软键盘弹出时必须保证：

- 聚焦输入框仍可见。
- 关联提示与提交操作可达。
- 不解除根节点滚动锁定。
- 不以裁切焦点元素为代价维持布局。

---

## 8. 状态栏与主题

页面背景色、Manifest `theme_color` 与 HTML `<meta name="theme-color">` 应保持一致，使状态栏与页面自然融合。

---

## 9. 验收重点

- App 从 iPhone 主屏幕启动后呈现独立 App 体验。
- 根节点没有 document 级纵向滚动。
- Safari 地址栏变化后 App Shell 仍贴合当前视口。
- Safe Area、Dynamic Island、Home Indicator 不遮挡内容。
- Bottom Safe Area 只由一个层级负责，不存在重复 padding / 占位。
- 添加到主屏幕后 TabBar 下方只保留正常 Home Indicator 安全区，不出现异常大块空白。
- 内部滚动区工作正常，固定区域不随内容移动。
- 键盘弹出后核心操作可达。
- 输入框不会导致页面异常放大。
