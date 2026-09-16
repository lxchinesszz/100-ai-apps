# 改动点：修复人数加减按钮形状

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `src/styles/app.css` | 修复人数 Stepper 按钮形状和交互状态 | 人数控件视觉与触摸体验 |
| `package.json`、`package-lock.json` | 版本升至 `0.1.3` | 标识本次构建 |
| `tests/home-version.test.mjs` | 同步既有版本断言 | 保持版本回归有效 |
| `docs/requirements/` | 记录需求、方案、范围与验证 | 保持改动可追踪 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `src/styles/app.css` | Stepper 外壳取消整体圆角裁切；按钮使用 44px 点击盒、36px 视觉圆、18px 图标及按压/禁用态 | 无 |
| `package.json`、`package-lock.json` | 根项目版本由 `0.1.2` 升至 `0.1.3` | 无 |
| `tests/home-version.test.mjs` | 将既有版本断言同步为 `0.1.3` | 无 |
| `docs/requirements/20260915-people-stepper/` | 记录需求、方案、实际改动与验证结果 | 无 |
| `docs/requirements/README.md` | 登记本需求为 `Implementing` | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：应用版本升至 `0.1.3`
- 文档：新增本需求三份文档并登记 App 需求总清单

## 验证结果

- 独立 Tester 最终复验 PASS，需求状态与清单更新为 Done。已部署 28 个文件并校验成功，发布清单 `.deploy/2026-09-15T14-35-01-393Z/release.json`；线上入口确认引用 `index-Bx27V05n.js` 和 `index-DHoLszsu.css`。

- `npm test`：通过，2 个测试文件、7 项测试全部通过。
- `npm run typecheck`：通过。
- `npm run build`：通过，PWA service worker 正常生成并预缓存 35 个条目。
- 构建产物：确认包含 `0.1.3` 与 `20260915-2233 CST`。
- 浏览器截图核对：创建旅行页加减按钮轮廓规则、图标居中，与页面现有蓝灰风格一致。
- 浏览器计算样式：两按钮均为 44 × 44px、`border-radius: 50%`；36px 径向视觉圆生效；初始减号禁用透明度 `0.42`，加号为 `1`。
- `git diff --check`：通过。

## 遗留事项

- 待独立 Tester 在目标手机尺寸复核按压反馈及 1/99 边界禁用状态。
