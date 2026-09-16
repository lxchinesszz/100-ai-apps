# 需求方案：修复 iPhone 主屏幕全屏显示

## 基本信息

- 需求编号：无
- 提出日期：2026-09-15
- 当前状态：已完成
- 关联人员：用户、Codex

## 背景与问题

001-trip 是 Web/PWA 应用。当前入口将 `apple-mobile-web-app-status-bar-style` 配置为 `default`，不符合 `rules/web-pwa/` 要求的 `black-translucent`，导致从 iPhone 主屏幕启动时顶部状态栏不能与应用背景融合。同时根节点缺少完整的整屏尺寸基线，存在回弹露底风险。

## 需求目标

让应用从 iPhone 主屏幕图标启动时，以独立 PWA 形态使用整个可用屏幕，并保持安全区域内容可读。

## 需求范围

### 范围内

- 修正 iOS Web App 状态栏模式。
- 补齐 `html`、`body`、`#root` 的整屏尺寸基线。
- 显式声明 PWA React 注册入口运行时所需的 `workbox-window`，恢复可部署构建。
- 新增最小配置回归测试，防止全屏与 PWA 安装配置回退。
- 验证 PWA manifest、生产构建和生成入口。

### 范围外

- 隐藏普通 Safari 标签页自身的浏览器工具栏。
- 更换部署域名或存储空间。
- 改造现有页面视觉设计。

## 业务规则

1. 全屏效果以“添加到主屏幕后从桌面图标启动”为前提。
2. 页面背景延伸到物理屏幕，内容继续使用 safe-area inset 避让系统区域。
3. 不改变现有本地数据、路由和离线缓存业务行为。

## 验收标准

1. HTML 使用 `apple-mobile-web-app-capable=yes` 和 `apple-mobile-web-app-status-bar-style=black-translucent`。
2. viewport 保持 `viewport-fit=cover`。
3. Manifest 保持 `display=standalone`，且 `start_url`、`scope` 均为 `/trip/`。
4. `html`、`body`、`#root` 具有规范要求的宽度和最小高度基线。
5. 自动化回归测试覆盖 iOS meta、viewport、manifest 独立运行配置和根节点基线。
6. 项目测试与生产构建通过，构建产物包含正确的 iOS meta 与 manifest。

## 待确认事项

- 无；用户于 2026-09-15 明确要求修复，视为确认上述诊断方案。
