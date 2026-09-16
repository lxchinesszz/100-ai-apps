import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useBlocker } from "react-router-dom";
import { Dialog } from "antd-mobile";
const DraftContext = createContext({
  editing: false,
  setEditing: (_value: boolean) => {},
});
export function DraftProvider({ children }: { children: ReactNode }) {
  const [editing, setEditing] = useState(false);
  return (
    <DraftContext.Provider value={{ editing, setEditing }}>
      {children}
    </DraftContext.Provider>
  );
}
export const useDraftContext = () => useContext(DraftContext);
export function useDraftGuard(dirty: boolean, saving = false) {
  const { setEditing } = useDraftContext();
  const blocker = useBlocker(dirty && !saving);
  const prompting = useRef(false);
  useEffect(() => {
    setEditing(dirty || saving);
    return () => setEditing(false);
  }, [dirty, saving, setEditing]);
  useEffect(() => {
    if (blocker.state !== "blocked" || prompting.current) return;
    prompting.current = true;
    void Dialog.confirm({
      title: "放弃这次修改？",
      content: "尚未保存的内容将不会保留。",
      confirmText: "放弃修改",
      cancelText: "继续编辑",
    })
      .then((discard) => {
        if (discard) blocker.proceed?.();
        else blocker.reset?.();
      })
      .finally(() => {
        prompting.current = false;
      });
  }, [blocker]);
  useEffect(() => {
    if (!dirty) return;
    const guard = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, [dirty]);
}
