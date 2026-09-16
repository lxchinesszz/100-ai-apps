# 改动点：首页显示版本号

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `package.json`、npm/pnpm 锁文件 | 版本升至 `0.1.1` | 标识本次发布版本 |
| `vite.config.ts` | 注入版本号与构建时间标识 | 提供编译期固定值 |
| `src/features/trips/TripList.tsx` | 首页品牌旁展示版本信息 | 用户可直接核对部署版本 |
| `src/styles/app.css` | 增加版本标识样式 | 保持现有品牌视觉层级 |
| `tests/home-version.test.mjs` | 增加版本注入与展示回归测试 | 防止版本信息回退 |
| `docs/requirements/` | 记录需求、方案、范围与验证 | 保持改动可追踪 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `package.json` | 版本由 `0.1.0` 升至 `0.1.1` | 无 |
| `package-lock.json` | 同步根项目版本为 `0.1.1` | 无 |
| `pnpm-lock.yaml` | 核对依赖图与当前声明一致；该锁格式不记录根项目版本 | 无内容变化 |
| `vite.config.ts` | 从 package 读取版本，注入生产构建时间或开发 `DEV` 标识 | 无 |
| `src/features/trips/TripList.tsx` | 在“旅记”旁展示版本与构建标识 | 无 |
| `src/styles/app.css` | 增加低强调度版本标识样式 | 无 |
| `tests/home-version.test.mjs` | 新增 3 项版本来源、构建标识、首页展示回归测试 | 无 |
| `docs/requirements/20260915-home-version/` | 记录需求、技术方案、实际改动与验证结果 | 无 |
| `docs/requirements/README.md` | 登记本需求，独立验收后更新为 `Done` | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：Vite 编译期版本与构建标识
- 文档：新增本需求三份文档并登记 App 需求总清单

## 验证结果

- `npm test`：通过，2 个测试文件、7 项测试全部通过。
- `npm run typecheck`：通过。
- `npm run build`：通过，PWA service worker 正常生成并预缓存 35 个条目。
- 构建产物：确认包含版本 `0.1.1`、构建标识 `20260915-2215 CST` 与 `.app-version` 样式。
- 全屏回归：源文件与构建入口仍为 `black-translucent`，原有 4 项全屏测试通过。
- `git diff --check`：通过。

## 遗留事项

发布记录：2026-09-15 将现有构建上传至 ai-skills/trip/，28 个文件校验成功；发布清单 `.deploy/2026-09-15T14-17-48-262Z/release.json`。线上无参数入口引用 `index-zo0yXJyY.js`，其包含 `0.1.1` 和 `20260915-2215 CST`。独立 Tester 文档复核 PASS。

- 真实设备需在部署后确认版本标识可读；无其他已知限制。
