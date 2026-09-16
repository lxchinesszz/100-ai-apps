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
Konsta UI   → 标准 iOS UI 组件与交互
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

禁止切换为 Material Design 风格，也禁止在同一个 App 中混用 iOS 与 Material Design 视觉语言。

目标不是展示 Konsta UI 的全部能力，而是利用 Konsta 提供稳定、统一、接近 iOS 系统组件的基础 UI。

---

## 3. 组件优先级

开发任何页面前，先判断 Konsta UI 是否已经存在对应标准组件。

优先级固定为：

```text
Konsta UI 标准组件
>
Konsta UI + Tailwind 组合
>
React + Tailwind 自定义业务组件
```

如果 Konsta UI 已存在对应标准组件，禁止仅为了改变少量视觉细节而重新用 Tailwind 实现一套相同组件。

只有满足以下条件之一时才允许自定义：

1. Konsta UI 没有对应组件。
2. 组件属于明确的业务专用组件，而不是通用 UI 控件。
3. Konsta 组件无法满足已确认的产品交互需求。

自定义组件仍必须遵守主 Web/PWA 规范中的 iOS Safe Area、触摸区域、字体、滚动和 App-like UI 要求。

---

## 4. 默认组件白名单

优先使用以下 Konsta UI 组件：

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

如果 Konsta UI 版本中的实际组件名称发生变化，以当前安装版本 API 为准，但不得因此切换到其他 UI 库。

---

## 5. 页面结构规则

一级页面优先采用：

```text
App
└── Page
    ├── Navbar
    ├── Main Content
    └── Tabbar（需要一级导航时）
```

页面内部需要滚动时，必须继续遵守主 Web/PWA 规范的固定 App Shell + 内部滚动区原则。

不要因为使用 Konsta `Page` 就解除根节点滚动锁定，也不要让 Konsta 默认行为破坏 `100dvh`、Safe Area 或内部滚动边界。

---

## 6. Navigation 规则

顶部导航优先使用 `Navbar`。

规则：

- 一级页面可以使用大标题或明确的页面标题。
- 二级页面优先使用返回按钮 + 页面标题。
- 返回、关闭、更多等操作保持 iOS 导航语义。
- 导航栏不要堆叠大量操作。
- 超过 2 个次要操作时，优先收入 More Menu、Actions 或 Sheet。
- 不设计传统网页 Header、面包屑或 PC 导航菜单。

---

## 7. Tabbar 规则

`Tabbar` 只用于 App 一级模块导航。

推荐数量：

```text
2 ～ 5 个
```

例如：

```text
首页 / 训练 / 历史 / 设置
```

禁止使用 Tabbar 表达页面内部筛选、时间范围切换或同一内容的不同视图。

页面内部的紧密相关视图切换优先使用 `Segmented`。

---

## 8. List 规则

列表、设置、历史记录、分类、账户信息、数据项等场景优先使用：

```text
List
+
ListItem
```

不要默认把每一条信息设计成独立 Card。

优先采用接近 iOS Settings 的结构：

```text
Section
├── ListItem
├── ListItem
└── ListItem
```

`ListItem` 可以根据业务包含：

```text
图标
主标题
副标题
右侧值
Chevron
Toggle
Badge
```

同类数据必须保持一致的 Row 结构与信息层级。

---

## 9. Button 规则

按钮按业务语义使用，不为了视觉效果大量堆叠按钮。

优先区分：

```text
Primary
Secondary
Text
Destructive
Icon
```

页面核心 CTA 可以使用明显的 Primary Button。

导航操作优先使用 Navbar / Toolbar 中的文字或 Icon 操作。

列表操作优先通过 ListItem、Swipe、Actions、Sheet 等移动端交互表达。

核心触摸区域仍不得小于主规范要求的 `44 × 44px`。

---

## 10. Toggle 规则

布尔设置优先使用 Konsta `Toggle`。

典型结构：

```text
通知提醒                 [Toggle]
```

禁止使用 Material Design Switch 或自行绘制另一套开关视觉。

