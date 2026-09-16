# 改动点：创建旅行页使用返回箭头

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `src/features/trips/TripForm.tsx` | 新建状态使用返回箭头按钮 | 创建旅行页导航外观与可访问名称 |
| `package.json`、`package-lock.json` | 版本升至 `0.1.2` | 标识本次构建 |
| `docs/requirements/` | 记录需求、方案、范围与验证 | 保持改动可追踪 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `src/features/trips/TripForm.tsx` | 新建状态使用 `ArrowLeft`、`.icon-button` 和“返回旅行列表”无障碍名称 | 无 |
| `package.json`、`package-lock.json` | 根项目版本由 `0.1.1` 升至 `0.1.2` | 无 |
| `tests/home-version.test.mjs` | 将既有版本断言同步为 `0.1.2` | 无 |
| `docs/requirements/20260915-trip-back-icon/` | 记录需求、方案、实际改动与验证结果 | 无 |
| `docs/requirements/README.md` | 登记本需求为 `Implementing` | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：应用版本升至 `0.1.2`
- 文档：新增本需求三份文档并登记 App 需求总清单

## 验证结果

- 独立 Tester：PASS。2026-09-15 已发布并校验 28 个文件；发布记录 `.deploy/2026-09-15T14-21-51-931Z/release.json`。线上入口已引用 `index-C8HjjRa4.js`，线上表单资源包含“返回旅行列表”。需求清单与状态已更新为 Done。

- `npm test`：通过，2 个测试文件、7 项测试全部通过。
- `npm run typecheck`：通过。
- `npm run build`：通过，PWA service worker 正常生成并预缓存 35 个条目。
- 构建产物：确认包含 `0.1.2`、`20260915-2220 CST` 和“返回旅行列表”。
- 人工代码核对：新建按钮保持 `onClick={cancel}`、`disabled={busy}`，触摸区域复用 `.icon-button` 的 `40 × 44px`。
- `git diff --check`：通过。

## 遗留事项

- 待独立 Tester 验收创建旅行页的图标显示、点击返回和未保存保护行为。
