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
| 待实施 | 待实施 | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：计划新增 Codex 项目级子智能体配置
- 文档：计划更新 `AGENTS.md` 与需求记录

## 验证结果

- 待实施后填写。

## 遗留事项

- 本地 Codex Desktop/CLI 的实际 spawn 运行验证需要用户在拉取最新仓库后执行。