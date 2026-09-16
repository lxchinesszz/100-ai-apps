# 本地数据、离线与缓存规范

> 本规范负责 Web/PWA 的 Local First、本地存储、网络依赖、Service Worker 与更新策略。

## 1. Local First

没有明确服务端需求时，业务数据默认保存在当前设备本地。

推荐：

```text
简单数据 → localStorage
复杂、结构化、大量数据 → IndexedDB
```

常见本地数据包括：

```text
打卡记录
训练进度
预算
消费记录
设置
主题
历史记录
草稿
```

禁止 AI 因为“方便”自行增加服务端数据库。

---

## 2. 允许偏离 Local First 的情况

只有业务明确需要以下能力时，才进入服务端方案设计：

```text
账号体系
跨设备同步
多人共享
服务端计算
统一远程数据源
```

偏离默认规则前，必须先在当前 App 的需求方案和技术方案中说明原因与影响。

---

## 3. 离线运行

纯本地工具优先支持离线使用。

需要完整 App 感时配置 Service Worker，对以下核心静态资源进行合理缓存：

```text
HTML
CSS
JavaScript
字体
图标
核心静态图片
```

Service Worker scope 必须限制在当前 `/<appSlug>/`，不得控制其他 App 目录。

---

## 4. 网络依赖

核心功能不得依赖第三方 CDN。

核心 JS、CSS、字体、图标和关键图片应随项目构建和部署，保证离线时基础 UI 与核心功能不失效。

远程接口只能作为业务明确要求的依赖，不能作为默认基础设施。

---

## 5. 缓存与版本更新

Service Worker 不允许无限缓存旧 JS。

必须设计：

```text
Cache Version
+
Update Strategy
```

缓存 key 建议包含：

```text
appSlug + version
```

避免同域名下多个 App 的缓存互相污染。

发现新版本时可以后台更新，或提供“发现新版本 / 立即更新”交互。

---

## 6. 本地数据升级

当本地数据结构发生变化时，应考虑版本字段和迁移策略，尤其是 IndexedDB。

不得通过简单清空用户数据来规避兼容问题，除非产品明确允许且已说明影响。

---

## 7. AI 开发约束

默认实现：

```text
Static Web App
+
PWA
+
Local First
```

禁止擅自增加：

```text
Node Server
Spring Boot
MySQL
PostgreSQL
Firebase
Supabase
登录服务器
云数据库
```

除非业务需求已经确认需要。

---

## 8. 验收重点

- 核心功能断网后仍可使用。
- 本地数据刷新后仍然存在。
- 不同 App 的 Service Worker 与缓存互不干扰。
- 更新版本后不会长期停留在旧 JS。
- 不存在未经需求确认新增的后端与云数据库。
