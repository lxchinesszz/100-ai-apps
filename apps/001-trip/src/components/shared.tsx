import { Component, useEffect, useState, type ReactNode } from "react";
import { Button, Dialog, Skeleton } from "antd-mobile";
import {
  ArrowLeft,
  BedDouble,
  CarFront,
  Ticket,
  Utensils,
  AlertCircle,
  Compass,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Category } from "../domain/model";
import { todayDate } from "../domain/budget";
export function CategoryIcon({
  category,
  size = 21,
}: {
  category: Category;
  size?: number;
}) {
  const Icon = {
    food: Utensils,
    stay: BedDouble,
    transport: CarFront,
    fun: Ticket,
  }[category];
  return <Icon size={size} strokeWidth={1.65} aria-hidden />;
}
export function Header({
  title,
  right,
  back = "/",
}: {
  title?: string;
  right?: ReactNode;
  back?: string;
}) {
  const navigate = useNavigate();
  return (
    <header className="topbar">
      <button
        className="icon-button"
        aria-label="返回"
        onClick={() => navigate(back)}
      >
        <ArrowLeft size={23} />
      </button>
      <span>{title}</span>
      <div className="topbar-right">{right}</div>
    </header>
  );
}
export function Loading() {
  return (
    <div className="page loading">
      <Skeleton.Title animated />
      <Skeleton.Paragraph lineCount={5} animated />
    </div>
  );
}
export function EmptyState({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Compass size={38} strokeWidth={1.25} />
      </div>
      <h2>{title}</h2>
      <p>{text}</p>
      {action}
    </div>
  );
}
export function MissingTrip() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <EmptyState
        title="这段旅行不在这里"
        text="它可能已被删除，返回列表看看吧。"
        action={<Button onClick={() => navigate("/")}>返回我的旅行</Button>}
      />
    </>
  );
}
export function useToday() {
  const [today, setToday] = useState(todayDate);
  useEffect(() => {
    const update = () => setToday(todayDate());
    const timer = window.setInterval(update, 30_000);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("focus", update);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("focus", update);
    };
  }, []);
  return today;
}
export async function confirmDiscard() {
  return Dialog.confirm({
    title: "放弃这次修改？",
    content: "尚未保存的内容将不会保留。",
    confirmText: "放弃修改",
    cancelText: "继续编辑",
  });
}
export function InlineError({ message }: { message: string }) {
  return (
    <p className="inline-error" role="alert">
      <AlertCircle size={16} />
      {message}
    </p>
  );
}
export class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    if (this.state.error)
      return (
        <div className="page">
          <EmptyState
            title="暂时无法打开旅记"
            text="请重试。应用不会自动删除你的本地账本。"
            action={
              <Button color="primary" onClick={() => window.location.reload()}>
                重新加载
              </Button>
            }
          />
        </div>
      );
    return this.props.children;
  }
}
