# 改动点：001-trip 使用公共部署脚本

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `apps/001-trip/package.json` | deploy 改为调用根目录公共脚本 | 部署入口统一 |
| `apps/001-trip/package-lock.json` | 必要时同步 scripts 元数据 | 保持锁文件一致 |
| `apps/001-trip/scripts/youpai-sync.js` | 删除重复脚本 | 消除分叉实现 |
| 本需求三份文档与 App 总清单 | 记录方案、状态和验证 | 需求追踪 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `apps/001-trip/package.json` | deploy 改为构建后调用 `../../scripts/youpai-sync.mjs dist /trip/` | 无 |
| `apps/001-trip/scripts/youpai-sync.js` | 删除 App 内重复部署脚本 | 无 |
| 本需求三份文档与 App 总清单 | 同步实施状态、确认记录、实际改动与验证 | 无 |

`package-lock.json` 不记录 `scripts` 字段，本次无需同步。

## 配套变更

- 数据库：无
- API：无运行时影响
- 配置：部署命令改用公共脚本
- 文档：新增本需求记录

## 验证结果

- deploy 命令静态核对：通过。
- 旧脚本删除检查：通过。
- 类型检查：通过。
- 自动化测试：通过，2 个测试文件、7 个测试全部通过。
- 生产构建：通过。
- 真实上传：未执行。
- 独立 Tester 验收：PASS。四项验收标准全部满足。

## 遗留事项

- 无。
