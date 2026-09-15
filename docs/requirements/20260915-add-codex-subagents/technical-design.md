# 技术方案：新增 Codex 子智能体研发团队

## 现状分析

当前仓库根 `AGENTS.md` 已定义强制需求流程、规则加载和验收机制；`rules/common/` 与 `rules/web-pwa/` 已提供开发规则。仓库尚不存在 `.codex/` 项目级子智能体配置。

Codex 子智能体配置规范支持在项目 `.codex/agents/` 中放置独立 TOML 文件。自定义智能体至少需要 `name`、`description`、`developer_instructions`；项目公共子智能体设置位于 `.codex/config.toml` 的 `[agents]` 下。子智能体可覆盖 `sandbox_mode`，因此 Tester 可强制为只读。

## 方案设计

新增：

```text
.codex/
├── config.toml
└── agents/
    ├── product.toml
    ├── ui-designer.toml
    ├── developer.toml
    └── tester.toml
```

主会话不定义为额外 Agent，而是在 `AGENTS.md` 中明确承担 Orchestrator：

```text
User
  ↓
Codex Main Session / Orchestrator
  ↓
product → ui_designer → developer → tester
                              ↑          ↓
                              └── FAIL ──┘
```

`.codex/config.toml` 只设置子智能体公共能力与并发上限，不固定模型和推理强度，避免未来模型升级时维护多份版本配置。

Agent 设计：

- `product`：读取用户目标与仓库现状，负责需求方案；允许工作区写入，以便在 Orchestrator 授权时维护需求文档。
- `ui_designer`：负责 UI/UX、页面结构、交互和状态设计；第一版不要求额外强制 UI 文档。
- `developer`：负责技术方案、改动计划、实现和开发验证；遵循当前平台规则。
- `tester`：`sandbox_mode = "read-only"`，独立执行检查与测试并返回 PASS/FAIL，不修改代码。

Orchestrator 默认按阶段串行委派写操作，只有互不依赖的只读探索或测试任务才适合并行，以降低工作区冲突。

## 接口与数据影响

- API：无
- 数据库：无
- 配置：新增 `.codex/config.toml` 与 `.codex/agents/*.toml`
- 外部依赖：Codex 本地客户端的项目级自定义子智能体能力

## 兼容性与风险

- 子智能体配置依赖当前 Codex 对 `.codex/agents/*.toml` 的支持；配置字段保持最小集合，降低版本变化影响。
- 不固定 model，避免模型名称或可用性变化造成配置失效。
- Tester 强制只读，防止测试角色越权修复代码。
- Product、UI、Developer 可能拥有写能力，但由 Orchestrator 控制阶段，不允许无协调并行写同一工作区。
- 现有 `AGENTS.md` 的 Mandatory Change Workflow 继续有效，子智能体不得绕过。

## 验证方案

1. 读取 `.codex/config.toml`，确认 `[agents]` 配置语法与并发上限。
2. 读取四个 Agent TOML，确认必需字段存在、名称唯一、职责明确。
3. 检查 Tester 为 `read-only`。
4. 检查 `AGENTS.md` 的 Orchestrator 规则与现有 Mandatory Change Workflow、Priority 不冲突。
5. 后续在本地 Codex Desktop/CLI 中实际发起一次委派任务，作为运行时验证。

## 方案确认

- 确认状态：已确认
- 确认记录：2026-09-15，用户明确回复“开始试试吧”，同意按已讨论方案实施。