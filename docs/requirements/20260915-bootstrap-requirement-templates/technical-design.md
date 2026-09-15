# Technical Design

## Requirement ID

无

## Current State

仓库根目录已有 `AGENTS.md`，其中定义了 `docs/requirements/` 需求工作流、三份必需文档和 `_template/` 约定，但对应模板文件尚不存在。

## Proposed Solution

在 `docs/requirements/` 下建立统一模板目录 `_template/`，提供三份 Markdown 模板：

- `requirement.md`：记录需求背景、目标、范围和验收标准。
- `technical-design.md`：记录现状、实现方案、架构/数据/API/风险和验证计划。
- `change-list.md`：记录计划改动、实际改动以及数据库/API/配置/测试影响和验证结果。

同时建立并维护 `docs/requirements/README.md` 作为唯一需求总清单。

## Architecture / Flow

```text
用户提出修改
  ↓
识别仓库改动
  ↓
复制 docs/requirements/_template/
  ↓
创建 docs/requirements/<YYYYMMDD>-<slug>/
  ↓
填写三份文档
  ↓
登记 docs/requirements/README.md
  ↓
方案确认
  ↓
实施
  ↓
同步实际改动和验证结果
```

## Data / API / Storage

无。

## Compatibility

仅新增文档目录和 Markdown 文件，不影响现有 App、构建流程和运行时行为。

## Risks

- 模板字段过多可能增加小改动的文档成本。
- 模板与 `AGENTS.md` 若后续分别维护，可能出现规则漂移。

通过保持模板字段与 `AGENTS.md` 一致，并要求规则调整时同步更新模板来降低风险。

## Alternatives

1. 只保留 `AGENTS.md`，由 Agent 每次自由生成文档：容易产生结构漂移，不采用。
2. 合并成单个需求文档：不利于分别审查需求、技术方案和实际改动，不采用。

## Implementation Steps

1. 创建需求总清单。
2. 为本次基础设施建设创建独立需求目录和三份需求文档。
3. 创建 `_template/requirement.md`。
4. 创建 `_template/technical-design.md`。
5. 创建 `_template/change-list.md`。
6. 检查所有文件结构与 `AGENTS.md` 一致。
7. 更新本需求 `change-list.md` 和需求总清单状态。

## Verification Plan

- 检查 3 个模板文件均可从固定路径读取。
- 检查模板包含 `AGENTS.md` 要求的必需章节。
- 检查 `docs/requirements/README.md` 包含本需求的相对链接。
- 检查本需求目录包含三份标准文档。
