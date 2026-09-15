# 技术方案：新增 iPhone 静态 Web App / PWA 开发规范

## 现状分析

根级 `AGENTS.md` 已规定 Web / PWA 项目加载 `rules/web-pwa/`，但该目录尚未建立。原计划拆分 `architecture.md`、`ui.md`、`storage.md`、`pwa.md`、`deployment.md`，更偏通用 Web 工程规范。

用户已提供一份完整的 28 节《iPhone 静态 Web App / PWA 开发规范》，其定位和约束高度统一，核心不是“通用 Web 开发”，而是“通过 Safari 添加到 iPhone 主屏幕运行的纯静态 App”。

## 方案设计

第一版不再拆成六份规则文件，改为一个权威入口文件：

```text
rules/web-pwa/
└── README.md
```

原因：

- 用户提供的 28 节内容本身已经形成完整规范。
- 单文件可避免 AI 只加载部分文件而遗漏关键 iPhone / PWA 约束。
- 后续规则规模明显增长时，再按主题拆分；README 始终作为完整入口和加载入口。

`README.md` 按用户提供的 28 个主题组织，保留其核心技术口径、示例代码和最终架构：

```text
Static Web App
+
PWA
+
Local First
```

默认技术栈：

```text
React
TypeScript
Vite
Tailwind CSS
PWA
localStorage / IndexedDB
```

强制运行边界：

```text
纯静态
无 Node.js 服务端
无 Java 服务端
无数据库服务器
无 SSR
无 Serverless API 依赖
npm run build
→ dist/
→ HTTPS Static Hosting
→ Safari
→ 添加到主屏幕
→ Standalone Web App
```

规则同时覆盖：Manifest、Apple meta、Apple Touch Icon、100dvh、Safe Area、导航、滚动、Touch、输入缩放、本地数据、Service Worker、离线、资源本地化、字体、路由、更新、iPhone 尺寸、横屏、主题色、AI 开发约束、AI UI 设计原则、验收标准和最终架构。

## 接口与数据影响

- API：无
- 数据库：无
- 配置：无
- 外部依赖：无，本次仅新增规则文档

## 兼容性与风险

- 本规则是 `100-ai-apps` 中 iPhone 静态 Web App / PWA 的默认平台规范，不等同于所有类型 Web 产品的通用规范。
- 若未来某 App 明确需要账号、跨设备同步、多人协作或服务端能力，应通过该 App 的独立需求和技术方案明确偏离本默认规则，而不是由 AI 擅自升级架构。
- iOS / Safari 的具体 PWA 能力会随系统版本变化；本规范聚焦稳定的工程原则，不承诺原生 App 的全部系统能力。
- Service Worker 仅在需要离线体验时强制使用；使用时必须处理缓存版本与更新策略，避免旧资源长期滞留。

## 验证方案

1. 检查 `rules/web-pwa/README.md` 存在。
2. 检查 README 覆盖用户提供的 28 个主题。
3. 检查明确 `Static Web App + PWA + Local First`。
4. 检查明确禁止默认增加后端、Serverless 和云数据库。
5. 检查包含 iPhone Safe Area、100dvh、standalone、Apple meta 和主屏幕安装规则。
6. 检查包含 localStorage / IndexedDB、Hash Router、Service Worker、更新策略和静态部署规则。
7. 检查包含最终验收标准。
8. 检查没有修改具体 App。

## 方案确认

- 确认状态：已确认
- 确认记录：2026-09-15，用户明确提供规范并要求“规则按照这个重写”。