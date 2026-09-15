# 需求方案：新增 Codex 子智能体研发团队

## 基本信息

- 需求编号：无
- 提出日期：2026-09-15
- 当前状态：已确认
- 关联人员：用户、Codex Orchestrator

## 背景与问题

仓库已经通过 `AGENTS.md`、`rules/common/` 和平台规则建立需求与开发规范，但实际执行仍主要依赖单一 Codex 主会话。随着 100 个 App 持续开发，需要利用 Codex 项目级自定义子智能体，把产品需求、UI 设计、开发和测试拆成职责清晰的执行角色，同时保持主会话作为 Orchestrator。

参考 Codex 子智能体配置规范，项目级自定义智能体放在 `.codex/agents/*.toml`，每个智能体通过 `name`、`description` 和 `developer_instructions` 定义职责，并可继承或覆盖父会话配置。

## 需求目标

建立第一版 Codex 多智能体研发团队：主会话作为 Orchestrator，按任务阶段委派 `product`、`ui_designer`、`developer`、`tester` 四个子智能体，形成需求 → UI → 开发 → 测试的完整产品研发链路。

## 需求范围

### 范围内

- 新增项目级 `.codex/config.toml`。
- 新增 `product`、`ui_designer`、`developer`、`tester` 四个自定义子智能体 TOML。
- 在 `AGENTS.md` 中补充 Orchestrator 与子智能体委派规则。
- 保持现有三文档需求模型不变。
- Tester 默认只读，负责独立验证，不直接修改业务代码。

### 范围外

- 不新增独立 Orchestrator 子智能体。
- 不增加架构师、前端、后端、运维等额外角色。
- 不升级为 `ui-design.md`、`test-report.md` 强制五文档模型。
- 不固定各子智能体模型，优先继承 Codex 父会话/全局默认模型配置。
- 不新增 MCP、Skill 或外部服务配置。

## 业务规则

1. Codex 主会话始终承担 Orchestrator 职责，负责识别阶段、选择子智能体、控制交接和向用户汇总。
2. `product` 负责需求澄清、范围、业务规则和验收标准，不决定具体技术实现。
3. `ui_designer` 负责页面结构、信息层级、交互、状态和视觉设计要求，不修改业务代码。
4. `developer` 负责技术方案、计划改动、代码实现和开发侧验证，不擅自改变已确认需求。
5. `tester` 负责独立验证需求、构建、核心流程、边界场景和平台规范；发现问题返回 Orchestrator，不直接修复。
6. 子智能体必须遵循根 `AGENTS.md`、`rules/common/`、适用的平台规则以及当前需求文档。
7. 多个会写文件的子智能体不得无协调地并行修改同一工作区；写操作由 Orchestrator 按阶段串行组织。

## 验收标准

1. `.codex/config.toml` 存在并启用/配置项目级子智能体并发上限。
2. `.codex/agents/` 下存在四个合法 TOML 文件，并包含必需的 `name`、`description`、`developer_instructions`。
3. 四个 Agent 职责边界与产品 → UI → 开发 → 测试流程一致。
4. `tester` 明确使用只读沙箱策略。
5. `AGENTS.md` 明确主会话是 Orchestrator，并说明何时委派各 Agent。
6. 不破坏现有需求工作流、规则优先级和三文档模型。

## 待确认事项

- 无