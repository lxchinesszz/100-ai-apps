# 改动点：新增 Codex 子智能体研发团队

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `.codex/config.toml` | 新增项目级子智能体公共配置 | Codex 多智能体运行配置 |
| `.codex/agents/product.toml` | 新增产品需求子智能体 | 需求分析与需求文档 |
| `.codex/agents/ui-designer.toml` | 新增 UI 设计子智能体 | 页面、交互、状态设计 |
| `.codex/agents/developer.toml` | 新增开发子智能体 | 技术设计与代码实施 |
| `.codex/agents/tester.toml` | 新增只读测试子智能体 | 独立测试与验收 |
| `AGENTS.md` | 增加主会话 Orchestrator 和委派规则 | 全仓库 AI 协作流程 |
| `docs/requirements/README.md` | 登记并维护本次仓库级需求状态 | 需求追踪 |
| `docs/requirements/20260915-add-codex-subagents/*` | 记录需求、技术方案和实施结果 | 变更可追踪 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `.codex/config.toml` | 启用项目级 agents，并将每个主会话最大并发子智能体线程设为 4 | 无 |
| `.codex/agents/product.toml` | 定义 `product`，负责需求、范围、业务规则和验收标准 | 无 |
| `.codex/agents/ui-designer.toml` | 定义 `ui_designer`，负责页面、交互、状态和视觉设计交接 | 无 |
| `.codex/agents/developer.toml` | 定义 `developer`，负责技术设计、实施和开发验证 | 无 |
| `.codex/agents/tester.toml` | 定义 `tester`，设置 `sandbox_mode = "read-only"`，负责独立测试和 PASS/FAIL | 无 |
| `AGENTS.md` | 新增 Codex Subagent Orchestration，明确主会话 Orchestrator、四角色职责、委派流程和并行边界 | 无 |
| `docs/requirements/README.md` | 登记本需求并完成状态流转 | 无 |
| `docs/requirements/20260915-add-codex-subagents/*` | 建立并回填需求、技术方案和改动记录 | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：新增 `.codex/config.toml` 和四个 `.codex/agents/*.toml`
- 文档：更新 `AGENTS.md` 和仓库级需求记录

## 验证结果

- `.codex/config.toml`：已读取确认 `[agents]`、`enabled = true`、`max_concurrent_threads_per_session = 4`。
- 自定义 Agent 必需字段：四个 TOML 均按 Codex 自定义智能体结构定义 `name`、`description`、`developer_instructions`。
- Tester 权限：已读取确认 `sandbox_mode = "read-only"`。
- Orchestrator：`AGENTS.md` 已明确主会话负责委派和用户确认 Gate。
- 需求模型：仍保持 `requirement.md`、`technical-design.md`、`change-list.md` 三文档，不强制新增 UI/测试文档。
- 本地运行时：尚未在用户本地 Codex Desktop/CLI 实际 spawn 四个 Agent；需要拉取最新仓库后进行一次真实委派验证。

## 遗留事项

- 在本地 Codex Desktop/CLI 中执行一次真实子智能体委派，确认客户端成功识别 `product`、`ui_designer`、`developer`、`tester`。