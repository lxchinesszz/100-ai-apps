# 技术方案：新增 Web / PWA 开发规则

## 现状分析

根级 `AGENTS.md` 已规定 Web / PWA 项目应加载 `rules/common/` 和 `rules/web-pwa/`，但当前尚未建立 Web / PWA 平台规则文件。因此 Agent 只能依赖 AGENTS.md 的原则，缺少可直接执行的平台工程约束。

## 方案设计

建立模块化规则目录：

```text
rules/web-pwa/
├── README.md
├── architecture.md
├── ui.md
├── storage.md
├── pwa.md
└── deployment.md
```

职责：

- `README.md`：平台定位、默认技术栈、规则加载顺序、关键决策原则和其他规则文件索引。
- `architecture.md`：纯前端优先、项目结构、依赖边界、网络能力和后端引入条件。
- `ui.md`：Mobile First、响应式、触控、安全区域、视口、状态反馈和基础可访问性。
- `storage.md`：LocalStorage / IndexedDB / 云端存储的选择条件、版本和容错原则。
- `pwa.md`：manifest、Service Worker、standalone、离线、安装、更新和 iOS 主屏幕体验。
- `deployment.md`：静态构建、环境变量、资源路径、缓存策略、对象存储 / CDN 部署和发布验证。

规则采用“默认值 + 允许升级条件”的方式，避免把所有 Web App 做成复杂架构。

默认技术路线：

```text
React + TypeScript + Vite + Tailwind CSS
        ↓
纯前端静态应用
        ↓
LocalStorage / IndexedDB
        ↓ 真实跨设备/共享/服务端需求出现时
Serverless / 云服务
        ↓ 复杂服务端能力明确需要时
独立 Backend
```

## 接口与数据影响

- API：无
- 数据库：无
- 配置：无
- 外部依赖：无，本次仅新增规则文档

## 兼容性与风险

- 已存在项目不要求机械迁移技术栈。
- Tailwind CSS 作为默认选项，不应阻止已有项目继续使用自身稳定样式方案。
- PWA 在 iOS Safari 和 Chromium 上能力不同，规则中需要避免承诺浏览器不支持的能力。
- Service Worker 缓存策略若写得过度激进会导致版本更新问题，因此规则应要求应用壳与业务数据分离处理。

## 验证方案

1. 检查六份规则文件均存在。
2. 检查 README 能独立告诉 Agent 应加载哪些文件。
3. 检查规则覆盖架构、UI、存储、PWA、部署。
4. 检查规则不存在具体 App 业务逻辑。
5. 检查规则与 AGENTS.md 的“简单、低成本、静态优先、本地优先”原则一致。

## 方案确认

- 确认状态：待确认
- 确认记录：等待用户确认文件拆分和第一版规则范围。