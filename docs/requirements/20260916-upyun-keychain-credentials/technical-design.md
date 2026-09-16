# 技术方案：又拍云凭证钥匙串兜底

## 现状分析

`scripts/youpai-sync.mjs` 在 `main` 内直接读取 `environment.UPYUN_OPERATOR` 和 `environment.UPYUN_PASSWORD`，缺失时统一报错。脚本没有凭证解析边界，也没有仓库级自动测试，因此无法在不访问真实钥匙串的情况下验证凭证来源优先级。

## 方案设计

1. 新增 `readKeychainCredential(serviceName, dependencies)`，仅在 macOS 使用 `execFileSync("security", args, options)` 查询通用密码。参数固定包含当前用户名、service 和 `-w`，不使用 shell。
2. 新增 `resolveCredentials(environment, dependencies)`，分别解析操作员和密码：先读取对应环境变量，只对缺失字段调用钥匙串读取函数。
3. 钥匙串读取函数把命令失败归一化为未找到，不透传可能包含环境细节的底层错误；凭证解析函数基于平台和缺失字段生成不含敏感值的错误。
4. `main` 调用凭证解析函数后继续复用既有上传流程。
5. 通过依赖注入平台、用户名和命令执行函数，使 Node.js 内置测试运行器可在任何平台验证行为，不接触真实钥匙串。
6. 更新 `rules/web-pwa/README.md` 的公共发布脚本契约，使平台规则与实现保持一致。

## 接口与数据影响

- API：又拍云上传 API 无变化
- 数据库：无
- 配置：保留 `UPYUN_OPERATOR`、`UPYUN_PASSWORD`；新增可选的 macOS Keychain service `100-ai-apps-upyun-operator`、`100-ai-apps-upyun-password`
- 外部依赖：macOS 内置 `security` 命令；无新增 npm 包

## 兼容性与风险

- 已使用环境变量的 CI、Linux 和其他平台行为保持兼容，不会访问钥匙串。
- 仅 macOS 可使用钥匙串兜底；其他平台缺少环境变量时明确提示设置环境变量。
- 首次读取钥匙串可能触发 macOS 授权提示，这是系统安全机制。
- 不记录命令输出或凭证值，避免日志泄密。

## 验证方案

1. 执行 Node.js 语法检查。
2. 使用 Node.js 内置测试运行器验证环境变量优先和逐字段兜底。
3. 验证 `security` 的调用参数、当前用户名 account 及无 shell 选项。
4. 验证非 macOS与钥匙串失败错误不含测试凭证。
5. 静态核对平台规则不存在“只能通过环境变量”的冲突表述，并包含固定 service、当前用户名 account 及安全边界。
6. 由独立 Tester 按验收标准复验。

## 方案确认

- 确认状态：已确认
- 确认记录：用户于 2026-09-16 明确表示“同意，直接改造吧”。

## 实施状态

- 当前状态：已完成；核心功能及收尾增量均已通过独立 Tester 验收。
