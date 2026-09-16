# 旅记

## 已确认的技术路线

- 前端：React + TypeScript + Vite。
- UI：Ant Design Mobile，按高保真定制苹果风格，优先复用成熟组件。
- 本地数据：Dexie + IndexedDB。
- 应用形态：PWA。
- 构建命令：`npm run build`。
- 构建产物：`dist/`。
- 部署：将 `dist/` 中的静态文件上传到又拍云 `ai-skills` 空间的 `/trip/`。
- 访问地址：https://sks.springlearn.cn/trip/

## 已确认的使用方式

用户在 iPhone 的 Safari 中打开 https://sks.springlearn.cn/trip/，通过「分享」→「添加到主屏幕」添加应用，之后点击主屏幕上的旅记图标即可直接使用。

开发时以这一使用路径为验收依据，配置 PWA 名称、图标和独立窗口显示，适配手机安全区域，并支持应用资源缓存及本地旅行数据存储。


## 设计参考

高保真效果图：[旅记](design/trip-high-fidelity.png)，包含旅行列表、创建旅行、旅行预算首页和记一笔四个界面。

## 当前状态

首版本地应用已实现：旅行管理、预算记账、分类流水、备份恢复及 PWA 离线能力。已通过 26 项测试和生产构建，并完成浏览器离线及更新验证。已部署到又拍云 ai-skills/trip/，iPhone 主屏幕真机验收待完成。

## 项目文档

- [产品需求文档](docs/产品需求文档.md)：功能范围、页面交互、预算规则、异常状态与验收标准。
- [技术方案](docs/技术方案.md)：架构、数据模型、离线存储、PWA、备份恢复与又拍云部署。

- [开发与部署](docs/开发与部署.md)：启动命令、实现范围、验证结果及又拍云发布步骤。

## 快速开始

```sh
npm ci
npm run dev
```

生产预览：`npm run build` 后运行 `npm run preview`。构建产物位于 `dist/`。

线上访问：[打开旅记](https://sks.springlearn.cn/trip/)。子目录构建后的本地预览为 http://localhost:4173/trip/ 。
