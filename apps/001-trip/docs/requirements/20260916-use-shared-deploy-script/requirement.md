# 需求方案：001-trip 使用公共部署脚本

## 基本信息

- 需求编号：无
- 提出日期：2026-09-16
- 当前状态：已完成
- 关联人员：用户、Codex Orchestrator、Developer、Tester

## 背景与问题

`001-trip` 当前在 App 内维护 `scripts/youpai-sync.js`，与仓库计划提供的 Web/PWA 公共部署脚本重复。

## 需求目标

让 `001-trip` 的 `deploy` 命令调用仓库公共脚本，并移除 App 内重复部署脚本。

## 需求范围

### 范围内

- 更新 `package.json` 的 `deploy` 命令。
- 删除 `scripts/youpai-sync.js`。
- 保持本地构建目录 `dist` 和远程目录 `/trip/` 不变。
- 同步受脚本命令影响的锁文件元数据（如有）。

### 范围外

- 不改变 App 功能、UI、PWA base 或业务数据。
- 不执行真实部署。

## 业务规则

1. `deploy` 必须先执行生产构建，再从 App 工作目录调用 `../../scripts/youpai-sync.mjs dist /trip/`。
2. App 内不再保留部署脚本副本。
3. 部署地址保持 `https://apps.springlearn.cn/trip/`。

## 验收标准

1. `package.json` 的 `deploy` 命令调用根目录公共脚本并传入 `dist`、`/trip/`。
2. `scripts/youpai-sync.js` 已删除。
3. 构建、类型检查和现有自动化测试通过。
4. 不执行真实上传。

## 待确认事项

- 无。用户已于 2026-09-16 随公共脚本方案一并确认。

## 验收结果

- 独立 Tester 验收：PASS；四项验收标准全部满足。
- 自动化测试：2 个测试文件、7 个测试全部通过。
- 验证期间未执行真实部署或上传。
- 完成日期：2026-09-16。
