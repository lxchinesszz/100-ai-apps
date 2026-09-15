# 需求方案：新增 Web / PWA 开发规则

## 基本信息

- 需求编号：无
- 提出日期：2026-09-15
- 当前状态：方案整理中
- 关联人员：用户、Agent

## 背景与问题

`100-ai-apps` 将持续开发不同形态的应用。当前 `AGENTS.md` 已规划 `rules/web-pwa/`，但 Web / PWA 平台规则尚未真正建立。后续多个 Web App 如果没有统一约束，AI 容易在技术栈、存储、PWA、移动端适配、部署和工程结构上产生不一致。

## 需求目标

建立第一版 `rules/web-pwa/` 开发规则，作为所有 Web / PWA App 的平台级默认规范，使 Agent 能在开发前加载并遵循一致的技术和交付约束。

## 需求范围

### 范围内

- 新增 `rules/web-pwa/README.md` 作为规则入口。
- 新增 Web / PWA 架构规则。
- 新增 UI 与移动端适配规则。
- 新增本地存储规则。
- 新增 PWA 安装、离线、全屏与安全区规则。
- 新增静态构建与部署规则。
- 明确默认技术栈及“静态优先、本地优先、后端按需”的技术决策顺序。

### 范围外

- 本次不编写 `rules/common/`。
- 不编写微信小程序或桌面端规则。
- 不修改任何具体 App 代码。
- 不强制所有历史项目立即迁移。

## 业务规则

1. Web / PWA App 默认优先纯前端和静态部署。
2. 默认技术栈采用 React + TypeScript + Vite + Tailwind CSS；已有项目不因规则机械迁移。
3. 数据能力按 LocalStorage → IndexedDB → Serverless / 云端 → 独立后端逐级升级，必须由真实需求驱动。
4. 需要 App 化体验的 Web 项目必须考虑 manifest、Service Worker、standalone、safe-area、离线策略和主屏幕安装体验。
5. UI 必须同时考虑移动端触控、响应式布局和桌面浏览器基本可用性。
6. 默认产物应可构建为静态文件，便于部署到对象存储 / CDN。
7. 平台规则描述默认决策和约束，不绑定单个 App 的业务需求。

## 验收标准

1. 仓库存在 `rules/web-pwa/README.md`，能作为 Agent 的规则入口。
2. Web / PWA 规则至少覆盖架构、UI、存储、PWA、部署五个主题。
3. 规则明确默认技术栈和技术升级顺序。
4. 规则明确移动端主屏幕安装、standalone、安全区和离线要求。
5. 规则明确静态构建和 CDN / 对象存储部署原则。
6. 不包含具体 App 的业务逻辑。

## 待确认事项

- 是否采用本方案拆分为 `README.md`、`architecture.md`、`ui.md`、`storage.md`、`pwa.md`、`deployment.md` 六份规则文件。