# 改动点：Web / PWA 统一使用 Font Awesome 图标库

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `rules/web-pwa/README.md` | 新增 Font Awesome 图标规范 | 统一 Web / PWA 图标库与使用方式 |
| `docs/requirements/README.md` | 登记需求并维护状态 | 仓库级规则变更可追踪 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `rules/web-pwa/README.md` | 新增第 28 节图标规范，并将验收标准和最终原则顺延；明确 Font Awesome Free、React npm 包、按需导入、本地构建、禁止 CDN、语义一致性与自定义 SVG 兜底 | 无 |
| `docs/requirements/README.md` | 登记仓库级需求并完成状态流转 | 无 |
| `docs/requirements/20260915-font-awesome-web-pwa/*` | 新增需求、技术方案和改动记录 | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：无
- 文档：新增本需求三份文档并更新 Web / PWA 规则

## 验证结果

- Web / PWA 规则已包含 Font Awesome Free 默认图标库：通过
- React 官方包和按需导入规则：通过
- 禁止第三方 CDN、保证本地构建与 PWA 离线图标：通过
- 同一业务语义保持图标一致：通过
- 未修改任何具体 App 代码或依赖：通过

## 遗留事项

- 无
