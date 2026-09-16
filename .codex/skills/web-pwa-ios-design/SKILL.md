# Web / PWA iOS 风格设计 Skill

## 核心定位

将已确认的 Web / PWA 产品需求转化为**接近 iOS 原生 App 体验**、可直接交付前端实施的页面结构、组件选择、交互流程、状态设计与视觉规范。

本 Skill 只负责 Web / PWA 的 iOS 风格设计与设计约束，不负责扩展产品范围，不负责后端架构，不负责擅自修改业务逻辑。

适用仓库：`100-ai-apps`

默认技术与设计基线：

```text
React
TypeScript
Vite
Tailwind CSS
Konsta UI
PWA
Local First
Font Awesome Free
```

设计目标不是“做一个像 App 的手机网页”，而是：

> 使用 Web 技术实现一个从 iPhone 主屏幕启动后，具有稳定 iOS 交互语义、组件体系、Safe Area、键盘与触摸体验的轻量 App。

---

## 触发词

当任务包含以下意图时使用本 Skill：

```text
Web PWA UI
PWA UI
iOS 风格
iPhone App 风格
Konsta UI
移动端 UI 设计
设计页面
设计界面
UI 效果图
页面结构
组件设计
交互设计
App-like UI
把网页做成 iOS App 风格
```

如果需求明确为 Android、PC Web、管理后台、桌面端或非 Web/PWA，不使用本 Skill。

---

## 技能参考

开始设计前必须按顺序阅读：

1. 当前适用的 `AGENTS.md`。
2. `rules/common/README.md`。
3. `rules/web-pwa/README.md`。
4. `rules/web-pwa/APP_SHELL.md`。
5. `rules/web-pwa/KONSTA_UI.md`。
6. `rules/web-pwa/ICONS_ASSETS.md`。
7. 当前需求目录中的 `requirement.md`。
8. 如已有实现，检查当前页面、组件和已有视觉语言。

如设计涉及本地数据、路由部署或最终验收，再按需阅读：

```text
rules/web-pwa/DATA_OFFLINE.md
rules/web-pwa/ROUTING_DEPLOY.md
rules/web-pwa/ACCEPTANCE.md
```

不得用本 Skill 内的摘要替代仓库规则；规则文件是最终依据。

---

## 核心设计原则

设计时始终先问：

```text
如果这是一个真正的 iPhone App，这个交互应该是什么？
```

优先级固定为：

```text
iOS 原生交互语义
>
Konsta UI 标准组件
>
业务信息层级
>
视觉装饰
```

禁止优先追求“设计感”而破坏用户熟悉的 iOS 交互习惯。

页面应表现为 App，而不是传统移动网页。

---

## 组件选择规则

默认优先使用 Konsta UI，固定 `theme="ios"`。

组件选择顺序：

```text
1. Konsta UI 标准组件
2. Konsta UI + Tailwind 组合
3. React + Tailwind 自定义业务组件
```

Konsta 已有标准组件时，不得无理由重新实现。

优先组件：

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

设计输出中应尽量直接标注 Konsta 组件名称，避免开发再次猜测组件映射。

---

## 页面结构

一级页面优先采用：

```text
App
└── Page
    ├── Navbar
    ├── Main Content
    └── Tabbar（存在一级模块导航时）
```

默认使用固定 App Shell + 内部滚动区。

不得设计为：

```text
网页 Header
+
整页 document 滚动
+
网页 Footer
```

一级页面有 2～5 个稳定模块时使用 `Tabbar`。

页面内部紧密相关的视图切换使用 `Segmented`，不要用 Tabbar。

二级页面优先：

```text
返回
+
标题
+
必要的右侧操作
```

导航栏不堆叠大量操作；超过 2 个次要操作时优先收进 Actions、Sheet 或 More Menu。

---

## 内容组织

列表、设置、训练项、历史记录、分类、账户项、数据明细等内容优先使用：

```text
Section
+
List
+
ListItem
+
Separator
```

