# 图标、字体与静态资源规范

> 本规范负责 Web/PWA 的图标、字体、图片和本地静态资源约束。

## 1. 图标库

默认使用 **Font Awesome Free** 作为功能图标库。

React 项目优先通过 npm 使用：

```text
@fortawesome/react-fontawesome
@fortawesome/fontawesome-svg-core
@fortawesome/free-solid-svg-icons
@fortawesome/free-regular-svg-icons
```

只有需要品牌图标时再引入：

```text
@fortawesome/free-brands-svg-icons
```

---

## 2. 图标使用原则

1. 常见功能优先使用 Font Awesome Free，不重复绘制 SVG。
2. 不使用 Emoji 作为正式功能图标。
3. 不使用 Unicode 字符模拟返回、设置、删除、首页等图标。
4. React 中按具体图标 import，避免无必要全量注册。
5. 同一业务语义在同一 App 内保持图标一致。
6. 图标服务于信息表达和操作识别，不做大量装饰堆叠。
7. Font Awesome 不满足需求时，才允许使用项目内自定义 SVG。
8. 默认不主动引入 Font Awesome Pro；如需 Pro，应先确认授权与依赖变化。

React 示例：

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faGear } from '@fortawesome/free-solid-svg-icons'

<FontAwesomeIcon icon={faHouse} />
<FontAwesomeIcon icon={faGear} />
```

Konsta UI 负责 UI 结构与 iOS 交互，Font Awesome Free 负责业务功能图标；不要因为使用 Konsta 再引入另一套完整图标体系。

---

## 3. 字体

优先使用 iOS 系统字体：

```css
font-family:
  -apple-system,
  BlinkMacSystemFont,
  "SF Pro Display",
  "SF Pro Text",
  "Helvetica Neue",
  Arial,
  sans-serif;
```

中文环境依赖系统 fallback。

禁止为了模仿 Apple UI 强制在线加载字体。

---

## 4. 静态资源

静态资源进入 `/public` 或由 Vite 构建处理。

核心资源不得依赖第三方 CDN，尤其是：

```text
字体
图标
核心 UI 图片
关键插图
```

保证 PWA 离线后基础 UI 不失效。

---

## 5. 子目录资源路径

应用部署在 `/<appSlug>/` 下时，禁止无意识使用指向域名根目录的路径：

```text
/icons/...
/images/...
```

最终资源 URL 必须：

- 位于当前 `/<appSlug>/` 下；或
- 由 Vite `base` 正确处理。

Apple Touch Icon、Manifest icons、业务图片都遵守同一原则。

---

## 6. UI 设计交付

UI 设计阶段尽量给出明确的图标语义或 Font Awesome 图标名称，减少 Developer 二次选择导致的风格漂移。

---

## 7. 验收重点

- Font Awesome 通过项目依赖本地构建。
- 没有通过第三方 CDN 加载核心图标或字体。
- 图标按需导入。
- 同一语义没有混用不同图标。
- 子目录部署后所有字体、图标和图片路径正确。
- 离线后核心图标仍可正常显示。
