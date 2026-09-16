import { useState } from "react";
import { Smartphone, X, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function InstallHint() {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(() => {
    try {
      return localStorage.getItem("trip-install-dismissed") === "1";
    } catch {
      return false;
    }
  });
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone;
  if (hidden || standalone) return null;
  return (
    <aside className="install-hint">
      <Smartphone size={19} />
      <button className="install-hint-link" onClick={() => navigate("/backup")}>
        <strong>把旅记，放进口袋</strong>
        <span>
          添加到主屏幕，随时记一笔
          <ChevronRight size={11} />
        </span>
      </button>
      <button
        className="icon-button"
        aria-label="关闭安装指引"
        onClick={() => {
          setHidden(true);
          try {
            localStorage.setItem("trip-install-dismissed", "1");
          } catch {}
        }}
      >
        <X size={14} />
      </button>
    </aside>
  );
}
