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

包括但不限于：新功能、功能调整、Bug 修复、UI / UX 调整、重构、性能优化、测试、配置、构建脚本、CI / CD、依赖、文档、目录结构和文件增删改。

不得以“改动很小”“只是修 Bug”“只改一行代码”“只补测试/配置/文档”或“不影响业务逻辑”为由跳过。

### 3.2 可以不创建需求的情况

纯只读查询、代码解释、方案讨论、代码审查和故障诊断，在 **不修改任何仓库文件** 时可以不创建需求目录。

一旦后续转为实施修改，必须立即补齐需求文档和对应需求总清单，再进入方案确认和实施流程。

### 3.3 先判断需求归属

创建需求前，Agent 必须先判断改动属于哪个范围：

```text
识别仓库改动
  ↓
是否属于某个具体 App？
  ├─ 是 → 使用该 App 的需求目录
  └─ 否 → 是否属于仓库公共能力？
           ├─ 是 → 使用仓库级需求目录
           └─ 无法判断 → 先分析或向用户确认归属
```

不得为了方便把具体 App 需求统一放入根级 `docs/requirements/`。

如果一次任务包含多个相互独立的 App 改动，应按 App 拆分需求，不得把多个无关 App 的需求合并到同一需求目录。

### 3.4 标准流程

```text
识别仓库改动
  ↓
判断 App 级 / 仓库级归属
  ↓
创建对应需求目录
  ↓
从全局模板创建三份需求文档
  ↓
登记对应需求总清单
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
更新对应需求总清单状态
```

在用户确认方案前，只允许分析问题、阅读代码、澄清需求和完善文档，不得修改业务代码。

---

## 4. Requirement Directory

### 4.1 App 级需求

属于某个具体 App 的需求必须放在对应 App 内：

```text
apps/<app>/docs/requirements/<YYYYMMDD>-<requirement-slug>/
```

例如：

```text
apps/001-speaking-training/
└── docs/
    └── requirements/
        ├── README.md
        ├── 20260915-add-checkin/
        │   ├── requirement.md
        │   ├── technical-design.md
        │   └── change-list.md
        └── 20260916-pwa-fullscreen/
            ├── requirement.md
            ├── technical-design.md
            └── change-list.md
```

每个 App 独立维护自己的需求历史，不与其他 App 混合归档。

### 4.2 仓库级需求

仅当需求修改的是仓库公共能力时，才使用根级：

```text
docs/requirements/<YYYYMMDD>-<requirement-slug>/
```

典型仓库级需求包括：

- `AGENTS.md`
- `rules/`
- 全局需求模板
- CI / CD
- 仓库级构建或管理脚本
- 跨 App 公共基础设施

### 4.3 目录命名

需求目录统一使用：

```text
<YYYYMMDD>-<requirement-slug>
```

- `YYYYMMDD`：需求创建日期。
- `requirement-slug`：简短英文 kebab-case 标识。
- 一个独立问题对应一个需求目录。
- 如果存在正式需求编号，应在需求文档和对应需求总清单中同时记录。

---

## 5. Required Documents

每个需求目录必须包含：

```text
requirement.md
technical-design.md
change-list.md
```

三份文档缺一不可，并且必须随需求澄清、方案调整和实际实施结果持续同步更新。

文件内容必须使用仓库全局模板，不得自行创建另一套结构。

---

## 6. Requirement Registry

需求总清单按归属分别维护。

### 6.1 App 级需求总清单

具体 App 使用：

```text
apps/<app>/docs/requirements/README.md
```

第一次为某个 App 创建需求时，如果该文件不存在，必须同步创建。

App 级需求只能登记在对应 App 的需求总清单中。

### 6.2 仓库级需求总清单

仓库公共需求使用：

```text
docs/requirements/README.md
```

该文件只登记仓库级公共需求，不登记具体 App 的业务需求。

### 6.3 登记要求

