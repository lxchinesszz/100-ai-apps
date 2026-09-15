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

### 3.1 触发条件

只要 Agent 识别到任务将导致任何 **代码或仓库文件改动**，就必须进入本流程。

包括但不限于：

- 新功能
- 功能调整
- Bug 修复
- UI / UX 调整
- 重构
- 性能优化
- 测试补充或修改
- 配置修改
- 构建脚本修改
- CI / CD 修改
- 依赖升级
- 文档修改
- 目录结构调整
- 删除文件

不得以以下理由跳过：

- “改动很小”
- “只是修一个 Bug”
- “只是改一行代码”
- “只是补测试”
- “只是改配置”
- “只是改文档”
- “不影响业务逻辑”

**原则：只要产生仓库变更，就必须留下需求记录。**

### 3.2 实施前强制动作

Agent 在修改业务代码、配置、测试或其他目标文件之前，必须依次完成：

```text
识别改动
  ↓
创建需求目录
  ↓
创建三份需求文档
  ↓
登记需求总清单
  ↓
输出实施方案
  ↓
等待方案确认
  ↓
实施代码 / 文件改动
  ↓
测试与验收
  ↓
更新需求记录
```

在前三项记录动作完成之前，不得直接进入代码实施。

---

## 4. Requirement Directory

所有会导致仓库改动的任务，都必须创建独立需求目录。

统一存放：

```text
requirements/
```

目录命名格式：

```text
requirements/YYYYMMDD-NNN-short-name/
```

例如：

```text
requirements/
├── README.md
├── 20260915-001-add-checkin/
├── 20260915-002-fix-budget-calc/
└── 20260916-001-pwa-fullscreen/
```

规则：

- `YYYYMMDD`：需求创建日期。
- `NNN`：当天从 `001` 开始递增。
- `short-name`：使用简短、可读的英文 kebab-case。
- 一个独立问题对应一个需求目录。
- 不得把多个无关改动塞进同一个需求目录。

---

## 5. Three Required Documents

每个需求目录必须创建以下三份文档：

```text
requirements/YYYYMMDD-NNN-short-name/
├── requirement.md
├── solution.md
└── acceptance.md
```

三份文档缺一不可。

### 5.1 requirement.md

记录“为什么要改、要解决什么问题”。

至少包含：

```markdown
# Requirement

## Background
为什么提出这个需求。

## Problem
当前存在什么问题。

## Goal
本次修改希望达到什么结果。

## Scope
本次包含哪些内容。

## Out of Scope
明确本次不处理什么。

## User / Scenario
谁在什么场景下使用。
```

### 5.2 solution.md

记录“准备怎么改”。

至少包含：

```markdown
# Solution

## Current State
现有实现和相关代码情况。

## Proposed Solution
准备采用的方案。

## Files To Change
预计修改哪些文件。

## Data / State Changes
数据结构、状态、存储是否变化。

## Risks
可能产生的风险。

## Alternatives
如果存在其他合理方案，说明为什么不采用。

## Implementation Steps
具体实施步骤。
```

### 5.3 acceptance.md

记录“怎么证明已经完成”。

至少包含：

```markdown
# Acceptance

## Acceptance Criteria
- [ ] 验收项 1
- [ ] 验收项 2

## Test Plan
如何验证功能。

## Regression Check
需要回归哪些已有功能。

## Result
实施完成后填写实际结果。
```

验收标准必须尽可能具体、可观察、可验证，避免使用“正常”“没问题”“体验良好”等模糊描述。

---

## 6. Requirement Registry

必须维护需求总清单：

```text
requirements/README.md
```

每创建一个需求目录，Agent 必须同步登记。

推荐格式：

```markdown
# Requirements

| ID | Requirement | Type | Status | Created |
|---|---|---|---|---|
| 20260915-001 | Add Check-in | Feature | Proposed | 2026-09-15 |
```

状态统一使用：

```text
Proposed
Approved
Implementing
Done
Rejected
Archived
```

流程：

```text
Proposed
   ↓
Approved
   ↓
Implementing
   ↓
Done
```

在用户确认方案之前，状态保持 `Proposed`。

---

## 7. Plan Confirmation Gate

完成需求目录、三份文档和总清单登记之后，Agent 必须向用户说明：

1. 对问题的理解。
2. 准备采用的解决方案。
3. 预计修改的主要文件。
4. 可能影响的现有功能。
5. 验收方式。

然后等待用户确认。

**用户未确认方案前，不得实施目标代码改动。**

用户明确表达以下类似含义时，可以视为确认：

```text
可以
同意
开始
执行
按这个方案做
直接改
```

如果用户明确要求“不要确认，直接实施”，仍然必须创建需求目录、三份文档和登记总清单，只是可以在完成记录后直接进入实施，不再额外等待确认。

---

## 8. Implementation Rules

方案确认后：

1. 将需求状态更新为 `Approved` / `Implementing`。
2. 严格按照 `solution.md` 实施。
3. 如果实施过程中发现方案需要明显变化，先更新 `solution.md`。
4. 如果变化会扩大 Scope、改变核心交互、架构或数据模型，应重新请求用户确认。
5. 不顺手修改与当前需求无关的问题。
6. 不进行未经记录的大范围重构。

---

## 9. Completion Rules

代码完成不代表需求完成。

Agent 必须根据 `acceptance.md` 执行验证。

完成后：

1. 勾选已通过的 Acceptance Criteria。
2. 在 `Result` 中记录实际结果。
3. 记录未解决问题或已知限制。
4. 将 `requirements/README.md` 对应状态更新为 `Done`。
5. 如果验收失败，不得标记为 `Done`。

完成定义：

```text
Requirement Recorded
+ Solution Approved
+ Implementation Finished
+ Tests Passed
+ Acceptance Passed
= Done
```

---

## 10. Rule Loading

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

## 11. Priority

发生规则冲突时，在仓库规则范围内按以下优先级处理：

```text
用户当前明确指令
↓
当前需求 requirement.md / 已确认 solution.md
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

## 12. Agent Working Principle

Agent 在本仓库中的工作方式应当是：

> 先记录需求，再确认方案；先定义验收，再修改代码；所有变更可追踪，所有结果可验证。

不要把“快速生成代码”作为第一目标。

第一目标是：

**持续建立一套可复用、可审查、可追踪的 AI 产品开发工程体系。**