# 需求方案：Web / PWA 统一使用 Font Awesome 图标库

## 基本信息

- 需求编号：无
- 提出日期：2026-09-15
- 当前状态：已确认
- 关联人员：用户确认

## 背景与问题

`100-ai-apps` 的 Web / PWA 应用需要统一前端功能图标来源，避免不同 App 临时选择不同图标库、使用 Emoji 或自行绘制重复 SVG，导致视觉语义和工程依赖不一致。

## 需求目标

将 Font Awesome Free 作为 Web / PWA 项目的默认图标库，并在 `rules/web-pwa/README.md` 中形成统一开发规则。

## 需求范围

### 范围内

- Web / PWA 默认使用 Font Awesome Free。
- React 项目使用 Font Awesome 官方 React 包。
- 图标采用按需导入，避免默认全量导入。
- 图标随项目构建和部署，不依赖第三方 CDN。
- 统一功能图标的语义与使用原则。

### 范围外

- 不修改现有 App 代码和依赖。
- 不要求本次批量迁移已有图标。
- 不购买或引入 Font Awesome Pro。
- 不将 Font Awesome 规则扩展到微信小程序或桌面应用。

## 业务规则

1. Web / PWA 默认图标库为 Font Awesome Free。
2. React 项目优先使用 `@fortawesome/react-fontawesome` 与对应 Free 图标包。
3. 功能图标优先使用 Font Awesome，不使用 Emoji 或 Unicode 字符模拟功能图标。
4. 图标默认按需导入，不默认注册或打包完整图标集。
5. 核心图标资源必须随项目构建，不使用 Font Awesome CDN 作为运行时依赖。
6. 同一 App 中同一业务语义应保持图标一致。
7. Font Awesome 无合适图标时，才考虑项目内自定义 SVG。

## 验收标准

1. `rules/web-pwa/README.md` 明确 Font Awesome Free 为默认图标库。
2. 规则明确 React 官方包、按需导入、禁止 CDN 和语义一致性要求。
3. 规则不要求本次修改现有 App。
4. 仓库级需求总清单完成登记。

## 待确认事项

- 无
