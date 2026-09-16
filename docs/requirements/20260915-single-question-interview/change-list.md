# 改动点：所有 Agent 单轮只询问一个问题

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `AGENTS.md` | 增加适用于主会话和所有子智能体的单轮单问规则 | 统一所有用户提问行为 |
| `docs/requirements/README.md` | 登记本次仓库级需求并维护状态 | 保持需求可追踪 |
| `docs/requirements/20260915-single-question-interview/` | 新增三份需求文档并同步实施结果 | 记录需求、方案、范围与验证 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `AGENTS.md` | 在 Codex 子智能体协作章节新增“所有 Agent 单轮单问”强制规则 | 无 |
| `docs/requirements/README.md` | 按流程将本需求状态从 `Proposed` 更新至 `Implementing`，独立验收通过后更新为 `Done` | 无 |
| `docs/requirements/20260915-single-question-interview/requirement.md` | 同步实施状态和用户确认记录 | 无 |
| `docs/requirements/20260915-single-question-interview/technical-design.md` | 同步方案确认状态和确认记录 | 无 |
| `docs/requirements/20260915-single-question-interview/change-list.md` | 记录实际改动、影响与开发验证结果 | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：无
- 文档：新增并维护本需求的三份文档

## 验证结果

- 开发侧静态检查：通过。新增条款逐项覆盖七条业务规则，并明确限制独立决策点而非仅限制问号数量。
- 改动范围检查：通过。除本需求允许的 `AGENTS.md`、仓库级需求总清单和三份需求文档外，未修改其他文件；工作区既有 `.idea/` 未跟踪内容不属于本需求且未触碰。
- 独立 Tester 验收：PASS。Tester 对照六项验收标准完成只读检查，未发现阻塞问题。
- 最终状态检查：通过。需求总清单、需求方案和技术方案均已同步为完成状态。

## 遗留事项

- 无。