---

## 11. Segmented 规则

同一页面内紧密相关的内容切换优先使用 `Segmented`。

例如：

```text
今日 / 本周
支出 / 收入
全部 / 未完成 / 已完成
```

iPhone 上应控制选项数量，通常推荐 `2 ～ 4` 项，尽量不要超过 5 项。

完全不同的一级模块不得使用 Segmented，应使用 Tabbar。

---

## 12. 输入与搜索

普通输入优先使用 Konsta `Input` / `ListInput`。

搜索优先使用 `Searchbar`，采用输入即搜索，不额外设计网页式“输入框 + 搜索按钮”。

输入框字体不得小于 `16px`，避免 iOS Safari 聚焦后自动缩放。

设置型表单优先考虑：

```text
List
+
ListInput / ListItem
```

而不是把所有表单字段都做成独立大卡片。

### 12.1 iOS Focus 样式

输入控件获得焦点后，禁止出现浏览器默认蓝色 `outline`、Tailwind `ring`、蓝色 `border` 或其他明显的网页式 Focus Ring。

Konsta 组件存在默认焦点样式时，应通过组件 props、CSS Variables、className 或统一全局样式覆盖为符合 iOS App 视觉的焦点状态，不得因为 Konsta 默认样式而保留网页式蓝框。

基础兜底样式可以统一配置：

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

同时检查并移除输入组件上的：

```text
focus:ring-*
focus:border-blue-*
focus:outline-*
```

移除蓝色 Focus Ring 不代表输入控件可以没有任何状态反馈。触摸场景中可以通过光标、背景、分隔线、标签状态或其他轻量 iOS 风格变化表达焦点，但不得重新制造一圈明显的 Web Focus Border。

对于需要键盘导航的桌面可访问性场景，不应无条件移除所有非输入控件的可见焦点反馈；本规则重点约束 iPhone PWA 中输入控件的网页式蓝框。

### 12.2 软键盘与输入控件可见性

输入框或文本域获得焦点并弹出 iOS 软键盘后：

- 当前 Focus 输入控件必须完整处于 Visual Viewport 可见区域。
- 输入控件、标签、输入内容和关键提交操作不得被键盘或 Safari 输入辅助区域遮挡。
- 焦点元素与键盘顶部之间应保留合理间距，不应刚好贴住或被覆盖。
- 必要时滚动的是明确的业务滚动容器，不得因此解除根节点滚动锁定。
- Sheet、Popup 等浮层内存在表单时，同样必须处理键盘导致的可视区域缩小。
- 不得通过固定高度、强制裁切或隐藏内容来规避键盘问题。

---

## 13. Sheet / Popup 规则

创建、编辑、筛选、选择等短流程优先考虑 `Sheet`。

例如：

```text
添加记录
编辑预算
选择分类
筛选历史
```

只有内容复杂、需要较大操作空间时才使用 `Popup` 或独立页面。

避免为了一个简单选择操作跳转到新的完整页面。

---

## 14. Actions / Dialog 规则

多个上下文操作优先使用 `Actions`。

例如：

```text
编辑
复制
分享
删除
取消
```

确认操作使用 `Dialog`。

危险操作必须明确表达 destructive 语义，并提供必要确认。

禁止使用浏览器原生 `alert()` / `confirm()` 作为正式产品交互。

---

## 15. Toast 与 Loading

轻量成功反馈使用 `Toast`，例如：

```text
已保存
已复制
打卡成功
```

Toast 应短暂显示并自动消失，不阻塞用户继续操作。

等待状态根据场景使用：

```text
Progressbar
Preloader
```

不要自行设计风格完全不同的 Loading 组件。

---

## 16. Tailwind 使用边界

Tailwind CSS 主要负责：

```text
布局
Flex / Grid
间距
宽高
业务区域排版
响应式适配
特殊业务组件
少量视觉微调
```

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

如果 Konsta 已经提供标准组件，应优先通过 Konsta props、CSS Variables 或少量 className 调整，而不是复制其结构重新实现。

---

