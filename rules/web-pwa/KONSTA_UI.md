# Web / PWA Konsta UI 规范

> 本规范是 `rules/web-pwa/README.md` 的 UI 组件补充规范。所有 `100-ai-apps` 中采用 Web / PWA 方案的应用，默认使用 Konsta UI 构建接近 iOS 原生应用的界面与交互。

## 1. 默认 UI 技术栈

统一使用：

```text
React
TypeScript
Vite
Tailwind CSS
Konsta UI
PWA
```

职责边界：

```text
Konsta UI    → 标准 iOS UI 组件与交互
Tailwind CSS → 页面布局、间距、业务样式与 Konsta 未覆盖的定制 UI
```

禁止因为个人偏好或 AI 自行判断，再引入 Ionic、Framework7、Ant Design Mobile、MUI、Material UI 等第二套 UI 组件体系。

---

## 2. 固定 iOS Theme

Konsta UI 必须固定使用 iOS Theme：

```tsx
import { App } from 'konsta/react'

export default function Root() {
  return (
    <App theme="ios">
      {/* App */}
    </App>
  )
}
```

禁止混用 Material Design 视觉语言。

---

## 3. 组件优先级

组件选择顺序固定为：

```text
Konsta UI 标准组件
>
Konsta UI + Tailwind 组合
>
React + Tailwind 自定义业务组件
```

Konsta 已存在的标准组件不得无理由重复实现。

---

## 4. 默认组件白名单

### 页面与导航

```text
App
Page
Navbar
Toolbar
Tabbar
TabbarLink
```

### 内容与列表

```text
Block
BlockTitle
List
ListItem
ListInput
```

### 基础控件

```text
Button
Link
Toggle
Segmented
SegmentedButton
Input
Searchbar
```

### 浮层与反馈

```text
Sheet
Popup
Dialog
Actions
Toast
Progressbar
Preloader
```

---

## 5. 页面结构

一级页面优先采用：

```text
App
└── Page
    ├── Navbar
    ├── Main Content
    └── Tabbar（需要一级导航时）
```

页面内部滚动必须继续遵守 `APP_SHELL.md` 的固定 App Shell + 内部滚动区规则。

---

## 6. Navigation

顶部导航优先使用 `Navbar`。

- 一级页面使用清晰页面标题。
- 二级页面优先使用返回按钮 + 页面标题。
- 超过 2 个次要操作时优先收入 More Menu、Actions 或 Sheet。
- 不设计传统网页 Header、面包屑或 PC 导航菜单。

---

## 7. Tabbar

`Tabbar` 只用于一级模块导航，推荐 `2 ～ 5` 项。

页面内部紧密相关的切换优先使用 `Segmented`。

### 7.1 Bottom Safe Area

Konsta `Tabbar` / `Toolbar` 必须遵守 `APP_SHELL.md` 的 **Bottom Safe Area 单一责任原则**。

默认规则：

```text
App Shell
→ 负责 100dvh
→ 不额外增加 bottom safe area

Main Content
→ flex: 1
→ 不重复预留 TabBar 高度
→ 不重复增加 env(safe-area-inset-bottom)

Konsta Tabbar / Toolbar
→ 作为底部固定区域
→ 负责自身底部 Safe Area
```

禁止外层再次包裹：

```text
pb-[env(safe-area-inset-bottom)]
padding-bottom: env(safe-area-inset-bottom)
```

如果 Konsta 当前版本的 `Tabbar` / `Toolbar` 已经处理底部安全区，不得再在 App Shell 或 Main Content 中重复补偿。

如果底部组件处于正常 Flex / Grid 布局流中，Main Content 不得额外预留一份 TabBar 高度。只有底部组件明确使用 `position: fixed` / `absolute` 脱离布局流时，才允许根据实际遮挡高度补偿一次。

添加到 iPhone 主屏幕后，Tabbar 下方只能出现正常 Home Indicator 安全区，不允许出现大块额外空白。

---

## 8. List

列表、设置、历史记录、分类、账户信息等场景优先使用：

```text
List + ListItem
```

不要默认把每条信息做成独立 Card。

`ListItem` 可包含图标、主标题、副标题、右侧值、Chevron、Toggle、Badge 等。

---

## 9. Button

按钮按语义区分：

```text
Primary
Secondary
Text
Destructive
Icon
```

核心 CTA 才使用明显的大按钮。导航操作优先放入 Navbar / Toolbar。

核心触摸区域不得小于 `44 × 44px`。

---

## 10. Toggle

布尔设置优先使用 Konsta `Toggle`，禁止 Material Design Switch 或自行绘制另一套开关。

---

## 11. Segmented

同一页面内紧密相关内容切换使用 `Segmented`。

iPhone 上通常推荐 `2 ～ 4` 项，尽量不要超过 5 项。

---

## 12. 输入与搜索

普通输入优先使用 `Input` / `ListInput`，搜索使用 `Searchbar`。

输入框字体不得小于 `16px`。

设置型表单优先：

```text
List + ListInput / ListItem
```

