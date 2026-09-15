# AGENTS.md

## 1. Repository Purpose

本仓库用于持续完成 **100 个真实 App**，通过真实产品实践训练 AI 产品设计、AI Coding、Skill、Agent、Workflow、MCP、测试、部署与复盘能力。

Agent 的目标不是尽快修改代码，而是确保每一次代码或仓库文件改动都具有明确需求、方案、实施记录和可追踪结果。

---

## 2. Core Principles

1. 一个 App 优先解决一个明确问题。
2. MVP First，避免无必要的复杂设计。
3. 优先选择简单、低成本、可维护的技术方案。
4. 能静态实现时，不主动增加后端。
5. 能本地存储时，不主动增加服务器或数据库。
6. 所有实现必须具有明确的验收标准。
7. AI 在实施前必须先理解需求、现有代码和对应开发规则。
8. 不允许为了“快速完成”绕过需求记录、方案确认、测试或验收流程。

---

## 3. Mandatory Change Workflow

### 3.1 什么时候必须创建需求

只要 Agent 识别到任务将导致任何 **代码或仓库文件改动**，就必须进入需求流程。

包括但不限于：

- 新功能或功能调整
- Bug 修复
- UI / UX 调整
- 重构或性能优化
- 测试补充或修改
- 配置、构建脚本、CI / CD 修改
- 依赖升级
- 文档修改
- 目录结构调整
- 文件新增、修改或删除

不得以“改动很小”“只是修 Bug”“只改一行代码”“只补测试/配置/文档”或“不影响业务逻辑”为由跳过。

### 3.2 可以不创建需求的情况

以下工作在 **不修改任何仓库文件** 时，可以不创建需求目录：

- 纯只读查询
- 代码解释
- 方案讨论
- 代码审查
- 故障诊断

一旦上述任务后续转为实施修改，必须立即停止直接修改，先补齐需求目录、三份需求文档和需求总清单，再进入方案确认与实施流程。

### 3.3 标准流程

```text
识别仓库改动
  ↓
创建需求目录
  ↓
从模板创建三份需求文档
  ↓
登记 docs/requirements/README.md
  ↓
完成需求方案
  ↓
完成技术方案
  ↓
记录计划改动范围
  ↓
向用户说明方案并取得确认
  ↓
实施代码 / 仓库文件改动
  ↓
验证
  ↓
更新三份文档的实际结果
  ↓
更新需求总清单状态
```

在用户确认方案前，只允许分析问题、阅读代码、澄清需求和完善文档，不得修改业务代码。

---

## 4. Requirement Directory

所有需求统一存放在：

```text
docs/requirements/
```

每次需求都必须建立独立目录，不得把多个无关需求合并归档。

目录命名格式：

```text
docs/requirements/<YYYYMMDD>-<requirement-slug>/
```

例如：

```text
docs/requirements/
├── README.md
├── _template/
├── 20260915-add-checkin/
├── 20260915-fix-budget-calc/
└── 20260916-pwa-fullscreen/
```

其中：

- `YYYYMMDD`：需求创建日期。
- `requirement-slug`：简短英文 kebab-case 标识。
- 一个独立问题对应一个需求目录。
- 如果存在正式需求编号，应在该目录的需求文档和需求总清单中同时记录该编号。

新需求文档必须从：

```text
docs/requirements/_template/
```

复制后填写，不应每次自由创建不同格式。

---

## 5. Required Documents

每个需求目录必须包含：

```text
docs/requirements/<YYYYMMDD>-<requirement-slug>/
├── requirement.md
├── technical-design.md
└── change-list.md
```

三份文档缺一不可，并且必须随需求澄清、方案调整和实际实施结果持续同步更新。

### 5.1 requirement.md — 需求方案

用于定义“为什么做、做什么、做到什么程度”。

至少包含：

```markdown
# Requirement

## Requirement ID
无正式编号时写“无”。

## Background
为什么提出这个需求。

## Problem
当前存在什么问题。

## Goal
希望达到什么结果。

## User / Scenario
谁在什么场景下使用。

## Scope
本次包含哪些内容。

## Out of Scope
明确本次不处理什么。

## Acceptance Criteria
- [ ] 可观察、可验证的验收项
```

### 5.2 technical-design.md — 技术方案

用于定义“准备怎么实现”。

至少包含：

```markdown
# Technical Design

## Requirement ID
无正式编号时写“无”。

## Current State
现有实现、相关模块和代码情况。

## Proposed Solution
准备采用的实现方案。

## Architecture / Flow
涉及的架构、调用链或数据流。

## Data / API / Storage
数据库、接口、状态、缓存、本地存储等影响；无则写“无”。

## Compatibility
兼容性和已有功能影响；无则写“无”。

## Risks
可能产生的风险。

## Alternatives
其他合理方案以及未采用原因；无则写“无”。

## Implementation Steps
具体实施步骤。

## Verification Plan
计划如何验证实现结果。
```

### 5.3 change-list.md — 改动点

用于同时记录 **计划改动** 和 **实际改动**。

实施前必须填写计划范围，至少包含：

```markdown
# Change List

## Requirement ID
无正式编号时写“无”。

## Planned Changes

### Files
计划新增 / 修改 / 删除哪些文件。

### Database
数据库影响；无则写“无”。

### API
接口影响；无则写“无”。

### Configuration
配置影响；无则写“无”。

### Tests
计划新增或调整的测试；无则写“无”。

## Actual Changes
实施完成后填写实际修改文件和实际影响。

## Verification Result
记录执行的验证方式、结果及未解决问题。
```