## 17. 禁止默认 Card 化

AI 不得默认使用大量 Card 构建页面。

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

只有内容确实是独立信息单元、需要明显分组或具有独立操作边界时才使用 Card。

---

## 18. 禁止的 UI 模式

默认禁止：

```text
传统网页 Navbar
PC Header
Sidebar
Breadcrumb
Footer
友情链接
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
```

业务明确需要时可以例外，但必须有产品理由，而不是因为 AI 模板默认如此。

---

## 19. 图标规则

图标继续遵守主 Web/PWA 规范，默认使用 Font Awesome Free，并通过 npm 本地构建。

Konsta UI 负责组件结构和 iOS 交互视觉，Font Awesome Free 负责业务功能图标。

规则：

```text
Konsta UI ≠ 再引入另一套图标库
```

同一业务语义必须保持图标一致。

---

## 20. 是否封装 Konsta

第一阶段业务项目允许直接：

```tsx
import { List, ListItem, Toggle } from 'konsta/react'
```

暂不要求所有项目额外建立 `@/ui` 包装层。

当多个 App 出现稳定、重复、需要统一维护的业务级模式后，再抽取公共组件。

不要为了“架构完整”提前包装所有 Konsta 组件。

---

## 21. AI 组件选择流程

AI 在实现 UI 时按以下顺序判断：

```text
1. 这是 iPhone App 中的什么交互？
        ↓
2. Konsta 是否有对应标准组件？
        ↓
   有 → 使用 Konsta
        ↓
   无 → Konsta + Tailwind 能否组合完成？
        ↓
   能 → 组合完成
        ↓
   不能 → React + Tailwind 自定义业务组件
```

不得先写自定义组件，再考虑是否存在标准组件。

---

## 22. AI UI 设计原则

AI 设计和开发时必须优先考虑：

```text
这是一个安装在 iPhone 主屏幕上的 App
```

不是：

```text
这是一个移动端网页
```

组件选择优先级：

```text
iOS 原生交互语义
>
Konsta 标准组件
>
业务信息层级
>
视觉装饰
```

不要为了“更有设计感”主动破坏 iOS 用户已经熟悉的交互模式。

---

## 23. 验收清单

每个 Web / PWA App 完成后至少检查：

- [ ] 已安装并使用 Konsta UI。
- [ ] 根级 `App` 固定使用 `theme="ios"`。
- [ ] 没有额外引入第二套完整 UI 组件库。
- [ ] Konsta 已提供的标准组件没有被无理由重复实现。
- [ ] Navbar、Tabbar、List、Toggle、Segmented、Sheet、Dialog 等组件符合各自业务语义。
- [ ] 一级导航使用 Tabbar，页面内部切换优先使用 Segmented。
- [ ] 列表型内容优先使用 List / ListItem，而不是默认 Card 化。
- [ ] 创建、编辑、筛选、选择等短流程优先考虑 Sheet。
- [ ] 没有使用浏览器原生 alert / confirm 作为正式 UI。
- [ ] 输入框字体不小于 16px。
- [ ] 输入控件 Focus 后没有浏览器默认蓝色 outline、Tailwind ring 或非 iOS 风格焦点边框。
- [ ] iOS 软键盘弹起后，当前输入控件完整可见，并与键盘顶部保留合理间距。
- [ ] Sheet / Popup 内表单在键盘弹起后仍可完整操作。
- [ ] 核心触摸区域不小于 44 × 44px。
- [ ] 页面继续满足 Safe Area、100dvh、内部滚动区和 Home Indicator 规则。
- [ ] 没有 Material Design / Android 风格组件混入 iOS Theme。
- [ ] Font Awesome 图标通过本地依赖构建，没有因为 Konsta 再引入另一套图标体系。
- [ ] 页面整体首先呈现 App 感，而不是网页感。

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

核心规则：

> **标准 iOS UI 优先使用 Konsta UI，布局与业务定制使用 Tailwind CSS；Konsta 已有的标准组件不得无理由重复实现，不混入第二套 UI 设计体系。**