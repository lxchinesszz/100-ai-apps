# 路由与又拍云部署规范

> 本规范负责 Web/PWA 的静态路由、子目录部署、Vite base、Manifest 路径以及又拍云发布流程。

## 1. 统一域名与 appSlug

所有应用统一部署到：

```text
https://apps.springlearn.cn
```

每个 App 必须定义稳定的英文 `appSlug`，使用 kebab-case，例如：

```text
speaking-training
travel-budget
```

以下内容必须使用同一个 slug：

```text
应用目录语义
访问 URL
又拍云目录
Vite base
Manifest start_url
Manifest scope
Service Worker scope
```

`appSlug` 一旦发布并被用户添加到主屏幕，应视为稳定标识，不应随意修改。

---

## 2. Vite base

必须按子目录部署配置，例如：

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/speaking-training/'
})
```

禁止默认假设应用部署在域名根路径 `/`。

---

## 3. 路由

纯静态又拍云子目录部署默认优先使用 Hash Router：

```text
https://apps.springlearn.cn/<appSlug>/#/
https://apps.springlearn.cn/<appSlug>/#/training
https://apps.springlearn.cn/<appSlug>/#/history
```

这样刷新时不依赖服务器 SPA fallback。

只有部署环境明确配置 SPA fallback 时，才考虑 Browser Router。

---

## 4. Manifest 路径

Manifest 必须与子目录一致：

```json
{
  "start_url": "/speaking-training/",
  "scope": "/speaking-training/",
  "display": "standalone"
}
```

图标和静态资源路径同样必须落在当前 App 子目录下，或由 Vite base 正确转换。

---

## 5. dist 发布规则

构建产物：

```text
npm run build
→ dist/
```

上传目标：

```text
dist/index.html
→ /<appSlug>/index.html

dist/assets/...
→ /<appSlug>/assets/...
```

禁止部署为：

```text
/<appSlug>/dist/index.html
```

上传的是 `dist/` 内部文件，而不是把 `dist` 目录本身再套一层。

---

## 6. 公共又拍云发布脚本

所有 Web/PWA App 必须统一使用仓库根目录：

```text
scripts/youpai-sync.mjs
```

调用格式：

```text
node <repo>/scripts/youpai-sync.mjs <localDir> <remoteDir>
```

要求：

- `localDir` 必须存在。
- `remoteDir` 必须显式传入。
- `remoteDir` 使用 `/<appSlug>/` 格式。
- 禁止根目录 `/`、多层路径、点段或非法字符。
- 公共脚本不得自动推断部署目标。

推荐 `package.json`：

```json
{
  "scripts": {
    "deploy": "npm run build && node ../../scripts/youpai-sync.mjs dist /speaking-training/"
  }
}
```

---

## 7. 又拍云凭证

公共脚本固定使用又拍云服务：

```text
100-ai-apps
```

凭证优先读取：

```text
UPYUN_OPERATOR
UPYUN_PASSWORD
```

macOS 上仅当对应字段缺失时，才允许从系统钥匙串兜底读取：

```text
100-ai-apps-upyun-operator
100-ai-apps-upyun-password
```

非 macOS 环境必须提供完整环境变量。

凭证禁止：

```text
写入源码
提交仓库
进入构建产物
输出到日志
出现在错误信息中
```

发布前必须先完成参数、本地目录、远程目录和凭证校验，再发起网络请求。

---

## 8. 发布行为

公共脚本采用逐文件 PUT 直接覆盖。

默认：

```text
不备份
不 GET 回读校验
不 DELETE 远端旧文件
```

如未来需要清理陈旧文件，应单独设计发布策略，不允许 AI 自行增加危险删除逻辑。

---

## 9. 验收重点

- `npm run build` 成功。
- `dist/` 可独立静态部署。
- Vite base 与 `/<appSlug>/` 一致。
- Manifest `start_url` / `scope` 一致。
- 路由刷新不产生 404。
- PWA 图标和静态资源可从子目录正确加载。
- Service Worker scope 不越过当前 App。
- `deploy` 命令显式指定正确远程目录。