任何无改动的类别都必须明确填写 **“无”**，不得省略，以便 Agent 和人工审查时区分“没有影响”和“忘记分析”。

---

## 6. Requirement Registry

需求总清单固定为：

```text
docs/requirements/README.md
```

这是仓库需求的唯一总索引。

每创建一个新需求目录，Agent 必须立即在总清单新增一条记录，并使用相对链接指向需求目录或 `requirement.md`。

不得只创建需求目录而遗漏总清单。

推荐格式：

```markdown
# Requirements

| Requirement ID | Requirement | Status | Created | Document |
|---|---|---|---|---|
| - | Add Check-in | Proposed | 2026-09-15 | [View](./20260915-add-checkin/requirement.md) |
```

如果存在正式需求编号，用真实编号替换 `-`。

状态统一使用：

```text
Proposed
Approved
Implementing
Done
Rejected
Archived
```

标准流转：

```text
Proposed
   ↓
Approved
   ↓
Implementing
   ↓
Done
```

需求澄清和方案设计阶段保持 `Proposed`。

---

## 7. Template Rules

需求模板固定存放在：

```text
docs/requirements/_template/
├── requirement.md
├── technical-design.md
└── change-list.md
```

新需求必须以模板为基础复制创建。

模板发生升级时：

- 新需求使用最新模板。
- 已存在需求不要求机械迁移。
- 如果旧需求重新进入大规模实施，可根据实际情况补齐最新字段。

---

## 8. Plan Confirmation Gate

开始业务代码修改前，必须先完成：

1. `requirement.md` 需求方案。
2. `technical-design.md` 技术方案。
3. `change-list.md` 计划改动范围。
4. `docs/requirements/README.md` 总清单登记。
5. 用户方案确认。

Agent 向用户确认方案时，应至少说明：

- 对需求和问题的理解。
- 推荐解决方案。
- 核心技术实现。
- 预计修改范围。
- 数据库 / API / 配置影响。
- 风险和兼容性影响。
- 验证方式。

**用户未确认时，只允许分析和完善方案，不实施业务代码。**

用户明确表达“可以”“同意”“开始”“执行”“按这个方案做”等含义时，可以视为确认。

如果用户明确要求“不要确认，直接实施”，仍然必须先建立需求目录、三份文档并登记总清单；完成这些记录后可以直接进入实施。

---

## 9. Implementation Rules

方案确认后：

1. 将总清单状态更新为 `Approved` / `Implementing`。
2. 按 `technical-design.md` 实施。
3. 不顺手修改与当前需求无关的问题。
4. 不进行未经记录的大范围重构。
5. 实际修改范围与计划不一致时，必须同步更新 `change-list.md`。
6. 技术方案发生变化时，必须同步更新 `technical-design.md`。
7. 需求 Scope 或验收标准发生变化时，必须同步更新 `requirement.md`。
8. 如果变化会扩大 Scope、改变核心交互、架构、数据模型或外部接口，应重新取得用户确认后继续。

需求文档必须描述 **当前真实状态**，不能只保留最初方案。

---

## 10. Completion Rules

代码完成不代表需求完成。

实施完成后，Agent 必须：

1. 在 `change-list.md` 补充实际新增、修改、删除的文件。
2. 补充实际数据库影响；无则写“无”。
3. 补充实际 API 影响；无则写“无”。
4. 补充实际配置影响；无则写“无”。
5. 记录测试和验证结果。
6. 对照 `requirement.md` 的 Acceptance Criteria 验收。
7. 记录未解决问题和已知限制。
8. 验收通过后将 `docs/requirements/README.md` 状态更新为 `Done`。

如果验收失败，不得标记为 `Done`。

完成定义：

```text
Requirement Recorded
+ Technical Design Approved
+ Change Scope Recorded
+ Implementation Finished
+ Documents Synced
+ Verification Passed
+ Acceptance Passed
= Done
```

---

## 11. Rule Loading

开发任何 App 前，Agent 必须先读取通用规则，再根据应用类型读取对应平台规则。

规划目录：

```text
rules/
├── common/
├── web-pwa/
├── mini-program/
└── desktop/
```

加载规则：

```text
所有项目
→ rules/common/

Web / PWA
→ rules/common/
→ rules/web-pwa/

微信小程序
→ rules/common/
→ rules/mini-program/

桌面应用
→ rules/common/
→ rules/desktop/
```

不要加载与当前项目无关的平台规则，避免无效上下文和规则冲突。

如果对应规则目录尚不存在，则遵循本 `AGENTS.md`，并在方案中明确当前缺少的平台规则，不得自行虚构规则。

---

## 12. Priority

发生规则冲突时，在仓库规则范围内按以下优先级处理：

```text
用户当前明确指令
↓
当前需求 requirement.md / 已确认 technical-design.md
↓
具体平台规则 rules/<platform>/
↓
通用规则 rules/common/
↓
本 AGENTS.md
↓
项目既有实现习惯
```

高优先级规则覆盖低优先级规则。

但 **Mandatory Change Workflow 属于仓库强制流程，不得因为低层级项目习惯而跳过。**

---

## 13. Agent Working Principle

Agent 在本仓库中的工作方式：

> 先记录需求，再确认方案；先明确改动范围，再修改代码；文档跟随真实实施同步更新；所有变更可追踪，所有结果可验证。

不要把“快速生成代码”作为第一目标。

第一目标是：

**持续建立一套可复用、可审查、可追踪的 AI 产品开发工程体系。**