不要默认 Card 化。

禁止把每个信息块都做成独立大圆角 Card。

只有以下情况才使用 Card：

```text
内容本身是独立信息单元
需要明确独立操作边界
与相邻内容必须强分组
业务明确要求卡片表达
```

---

## 表单与输入

输入优先使用 `Input` / `ListInput`。

搜索优先使用 `Searchbar`，采用输入即搜索，不设计“输入框 + 搜索按钮”的网页模式。

输入字体不得小于 `16px`。

输入框获得焦点时：

```text
禁止浏览器默认蓝色 outline
禁止 Tailwind focus:ring 蓝框
禁止非 iOS 风格蓝色 border
```

可以通过轻微背景变化、系统强调色、光标等表达焦点状态，但不得出现明显网页 Focus Ring。

设计包含输入时必须考虑：

```text
软键盘弹起
当前输入框完整可见
提交操作仍可达
Sheet / Popup 不被键盘截断
Visual Viewport 高度变化
```

---

## Sheet 与弹层

以下短流程优先使用 `Sheet`：

```text
创建
编辑
筛选
选择
补充信息
快速录入
```

复杂、长流程才考虑 `Popup` 或独立页面。

多个上下文操作使用 `Actions`。

危险操作使用 `Dialog`，并明确 destructive 语义。

禁止把浏览器原生 `alert()` / `confirm()` 作为正式交互设计。

轻量成功反馈使用 `Toast`。

---

## iOS App Shell 设计要求

所有页面必须考虑：

```text
Safe Area
Dynamic Island
Home Indicator
100dvh
内部滚动区
软键盘
触摸区域
横竖屏变化
```

背景延伸到整个物理屏幕，内容避开 Safe Area。

核心触摸区域至少：

```text
44 × 44px
```

不得依赖 hover 才能发现或完成操作。

---

## 图标规则

业务功能图标默认使用 Font Awesome Free。

设计稿和设计说明中优先给出明确图标语义或具体图标名，例如：

```text
faHouse
faGear
faPlus
faChevronLeft
faTrash
```

禁止：

```text
Emoji 作为正式功能图标
同一语义在不同页面使用不同图标
为了装饰大量堆叠图标
额外引入另一套完整图标体系
```

---

## 视觉方向

默认采用克制、清晰、接近 iOS 系统应用的视觉语言。

优先：

```text
清晰信息层级
较少装饰
系统字体
稳定间距
统一圆角
浅色分隔
系统化强调色
列表优先
触摸反馈明确
```

默认避免：

```text
大量渐变
重阴影
玻璃卡片堆叠
霓虹发光
Material Design 语言
Android Bottom Navigation
Floating Action Button
PC Sidebar
网页 Breadcrumb
网页 Pagination
大面积 Dashboard 卡片网格
```

如果产品需求本身要求鲜艳或强视觉风格，可以增强颜色与品牌表达，但不得破坏 iOS 的导航、组件和交互语义。

---

## 工作流

### 步骤 1：确认产品边界

只读取已确认需求，不自行增加功能。

明确：

```text
核心用户任务
页面数量
一级模块
主流程
关键 CTA
必要状态
```

如果需求尚未确认，不进入详细 UI 设计。

### 步骤 2：建立信息架构

先输出：

```text
页面清单
页面关系
一级导航
二级页面
Sheet / Popup / Dialog
```

优先减少页面跳转，短操作优先放 Sheet。

### 步骤 3：映射 iOS 交互

对每一个交互判断：

```text
Navbar？
Tabbar？
Segmented？
ListItem？
Sheet？
Actions？
Dialog？
Toast？
```

先选系统语义，再做视觉设计。

### 步骤 4：定义页面布局

每个页面必须说明：

```text
顶部区域
内容区
滚动区域
底部区域
主操作
次操作
Safe Area
键盘行为
```

### 步骤 5：定义组件状态

至少覆盖与业务有关的：

