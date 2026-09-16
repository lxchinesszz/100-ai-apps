# Web / PWA 验收清单

> 本清单用于 `100-ai-apps` 中所有 Web / PWA 应用的最终验收。详细规则分别见同目录专项文档。

## 1. 构建与部署

- [ ] `npm run build` 可以成功执行。
- [ ] `dist/` 可以独立静态部署，不依赖服务器运行时。
- [ ] Vite `base` 与 `/<appSlug>/` 一致。
- [ ] 又拍云部署目录为 `/<appSlug>/`。
- [ ] 上传的是 `dist/` 内部文件，不额外嵌套 `dist`。
- [ ] 实际 URL 为 `https://apps.springlearn.cn/<appSlug>/`。
- [ ] Manifest `start_url` / `scope` 与 `/<appSlug>/` 一致。
- [ ] 页面刷新不会因为路由产生 404。

## 2. PWA 与 iPhone App Shell

- [ ] Safari 可以正常访问。
- [ ] 添加到主屏幕后可以独立启动。
- [ ] 页面背景覆盖顶部和底部区域。
- [ ] `html`、`body`、挂载节点和 App Shell 不产生 document 级纵向滚动。
- [ ] 短内容页面上下拖动时 App Shell 不位移、不露出根背景。
- [ ] 长内容只在显式内容区滚动。
- [ ] Header / Navbar 与 TabBar / Toolbar 不随业务内容移动。
- [ ] 内部滚动到首尾后不会继续把滚动链传给 document。
- [ ] Safari 浏览器栏变化及横竖屏切换后 App Shell 仍匹配当前视口。
- [ ] Safe Area、Dynamic Island、Home Indicator 不遮挡内容。
- [ ] Bottom Safe Area 只由一个层级负责，没有 App Shell、Main Content、TabBar / Toolbar 多层重复叠加 `env(safe-area-inset-bottom)`。
- [ ] TabBar / Toolbar 已在正常布局流中占据高度时，Main Content 没有再次预留 TabBar 高度。
- [ ] 添加到主屏幕后，TabBar 下方只保留正常 Home Indicator 安全区，不出现明显异常的大块底部空白。
- [ ] `body` / `#root` / App Shell 背景覆盖一致，不会因未覆盖区域暴露而形成假性底部空白。
- [ ] 软键盘出现和收起时，焦点元素与关键操作仍可见、可达。
- [ ] 当前 Focus 输入控件在软键盘弹起后完整处于 Visual Viewport 可见区域，并与键盘顶部保留合理间距。
- [ ] Sheet / Popup 等浮层内表单在软键盘弹起后仍可滚动、输入和提交。
- [ ] 输入框聚焦不会导致页面异常放大。
- [ ] 375px 到 430px 常见宽度范围没有明显布局错误。

## 3. UI 与交互

- [ ] 已使用 Konsta UI。
- [ ] 根级 `App` 固定使用 `theme="ios"`。
- [ ] 没有额外引入第二套完整 UI 组件库。
- [ ] Konsta 已提供的标准组件没有无理由重复实现。
- [ ] 一级导航使用 Tabbar，页面内部紧密切换优先使用 Segmented。
- [ ] 列表型内容优先使用 List / ListItem，而不是默认 Card 化。
- [ ] 创建、编辑、筛选、选择等短流程优先考虑 Sheet。
- [ ] 没有使用浏览器原生 `alert()` / `confirm()` 作为正式产品 UI。
- [ ] 输入控件 Focus 后没有浏览器默认蓝色 `outline`、Tailwind `ring`、蓝色 `border` 或其他非 iOS 风格 Focus Ring。
- [ ] 移除网页式 Focus Ring 后，输入控件仍通过光标或轻量 iOS 风格状态提供清晰焦点反馈。
- [ ] 核心操作点击区域至少 `44 × 44px`。
- [ ] 核心功能不依赖 hover。
- [ ] 页面整体呈现 App 感而不是网页感。

## 4. 图标与资源

- [ ] Font Awesome Free 通过项目依赖本地构建。
- [ ] 图标按需导入，没有无必要全量注册。
- [ ] 没有使用 Emoji 作为正式功能图标。
- [ ] 同一业务语义的图标保持一致。
- [ ] PWA 图标、Apple Touch Icon、字体和静态资源在子目录下可以正确加载。
- [ ] 核心资源不依赖第三方 CDN。

## 5. 本地数据与离线

- [ ] 核心流程可完整使用。
- [ ] 本地数据刷新后仍然存在。
- [ ] 核心功能离线后仍可使用。
- [ ] Service Worker scope 不越过当前 App 子目录。
- [ ] 不同 App 的缓存不会互相污染。
- [ ] 更新策略不会无限缓存旧 JS。
- [ ] 不存在未经需求确认自行增加的后端服务或云数据库。

## 6. 例外记录

如果使用以下受控例外，必须已在对应 App 的 `requirement.md` 和 `technical-design.md` 中记录原因与边界：

- [ ] document 级整页自然滚动。
- [ ] Browser Router。
- [ ] 第二套 UI 或特殊交互体系。
- [ ] 后端、账号、跨设备同步、多人共享或云数据库。
- [ ] 其他偏离本目录默认规范的实现。
