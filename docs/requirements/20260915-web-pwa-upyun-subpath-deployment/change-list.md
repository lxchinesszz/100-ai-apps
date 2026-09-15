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
| `rules/web-pwa/README.md` | 固定 `apps.springlearn.cn/<appSlug>/` 与又拍云 `/<appSlug>/`；增加 Vite base、Manifest start_url/scope、资源路径、SW scope、Hash Router 和上传目录规则 | 无 |
| `docs/requirements/20260915-web-pwa-upyun-subpath-deployment/requirement.md` | 记录统一域名和部署目录需求 | 无 |
| `docs/requirements/20260915-web-pwa-upyun-subpath-deployment/technical-design.md` | 记录子目录部署技术映射与风险 | 无 |
| `docs/requirements/20260915-web-pwa-upyun-subpath-deployment/change-list.md` | 回填实际改动与验证 | 无 |
| `docs/requirements/README.md` | 登记并维护本需求状态 | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：后续具体 Web / PWA App 必须配置 Vite base、Manifest start_url / scope 和 Service Worker scope
- 文档：已修改 Web / PWA 平台规则并新增需求记录

## 验证结果

- 已明确统一域名 `https://apps.springlearn.cn`：通过。
- 已明确应用 URL `https://apps.springlearn.cn/<appSlug>/`：通过。
- 已明确又拍云目录 `/<appSlug>/`：通过。
- 已明确 Vite `base` 为 `/<appSlug>/`：通过。
- 已明确 Manifest `start_url` / `scope` 为 `/<appSlug>/`：通过。
- 已明确静态资源不能错误指向域名根目录：通过。
- 已明确 Service Worker scope 限制在当前 App 子目录：通过。
- 已明确 `dist/` 内文件直接上传到 `/<appSlug>/`，不额外上传 `dist` 目录层级：通过。
- 已明确静态又拍云部署默认优先 Hash Router：通过。
- 已在最终验收中加入子目录访问、资源、PWA 和路由检查：通过。
- 未修改任何具体 App：通过。

## 遗留事项

- 无