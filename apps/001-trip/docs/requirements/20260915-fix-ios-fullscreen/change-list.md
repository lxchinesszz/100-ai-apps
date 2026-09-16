# 改动点：修复 iPhone 主屏幕全屏显示

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `index.html` | 将 iOS 状态栏样式改为 `black-translucent` | 主屏幕独立运行时背景可延伸到顶部 |
| `src/styles/app.css` | 补齐根节点整屏尺寸基线 | 降低回弹露底和根容器高度不完整风险 |
| `package.json`、锁文件 | 显式声明 `workbox-window` 运行时依赖 | 恢复 PWA React 注册入口的生产构建 |
| `tests/pwa-fullscreen.test.mjs` | 覆盖 iOS meta、viewport、manifest 与根节点基线 | 防止关键配置回退 |
| `docs/requirements/` | 记录需求、方案、范围与验证结果 | 保持变更可追踪 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `index.html` | 将 iOS 状态栏样式由 `default` 改为 `black-translucent` | 无 |
| `src/styles/app.css` | 为 `html`、`body`、`#root` 补齐整屏尺寸基线 | 无 |
| `package.json`、`package-lock.json`、`pnpm-lock.yaml` | 显式声明并锁定 `workbox-window@^7.4.1` | Tester 反馈后补充的构建闭环 |
| `tests/pwa-fullscreen.test.mjs` | 新增 4 项 PWA 全屏配置回归测试 | Tester 反馈后补充的自动化覆盖 |
| `docs/requirements/20260915-fix-ios-fullscreen/technical-design.md` | 同步实际实施与验证结果 | 无 |
| `docs/requirements/20260915-fix-ios-fullscreen/change-list.md` | 同步实际文件改动、验证与遗留事项 | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：iOS Web App meta、全局 CSS 基线
- 依赖：新增 `workbox-window@^7.4.1`
- 文档：新增本需求三份文档及 App 需求总清单

## 验证结果

- `npm test`：通过，1 个测试文件、4 项测试全部通过。
- `npm run typecheck`：通过。
- `npm run build`：通过，PWA service worker 正常生成并预缓存 35 个条目。
- `dist/index.html`：确认包含 `viewport-fit=cover`、`apple-mobile-web-app-capable=yes` 和 `apple-mobile-web-app-status-bar-style=black-translucent`。
- `dist/manifest.webmanifest`：确认 `display=standalone`、`start_url=/trip/`、`scope=/trip/`。
- `git diff --check`：通过。
- 独立 Tester 复验：PASS，可部署并可标记 Done。
- `npm run deploy`：通过，28 个文件已发布并逐项校验至又拍云 `ai-skills/trip/`。
- 线上检查：带缓存穿透参数访问时已返回 `black-translucent`、新入口资源和正确的 standalone manifest。

## 遗留事项

- 需在真实 iPhone 上从主屏幕图标启动完成视觉冒烟；如仍使用旧安装元数据，应删除旧图标后重新添加。
