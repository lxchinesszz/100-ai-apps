# 技术方案：统一 Web / PWA 又拍云子目录部署规则

## 现状分析

当前 Web / PWA 规范以纯静态部署为基础，但 Manifest 示例使用 `start_url: "/"`，Apple Touch Icon 和图标示例也使用根路径。对于统一部署到 `https://apps.springlearn.cn/<appSlug>/` 的应用，这些根路径假设可能导致资源加载、Manifest 启动范围和 PWA 主屏幕启动位置错误。

## 方案设计

引入统一部署变量 `appSlug`：

```text
appSlug = speaking-training
```

统一映射：

```text
应用 URL
https://apps.springlearn.cn/<appSlug>/

又拍云目录
/<appSlug>/

Vite base
/<appSlug>/

Manifest start_url
/<appSlug>/

Manifest scope
/<appSlug>/
```

Vite 示例：

```ts
export default defineConfig({
  base: '/speaking-training/'
})
```

Manifest 示例使用子目录绝对路径，图标路径也落在应用子目录下。HTML 中 Apple Touch Icon 等资源路径同样必须使用 Vite base 可正确解析的方式，禁止无意识指向域名根目录。

部署流程统一为：

```text
npm run build
      ↓
dist/
      ↓
上传 dist/ 内全部文件
      ↓
又拍云 /<appSlug>/
      ↓
https://apps.springlearn.cn/<appSlug>/
      ↓
iPhone Safari → 添加到主屏幕
```

路由仍优先使用 Hash Router，从而避免又拍云静态子目录下刷新子路由产生 404。

Service Worker 的注册范围、缓存资源 URL 和 PWA scope 必须限制在当前 `/<appSlug>/`，避免多个 App 共用同一域名时互相污染缓存或控制范围。

## 接口与数据影响

- API：无
- 数据库：无
- 配置：Web / PWA 项目需要按 `appSlug` 设置 Vite base、Manifest start_url / scope 和资源路径
- 外部依赖：又拍云静态托管，统一域名 `https://apps.springlearn.cn`

## 兼容性与风险

- 多个 PWA 共用同一域名时，Service Worker scope 必须限制在各自应用子目录，避免跨 App 控制和缓存冲突。
- 如果资源仍写成 `/icons/...` 等根绝对路径，会访问 `https://apps.springlearn.cn/icons/...` 而不是应用目录，必须避免。
- `appSlug` 一旦部署并被用户添加到主屏幕，不应随意修改，否则会改变 URL、PWA scope 和本地安装入口。

## 验证方案

1. 检查规则明确统一域名、appSlug、又拍云目录和访问 URL。
2. 检查 Vite base、Manifest start_url / scope 与 appSlug 一致。
3. 检查 PWA / Apple Touch Icon 示例不再错误假设域名根目录。
4. 检查 Service Worker scope 明确限制在当前应用子目录。
5. 检查最终验收包含子目录静态资源、刷新、PWA 安装和启动验证。

## 方案确认

- 确认状态：已确认
- 确认记录：2026-09-15，用户明确回复“确认”。