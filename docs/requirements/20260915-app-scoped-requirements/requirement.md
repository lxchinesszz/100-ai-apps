# 需求方案：按 App 归档需求

## 基本信息

- 需求编号：无
- 提出日期：2026-09-15
- 当前状态：已确认
- 关联人员：用户、Agent

## 背景与问题

本仓库计划持续维护 100 个独立 App。当前 AGENTS.md 规定所有需求统一放在根级 `docs/requirements/`，会导致不同 App 的需求混杂，随着 App 数量增长难以定位、维护和回溯。

## 需求目标

建立两级需求归档规则：具体 App 的需求必须归档到对应 App 目录；仓库级公共能力的需求继续保留在根级需求目录。

## 需求范围

### 范围内

- 明确具体 App 需求目录为 `apps/<app>/docs/requirements/<YYYYMMDD>-<requirement-slug>/`。
- 明确每个 App 使用自己的 `apps/<app>/docs/requirements/README.md` 作为需求总清单。
- 保留 `docs/requirements/_template/` 作为全仓库共享模板。
- 保留 `docs/requirements/` 用于 AGENTS.md、rules、模板、CI、仓库脚本等仓库级公共需求。
- 修改 AGENTS.md 中需求目录、总清单、模板和流程相关规则。
- 明确 Agent 在创建需求前必须先判断需求归属。

### 范围外

- 本次不创建 100 个 App 空目录。
- 不迁移现有两个仓库级需求，它们本身属于仓库基础设施需求。
- 不修改具体 App 业务代码。

## 业务规则

1. 属于单个 App 的需求，必须放入该 App 自己的 `docs/requirements/`。
2. 仓库级公共需求继续放入根级 `docs/requirements/`。
3. 全局模板只维护一份，固定为 `docs/requirements/_template/`。
4. App 需求必须登记到该 App 的 `docs/requirements/README.md`；仓库级需求登记到根级 `docs/requirements/README.md`。
5. 一个需求不得跨多个无关 App 混合归档；涉及多个 App 的独立改动应分别建立需求。
6. 无法判断归属时，先分析确认归属，不得默认全部放入根级需求目录。

## 验收标准

1. AGENTS.md 明确区分 App 级需求与仓库级需求。
2. AGENTS.md 明确 App 级需求目录和 App 级需求总清单路径。
3. AGENTS.md 保留全局模板目录 `docs/requirements/_template/`。
4. 根级 `docs/requirements/README.md` 将自身定位明确为“仓库级需求总清单”。
5. 本次需求文档记录实际改动和验证结果。

## 待确认事项

- 无，用户已于 2026-09-15 明确确认方案。