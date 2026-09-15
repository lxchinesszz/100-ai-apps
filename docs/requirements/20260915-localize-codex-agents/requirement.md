# 需求方案：Codex 子智能体描述中文化

## 基本信息

- 需求编号：无
- 提出日期：2026-09-15
- 当前状态：已确认
- 关联人员：用户、Codex Orchestrator

## 背景与问题

当前 `.codex/agents/*.toml` 中的 Agent 定义已经使用 Codex 支持的 TOML 字段，但 `description` 与 `developer_instructions` 主要采用英文，不符合当前仓库以中文为主的协作习惯。

## 需求目标

在不改变 Codex 官方字段、配置键和枚举值的前提下，将自定义 Agent 的职责描述、工作说明和交接要求统一改为中文，提升可读性和后续维护效率。

## 需求范围

### 范围内

- 中文化 `product.toml` 的描述与开发者指令。
- 中文化 `ui-designer.toml` 的描述与开发者指令。
- 中文化 `developer.toml` 的描述与开发者指令。
- 中文化 `tester.toml` 的描述与开发者指令。
- 保持 Codex 官方字段名、配置键和枚举值不变。

### 范围外

- 不修改 Agent 数量和角色职责边界。
- 不修改模型配置。
- 不修改 `.codex/config.toml`。
- 不调整现有 Orchestrator 流程。

## 业务规则

1. TOML 官方字段名必须保持原样，例如 `name`、`description`、`developer_instructions`、`sandbox_mode`。
2. Codex 官方配置值或枚举值保持原样，例如 `read-only`。
3. 除上述官方字段与配置值外，面向人的说明内容统一使用中文。
4. 不改变四个 Agent 现有职责和权限边界。

## 验收标准

1. 四个 Agent TOML 文件中的说明性文本均为中文。
2. TOML 字段名、Agent `name` 和 `sandbox_mode` 等官方配置保持合法且不变。
3. `tester` 继续保持只读测试职责。
4. 四个 Agent 的职责边界与原方案一致。

## 待确认事项

- 无
