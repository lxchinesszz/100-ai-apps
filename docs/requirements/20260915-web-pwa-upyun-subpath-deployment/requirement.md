# 需求方案：统一 Web / PWA 又拍云子目录部署规则

## 基本信息

- 需求编号：无
- 提出日期：2026-09-15
- 当前状态：已确认
- 关联人员：用户、Agent

## 背景与问题

当前 `rules/web-pwa/README.md` 已规定 iPhone 静态 Web App / PWA 的开发方式，但部署目标仍描述为通用静态服务器，没有固定本仓库 Web / PWA 应用的统一域名、访问路径和又拍云目录。

用户已明确：所有 Web / PWA 应用统一部署到又拍云，统一域名为 `https://apps.springlearn.cn`，每个应用使用英文应用名（appSlug）作为 URL 子目录和又拍云部署目录。

## 需求目标

将 Web / PWA 部署规则固定为：`https://apps.springlearn.cn/<appSlug>/`，构建产物上传到又拍云对应的 `/<appSlug>/` 目录，并同步约束 Vite base、Manifest start_url / scope、静态资源路径和 PWA 启动路径，确保子目录部署正常工作。

## 需求范围

### 范围内

- 修改 `rules/web-pwa/README.md` 的部署目标和最终运行方式。
- 明确 `appSlug` 是 Web / PWA 应用的唯一部署目录名。
- 明确统一访问地址 `https://apps.springlearn.cn/<appSlug>/`。
- 明确又拍云部署目录 `/<appSlug>/`。
- 明确 Vite `base` 必须设置为 `/<appSlug>/`。
- 明确 Manifest `start_url` 和 `scope` 使用 `/<appSlug>/`。
- 明确 App Icon、Manifest、Service Worker 和其他静态资源必须兼容子目录部署。
- 在最终验收中增加子目录访问和资源路径检查。

### 范围外

- 不修改任何具体 App。
- 不执行实际又拍云上传。
- 不修改 DNS、HTTPS 证书或又拍云控制台配置。
- 不新增部署脚本或 CI / CD。

## 业务规则

1. 所有 Web / PWA 应用统一使用 `https://apps.springlearn.cn` 域名。
2. 每个应用必须定义稳定的英文 `appSlug`，使用 kebab-case，例如 `speaking-training`。
3. 应用 URL 固定为 `https://apps.springlearn.cn/<appSlug>/`。
4. 又拍云目录固定为 `/<appSlug>/`，`dist/` 内文件上传到该目录。
5. Vite `base`、Manifest `start_url`、Manifest `scope` 必须与 `/<appSlug>/` 保持一致。
6. 禁止假设应用部署在域名根目录 `/`。
7. 核心静态资源和 PWA 配置必须在子目录部署场景下正确加载。

## 验收标准

1. `rules/web-pwa/README.md` 明确统一域名为 `https://apps.springlearn.cn`。
2. 明确 URL 与又拍云目录均由同一个 `appSlug` 决定。
3. 明确 Vite `base`、Manifest `start_url`、`scope` 的子目录配置。
4. Manifest 和静态资源示例不再默认根路径 `/`。
5. 最终验收清单包含 `https://apps.springlearn.cn/<appSlug>/` 访问、刷新、PWA 启动和资源加载检查。
6. 不修改任何具体 App。

## 待确认事项

- 无。用户已于 2026-09-15 明确回复“确认”。