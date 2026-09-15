# 改动点：按 App 归档需求

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `AGENTS.md` | 将单一根级需求目录规则调整为 App 级 / 仓库级两级归档 | 后续 Agent 会按改动归属创建需求 |
| `docs/requirements/README.md` | 明确其仅作为仓库级需求总清单，并登记本需求 | 根级清单职责更清晰 |
| `docs/requirements/20260915-app-scoped-requirements/*` | 记录本次仓库级规则调整 | 提供完整追踪记录 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `AGENTS.md` | 增加需求归属判断；App 需求改为 `apps/<app>/docs/requirements/`；根级仅保留仓库公共需求；明确每个 App 独立需求总清单；保留全局模板 | 无 |
| `docs/requirements/README.md` | 改为“仓库级需求”清单，明确具体 App 需求不得登记于此，并登记本次需求 | 无 |
| `docs/requirements/20260915-app-scoped-requirements/requirement.md` | 记录需求目标、范围、业务规则和验收标准 | 无 |
| `docs/requirements/20260915-app-scoped-requirements/technical-design.md` | 记录两级需求归档设计及归属判断流程 | 无 |
| `docs/requirements/20260915-app-scoped-requirements/change-list.md` | 回填实际修改与验证结果 | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：无
- 文档：已修改 `AGENTS.md`、根级需求总清单及本需求三份记录

## 验证结果

- `AGENTS.md` 已明确 App 级需求路径：`apps/<app>/docs/requirements/<YYYYMMDD>-<requirement-slug>/`：通过。
- `AGENTS.md` 已明确 App 级总清单：`apps/<app>/docs/requirements/README.md`：通过。
- `AGENTS.md` 已明确仓库级需求继续使用 `docs/requirements/`：通过。
- `AGENTS.md` 已明确全局模板唯一位于 `docs/requirements/_template/`：通过。
- 根级 `docs/requirements/README.md` 已明确仅登记仓库级公共需求：通过。
- 现有两个历史需求属于仓库需求机制本身，无需迁移：通过。

## 遗留事项

- 无