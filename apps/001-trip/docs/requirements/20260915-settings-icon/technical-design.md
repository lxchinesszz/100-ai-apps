# 技术方案：首页使用设置齿轮图标

## 现状分析

首页设置入口位于 `src/features/trips/TripList.tsx`，使用 `MoreHorizontal`，外层按钮为 `.icon-button`，已有 `aria-label="设置与备份"` 和 `navigate("/backup")`。

## 方案设计

仅将 Lucide import 和渲染组件由 `MoreHorizontal` 改为 `Settings`，保留 `size={23}`、按钮属性及点击处理。版本升至 `0.1.6`，沿用现有构建标识机制。

## 接口与数据影响

- API：无
- 数据库：无
- 配置：应用版本升至 `0.1.6`
- 外部依赖：无，复用现有 `lucide-react`

## 兼容性与风险

- 仅图标视觉变化，不影响按钮语义和导航。
- 不修改共享样式，其他页面无影响。

## 验证方案

1. 执行现有测试和类型检查。
2. 执行生产构建并核对版本与构建标识。
3. 代码核对图标、尺寸、aria-label 和导航保持正确。

## 实施结果

- 首页设置入口已由 `MoreHorizontal` 替换为 Lucide `Settings`，继续使用 `size={23}`。
- `.icon-button`、`aria-label="设置与备份"` 和 `navigate("/backup")` 均未修改。
- 版本已升至 `0.1.6`；生产产物固定构建标识为 `20260915-2310 CST`。
- 测试、类型检查、生产构建与差异格式检查均通过。

## 方案确认

- 确认状态：已确认
- 确认记录：2026-09-15，用户明确要求替换为设置齿轮。
