# 改动点：又拍云凭证钥匙串兜底

## 计划改动

| 模块/文件 | 改动内容 | 影响 |
| --- | --- | --- |
| `scripts/youpai-sync.mjs` | 增加环境变量优先、macOS 钥匙串兜底的凭证解析 | 公共 Web/PWA 部署凭证来源 |
| `scripts/youpai-sync.test.mjs` | 增加隔离凭证解析测试 | 不访问真实钥匙串或网络 |
| `rules/web-pwa/README.md` | 更新公共发布脚本的凭证来源与安全边界 | 平台规则与实现一致 |
| `docs/requirements/README.md` | 登记并维护需求状态 | 仓库级需求追踪 |
| 本需求三份文档 | 记录需求、方案、范围与验证 | 变更可追踪 |

## 实际改动

| 模块/文件 | 改动内容 | 与方案差异 |
| --- | --- | --- |
| `scripts/youpai-sync.mjs` | 导出钥匙串 service、钥匙串读取函数和凭证解析函数；`main` 改为使用环境变量优先、macOS 钥匙串兜底的凭证 | 无 |
| `scripts/youpai-sync.test.mjs` | 新增 8 项隔离测试，注入平台、用户名及命令执行函数，分别覆盖仅缺操作员和仅缺密码 | 无 |
| `rules/web-pwa/README.md` | 移除凭证只能由环境变量提供的旧约束，记录环境变量优先、固定钥匙串 service、当前用户 account、平台限制与保密要求 | 根据 Tester 收尾意见补充，未改变需求范围 |
| `docs/requirements/README.md` | 按流程登记需求并在验收通过后更新为 `Done` | 无 |
| 本需求三份文档 | 记录确认、方案、实际改动和开发验证 | 无 |

## 配套变更

- 数据库：无
- API：无
- 配置：保留两个环境变量，并支持 `100-ai-apps-upyun-operator`、`100-ai-apps-upyun-password` 两个固定 macOS Keychain service
- 文档：同步更新 Web/PWA 平台规则和本需求记录

## 验证结果

- `node --check scripts/youpai-sync.mjs`：通过。
- `node --check scripts/youpai-sync.test.mjs`：通过。
- `node --test scripts/youpai-sync.test.mjs`：8 项测试全部通过，0 失败；未访问真实钥匙串或网络。
- 环境变量优先、逐字段钥匙串兜底、完整兜底、当前用户名 account、参数数组调用、非 macOS 失败及钥匙串失败安全错误：均通过自动测试。
- 平台规则静态核对：凭证说明与脚本实现一致，不再包含“只能通过环境变量”的冲突表述。
- 独立 Tester 最终复验：通过；语法检查通过，自动测试 8/8，无规则冲突或阻塞问题。

## 遗留事项

- 无。
