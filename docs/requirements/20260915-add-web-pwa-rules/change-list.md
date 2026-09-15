# 改动点：新增 iPhone 静态 Web App / PWA 开发规范

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `rules/web-pwa/README.md` | 按用户提供的 28 节规范新增完整 iPhone 静态 Web App / PWA 开发规则 | 作为 Web / PWA 项目的平台规则入口和权威规范 |
| `docs/requirements/20260915-add-web-pwa-rules/requirement.md` | 将原通用 Web / PWA 需求调整为 iPhone 静态 Web App / PWA 定位 | 需求与用户最终口径一致 |
| `docs/requirements/20260915-add-web-pwa-rules/technical-design.md` | 将原六文件拆分方案调整为单 README 权威规则文件 | 避免 AI 漏加载部分规则 |
| `docs/requirements/README.md` | 将需求状态更新为 Implementing / Done | 需求追踪 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `rules/web-pwa/README.md` | 新增完整的 28 节 iPhone 静态 Web App / PWA 开发规范 | 原计划六文件拆分调整为单 README；该调整已在实施前由用户给出最终规则并确认 |
| `docs/requirements/20260915-add-web-pwa-rules/requirement.md` | 将需求定位、范围、业务规则和验收标准更新为 Static Web App + PWA + Local First | 无 |
| `docs/requirements/20260915-add-web-pwa-rules/technical-design.md` | 记录单文件规则方案、技术边界和验证方式 | 无 |
| `docs/requirements/20260915-add-web-pwa-rules/change-list.md` | 回填实际修改与验证结果 | 无 |
| `docs/requirements/README.md` | 需求名称调整为 iPhone 静态 Web App / PWA 开发规范，并维护实施状态 | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：无
- 文档：新增 `rules/web-pwa/README.md` 并同步本次需求记录

## 验证结果

- `rules/web-pwa/README.md` 已创建：通过。
- 已覆盖用户提供的 1～28 节主题：通过。
- 已明确 `Static Web App + PWA + Local First`：通过。
- 已明确 React + TypeScript + Vite + Tailwind CSS + PWA + localStorage / IndexedDB：通过。
- 已明确禁止默认增加 Node / Java 服务端、数据库服务器、SSR、Serverless API：通过。
- 已包含 Manifest、Apple Web App meta、Apple Touch Icon、standalone：通过。
- 已包含 `100dvh`、Safe Area、Dynamic Island、Home Indicator、Header、TabBar、滚动和 Touch 规则：通过。
- 已包含本地数据、离线、资源本地化、Hash Router、更新策略和静态部署要求：通过。
- 已包含 AI 开发约束、AI UI 原则、最终验收标准和技术架构：通过。
- 未修改任何具体 App：通过。

## 遗留事项

- 无。