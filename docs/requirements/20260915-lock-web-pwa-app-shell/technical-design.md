# 技术方案：锁定 Web / PWA App Shell 滚动

## 现状分析

`rules/web-pwa/README.md` 第 6、7、11 节分别描述全屏、动态视口和页面滚动，但当前 `min-height: 100dvh` 允许根容器随内容继续增长；页面滚动章节也未给出 `overflow`、Flex/Grid 收缩、滚动链和 iOS overscroll 的实现基线。因此现行规则表达了目标，却不能稳定约束实际实现。

## 方案设计

在 `rules/web-pwa/README.md` 中强化页面滚动规则，并同步修正相关全屏/视口示例：

1. 根节点使用固定动态视口高度和 `overflow: hidden`，禁止 document 级滚动。
2. App Shell 使用纵向 Flex 或 Grid 占满可用高度，主内容区配置 `min-height: 0` 与 `overflow-y: auto`。
3. 指定滚动区使用 `overscroll-behavior-y: contain`，避免滚动链传递；对 iOS 弹性滚动差异采用渐进增强，不承诺完全移除系统级手势。
4. 明确短内容、长内容、固定导航、Safe Area、动态视口、横竖屏和软键盘验收方式。
5. 为文章阅读等场景保留受控例外，要求在具体需求与技术方案中记录。

示例结构预计采用：

```css
html,
body,
#root {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
}

.app {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
}

.app-main {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior-y: contain;
}
```

最终文本会说明 Safari 降级和软键盘场景，避免把单段 CSS 当作所有页面的无条件答案。

## 接口与数据影响

- API：无
- 数据库：无
- 配置：无
- 外部依赖：无

## 兼容性与风险

- `100dvh` 随动态浏览器 UI 变化，需保留 Safe Area，并要求在 Safari 与主屏幕 standalone 两种模式验证。
- `overscroll-behavior` 只能控制网页滚动链，无法保证消除所有 iOS 系统级边缘手势；规则使用可验证的应用布局结果描述，不作超出 Web 平台能力的承诺。
- 软键盘可能改变视觉视口；表单页必须确保焦点元素和提交操作可达，不能单纯裁切内容。
- 已有整页滚动实现不会在本需求中自动修复；后续 App 改造应建立各自的 App 级需求。

## 验证方案

1. 检查规则文本是否明确根节点、App Shell、内部滚动区和例外边界。
2. 检查 CSS 示例是否包含固定动态视口、`overflow: hidden`、`min-height: 0` 和滚动边界控制。
3. 检查验收清单是否覆盖短内容、长内容、Safari、standalone、横竖屏和软键盘。
4. 执行 Markdown 结构、章节编号和 `git diff --check` 检查。

## 方案确认

- 确认状态：已确认
- 确认记录：2026-09-15，用户确认按“固定外壳、内容区内部滚动”的推荐边界实施。

## 实施记录

- 实际实现与已确认方案一致，无架构、接口、数据模型或需求范围变化。
- 根节点与 App Shell 基线使用固定高度和 `overflow: hidden`；App Shell 以 `100vh` 回退、`100dvh` 覆盖。
- 内部滚动区使用 `flex: 1`、`min-height: 0`、`overflow-y: auto`、`overscroll-behavior-y: contain`，并补充 Grid 的 `minmax(0, 1fr)` 等效要求。
- iOS 弹性滚动按渐进增强描述；规则只约束可由 Web 页面验证的 document 位移、露底和滚动链，不承诺移除系统级手势。
- 验收清单已加入 Safari 浏览器栏、standalone、横竖屏、Safe Area、软键盘、短内容和长内容检查项。