```text
Default
Pressed
Focused
Disabled
Loading
Empty
Error
Success
Selected
Destructive
```

输入控件必须明确 Focus 状态不得出现网页蓝框。

### 步骤 6：定义视觉规范

给出足够开发直接执行的信息：

```text
字号层级
字重
间距
圆角
背景
分隔线
强调色
图标
列表密度
```

不要只给“简洁、现代、高级”等抽象描述。

### 步骤 7：开发交接

输出开发可直接使用的组件映射，例如：

```text
页面：预算首页
- Page
- Navbar
- Segmented
- List
- ListItem
- Button
- Sheet
- Toast
```

明确哪些由 Konsta 实现，哪些允许 Tailwind 自定义。

### 步骤 8：检查设计

设计完成后检查：

```text
是否仍像网页
是否过度 Card 化
是否出现 Android / Material 组件
是否存在不必要页面跳转
是否考虑 Safe Area
是否考虑键盘
是否考虑空/错/加载状态
是否存在蓝色网页 Focus Ring
是否所有操作适合触摸
```

---

## 输出口径

默认交付内容应包含以下部分，按任务复杂度裁剪，但不得遗漏关键实施信息。

### 1. 设计目标

一句话说明页面要解决的核心任务和体验目标。

### 2. 页面清单与信息架构

明确一级页面、二级页面和弹层。

### 3. 页面逐页设计

每页说明：

```text
页面目的
页面结构
主要组件
主要操作
滚动行为
状态
键盘行为
```

### 4. Konsta 组件映射

列明组件与用途。

### 5. 视觉规范

明确：

```text
字体层级
间距
圆角
颜色使用原则
图标语义
分隔方式
```

### 6. 状态与边界

覆盖必要的空状态、错误、加载、禁用、删除确认、成功反馈等。

### 7. 开发注意事项

突出：

```text
Safe Area
100dvh
内部滚动
键盘
Focus Ring
44×44 触摸区域
```

---

## 禁止事项

不得：

```text
未经确认新增产品功能
自行设计后端能力
擅自引入第二套 UI 库
Konsta 已有组件却重复造轮子
默认大量 Card
设计网页式 Header / Footer / Sidebar
使用 Material / Android 视觉体系
忽略 Safe Area
忽略 iPhone 软键盘
让输入框出现浏览器蓝色 Focus Ring
使用 Emoji 代替正式功能图标
只给视觉形容词而不给实施参数
```

---

## 检查作业

提交设计前必须自检：

- [ ] 已读取当前 Web/PWA 规则。
- [ ] 已读取已确认需求。
- [ ] 页面结构首先体现 iPhone App，而不是手机网页。
- [ ] Konsta UI 固定使用 iOS Theme。
- [ ] 标准组件优先使用 Konsta。
- [ ] 一级导航和页面内切换没有混用。
- [ ] 列表型内容没有无理由 Card 化。
- [ ] Sheet / Actions / Dialog 使用符合交互语义。
- [ ] 输入框字体不小于 16px。
- [ ] 输入框 Focus 不出现网页蓝框。
- [ ] 键盘弹起时输入和关键操作仍可见。
- [ ] 核心触摸区域至少 44 × 44px。
- [ ] Safe Area 和 Home Indicator 已考虑。
- [ ] Font Awesome 图标语义明确。
- [ ] 加载、空、错误、成功、禁用等必要状态已覆盖。
- [ ] 开发可以不猜测地完成实现。

---

## 保存交付

如果父级任务要求产出设计文档，应优先更新当前需求目录中的已有设计/技术文档，不随意新增重复文档。

如项目没有专门 UI 文档，但需要持久化设计结果，可在当前需求目录中使用：

```text
docs/requirements/<YYYYMMDD>-<requirement-slug>/ui-design.md
```

除非父级 Orchestrator 明确要求，否则本 Skill 不直接修改业务代码。

如果任务只是评审、讨论或给出设计建议，可以只输出设计结论，不创建文件。
