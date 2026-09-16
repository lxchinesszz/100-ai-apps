# 改动点：固定 App 外层并内部滚动

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `src/app/App.tsx` | 新增内部滚动容器并重置其路由滚动位置 | 页面滚动模型 |
| `src/styles/app.css` | 固定 viewport shell、内部滚动与 overscroll | 移动端滚动和回弹体验 |
| `package.json`、`package-lock.json` | 版本升至 `0.1.4` | 标识本次构建 |
| `tests/home-version.test.mjs` | 同步既有版本断言 | 保持版本回归有效 |
| `docs/requirements/` | 记录需求、方案、范围与验证 | 保持改动可追踪 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `src/app/App.tsx` | 新增 `.app-scroll` ref，路由变化重置内部 `scrollTop`，替代 `window.scrollTo` | 无 |
| `src/styles/app.css` | 固定根节点和 App Shell，新增内部滚动及 overscroll 控制，适配桌面断点 | 无 |
| `package.json`、`package-lock.json` | 根项目版本由 `0.1.3` 升至 `0.1.4` | 无 |
| `tests/home-version.test.mjs` | 将既有版本断言同步为 `0.1.4` | 无 |
| `tests/pwa-fullscreen.test.mjs` | 既有根节点基线断言兼容固定 `height: 100%` | 与新架构同步的必要调整 |
| `docs/requirements/20260915-fixed-app-scroll/` | 记录需求、方案、实际改动与验证结果 | 无 |
| `docs/requirements/README.md` | 登记本需求为 `Implementing` | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：应用版本升至 `0.1.4`
- 文档：新增本需求三份文档并登记 App 需求总清单

## 验证结果

- 独立 Tester PASS；需求与总清单更新 Done。已发布并校验28个文件，发布记录 `.deploy/2026-09-15T14-44-58-663Z/release.json`。线上无参数入口引用新资源 `index-CTksQuAf.js` 与 `index-CcAc8poI.css`；保留目标iPhone触摸体验未实机验证的限制。

- `npm test`：通过，2 个测试文件、7 项测试全部通过。
- `npm run typecheck`：通过。
- `npm run build`：通过，PWA service worker 正常生成并预缓存 35 个条目。
- 构建产物：确认包含 `0.1.4` 与 `20260915-2241 CST`。
- 浏览器根布局：body 与 document scroll height 均等于 viewport 720px，body overflow 为 hidden，App Shell 为 fixed。
- 浏览器长页：`.app-scroll` 为 `overflow-y: auto`、`overscroll-behavior-y: contain`，首页从 `scrollTop=0` 滚至内部最大值 138，文档高度不变。
- 浏览器短页：缺省页 `.app-scroll` 的 clientHeight 与 scrollHeight 均为 662px，`scrollTop=0`，无内部或文档额外滚动。
- 浏览器路由切换：首页滚至 138 后进入备份页，内部 `scrollTop` 重置为 0；备份页长内容仍可滚动。
- 浏览器弹层：创建旅行页日期选择器可打开并关闭，页面保持在内部滚动容器中。
- 代码检查：未出现 touchmove 监听或 `preventDefault` 滚动拦截；`git diff --check` 通过。

## 遗留事项

- 内置 Chromium 验证通过；不同 iOS/Safari 版本的系统级橡皮筋细节仍需在目标 iPhone 主屏幕模式独立验收。
