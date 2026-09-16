# 需求方案：Web/PWA 公共部署脚本

## 基本信息

- 需求编号：无
- 提出日期：2026-09-16
- 当前状态：已完成
- 关联人员：用户、Codex Orchestrator、Developer、Tester

## 背景与问题

当前 `rules/web-pwa/README.md` 内嵌了一份可复制的又拍云发布脚本，并允许每个 Web/PWA App 各自维护副本。现有 `001-trip` 与 `002-tripv2` 已出现重复脚本，后续修复与升级容易分叉。

所有 Web/PWA App 均部署到 `https://apps.springlearn.cn/<appSlug>/`，适合由仓库根目录维护唯一公共脚本。

## 需求目标

在仓库根目录提供一份所有 Web/PWA App 共用的又拍云部署脚本，并把平台规则从“复制脚本”改为“调用公共脚本”。各 App 的 `deploy` 命令负责先构建，再显式传入本地构建目录和远程目录。

## 需求范围

### 范围内

- 新增根目录公共脚本 `scripts/youpai-sync.mjs`。
- 更新 `rules/web-pwa/README.md` 的部署脚本规则和调用示例。
- 固定又拍云服务名 `100-ai-apps` 和域名 `https://apps.springlearn.cn`。
- 通过参数接收本地上传目录和远程目录。
- 使用 Node.js 内置模块递归直接上传文件，不新增 npm 依赖。
- 保留本地目录、远程目录、根目录保护和凭证四类最小校验。

### 范围外

- 不执行真实部署。
- 不做远端文件备份。
- 不做上传后回读或哈希校验。
- 不自动删除远程旧文件。
- 不修改 DNS、HTTPS 证书或又拍云控制台配置。
- `001-trip` 和 `002-tripv2` 的迁移分别记录在各自 App 级需求中。

## 业务规则

1. 所有 Web/PWA App 共用根目录 `scripts/youpai-sync.mjs`，不得复制脚本到各 App 内维护。
2. 调用格式统一为 `node <repo>/scripts/youpai-sync.mjs <localDir> <remoteDir>`。
3. `localDir` 是待上传目录；脚本递归上传其内部文件，不额外嵌套本地目录名。
4. `remoteDir` 必须是非根目录、单层 kebab-case 路径，格式为 `/<appSlug>/`。
5. 又拍云服务名固定为 `100-ai-apps`，对应访问域名固定为 `https://apps.springlearn.cn`。
6. 凭证只从 `UPYUN_OPERATOR` 和 `UPYUN_PASSWORD` 环境变量读取。
7. 上传前必须确认本地目录存在且为目录、远程目录合法且不为 `/`、凭证完整；任一失败时不得发送网络请求。
8. 发布采用直接覆盖上传，不备份、不回读校验、不删除远程旧文件。
9. 各 App 自己的 `deploy` 命令负责先完成生产构建，再调用公共脚本并传入本地目录与远程目录。
10. 默认 `appSlug` 由 App 目录去掉三位序号前缀后得到；具体 App 的部署命令仍显式传入远程目录，避免公共脚本推断目标。

## 验收标准

1. 根目录存在唯一公共部署脚本 `scripts/youpai-sync.mjs`。
2. 脚本固定服务名 `100-ai-apps`，访问 URL 使用 `https://apps.springlearn.cn/<appSlug>/`。
3. 脚本能递归收集并上传指定本地目录内部的文件。
4. 缺少本地目录、非法远程目录、根目录 `/` 或缺少凭证时，脚本在联网前失败。
5. 脚本不包含远端备份、上传后回读校验或远端删除逻辑。
6. `rules/web-pwa/README.md` 明确所有 App 必须调用公共脚本，不再复制内嵌实现。
7. 公共脚本通过语法检查和隔离的本地验证，不执行真实上传。
8. 两个现有 App 的迁移分别通过对应 App 级需求验收。

## 待确认事项

- 无。用户已于 2026-09-16 明确确认按本方案实施公共脚本及两个现有 App 的迁移。

## 验收结果

- 独立 Tester 验收：PASS；八项验收标准全部满足。
- 两个现有 App 的迁移均通过对应 App 级独立验收。
- 验证期间未执行真实部署或上传。
- 完成日期：2026-09-16。
