# 技术方案：修复 iPhone 主屏幕全屏显示

## 现状分析

`index.html` 已配置 `viewport-fit=cover` 和 `apple-mobile-web-app-capable=yes`，manifest 也已配置 `/trip/` scope/start URL 与 `display=standalone`。但状态栏样式为 `default`，与 Web/PWA 规则不一致。`app.css` 在页面容器上使用 `100dvh` 与 safe-area，但根节点未完整声明整屏基线。

## 方案设计

将 iOS 状态栏样式改为 `black-translucent`，允许应用背景延伸到状态栏下方；为 `html`、`body`、`#root` 设置零边距、100% 宽度及 100% 最小高度，并保留现有 `.app-shell`、`.page` 的 `100dvh` 与 safe-area 处理。显式添加 `workbox-window` 运行时依赖，满足 `vite-plugin-pwa` React 注册入口的模块解析要求。新增基于 Vitest 的源配置回归测试，直接检查入口 HTML、Vite manifest 配置和全局 CSS 基线。

## 接口与数据影响

- API：无
- 数据库：无
- 配置：修改 HTML PWA 元数据与全局 CSS 基线
- 外部依赖：新增 `workbox-window`，版本与 `vite-plugin-pwa` 当前要求保持一致

## 兼容性与风险

- 普通 Safari 标签页仍会显示浏览器工具栏，这是平台机制。
- iOS 可能缓存已安装 Web App 的元数据，发布后可能需要删除旧图标并重新添加。
- 不修改 manifest 身份与 origin，避免影响现有 IndexedDB 数据归属。

## 验证方案

1. 运行现有自动化测试。
2. 执行生产构建。
3. 检查 `dist/index.html` 的 iOS meta。
4. 检查 `dist/manifest.webmanifest` 的 display、start_url 与 scope。
5. 自动化测试覆盖 status meta、viewport、manifest 与根节点基线。

## 实施结果

- 已将 `apple-mobile-web-app-status-bar-style` 从 `default` 改为 `black-translucent`。
- 已为 `html`、`body`、`#root` 补齐零边距、100% 宽度及 100% 最小高度基线。
- 根据 Tester 反馈，已显式声明 `workbox-window@^7.4.1` 并同步 npm、pnpm 锁文件，生产构建恢复通过。
- 已新增最小 PWA 全屏回归测试，覆盖 iOS status meta、viewport、manifest 和根节点尺寸基线。
- 实施未修改 manifest、路由、数据结构或业务逻辑；测试、类型检查和生产构建均通过。

## 方案确认

- 确认状态：已确认
- 确认记录：2026-09-15，用户明确要求“修复下这个问题”。
