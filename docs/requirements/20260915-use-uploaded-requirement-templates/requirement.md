# 需求方案：使用用户提供的三份需求模板

## 基本信息

- 需求编号：无
- 提出日期：2026-09-15
- 当前状态：已确认
- 关联人员：用户、Agent

## 背景与问题

当前 `docs/requirements/_template/` 中的三份模板由 Agent 创建，虽然内容已中文化，但并非用户最终确认的模板版本。用户已明确上传并指定新的 `requirement.md`、`technical-design.md`、`change-list.md` 作为正式模板。

## 需求目标

将用户上传的三份 Markdown 文件原样作为后续需求流程的正式模板，替换仓库中现有的三份模板文件。

## 需求范围

### 范围内

- 替换 `docs/requirements/_template/requirement.md`
- 替换 `docs/requirements/_template/technical-design.md`
- 替换 `docs/requirements/_template/change-list.md`
- 在需求总清单登记本次变更
- 回填本需求实际改动和验证结果

### 范围外

- 不修改模板文件名
- 不修改 `AGENTS.md` 中的流程规则
- 不调整其他历史需求文档
- 不修改业务代码

## 业务规则

1. 三份正式模板以用户本次上传内容为唯一基准。
2. 模板文件名保持 `requirement.md`、`technical-design.md`、`change-list.md`。
3. 后续新需求继续从 `docs/requirements/_template/` 复制创建。

## 验收标准

1. `docs/requirements/_template/` 下三份模板内容与用户上传文件一致。
2. `docs/requirements/README.md` 中存在本需求记录。
3. 本需求 `change-list.md` 记录实际修改文件与验证结果。

## 待确认事项

- 无