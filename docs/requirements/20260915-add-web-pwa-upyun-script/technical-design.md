# 技术方案：新增 Web / PWA 又拍云发布脚本规范

## 现状分析

现有 `rules/web-pwa/README.md` 已规定 `dist/` 内容发布到 `/<appSlug>/`，但仅描述人工流程。参考脚本通过 Node.js 原生 `https` 调用又拍云 REST API，具备递归收集文件、发布前下载备份、逐文件上传及哈希回读校验能力，且无需引入旧 SDK，适合整理为平台级模板。

## 方案设计

在 `rules/web-pwa/README.md` 的统一部署章节后增加“又拍云发布脚本”小节，包含：

1. 建议保存路径 `scripts/youpai-sync.js`。
2. 凭证变量 `UPYUN_OPERATOR`、`UPYUN_PASSWORD`。
3. 命令格式 `node scripts/youpai-sync.js <appSlug> [dist] [--dry-run]`。
4. 固定常量 `service = "100-ai-apps"` 与 `origin = "https://apps.springlearn.cn"`。
5. 由经过 kebab-case 校验的 `appSlug` 生成唯一远端目录 `/<appSlug>/`，避免调用方传入任意远端路径。
6. 校验 `index.html`、`sw.js`、`manifest.webmanifest` 存在，并校验 Manifest `scope` 与 `start_url`。
7. dry-run 只输出计划；正式发布先备份即将覆盖的远端对象到本地 `.deploy/<timestamp>/previous/`，再上传并回读校验 SHA-256。
8. 按普通资源、Manifest、HTML、Service Worker 的顺序上传，降低入口先引用尚未上传资源的风险。

## 接口与数据影响

- API：调用又拍云 REST API `v0.api.upyun.com`
- 数据库：无
- 配置：需要运行环境提供 `UPYUN_OPERATOR`、`UPYUN_PASSWORD`
- 外部依赖：又拍云对象存储；Node.js 内置模块，无新增 npm 包

## 兼容性与风险

- README 中的脚本使用 ESM `import`；复制到项目后需要项目支持 ESM，或保存为 `.mjs`。文档将明确这一前提。
- 发布脚本不删除远端旧文件，因此历史哈希资源可能保留；这是降低误删风险的有意取舍。
- 本地备份只能覆盖本次即将替换的对象，不是远端目录的完整快照。
- `appSlug` 错误会发布到错误目录，因此在网络操作前进行格式与 Manifest 一致性校验。

## 验证方案

1. 对 README 代码块进行提取并执行语法检查。
2. 使用临时构建目录执行 `--dry-run`，验证文件枚举、上传顺序、目标服务、远端目录和访问 URL。
3. 使用非法 slug、缺失构建文件及 Manifest 路径不一致样例，确认脚本失败且未产生网络写操作。
4. 检查文档中的服务名、域名、命令和安全说明一致。

## 方案确认

- 确认状态：已确认，已实施并通过验收
- 确认记录：2026-09-15 用户明确回复“确认”。
