# 技术方案：Codex 子智能体描述中文化

## 现状分析

当前 `.codex/agents/` 下存在 `product.toml`、`ui-designer.toml`、`developer.toml`、`tester.toml` 四个项目级 Codex 子智能体定义。文件结构和字段保持现状，仅说明性内容为英文。

## 方案设计

仅替换四个 TOML 文件中的 `description` 与 `developer_instructions` 文本内容为中文，不调整字段结构、不新增模型配置、不修改 Agent 名称、不修改权限配置。

`tester.toml` 的 `sandbox_mode = "read-only"` 保持不变，继续确保测试 Agent 不修改实现代码。

## 接口与数据影响

- API：无
- 数据库：无
- 配置：仅修改 Agent TOML 中面向人的说明文本；Codex 配置结构不变
- 外部依赖：无

## 兼容性与风险

- 中文文本写入 TOML 多行字符串，保持 UTF-8 编码。
- 不改变官方字段和枚举值，降低 Codex 解析兼容风险。
- 不改变职责边界，避免影响现有 Orchestrator 调度逻辑。

## 验证方案

1. 逐个读取四个 Agent TOML 文件，确认说明文本已中文化。
2. 确认 `name` 字段保持原值。
3. 确认 `tester.toml` 的 `sandbox_mode = "read-only"` 未变化。
4. 确认未修改 `.codex/config.toml`。

## 方案确认

- 确认状态：已确认
- 确认记录：2026-09-15，用户明确要求将官方字段之外的描述统一使用中文
