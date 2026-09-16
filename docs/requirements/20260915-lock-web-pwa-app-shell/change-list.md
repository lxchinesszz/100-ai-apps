# 改动点：锁定 Web / PWA App Shell 滚动

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `rules/web-pwa/README.md` | 强化视口、App Shell、内部滚动区、滚动边界、兼容与验收规则 | 后续所有 Web / PWA App 的布局和滚动实现 |
| `docs/requirements/README.md` | 登记本仓库级需求并维护状态 | 仓库需求追踪 |
| `docs/requirements/20260915-lock-web-pwa-app-shell/requirement.md` | 记录需求范围、规则边界与验收标准 | 需求追踪 |
| `docs/requirements/20260915-lock-web-pwa-app-shell/technical-design.md` | 记录规则修改方案、兼容性与验证方法 | 技术方案追踪 |
| `docs/requirements/20260915-lock-web-pwa-app-shell/change-list.md` | 记录计划与实际改动 | 实施追踪 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `rules/web-pwa/README.md` | 强化全屏与动态视口基线；新增固定 App Shell、内部滚动区、滚动链、iOS 边界、Safe Area、横竖屏、软键盘、受控例外和对应验收项 | 无 |
| `docs/requirements/README.md` | 登记本仓库级需求，并在独立验收通过后更新为 `Done` | 无 |
| `docs/requirements/20260915-lock-web-pwa-app-shell/requirement.md` | 更新实施状态与需求完成情况 | 无 |
| `docs/requirements/20260915-lock-web-pwa-app-shell/technical-design.md` | 补充实际实施记录与兼容边界 | 无 |
| `docs/requirements/20260915-lock-web-pwa-app-shell/change-list.md` | 记录实际文件改动、验证结果和遗留事项 | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：无
- 文档：需求文档与 Web / PWA 公共规则

## 验证结果

- 规则关键约束静态检查：通过。
- Markdown 标题结构与顶层章节编号检查：通过。
- `git diff --check`：通过。
- 独立 Tester 复验：PASS；7 条验收标准全部满足，无剩余缺陷。

## 遗留事项

- 本次只更新公共规则，不自动修复既有 App；现有 App 需要改造时应分别创建 App 级需求。
- iOS 系统级边缘手势无法由 Web CSS 完全关闭，规则只承诺阻断网页滚动链并避免 document 位移或露底。
- 无未解决缺陷。