每创建一个需求目录，必须立即在对应总清单新增一条相对链接，不得只创建目录而遗漏清单。

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
Proposed → Approved → Implementing → Done
```

需求澄清和方案设计阶段保持 `Proposed`。

---

## 7. Template Rules

全仓库只维护一套公共需求模板：

```text
docs/requirements/_template/
├── requirement.md
├── technical-design.md
└── change-list.md
```

无论 App 级还是仓库级需求，都必须从这里复制三份模板。

不要在每个 App 下复制 `_template/`，避免模板分叉和长期不一致。

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
4. 对应 App 级或仓库级需求总清单登记。
5. 用户方案确认。

用户未确认时，只允许分析和完善方案，不实施业务代码。

用户明确表达“可以”“同意”“开始”“执行”“按这个方案做”等含义时，可以视为确认。

如果用户明确要求“不要确认，直接实施”，仍然必须先建立需求目录、三份文档并登记对应总清单；完成记录后可以直接进入实施。

---

## 9. Implementation Rules

方案确认后：

1. 将对应需求总清单状态更新为 `Approved` / `Implementing`。
2. 按 `technical-design.md` 实施。
3. 不顺手修改与当前需求无关的问题。
4. 不进行未经记录的大范围重构。
5. 实际修改范围与计划不一致时，同步更新 `change-list.md`。
6. 技术方案变化时，同步更新 `technical-design.md`。
7. 需求范围或验收标准变化时，同步更新 `requirement.md`。
8. 如果变化会扩大 Scope、改变核心交互、架构、数据模型或外部接口，应重新取得用户确认。

需求文档必须描述当前真实状态，不能只保留最初方案。

---

## 10. Completion Rules

实施完成后必须：

1. 在 `change-list.md` 补充实际新增、修改、删除文件。
2. 补充实际数据库、API、配置和文档影响；无则明确写“无”。
3. 记录测试和验证结果。
4. 对照 `requirement.md` 的验收标准验收。
5. 记录未解决问题和已知限制。
6. 验收通过后，将对应 App 级或仓库级需求总清单状态更新为 `Done`。

如果验收失败，不得标记为 `Done`。

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

```text
rules/
├── common/
├── web-pwa/
├── mini-program/
└── desktop/
```

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

不要加载与当前项目无关的平台规则。

如果对应规则目录尚不存在，则遵循本 `AGENTS.md`，并在方案中明确缺少的平台规则，不得自行虚构规则。

---

## 12. Priority

发生规则冲突时：

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

但 Mandatory Change Workflow 属于仓库强制流程，不得因为低层级项目习惯而跳过。

---

## 13. Codex Subagent Orchestration

本仓库使用 Codex 主会话作为 **Orchestrator**。主会话负责理解用户目标、判断当前研发阶段、选择和委派子智能体、控制阶段交接、处理用户确认，并汇总最终结果。

项目级自定义子智能体定义在：

```text
.codex/agents/
├── product.toml
├── ui-designer.toml
├── developer.toml
└── tester.toml
```

### 13.1 Agent 职责

```text
product
→ 产品需求、范围、业务规则、验收标准

ui_designer
→ 页面结构、信息层级、交互、状态、视觉设计

developer
→ 技术方案、改动计划、代码实现、开发验证

tester
→ 独立测试、回归、验收、PASS / FAIL
```

主会话本身就是 Orchestrator，不再创建独立 `orchestrator` 子智能体。

### 13.2 推荐协作流程

新 App 或包含明显产品/UI/开发链路的需求，默认按以下阶段组织：

```text
用户目标
  ↓
Orchestrator
  ↓
product
  ↓
需求方案 / 验收标准
  ↓
ui_designer（存在 UI / UX 工作时）
  ↓
页面与交互方案
  ↓
developer
  ↓
技术方案 + 实施
  ↓
tester
  ↓
PASS ─────────→ Done
  │
 FAIL
  ↓
Orchestrator
  ↓
developer 修复
  ↓
tester 复验
```

不是每个任务都必须调用全部四个 Agent。Orchestrator 应根据任务性质选择最小必要角色，例如纯代码 Bug 可以直接进入 `developer → tester`，纯需求讨论可以只使用 `product`。

### 13.3 委派规则

1. 子智能体仍必须遵循本 `AGENTS.md`、`rules/common/`、对应平台规则和当前需求文档。
2. Orchestrator 在委派时必须给出明确任务边界、输入上下文和期望返回结果，不把模糊的整个项目直接丢给子智能体。
3. Product 不决定技术架构；UI Designer 不扩展产品 Scope；Developer 不重写已确认需求；Tester 不修改被测试代码。
4. `tester` 是独立只读角色。测试失败时，由 Orchestrator 把证据交回 `developer`，修复后重新测试。
5. 写操作优先按阶段串行执行。不要让多个可写子智能体无协调地同时修改同一文件或同一业务区域。
6. 只有互不依赖的探索、测试、日志分析、资料核验等读操作任务适合主动并行委派。
7. 子智能体返回主会话时应提供提炼后的结论、证据和交接信息，不把大量无关中间日志污染主会话。
8. 用户确认 Gate 仍由 Orchestrator 控制。子智能体不得自行把“分析完成”视为用户已经确认实施。

### 13.4 Agent 与仓库规则的关系

```text
AGENTS.md
→ 定义仓库流程与 Orchestrator

.codex/agents/
→ 定义谁负责执行

rules/
→ 定义执行时必须遵守的开发规范

requirements/
→ 定义当前这一次具体要完成什么
```

子智能体是执行机制，不替代需求文档、开发规则、测试和验收流程。

---

## 14. Agent Working Principle

> 先判断需求归属，再记录需求；先确认方案，再修改代码；文档跟随真实实施同步更新；所有变更可追踪，所有结果可验证。

不要把“快速生成代码”作为第一目标。

第一目标是：

**持续建立一套适用于 100 个 App、可复用、可审查、可追踪的 AI 产品开发工程体系。**