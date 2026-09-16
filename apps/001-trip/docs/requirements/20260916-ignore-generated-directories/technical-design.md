# 技术方案：忽略构建产物与依赖目录

## 现状分析

Git 仓库根目录为 `100-ai-apps`。仓库此前没有 `.gitignore`；`apps/001-trip/dist/`、`apps/001-trip/node_modules/` 均未被跟踪，当前显示为未跟踪目录。

## 方案设计

在仓库根目录 `.gitignore` 中添加 `dist/` 和 `node_modules/`。不含路径分隔符的目录模式会匹配任意层级下同名目录。无需执行 `git rm --cached`，因为目标目录尚未被跟踪。

## 接口与数据影响

- API：无
- 数据库：无
- 配置：新增仓库级 Git 忽略规则
- 外部依赖：无

## 兼容性与风险

- 忽略规则只影响 Git 文件发现，不影响本地构建和运行。

## 验证方案

1. 执行 `git check-ignore -v apps/001-trip/dist apps/001-trip/node_modules`。
2. 执行 `git status --short`，检查目录是否不再显示。

## 方案确认

- 确认状态：已确认
- 确认记录：2026-09-16，用户明确要求使用仓库根目录 `.gitignore`，并排除所有层级下命名为 `dist` 和 `node_modules` 的目录。
