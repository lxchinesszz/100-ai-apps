# 改动点：Codex 子智能体描述中文化

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `.codex/agents/product.toml` | 中文化说明文本 | 产品 Agent 可读性提升，职责不变 |
| `.codex/agents/ui-designer.toml` | 中文化说明文本 | UI Agent 可读性提升，职责不变 |
| `.codex/agents/developer.toml` | 中文化说明文本 | 开发 Agent 可读性提升，职责不变 |
| `.codex/agents/tester.toml` | 中文化说明文本 | 测试 Agent 可读性提升，只读权限不变 |
| `docs/requirements/README.md` | 登记并更新需求状态 | 仓库级需求可追踪 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `.codex/agents/product.toml` | 将 `description` 与 `developer_instructions` 改为中文 | 无 |
| `.codex/agents/ui-designer.toml` | 将 `description` 与 `developer_instructions` 改为中文 | 无 |
| `.codex/agents/developer.toml` | 将 `description` 与 `developer_instructions` 改为中文 | 无 |
| `.codex/agents/tester.toml` | 将 `description` 与 `developer_instructions` 改为中文，保留 `sandbox_mode = "read-only"` | 无 |
| `docs/requirements/README.md` | 登记需求并更新状态 | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：仅 Agent 说明文本；Codex 字段、Agent 名称与权限值未改变
- 文档：新增本需求三份文档并更新仓库级需求总清单

## 验证结果

- 四个 Agent 文件均已重新读取核验：通过
- `name` 字段保持 `product`、`ui_designer`、`developer`、`tester`：通过
- `tester.toml` 保持 `sandbox_mode = "read-only"`：通过
- `description` 与 `developer_instructions` 已统一为中文：通过
- `.codex/config.toml` 未修改：通过

## 遗留事项

- 无
