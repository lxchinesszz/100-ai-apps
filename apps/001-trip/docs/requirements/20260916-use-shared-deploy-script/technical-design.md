# 技术方案：001-trip 使用公共部署脚本

## 现状分析

当前 `deploy` 为 `npm run build && node scripts/youpai-sync.js dist /trip/`，App 内脚本承担又拍云上传。

## 方案设计

将命令改为 `npm run build && node ../../scripts/youpai-sync.mjs dist /trip/`，继续从 App 根目录执行，因此 `dist` 和 `.deploy` 等相对路径语义不影响构建；公共脚本不再生成备份目录。删除 App 内 `scripts/youpai-sync.js`。

## 接口与数据影响

- API：部署时改由公共脚本调用又拍云；本次不执行
- 数据库：无
- 配置：继续使用 `UPYUN_OPERATOR`、`UPYUN_PASSWORD`
- 外部依赖：无新增依赖

## 兼容性与风险

- 远程目录仍为 `/trip/`，线上 URL 不变。
- App 当前存在其他未完成改动；实施仅触碰已记录文件，不覆盖无关内容。

## 验证方案

1. 执行类型检查、测试和生产构建。
2. 静态核对 deploy 命令参数。
3. 确认旧脚本已移除且未执行真实上传。

## 方案确认

- 确认状态：已确认
- 确认记录：用户于 2026-09-16 随公共脚本方案一并确认。

## 实施状态

- 当前状态：已完成
- 实施结果：按已确认方案完成 deploy 迁移并删除重复脚本；`package-lock.json` 不保存 scripts 元数据，无需修改。
- 验收记录：独立 Tester 于 2026-09-16 验收 PASS；2 个测试文件、7 个测试通过，未执行真实部署或上传。
