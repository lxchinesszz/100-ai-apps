# 技术方案：Web / PWA 统一使用 Font Awesome 图标库

## 现状分析

当前 `rules/web-pwa/README.md` 已规定 Web / PWA 核心资源不得依赖第三方 CDN，并要求图标等资源随项目构建和部署，但尚未指定统一图标库。

## 方案设计

在 `rules/web-pwa/README.md` 新增“图标规范”章节，将 Font Awesome Free 定义为 Web / PWA 默认图标库。

React + TypeScript + Vite 项目采用 npm 包方式集成：

- `@fortawesome/react-fontawesome`
- `@fortawesome/fontawesome-svg-core`
- `@fortawesome/free-solid-svg-icons`
- `@fortawesome/free-regular-svg-icons`
- `@fortawesome/free-brands-svg-icons`（仅需要品牌图标时）

开发时按具体图标进行 import，不默认注册完整图标集。构建后的图标资源随应用静态产物部署，保持 PWA 离线能力和现有网络依赖原则。

## 接口与数据影响

- API：无
- 数据库：无
- 配置：无
- 外部依赖：后续 Web / PWA App 在实际使用图标时按需增加 Font Awesome Free npm 包；本次仅修改规则，不修改现有 App 依赖。

## 兼容性与风险

- 不批量修改已有 App，因此不存在现有 UI 回归风险。
- Font Awesome Pro 不作为默认依赖，避免授权和付费能力混入基础规则。
- 自定义 SVG 保留为缺少合适图标时的兜底方案。

## 验证方案

1. 检查 `rules/web-pwa/README.md` 是否新增 Font Awesome 图标规范。
2. 检查规则是否包含 React 包、按需导入、本地构建、禁止 CDN 和语义一致性。
3. 检查本次没有修改具体 App 代码和依赖。

## 方案确认

- 确认状态：已确认
- 确认记录：2026-09-15，用户明确同意将 Font Awesome 放入仓库规则。
