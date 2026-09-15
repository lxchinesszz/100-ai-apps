# Requirement

## Requirement ID

无

## Background

仓库已经在 `AGENTS.md` 中规定：所有导致代码或仓库文件改动的需求，都必须在 `docs/requirements/` 下建立独立目录，并维护三份标准文档与需求总清单。

当前这些规则只有文字约束，尚缺少可直接复制使用的 `_template` 模板文件和正式需求基础设施。

## Problem

如果没有统一模板，后续 Agent 可能自行生成不同结构的需求文档，导致字段不一致、信息遗漏、审查成本上升。

## Goal

建立统一、可复制、可持续维护的需求模板基础设施，使后续所有需求都能按一致结构记录和执行。

## User / Scenario

当用户要求 Agent 修改任意代码、配置、测试、文档或其他仓库文件时，Agent 先从标准模板复制需求文档，再进入方案确认和实施流程。

## Scope

- 建立 `docs/requirements/README.md` 需求总清单。
- 建立 `docs/requirements/_template/`。
- 创建 `requirement.md`、`technical-design.md`、`change-list.md` 三份标准模板。
- 本需求自身按新规范建立独立需求目录并登记总清单。

## Out of Scope

- 不建立 Web / PWA、小程序、桌面端平台规则。
- 不修改现有 App 业务代码。
- 不新增自动化脚本。

## Acceptance Criteria

- [ ] `docs/requirements/README.md` 存在并包含本需求记录。
- [ ] `docs/requirements/_template/requirement.md` 存在。
- [ ] `docs/requirements/_template/technical-design.md` 存在。
- [ ] `docs/requirements/_template/change-list.md` 存在。
- [ ] 三份模板结构与 `AGENTS.md` 中的规则一致。
- [ ] 本需求实际改动和验证结果同步记录在 `change-list.md`。
