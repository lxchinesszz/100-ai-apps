# 改动点：首页使用设置齿轮图标

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `src/features/trips/TripList.tsx` | 三点图标替换为设置齿轮 | 首页设置入口视觉 |
| `package.json`、`package-lock.json` | 版本升至 `0.1.6` | 标识本次构建 |
| `tests/home-version.test.mjs` | 同步既有版本断言 | 保持版本回归有效 |
| `docs/requirements/` | 记录需求、方案、范围与验证 | 保持改动可追踪 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `src/features/trips/TripList.tsx` | `MoreHorizontal` import 与渲染替换为 `Settings`，保留尺寸和按钮行为 | 无 |
| `package.json`、`package-lock.json` | 根项目版本由 `0.1.5` 升至 `0.1.6` | 无 |
| `tests/home-version.test.mjs` | 将既有版本断言同步为 `0.1.6` | 无 |
| `docs/requirements/20260915-settings-icon/` | 记录需求、方案、实际改动与验证结果 | 无 |
| `docs/requirements/README.md` | 登记本需求为 `Implementing` | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：应用版本升至 `0.1.6`
- 文档：新增本需求三份文档并登记 App 需求总清单

## 验证结果

- 独立 Tester PASS，需求状态更新 Done。已部署并校验28个文件，发布清单 `.deploy/2026-09-15T15-12-24-597Z/release.json`；线上入口已引用 `index-teLVQgy8.js`，版本为 `v0.1.6 · 20260915-2310 CST`。

- `npm test`：通过，2 个测试文件、7 项测试全部通过。
- `npm run typecheck`：通过。
- `npm run build`：通过，PWA service worker 正常生成并预缓存 35 个条目。
- 构建产物：确认包含 `0.1.6`、`20260915-2310 CST` 和“设置与备份”。
- 代码核对：`Settings size={23}` 位于原 `.icon-button` 内，`aria-label` 与 `/backup` 导航未变。
- `git diff --check`：通过。

## 遗留事项

- 待独立 Tester 核对首页齿轮图标显示和点击导航。
