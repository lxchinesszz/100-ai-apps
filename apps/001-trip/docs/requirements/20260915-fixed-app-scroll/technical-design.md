# 技术方案：固定 App 外层并内部滚动

## 现状分析

`Layout` 当前在 pathname 变化时调用 `window.scrollTo(0, 0)`，说明滚动依赖浏览器文档。`.app-shell` 和 `.page` 使用 `min-height: 100dvh`，未固定 viewport，也没有统一内部滚动容器。底部操作、PWA 提示和 Ant Design Mobile 弹层采用 fixed/portal 定位，应保持现有层级和交互。

## 方案设计

在 `.app-shell` 内新增持久存在的 `.app-scroll` 容器包裹 `Suspense/Outlet`。`html/body/#root` 固定高度并隐藏文档溢出，`.app-shell` 使用 fixed + `100dvh`，`.app-scroll` 独立 `overflow-y: auto` 并设置 `overscroll-behavior-y: contain`。页面根节点改为至少填满内部容器。路由变化时通过 ref 将 `.app-scroll.scrollTop` 重置为 0，替代 `window.scrollTo`。

桌面断点继续保留居中、圆角与 28px 外边距，仅把高度从最小高度改为固定可用高度。方案不监听或拦截 touchmove，避免破坏表单、弹层与原生滚动。

## 接口与数据影响

- API：无
- 数据库：无
- 配置：应用版本升至 `0.1.4`
- 外部依赖：无

## 兼容性与风险

- `overscroll-behavior` 可阻止滚动链传递；不同 iOS 版本对系统级橡皮筋的实现存在差异，最终能力以实际目标设备验收为准。
- Ant Design Mobile portal 挂载在 body，body 固定不改变其 fixed 定位基准。
- 页面统一使用一个滚动容器，避免嵌套页面滚动；路由切换重置逻辑直接引用该容器。

## 验证方案

1. 执行现有测试、类型检查和生产构建，不新增镜像实现测试。
2. 内置浏览器检查文档不滚动、短页固定、长页内部滚动和路由重置。
3. 打开至少一种现有弹层并检查关闭行为。
4. 核对产物版本和固定构建时间。

## 实施结果

- `Layout` 已新增持久 `.app-scroll` 并用 ref 在 pathname 变化时设置 `scrollTop = 0`，替代 `window.scrollTo`。
- `html/body/#root` 已固定为 100% 高度并隐藏文档溢出；`.app-shell` 固定在 viewport；`.app-scroll` 独立纵向滚动并控制 overscroll 链。
- 页面根节点至少填满内部滚动容器；桌面断点继续保留 28px 间距、圆角和居中宽度。
- 既有全屏回归断言已从仅接受 `min-height` 更新为同时接受固定 `height`，匹配新滚动架构。
- 未新增 touchmove 监听，未修改弹层、键盘、页面业务或路由定义。
- 版本已升至 `0.1.4`；生产产物固定构建标识为 `20260915-2241 CST`。
- 内置浏览器已验证文档固定、短页、长页内部滚动、路由滚动重置和日期选择器开关。

## 方案确认

- 确认状态：已确认
- 确认记录：2026-09-15，用户确认外层固定、内部滚动方案。