### 12.1 iOS Focus 样式

输入控件获得焦点后，禁止出现浏览器默认蓝色 `outline`、Tailwind `ring`、蓝色 `border` 或其他明显网页式 Focus Ring。

基础兜底：

```css
input,
textarea,
select,
button {
  -webkit-tap-highlight-color: transparent;
}

input:focus,
textarea:focus,
select:focus,
button:focus,
input:focus-visible,
textarea:focus-visible,
select:focus-visible,
button:focus-visible {
  outline: none;
  box-shadow: none;
}
```

同时检查并移除：

```text
focus:ring-*
focus:border-blue-*
focus:outline-*
```

移除 Web Focus Ring 后，仍应通过光标、背景、分隔线或标签状态提供轻量 iOS 风格焦点反馈。

### 12.2 软键盘与输入控件可见性

iOS 软键盘弹起后：

- 当前 Focus 输入控件必须完整处于 Visual Viewport 可见区域。
- 输入控件与键盘顶部保留合理间距。
- 必要时滚动明确的业务滚动容器。
- 不解除根节点滚动锁定。
- Sheet / Popup 内的表单同样必须可滚动、输入和提交。

---

## 13. Sheet / Popup

创建、编辑、筛选、选择等短流程优先使用 `Sheet`。

只有内容复杂、需要更大操作空间时才使用 `Popup` 或独立页面。

---

## 14. Actions / Dialog

上下文多操作使用 `Actions`；确认操作使用 `Dialog`。

禁止使用浏览器原生 `alert()` / `confirm()` 作为正式产品交互。

---

## 15. Toast 与 Loading

轻量反馈使用 `Toast`。

等待状态使用：

```text
Progressbar
Preloader
```

---

## 16. Tailwind 使用边界

Tailwind 负责布局、间距、宽高、响应式、业务排版和少量视觉微调。

Tailwind 不应重复实现：

```text
Navbar
Tabbar
Toggle
Segmented Control
Dialog
Actions
Sheet
Searchbar
标准 List
标准 Button
```

---

## 17. 禁止默认 Card 化

优先：

```text
Background
+
Section
+
List
+
Separator
```

而不是：

```text
Card
Card
Card
Card
```

---

## 18. 禁止的 UI 模式

默认禁止：

```text
传统网页 Navbar
PC Header
Sidebar
Breadcrumb
Footer
浏览器式 Pagination
PC Table
Hover 驱动交互
Material Design Switch
Android Bottom Navigation 风格
Floating Action Button
网页式 Dropdown Select
大量 Card Grid
大量渐变
大量阴影
大面积装饰性玻璃卡片
Emoji 功能图标
输入控件网页式蓝色 Focus Ring
重复 Bottom Safe Area 占位
```

---

## 19. 图标规则

图标遵守 `ICONS_ASSETS.md`，默认使用 Font Awesome Free 并通过 npm 本地构建。

Konsta UI 负责组件结构与交互，Font Awesome Free 负责业务功能图标。

---

## 20. 是否封装 Konsta

第一阶段允许业务项目直接：

```tsx
import { List, ListItem, Toggle } from 'konsta/react'
```

暂不要求为所有组件建立额外 `@/ui` 包装层。

---

## 21. AI 组件选择流程

```text
1. 先判断这在 iPhone App 中属于什么交互
2. Konsta 有标准组件 → 使用 Konsta
3. Konsta + Tailwind 能完成 → 组合实现
4. 仍不能满足 → React + Tailwind 自定义业务组件
```

不得先自定义，再考虑是否存在标准组件。

---

## 22. AI UI 设计原则

始终把产品视为：

```text
安装在 iPhone 主屏幕上的 App
```

而不是移动端网页。

优先级：

```text
iOS 原生交互语义
>
Konsta 标准组件
>
业务信息层级
>
视觉装饰
```

---

## 23. 验收清单

- [ ] 已使用 Konsta UI，根级 `App` 固定 `theme="ios"`。
- [ ] 未引入第二套完整 UI 组件库。
- [ ] Konsta 已提供组件没有无理由重复实现。
- [ ] Tabbar 只用于一级导航，Segmented 用于页面内部切换。
- [ ] 列表优先 List / ListItem，不默认 Card 化。
- [ ] 输入框没有网页式蓝色 Focus Ring。
- [ ] Bottom Safe Area 只计算一次。
- [ ] Konsta Tabbar / Toolbar 下方仅保留正常 Home Indicator 安全区。
- [ ] Sheet / Popup 键盘弹起后仍可正常操作。
- [ ] 核心触摸区域不小于 `44 × 44px`。
- [ ] 页面整体呈现 App 感而不是网页感。

---

## 24. 最终原则

```text
Konsta UI
+
iOS Theme
+
Tailwind Layout
+
Font Awesome Free
+
PWA
+
Local First
```

> **标准 iOS UI 优先使用 Konsta UI；布局与业务定制使用 Tailwind CSS；底部 Safe Area 只能由一个层级负责；不混入第二套 UI 设计体系。**
