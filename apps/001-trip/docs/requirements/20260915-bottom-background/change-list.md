# 改动点：修复移动端底部色带

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `src/styles/app.css` | 统一移动底色、shell 边界及页面底部 safe-area | 移动端底部显示和内容避让 |
| `package.json`、`package-lock.json` | 版本升至 `0.1.5` | 标识本次构建 |
| `tests/home-version.test.mjs` | 同步既有版本断言 | 保持版本回归有效 |
| `docs/requirements/` | 记录需求、方案、范围与验证 | 保持改动可追踪 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `src/styles/app.css` | 移除 shell 显式动态视口高度；统一移动白底、桌面灰底和页面底部 safe-area；去除表单重复 safe-area | 无 |
| `package.json`、`package-lock.json` | 根项目版本由 `0.1.4` 升至 `0.1.5` | 无 |
| `tests/home-version.test.mjs` | 将既有版本断言同步为 `0.1.5` | 无 |
| `docs/requirements/20260915-bottom-background/` | 记录需求、方案、实际改动与验证结果 | 无 |
| `docs/requirements/README.md` | 登记本需求为 `Implementing` | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：应用版本升至 `0.1.5`
- 文档：新增本需求三份文档并登记 App 需求总清单

## 验证结果

- 独立 Tester PASS，需求与清单更新 Done。28个文件已部署并校验，发布记录 `.deploy/2026-09-15T15-06-54-102Z/release.json`；线上无参数入口已引用 `index-BednYdRN.js` 和 `index-DJ-BD0GK.css`。目标iPhone主屏幕实际底部效果仍待设备确认。

- `npm test`：通过，2 个测试文件、7 项测试全部通过。
- `npm run typecheck`：通过。
- `npm run build`：通过，PWA service worker 正常生成并预缓存 35 个条目。
- 构建产物：确认包含 `0.1.5` 与 `20260915-2303 CST`。
- 移动视口 390 × 844：根、body、`#root` 均为白色；shell top 为 0、bottom 为 844、高度为 844，与 viewport 完全一致。
- 移动短页：内部容器 clientHeight 与 scrollHeight 均为 844，无额外底部滚动或异色背景。
- 移动长表单：内部容器 clientHeight 844、scrollHeight 891；页面底部 padding 为 32px，表单 action 仅 10px，无 safe-area 重复。
- 桌面视口 1280 × 720：根与 body 为 `#f3f5f8`，白色 shell 宽 460px、top 28、bottom 692，外围灰色画布正常。
- `git diff --check`：通过。

## 遗留事项

- Chromium 移动模拟与桌面验证通过；底部色带是否在目标 iPhone 主屏幕模式消失仍需真机验收。
