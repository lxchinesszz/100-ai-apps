# 技术方案：按 App 归档需求

## 现状分析

当前 `AGENTS.md` 将所有需求统一定义在根级 `docs/requirements/`，总清单也只有根级 `docs/requirements/README.md`。该模型没有 App 归属维度，不适合包含 100 个独立 App 的仓库。

现有 `docs/requirements/_template/` 已作为公共模板目录，可以继续复用，不需要在每个 App 中复制模板。

## 方案设计

采用“App 级需求 + 仓库级需求 + 全局模板”三级职责：

```text
100-ai-apps/
├── docs/
│   └── requirements/
│       ├── README.md                 # 仓库级需求总清单
│       ├── _template/                # 全局需求模板
│       └── <repository-requirement>/ # 仓库级需求
└── apps/
    └── <app>/
        └── docs/
            └── requirements/
                ├── README.md         # 当前 App 需求总清单
                └── <requirement>/
                    ├── requirement.md
                    ├── technical-design.md
                    └── change-list.md
```

Agent 接到会修改仓库的任务后，先判断改动归属：

```text
识别改动
  ↓
是否属于某个具体 App？
  ├─ 是 → apps/<app>/docs/requirements/
  └─ 否 → 是否属于仓库公共能力？
           ├─ 是 → docs/requirements/
           └─ 无法判断 → 先分析/确认归属
```

所有新需求的三份文档仍从根级 `docs/requirements/_template/` 复制。

## 接口与数据影响

- API：无
- 数据库：无
- 配置：无
- 外部依赖：无

## 兼容性与风险

- 已存在的两个根级需求均属于需求机制本身的仓库级改动，无需迁移。
- 后续 App 目录尚未创建需求清单时，第一次 App 需求应同时创建该 App 的 `docs/requirements/README.md`。
- 不能把一次涉及多个独立 App 的改动塞进一个需求目录，应按 App 拆分。

## 验证方案

1. 检查 AGENTS.md 中不存在“所有需求统一存放在根级 docs/requirements/”的旧规则。
2. 检查 AGENTS.md 同时包含 App 级、仓库级、全局模板三类路径。
3. 检查根级需求 README 的说明改为仓库级需求总清单。
4. 检查本次需求仍保留在根级，因为它修改的是全仓库工作流。

## 方案确认

- 确认状态：已确认
- 确认记录：2026-09-15，用户明确回复“确认”。