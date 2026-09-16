# 需求方案：新增 Web / PWA 又拍云发布脚本规范

## 基本信息

- 需求编号：无
- 提出日期：2026-09-15
- 当前状态：已完成
- 关联人员：用户、Agent

## 背景与问题

当前 `rules/web-pwa/README.md` 已明确 Web / PWA 应用统一部署到又拍云服务、使用 `https://apps.springlearn.cn/<appSlug>/` 访问，但尚未提供可直接复用的发布脚本。用户提供了现有 `youpai-sync.js` 作为参考，并要求将服务名调整为 `100-ai-apps`、域名调整为 `https://apps.springlearn.cn`。

## 需求目标

在 Web / PWA 平台规则中提供一份完整、可复制的 Node.js 又拍云发布脚本，使各 App 能将 `dist/` 内容安全发布到 `100-ai-apps` 服务的 `/<appSlug>/` 目录，并明确对应访问地址。

## 需求范围

### 范围内

- 在 `rules/web-pwa/README.md` 增加通用发布脚本及使用说明。
- 固定又拍云服务名为 `100-ai-apps`。
- 使用 `https://apps.springlearn.cn/<appSlug>/` 作为发布后的访问地址。
- 支持传入本地构建目录和 `appSlug`。
- 保留参考脚本的 dry-run、发布前备份、上传后哈希校验和不删除远程文件等安全能力。
- 校验 PWA Manifest 的 `scope`、`start_url` 与发布子目录一致。

### 范围外

- 不修改任何具体 App。
- 不创建各 App 的实际 `scripts/youpai-sync.js` 文件。
- 不执行真实上传。
- 不修改又拍云、DNS 或 HTTPS 配置。
- 不新增 npm 依赖或 CI / CD。

## 业务规则

1. 发布服务固定为 `100-ai-apps`，不允许环境变量静默改为其他服务。
2. 每次发布必须显式提供稳定的 kebab-case `appSlug`，远端目录固定为 `/<appSlug>/`。
3. 发布后的访问地址固定为 `https://apps.springlearn.cn/<appSlug>/`。
4. 脚本只能上传本次构建中的文件，不删除远端文件。
5. 正式上传前必须校验构建产物和 PWA 子目录配置；支持 `--dry-run` 预览发布内容。
6. 凭证仅从环境变量读取，不写入代码、构建产物或日志。

## 验收标准

1. `rules/web-pwa/README.md` 包含完整可复制的发布脚本与运行示例。
2. 脚本固定使用又拍云服务 `100-ai-apps`。
3. 脚本根据 `appSlug` 上传至 `/<appSlug>/`，并输出 `https://apps.springlearn.cn/<appSlug>/`。
4. 脚本包含 dry-run、Manifest 校验、发布前备份、上传后内容校验和错误退出。
5. 文档明确所需凭证环境变量，且示例不包含真实凭证。
6. 不修改或发布任何具体 App。

## 待确认事项

- 无；默认按“在 README 中提供可复制的通用脚本，不新增独立仓库脚本文件”理解。

## 确认记录

- 2026-09-15：用户明确回复“确认”，同意按已记录方案实施。
