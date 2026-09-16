import { useRef, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Button, Dialog, Toast } from "antd-mobile";
import {
  Download,
  Upload,
  Smartphone,
  Share,
  PlusSquare,
  ChevronRight,
  ShieldCheck,
  Check,
  Database,
} from "lucide-react";
import { useDraftGuard } from "../../app/context";
import { db } from "../../data/db";
import { repo, errorMessage } from "../../data/repository";
import { validateBackup } from "../../data/validation";
import { todayDate } from "../../domain/budget";
import type { Backup } from "../../domain/model";
import { Header, InlineError } from "../../components/shared";
export default function BackupPage() {
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  useDraftGuard(busy);
  const [pending, setPending] = useState<Backup | null>(null);
  const [persistent, setPersistent] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const counts = useLiveQuery(async () => ({
    trips: await db.trips.count(),
    expenses: await db.expenses.count(),
  }));
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone;
  async function exportData() {
    setBusy(true);
    setError("");
    try {
      const backup = await repo.exportBackup();
      const url = URL.createObjectURL(
        new Blob([JSON.stringify(backup, null, 2)], {
          type: "application/json",
        }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = `旅记备份-${todayDate()}-${Date.now()}.json`;
      document.body.append(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
      Toast.show("备份文件已生成，请保存到“文件”");
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  async function readFile(file?: File) {
    setPending(null);
    setError("");
    if (!file) return;
    setBusy(true);
    try {
      if (file.size > 10 * 1024 * 1024) throw new Error("文件不能超过 10MB");
      setPending(validateBackup(JSON.parse(await file.text())));
    } catch (e) {
      setError(
        e instanceof SyntaxError ? "文件不是有效的 JSON 备份" : errorMessage(e),
      );
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }
  async function restore() {
    if (!pending || busy) return;
    if (
      !(await Dialog.confirm({
        title: "替换当前账本？",
        content: `将恢复 ${pending.trips.length} 段旅行和 ${pending.expenses.length} 笔支出。当前账本将被替换，请先导出需要保留的数据。`,
        confirmText: "确认替换",
        cancelText: "先不恢复",
      }))
    )
      return;
    setBusy(true);
    setError("");
    try {
      await repo.restoreBackup(pending);
      setPending(null);
      Toast.show("账本已恢复");
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  async function persist() {
    try {
      const granted = await navigator.storage?.persist?.();
      setPersistent(!!granted);
      Toast.show(
        granted
          ? "已启用存储保护，仍建议定期备份"
          : "当前环境未授予存储保护，请定期备份",
      );
    } catch {
      Toast.show("当前环境无法启用，请定期备份");
    }
  }
  return (
    <main className="page backup-page">
      <Header />
      <h1>安心带上旅记</h1>
      <p className="heading-subtitle">让旅途的点滴，有一份妥善的收藏。</p>
      <section className="settings-section">
        <div className="settings-title">
          <Smartphone size={20} />
          <h2>添加到主屏幕</h2>
          {standalone && (
            <span className="installed">
              <Check size={12} />
              已添加
            </span>
          )}
        </div>
        <p className="muted">像 App 一样，轻点图标就能开始。</p>
        <ol className="install-steps">
          <li>
            <Share size={18} />
            <span>在 Safari 中打开旅记，轻点“分享”</span>
          </li>
          <li>
            <PlusSquare size={18} />
            <span>选择“添加到主屏幕”并完成添加</span>
          </li>
          <li>
            <Check size={18} />
            <span>从主屏幕打开，联网加载一次</span>
          </li>
        </ol>
        <p className="footnote">
          建议添加后再开始记账。Safari
          与主屏幕可能使用独立账本，已有记录请先导出，再到主屏幕应用恢复。
        </p>
      </section>
      <section className="settings-section">
        <div className="settings-title">
          <Database size={20} />
          <h2>我的账本</h2>
        </div>
        <div className="data-count">
          <strong>
            {counts?.trips ?? "—"}
            <span>段旅行</span>
          </strong>
          <strong>
            {counts?.expenses ?? "—"}
            <span>笔记录</span>
          </strong>
        </div>
        <button className="setting-row" disabled={busy} onClick={exportData}>
          <Download size={21} />
          <span>
            <strong>导出全部数据</strong>
            <small>保存一份 JSON 备份到你的文件</small>
          </span>
          <ChevronRight size={18} />
        </button>
        <button
          className="setting-row"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
        >
          <Upload size={21} />
          <span>
            <strong>从备份恢复</strong>
            <small>换设备、重新安装后找回记录</small>
          </span>
          <ChevronRight size={18} />
        </button>
        <input
          className="sr-only"
          ref={fileRef}
          type="file"
          accept=".json,application/json"
          aria-label="选择备份文件"
          onChange={(e) => readFile(e.target.files?.[0])}
        />
        {pending && (
          <div className="backup-preview">
            <h3>备份已通过校验</h3>
            <p>
              {pending.trips.length} 段旅行 · {pending.expenses.length} 笔支出
            </p>
            <p className="footnote">
              导出于 {new Date(pending.exportedAt).toLocaleString("zh-CN")}
            </p>
            <Button color="primary" block loading={busy} onClick={restore}>
              恢复并替换当前账本
            </Button>
            <Button
              block
              fill="none"
              disabled={busy}
              onClick={() => setPending(null)}
            >
              取消
            </Button>
          </div>
        )}
        {error && <InlineError message={error} />}
      </section>
      <section className="privacy-note">
        <ShieldCheck size={22} />
        <div>
          <h3>你的数据，只属于你</h3>
          <p>
            账本保存在此设备，不会上传到服务器。清理网站数据或更换设备前，记得导出备份。
          </p>
          <button
            className="text-button"
            onClick={persist}
            disabled={persistent}
          >
            {persistent ? "已启用存储保护" : "尝试启用存储保护"}
          </button>
        </div>
      </section>
      <footer className="brand-footer">
        旅记 <span>·</span> 每一段旅行，都值得记住<small>v0.1.0</small>
      </footer>
    </main>
  );
}
