# 改动点：新增 Web / PWA 又拍云发布脚本规范

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `rules/web-pwa/README.md` | 增加固定服务名、统一域名、动态 appSlug 的又拍云发布脚本及使用说明 | 所有后续 Web / PWA App 可复制使用统一发布流程 |
| `docs/requirements/README.md` | 登记并维护本次仓库级需求状态 | 需求追踪 |
| `docs/requirements/20260915-add-web-pwa-upyun-script/*` | 记录需求、技术方案、计划范围、实际结果与验证 | 变更可追踪 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `rules/web-pwa/README.md` | 新增完整可复制的 Node.js 又拍云发布脚本、凭证说明、dry-run 与正式发布示例；脚本固定服务和域名，通过 `appSlug` 生成远端目录，执行构建/PWA 校验、覆盖前备份、分阶段上传及 SHA-256 回读校验 | 无 |
| `docs/requirements/README.md` | 按流程将本需求状态从 `Proposed` 更新为 `Implementing`，验收通过后更新为 `Done` | 无 |
| `docs/requirements/20260915-add-web-pwa-upyun-script/requirement.md` | 记录用户确认并同步需求状态 | 无 |
| `docs/requirements/20260915-add-web-pwa-upyun-script/technical-design.md` | 记录方案确认状态和确认日期 | 无 |
| `docs/requirements/20260915-add-web-pwa-upyun-script/change-list.md` | 回填实际文件范围、影响和开发验证结果 | 无 |

## 配套变更

- 数据库：无
- API：文档脚本调用又拍云 REST API `v0.api.upyun.com`；未执行真实请求
- 配置：无
- 文档：已更新 Web / PWA 平台规则和本次仓库级需求记录

## 验证结果

- 从 README 提取 JavaScript 代码块并执行 `node --check`：通过。
- 使用临时完整构建执行 `--dry-run`：通过；输出固定服务 `100-ai-apps`、目录 `/speaking-training/`、URL `https://apps.springlearn.cn/speaking-training/`，上传顺序为普通资源、Manifest、HTML、Service Worker。
- 使用非法 slug `Bad_Slug` 执行 `--dry-run`：按预期拒绝。
- 使用 `scope` / `start_url` 不匹配的 Manifest 执行 `--dry-run`：按预期拒绝。
- Tester 独立验证缺少 `index.html`、`sw.js`、`manifest.webmanifest` 的场景：均在联网前按预期失败。
- Tester 独立验证无凭证正式模式：在发起任何请求前按预期失败，且日志未输出凭证。
- Tester 静态复核发布前完整备份、分阶段上传、PUT 后 GET 回读及 SHA-256 校验、不删除远端文件：通过。
- 执行 `git diff --check`：通过。
- 未执行真实又拍云上传，符合需求范围。

## 遗留事项

- 未使用真实又拍云凭证验证远端备份、上传与回读流程；该限制符合“不执行真实上传”的需求范围。
