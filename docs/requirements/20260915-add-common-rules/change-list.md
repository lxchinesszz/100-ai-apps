# 改动点：新增通用开发规则

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `rules/common/README.md` | 新增跨平台公共开发规则 | 所有 App 的公共开发基线 |
| `docs/requirements/README.md` | 登记并维护本次仓库级需求状态 | 需求追踪 |
| `docs/requirements/20260915-add-common-rules/*` | 记录需求、技术方案、实际改动与验证 | 变更可追踪 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `rules/common/README.md` | 新增通用开发规范，覆盖产品、技术、UI / UX、编码、数据、测试、交付、AI Coding 和完成检查清单 | 无 |
| `docs/requirements/20260915-add-common-rules/requirement.md` | 记录通用规则需求范围、业务规则和验收标准 | 无 |
| `docs/requirements/20260915-add-common-rules/technical-design.md` | 明确 common / platform / AGENTS 三层职责边界 | 无 |
| `docs/requirements/20260915-add-common-rules/change-list.md` | 回填实际改动与验证结果 | 无 |
| `docs/requirements/README.md` | 登记需求并维护状态 | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：无
- 文档：新增 `rules/common/README.md` 并同步需求记录

## 验证结果

- `rules/common/README.md` 已创建：通过。
- 已覆盖产品原则、技术原则、UI / UX、编码规范、数据与状态、测试与验证、交付规范、AI Coding：通过。
- 已增加通用完成检查清单：通过。
- 未重复 `AGENTS.md` 的需求目录、确认 Gate、状态流转等流程：通过。
- 未写入 Web / PWA、小程序、桌面端专属实现细节：通过。
- 可与现有 `rules/web-pwa/README.md` 按层级叠加使用：通过。
- 未修改任何具体 App：通过。

## 遗留事项

- 无