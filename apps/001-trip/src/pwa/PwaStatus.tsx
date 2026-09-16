import { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { Dialog } from "antd-mobile";
import { Download, WifiOff, X } from "lucide-react";
import { useDraftContext } from "../app/context";
export default function PwaStatus() {
  const { editing } = useDraftContext();
  const [online, setOnline] = useState(navigator.onLine);
  const [dismissed, setDismissed] = useState(false);
  const [failed, setFailed] = useState(false);
  const {
    offlineReady: [ready, setReady],
    needRefresh: [refresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisterError() {
      setFailed(true);
    },
    onRegisteredSW(_url, registration) {
      if (!registration) return;
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden && navigator.onLine)
          void registration.update().catch(() => {});
      });
    },
  });
  useEffect(() => {
    const up = () => setOnline(true),
      down = () => setOnline(false);
    const blocked = () => {
      void Dialog.alert({
        title: "请关闭旧窗口",
        content: "另一个旅记窗口正在使用旧版账本，关闭后可继续升级。",
      });
    };
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    window.addEventListener("trip-db-blocked", blocked);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
      window.removeEventListener("trip-db-blocked", blocked);
    };
  }, []);

  if (!online)
    return (
      <div className="connection-status">
        <WifiOff size={12} />
        离线模式 · 记录保存在本机
      </div>
    );
  if (refresh && !dismissed)
    return (
      <div className="pwa-notice">
        <Download size={17} />
        <span>
          {editing ? "新版本已就绪，请先保存当前内容" : "新版本已就绪"}
        </span>
        <button disabled={editing} onClick={() => updateServiceWorker(true)}>
          更新
        </button>
        <button aria-label="稍后更新" onClick={() => setDismissed(true)}>
          <X size={15} />
        </button>
      </div>
    );
  if (failed && !dismissed)
    return (
      <div className="pwa-notice">
        <span>离线准备未完成，请联网后重试</span>
        <button disabled={editing} onClick={() => location.reload()}>
          重试
        </button>
        <button aria-label="关闭提示" onClick={() => setDismissed(true)}>
          <X size={15} />
        </button>
      </div>
    );
  if (ready)
    return (
      <div className="pwa-notice">
        <Download size={17} />
        <span>已准备好，可以离线使用了</span>
        <button aria-label="关闭离线提示" onClick={() => setReady(false)}>
          <X size={16} />
        </button>
      </div>
    );
  return null;
}
