# 技术方案：修复移动端底部色带

## 现状分析

移动端 `.app-shell` 当前同时设置 fixed `inset: 0` 与 `height: 100dvh`；根元素继承灰色背景，而 shell 为白色。在部分移动视口边界下，若两套高度约束或渲染边界不完全一致，可能暴露根灰底。`.page` 只有固定 32px 底部 padding，`.form-action` 单独承担 safe-area，规则不统一。

## 方案设计

移除移动端 `.app-shell` 的显式高度，使 fixed 元素由 `inset: 0` 唯一确定边界。为 `html/body/#root` 明确白色背景；在 600px 以上桌面断点恢复灰色画布。`.page` 使用 `max(32px, env(safe-area-inset-bottom))` 统一普通内容底部间距；`.form-action` 改为固定 10px，避免与页面 safe-area 重复。已有 `.bottom-action` 和 `.expense-sheet` 是 fixed/portal 层，继续保留自身 safe-area。

## 接口与数据影响

- API：无
- 数据库：无
- 配置：应用版本升至 `0.1.5`
- 外部依赖：无

## 兼容性与风险

- fixed + inset 是移动端边界的主要约束，不再与动态视口高度并存。
- 内部 `.app-scroll` 高度继续相对 shell 计算，滚动模型不变。
- 截图只能支持“高度/底色不一致”的疑似判断；最终 iOS 效果仍需目标真机验收。

## 验证方案

1. 执行现有测试、类型检查与生产构建。
2. 浏览器移动尺寸核对根元素、shell 与 viewport 底部边界及颜色。
3. 核对短页、长页内部滚动和页面底部 padding。
4. 浏览器桌面尺寸核对灰色外围画布和居中 App Shell。

## 实施结果

- 移动端 `.app-shell` 已移除显式 `height: 100dvh`，由 fixed `inset: 0` 唯一确定边界。
- 移动端 `html/body/#root` 已统一为白色；桌面断点恢复 `#f3f5f8` 灰色画布。
- `.page` 已统一使用 `max(32px, env(safe-area-inset-bottom))`，`.form-action` 改为 10px 普通间距，避免重复 safe-area。
- `.bottom-action` 与 `.expense-sheet` 继续保留自身 safe-area，内部滚动实现未修改。
- 版本已升至 `0.1.5`；生产产物固定构建标识为 `20260915-2303 CST`。
- 测试、类型检查、生产构建、差异检查及移动/桌面浏览器核对均通过。

## 方案确认

- 确认状态：已确认
- 确认记录：2026-09-15，用户明确确认底部色带修复方案。
