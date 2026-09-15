# 改动点：统一 Web / PWA 又拍云子目录部署规则

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `rules/web-pwa/README.md` | 增加统一域名、appSlug、又拍云目录、Vite base、Manifest scope/start_url、Service Worker scope 和部署流程 | 所有后续 Web / PWA App 按统一子目录部署 |
| `docs/requirements/README.md` | 登记并维护本次仓库级需求状态 | 需求追踪 |
| `docs/requirements/20260915-web-pwa-upyun-subpath-deployment/*` | 记录本次需求、技术方案、实际改动与验证 | 变更可追踪 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| 待实施 | 待实施 | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：规则要求具体 Web / PWA App 配置 Vite base、Manifest start_url / scope 和 Service Worker scope
- 文档：修改 Web / PWA 平台规则并新增需求记录

## 验证结果

- 待实施后填写。

## 遗留事项

- 无