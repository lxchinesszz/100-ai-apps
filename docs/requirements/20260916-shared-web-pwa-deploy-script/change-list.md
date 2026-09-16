# 改动点：Web/PWA 公共部署脚本

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `scripts/youpai-sync.mjs` | 新增仓库级公共又拍云直接上传脚本 | 所有 Web/PWA App 共用 |
| `rules/web-pwa/README.md` | 将复制式脚本规则改为公共脚本调用规则 | 统一后续 App 部署方式 |
| `docs/requirements/README.md` | 登记并维护仓库级需求状态 | 需求追踪 |
| 本需求三份文档 | 同步需求、方案、范围和验证 | 变更可追踪 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `scripts/youpai-sync.mjs` | 新增固定服务与域名、参数校验、递归收集、MIME 和直接 PUT 上传的公共脚本 | 无 |
| `rules/web-pwa/README.md` | 移除可复制的内嵌实现，改为公共脚本契约、安全边界及 App deploy 示例 | 无 |
| `docs/requirements/README.md` | 将仓库级需求状态更新为 `Implementing` | 无 |
| 本需求三份文档 | 同步实施状态、确认记录、实际改动与验证结果 | 无 |

## 配套变更

- 数据库：无
- API：公共脚本仅调用又拍云 PUT 上传接口；本次未执行真实请求
- 配置：仅运行时读取 `UPYUN_OPERATOR`、`UPYUN_PASSWORD`
- 文档：已更新 Web/PWA 平台规则

## 验证结果

- Node.js 语法检查：通过。
- 隔离本地验证：递归文件映射、参数、本地目录、远程路径和缺少凭证校验通过；验证过程未发送网络请求。
- 静态安全检查：脚本仅实现 PUT，不包含备份、GET 回读或 DELETE。
- 独立 Tester 验收：PASS。八项验收标准全部满足，两个 App 迁移均通过各自独立验收。
- 真实部署：未执行。

## 遗留事项

- 无。
