# 改动点：使用用户提供的三份需求模板

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `docs/requirements/_template/requirement.md` | 使用用户上传的需求方案模板覆盖现有内容 | 后续新需求的需求方案格式统一变更 |
| `docs/requirements/_template/technical-design.md` | 使用用户上传的技术方案模板覆盖现有内容 | 后续新需求的技术方案格式统一变更 |
| `docs/requirements/_template/change-list.md` | 使用用户上传的改动点模板覆盖现有内容 | 后续新需求的改动记录格式统一变更 |
| `docs/requirements/README.md` | 登记本次需求并维护状态 | 需求总清单新增一条记录 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `docs/requirements/_template/requirement.md` | 已替换为用户上传的中文需求方案模板 | 无 |
| `docs/requirements/_template/technical-design.md` | 已替换为用户上传的中文技术方案模板 | 无 |
| `docs/requirements/_template/change-list.md` | 已替换为用户上传的中文改动点模板 | 无 |
| `docs/requirements/README.md` | 已登记本需求并维护实施状态 | 无 |
| `docs/requirements/20260915-use-uploaded-requirement-templates/*` | 已创建本次需求的三份记录文档 | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：无
- 文档：替换三份正式模板，新增本次需求记录并更新需求总清单

## 验证结果

- `requirement.md`：已按用户上传内容替换，标题为“需求方案”，章节结构一致。
- `technical-design.md`：已按用户上传内容替换，标题为“技术方案”，章节结构一致。
- `change-list.md`：已按用户上传内容替换，标题为“改动点”，章节结构一致。
- 模板目录和文件名保持不变，`AGENTS.md` 现有路径规则仍然有效。

## 遗留事项

- 无