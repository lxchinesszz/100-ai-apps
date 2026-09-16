import { useEffect, lazy, Suspense, useRef } from "react";
import {
  createHashRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import { ConfigProvider } from "antd-mobile";
import zhCN from "antd-mobile/es/locales/zh-CN";
import { DraftProvider } from "./context";
import { ErrorBoundary, MissingTrip, Loading } from "../components/shared";
import TripList from "../features/trips/TripList";
const TripForm = lazy(() => import("../features/trips/TripForm"));
const TripDetail = lazy(() => import("../features/trips/TripDetail"));
const BackupPage = lazy(() => import("../features/backup/BackupPage"));
import PwaStatus from "../pwa/PwaStatus";
function Layout() {
  const { pathname } = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [pathname]);
  return (
    <DraftProvider>
      <div className="app-shell">
        <PwaStatus />
        <div className="app-scroll" ref={scrollRef}>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </DraftProvider>
  );
}
const router = createHashRouter([
  {
    element: <Layout />,
    errorElement: (
      <div className="page">
        <h1>暂时无法读取账本</h1>
        <p>请重试，你的数据不会被自动删除。</p>
        <button onClick={() => location.reload()}>重新加载</button>
      </div>
    ),
    children: [
      { path: "/", element: <TripList /> },
      { path: "/trips/new", element: <TripForm /> },
      { path: "/trips/:id", element: <TripDetail /> },
      { path: "/trips/:id/edit", element: <TripForm /> },
      { path: "/backup", element: <BackupPage /> },
      { path: "*", element: <MissingTrip /> },
    ],
  },
]);
export default function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ConfigProvider>
  );
}
