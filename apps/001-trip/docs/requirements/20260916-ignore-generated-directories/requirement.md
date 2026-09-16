# 需求方案：忽略构建产物与依赖目录

## 基本信息

- 需求编号：无
- 提出日期：2026-09-16
- 当前状态：已完成
- 关联人员：用户、Codex

## 背景与问题

`apps/001-trip/dist/` 和 `apps/001-trip/node_modules/` 当前未被 Git 跟踪，但仓库没有 `.gitignore`，两个目录在 `git status` 中显示为待提交。

## 需求目标

防止仓库中任意层级、目录名为 `dist` 或 `node_modules` 的目录提交到 GitHub。

## 需求范围

### 范围内

- 在仓库根目录 `.gitignore` 添加 `dist/` 和 `node_modules/` 规则。
- 验证任意层级下的这两类目录不再出现在未跟踪文件列表中。

### 范围外

- 删除本地目录或更改构建、部署流程。
- 处理其他未跟踪文件。

## 业务规则

1. 根目录规则匹配任意层级下名为 `dist` 或 `node_modules` 的目录，保留本地构建和依赖安装所需目录。

## 验收标准

1. `git check-ignore -v apps/001-trip/dist apps/001-trip/node_modules` 显示两个目录由根目录 `.gitignore` 忽略。
2. `git status --short` 不再列出这两个目录。

## 待确认事项

- 无
